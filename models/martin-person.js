/*
============================================
; Title: Assignment 5.2
; Author: Professor Krasso
; Date: 24 June 2021
; Modified By: Angela Martin
; Description: This program demonstrates the 
; use of Node.js in the Person API.
===========================================
*/

// Required
const mongoose = require("mongoose");

// Create Schema variable and assign mongoose.Schema object.
const Schema = mongoose.Schema;

// Create roleSchema variable with the specified fields.
const roleSchema = new Schema ({
    text: String,
})

// Create dependentSchema variable with the specified fields.
const dependentSchema = new Schema ({
    firstName: String,
    lastName: String
})

// Create personSchema variable with the specified fields.
const personSchema = new Schema ({
    firstName: String,
    lastName: String,
    roles: Array,
    dependents: Array,
    birthDate: String
})

// Create Person - assign mongoose model
const Person = mongoose.model("Person", personSchema);

// Export Person
module.exports = Person;