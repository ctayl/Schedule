$(document).ready(function () {
    main.initFirebase();
    console.log(main.database);
    $("#addTrain").on("click", function (event) {
        event.preventDefault();
        main.addTrain();
    });

});

var main = {

    database: "",

    // Initialize Firebase
    initFirebase: function () {
        var config = {
            apiKey: "AIzaSyDCqBPtJJ-IThsynGIck9-CTBIMCNgSyyw",
            authDomain: "test-4998f.firebaseapp.com",
            databaseURL: "https://test-4998f.firebaseio.com",
            projectId: "test-4998f",
            storageBucket: "test-4998f.appspot.com",
            messagingSenderId: "718765377102"
        };

        firebase.initializeApp(config);

        main.database = firebase.database();
    },

    addTrain: function () {

        var name = $("#name").val();
        var dest = $("#dest").val();
        var time = $("#time").val();
        // var freq = $("#freq").val();
        console.log(name);
        console.log(dest);
        console.log(time);
        // console.log(freq);

        main.database.ref().set({
            Name: name,
            Dest: dest,
            Time: time,
            // freq: freq
        });

    }
}