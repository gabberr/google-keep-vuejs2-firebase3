# Google Keep clone

Inspired by 
https://scotch.io/tutorials/building-a-google-keep-clone-with-vue-and-firebase-pt-1

All 3 parts of tutorial implemented and updated to use Vue.js version 2 and Firebase version 3

## Firebase config

Create /src/data/config.json file containing the Firebase app credentials

```
{
   "apiKey": <API_KEY>,
   "authDomain": <AUTH_DOMAIN>,
   "databaseURL": <DATABASE_URL>,
   "storageBucket": <STORAGE_BUCKE>,
   "messagingSenderId": <SENDER_ID>
 }
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
