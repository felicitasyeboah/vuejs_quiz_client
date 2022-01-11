<template>
  <template v-if="!isLoading">
    <section class="relative py-16 bg-white min-w-screen animation-fade animation-delay">
      <div class="container px-0 px-8 mx-auto sm:px-12 xl:px-5">
        <p class="text-xs font-bold text-left text-green-800 uppercase sm:mx-6 sm:text-center sm:text-normal sm:font-bold">
          Got a Question? We’ve got answers.
        </p>
        <h3 class="mt-1 text-2xl font-bold text-left text-gray-800 sm:mx-6 sm:text-3xl md:text-4xl lg:text-5xl sm:text-center sm:mx-0">
          Frequently Asked Questions
        </h3>
        <div
            class="w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3">
          <h3 class="text-lg font-bold text-grey-500 sm:text-xl md:text-2xl">What categories are there?</h3>
          <div class="mt-2 text-base text-gray-600 sm:text-lg md:text-normal" v-for="entry in categories" :key="entry">
            {{ entry }}
          </div>
        </div>
        <div
            class="w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3">
          <h3 class="text-lg font-bold text-grey-500 sm:text-xl md:text-2xl">Do you offer team pricing?</h3>
          <p class="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
            Yes, we do! Team pricing is available for any plan. You can take advantage of 30% off for signing up for
            team
            pricing of 10 users or more.
          </p>
        </div>
        <div
            class="w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3">
          <h3 class="text-lg font-bold text-purple-500 sm:text-xl md:text-2xl">How do I make changes and configure my
                                                                               site?</h3>
          <p class="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
            You can easily change your site settings inside of your site dashboard by clicking the top right menu and
            clicking the settings button.
          </p>
        </div>
        <div
            class="w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3">
          <h3 class="text-lg font-bold text-purple-500 sm:text-xl md:text-2xl">How do I add a custom domain?</h3>
          <p class="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
            You can easily change your site settings inside of your site dashboard by clicking the top right menu and
            clicking the settings button.
          </p>
        </div>
      </div>
    </section>
  </template>
  <div class="max-w-lg mx-auto text-center mt-12 mb-6 ">
    <div class="alert text-3xl" role="alert" v-show="isLoading">
      Please login.
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FAQ",
  data() {
    return {
      isLoading: true,
      categories: []
    }
  },
  // Get categories
  beforeMount() {
    axios.get('http://localhost:8080/category').then(resp => {
      this.categories = resp.data
      this.isLoading = false
      // const obj =;
    }).catch(e => {
      console.log('Error', e);
    });
  }
};
</script>

<style scoped>

</style>
