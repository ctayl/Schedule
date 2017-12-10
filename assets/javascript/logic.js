

// On page load
$(document).ready(function () {

    // Initialize Firebase
    main.initFirebase();

    // When add train is clicked
    $("#addTrain").on("click", function (event) {

        // Prevent refresh
        event.preventDefault();

        // Add a train
        main.addTrain();

    });

    // When a train is added
    main.database.ref().on("child_added", function (childSnapshot) {

        // Populate the Train table
        main.populate(childSnapshot);

        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
});

// Object containing logic and references
var main = {

    // Holds the database reference
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

        // Store the database reference to the object parameter
        main.database = firebase.database();
    },

    // Adds a train to the database
    addTrain: function () {

        // Grabs inputs from text fields


        if ($("#name").val()) {
            var name = $("#name").val();
        } else {
            alert("all fields required");
            return
        };
        if ($("#freq").val()) {
            var freq = $("#freq").val();
        } else {
            alert("all fields required");
            return
        };
        if ($("#dest").val()) {
            var dest = $("#dest").val();
        } else {
            alert("all fields required");
            return
        };

        if ($("#time").val()) {
            var time = $("#time").val();

        } else {
            alert("all fields required");
            return
        };

        // Pushes values to database
        main.database.ref().push({
            Name: name,
            Dest: dest,
            Time: time,
            Freq: freq
        });
    },

    // Fills the train table with all trains in the database
    populate: (childSnapshot) => {

        // Log everything that's coming out of snapshot
        // console.log(childSnapshot.val().Name);
        // console.log(childSnapshot.val().Dest);
        // console.log(childSnapshot.val().Time);
        // console.log(childSnapshot.val().Freq);

        let tFrequency = childSnapshot.val().Freq;
        
        let firstTime = childSnapshot.val().Time;
        // var time = moment(temp).format("HH:mm");
        console.log(firstTime);
        let convert = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(convert._i);
        let firstTimeConverted = moment(convert._i, "HHmm").format("HH:mm");
        // console.log(moment(firstTimeConverted._i).format("HH:mm"));
        console.log(firstTimeConverted);
        let currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        let diffTime = moment().diff(moment(convert), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        let tRemainder = diffTime % tFrequency;
        console.log("time left " + tRemainder);

        // Minute Until Train
        let tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        let nextTrain = moment(moment().add(tMinutesTillTrain, "minutes")).format("hh:mm");

        // Creates a table row containing the train parameters
        $("#trains").append(
            "<tr><td> " + childSnapshot.val().Name +
            " </td><td> " + childSnapshot.val().Dest +
            // " </td><td> " + childSnapshot.val().Time +
            // " </td><td> " + childSnapshot.val().Freq +
            " </td><td> " + nextTrain +
            " </td><td> " + tMinutesTillTrain + "</td></tr>"
        );
    }
}
