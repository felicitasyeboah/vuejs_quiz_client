<!--MainTemplate for all sites with Navigation and Footer-->
<template>
  <NavBar />
  <Footer />
</template>

<script type="text/javascript">
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
    if (localStorage.getItem('token') != null) {
      this.$store.isLoggedIn = true;
      console.log("updated store is" + this.$store.isLoggedIn)
    } else {
      this.$store.isLoggedIn = false;
      console.log("updated store is" + this.$store.isLoggedIn)
    }
  }
};
</script>
