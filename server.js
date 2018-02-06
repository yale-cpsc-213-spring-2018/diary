const express = require('express')
const sqlite3 = require('sqlite3').verbose();
const app = express();
const db = new sqlite3.Database(process.env.DATABASE);

app.get('/', (req, res) => {
  let body = "<html><body><ul>";
  db.all("SELECT * FROM diary order by date", function(err, rows) {
   for(var i=0; i<rows.length; i++){
    const row = rows[i];
    body = `${body}\n<li>${row.date} -- ${row.body}</li>`;
   }
   body += "</ul></body></html>";
   res.send(body);
  });
});



const create_table = `
CREATE TABLE IF NOT EXISTS diary (
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  body TEXT
)
`;


db.serialize(function() {
  db.run(create_table);
  app.listen(9000, () => console.log('Example app listening on port 3000!'))
});

