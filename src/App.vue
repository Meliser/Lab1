<template>
  <div id="app">
    <ProfileInformation/>
  </div>
</template>

<script>
import ProfileInformation from './components/ProfileInformation.vue';

export default {
  name: 'App',
  components: {
    ProfileInformation,
  },
};
</script>

<style>
  @import url('./assets/css/main.css');

  #app {
    background-color: #DCD0C0;
  }
</style>
