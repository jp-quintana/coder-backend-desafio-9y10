const express = require('express');
const handlebars = require('express-handlebars');
const ProductosApi = require('../api/productos.js')

const productosApi = new ProductosApi()

const app = express();

app.use(express.urlencoded({ extended: true }))

app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/../views/layouts',
    partialDir: __dirname + '/../views/partials'
  })
)

app.set('views', './hbs/views');
app.set('view engine', 'hbs');

app.get('/', async (req, res) => {
  try {
    const productos = await productosApi.listarAll()
      res.render('main', { productos: productos })
  } catch (error) {
    return next(error);
  }
})

app.post('/productos', async (req,res) => {
  try {
    const productoGuardado = await productosApi.guardar(req.body)
    res.redirect('/')
  } catch (error) {
    return next(error);
  }

})

app.listen(8080);
