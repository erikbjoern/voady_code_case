<template>
  <tr>
    <td class="px-6 py-4 whitespace-nowrap">
      <input
        class="text-sm font-medium text-gray-900 bg-transparent min-w-full border-b border-gray-400 focus:outline-none"
        form="addProduct"
        name="name"
        v-model="newProductProps.name"
      />
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <input
        class="text-sm font-medium text-gray-900 bg-transparent min-w-full border-b border-gray-400 focus:outline-none"
        form="addProduct"
        name="id"
        required="true"
        v-model="newProductProps.id"
      />
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <input
        class="text-sm font-medium text-gray-900 bg-transparent min-w-full border-b border-gray-400 focus:outline-none"
        form="addProduct"
        name="brand"
        v-model="newProductProps.brand"
      />
    </td>
    <td class="px-6 py-4 whitespace-nowrap align-center">
      <input
        class="text-sm font-medium text-gray-900 bg-transparent w-12 text-right border-b border-gray-400 focus:outline-none"
        form="addProduct"
        name="volume"
        type="number"
        v-model="newProductProps.volume"
      />
      <span class="text-gray-500">ml</span>
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-right">
      <input
        class="text-sm font-medium text-gray-900 bg-transparent w-12 text-right border-b border-gray-400 focus:outline-none"
        form="addProduct"
        name="purchase_price"
        type="number"
        v-model="newProductProps.purchase_price"
      />
      <span class="text-gray-500">kr</span>
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-right">
      <input
        class="text-sm font-medium text-gray-900 bg-transparent w-12 text-right border-b border-gray-400 focus:outline-none"
        form="addProduct"
        name="selling_price"
        type="number"
        v-model="newProductProps.selling_price"
      />
      <span class="text-gray-500">kr</span>
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-right">
      <input
        class="text-sm font-medium text-gray-900 bg-transparent w-12 text-right border-b border-gray-400 focus:outline-none"
        form="addProduct"
        name="balance"
        required="true"
        type="number"
        v-model="newProductProps.balance"
      />
      <span class="text-gray-500">st</span>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <button
        class="shadow bg-yellow-400 px-4 py-2 text-white font-bold rounded hover:opacity-80"
        form="addProduct"
        type="submit"
      >
        Lägg till
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  name: "NewProductRow",
  props: {
    newProduct: {
      name: String,
      id: String,
      brand: String,
      volume: Number,
      purchase_price: Number,
      selling_price: Number,
      balance: Number,
    },
  },
  computed: {
    newProductProps() {
      const {
        name,
        id,
        brand,
        volume,
        purchase_price,
        selling_price,
        balance,
      } = this.newProduct;
      return {
        name,
        id,
        brand,
        volume,
        purchase_price,
        selling_price,
        balance,
      };
    },
  },
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
