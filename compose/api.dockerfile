FROM node:lts-alpine
RUN apk update
RUN apk add git
RUN apk add coreutils 

LABEL name="wizardmc-note-api"
LABEL version="1.0"

ARG PORT
ARG DB_CONNECTION
ARG DB_HOST
ARG DB_PORT
ARG DB_USER
ARG DB_NAME
ARG DB_PASSWORD
ARG DB_DEBUG
ARG REDIS_CONNECTION
ARG REDIS_HOST
ARG REDIS_PORT
ARG REDIS_PASSWORD

ENV PORT $PORT
ENV DB_CONNECTION $DB_CONNECTION
ENV DB_HOST $DB_HOST
ENV DB_PORT $DB_PORT
ENV DB_USER $DB_USER
ENV DB_NAME $DB_NAME
ENV DB_PASSWORD $DB_PASSWORD
ENV DB_DEBUG $DB_DEBUG
ENV REDIS_CONNECTION $REDIS_CONNECTION
ENV REDIS_HOST $REDIS_HOST
ENV REDIS_PORT $REDIS_PORT
ENV REDIS_PASSWORD $REDIS_PASSWORD

ENV HOST=0.0.0.0
ENV APP_KEY=ARFdUc9U3H_IqLawMp4Lc2zDW5M4VjKu
ENV HASH_DRIVER=bcrypt
ENV SESSION_DRIVER=cookie
ENV DRIVE_DISK=local

ENV FRONTEND_URL=http://localhost:3000
ENV CLOUD_DESTINATION=cloud

ENV SERVER_VERSION=1

ENV JSONAPI_HOST=
ENV JSONAPI_PORT=
ENV JSONAPI_USER=
ENV JSONAPI_PASSWORD=

ENV REST_KEY=PkKaWAqNBfn7wvGJJbyDwqVzuqL69xPE

ENV RPG_PARADIZE_ID=113062

ENV SMTP_HOST=
ENV SMTP_PORT=
ENV SMTP_USER=
ENV SMTP_PASSWORD=

ENV STRIPE_API_KEY=
ENV PAYMENT_STRIPE_PRIVATE_KEY=
ENV PAYMENT_STRIPE_PUBLIC_KEY=
ENV PAYMENT_STRIPE_WEBHOOK=
ENV PAYMENT_PAYPAL_SANDBOX=true
ENV PAYMENT_PAYPAL_EMAIL=
ENV PAYMENT_DEDIPASS_PRIVATE_KEY=
ENV PAYMENT_DEDIPASS_PUBLIC_KEY=
ENV PAYMENT_DEDIPASS_PRIVATE_KEY=
ENV PAYMENT_DEDIPASS_PUBLIC_KEY=

ENV RECAPTCHA_PRIVATE_KEY=
ENV RECAPTCHA_PUBLIC_KEY=

ENV CLOUDFLARE_EMAIL=
ENV CLOUDFLARE_KEY=
ENV CLOUDFLARE_ZONE=

ENV NODE_ENV development

RUN [ "mkdir", "/app" ]
WORKDIR /app
ADD "https://api.github.com/repos/Galitan-dev/wizardmc.fr/commits?per_page=1" /cache/commit
RUN [ "git", "clone", "https://github.com/Galitan-dev/wizardmc.fr/", "." ]

WORKDIR /app/api
ADD "https://raw.githubusercontent.com/Galitan-dev/wizardmc.fr/master/api/package.json" /cache/package1
RUN [ "yarn", "--ignore-platform" ]
ADD "https://www.random.org/cgi-bin/randbyte?nbytes=10&format=h" /cache/random
RUN [ "node", "ace", "build" ]
# RUN [ "node", "ace", "migration:run" ]

ENV NODE_ENV production

WORKDIR /app/api/build
ADD "https://raw.githubusercontent.com/Galitan-dev/wizardmc.fr/master/api/package.json" /cache/package2
RUN [ "yarn", "--production", "--ignore-platform" ]

ENTRYPOINT [ "node", "/app/api/build/server.js" ]
CMD [ "" ]
