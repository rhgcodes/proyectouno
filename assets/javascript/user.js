// Author: The Dream Team (Peter Santiago, Brenton Wyman, Ruben Galleguillos, Patrick Mirville)
// Updated: 11.01.2018
// Purpose: Fantasy Football/Craps Betting Themed Game
// Features: This code was built on JS, HTML, HTML5, CSS, CSS3, and Bootstrap

// This is a Test Harness JS for the Login, Team Selector, and Bet Page Flow
// Section also validates that data (is at least) reaching the database

// Initialize Firebase
// var config = {
//     apiKey: "AIzaSyC19BuOOU7CeeMF_O1V8s0M3xMx-MyoLHI",
//     authDomain: "dream-team-game.firebaseapp.com",
//     databaseURL: "https://dream-team-game.firebaseio.com",
//     projectId: "dream-team-game",
//     storageBucket: "dream-team-game.appspot.com",
//     messagingSenderId: "369829537224"
// };
// firebase.initializeApp(config);
// var database = firebase.database();

var currentplayer

// Test Harness: Initialization
$(document).ready(function () {

    function setuser() {
        currentplayer = $("#new-player").text();
        // currentplayer = "Player9999"
        console.log(currentplayer);
        $("#playing-as").text(currentplayer);
    }
    
    setuser();

});


