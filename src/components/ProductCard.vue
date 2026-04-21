<template>
  <div class="product-card">
    <img :src="product.image_url" :alt="product.name" @click="viewDetails">
    <h3 @click="viewDetails">{{ product.name }}</h3>
    <p class="brand">{{ product.brand }}</p>
    <p class="price">${{ product.price.toFixed(2) }}</p>
    <p class="rating">⭐ {{ product.rating }} / 5</p>
    <p class="stock" :class="{ 'out-of-stock': !product.in_stock }">
      {{ product.in_stock ? `In Stock (${product.quantity_available})` : 'Out of Stock' }}
    </p>
    <div class="product-controls">
      <input type="number" v-model.number="quantity" min="1" :max="product.quantity_available">
      <button @click="addToCart" :disabled="!product.in_stock">Add to Cart</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: Object
  },
  data() {
    return {
      quantity: 1
    }
  },
  methods: {
    viewDetails() {
      this.$router.push(`/product/${this.product.id}`)
    },
    addToCart() {
      this.$emit('addToCart', {
        productId: this.product.id,
        quantity: this.quantity
      })
    }
  }
}
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  background: white;
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.product-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 5px;
}

.product-card h3 {
  cursor: pointer;
  color: #0046be;
  margin: 10px 0;
}

.brand {
  color: #666;
  font-size: 14px;
}

.price {
  font-size: 24px;
  font-weight: bold;
  color: #0046be;
  margin: 10px 0;
}

.rating {
  color: #ffd700;
  margin: 5px 0;
}

.stock {
  color: green;
  font-size: 12px;
}

.stock.out-of-stock {
  color: red;
}

.product-controls {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  justify-content: center;
}

.product-controls input {
  width: 60px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.product-controls button {
  background-color: #ffd700;
  color: #0046be;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.product-controls button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>