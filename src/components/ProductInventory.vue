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
      <modal-dialog
        v-if="showModal"
        text="Vill du ta bort markerade produkter?"
        @ok="deleteProducts"
        @cancel="showModal = false"
      />
      <div class="shadow overflow-x-auto rounded-lg w-11/12 mx-auto">
        <table
          class="table-fixed min-w-full divide-y divide-gray-200 bg-gray-100"
        >
          <product-table-head
            :authenticated="authenticated"
            :selectedProducts="!!selectedProducts.length"
            :showNewProductForm="showNewProductForm"
            :showDropdown="showDropdown"
            @delete-products="toggleModal"
            @toggle-delete-checkboxes="toggleCheckboxes('delete')"
            @toggle-edit-checkboxes="toggleCheckboxes('edit')"
            @toggle-dropdown="toggleDropdown"
            @toggle-new-product-form="toggleNewProductForm"
          />
          <tbody v-if="showNewProductForm && authenticated">
            <new-product-row
              :newProduct="newProduct"
              @input="productAdded = false"
            />
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
            v-else-if="data && data.products.length"
            :authenticated="authenticated"
            :products="data.products"
            :selectedProducts="selectedProducts"
            :showDeleteCheckboxes="showDeleteCheckboxes"
            :showEditCheckboxes="showEditCheckboxes"
            @select="handleProductSelection"
            @delete-products="showModal = true"
            @edit-all-products-balance="updateAllProducts()"
            @edit-balance="handleEditedBalance"
          />
          <div v-else class="text-gray-500 p-4 border-none">
            Inga produkter hittades
          </div>
          <td colspan="8">
            <div v-if="errorMessage" class="m-4 text-red-900">
              {{ graphqlError || "Något gick fel." }}
            </div>
            <div v-if="productAdded" class="text-green-700 m-5">
              Produkten lades till
            </div>
          </td>
        </table>
      </div>
    </template>
  </apollo-query>
</template>

<script>
import ModalDialog from "./ModalDialog.vue";
import NewProductRow from "./NewProductRow.vue";
import ProductTableBody from "./ProductTableBody.vue";
import ProductTableHead from "./ProductTableHead.vue";
import ADD_PRODUCT from "../graphql/mutations/addProduct.gql";
import DELETE_PRODUCTS from "../graphql/mutations/deleteProducts.gql";
import EDIT_PRODUCTS_BALANCE from "../graphql/mutations/editProductsBalance.gql";
import gql from "graphql-tag";

export default {
  name: "ProductInventory",
  components: {
    ModalDialog,
    NewProductRow,
    ProductTableBody,
    ProductTableHead,
  },
  data() {
    return {
      showDeleteCheckboxes: false,
      showEditCheckboxes: false,
      showDropdown: false,
      showModal: false,
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
      editedBalances: [],
      selectedProducts: [],
      errorMessage: null,
      productAdded: false,
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
    handleProductSelection: function({ event, id }) {
      const selected = this.selectedProducts;
      const edited = this.editedBalances;

      if (event.target.checked && !selected.map((p) => p.id).includes(id)) {
        selected.push({ id });
      } else {
        const index = selected.indexOf(selected.find((p) => p.id === id));
        selected.splice(index, 1);

        if (edited.map((p) => p.id).includes(id)) {
          const index = edited.indexOf(edited.find((p) => p.id === id));
          edited.splice(index, 1);
        }
      }
    },
    deleteProducts: async function() {
      this.showModal = false;

      try {
        await this.$apollo.mutate({
          mutation: DELETE_PRODUCTS,
          variables: {
            products: this.selectedProducts,
          },
          update: (store, { data: { deleteProducts } }) => {
            const data = store.readQuery({
              query: gql`
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
              `,
            });

            deleteProducts.forEach((productToDelete) => {
              const products = data.products;
              const index = products.indexOf(
                products.find((p) => p.id === productToDelete.id)
              );
              products.splice(index, 1);
            });

            store.writeQuery({
              query: gql`
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
              `,
              data,
            });
          },
        });
        this.selectedProducts = [];
      } catch (error) {
        this.errorMessage = error;
        console.log(error);
      }
    },
    handleEditedBalance: function({ id, balance }) {
      const alreadyEditedProduct = this.editedBalances.find((p) => p.id === id);

      if (alreadyEditedProduct) {
        const index = this.editedBalances.indexOf(alreadyEditedProduct);
        this.editedBalances[index] = { id, balance };
      } else {
        this.editedBalances.push({ id, balance });
      }
    },
    updateAllProducts: async function() {
      try {
        await this.$apollo.mutate({
          mutation: EDIT_PRODUCTS_BALANCE,
          variables: {
            products: this.editedBalances,
          },
        });

        this.editedBalances = [];
        this.selectedProducts = [];
      } catch (error) {
        this.errorMessage = error;
        console.log(error);
      }
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

      const newProduct = {
        name: name.value,
        id: id.value,
        brand: brand.value,
        volume: parseInt(volume.value),
        purchase_price: parseFloat(purchase_price.value),
        selling_price: parseFloat(selling_price.value),
        balance: parseInt(balance.value),
      };

      try {
        const response = await this.$apollo.mutate({
          mutation: ADD_PRODUCT,
          variables: {
            product: newProduct,
          },
          update: (store, { data: { addProduct } }) => {
            const data = store.readQuery({
              query: gql`
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
              `,
            });

            data.products.push(newProduct);

            store.writeQuery({
              query: gql`
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
              `,
              data,
            });
          },
        });

        this.errorMessage = null;
        this.productAdded = true;
        e.target.reset();
      } catch (error) {
        this.errorMessage = error;
        console.log(error);
      }
    },
    toggleCheckboxes: function(type) {
      this.showEditCheckboxes =
        type === "edit" ? !this.showEditCheckboxes : false;
      this.showDeleteCheckboxes =
        type === "delete" ? !this.showDeleteCheckboxes : false;
      this.showDropdown = false;
    },
    toggleDropdown: function() {
      this.showDropdown = !this.showDropdown;
    },
    toggleModal: function() {
      this.showModal = !this.showModal;
      this.showDropdown = false;
    },
    toggleNewProductForm: function() {
      this.showNewProductForm = !this.showNewProductForm;
      this.showDropdown = false;
      this.showDeleteCheckboxes = false;
    },
  },
};
</script>
