FROM node:14.4.0-alpine3.10
USER root
WORKDIR /frontend
COPY . /frontend
ENV REACT_APP_HOST_IP_ADDRESS http://34.69.180.162
RUN yarn
RUN yarn build