FROM debian:jessie
RUN apt-get update && apt-get install -y nodejs git wget build-essential python && rm -rf /var/lib/apt/lists/*
RUN mkdir -p /usr/local/nvm
ENV NVM_DIR /usr/local/nvm
RUN wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash && . $NVM_DIR/nvm.sh && nvm install 10.15.2
RUN mkdir /opt/service
ADD . /opt/service
WORKDIR /opt/service
RUN . $NVM_DIR/nvm.sh && nvm use 10.15.2 && npm install && npm dedupe
ENV HOME=/root/ LINK=g++
ENV IN_DOCKER=1
CMD . $NVM_DIR/nvm.sh && nvm use 10.15.2 && npm start