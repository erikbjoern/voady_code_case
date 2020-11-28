<template>
  <tbody class="bg-white divide-y divide-gray-200">
    <tr v-for="product in products" :key="product.id">
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm font-medium text-gray-900">
          {{ product.name || "N/A" }}
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm font-medium text-gray-900">
          {{ product.id || "N/A" }}
        </div>
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
          {{ product.purchase_price ? `${product.purchase_price.toFixed(2)}kr` : "N/A" }}
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-500 numbers">
          {{ product.selling_price ? `${product.selling_price.toFixed(2)}kr` : "N/A" }}
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-500 numbers">
          {{ product.balance ? `${product.balance}st` : "N/A" }}
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: "ProductTable",
  props: {
    products: Array,
  },
};
</script>
