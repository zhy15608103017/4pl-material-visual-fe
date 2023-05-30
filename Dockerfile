FROM 10.0.7.102/toolkit/nginx:1.16
LABEL maintainer="jusda-cdsd2"
RUN rm /etc/nginx/conf.d/default.conf
ADD default.conf /etc/nginx/conf.d/
COPY build/  /usr/share/nginx/html/
EXPOSE 80