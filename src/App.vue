<!--MainTemplate for all sites with Navigation and Footer-->
<template>
  <NavBar />
  <Footer />
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer";


export default {
  components: {
    Footer,
    NavBar,
  },
//Check if there is a value in the storage - if so, check if the token is still valid..
// made more sense with localstorage and long living tokens
  beforeMount() {
    if (sessionStorage.getItem('token') !== null) {
      this.$store.commit('initializeStore');
      this.$store.commit('tokenAndNameCheck');
      try {
        this.$store.commit('decodeJWT');
        this.$store.dispatch('checkTokenDate');
      } catch {
        console.log("Please try again..")
      }
      } else {
        this.$store.dispatch('logout');
      }
  },
};
</script>
