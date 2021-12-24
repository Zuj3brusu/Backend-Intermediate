FROM node:lts-alpine
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "yarn.lock" ,"npm-shrinkwrap.json*", "./"]
RUN yarn global add @nestjs/cli
RUN yarn install
RUN mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["yarn", "run start"]
