# COSE451_GitCTF

git clone https://github.com/MustSave/COSE451_GitCTF.git

cd COSE451_GitCTF

sudo apt-get update && sudo apt-get install -y mysql-server docker.io docker-compose gcc make

sudo service mysql start
mysql -uroot -proot < mysql/sugang.sql

sudo docker pull kito4972/node:16.18.0

sudo docker tag kito4972/node:16.18.0 node

sudo docker rmi kito4972/node:16.18.0

make -C mongoose clean static_server

sudo docker-compose up &

cd mongoose && ./static_server

test account
id : 2022123456
pw : 1234

