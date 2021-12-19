<template>
  <body class="body-bg2 min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
  <Header />
  <main class="bg-white max-w-2xl mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
    <table class="table-auto">
      <thead>
      <tr>
        <th>Place</th>
        <th>Player</th>
        <th>Highscore</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
        <td>Malcolm Lockyer</td>
        <td>1961</td>
      </tr>
      <tr>
        <td>Witchy Woman</td>
        <td>The Eagles</td>
        <td>1972</td>
      </tr>
      <tr>
        <td>Shining Star</td>
        <td>Earth, Wind, and Fire</td>
        <td>1975</td>
      </tr>
      </tbody>
    </table>
  </main>
  </body>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header";

export default {
  components: {Header},
  data() {
    return {
      highscore: null,
      data: [],
      result: []
    }
  },
  // Gets highscores for the table
  mounted() {
    axios.get('http://localhost:8080/highscoreGlobal').then(resp => {
      console.log((resp.data))

    }).catch(e => {
      console.log('Error', e);
    });
  }
}
</script>

