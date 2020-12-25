function setValues() {
    setInterval(function () {
        var arbatunityValue = parseInt(Math.random() * 100);
        var ovexValue = parseInt(Math.random() * 100);
        addValue(arbatunityValue, ovexValue);
    }, 60000);
}

setValues();

function saveValue() {
    var maxValue = document.getElementById("maxValue");
    if (maxValue.value == "") {
        var valueSaved = document.getElementById("valueSaved");
        valueSaved.innerHTML = `You have not set the maximum value till now, first set to get notifications!`;
        firebase.database().ref('Arbatunity Max').remove();
        b = undefined;
    }
    else {
        firebase.database().ref('Arbatunity Max').remove();
        addMax(maxValue.value);
        maxValue.value = "";
    }
}

function saveValue1() {
    var maxValue1 = document.getElementById("maxValue1");
    if (maxValue1.value == "") {
        var valueSaved1 = document.getElementById("valueSaved1");
        valueSaved1.innerHTML = `You have not set the maximum value till now, first set to get notifications!`;
        firebase.database().ref('Ovex Max').remove();
        c = undefined;
    }
    else {
        firebase.database().ref('Ovex Max').remove();
        addMax1(maxValue1.value);
        maxValue1.value = "";
    }
}

function addMax(maxValue) {
    var key = firebase.database().ref('Arbatunity Max').push().key;
    var data = {
        max_value: maxValue,
    }
    firebase.database().ref('Arbatunity Max/' + key).set(data);
    return data;
}

function addMax1(maxValue1) {
    var key = firebase.database().ref('Ovex Max').push().key;
    var data = {
        max_value: maxValue1,
    }
    firebase.database().ref('Ovex Max/' + key).set(data);
    return data;
}

function addValue(arbatunityValue, ovexValue) {
    var key = firebase.database().ref('Crypto Values').push().key;
    var data = {
        arbatunity: arbatunityValue,
        ovex: ovexValue,
        key: key
    }
    firebase.database().ref('Crypto Values/' + key).set(data);
    return data;
}

function getValues() {
    firebase.database().ref('Crypto Values').on('child_added', function (data) {
        var values = document.getElementById("values");
        values.innerHTML += `<li>Current rate: ${data.val().arbatunity}</li><hr>`;
        values.scrollTop = values.scrollHeight;
        var currentValue = data.val().arbatunity;
        window.a = currentValue;
        example();
        notify1();
    });
}

getValues();


function example() {
    const messaging = firebase.messaging();
    messaging.requestPermission().then(function () {
        return messaging.getToken();
    }).then(function (token) {
        firebase.database().ref("fcmToken").set({ token_id: token });
    })
}


function getValues1() {
    firebase.database().ref('Crypto Values').on('child_added', function (data) {
        var values1 = document.getElementById("values1");
        values1.innerHTML += `<li>Current rate: ${data.val().ovex}</li><hr>`;
        values1.scrollTop = values1.scrollHeight;
        var currentValue1 = data.val().ovex;
        window.d = currentValue1;
        notify2();
    });
}

getValues1();

function getMax() {
    firebase.database().ref('Arbatunity Max').on('child_added', function (data) {
        var valueSaved = document.getElementById("valueSaved");
        valueSaved.innerHTML = `You will recieve notification when rates at <b>arbatunity</b> exceeds <b>${data.val().max_value}</b>`;
        var currentMaximum = data.val().max_value;
        window.b = currentMaximum;
    });

    firebase.database().ref('Ovex Max').on('child_added', function (data) {
        var valueSaved1 = document.getElementById("valueSaved1");
        valueSaved1.innerHTML = `You will recieve notification when rates at <b>ovex</b> exceeds <b>${data.val().max_value}</b>`;
        var currentMaximum1 = data.val().max_value;
        window.c = currentMaximum1;
    });
}

getMax();

function notify1() {
    if (a > b) {
        var audio = document.getElementById("audio");
        firebase.database().ref('fcmToken').once('value').then(function (data) {
            audio.play();
            $.ajax({
                url: 'https://fcm.googleapis.com/fcm/send',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'key=AAAAMWhsiow:APA91bE7--DLOVqFMDvV_ehoItw1vy0x_KYqZp3BiwUutOKSDKr-sbcyqUy2ibAlXVIATD7DKqsMUV36rAkTQmMOWHilxpY4aVewpYNbHVyGfffwEdtATnBtkNbyapdJjP7QNCqgsS-9'
                },
                data: JSON.stringify({
                    'to': data.val().token_id, 'data': { 'message': "Looks like the rates at arbatunity exceeds the maximum limit that you had set." }
                })
            })
        })

        // Push.create("CRYPTO CURRENCY RATES", {
        //         body: "Looks like the rates at arbatunity exceeds the maximum limit that you had set.",
        //         icon: 'others/bitcoin.png',
        //         timeout: 6000,
        //         onClick: function () {
        //             window.focus();
        //             this.close();
        //         }
        //     });


    }
}

function notify2() {
    if (d > c) {
        var audio = document.getElementById("audio");
        firebase.database().ref('fcmToken').once('value').then(function (data) {
            audio.play();
            $.ajax({
                url: 'https://fcm.googleapis.com/fcm/send',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'key=AAAAMWhsiow:APA91bE7--DLOVqFMDvV_ehoItw1vy0x_KYqZp3BiwUutOKSDKr-sbcyqUy2ibAlXVIATD7DKqsMUV36rAkTQmMOWHilxpY4aVewpYNbHVyGfffwEdtATnBtkNbyapdJjP7QNCqgsS-9'
                },
                data: JSON.stringify({
                    'to': data.val().token_id, 'data': { 'message': "Looks like the rates at ovex exceeds the maximum limit that you had set." }
                }),
            })
        })
       
        // Push.create("CRYPTO CURRENCY RATES", {
        //     body: "Looks like the rates at ovex exceeds the maximum limit that you had set.",
        //     icon: 'others/bitcoin.png',
        //     timeout: 6000,
        //     onClick: function () {
        //         window.focus();
        //         this.close();
        //     }
        // });
    }
}

function deleteValues() {
    firebase.database().ref('Crypto Values').remove();
    var values = document.getElementById("values");
    var values1 = document.getElementById("values1");
    values.innerHTML = "";
    values1.innerHTML = "";
}

