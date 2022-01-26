<template>
  <body class="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0" style="font-family:'Lato',sans-serif;">
  <Header />
  <RegistrationForm />
  </body>
</template>

<script>
import Header from "@/components/Header";
import RegistrationForm from "@/components/RegistrationForm";

export default {
  components: {RegistrationForm, Header},
}
</script>

