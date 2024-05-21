// routes/contacts.js

const express = require('express');
const Contact = require('../models/contact');
const router = express.Router();

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Returns the list of all the contacts
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: The list of the contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 */
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: The contact was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       500:
 *         description: Some server error
 */

router.post('/', async (req, res) => {
    const contact = new Contact({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        characters: req.body.characters,
        vip: req.body.vip
    });

    try {
        const newContact = await contact.save();
        res.status(201).json(newContact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update the contact by the id
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The contact id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       200:
 *         description: The contact was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: The contact was not found
 *       500:
 *         description: Some error happened
 */
router.put('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        contact.username = req.body.username;
        contact.password = req.body.password;
        contact.email = req.body.email;
        contact.characters = req.body.characters;
        contact.vip = req.body.vip;

        const updatedContact = await contact.save();
        res.json(updatedContact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Remove the contact by id
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The contact id
 *     responses:
 *       200:
 *         description: The contact was deleted
 *       404:
 *         description: The contact was not found
 *       500:
 *         description: Some error happened
 */
router.delete('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        await Contact.deleteOne({ _id: req.params.id });
        res.json({ message: 'Contact deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
