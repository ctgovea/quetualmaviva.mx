'use strict';

module.exports.handler = (event, context, callback) => {
    var fs = require('fs');
    var AWS = require('aws-sdk');
    AWS.config.update({ region: 'us-east-1' });

    let email = event.email === undefined ? '' : event.email;

    if (email === '') {
        context.done(null, "Failed: missing email");
        return;
    }

    if (!email.match(/^[^@]+@[^@]+$/)) {
        console.log('Not sending: invalid email address', event);
        context.done(null, "Failed: invalid email address");
        return;
    }

    var emailHtml = fs.readFileSync('./welcomeEmail.html', 'utf-8');
    var toAndFromAdress = 'ctgovea@gmail.com';

    // Confirmation email to the user

    var paramsUserEmail = {
        Destination: {
            ToAddresses: [toAndFromAdress]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: emailHtml
                },
                Text: {
                    Charset: "UTF-8",
                    Data: "Gracias por suscribirte a Que tu Alma Viva"
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Bienvenido a Que tu Alma Viva"
            }
        },
        ReplyToAddresses: [toAndFromAdress],
        Source: toAndFromAdress,
    };

    // Email sent to admin

    var paramsAdminEmail = {
        Destination: {
            ToAddresses: [toAndFromAdress]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: email
                },
                Text: {
                    Charset: "UTF-8",
                    Data: email
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Que tu Alma Viva - Nueva suscripción"
            }
        },
        ReplyToAddresses: [toAndFromAdress],
        Source: toAndFromAdress,
    };

    // Create the promise and SES service object
    const sendAdmin = new AWS.SES()
        .sendEmail(paramsAdminEmail)
        .promise();

    // Create the promise and SES service object
    const sendPromise = new AWS.SES()
        .sendEmail(paramsUserEmail)
        .promise();

    // Handle promise's fulfilled/rejected states
    sendPromise
        .then(data => {
            console.log(data.MessageId);

            sendAdmin
                .then(data => {
                    console.log(data.MessageId);
                    context.done(null, "Success");
                })
                .catch(err => {
                    console.error(err, err.stack);
                    context.done(null, "Failed");
                });
        })
        .catch(err => {
            console.error(err, err.stack);
            context.done(null, "Failed");
        });
};
