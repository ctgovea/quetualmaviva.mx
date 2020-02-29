const querystring = require("querystring");
const pg = require("pg");
const { POSTGRESQL } = process.env;

const connectionString = POSTGRESQL;
const client = new pg.Client(connectionString);
client.connect();

function getEmailDomain(email) {
  if (email === undefined) return "";
  const indexAt = email.indexOf("@");
  if (indexAt !== -1) {
    return email.substring(indexAt + 1);
  } else {
    return "";
  }
}

async function saveEmailDB(email) {
  const insertQuery = "INSERT INTO email_signup(email) VALUES($1)";

  const res = await client.query(insertQuery, [email]);
  console.log(res);
  await client.end();
}

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // When the method is POST, the name will no longer be in the event’s
  // queryStringParameters – it’ll be in the event body encoded as a query string
  const body = querystring.parse(event.body);
  let email = body.email || "";

  // const email = params.email || "";
  const emailDomain = getEmailDomain(email);

  if (email === "" || emailDomain === "") {
    return {
      statusCode: 400,
      body: `Escribe un email válido ${email} event.body: ${event.body} body ${body}`
    };
  } else {
    saveEmailDB(email);
    return {
      statusCode: 200,
      body: `Gracias por registrarte ${email}`
    };
  }
};
