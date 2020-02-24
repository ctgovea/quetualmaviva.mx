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

function saveEmailDB(email) {
  const insertQuery = "INSERT INTO email_signup(email) VALUES($1)";
  client.query(insertQuery, [email], function(err, result) {
    if (err) console.log(err.detail);
    if (result) console.log(result.rowCount);
    client.end();
  });
}

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // When the method is POST, the name will no longer be in the event’s
  // queryStringParameters – it’ll be in the event body encoded as a query string
  // const params = querystring.parse(event.body);

  const { email } = JSON.parse(event.body) || "";

  // const email = params.email || "";
  const emailDomain = getEmailDomain(email);

  if (email === "" || emailDomain === "") {
    return {
      statusCode: 400,
      body: `Escribe un email válido ${email}`
    };
  } else {
    saveEmailDB(email);
    return {
      statusCode: 200,
      body: "Gracias por registrarte."
    };
  }
};
