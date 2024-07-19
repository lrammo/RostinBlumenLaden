// set up

const express = require("express");
const http = require("http");
const app = express();
const port = 4200;
const path = require("path");
var mysql = require("mysql");
const e = require("express");
const server = http.createServer(app);

app.use(express.json());

bodyParser = require("body-parser");

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// configuration =================
app.use(express.static(path.join(__dirname, "/dist/blumenladen"))); //TODO rename to your app-name

// listen (start app with node server.js) ======================================
server.listen(port, () => {
  console.log("App listening on port " + port);
});

// Create a connection to the MySQL server
/*const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "root1234",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the MySQL server:", err.stack);
    return;
  }

  console.log("Connected to the MySQL server.");

  const createDbQuery = "CREATE DATABASE IF NOT EXISTS rostin_db";

  connection.query(createDbQuery, (err, result) => {
    if (err) {
      console.error("Error creating database:", err.stack);
      return;
    }

    console.log("Database created or already exists.");
    console.log("Query Result:", result);
  });

  connection.end((err) => {
    if (err) {
      console.error("Error closing the connection:", err.stack);
      return;
    }

    console.log("Connection closed.");
  });
});*/

const connection = mysql.createConnection({
  database: "rostin_db",
  host: "localhost",
  port: "3306",
  user: "root",
  password: "root1234",
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the MySQL server:", err.stack);
    return;
  }
  console.log("Connected to the MySQL server.");
  //tables
  const createTablesQueries = [
    `CREATE TABLE IF NOT EXISTS Kunde (
      KundenID INT AUTO_INCREMENT PRIMARY KEY,
      Benutzername VARCHAR(50) NOT NULL,
      Nachname VARCHAR(50) NOT NULL,
      Vorname VARCHAR(50) NOT NULL,
      Geburtsdatum DATE NOT NULL,
      Telefonnummer VARCHAR(20),
      EMail VARCHAR(100) NOT NULL,
      Passwort VARCHAR(100) NOT NULL,
      Straße VARCHAR(100),
      Hausnummer VARCHAR(10),
      Stadt VARCHAR(50),
      PLZ VARCHAR(10)
    )`,

    `CREATE TABLE IF NOT EXISTS Mitarbeiter (
      MitarbeiterID INT AUTO_INCREMENT PRIMARY KEY,
      Nachname VARCHAR(50) NOT NULL,
      Vorname VARCHAR(50) NOT NULL,
      Geburtsdatum DATE NOT NULL,
      Telefonnummer VARCHAR(20),
      EMail VARCHAR(100) NOT NULL,
      Passwort VARCHAR(100) NOT NULL,
      Straße VARCHAR(100),
      Hausnummer VARCHAR(10),
      Stadt VARCHAR(50),
      PLZ VARCHAR(10)
    )`,

    `CREATE TABLE IF NOT EXISTS Event (
      EventID INT AUTO_INCREMENT PRIMARY KEY,
      Datum DATE NOT NULL,
      Name VARCHAR(100) NOT NULL,
      Thema VARCHAR(100),
      Beschreibung TEXT
    )`,

    `CREATE TABLE IF NOT EXISTS EventTeilnehmerliste (
      KundenID INT NOT NULL,
      EventID INT NOT NULL,
      PRIMARY KEY (KundenID, EventID),
      FOREIGN KEY (KundenID) REFERENCES Kunde(KundenID),
      FOREIGN KEY (EventID) REFERENCES Event(EventID)
    )`,

    `CREATE TABLE IF NOT EXISTS Eventleiterliste (
      MitarbeiterID INT NOT NULL,
      EventID INT NOT NULL,
      PRIMARY KEY (MitarbeiterID, EventID),
      FOREIGN KEY (MitarbeiterID) REFERENCES Mitarbeiter(MitarbeiterID),
      FOREIGN KEY (EventID) REFERENCES Event(EventID)
    )`,

    `CREATE TABLE IF NOT EXISTS Blumen (
       id INT AUTO_INCREMENT PRIMARY KEY,
      image VARCHAR(255),
      blumename VARCHAR(100),
      type VARCHAR(50),
      art VARCHAR(50),
      description TEXT
    )`

  ];

  // Execute the query
  createTablesQueries.forEach((query) => {
    connection.query(query, (err, result) => {
      if (err) {
        console.error("Error creating table:", err.stack);
        return;
      }
      console.log("Table created successfully.");
    });
  });

  // Close the connection
  /*connection.end((err) => {
    if (err) {
      console.error("Error closing the connection:", err.stack);
      return;
    }

    console.log("Connection closed.");
  });*/
});

// test api
app.get("/test", function (req, res) {
  console.log("Mytest");
  res.send({ name: "Ich werde über den Konstruktor hier eingefügt! :)" });
});

