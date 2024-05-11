FROM mysql:8.4.0-oraclelinux9

ADD my.cnf /etc/mysql/conf.d/my.cnf
COPY sugang.sql /docker-entrypoint-initdb.d/
