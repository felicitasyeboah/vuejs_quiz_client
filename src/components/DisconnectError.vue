<template>
  <body class="overflow-hidden">
  <div class="flex items-center justify-center w-screen h-screen ">
    <div class="px-4 lg:py-12">
      <div class="lg:gap-4 lg:flex">
        <div
            class="flex flex-col items-center justify-center md:py-24 lg:py-32">
          <h1 class="font-bold text-blue-600 text-9xl">..</h1>
          <p
              class="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
            <span class="text-red-500">Oops!</span> Connection error
          </p>
          <p class="mb-8 text-center text-gray-500 md:text-lg">
            Technical problem or your opponent has left the game
          </p>
          <span class="text-teal-600 text-md font-semibold"> <span class="text-sm text-gray-600"><button
              class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              @click="playAgain">Play again
        </button></span> </span>
        </div>
        <div class="mt-4">
          <img
              src="../assets/run-escape.gif"
              alt="img"
              class="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  </div>
  </body>
</template>

<script>
export default {
  name: "DisconnectError",
  methods: {
    playAgain() {
      this.$router.push('Game')
    }
  }
}
</script>

