<template>
  <Uploader></Uploader>
  <ImageGallery></ImageGallery>
</template>

<script>
import Uploader from "@/components/Uploader";
import ImageGallery from "@/components/ImageGallery";

export default {
  name: "Upload",
  components: {ImageGallery, Uploader},
  data() {
    return {}

  }
}
</script>

<style scoped>

</style>
