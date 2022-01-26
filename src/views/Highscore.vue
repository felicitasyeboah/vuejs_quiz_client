<template>
  <div class="body-bg2 min-h-screen  pt-12 md:pt-20 pb-6 px-2 md:px-0">
    <Header />
    <HighscoreTable />
  </div>
</template>

<script>

import HighscoreTable from "@/components/HighscoreTable";
import Header from "@/components/Header";

export default {
  components: {HighscoreTable, Header},
  data() {
    return {}
  },
  mounted() {
  },
  methods: {}
}
</script>

