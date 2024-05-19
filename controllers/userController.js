const User = require('../models/User');
const emailService = require('../services/emailService');

const sendEmail = async (req, res) => {
    const listId = req.params.listId;
    const { subject, body } = req.body;

    try {
        const users = await User.find({ listId, unsubscribed: false });

        emailService.sendEmails(users, subject, body);

        res.status(200).send({ message: 'Emails are being sent' });
    } catch (error) {
        res.status(500).send(error);
    }
};

const unsubscribe = async (req, res) => {
    const { email, listId } = req.params;

    try {
        const user = await User.findOneAndUpdate(
            { email, listId },
            { unsubscribed: true },
            { new: true }
        );
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        res.status(200).send({ message: 'Unsubscribed successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {sendEmail , unsubscribe}
