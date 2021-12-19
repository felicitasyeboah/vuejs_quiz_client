<template>
  <div>
    <div class="flex justify-center">
      <div class=" relative justify-center mt-6">
        <div class="absolute flex top-0 right-0 p-3 space-x-1">


        </div>

        <p class="bg-white px-12 py-8 rounded-lg w-80"> {{ currentquestion }}
        </p>
      </div>
    </div>
  </div>


  <div class="container container max-w-xl m-auto flex flex-wrap flex-col md:flex-row items-center justify-start">

    <div class="w-full lg:w-1/2 p-3" v-on:click="checkAnswer">
      <div class="flex flex-col lg:flex-row rounded overflow-hidden h-auto lg:h-32 border shadow shadow-lg">

        <div class="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div class="text-black font-bold text-xl mb-2 leading-tight">{{ answer1 }}</div>

        </div>
      </div>
    </div>
    <div class="w-full lg:w-1/2 p-3" v-on:click="checkAnswer">
      <div class="flex flex-col lg:flex-row rounded overflow-hidden h-auto lg:h-32 border shadow shadow-lg">

        <div class="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div class="text-black font-bold text-xl mb-2 leading-tight">{{ answer2 }}</div>

        </div>
      </div>
    </div>
    <div class="w-full lg:w-1/2 p-3" v-on:click="checkAnswer">
      <div class="flex flex-col lg:flex-row rounded overflow-hidden h-auto lg:h-32 border shadow shadow-lg">

        <div class="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div class="text-black font-bold text-xl mb-2 leading-tight">{{ answer3 }}</div>

        </div>
      </div>
    </div>
    <div class="w-full lg:w-1/2 p-3" v-on:click="checkAnswer">
      <div class="flex flex-col lg:flex-row rounded overflow-hidden h-auto lg:h-32 border shadow shadow-lg">
        <div class="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div class="text-black font-bold text-xl mb-2 leading-tight">{{ answer4 }}</div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";


export default {
  components: {},
  data() {
    return {
      currentquestion: null,
      currentcategory: null,
      answer1: null,
      answer2: null,
      answer3: null,
      answer4: null,
      correctanswer: null,
      rightanswer: null,
      currentimage: null,
    }
  },
  // Gets highscores for the table
  mounted() {
    axios.get('http://localhost:8080/question/random').then(resp => {
      this.currentquestion = resp.data.questionText
      this.currentcategory = resp.data.category.categoryName
      this.answer1 = resp.data.answerWrong1
      this.answer2 = resp.data.answerWrong2
      this.answer3 = resp.data.answerWrong3
      this.answer4 = resp.data.answerCorrect
      this.correctanswer = resp.data.answerCorrect

      console.log(resp.data)

    }).catch(e => {
      console.log('Error', e);
    });
  },
  methods: {
    checkAnswer() {
      alert(this.correctanswer);
    }
  },
}
</script>

<style scoped>

</style>
