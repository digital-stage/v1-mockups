export const USE_EMULULATOR = false;
export const FIREBASE_CONFIG = USE_EMULULATOR ? {
    apiKey: "AIzaSyCWzfs4Xt9JH0X3lhjTbgb4JC7Q4Bsafr4",
    databaseURL: "http://localhost:9000/?ns=digitalstage-wirvsvirus",
    authDomain: "digitalstage-wirvsvirus.firebaseapp.com",
    projectId: "digitalstage-wirvsvirus",
    storageBucket: "digitalstage-wirvsvirus.appspot.com",
    messagingSenderId: "1034638386283",
    appId: "1:1034638386283:web:0cd659cfc3a20a77f13d2e",
    measurementId: "G-FZP8CCC7MD"
} : {
    apiKey: "AIzaSyCWzfs4Xt9JH0X3lhjTbgb4JC7Q4Bsafr4",
    authDomain: "digitalstage-wirvsvirus.firebaseapp.com",
    databaseURL: "https://digitalstage-wirvsvirus.firebaseio.com",
    projectId: "digitalstage-wirvsvirus",
    storageBucket: "digitalstage-wirvsvirus.appspot.com",
    messagingSenderId: "1034638386283",
    appId: "1:1034638386283:web:0cd659cfc3a20a77f13d2e",
    measurementId: "G-FZP8CCC7MD"
};
export const SERVER_PORT = 3010;
