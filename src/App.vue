<template>
  <TopNav :cartItemCount="cartItemCount"/>
  <router-view
    :products="products"
    :cartItems="cartItems"
    @addToCart="addToCart"
    @removeFromCart="removeFromCart"
    @submitOrder="submitOrder"
  ></router-view>
</template>

<script>
import TopNav from './components/TopNav.vue'

export default {
  name: 'App',
  components: {
    TopNav
  },
  data() {
    return {
      cartItems: [],
      products: [],
    }
  },
  computed: {
    cartItemCount() {
      return this.cartItems.reduce((total, item) => {
        return total + item.quantity
      }, 0)
    }
  },
  mounted() {
    this.getProducts()
  },
  methods: {
    getProducts() {
      fetch('/products')
        .then(response => response.json())
        .then(products => {
          console.log('success getting proxy products')
          this.products = products
        })
        .catch(error => {
          console.log(error)
          alert('Error occurred while fetching products')
        })
    },
    addToCart({ productId, quantity }) {
      // check if the product is already in the cart
      const existingCartItem = this.cartItems.find(
        item => item.product.id == productId
      )
      if (existingCartItem) {
        // if it is, increment the quantity
        existingCartItem.quantity += quantity
      } else {
        // if not, find the product, and add it with quantity to the cart
        const product = this.products.find(product => product.id == productId)
        this.cartItems.push({ product, quantity })
      }
    },
    removeFromCart(index) {
      this.cartItems.splice(index, 1)
    },
    submitOrder() {
      // create an order object for Best Buy
      const order = {
        items: this.cartItems.map(item => {
          return {
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price
          }
        }),
        customer: {
          name: "Best Buy Customer",
          email: "customer@bestbuy.com"
        },
        shippingAddress: {
          street: "123 Best Buy Way",
          city: "Richfield",
          state: "MN",
          zipCode: "55423"
        },
        paymentMethod: {
          type: "credit_card"
        },
        addProtection: false,
        useRewards: false
      }

      console.log(JSON.stringify(order));

      // call the order-service using fetch
      fetch(`/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
      })
        .then(response => response.json())
        .then(result => {
          console.log(result)
          if (result.success) {
            this.cartItems = []
            alert(`Order ${result.orderId} submitted successfully! Total: $${result.total.toFixed(2)}`)
          } else {
            alert('Error occurred while submitting order')
          }
        })
        .catch(error => {
          console.log(error)
          alert('Error occurred while submitting order')
        })
    }
  },
}
</script>

<style>
body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 80px;
  padding-bottom: 60px;
}

button {
  padding: 10px;
  background-color: #0046be;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}



button:hover {
  background-color: #ffd700;
  color: #0046be;
}
</style>