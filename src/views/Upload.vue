<template>
  <Uploader />
  <CurrentUserImage />
</template>

<script>
import Uploader from "@/components/Uploader";
import CurrentUserImage from "@/components/CurrentUserImage";

export default {
  name: "Upload",
  components: {CurrentUserImage, Uploader},
  data() {
    return {}

  }
}
</script>

<style scoped>

</style>
