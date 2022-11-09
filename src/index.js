const express = require("express");
const path = require("path");
const ContenedorV2 = require('./ContenedorV2.js')
const handlebars = require('express-handlebars')

const app = express();

let contenedor= new ContenedorV2()

let producto ={
    title: "Escuadra",
    price: 123.45,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
}
let producto2 ={
    title: "Calculadora",
    price: 234.56,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
}
let producto3 ={
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
}

let producto4 ={
     title: "Trofeo",
     price: 500,
     thumbnail: "https://cdn3.iconfinder.com/data/icons/flat-icons-web/40/Trophy-256.png",
 
}

let producto5 ={
     title: "Reglas",
     price: 300,
     thumbnail: "reglas.cl",
 
}

contenedor.save(producto)
contenedor.save(producto2)
contenedor.save(producto3)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")))

app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: 'layout.hbs',
    })
);

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');

// // app.set("view engine", "hbs");
// // app.set("views", "./views");




app.post('/productos', (req, res) => {
    let producto = req.body
    contenedor.save(producto)
    res.redirect('/')
})


app.get('/productos', (req, res) => {
  let result = contenedor.getAll()  
  
  res.render("view1", {
        productos: result,
        hayProductos: result.length
  });
});


const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
