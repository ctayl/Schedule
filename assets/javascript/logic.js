$(document).ready(function () {
    main.initFirebase();
    console.log(main.database);
    $("#addTrain").on("click", function (event) {
        event.preventDefault();
        main.addTrain();
    });
    main.database.ref().on("child_added", function (childSnapshot) {

        main.populate(childSnapshot);

        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
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
        var freq = $("#freq").val();
        console.log(name);
        console.log(dest);
        console.log(time);
        console.log(freq);

        main.database.ref().push({
            Name: name,
            Dest: dest,
            Time: time,
            Freq: freq
        });
    },

    populate: (childSnapshot) => {

        // Log everything that's coming out of snapshot
        console.log(childSnapshot.val().Name);
        console.log(childSnapshot.val().Dest);
        console.log(childSnapshot.val().Time);
        console.log(childSnapshot.val().Freq);

        // full list of items to the well
        $("#trains").append(
            "<tr><td> " + childSnapshot.val().Name +
            " </td><td> " + childSnapshot.val().Dest +
            " </td><td> " + childSnapshot.val().Time +
            " </td><td> " + childSnapshot.val().Freq +
            " </td></tr>"
        );
    }
}
