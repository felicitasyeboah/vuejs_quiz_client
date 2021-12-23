<template>
  <div class="submit">
    <label>File
      <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" />
    </label>

    <button
        class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
        type="submit" v-on:click="submitFile()">Save
    </button>
    <div class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert" v-if="regsuc">
      <p class="font-bold">Yeah..Success</p>
      <p class="text-sm">Your image was uploaded</p>
    </div>
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert"
         v-else-if="error">
      <strong class="font-bold">Holy smokes!</strong>
      <span class="block sm:inline"> Something seriously bad happened. Try again</span>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
    <svg class="fill-current h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 20 20"><title>Close</title><path
        d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
  </span>
    </div>


  </div>
</template>

<script>

import axios from "axios";
import {upload_url} from "@/assets/constants";

export default {
  name: "Uploader",
  data() {
    return {
      file: '',
      currentPic: null,
      regsuc: false,
      error: false,
    }
  },
  methods: {
    submitFile() {
      let formData = new FormData();
      formData.append('file', this.file);
      console.log('>> formData >> ', formData);

      let axiosConfig = {
        headers: {
          'Content-Type': 'multipart/form-data',
          // "Access-Control-Allow-Origin": "*",
        }
      };
      axios.post(upload_url, formData, axiosConfig)
          .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);
            this.info = res;
            this.regSuccess = true;
            this.currentPic = res.name;
            location.reload();
            this.regsuc = true;

          })
          .catch((err) => {
            console.log("AXIOS ERROR: ", err);
            this.error = true;
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
