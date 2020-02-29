const pg = require("pg");
const dotenv = require("dotenv").config();
const { POSTGRESQL } = process.env;

const connectionString = POSTGRESQL;

console.log("connectionString:");
console.log(connectionString);

async function saveEmailDB(email) {
  const client = new pg.Client(connectionString);
  client.connect();

  const testQuery = "SELECT NOW() AS theTime'";
  const insertQuery = "INSERT INTO email_signup(email) VALUES($1)";

  // client.query(insertQuery, [email], (err, res) => {
  //   if (err) {
  //     return console.error("error running query", err);
  //   }
  //   client.end();
  // });

  const res = await client.query(insertQuery, [email]);
  console.log(res);
  await client.end();
}

saveEmailDB("fakeemail4@gmail.com");
// selectNow();
