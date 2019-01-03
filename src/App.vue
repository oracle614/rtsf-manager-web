<template>
  <div id="app">
    <div v-if='is_login()'>
        <index/>
    </div>
    <div v-else>
      <Login/>
    </div>
  </div>
</template>

<script>
import index from "@/components/index.vue"
import Login from '@/components/login/Login.vue'

export default {
  name: 'App',
  components: {
    index,
    Login
  },
  methods: {
    is_login() {
      let token = $cookies.get('token')
      if (token) {
        return true
      } else {
        return false
      }
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
