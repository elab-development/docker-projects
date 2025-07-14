const express   = require('express');
const bodyParser = require('body-parser');
const fs         = require('fs');
const path       = require('path');

const app = express();

/* ---------- 1. Put do JSON-a i inicijalno učitavanje ---------- */
const DATA_DIR  = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'wishlist.json'); //  …/data/wishlist.json

let wishList = [];
try {
  // ako datoteka postoji – učitaj; inače kreni od praznog niza
  wishList = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
} catch (_) {
  wishList = [];
}

/* ---------- 2. Middleware ---------- */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

/* ---------- 3. GET /  ---------- */
app.get('/', (req, res) => {
  // kreiramo HTML redove za tabelu
  const rows = wishList
    .map(
      (item, idx) =>
        `<tr><td>${idx + 1}</td><td>${item}</td></tr>`
    )
    .join('');

  res.send(`
    <!doctype html>
    <html lang="sr">
      <head>
        <meta charset="utf-8" />
        <title>Lista želja</title>
        <link rel="stylesheet" href="styles.css" />
      </head>
      <body>
        <section>
          <h2>Moja lista želja</h2>
          ${
            wishList.length
              ? `<table><thead><tr><th>#</th><th>Želja</th></tr></thead><tbody>${rows}</tbody></table>`
              : '<p>Još nema unetih želja.</p>'
          }
        </section>

        <form action="/store-wishlist" method="POST">
          <div class="form-control">
            <label for="wishlistItem">Element liste:</label>
            <input id="wishlistItem" type="text" name="wishlistItem" required />
          </div>
          <button type="submit">Dodaj u listu</button>
        </form>
      </body>
    </html>
  `);
});

/* ---------- 4. POST /store-wishlist ---------- */
app.post('/store-wishlist', (req, res) => {
  const item = (req.body.wishlistItem || '').trim();
  if (!item) return res.redirect('/');

  wishList.push(item);

  // obezbedimo da /data postoji
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

  // asinhrono upisujemo izmene
  fs.writeFile(
    DATA_FILE,
    JSON.stringify(wishList, null, 2),
    (err) => err && console.error('Greška pri čuvanju JSON-a:', err)
  );

  res.redirect('/'); // PRG obrazac
});

app.listen(3000, () => console.log('Server sluša na portu 3000'));
