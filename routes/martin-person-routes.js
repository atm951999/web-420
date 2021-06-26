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
const express = require("express");

const router = express.Router();

const Person = require("../models/martin-person");

/**
 * @openapi
 * /api/persons:
 *   get:
 *     description: Find all persons.
 *     responses:
 *       200:
 *         description: Array of person documents
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */
 router.get("/persons", (req, res) => {
    try {
        Person.find({}, function(error, persons) {
            if (error) res.status(501).send("MongoDB exception")
            res.send(persons);
        });
        
    } catch (error) {
        res.status(500).send("server exception")   
    }
})


/**
 * @openapi
 * /api/persons:
 *   post:
 *     summary: Creates a new person object
 *     description: Creates a new person object.
 *     requestBody:
 *       description:
 *         Person's Information
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             properties:
 *               firstName:
 *                 type: "string"
 *               lastName:
 *                 type: "string"
 *     responses:
 *       200:
 *         description: Composer document
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */
 router.post("/persons", (req, res) => {
    try {
        Person.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            roles: req.body.roles,
            dependents: req.body.dependents,
            birthDate: req.body.birthDate
        },(error, person) => {
            if(error) res.status(501).send("MongoDB exception")
            res.send(person);
        });
    }

    catch(error) {
        res.status(500).send("server exception")
    }    
})


