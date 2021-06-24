const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roleSchema = new Schema ({
    text: String,
})

const dependentSchema = new Schema ({
    firstName: String,
    lastName: String
})

const personSchema = new Schema ({
    firstName: String,
    lastName: String,
    roles: Array,
    dependents: Array,
    birthDate: String
})