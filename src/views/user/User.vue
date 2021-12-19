<template>
  <Profil />


</template>

<script>

import Profil from "@/components/Profil";

export default {
  components: {Profil},
  data() {
    return {
      userName: '',
      showStats: false,
    }
  },
  mounted() {
    // Gets name from localstorage
    this.userName = localStorage.getItem('userName')
  },
}
</script>

<style>

</style>
