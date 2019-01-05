<template lang="html">
  <div>
    <el-menu mode="horizontal"
             :router="true"
             :defaultActive="initPath"
             >
      <!-- <el-menu-item index="/login">注册/登录</el-menu-item> -->
      <el-menu-item index="/project">测试项目管理</el-menu-item>
      <el-menu-item index="/menu_a">menu_a</el-menu-item>
      <el-menu-item index="/about" :disabled="true">关于</el-menu-item>
      <div>
        <el-button @click="logout()" type="text" :disabled="false">登出</el-button>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "NavMenu",
  data () {
    return {
      auth_url: "http://127.0.0.1:5000/auth",
      initPath: "/pjut"
    }
  },
  methods: {
    logout(formName) {
      var _this = this
      this.$axios.get(this.auth_url + "/logout")
      .then(function(response) {        
        _this.$router.go(0)
      })
      .catch(function (error) {
          console.log(error);
      });
    }
  }
}
</script>
