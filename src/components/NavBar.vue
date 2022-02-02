<!--Navbar. Only links that match the status (logged in, logged out) are displayed.-->
<template>
  <nav class="Vdark-2 shadow-xl">
    <section class="w-full px-8 text-gray-700 bg-white">
      <div class="relative flex items-center h-16 justify-between">
        <a href="https://www.youtube.com/watch?v=rfbb4yRBH64"
           class="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0">
          <span class="mx-auto text-xl font-black leading-none text-gray-900 select-none">superquiz<span
              class="text-green-600">.</span></span>
        </a>
        <div class="bg-red-400 text-white"> {{ this.errorText }}</div>

        <span v-if="this.isAuthenticated">Welcome {{ this.userName }}</span>

        <span v-else class="italic text-left">Welcome   <span
            v-if="!this.isAuthenticated">unbekannter User</span></span>
        <div class="text-right">
          <span><router-link to="/about">About</router-link></span>
          <span v-if="this.isAuthenticated">
          <span>  |  <router-link to="/highscore">Highscore</router-link></span>
          <span> |  <router-link to="/game">Game</router-link></span>
          <span> |  <router-link to="/upload">Upload</router-link></span>
          <span> |  <router-link to="/user">Profil</router-link></span>
          <span> | <a @click="logout">Logout</a></span></span>
          <span v-else> |
              <router-link to="/login">Login</router-link> |
              <router-link to="/register">  Not a member?<button type="button"
                                                                 class="bg-green-600 hover:bg-green-800 my-2 py-2 mx-2 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none">Sign up</button></router-link>
            </span>
        </div>
      </div>
    </section>
  </nav>
  <router-view></router-view>
</template>


<script>


export default {
  computed: {
    isAuthenticated: function () {
      return this.$store.state.isAuthenticated
    },
    errorText: function () {
      return this.$store.state.errorText
    },
    userName: function () {
      return localStorage.getItem('userName')
    }
  },

  name: 'Navbar',
  props: {},


  methods: {
    // Logs out currentUsername (method in store.js) and reloads nav-Bar
    logout() {
      this.$store.dispatch('logout')
      console.log(this.$store.isLoggedIn)
      console.log(this.$store.state.user)
    },
  },
}
</script>
