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

  beforeMount() {
    this.$store.dispatch('tokenAndNameCheck');
    this.$store.dispatch('tokenExpirationCheck');
  }
};
</script>
