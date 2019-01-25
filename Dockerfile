FROM node:9.2.0
ARG PATH_SSH=/root/.ssh

LABEL authors="Michael Mordowanec"

ENV USERNAME "node"
ENV USERHOME "/home/$USERNAME"
ENV PROJECTHOME "$USERHOME/firefox-extension-base"

RUN apt-get update && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR $PROJECTHOME

RUN npm install -g \
    yarn \
    eslint

RUN npm config set loglevel error

COPY .babelrc $PROJECTHOME
COPY package.json $PROJECTHOME
COPY src/ $PROJECTHOME/src
COPY webpack.config.js $PROJECTHOME
COPY yarn.lock $PROJECTHOME


# https://github.com/yarnpkg/yarn/issues/2629
RUN yarn install --frozen-lockfile --network-concurrency=1 && yarn cache clean

RUN chown -R "$USERNAME:$USERNAME" "$USERHOME"

VOLUME $PROJECTHOME/node_modules

USER $USERNAME

CMD ["yarn", "build"]
