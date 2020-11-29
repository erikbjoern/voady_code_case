<template>
  <thead class="shadow-sm">
    <tr class="h-14">
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
        class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Volym
      </th>
      <th
        scope="col"
        class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Inköpspris
      </th>
      <th
        scope="col"
        class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Försäljningspris
      </th>
      <th
        scope="col"
        class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Lagersaldo
      </th>
      <th scope="col" class="px-6 py-3 bg-gray-50">
        <svg
          v-if="authenticated && !showNewProductForm"
          class="edit-button shadow bg-yellow-400 h-9 rounded cursor-pointer p-1.5 hover:opacity-80"
          @click="toggleDropdown"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-haspopup="true"
          aria-expanded="true"
          style="fill: white;"
        >
          <path
            d="M18.31 2.828l2.862 2.862-15.032 15.032-3.583.722.723-3.585 15.03-15.031zm0-2.828l-16.872 16.872-1.438 7.128 7.127-1.437 16.873-16.874-5.69-5.689zm-.021 5.004l-12.728 12.728.707.708 12.728-12.728-.707-.708z"
          />
        </svg>
        <div
          v-show="showDropdown && authenticated"
          class="origin-top-right absolute right-20 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div class="py-1">
            <a
              @click="toggleNewProductForm"
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              >Lägg till produkt</a
            >
          </div>
        </div>
        <button
          v-if="showNewProductForm && authenticated"
          class="shadow bg-gray-400 px-4 py-2 text-white font-bold rounded  hover:opacity-80"
          @click="toggleNewProductForm"
        >
          Tillbaka
        </button>
      </th>
    </tr>
  </thead>
</template>

<script>
export default {
  name: "ProductTableHead",
  data() {
    return {
      showDropdown: false,
    };
  },
  props: {
    authenticated: Boolean,
    showNewProductForm: Boolean,
  },
  methods: {
    toggleDropdown: function() {
      this.showDropdown = !this.showDropdown;
    },
    toggleNewProductForm: function() {
      this.showDropdown = false;
      this.$emit("toggleNewProductForm");
    },
  },
};
</script>

<style></style>
