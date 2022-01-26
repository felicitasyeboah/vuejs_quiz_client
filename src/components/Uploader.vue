<template>
  <div v-if="!this.$store.state.user">
     <span class="alert text-3xl" role="alert">
      Please login.
    </span></div>
  <div v-else>
    <div class="submit shadow-inner">
      <label class="text-black pr-3.5">Upload your image:
        <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" />
      </label>

      <button
          class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
          type="submit" v-on:click="submitFile()">Save
      </button>
      <div class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert"
           v-if="uploadSuccess">
        <p class="font-bold">Yeah..Success</p>
        <p class="text-sm">Your image was uploaded</p>
      </div>
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert"
           v-else-if="showError">
        <strong class="font-bold">Holy smokes!</strong>
        <span class="block sm:inline"> Something seriously bad happened. Try again</span>
        {{ errorMessage }}
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
    <svg class="fill-current h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 20 20"><title>Close</title><path
        d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
  </span>
      </div>
    </div>

  </div>
</template>

<script>

import axios from "axios";
import {UPLOAD_URL} from "@/assets/constants";
import {authComputed} from "@/vuex/helpers";

export default {
  computed: {
    ...authComputed
  },
  name: "Uploader",
  data() {
    return {
      file: '',
      currentPic: null,
      uploadSuccess: false,
      showError: false,
      errorMessage: "Something didnt work.."
    }
  },
  methods: {
    submitFile() {
      let formData = new FormData();
      formData.append('file', this.file);
      const axiosConfiguration = {
        headers: {
          'Content-Type': 'multipart/form-data',
          // "Access-Control-Allow-Origin": "*",
        }
      };
      axios.post(UPLOAD_URL, formData, axiosConfiguration)
          .then((response) => {
            this.currentPic = response.name;
            location.reload();
            this.uploadSuccess = true;
          }).catch((error) => {
        this.showError = true
        this.errorMessage = error
      })
    },

    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      console.log('>>>> 1st element in files array >>>> ', this.file);
    }
  }
};
</script>

<style scoped>

</style>
