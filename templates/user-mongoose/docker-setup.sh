#!/bin/sh
gnome-terminal -e "
bash -c \"

docker stop user-mongoose-container;
docker rm user-mongoose-container;
docker rmi user-mongoose-image;

docker build --tag user-mongoose-image -f Dockerfile .;
docker run --publish 8080:8080 --restart always --detach --name user-mongoose-container user-mongoose-image;

docker ps -a;

exec bash\"
"

#.dockerignore must be at context root

#To use the container with nginx load balancing, remove the --publish(port forward from host)...
#...and replace the current container IP address in the nginx.conf file