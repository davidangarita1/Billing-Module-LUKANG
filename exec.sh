#! /bin/bash

sudo /etc/init.d/mysql start # reset mysql
cd back && ./mvnw spring-boot:run && cd ..