const express = require("express");
const app = express();

app.use(express.json());

const customers = [
  {
    name: "田中",
    id: 1,
  },
  {
    name: "鈴木",
    id: 2,
  },
  {
    name: "佐藤",
    id: 3,
  },
  {
    name: "斎藤",
    id: 4,
  },
  {
    name: "馬場",
    id: 5,
  },
];

//データの削除
app.delete("/api/customers/:id", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  const index = customers.indexOf(customer);
  customers.splice(index, 1);

  res.send(customer);
});

//データの更新
app.put("/api/customers/:id", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  customer.name = req.body.name;
  res.send(customer);
});

//データの作成
app.post("/api/customers", (req, res) => {
  const customer = {
    name: req.body.name,
    id: customers.length + 1,
  };
  customers.push(customer);
  res.send(customer);
});

//データの取得
app.get("/api/customers", (req, res) => {
  res.send(customers);
});

//IDを指定してデータを取得
app.get("/api/customers/:id", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  res.send(customer);
});

app.get("/", (req, res) => {
  res.send("サーバーに接続しているよ");
});

app.listen(4000, () => {
  console.log("Server runnning");
});
