const http = require('http');
const express = require('express')

const port = 3000
const hostname = 'localhost'

const app = express()
const server = http.createServer(app)

const productsService = require('./services/products')

app.get('/', (req, res) => res.send('Build the API!'))

// Build Routes

app.get('/api/v1/products/search', function(req, res){
  const key = req.query.key
  const value = req.query.value
  const sortBy = req.query.sort || 'id'
  const order = req.query.order || 'ASC'
  if (!key || !value) {
    res.status(400).json({ error: 'Invalid search query' })
    return
  }
  const products = productsService.search(key, value, sortBy, order)
  res.json(products)
  
})

app.get('/api/v1/products', function(req, res){
  const products = productsService.findAll()
  res.json(products)
})

app.get('/api/v1/products/:pulledProduct', function(req, res){
  const pulledProduct = Number(req.params.pulledProduct)
  const product = productsService.findOneById(pulledProduct)
  
  if(!product){
    res.status(404).json({error: 'Product not found'})
    return
  }
  res.json(product)
  
})

app.get('/api/v1/products', function(req, res) {
  const sortBy = req.query.sort || 'id'
  const order = req.query.order || 'ASC'
  const products = productsService.findAll(sortBy, order)
  res.json(products)
})

app.get('*', (req, res) => res.status(404).send('Page not found'))

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
}) 