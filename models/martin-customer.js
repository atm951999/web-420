/*
============================================
; Title: Assignment 7.2
; Author: Professor Krasso
; Date: 07 July 2021
; Modified By: Angela Martin
; Description: This program demonstrates the 
; use of Node.js in the NodeShopper API.
===========================================
*/

// Required
const mongoose = require("mongoose");

// Create Schema variable and assign mongoose.Schema object.
const Schema = mongoose.Schema;

// Create lineItemSchema variable with the specified fields.
const lineItemSchema = new Schema ({
    name: String,
    price: Number,
    quantity: Number
})

// Create invoice variable with the specified fields.
const invoiceSchema = new Schema ({
    subtotal: Number,
    tax: Number,
    dateCreated: String,
    dateShipped: String,
    lineItems: [lineItemSchema]
})

// Create invoice variable with the specified fields.
const customerSchema = new Schema ({
    firstName: String,
    lastName: String,
    userName: String,
    invoices: [invoiceSchema]
})

// Create Customer - assign mongoose model
const Customer = mongoose.model("Customer", customerSchema);

// Export Customer
module.exports = Customer;