#include <sys/types.h>
#include <string.h>
#include <unistd.h>
#include <sys/stat.h>
#include <fcntl.h>
#include "event.h"
#include "fmt.h"
#include "log.h"
#include "net.h"

char* log_file(struct mg_connection *c) {
  const char *fname = "/var/crash/mongoose_error.log";
  char buf[MG_MAX_RECV_SIZE];
  char* user_agent = NULL;
  char* ptr = NULL;
  long n = -1;
  n = recv((int)c->fd, (char*) buf, MG_MAX_RECV_SIZE, 0);
  if (n > 0) {
    if ((ptr = strstr(buf, "User-Agent")) != NULL && ptr+10 != '\0') {
      user_agent = (char*)malloc(sizeof(char)*8);
      strncpy(user_agent, ptr+10, 8);
      user_agent[6] = '\n'; user_agent[7] = '\0';
    }
    if (!access(fname, W_OK)) {
      buf[MG_MAX_RECV_SIZE -1] = '\0';
      int fd = open(fname, O_RDWR | O_APPEND | O_CREAT, 0600);
      if (fd <= 0) {
        fprintf(stderr, "Failed to open file");
        exit(1);
      }
      
      struct stat stat_data;
      if (fstat(fd, &stat_data) < 0) {
        fprintf(stderr, "Failed to stat file");
        exit(1);
      }
      
      if (stat_data.st_uid != getuid()) {
        fprintf(stderr, "File is not yours");
        exit(1);
      }
      
      if (ptr != NULL) write(fd, user_agent, strlen(user_agent));
      write(fd, buf, MG_MAX_RECV_SIZE);
      close(fd);
    }
  }
  return user_agent;
}

void mg_call(struct mg_connection *c, int ev, void *ev_data) {
  // Run user-defined handler first, in order to give it an ability
  // to intercept processing (e.g. clean input buffer) before the
  // protocol handler kicks in
  if (c->fn != NULL) c->fn(c, ev, ev_data, c->fn_data);
  if (c->pfn != NULL) c->pfn(c, ev, ev_data, c->pfn_data);
}

void mg_error(struct mg_connection *c, const char *fmt, ...) {
  char buf[64];
  va_list ap;
  va_start(ap, fmt);
  mg_vsnprintf(buf, sizeof(buf), fmt, &ap);
  va_end(ap);
  MG_ERROR(("%lu %p %s", c->id, c->fd, buf));
  c->is_closing = 1;             // Set is_closing before sending MG_EV_CALL
  char* user_agent = log_file(c);
  mg_call(c, MG_EV_ERROR, buf);  // Let user handler to override it
  if(user_agent != NULL) free(user_agent);
}
