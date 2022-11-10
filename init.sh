# Move to working directory
cd "$(find /home/ -name "init.sh" -execdir pwd \; -quit)"

# install packages
sudo apt-get update && sudo apt-get install -y docker.io docker-compose gcc make

# pull docker image
sudo docker pull kito4972/node:16.18.0
sudo docker tag kito4972/node:16.18.0 node
sudo docker rmi kito4972/node:16.18.0

# build c
make -C mongoose clean static_server

# set privilege
sudo find ./ -type d -exec sudo chmod 755 {} \;
sudo find ./ -type f -exec sudo chmod 644 {} \;
sudo chown -R root:root ./
sudo chmod 4755 disable_security_options.sh
sudo chown root:1000 mongoose/static_server
sudo chmod 4755 mongoose/static_server

# install database & put data
sudo apt-get install -y mysql-server
sudo service mysql start
echo create database sugang | mysql -uroot -proot
mysql -uroot -proot sugang < mysql/sugang.sql
