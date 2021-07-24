/*
============================================
; Title: Assignment 4.2
; Author: Professor Krasso
; Date: 20 June 2021
; Modified By: Angela Martin
; Description: This program utilizes Node.js. This is the Composer API.
;===========================================
*/

// Requirements
const express = require('express');

const router = express.Router();

const Composer = require("../models/martin-composer");

/**
 * @openapi
 * /api/composers:
 *   get:
 *     description: Find all composers.
 *     tags: [composer]
 *     responses:
 *       200:
 *         description: Array of composer documents
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */
router.get("/composers", (req, res) => {
    try {
        Composer.find({}, function(error, composers) {
            if (error) res.status(501).send("MongoDB exception")
            res.send(composers);
        });
        
    } catch (error) {
        res.status(500).send("server exception")   
    }
})

/**
 * @openapi
 * /api/composers:
 *   post:
 *     summary: Creates a new composer object
 *     description: Creates a new composer object.
 *     tags: [composer]
 *     requestBody:
 *       description:
 *         Composer's Information
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
router.post("/composers", (req, res) => {
    try {
        Composer.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName
        },(error, composer) => {
            if(error) res.status(501).send("MongoDB exception")
            res.send(composer);
        });
    }

    catch(error) {
        res.status(500).send("server exception")
    }    
})

/**
 * @openapi
 * /api/composers/{id}:
 *   get:
 *     summary: returns a composer document
 *     description: API for returning a single composer object from MongoDB.
 *     tags: [composer]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: 
 *           the composer id requested by the user
 *         required: true
 *         schema:
 *           type: string
 *           description: the composer id requested by the user
 *     responses:
 *       200:
 *         description: Composer document
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */
router.get("/composers/:id", (req, res) => {
    try {
        const id = req.params.id
        Composer.findOne({"_id": id}, function(error, composers) {
            if (error) res.status(501).send("MongoDB exception")
            res.send(composers);
        });
        
    } catch (error) {
        res.status(500).send("server exception")   
    }
})


/**
 * @openapi
 * /api/composers/{id}:
 *   put:
 *     summary: Modify the composer object
 *     description: Modify the composer object
 *     tags: [composer]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: 
 *           the composer id requested by the user
 *         required: true
 *     requestBody:
 *       description:
 *         Composer's Information
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
 *         description: array of composer documents
 *       401:
 *         description: Invalid composerID
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */
router.put("/composers/:id", (req, res) => {
    try {
        const id = req.params.id
        Composer.findOne({"_id": id}, function(error, composer) {
            if (error) res.status(501).send("MongoDB exception")
            if(composer) {
                composer.set({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName
                })
                composer.save((error, composer) => {
                    if(error) res.status(501).send("MongoDB exception")
                    res.send(composer)
                })
            }
            if(!composer) {
                res.status(401).send("Invalid composerID")
            }
            
        });
        
    } catch (error) {
        res.status(500).send("server exception")   
    }
})

/**
 * @openapi
 * /api/composers/{id}:
 *   delete:
 *     summary: Delete the composer object
 *     description: Delete the composer object
 *     tags: [composer]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: 
 *           the composer id requested by the user
 *         required: true
 *     responses:
 *       200:
 *         description: array of composer documents
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */
 router.delete("/composers/:id", (req, res) => {
    try {
        const id = req.params.id
        Composer.findByIdAndDelete({"_id": id}, function(error, composer) {
            if (error) res.status(501).send("MongoDB exception") 
            res.send(composer)           
        });
        
    } catch (error) {
        res.status(500).send("server exception")   
    }
})



// Export router
module.exports = router