# MyStylist - Wardrobe Tracker App
_Current version (17th June 2025): v1.0_

Mobile application which allows users to track information about their clothes and outfits. Developed as a project for the course Advanced Mobile Programming @ IBU. Contains features like:
- Adding, Removing and Viewing items of clothing along with information and images
- Adding, Removing and Viewing outfits along with information and images
- Adding and Removing wishlist items to keep track of what the user wants to buy
- Viewing wardrobe stats such as Number of clothes, Number of outfits...

## Running the app
Developed using React Native & Firebase. Compiled using Expo SDK 53.
The 'server' and 'seeds' directories are irrelevant to the project, but they mimic the structure of the firebase backend for better understanding.
To run the application locally, environment variables need to be added to a .env to the root of the folder, as specified by the end.d.ts:
```js
// env.d.ts
declare module '@env' {
  export const FIREBASE_API_KEY: string;
  export const FIREBASE_AUTH_DOMAIN: string;
  export const FIREBASE_PROJECT_ID: string;
  export const FIREBASE_STORAGE_BUCKET: string;
  export const FIREBASE_MESSAGING_SENDER_ID: string;
  export const FIREBASE_APP_ID: string;
  export const IMG_BB_SECRET: string // Images are stored on the users IMG BB account
}

```

Afterwards, running the following command runs the whole app.
```js
npx expo start
```
