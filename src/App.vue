<template>
  <div id="app">
    <product-inventory />
  </div>
</template>

<script>
import ProductInventory from "./components/ProductInventory.vue";

export default {
  name: "App",
  components: {
    ProductInventory,
  }
};
</script>

<style>
body {
  background-color: rgb(178, 194, 192);
  margin: 0;
}

#app {
  color: #000;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
