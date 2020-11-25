<template>
  <div id="app">
    <product-inventory :products="products" />
  </div>
</template>

<script>
import Vue from "vue";
import dummyData from "./assets/dummyData";
import ProductInventory from './components/ProductInventory.vue';

export default {
  name: "App",
  components: {
    ProductInventory,
  },
  data() {
    return {
      products: dummyData
    }
  },
  apollo: {

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
