<template>
  <tbody class="bg-white divide-y divide-gray-200">
    <tr v-if="authenticated && showDeleteCheckboxes">
      <td colspan="7"></td>
      <td>
        <button
          class="shadow-sm bg-red-700 w-24 px-4 py-2 m-1 text-white font-bold rounded justify-self-end"
          :class="disabledEnabledButton"
          @click="$emit('delete-products')"
        >
          Ta bort
        </button>
      </td>
    </tr>
    <tr v-if="authenticated && showEditCheckboxes">
      <td colspan="7"></td>
      <td>
        <button
          class="shadow-sm bg-yellow-400 w-24 px-4 py-2 m-1 text-white font-bold rounded justify-self-end"
          :class="disabledEnabledButton"
          @click="$emit('edit-all-products-balance')"
        >
          Spara
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
        <div
          v-if="!showEditCheckboxes || (showEditCheckboxes && !selectedProducts.map((p) => p.id).includes(product.id))"
          class="text-sm text-gray-500 text-right"
        >
          {{ product.balance ? `${product.balance}st` : "N/A" }}
        </div>
        <div v-else-if="showEditCheckboxes">
          <input
            v-if="showEditCheckboxes"
            type="number"
            class="edit-balance text-right w-20 pr-5 relative left-5"
            v-model="product.balance"
            @change="$emit('edit-balance', {id: product.id, balance: parseInt(product.balance)})"
          /><span class="absolute mt-0.5">st</span>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
        <label
          v-if="authenticated"
          :htmlFor="product.id"
          class="block mx-auto border-2 h-5 w-5 cursor-pointer rounded hover:bg-gray-200 hover:border-3 hover:border-gray-300"
          :class="[deleteModeCheckbox, editModeCheckbox]"
        >
          <span
            v-if="selectedProducts.map((p) => p.id).includes(product.id)"
            class="relative bottom-0.5 font-bold text-gray-400 w-full"
            :class="{
              'text-red-700': showDeleteCheckboxes,
              'text-yellow-500': showEditCheckboxes,
            }"
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
    editModeCheckbox: function() {
      return {
        "border-yellow-400": this.showEditCheckboxes,
        "hover:bg-yellow-300": this.showEditCheckboxes,
        "hover:border-3": this.showEditCheckboxes,
        "hover:border-yellow-500": this.showEditCheckboxes,
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
    showEditCheckboxes: Boolean,
  },
};
</script>

<style scoped>
.edit-balance {
  border: 2px solid rgb(243, 183, 87) !important;
  border-radius: 3px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
