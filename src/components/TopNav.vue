<template>
  <nav>
    <div class="logo">
      <img src="/best-buy-logo.png" alt="Best Buy" @click="goHome">
      <span>Best Buy Electronics</span>
    </div>
    <ul>
      <li><a href="#" @click="goHome">Home</a></li>
      <li><a href="#" @click="goToLaptops">Laptops</a></li>
      <li><a href="#" @click="goToSmartphones">Smartphones</a></li>
      <li><a href="#" @click="goToAudio">Audio</a></li>
      <li><a href="#" @click="goToGaming">Gaming</a></li>
      <li><a href="#" @click="goToTVs">TVs</a></li>
      <li><a href="#" @click="goToCart">Cart ({{ cartItemCount }})</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'TopNav',
  props: {
    cartItemCount: {
      type: Number,
      default: 0
    }
  },
  methods: {
    goHome() {
      this.$router.push('/')
    },
    goToLaptops() {
      this.$router.push('/products/Laptops')
    },
    goToSmartphones() {
      this.$router.push('/products/Smartphones')
    },
    goToAudio() {
      this.$router.push('/products/Audio')
    },
    goToGaming() {
      this.$router.push('/products/Gaming')
    },
    goToTVs() {
      this.$router.push('/products/TVs')
    },
    goToCart() {
      this.$router.push('/cart')
    }
  }
}
</script>

<style scoped>
nav {
  background-color: #0046be;
  color: white;
  padding: 15px 30px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.logo {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo img {
  height: 40px;
  margin-right: 10px;
}

.logo span {
  font-size: 20px;
  font-weight: bold;
}

nav ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 20px;
}

nav ul li a {
  color: white;
  text-decoration: none;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

nav ul li a:hover {
  background-color: #ffd700;
  color: #0046be;
}
</style>