<template>
  <div id="app">
    <product-inventory :products="products" />
  </div>
</template>

<script>
import Vue from "vue";
import gql from "graphql-tag";
import ProductInventory from "./components/ProductInventory.vue";

export default {
  name: "App",
  components: {
    ProductInventory,
  },
  apollo: {
    products: gql`query {
      products {
        id
        name
        brand
        volume
        purchase_price
        selling_price
        balance
      }
    }`
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
