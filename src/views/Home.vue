<template>
  <div class="home">
    <Header />
    <FAQ></FAQ>
  </div>
</template>

<script>

import Header from "@/components/Header";
import FAQ from "@/components/FAQ";

export default {
  name: 'Home',
  components: {
    FAQ,
    Header,
  },
  methods: {},
}


</script>
<style>

</style>
