<template>
  <tbody class="bg-white divide-y divide-gray-200">
    <tr v-if="showDeleteCheckboxes">
      <td colspan="7"></td>
      <td>
        <button
          v-if="authenticated && showDeleteCheckboxes"
          class="shadow-sm bg-red-700 w-24 px-4 py-2 m-1 text-white font-bold rounded justify-self-end"
          :class="disabledEnabledButton"
          @click="$emit('delete-products')"
        >
          Ta bort
        </button>
      </td>
    </tr>
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
          {{
            product.purchase_price
              ? `${product.purchase_price.toFixed(2)}kr`
              : "N/A"
          }}
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-500 text-right">
          {{
            product.selling_price
              ? `${product.selling_price.toFixed(2)}kr`
              : "N/A"
          }}
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-500 text-right">
          {{ product.balance ? `${product.balance}st` : "N/A" }}
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
        <label
          v-if="authenticated"
          :htmlFor="product.id"
          class="block mx-auto border-2 h-5 w-5 cursor-pointer rounded hover:bg-gray-200 hover:border-3 hover:border-gray-300"
          :class="deleteModeCheckbox"
        >
          <span
            v-if="selectedProducts.map((p) => p.id).includes(product.id)"
            class="relative bottom-0.5 font-bold text-gray-400 w-full"
            :class="{ 'text-red-700': showDeleteCheckboxes }"
            >X</span
          >
          <input
            :id="product.id"
            type="checkbox"
            class="hidden"
            @change="$emit('select', { event: $event, id: product.id })"
          />
        </label>
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: "ProductTable",
  computed: {
    deleteModeCheckbox: function() {
      return {
        "border-red-700": this.showDeleteCheckboxes,
        "hover:bg-red-400": this.showDeleteCheckboxes,
        "hover:border-3": this.showDeleteCheckboxes,
        "hover:border-red-800": this.showDeleteCheckboxes,
      };
    },
    disabledEnabledButton: function() {
      return {
        "opacity-60": !this.selectedProducts.length,
        "hover:opacity-80": !!this.selectedProducts.length,
        "hover:shadow-inner": !!this.selectedProducts.length,
      };
    },
  },
  props: {
    authenticated: Boolean,
    products: Array,
    selectedProducts: Array,
    showDeleteCheckboxes: Boolean,
  },
};
</script>
