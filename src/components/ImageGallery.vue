<template>
  <div class="container flex flex-wrap mx-auto">
    <template v-if="!isLoading">
      <div class="w-2/3 p-4 rounded xl:w-1/4 lg:w-1/3 md:w-1/3 sm:w-1/2" v-for="image in upimages" :key="image.url">
        <img v-bind:src="image.url" alt="picture text">
      </div>
    </template>
    <div class="max-w-lg mx-auto text-center mt-12 mb-6 ">
      <div class="alert text-3xl" role="alert" v-show="isLoading">
        Error
      </div>
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
      isLoading: true,
    }
  },
  mounted() {
    //Gets all the images saved on the server and displays them
    this.userName = localStorage.getItem('userName')
    axios.get('http://localhost:8080/files').then(resp => {
      this.upimages = resp.data;
      this.isLoading = false
      console.log("upimages-array:" + this.upimages)
    }).catch(e => {
      console.log('Error', e);
    });

  }
}
</script>

