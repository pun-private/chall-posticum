FROM ubuntu/apache2:latest

RUN apt-get update
RUN apt-get install -y nodejs supervisor
RUN apt-get install -y curl sysstat 

WORKDIR /app/

COPY conf/apache.conf /etc/supervisor/conf.d/
COPY conf/nodejs.conf /etc/supervisor/conf.d/

COPY src/api /app
COPY src/website /var/www/html

EXPOSE 80
EXPOSE 42088

CMD ["supervisord"]