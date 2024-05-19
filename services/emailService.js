const nodemailer = require('nodemailer');
const emailTemplate = require('../utils/emailTemplate');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL ||"annonymous101100@gmail.com",
        pass: process.env.PASSWORD || "ceaqdjvntzuahcdn"
    }
});

exports.sendEmails = async (users, subject, body) => {
    try {
        // console.log(body)
        for (const user of users) {
            const emailBody = emailTemplate(body, user);
            await transporter.sendMail({
                from: "annonymous101100@gmail.com",
                to: user.email,
                subject,
                html: emailBody
            });
        }
    } catch (error) {
        console.log(error);
    }

};
