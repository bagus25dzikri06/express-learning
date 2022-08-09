const express = require('express')
const app = express()
const commonMiddleware = require('./src/middleware/commonjs')
const products = [
  {
    id: 1,
    name: 'baju',
    stock: 10,
    price: 10000
  },
  {
    id: 2,
    name: 'kemeja',
    stock: 5,
    price: 50000
  },
]

app.use(express.json())

app.get('/products', (req, res) => {
  res.send(products)
})

app.get('/products/:id', (req, res) => {
  const id = Number(req.params.id)
  const product = products.find(product => product.id === id)
  res.send(product)
})

app.post('/products', commonMiddleware, (req, res) => {
  const { name, stock, price } = req.body
  const productNew = {
    id: products.length + 1,
    name,
    stock,
    price
  }

  products.push(productNew)
  res.json({
    Message: 'Product is created'
  })
})

app.put('/products/:id', (req, res) => {
  const id = Number(req.params.id)
  const { name, stock, price } = req.body
  const index = products.findIndex(product => product.id === id)
  const productUpdate = {
    id: products[index].id,
    name,
    stock,
    price
  }

  products[index] = productUpdate
  res.json({
    Message: 'Product is updated'
  })
})

app.delete('/products/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = products.findIndex(product => product.id === id)
  
  products.splice(index, 1)
  res.json({
    Message: 'Product is deleted'
  })
})

app.listen(3000, () => {
  console.log('Server runs in port 3000')
})