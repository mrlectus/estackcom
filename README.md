# ESTACKCOM

Your eCommerce webapp that uses redux for state and async state mamagement!

## Project Setup

### Environment Variables

This project uses some environment variable that we have to setup for the app to function properly.

- Copy the .env.example to .env and then change this variable to the correct value

    - **BLOB_READ_WRITE_TOKEN=""** This variable is gotten from vercel [blobToken](https://vercel.com). Signup to vercel and go to the storage
      tab. Then click on create database, and then select Blob (Fast Object storage). And environemnt variable would be provided for you.
      copy it to BLOB_READ_WRITE_TOKEN="<env variable you got>"

    - **TURSO_DATABASE_URL=""** & **TURSO_AUTH_TOKEN=""** This variable is gotton from turso [turso](https://app.turso.tech). Visit the link and
      signup to turso. Create a Group and then create a database. after doing that. Go to the database section under group and copy the
      **TURSO_DATABASE_URL**, it looks something like `libsql://<url>.turos.io` Then click on the three dot on the database and click on create
      token. Copy the token and insert it into **TURSO_AUTH_TOKEN="<token>"**.

    - **STRIPE_SECRET=""** This variable is gotton for stripe to simulate test online payment. visit [stripe](https://dashboard.stripe.com/test/dashboard) create an account. Then when you log in click on developers. Then go to API Keys and click on reveal test key and copy the value to **STRIPE_SECRET=<Secret Key>**

### Starting The App

After your environment variable has been setup, install the dependencies by running `npm install` or `pnpm install` depending on the package
manager you are using. After all dependencies has been installed run `npm run start` to start the app.

### Runing Your database migration

You have to run database migration to be able to start using the app. Run this commands

- `npx drizzle-kit generate`
- `npx drizzle-kit migrate`
