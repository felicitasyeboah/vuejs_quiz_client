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
  data() {

  },
  beforeMount() {
    if (localStorage.getItem('token') !== null) {
      this.$store.commit('initializeStore');
      try {
        this.$store.commit('decodeJWT');
        this.$store.dispatch('checkTokenDate');
      } catch {
        console.log("Please try again..")
        const er = "Token problem"
        this.$store.commit('setError', er)
      }

      if (this.$store.state.tokenValid) {
        this.$store.commit('tokenAndNameCheck');
      } else {
        this.$store.dispatch('logout');
      }
    } else {
      alert("kein token vorhanden")
    }
  },

};
</script>
