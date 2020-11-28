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
      <div class="flex flex-col" id="main-table-container">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
          >
            <div
              class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
            >
              <table
                class="table-fixed min-w-full divide-y divide-gray-200 bg-gray-100"
              >
                <thead class="shadow-sm">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3"
                    >
                      Namn
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5"
                    >
                      Artikelnummer
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5"
                    >
                      Tillverkare
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider numbers"
                    >
                      Volym
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider numbers"
                    >
                      Inköpspris
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider numbers"
                    >
                      Försäljningspris
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider numbers"
                    >
                      Lagersaldo
                    </th>
                    <th scope="col" class="px-6 py-3 bg-gray-50">
                      <svg
                        v-if="!addProduct"
                        class="edit shadow bg-yellow-400 rounded cursor-pointer p-1.5"
                        @click="toggleDropDown"
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        aria-haspopup="true"
                        aria-expanded="true"
                      >
                        <path
                          d="M18.31 2.828l2.862 2.862-15.032 15.032-3.583.722.723-3.585 15.03-15.031zm0-2.828l-16.872 16.872-1.438 7.128 7.127-1.437 16.873-16.874-5.69-5.689zm-.021 5.004l-12.728 12.728.707.708 12.728-12.728-.707-.708z"
                        />
                      </svg>
                      <div
                        v-show="dropDownOpen"
                        class="origin-top-right absolute right-20 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <div class="py-1">
                          <a
                            @click="toggleAddProduct"
                            href="#"
                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                            >Lägg till produkt</a
                          >
                        </div>
                      </div>
                      <button
                        v-if="addProduct"
                        class="shadow bg-gray-400 px-4 py-2 text-white font-bold rounded"
                        @click="toggleAddProduct"
                      >
                        Tillbaka
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody v-if="addProduct">
                  <new-product-row :newProduct="newProduct" />
                </tbody>
                <form
                  v-if="addProduct"
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
                  :dropDownOpen="dropDownOpen"
                  :addProduct="addProduct"
                />
                <div v-else class="text-gray-500 p-4 border-none">
                  Inga produkter hittades
                </div>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div v-if="graphqlError" class="ml-20 mt-2 text-red-900">
        {{ graphqlError || "Något gick fel." }}
      </div>
    </template>
  </apollo-query>
</template>

<script>
import ProductTableBody from "./ProductTableBody.vue";
import NewProductRow from "./NewProductRow.vue";
import ADD_PRODUCT from "../queries/addProduct.gql";

export default {
  name: "ProductInventory",
  components: { ProductTableBody, NewProductRow },
  data() {
    return {
      dropDownOpen: false,
      addProduct: false,
      newProduct: {
        name: "123",
        id: "123",
        brand: "123",
        volume: 123,
        purchase_price: 123,
        selling_price: 123,
        balance: 123,
      },
      error: {},
    };
  },
  computed: {
    graphqlError: function() {
      return this.error.graphQLErrors ? this.error.graphQLErrors[0].message : null
    }
  },
  methods: {
    toggleDropDown: function() {
      this.dropDownOpen = !this.dropDownOpen;
    },
    toggleAddProduct: function() {
      this.addProduct = !this.addProduct;
      this.dropDownOpen = false;
    },
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
        this.error = error;
        console.log(error);
      }
    },
  },
};
</script>

<style>
#main-table-container {
  width: 90vw;
  margin: 0 auto;
}

.edit {
  fill: white;
}

.numbers {
  text-align: right;
}
</style>
