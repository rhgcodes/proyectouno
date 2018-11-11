// Author: The Dream Team (Peter Santiago, Brenton Wyman, Ruben Galleguillos, Patrick Mirville)
// Updated: 11.01.2018
// Purpose: Fantasy Football/Craps Betting Themed Game
// Features: This code was built on JS, HTML, HTML5, CSS, CSS3, and Bootstrap

// This is a Test Harness JS for the Login, Team Selector, and Bet Page Flow
// Section also validates that data (is at least) reaching the database

// Initialize Firebase
var config = {
    apiKey: "AIzaSyC19BuOOU7CeeMF_O1V8s0M3xMx-MyoLHI",
    authDomain: "dream-team-game.firebaseapp.com",
    databaseURL: "https://dream-team-game.firebaseio.com",
    projectId: "dream-team-game",
    storageBucket: "dream-team-game.appspot.com",
    messagingSenderId: "369829537224"
};
firebase.initializeApp(config);
var database = firebase.database();

// Test Harness: New Player
// var newplayer

// Test Harness: Variables
var wins1, wins2, wins3, loss1, loss2, loss3, draw1, draw2, draw3;
wins1 = wins2 = wins3 = loss1 = loss2 = loss3 = draw1 = draw2 = draw3 = 0;

var odds1, odds2, odds3;
odds1 = odds2 = odds3 = 0;

var team1earn, team2earn, team3earn;
team1earn = team2earn = team3earn = 0;

var totalbets = 0
var totaltokens = 5000
var tokensearned = 0
var totalearnings = 0
var betlocker = "false"
var currentplayer

function setuser() {
    currentplayer = $("#new-player").text();
    // currentplayer = "Player9999"
    console.log(currentplayer);
    $("#playing-as").text(currentplayer);
}

setuser();

// Test Harness: Initialization
$(document).ready(function () {

    // simplemask.js masking.. because fat fingering text will goof the generator.

    $('#wins-1').simpleMask({
        'mask': ['###'],
        'nextInput': $('#wins-2')
    });
    $('#wins-2').simpleMask({
        'mask': ['###'],
        'nextInput': $('#wins-3')
    });
    $('#wins-3').simpleMask({
        'mask': ['###'],
        'nextInput': $('#loss-1')
    });

    $('#loss-1').simpleMask({
        'mask': ['###'],
        'nextInput': $('#loss-2')
    });
    $('#loss-2').simpleMask({
        'mask': ['###'],
        'nextInput': $('#loss-3')
    });
    $('#loss-3').simpleMask({
        'mask': ['###'],
        'nextInput': $('#draw-1')
    });

    $('#draw-1').simpleMask({
        'mask': ['###'],
        'nextInput': $('#draw-2')
    });
    $('#draw-2').simpleMask({
        'mask': ['###'],
        'nextInput': $('#draw-3')
    });
    $('#draw-3').simpleMask({
        'mask': ['###'],
        'nextInput': $('#wins-1')
    });

});

// Test Harness: Realtime Calculations and DB Write
$('input').keyup(function () {
    calcbets();
    overbet();
});

// Test Harness: Interim Bet Engine
function calcbets() {

    wins1 = $("#wins-1").val().trim();
    loss1 = $("#loss-1").val().trim();
    draw1 = $("#draw-1").val().trim();

    wins2 = $("#wins-2").val().trim();
    loss2 = $("#loss-2").val().trim();
    draw2 = $("#draw-2").val().trim();

    wins3 = $("#wins-3").val().trim();
    loss3 = $("#loss-3").val().trim();
    draw3 = $("#draw-3").val().trim();

    console.log(wins1 + " " + loss1 + " " + draw1);

    // team1earn = ((wins1 + loss1 + draw1) * odds1);
    //If stats change do this: ((wins + loss + draw)* odds)
    team1earn = parseInt(wins1) + parseInt(loss1) + parseInt(draw1);
    team2earn = parseInt(wins2) + parseInt(loss2) + parseInt(draw2);
    team3earn = parseInt(wins3) + parseInt(loss3) + parseInt(draw3);

    // console.log("Team Earnings " + team1earn)

    totalbets = team1earn + team2earn + team3earn
    // console.log("Total Bets " + totalbets)

    tokensearned = totaltokens - totalbets
    // console.log("Total Tokens Earned " + tokensearned)

    $("#earn-1").text(team1earn);
    $("#earn-2").text(team2earn);
    $("#earn-3").text(team3earn);

    $("#totalearnings").text(totalbets);
    $("#tokens-earned").text(tokensearned);



    // Test Harness: Score write
    database.ref().update({
        t_token: tokensearned,
        t1_earn: team1earn,
        t2_earn: team2earn,
        t3_earn: team3earn,
        t_earnings: totalbets
    });


}

function overbet() {
    if (tokensearned < 1) {
        $(':input').val(0);

        $("#earn-1").text(0);
        $("#earn-2").text(0);
        $("#earn-3").text(0);

        $("#totalearnings").text(0);
        $("#tokens-earned").text(5000);
    }
}

$("#reset-this").click(function () {
    tokensearned = 0;
    overbet();
});

$("#bet-this").click(function () {
    betlocker = "True";
    database.ref().update({
        betlock: betlocker
    });
});