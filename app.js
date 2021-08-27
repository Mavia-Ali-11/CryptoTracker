function saveValue() {
    var maxValue = document.getElementById("maxValue");
    if (maxValue.value == "") {
        var valueSaved = document.getElementById("valueSaved");
        valueSaved.innerHTML = `Max value is not set!`;
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
        valueSaved1.innerHTML = `Max value is not set!`;
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

function getMax() {
    firebase.database().ref('Arbatunity Max').on('child_added', function (data) {
        var valueSaved = document.getElementById("valueSaved");
        valueSaved.innerHTML = `Max profit % set for <b>arbatunity is ${data.val().max_value}</b>`;
        var currentMaximum = data.val().max_value;
        window.b = currentMaximum;
    });
    
    firebase.database().ref('Ovex Max').on('child_added', function (data) {
        var valueSaved1 = document.getElementById("valueSaved1");
        valueSaved1.innerHTML = `Max profit % set for <b>ovex is ${data.val().max_value}</b>`;
        var currentMaximum1 = data.val().max_value;
        window.c = currentMaximum1;
    });
}

getMax();

function getValues() {
    firebase.database().ref('Crypto Values').on('child_added', function (data) {
        var values1 = document.getElementById("values1");
        values1.innerHTML += `<li>${data.val().arbatunity}<span id="time">${data.val().current_time}</span></li><hr>`;
        values1.scrollTop = values1.scrollHeight;
        var currentValue = data.val().arbatunity;
        notify1(currentValue);
    });
}

getValues();

function getValues1() {
    firebase.database().ref('Crypto Values').on('child_added', function (data) {
        var values2 = document.getElementById("values2");
        values2.innerHTML += `<li>${data.val().ovex}<span id="time">${data.val().current_time}</span></li><hr>`;
        values2.scrollTop = values2.scrollHeight;
        var currentValue1 = data.val().ovex;
        notify2(currentValue1);
    });
}

getValues1();

function notify1(a) {
    firebase.database().ref('Arbatunity Max').on('child_added', function (data) {
        var currentMaximum = data.val().max_value;
        if (a > currentMaximum) {
            var audio = document.getElementById("audio");
            audio.play();
    
            // Push.create("CRYPTO CURRENCY RATES", {
            //     body: "Looks like the profit % at arbatunity exceeds the limit that you had set.",
            //     icon: 'others/bitcoin.png',
            //     timeout: 6000,
            //     onClick: function () {
            //         window.focus();
            //         this.close();
            //     }
            // });
        }
    });
    
}

function notify2(d) {
    firebase.database().ref('Ovex Max').on('child_added', function (data) {
        var currentMaximum1 = data.val().max_value;
        window.c = currentMaximum1;
        if (d > currentMaximum1) {
            var audio = document.getElementById("audio");
            audio.play();
    
            // Push.create("CRYPTO CURRENCY RATES", {
            //     body: "Looks like the profit % at ovex exceeds the limit that you had set.",
            //     icon: 'others/bitcoin.png',
            //     timeout: 6000,
            //     onClick: function () {
            //         window.focus();
            //         this.close();
            //     }
            // });
        }
    });
}

function deleteValues() {
    firebase.database().ref('Crypto Values').remove();
    var values = document.getElementById("values");
    var values1 = document.getElementById("values1");
    values.innerHTML = "";
    values1.innerHTML = "";
    location.reload();
}