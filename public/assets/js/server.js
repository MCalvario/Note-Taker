//set up variables and requires
const express = require('express');

const path = require('path');

const html_routes = require('./routes/html-routes')

const api_routes = require('./routes/api-routes')

const app = express();

const PORT = 3001;
//set up middleware
app.use(html_routes)
app.use(api_routes)
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.get ("/api/notes", (req,res)) => {
    fs.readFile("db/db.json", "utf8", (err, data) => {
        if(err) {
            console.error(err);
            return;
        }
        res.json(JSON.parse(data));
    });
};

//set up html routes
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

//GET /notes should return the notes.html file.
//GET * should return the index.html file.
//set up api routes
//set up api route to read db.json file
//POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
app.listen(PORT, () =>
  console.log(`Now listening on http://localhost:${PORT}!`)
);