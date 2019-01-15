'use strict';

exports.handler = function (event, context, callback) {
    var fs = require('fs');
    var AWS = require('aws-sdk');
    AWS.config.update({ region: 'us-east-1' });

    // Parse the input for the name, email, phone and comments property values
    let name = event.name === undefined ? '' : event.name;
    let email = event.email === undefined ? '' : event.email;
    let phone = event.phone === undefined ? '' : event.phone;
    let comments = event.comments === undefined ? '' : event.comments;

    if (email === '') {
        context.done(null, "Failed: missing email");
        return;
    }

    if (!email.match(/^[^@]+@[^@]+$/)) {
        console.log('Not sending: invalid email address', event);
        context.done(null, "Failed: invalid email address");
        return;
    }

    let content = name + ' \n' + email + ' \n ' + phone + '\n' + comments;

    var toAndFromAdress = 'ctgovea@gmail.com';
    var emailHtml = fs.readFileSync('./registrationEmail.html', 'utf-8');

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
                    Data: "Gracias por registrarte"
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Gracias por registrarte"
            }
        },
        ReplyToAddresses: [toAndFromAdress],
        Source: toAndFromAdress,
    };

    // Send email to admin

    var paramsAdminEmail = {
        Destination: {
            ToAddresses: [toAndFromAdress]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: content
                },
                Text: {
                    Charset: "UTF-8",
                    Data: content
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Quetualmaviva - Registro"
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

    // ses.sendEmail(paramsAdminEmail, function(err, data) {
    //     // an error occurred
    //     if (err) console.log(err, err.stack); 
    //     // successful response
    //     else callback(null, data);
    // }); 
};