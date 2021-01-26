# Development 🔧

## Firebase
https://firebase.google.com/docs/cli#mac-linux-npm
```
npm install -g firebase-tools
```
After installation proceed to login via CLI.
```
firebase login
```

This installs the firebase cli node module. This will be used throughout the project for creating, deploying and testing firebase functionalities.

## Emulators
Emulators can be installed locally to test out different firebase functionalities locally https://firebase.google.com/docs/emulator-suite/install_and_configure
```
firebase init emulators
```

To start all emulators
```
firebase emulators:start
```