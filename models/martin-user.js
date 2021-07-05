/*
============================================
; Title: Assignment 6.2
; Author: Professor Krasso
; Date: 03 July 2021
; Modified By: Angela Martin
; Description: This program demonstrates the 
; use of Node.js in the NodeSecurity API.
===========================================
*/

// Required
const mongoose = require("mongoose");

// Create Schema variable and assign mongoose.Schema object.
const Schema = mongoose.Schema;

// Create dependentSchema variable with the specified fields.
const userSchema = new Schema ({
    userName: String,
    Password: String,
    emailAddress: Array
})

// Create User - assign mongoose model
const User = mongoose.model("User", userSchema);

// Export User
module.exports = User;