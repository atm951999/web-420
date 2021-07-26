/*
============================================
; Title: Assignment 9.2
; Author: Professor Krasso
; Date: 24 July 2021
; Modified By: Angela Martin
; Description: This program demonstrates the 
; use of Node.js in the Team API.
===========================================
*/

// Required
const mongoose = require("mongoose");

// Create Schema variable and assign mongoose.Schema object.
const Schema = mongoose.Schema;

// Create playerSchema variable
const playerSchema = new Schema ({
    firstName: String,
    lastName: String,
    salary: Number
})

// Create teamSchema variable
const teamSchema = new Schema ({
    name: String,
    mascot: String,
    players: [playerSchema]
})

//Create Team - assign mongoose model
const Team = mongoose.model("Team", teamSchema);

// Export Team
module.exports = Team;