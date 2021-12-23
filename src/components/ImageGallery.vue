<template>


  <div class="container flex flex-wrap mx-auto">
    <div class="w-full p-2 rounded lg:w-1/3" v-for="image in upimages" :key="image.url">
      <img v-bind:src="image.url" alt="picture text" class="scale-80">
    </div>

  </div>


</template>

<script>
import axios from "axios";

export default {
  name: "ImageGallery",

  data() {
    return {
      choosenPic: null,
      upimages: [],
    }
  },
  mounted() {

    this.userName = localStorage.getItem('userName')
    axios.get('http://localhost:8080/files').then(resp => {

      this.upimages = resp.data;
      // Nur zur Kontrolle:
      console.log("upimages-array:" + this.upimages)
    }).catch(e => {
      console.log('Error', e);
    });

  }
}
</script>

