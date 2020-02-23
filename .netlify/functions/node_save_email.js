const http = require("http");
const url = require("url");
const wildcards = require("disposable-email-domains/wildcard.json");
const pg = require("pg");

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

function wildcardDomainCheck(domain) {
  return wildcards.indexOf(domain) > -1;
}

function saveEmailDB(email) {
  const insertQuery = "INSERT INTO email_signup(email) VALUES($1)";
  client.query(insertQuery, [email], function(err, result) {
    if (err) console.log(err.detail);
    if (result) console.log(result.rowCount);
    client.end();
  });
}

http
  .createServer(function(req, res) {
    var parts = url.parse(req.url, true);
    var query = parts.query;

    const email = query.email;
    const emailDomain = getEmailDomain(email);

    if (
      email === undefined ||
      email === "" ||
      emailDomain === "" ||
      wildcardDomainCheck(emailDomain)
    ) {
      res.statusCode = 400;
      res.write(
        "Please insert a correct valid email, no temporary emails, thank you."
      );
      res.end();
    } else {
      saveEmailDB(email);
      res.write("Saved your email, thank you.");
      res.end();
    }
  })
  .listen(8080);
