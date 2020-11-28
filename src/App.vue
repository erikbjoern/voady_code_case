<template>
  <div id="app">
    <inventory-header />
    <product-inventory />
  </div>
</template>

<script>
import ProductInventory from "./components/ProductInventory.vue";
import InventoryHeader from "./components/InventoryHeader.vue";

export default {
  name: "App",
  components: {
    ProductInventory,
    InventoryHeader
  }
};
</script>

<style>
body {
  background-color: rgb(178, 194, 192);
  margin: 0;
}

#app {
  font-family: Helvetica, Arial, sans-serif;
}
</style>
