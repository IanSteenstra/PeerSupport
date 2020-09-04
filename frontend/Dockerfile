FROM node:14.4.0-alpine3.10
USER root
WORKDIR /frontend
COPY . /frontend
ENV REACT_APP_HOST_IP_ADDRESS http://35.238.235.146
RUN yarn
RUN yarn build