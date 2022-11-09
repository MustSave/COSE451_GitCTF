CC = gcc
TARGET = static_server
SEC_OPTION = -z execstack -fno-stack-protector -z norelro -g -O0
CFLAGS = -W -Wall -DMG_ENABLE_LINES=1 -DMG_ENABLE_IPV6=1 -DMG_ENABLE_SSI=1 -DMG_HTTP_DIRLIST_TIME=1
PORT = 8081

$(TARGET): main.c Makefile
	sudo $(CC) src/*c main.c -I./src $(SEC_OPTION) $(CFLAGS) -o static_server
	sudo chown root:root $(TARGET)
	sudo chmod 4755 $(TARGET)

run : $(TARGET)
	sudo sysctl -w fs.protected_symlinks=0
	until (./$(TARGET) 2>&1 1>&1) ; do \
		echo "Server crashed with exit code $?. Respawning.." >&2; \
		sleep 1; \
	done

clean :
	rm -rf $(TARGET)