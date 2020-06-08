const express = require("express");
const server = express();

const db = require("./database/db");

server.use(express.static("public"));

server.use(express.urlencoded({extended: true}))

const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true
})

server.get("/", (req, res) => 
{
  return res.render("index.html");
})

server.get("/create-point", (req, res) => 
{
  return res.render("create-point.html");
})

server.post("/savepoint", (req, res) => {
  console.log(req.body)

  const query = `
  INSERT INTO places (
    image,
    name,
    address,
    address2,
    state,
    city,
    itens
  ) VALUES (?,?,?,?,?,?,?);
  `

  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.itens
  ]

  function afterInsertData(err)  {
    if(err)
    {
      console.log(err);
      return res.send("Erro no cadastro!")
    }

    console.log("Cadastro efetuado com sucesso.");
    console.log(this);
    return res.render("create-point.html", {saved: true})
  }

  db.run(query, values, afterInsertData);
})

server.get("/search-results", (req, res) => 
{
  const search = req.query.search

  if(search == "")
  {
    return res.render("search-results.html", {total:0});
  }

  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
    //condição de erro
    if(err)
    {
      return console.log(err);
    }

    console.log("Aqui estão os seus registros: ");
    const total = rows.length;
    //exibir página com dados da db
    return res.render("search-results.html", {places: rows, total: total});
  })

  
})

server.listen(3000);