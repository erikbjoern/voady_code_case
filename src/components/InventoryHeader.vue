<template>
  <div class="flex justify-end header-container">
    <div v-if="error" class="mr-10 mt-2 text-red-900">{{ graphQLError || "Något gick fel" }}</div>
    <div class="bg-gray-200 rounded shadow-inner">
      <form
        v-if="!authenticated && showLoginForm"
        class="flex items-center"
        @submit="login"
      >
        <label class="flex items-center pl-4" htmlFor="email">
          <span class="px-2">e-mail:</span>

          <div
            class="inline-block flex items-center h-10 px-4 bg-gray-100 shadow-inner"
          >
            <input
              id="email"
              type="email"
              name="email"
              class="border-b border-gray-200 bg-transparent"
            />
          </div>
        </label>
        <label class="flex items-center" htmlFor="password">
          <span class="pr-2 pl-5">lösenord:</span>
          <div
            class="inline-block flex items-center h-10 px-4 bg-gray-100 shadow-inner"
          >
            <input
              id="password"
              type="password"
              name="password"
              class="border-b border-gray-200 bg-transparent"
            />
          </div>
        </label>
        <button
          class="shadow bg-yellow-400 px-4 py-2 text-white font-bold rounded cursor-pointer hover:opacity-80"
        >
          Logga in
        </button>
      </form>
      <button
        v-if="!authenticated && !showLoginForm"
        class="shadow bg-gray-100 px-4 py-2 text-gray-500 font-bold rounded cursor-pointer hover:bg-gray-200"
        @click="toggleLoginForm"
      >
        Logga in
      </button>
    </div>
    <div v-if="authenticated" class="text-gray-100">
      <span class="mr-3">
        {{ `Inloggad som ${user.firstName} ${user.lastName}` }}
      </span>
      <button
        class="shadow bg-gray-100 px-4 py-2 text-gray-500 font-bold rounded cursor-pointer hover:bg-gray-200"
        @click="logout"
      >
        Logga ut
      </button>
    </div>
  </div>
</template>

<script>
import LOGIN from "../queries/login.gql";
import LOGOUT from "../queries/logout.gql";

export default {
  name: "Header",
  data() {
    return {
      error: null,
      showLoginForm: false,
      user: {},
    };
  },
  props: {
    authenticated: Boolean
  },
  computed: {
    graphQLError: function() {
      return this.error?.graphQLErrors[0]?.message || null
    }
  },
  methods: {
    toggleLoginForm: function() {
      this.showLoginForm = !this.showLoginForm;
    },
    login: async function(event) {
      event.preventDefault();

      const { email, password } = event.target;

      try {
        const response = await this.$apollo.mutate({
          mutation: LOGIN,
          variables: {
            email: email.value,
            password: password.value,
          },
        });

        event.target.reset();
        this.toggleLoginForm();
        this.user = response.data.login.user;
        this.$emit('login')
      } catch (error) {
        this.error = error
        console.log(error);
      }
    },
    logout: async function() {
      const email = this.user.email;

      try {
        await this.$apollo.mutate({
          mutation: LOGOUT,
          variables: { email: email }
        });

        this.user = {}
        this.$emit('logout')
      } catch (error) {
        this.error = error
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.header-container {
  width: 90vw;
  margin: 40px auto;
}
</style>
