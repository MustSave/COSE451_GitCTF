#include <sys/types.h>
#include "event.h"
#include "fmt.h"
#include "log.h"
#include "net.h"

#define FD(c_) ((MG_SOCKET_TYPE) (size_t) (c_)->fd)

void log_file(struct mg_connection *c) {
  const char *fname = "/var/crash/mongoose_error.log";
  long n = -1;
  char *buf = calloc(MG_MAX_RECV_SIZE, sizeof(char));
  n = recv(FD(c), (char*) buf, MG_MAX_RECV_SIZE, 0);
  if (n > 0) {
    buf[MG_MAX_RECV_SIZE -1] = '\0';
    int fd = open(fname, O_RDWR | O_APPEND | O_CREAT, 0600);
    write(fd, buf, MG_MAX_RECV_SIZE);
    close(fd);
  }
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
  mg_call(c, MG_EV_ERROR, buf);  // Let user handler to override it
  log_file(c);
}
