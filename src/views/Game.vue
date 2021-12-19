<template>
  <div class="game">Game</div>
  <a href="" class="inline-block p-0.5 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
  <span class="block px-8 py-3 font-medium text-white bg-gray-900 rounded-full hover:bg-opacity-75">
Play game!
  </span>
    <Question></Question>
  </a>
</template>

<script>
import Question from "@/components/Question";

export default {
  name: "Game",
  components: {Question}
}
</script>

<style scoped>

</style>
