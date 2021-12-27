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
  methods: {
    checkStatus() {
      if (localStorage.getItem('token') != null) {
        this.$store.isLoggedIn = true;
        console.log("check store is" + this.$store.isLoggedIn)
      }
    }
  },

  beforeMount() {
    this.$store.commit('initializeStore');
    if (localStorage.getItem('token') != null) {
      this.$store.isLoggedIn = true;
      this.$store.isAuthenticated = true;
      console.log("auth" + this.$store.isAuthenticated)
    } else {
      this.$store.isLoggedIn = false;
      this.$store.isAuthenticated = false;
      console.log("updated store is" + this.$store.isLoggedIn)
      console.log("auth:" + this.$store.isAuthenticated)
    }
  }
};
</script>
