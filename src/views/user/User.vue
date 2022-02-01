<template>
  <div v-if="this.$store.state.isAuthenticated">
    <div v-if="!this.existingRecords">
      <UserInformation />
    </div>
    <div v-else>
      <Profil />
    </div>
  </div>
  <div v-else>
    <Login />
  </div>
</template>

<script>

import Profil from "@/components/Profil";
import Login from "@/views/Login";
import UserInformation from "@/components/UserInformation";

export default {
  components: {UserInformation, Profil, Login},
  // data() {
  //   return {
  //     existingRecords: true,

  computed: {
    existingRecords: function () {
      return this.$store.state.existingRecords
    },
  }
}
</script>

<style>

</style>
