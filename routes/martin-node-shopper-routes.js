/*
============================================
; Title: Assignment 7.2
; Author: Professor Krasso
; Date: 10 July 2021
; Modified By: Angela Martin
; Description: This program utilizes Node.js. This is the Customer API.
;===========================================
*/

// Requirements
const express = require('express');

const router = express.Router();

const Customer = require("../models/martin-customer");

/**
 * @openapi
 * /api/customers:
 *   post:
 *     summary: Creates a new customer object
 *     description: Creates a new customer object.
 *     tags: [customer]
 *     requestBody:
 *       description:
 *         Customer's Information
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             properties:
 *               firstName:
 *                 type: "string"
 *               lastName:
 *                 type: "string"
 *               userName:
 *                 type: "string"
 *     responses:
 *       200:
 *         description: Customer added to MongoDB
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */
 router.post("/customers", (req, res) => {
    try {
        const newCustomer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName
        }
        Customer.create(newCustomer,
            
        (error, customer) => {
            if(error) res.status(501).send("MongoDB exception")
            res.send(customer);
        });
    }

    catch(error) {
        res.status(500).send("server exception")
    }
})
 /**
 * @openapi
 * /api/customers/{username}/invoices:
 *   post:
 *     summary: Creates a new invoice object
 *     description: Creates a new invoice object.
 *     tags: [invoice]
 *     parameters:
 *       - in: path
 *         name: username
 *         description: 
 *           the username of the customer requested by the customer
 *         required: true
 *         schema:
 *           type: string
 *           description: the username of the customer requested by the customer
 *     requestBody:
 *       description:
 *         invoice's Information
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             properties:
 *               subtotal:
 *                 type: "string"
 *               tax:
 *                 type: "string"
 *               dateCreated:
 *                 type: "string"
 *               dateShipped:
 *                 type: "string"
 *               lineItems:
 *                 type: "array"
 *                 items: 
 *                   type: "object"
 *                   properties:
 *                     name: 
 *                       type: "string"
 *                     price:
 *                       type: "number"
 *                     quantity:
 *                       type: "number"
 *     responses:
 *       200:
 *         description: Customer added to MongoDB
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */

 router.post("/customers/:username/invoices", (req, res) => {
   
    try {
        Customer.findOne({"userName": req.params.username}, (error, customer) => {
            if(error) res.status(501).send("MongoDB exception")
            if(customer) {
                const newInvoice = {
                    subtotal: req.body.subtotal,
                    tax: req.body.tax,
                    dateCreated: req.body.dateCreated,
                    dateShipped: req.body.dateShipped,
                    lineItems: req.body.lineItems
                }
                customer.invoices.push(newInvoice)
                customer.save((error, customer) => {
                    if(error) res.status(501).send("MongoDB exception")
                    res.send(customer)
                })
            }
            else {
                res.status(501).send("MongoDB exception")
            }
        });
    }

    catch(error) {
        res.status(500).send("server exception")
    }    
})

 /**
 * @openapi
 * /api/customers/{username}/invoices:
 *   get:
 *     summary: get all invoice objects for customer
 *     description: get all invoice objects for customer
 *     tags: [invoice]
 *     parameters:
 *       - in: path
 *         name: username
 *         description: 
 *           the username of the customer requested by the customer
 *         required: true
 *         schema:
 *           type: string
 *           description: the username of the customer requested by the customer
 *     responses:
 *       200:
 *         description: Customer added to MongoDB
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */

  router.get("/customers/:username/invoices", (req, res) => {
   
    try {
        Customer.findOne({"userName": req.params.username}, (error, customer) => {
            if(error) res.status(501).send("MongoDB exception")
            if(customer) {
                res.json(customer.invoices)
            }
            else {
                res.status(501).send("MongoDB exception")
            }
        });
    }

    catch(error) {
        res.status(500).send("server exception")
    }    
})

module.exports = router