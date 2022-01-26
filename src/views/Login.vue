<template>
  <body class="body-bg2 min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0" style="font-family:'Lato',sans-serif;">
  <Header />
  <LoginForm />
  </body>
</template>

<script>

import LoginForm from "@/components/LoginForm";
import Header from "@/components/Header";

export default {
  components: {LoginForm, Header},
  data() {
    return {}
  }
}
</script>

