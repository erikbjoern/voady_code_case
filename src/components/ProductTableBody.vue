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
        <div class="text-sm text-gray-500 text-right">
          {{ product.volume ? `${product.volume}ml` : "N/A" }}
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-500 text-right">
          {{ product.purchase_price ? `${product.purchase_price.toFixed(2)}kr` : "N/A" }}
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-500 text-right">
          {{ product.selling_price ? `${product.selling_price.toFixed(2)}kr` : "N/A" }}
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-500 text-right">
          {{ product.balance ? `${product.balance}st` : "N/A" }}
        </div>
      </td>
      <td v-if="!showDeleteCheckboxes" class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <input type="checkbox" v-if="authenticated" @change="$emit('select', { isChecked: $event, id: product.id })" />
      </td>
      <td v-if="showDeleteCheckboxes" class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <input class="border-width-2 border-red-500" type="checkbox" v-if="authenticated" @change="$emit('select', { isChecked: $event, id: product.id })" />
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: "ProductTable",
  props: {
    authenticated: Boolean,
    products: Array,
    showDeleteCheckboxes: Boolean,
  },
};
</script>
