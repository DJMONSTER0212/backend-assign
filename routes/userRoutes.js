const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/:listId/send', userController.sendEmail);
router.post('/unsubscribe/:listId/:email', userController.unsubscribe);

module.exports = router;
