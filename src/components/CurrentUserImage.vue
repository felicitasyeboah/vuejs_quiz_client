<template>
  <div class="container flex flex-wrap md:max-w p-4 justify-center rounded mx-auto">
    <div class="bg-white p-8 m-1 bg-white shadow-2xl">
      <h1 class="font-thin  text-3xl">Your current picture:</h1>
      <img v-bind:src="this.userImage" class="w-1/2 mx-auto" alt="currentUserImage">
    </div>
  </div>
</template>

<script>

export default {
  name: "CurrentUserImage",

  data() {
    return {
      imgRoot: "http://localhost:8080/profileImage/",

    }
  },
  computed: {
    // a computed getter
    userImage: function () {
      return this.imgRoot + sessionStorage.getItem('userName')
    }
  },
}
</script>

