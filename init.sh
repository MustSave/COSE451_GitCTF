# Move to working directory
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd)
cd $SCRIPT_DIR

# install packages
sudo apt-get update && sudo apt-get install -y docker.io docker-compose gcc make

# pull docker image & build
sudo docker pull kito4972/node:16.18.0
sudo docker tag kito4972/node:16.18.0 node
sudo docker rmi kito4972/node:16.18.0
sudo docker-compose build

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
#echo create database sugang | mysql -uroot -proot
#mysql -uroot -proot sugang < mysql/sugang.sql


if echo "CREATE DATABASE sugang" | mysql -uroot -proot ;
then
    echo ok ;
else
    echo shut down mysql...
#    sudo service mysql stop
    sudo /etc/init.d/mysql stop

    echo enter safe mode...
    sudo mkdir /var/run/mysqld
    sudo chown mysql /var/run/mysqld
    sudo mysqld_safe --skip-grant-tables&
    sleep 5

    echo change password
    sudo mysql < mysql.sql

    echo restart mysql...
    sudo mysqladmin shutdown -uroot -proot
    sudo service mysql restart

    echo "CREATE DATABASE sugang" | mysql -uroot -proot
fi
mysql -uroot -proot sugang < mysql/sugang.sql
