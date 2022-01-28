<template>
  <div v-if="this.$store.state.isAuthenticated">
    <Uploader />
    <CurrentUserImage />
  </div>
  <div v-else>
    <Login />
  </div>
</template>

<script>
import Uploader from "@/components/Uploader";
import CurrentUserImage from "@/components/CurrentUserImage";
import Login from "@/views/Login";

export default {
  name: "Upload",
  components: {CurrentUserImage, Uploader, Login},
  data() {
    return {}

  }
}
</script>

<style scoped>

</style>
