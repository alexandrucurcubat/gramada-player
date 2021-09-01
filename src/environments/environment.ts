// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  API_URL: 'https://www.googleapis.com/youtube/v3/search',
  API_KEY: 'AIzaSyDu3ny4tpvTB_mx_l1EfMaIlxRwqmKvtIc',
  firebase: {
    apiKey: 'AIzaSyDu3ny4tpvTB_mx_l1EfMaIlxRwqmKvtIc',
    authDomain: 'gramada-player.firebaseapp.com',
    databaseURL:
      'https://gramada-player-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'gramada-player',
    storageBucket: 'gramada-player.appspot.com',
    messagingSenderId: '695420576286',
    appId: '1:695420576286:web:aab8870e488e2fadedc40f',
  },
  production: false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
