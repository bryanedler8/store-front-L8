const { defineConfig } = require('@vue/cli-service')
const fetch = require("node-fetch")
const bodyParser = require('body-parser')

const PRODUCT_SERVICE_URL = (process.env.VUE_APP_PRODUCT_SERVICE_URL || "http://localhost:3002")
const ORDER_SERVICE_URL = (process.env.VUE_APP_ORDER_SERVICE_URL || "http://localhost:3003")

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    allowedHosts: 'all',
    client: false,
    webSocketServer: false,    
    setupMiddlewares: (middlewares, devServer) => {
      
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      devServer.app.use(bodyParser.json())

      // Health check
      devServer.app.get('/health', (_, res) => {
        const version = process.env.APP_VERSION || '0.1.0'
        res.send({ status: 'ok', version: version, service: 'store-front' })
      })
      
      // Get all products
      devServer.app.get('/products', (_, res) => {
        fetch(`${PRODUCT_SERVICE_URL}/products`)
          .then(response => response.json())
          .then(products => {
            res.send(products)
          })
          .catch(error => {
            console.log('Error fetching products:', error)
            res.status(500).send({ error: 'Failed to fetch products' })
          })
      });

      // Get products by category
      devServer.app.get('/products/category/:category', (req, res) => {
        fetch(`${PRODUCT_SERVICE_URL}/products/category/${req.params.category}`)
          .then(response => response.json())
          .then(products => {
            res.send(products)
          })
          .catch(error => {
            console.log('Error fetching products by category:', error)
            res.status(500).send({ error: 'Failed to fetch products' })
          })
      });

      // Get single product
      devServer.app.get('/products/:id', (req, res) => {
        fetch(`${PRODUCT_SERVICE_URL}/products/${req.params.id}`)
          .then(response => response.json())
          .then(product => {
            res.send(product)
          })
          .catch(error => {
            console.log('Error fetching product:', error)
            res.status(500).send({ error: 'Failed to fetch product' })
          })
      });

      // Check inventory
      devServer.app.get('/products/:id/inventory', (req, res) => {
        fetch(`${PRODUCT_SERVICE_URL}/products/${req.params.id}/inventory`)
          .then(response => response.json())
          .then(inventory => {
            res.send(inventory)
          })
          .catch(error => {
            console.log('Error checking inventory:', error)
            res.status(500).send({ error: 'Failed to check inventory' })
          })
      });

      // Create order
      devServer.app.post('/order', (req, res) => {
        fetch(`${ORDER_SERVICE_URL}/api/orders`, {
          method: 'POST',
          body: JSON.stringify(req.body),
          headers: { 'Content-Type': 'application/json' }
        })
          .then(response => response.json())
          .then(order => {
            if (order.success) {
              res.status(200).send(order)
            } else {
              res.status(500).send(order)
            }
          })
          .catch(error => {
            console.log('Error creating order:', error)
            res.status(500).send({ error: 'Failed to create order' })
          })
      });

      // Get order status
      devServer.app.get('/order/:id', (req, res) => {
        fetch(`${ORDER_SERVICE_URL}/api/orders/${req.params.id}`)
          .then(response => response.json())
          .then(order => {
            res.send(order)
          })
          .catch(error => {
            console.log('Error fetching order:', error)
            res.status(500).send({ error: 'Failed to fetch order' })
          })
      });

      // Cancel order
      devServer.app.put('/order/:id/cancel', (req, res) => {
        fetch(`${ORDER_SERVICE_URL}/api/orders/${req.params.id}/cancel`, {
          method: 'PUT'
        })
          .then(response => response.json())
          .then(result => {
            res.send(result)
          })
          .catch(error => {
            console.log('Error cancelling order:', error)
            res.status(500).send({ error: 'Failed to cancel order' })
          })
      });

      return middlewares;
    }
  }
})