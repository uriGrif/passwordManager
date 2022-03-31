# Personal Password Manager

This small project is to be used as a personal password manager, which uses AES encryption and decryption on front-end side.

It is made by default to be served in netlify, using its serverless functions.

## Instructions

1. create MongoDB Atlas account (or any mongodb instance)
2. create a .env file with the following values:

```
MONGO_URI=
JWT_SECRET=
MY_SECRET_PASS=
```

3. install dependencies

```
$ npm i
$ npm i -g netlify-cli
```

4. run `$ node createUser.js` to create master user in the db (using MY_SECRET_PASS as the password)

5. run `$ npm run ntl-dev` to start local development server
