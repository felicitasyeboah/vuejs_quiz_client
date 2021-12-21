<template>
  <div id="app">
    <label>File
      <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" />
    </label>
    <button v-on:click="submitFile()">Submit</button>
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
          })
          .catch((err) => {
            console.log("AXIOS ERROR: ", err);
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
