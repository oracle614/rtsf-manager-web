<template lang="html">
  <div>

    <el-menu mode="horizontal" :router="true" :defaultActive="initPath">
      <el-menu-item index="1" route="/project">测试项目管理</el-menu-item>
      <el-menu-item index="2" route="/case">测试用例管理</el-menu-item>
      <el-menu-item index="/about" :disabled="true">关于</el-menu-item>
      <el-button @click="logout()" type="text" :disabled="false">登出</el-button>
    </el-menu>
  </div>
</template>

<script>
  import { req_logout } from '@/api/api';
  export default {
    name: "NavMenu",
    data () {
      return {
        initPath: "/pjut"
      }
    },
    methods: {
      logout(formName) {
        req_logout()
        .then(data => {this.$router.push({ path: '/login' });})
        .catch(error => {this.$router.push({ path: '/login' });})
      }
    }
  }
</script>
