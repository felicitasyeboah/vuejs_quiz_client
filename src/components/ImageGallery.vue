<template>
  <div class="container flex flex-wrap mx-auto">
    <template v-if="!isLoading&&!showError">
      <div class="w-2/3 p-4 rounded xl:w-1/4 lg:w-1/3 md:w-1/3 sm:w-1/2" v-for="image in uploadedImages"
           :key="image.url">
        <img v-bind:src="image.url" alt="picture text">
      </div>
    </template>
    <div class="max-w-lg mx-auto text-center mt-12 mb-6 ">
      <div class="alert text-3xl" role="alert" v-show="isLoading&&!showError">
        Loading data.. please wait
      </div>
      <div class="alert error-message text-white" v-show="showError">
        {{ errorMessage }}
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
      selectedImage: null,
      uploadedImages: [],
      isLoading: true,
      errorMessage: "Error: Oops. Something didn't work quite right",
      showError: false,
    }
  },
  mounted() {
    //Gets all the images saved on the server and displays them
    this.userName = localStorage.getItem('userName')
    axios.get('http://localhost:8080/files').then(resp => {
      this.uploadedImages = resp.data;
      this.isLoading = false
      console.log("uploadedImages-array:" + this.uploadedImages)
    }).catch((error) => {
      if (error.response) {
        // client received an error response (5xx, 4xx)
        console.log(error.response.data);
        this.showError = true
        this.errorMessage = error
      } else if (error.request) {
        // client never received a response, or request never left
        console.log(error.request)
        this.showError = true;
        this.errorMessage = "Error - No response from server"
      } else {
        // anything else
        this.showError = true
      }
    })
  }
}
</script>

