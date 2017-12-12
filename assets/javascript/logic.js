///////// HIGH LEVEL LOGIC /////////

// On page load, initialize firebase and set up click events
$(document).ready(function () {

    // Initialize Firebase
    main.initFirebase();

    // When add train is clicked, add a train
    $("#addTrain").on("click", function (event) {

        // Prevent refresh
        event.preventDefault();

        // Add a train
        main.addTrain();
    });

    // When a train is added, populate the train table
    main.database.ref().on("child_added", function (childSnapshot) {

        // Populate the Train table
        main.populate(childSnapshot);

        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
});

////////////////////////////////////

//////////// CORE LOGIC ////////////

// Object containing logic and references
var main = {

    // Holds the database reference
    database: "",

    // Initialize Firebase
    initFirebase: () => {
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
    addTrain: () => {

        // If any field is left empty, alert the user and terminate execution
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

        // Create local temp vars
        let tFrequency = childSnapshot.val().Freq;
        let firstTime = childSnapshot.val().Time;

        // Converts the firstTime and subtracts a year
        let convert = moment(firstTime, "HH:mm").subtract(1, "years");

        // Gets current time
        let currentTime = moment();

        // Gets the difference between current and first time
        let diffTime = moment().diff(moment(convert), "minutes");
        console.log(diffTime);

        // Calculates the time difference
        let tRemainder = diffTime % tFrequency;

        // Calculates the minutes until the next train
        let tMinutesTillTrain = tFrequency - tRemainder;


        // Calculates the time of arrival
        let nextTrain = moment(moment().add(tMinutesTillTrain, "minutes")).format("hh:mm");

        // Creates a table row containing the train parameters
        $("#trains").append(

            // Native Vals
            "<tr><td> " + childSnapshot.val().Name +
            " </td><td> " + childSnapshot.val().Dest +
            " </td><td> " + childSnapshot.val().Freq +

            // Calculated Vals
            " </td><td> " + nextTrain +
            " </td><td> " + tMinutesTillTrain + "</td></tr>"
        );
    }
}

////////////////////////////////////