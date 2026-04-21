<template>
  <div class="product-list-container">
    <h1>{{ currentCategory }} Electronics</h1>
    <div class="filters">
      <button @click="sortByPrice">Sort by Price</button>
      <button @click="sortByRating">Sort by Rating</button>
      <button @click="clearFilters">Clear Filters</button>
    </div>
    <div class="product-list">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @addToCart="addToCart"
      />
    </div>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue'

export default {
  name: 'ProductList',
  components: {
    ProductCard
  },
  props: {
    products: Array,
    category: String
  },
  data() {
    return {
      sortBy: null,
      sortDirection: 'asc'
    }
  },
  computed: {
    currentCategory() {
      return this.category || 'All'
    },
    filteredProducts() {
      let filtered = [...this.products]
      
      // Filter by category
      if (this.category && this.category !== 'All') {
        filtered = filtered.filter(p => p.category === this.category)
      }
      
      // Sort
      if (this.sortBy === 'price') {
        filtered.sort((a, b) => this.sortDirection === 'asc' ? a.price - b.price : b.price - a.price)
      } else if (this.sortBy === 'rating') {
        filtered.sort((a, b) => this.sortDirection === 'asc' ? a.rating - b.rating : b.rating - a.rating)
      }
      
      return filtered
    }
  },
  methods: {
    addToCart({ productId, quantity }) {
      this.$emit('addToCart', { productId, quantity })
    },
    sortByPrice() {
      if (this.sortBy === 'price') {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortBy = 'price'
        this.sortDirection = 'asc'
      }
    },
    sortByRating() {
      if (this.sortBy === 'rating') {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortBy = 'rating'
        this.sortDirection = 'asc'
      }
    },
    clearFilters() {
      this.sortBy = null
      this.sortDirection = 'asc'
    }
  }
}
</script>

<style scoped>
.product-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.filters {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.filters button {
  background-color: #0046be;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}
</style>