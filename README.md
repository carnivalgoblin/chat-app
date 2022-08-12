# ProChat

## Description

This app is built with React Native.The app will
provide users with a chat interface and options to share images and their
location.
Users can choose background color for their chat sessions as well as a username.

## Getting Started

Simplest way to get this started is to clone the repo:

```
git clone https://github.com/carnivalgoblin/chat-app.git
```

## Features

The following features are planned for this app:

- A page where users can enter their name and choose a background color for the chat screen
  before joining the chat.
- A page displaying the conversation, as well as an input field and submit button.
- The chat must provide users with two additional communication features: sending images
  and location data.
- Data gets stored online and offline.

## Technical requirements

- The app must be written in React Native.
- The app must be developed using Expo.
- The app must be styled according to the given screen design.
- Chat conversations must be stored in Google Firestore Database.
- The app must authenticate users anonymously via Google Firebase authentication.
- Chat conversations must be stored locally.
- The app must let users pick and send images from the phone’s image library.
- The app must let users take pictures with the device’s camera app, and send them.
- The app must store images in Firebase Cloud Storage.
- The app must be able to read the user’s location data.
- Location data must be sent via the chat in a map view.
- The chat interface and functionality must be created using the Gifted Chat library.
- The app’s codebase must contain comments.

## Technologies used

- React Native
- Expo
- React Navigation

This app is built using React Native, in order to have an app that can be used on differetn mobile platforms without maintaining multiple source codes.
Usage of the React Native framework alos help to increase performance in comparison to hybrid apps.
For navigation purposes this ap uses a thrid party library, **React Navigation**.

For building, testing and debugging I use Expo and Android Studio for emulation.

## Installation

### Install prerequisites

```
- Node.js and npm
- Android Studio or Xcode for iOS
- Expo / Expo Go
```

### Install required packages from package.json

```
- Download this repo
- Navigate to root folder via CLI
- Install required packages in package.json via "npm i"
```

### Run the App

```
- Navigate to root folder
- Run expo start or npm start
- Expo will build the project and display development options in a browser window.
- The Expo Go app can be used to show the app on a physical device. Scan the QR Code in the development options with the app
- The app can also be run through an emulator on your desktop via Expo
```
