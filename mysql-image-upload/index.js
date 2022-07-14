const express = require("express");
const { engine } = require("express-handlebars");
const fileUpload = require("express-fileupload");
const app = express();
const mysql = require("mysql");
const port = 4000;

app.use(fileUpload());
app.use(express.static("upload"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

const db = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "password",
  database: "imageUpload",
  charset: "utf8mb4",
});

app.get("/", (req, res) => {
  db.getConnection((err, conection) => {
    if (err) throw err;
    console.log("Connected OK!");
    conection.query("Select * FROM image", (err, rows) => {
      conection.release();
      if (!err) {
        res.render("home", { rows });
      }
    });
  });
});

app.post("/", (req, res) => {
  console.log(req.files);
  const imageFile = req.files.imageFile;
  const uploadPath = __dirname + "/upload/" + imageFile.name;

  //MYSQLに画像ファイルの名前を保存する
  db.getConnection((err, conection) => {
    if (err) throw err;
    conection.query(
      `INSERT INTO image values (null,'${imageFile.name}')`,
      (err, rows) => {
        conection.release();
        if (!err) {
          res.redirect("/");
        } else {
          console.log(err);
        }
      }
    );
  });

  //サーバーに画像ファイルを置く
  imageFile.mv(uploadPath, (err) => {
    if (err) return res.status(500).send(err);
    //res.send("アップロードに成功しました");
  });
});

app.listen(port, () => console.log("Server Start Port:" + port));
