<!--Navbar. Only links that match the status (logged in, logged out) are displayed.-->
<template>
  <nav class="Vdark-2 shadow-xl">
    <section class="w-full px-8 text-gray-700 bg-white">
      <div class="relative flex items-center h-16 justify-between">
        <a href="#_"
           class="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0">
          <span class="mx-auto text-xl font-black leading-none text-gray-900 select-none">superquiz<span
              class="text-green-600">.</span></span>
        </a>
        <span v-if="isLoggedIn">Welcome {{ userName }}</span>
        <span v-else class="italic text-left">Welcome </span>
        <div class="text-right">
          <router-link to="/"> Home</router-link>
          |
          <router-link to="/about">About</router-link>
          |
          <!--          Nur zu Testzwecken-->
          <!--          <a @click="checkS">check</a>-->
          <span v-if="isLoggedIn"> |  <router-link to="/highscore">Highscore</router-link></span>
          <span v-if="isLoggedIn"> |  <router-link to="/game">Game</router-link></span>
          <span v-if="isLoggedIn"> |  <router-link to="/user">Profil</router-link></span>
          <span v-if="isLoggedIn"> | <a @click="logout">Logout</a></span>
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
  name: 'Navbar',
  props: {},
  data() {
    return {
      isLoggedIn: this.$store.isLoggedIn,
      userName: localStorage.getItem('userName'),
    }
  },
  watch: {
    isLoggedIn: function () {
      console.log(this.isLoggedIn)
    }
  },
  methods: {
    // Logs out user (method in store.js) and reloads nav-Bar
    logout() {
      this.$store.dispatch('logout')
      this.$store.commit('changeStatus', false)
      console.log(this.$store.isLoggedIn)
      location.reload()
    },
    // LogginStatus testweise checken, da es nicht ging.. wie es sollte
    // checkS() {
    //   this.$store.commit('changeStatus', false)
    //   console.log(this.$store.isLoggedIn)
    // }
  },
}
</script>
