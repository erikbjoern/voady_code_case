<template>
  <table v-if="products">
    <thead>
      <th>Namn</th>
      <th>Tillverkare</th>
      <th>Volym</th>
      <th>Inköpspris</th>
      <th>Försäljningspris</th>
      <th>Antal i lager</th>
    </thead>
    <tr v-for="product in products" :key="product.id">
      <td>{{ product.name }}</td>
      <td>{{ product.brand }}</td>
      <td class="numbers">{{ `${product.volume}ml` }}</td>
      <td class="numbers">{{ `$${product.purchase_price}` }}</td>
      <td class="numbers">{{ `$${product.selling_price}` }}</td>
      <td class="numbers">{{ `${product.balance}st` }}</td>
    </tr>
  </table>
</template>

<script>

import Vue, { PropType } from "vue";
export default Vue.extend({
  name: "ProductInventory",
  props: {
    products: Array,
  },
});
</script>

<style scoped>
  table {
    background-color: #474d53;
    margin: 5vw;
    width: 90vw;
    padding: 5px;
    border-radius: 4px;
  }

  th {
    color: #d7dfdd;
    padding: 5px;
  }

  td {
    background-color: #d7dfdd;
    border-radius: 1px;
    color: #474d53;
    padding: 3px;
  }

  .numbers {
    text-align: right;
  }
</style>
