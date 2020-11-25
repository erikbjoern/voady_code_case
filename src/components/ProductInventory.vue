<template>
  <div class="flex flex-col" id="main-table-container">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Namn
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="product in products" :key="product.id">
                <td class="px-6 py-4 whitespace-nowrap">
                    <!-- <div class="flex-shrink-0 h-10 w-10">
                      <img
                        class="h-10 w-10 rounded"
                        src="https://source.unsplash.com/1DMNn6gBbwQ/100x100"
                        alt="products"
                      />
                    </div> -->
                    <!-- <div class="ml-4"> -->
                      <div class="text-sm font-medium text-gray-900">
                        {{ product.name || "N/A" }}
                      </div>
                  <!-- </div> -->
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500">
                    {{ product.brand || "N/A" }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500 numbers">
                    {{ product.volume ? `${product.volume}ml` : "N/A" }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500 numbers">
                    {{ product.purchase_price ? `$${product.purchase_price}` : "N/A" }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500 numbers">
                    {{ product.selling_price ? `$${product.selling_price}` : "N/A" }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500 numbers">
                    {{ product.balance ? `${product.balance}st` : "N/A" }}
                  </div>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <a href="#" class="text-indigo-600 hover:text-indigo-900"
                    >Edit</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "ProductInventory",
  props: {
    products: Array,
  },
};
</script>

<style scoped>
#main-table-container {
  width: 90vw;
  margin: 5vw;
}

.numbers {
  text-align: right;
}
</style>
