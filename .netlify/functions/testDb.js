const querystring = require("querystring");
const db = require("./db");

function getEmailDomain(email) {
  if (email === undefined) return "";
  const indexAt = email.indexOf("@");
  if (indexAt !== -1) {
    return email.substring(indexAt + 1);
  } else {
    return "";
  }
}

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  console.log("event");
  console.log(event);

  console.log("body");
  console.log(event.body);

  // When the method is POST, the name will no longer be in the event’s
  // queryStringParameters – it’ll be in the event body encoded as a query string
  const body = querystring.parse(event.body);
  let email = body.email || "";

  console.log("querystring...");
  console.log(body);

  // const email = params.email || "";
  const emailDomain = getEmailDomain(email);

  if (email === "" || emailDomain === "") {
    return {
      statusCode: 400,
      body: `Escribe un email válido ${email} event.body: ${event.body} body ${body}`
    };
  } else {
    console.log(`Saving email ${email}...`);
    await db.query("INSERT INTO email_signup(email) VALUES($1)", [email]);

    return {
      statusCode: 200,
      body: `Gracias por registrarte ${email}`
    };
  }
};