/* Inserts*/
app.post("/kunde", (req, res) => {
  const {
    Benutzername,
    Nachname,
    Vorname,
    Geburtsdatum,
    Telefonnummer,
    EMail,
    Passwort,
    Straße,
    Hausnummer,
    Stadt,
    PLZ,
  } = req.body; // Extrahieren der Werte aus dem Request-Body
  connection.query(
    `INSERT INTO Kunde(Benutzername, Nachname, Vorname, Geburtsdatum, Telefonnummer, EMail, Passwort, Straße, Hausnummer, Stadt, PLZ) VALUES(?,?,?,?,?,?,?,?,?,?,?)`,
    [
      Benutzername,
      Nachname,
      Vorname,
      Geburtsdatum,
      Telefonnummer,
      EMail,
      Passwort,
      Straße,
      Hausnummer,
      Stadt,
      PLZ,
    ], // Setze die Werte aus dem Rewuest-Body
    function (error, results, fields) {
      if (error) throw error;
      console.log(results.insertId);
      res.send(results);
    }
  );
});

app.post("/benutzername", (req, res) => {
  const { Benutzername } = req.body;

  connection.query(
    "SELECT COUNT(*) AS count FROM Kunde WHERE Benutzername = ?",
    [Benutzername],
    (error, results, fields) => {
      if (error) {
        throw error;
      }

      const count = results[0].count;
      if (count > 0) {
        res.status(200).json({ available: false });
      } else {
        res.status(200).json({ available: true });
      }
    }
  );
});

app.post("/email", (req, res) => {
  const { EMail } = req.body;

  connection.query(
    "SELECT COUNT(*) AS count FROM Kunde WHERE EMail = ?",
    [EMail],
    (error, results, fields) => {
      if (error) {
        throw error;
      }

      const count = results[0].count;
      if (count > 0) {
        res.status(200).json({ available: false });
      } else {
        res.status(200).json({ available: true });
      }
    }
  );
});

app.post("/loginKunde", (req, res) => {
  const { email, password } = req.body;
  const kundeQuery = "SELECT * FROM Kunde WHERE EMail = ? AND Passwort = ?";
  const mitarbeiterQuery =
    "SELECT * FROM Mitarbeiter WHERE EMail = ? AND Passwort = ?";

  connection.query(
    kundeQuery,
    [email, password],
    function (kundeError, kundeResults) {
      if (kundeError) throw kundeError;

      if (kundeResults.length > 0) {
        // Benutzer als Kunde gefunden
        const user = kundeResults[0];
        res.send({
          status: "success",
          message: "Login erfolgreich als Kunde",
          data: user,
        });
      } else {
        // Benutzer als Kunde nicht gefunden, nach Mitarbeiter suchen
        con.query(
          mitarbeiterQuery,
          [email, password],
          function (mitarbeiterError, mitarbeiterResults) {
            if (mitarbeiterError) throw mitarbeiterError;

            if (mitarbeiterResults.length > 0) {
              // Benutzer als Mitarbeiter gefunden
              const user = mitarbeiterResults[0];
              res.send({
                status: "success",
                message: "Login erfolgreich als Mitarbeiter",
                data: user,
              });
            } else {
              // Kein Benutzer gefunden
              res.send({
                status: "fail",
                message: "E-Mail oder Passwort nicht korrekt",
              });
            }
          }
        );
      }
    }
  );
});

app.get("/event", (req, res) => {
  connection.query(
    "SELECT * FROM Event WHERE Datum >= CURDATE()",
    function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      res.send(results);
    }
  );
});

app.get("/nextevent", (req, res) => {
  connection.query(
    "SELECT * FROM Event WHERE Datum >= CURDATE() ORDER BY Datum ASC LIMIT 1",
    function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      res.send(results);
    }
  );
});

app.get("/eventteilnehmerliste", (req, res) => {
  connection.query(
    "SELECT * FROM EventTeilnehmerliste",
    function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      res.send(results);
    }
  );
});

app.post("/eventteilnehmerliste", (req, res) => {
  const { KundenID, EventID } = req.body;
  connection.query(
    `INSERT IGNORE INTO EventTeilnehmerliste(KundenID, EventID) VALUES(?,?)`,
    [KundenID, EventID],
    function (error, results, fields) {
      if (error) throw error;
      console.log(results.insertId);
      res.send(results);
    }
  );
});


app.get('/kunde/:kundenid/events', (req, res) => {
  const kundenid = req.params.kundenid;
  connection.query(
    'SELECT Event.EventID, Event.Datum, Event.Name, Event.Thema, Event.Beschreibung FROM EventTeilnehmerliste JOIN Event ON EventTeilnehmerliste.EventID = Event.EventID WHERE EventTeilnehmerliste.KundenID = ?',
    [kundenid],
    function(error, results, fields) {
      if (error) throw error;
      res.send(results);
    }
  );
});

app.get('/blumen', (req, res) => {
  connection.query('SELECT * FROM blumen', (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    res.send(results);
  });
});