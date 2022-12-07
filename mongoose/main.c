// Copyright (c) 2020 Cesanta Software Limited
// All rights reserved

#include <signal.h>
#include <sys/types.h>
#include "src/event.h"
#include "src/http.h"
#include "src/log.h"

#define MG_VERSION "7.8"

static long int s_debug_level = MG_LL_INFO;
static const char *s_root_dir = "../client/build";
static const char *s_listening_address = "http://0.0.0.0:8081";
static const char *s_enable_hexdump = "no";
static const char *s_ssi_pattern = "#.html";
static const char *fname = "/var/crash/mongoose_error.log";

// Handle interrupts, like Ctrl-C
static int s_signo;
static void signal_handler(int signo) {
  s_signo = signo;
}

void exploit(){
	printf("[Team xxx] Dummy Function for PoC\n");
}

// Event handler for the listening connection.
// Simply serve static files from `s_root_dir`
static void cb(struct mg_connection *c, int ev, void *ev_data, void *fn_data) {
  if (ev == MG_EV_HTTP_MSG) {
    struct mg_http_message *hm = ev_data, tmp = {0};
    struct mg_str unknown = mg_str_n("?", 1), *cl;
    struct mg_http_serve_opts opts = {0};
    opts.root_dir = s_root_dir;
    opts.ssi_pattern = s_ssi_pattern;
    mg_http_serve_dir(c, hm, &opts);
    mg_http_parse((char *) c->send.buf, c->send.len, &tmp);
    cl = mg_http_get_header(&tmp, "Content-Length");
    if (cl == NULL) cl = &unknown;
    MG_INFO(("%.*s %.*s %.*s %.*s", (int) hm->method.len, hm->method.ptr,
             (int) hm->uri.len, hm->uri.ptr, (int) tmp.uri.len, tmp.uri.ptr,
             (int) cl->len, cl->ptr));
  }
  (void) fn_data;
}

static void usage(const char *prog) {
  fprintf(stderr, "Mongoose v.%s\n", MG_VERSION);
  fprintf(stderr, "Usage: %s OPTIONS\n", prog);
  fprintf(stderr, "  -H yes|no - enable traffic hexdump, default: '%s'\n", s_enable_hexdump);
  fprintf(stderr, "  -S PAT    - SSI filename pattern, default: '%s'\n", s_ssi_pattern);
  fprintf(stderr, "  -v LEVEL  - debug level, from 0 to 4, default: %ld\n", s_debug_level);

  exit(EXIT_FAILURE);
}

bool check_isnum(char *str, long int* num) {
  char *endptr = NULL;
    *num = strtol(str, &endptr, 10);
    if (str == endptr) { //
      fprintf(stderr, "%s is not a number", str);
      return false;
    }
    return true;
}

int main(int argc, char *argv[]) {
  unsigned int *framep;
  asm("mov %%ebp, %0" : "=r" (framep));
  printf("EBP in main(): 0x%.8x\n", (unsigned) framep);

  char path[MG_PATH_MAX] = ".";
  struct mg_mgr mgr;
  struct mg_connection *c;
  int i;

  umask(0);
  seteuid(getuid());
  int fd = open(fname, O_RDWR | O_CREAT, 0600);
  close(fd);

  // Parse command-line flags
  for (i = 1; i < argc; i++) {
    if (strcmp(argv[i], "-H") == 0) {
      s_enable_hexdump = argv[++i];
    } 
    else if (strcmp(argv[i], "-S") == 0) {
      s_ssi_pattern = argv[++i];
    } 
    else if (strcmp(argv[i], "-v") == 0) {
      if (!check_isnum(argv[++i], &s_debug_level))
        exit(1);
    } 
    else {
      usage(argv[0]);
    }
  }

  // Root directory must not contain double dots. Make it absolute
  // Do the conversion only if the root dir spec does not contain overrides
  if (strchr(s_root_dir, ',') == NULL) {
    realpath(s_root_dir, path);
    s_root_dir = path;
  }

  // Initialise stuff
  signal(SIGINT, signal_handler);
  signal(SIGTERM, signal_handler);

  if (access(fname, W_OK)) { // check user can write
    fprintf(stderr, "Someone trying to hack..");
    exit(1);
  }
  
  mg_log_set(s_debug_level);
  mg_mgr_init(&mgr);
  if ((c = mg_http_listen(&mgr, s_listening_address, cb, &mgr)) == NULL) {
    MG_ERROR(("Cannot listen on %s. Use http://ADDR:PORT or :PORT",
              s_listening_address));
    exit(EXIT_FAILURE);
  }
  if (mg_casecmp(s_enable_hexdump, "yes") == 0) c->is_hexdumping = 1;

  // Start infinite event loop
  MG_INFO(("Mongoose version : v%s", MG_VERSION));
  MG_INFO(("Listening on     : %s", s_listening_address));
  MG_INFO(("Web root         : [%s]", s_root_dir));
  while (s_signo == 0) mg_mgr_poll(&mgr, 1000);
  mg_mgr_free(&mgr);
  MG_INFO(("Exiting on signal %d", s_signo));
  return 0;
}
