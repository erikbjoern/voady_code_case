<template>
  <apollo-query
    :query="
      (gql) => gql`
        query products {
          products {
            id
            name
            brand
            volume
            purchase_price
            selling_price
            balance
          }
        }
      `
    "
  >
    <template v-slot="{ result: { loading, error, data } }">
      <product-table-head>
        <div v-if="loading" class="apollo">Laddar . . .</div>
        <div v-else-if="error" class="apollo">{{ error.message }}</div>
        <product-table-body v-if="data.products" :products="data.products" />
        <div v-else class="apollo">Inga produkter hittades</div>
      </product-table-head>
    </template>
  </apollo-query>
</template>

<script>
import Vue from "vue";
import ProductTableBody from "./ProductTableBody.vue";
import ProductTableHead from "./ProductTableHead.vue";
export default {
  components: { ProductTableBody, ProductTableHead },
  name: "ProductInventory"
};
</script>

<style>
#main-table-container {
  width: 90vw;
  margin: 5vw;
}

.apollo {
  border-top: none;
  color: #777;
  padding: 10px;
  width: inherit;
}

.numbers {
  text-align: right;
}
</style>
