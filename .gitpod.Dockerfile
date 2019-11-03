FROM gitpod/workspace-full

USER root

RUN curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose \
    chmod +x /usr/local/bin/docker-compose \
    apt-get install docker-ce docker-ce-cli containerd.io -y
