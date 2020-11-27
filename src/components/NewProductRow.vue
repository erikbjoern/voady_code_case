<template>
  <tr>
    <td class="px-6 py-4 whitespace-nowrap">
      <input
        class="text-sm font-medium text-gray-900 bg-transparent min-w-full"
        v-model="name"
      />
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <input
        class="text-sm font-medium text-gray-900 bg-transparent min-w-full"
        required
        v-model="brand"
      />
    </td>
    <td class="px-6 py-4 whitespace-nowrap align-center">
      <input
        class="text-sm font-medium text-gray-900 bg-transparent numbers"
        v-model="volume"
        type="number"
      />
      <span class="text-gray-500">ml</span>
    </td>
    <td class="px-6 py-4 whitespace-nowrap numbers-column">
      <span class="text-gray-500">$</span>
      <input
        class="text-sm font-medium text-gray-900 bg-transparent numbers"
        v-model="purchase_price"
        type="number"
      />
    </td>
    <td class="px-6 py-4 whitespace-nowrap numbers-column">
      <span class="text-gray-500">$</span>
      <input
        class="text-sm font-medium text-gray-900 bg-transparent numbers"
        v-model="selling_price"
        type="number"
      />
    </td>
    <td class="px-6 py-4 whitespace-nowrap numbers-column">
      <input
        class="text-sm font-medium text-gray-900 bg-transparent numbers"
        v-model="balance"
        type="number"
      />
      <span class="text-gray-500">st</span>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <button class="shadow bg-yellow-400 px-4 py-2 text-white font-bold rounded">
        Lägg till</button>
    </td>
  </tr>
</template>

<script>
export default {
  name: "NewProductRow",
  props: {
    name: String,
    brand: String,
    volume: Number,
    purchase_price: Number,
    selling_price: Number,
    balance: Number,
  },
};
</script>

<style scoped>
input {
  border-bottom: 1px solid lightgray;
  width: 50px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.numbers-column {
  text-align: right;
}
</style>
