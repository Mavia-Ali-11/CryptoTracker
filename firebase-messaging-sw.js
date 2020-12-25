importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js');

var firebaseConfig = {
    apiKey: "AIzaSyAJSJQW_nEEB6021yNM_Ed9_uhf0bt2dF8",
    authDomain: "assignment-f6703.firebaseapp.com",
    databaseURL: "https://assignment-f6703.firebaseio.com",
    projectId: "assignment-f6703",
    storageBucket: "assignment-f6703.appspot.com",
    messagingSenderId: "212205341324",
    appId: "1:212205341324:web:20aa38a103a09d9dc749a9",
    measurementId: "G-0LCQML7QM1"
};
firebase.initializeApp(firebaseConfig);


const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = 'CRYPTO CURRENCY RATES';
    const notificationOptions = {
        body: payload.data.message,
        icon: 'others/bitcoin.png',
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});