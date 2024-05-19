const emailTemplate = (body, user) => {
    // console.log('User Object:', JSON.stringify(user, null, 2)); // Log the user object
    let emailBody = body;

    emailBody = emailBody.replace(/\[name\]/g, user.name);
    emailBody = emailBody.replace(/\[email\]/g, user.email);
    emailBody += `<br><br><a href="${process.env.DOMAIN}/unsubscribe/${user.listId}/${user.email}">Unsubscribe</a>`;


    return emailBody;
};

module.exports = emailTemplate;
