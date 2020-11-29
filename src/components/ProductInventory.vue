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
      <div class="shadow overflow-x-auto rounded-lg w-11/12 mx-auto">
        <table
          class="table-fixed min-w-full divide-y divide-gray-200 bg-gray-100"
        >
          <product-table-head
            :authenticated="authenticated"
            :showNewProductForm="showNewProductForm"
            @toggleNewProductForm="showNewProductForm = !showNewProductForm"
          />
          <tbody v-if="showNewProductForm && authenticated">
            <new-product-row :newProduct="newProduct" />
          </tbody>
          <form
            v-if="showNewProductForm && authenticated"
            id="addProduct"
            @submit="submitNewProduct"
          ></form>
          <div v-else-if="loading" class="text-gray-500 p-4 border-none">
            Laddar . . .
          </div>
          <div v-else-if="error" class="text-gray-500 p-4 border-none">
            {{ error.message }}
          </div>
          <product-table-body
            v-else-if="data && data.products !== {}"
            :products="data.products"
          />
          <div v-else class="text-gray-500 p-4 border-none">
            Inga produkter hittades
          </div>
        </table>
      </div>
      <div v-if="errorMessage" class="ml-20 mt-2 text-red-900">
        {{ graphqlError || "Något gick fel." }}
      </div>
    </template>
  </apollo-query>
</template>

<script>
import ProductTableHead from "./ProductTableHead.vue";
import ProductTableBody from "./ProductTableBody.vue";
import NewProductRow from "./NewProductRow.vue";
import ADD_PRODUCT from "../queries/addProduct.gql";

export default {
  name: "ProductInventory",
  components: { ProductTableBody, NewProductRow, ProductTableHead },
  data() {
    return {
      showDropdown: false,
      showNewProductForm: false,
      newProduct: {
        name: "",
        id: "",
        brand: "",
        volume: null,
        purchase_price: null,
        selling_price: null,
        balance: null,
      },
      errorMessage: null,
    };
  },
  props: {
    authenticated: Boolean,
  },
  computed: {
    graphqlError: function() {
      return this.errorMessage?.graphQLErrors[0]?.message || null;
    },
  },
  methods: {
    submitNewProduct: async function(event) {
      const e = event;
      event.preventDefault();
      const {
        name,
        id,
        brand,
        volume,
        purchase_price,
        selling_price,
        balance,
      } = event.target;

      try {
        const response = await this.$apollo.mutate({
          mutation: ADD_PRODUCT,
          variables: {
            product: {
              name: name.value,
              id: id.value,
              brand: brand.value,
              volume: parseInt(volume.value),
              purchase_price: parseFloat(purchase_price.value),
              selling_price: parseFloat(selling_price.value),
              balance: parseInt(balance.value),
            },
          },
        });

        e.target.reset();
      } catch (error) {
        this.errorMessage = error;
        console.log(error);
      }
    },
  },
};
</script>
