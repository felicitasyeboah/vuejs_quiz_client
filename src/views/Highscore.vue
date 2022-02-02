<template>
  <div v-if="this.$store.state.isAuthenticated">
    <div class="body-bg2 min-h-screen  pt-12 md:pt-20 pb-6 px-2 md:px-0">
      <Header />
      <div v-if="this.$store.state.existingHighscore">
        <HighscoreTable />
      </div>
      <div v-else>
        <SingleError />
      </div>
    </div>
  </div>
  <div v-else>
    <Login />
  </div>
</template>

<script>

import HighscoreTable from "@/components/HighscoreTable";
import Header from "@/components/Header";
import Login from "@/views/Login";
import SingleError from "@/components/SingleError";

export default {
  components: {SingleError, HighscoreTable, Header, Login},
  data() {
    return {}
  },
  mounted() {
  },
  methods: {}
}
</script>

