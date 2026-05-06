# react-native-safe-area-context 
A React Native package that ensures UI elements are properly positioned within the safe areas of all devices, avoiding overlaps with notches, status bars, and system navigation elements.

## How To Use
```js
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context"
import {styled} from "nativewind"
const SafeAreaView = styled(RNSafeAreaView) 
```
---

# posthog
For analytics

# Building The App
First create an account on expo application services (EAS)
## eas-cli
For handling the build process

## Installation

``` bash
npm i -g eas-cli
```
## Registrations required

- Apple Developer Program
- Google Play Console

## Login on project terminal
``` bash
eas login
```

This might prompt you to input a password  in which case you go to your eas account to confirm or create a new one if you didn't have previously.

## Confirm Login
``` bash
eas whoami
```

## Configure the app
``` bash
eas build:configure
```

# app.json configuration
 ### Setting unique  build identifiers
``` json
   "ios": {
      "bundleIdentifier": "com.da.trackle",
    },
    "android": {
      "package": "com.da.trackle",
    }
```

# Build the app

### Build All

``` bash
eas build --platform all --profile production
```
### Build ios

``` bash
eas build --platform ios --profile production
```

### Build Android

``` bash
eas build --platform android --profile production
```

# Error Fixes

### Syncing package.json and package-lock.json

```bash
npm install
```
or
```bash
rm -rf node_modules package-lock.json
npm install
```

# Submit App

### Submit ios
``` bash
eas submit --platform ios
```
### Submit Android
``` bash
eas submit --platform android
```