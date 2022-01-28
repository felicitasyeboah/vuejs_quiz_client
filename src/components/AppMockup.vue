<template>

  <div class="container flex flex-wrap md:max-w p-4 justify-center rounded mx-auto">
    <div class="bg-white p-8 m-1 bg-white shadow-2xl">

      <h1 class="text-black bg-text pb-10 text-3xl text-center font-thin">(Not) Available in many countries
                                                                          worldwide. </h1>
      <img src="../assets/android.jpg" alt="mockup" id="mockup" class="w-1/3 pt-10 mx-auto">


      <img src="../assets/google-play-badge.png" alt="mockup" id="playbadge" class="w-1/6 mx-auto">
      <img src="../assets/applestore.png" alt="mockup" id="applebadge" class="w-1/6 mx-auto">
    </div>
  </div>


</template>

<script>
export default {
  name: "AppMockup"
}
</script>

<style scoped>
.flex {
  display         : flex;
  align-items     : center;
  justify-content : center;
  }

</style>
