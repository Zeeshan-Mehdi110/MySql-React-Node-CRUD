import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "zeeshan51214",
  database: "test",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const sql = "insert into books(title,`desc`,price,cover) values(?)"
  const { title, desc, price, cover } = req.body;
  const values = [title, desc, price, cover]
  db.query(sql, [values], (err, data) => {
    if (err) return res.send(err)
    return res.json(data)
  })
})

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id
  const sql = "update books set `title` = ? , `desc`=? , `price`=? , `cover`=? where id = ?"
  const { title, desc, price, cover } = req.body;
  const values = [title, desc, price, cover]
  db.query(sql, [...values, bookId], (err, data) => {
    if (err) return res.send(err)
    return res.json(data)
  })
})

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id
  const sql = 'delete from books where id = ?'
  db.query(sql, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  })
})

app.listen(8800, () => {
  console.log("Connected to backend.");
});
