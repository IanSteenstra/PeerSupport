FROM node:14.4.0-alpine3.10
USER root
WORKDIR /frontend
COPY . /frontend
ENV REACT_APP_HOST_IP_ADDRESS http://127.0.0.1
RUN yarn
RUN yarn build