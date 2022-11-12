# COSE451_GitCTF

## To Setup ##
`git clone https://github.com/MustSave/COSE451_GitCTF.git`

`cd COSE451_GitCTF`

`./init.sh`

## Makefile option ##
clean : remove binary

run : run until user exit

static_server : build

make clean run : remove old binary && build new binary && run


## To Run ##
`sudo docker-compose up &`

`cd mongoose && make run`


## Running port ##
nodejs server is running on port 8080

c server is running on port 8081

nginx is listening port 81

now you can get http://localhost:81 or in local network, http://"IP of server":81

## test account ##
id : 2022123456

pw : 1234

## mysql account ##
id : root

pw : root

`mysql -uroot -proot`

