FROM node:20 as client_build
WORKDIR /src/
COPY ./client/package.json ./client/yarn.lock ./
RUN yarn install --frozen-lockfile --production --non-interactive
COPY ./client/ ./
RUN yarn build

FROM ruby:3.2.2 as server_build
WORKDIR /app/
EXPOSE 8000
COPY ./server/Gemfile ./server/Gemfile.lock ./
RUN gem install bundler && bundle install --without development test
COPY ./server/ ./
RUN rails RAILS_ENV=production db:migrate
RUN rails RAILS_ENV=production db:seed
COPY --from=client_build /src/out/ ./public/
CMD bundle exec puma -e production -p 8000
