const express = require('express');
const ProductosApi = require('../api/productos.js')

const productosApi = new ProductosApi()

const app = express();

app.use(express.urlencoded({ extended: true }))

app.set('views', './pug/views');
app.set('view engine', 'pug');

app.get('/', async (req, res) => {
  try {
    const productos = await productosApi.listarAll()
      res.render('body', { productos })
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
