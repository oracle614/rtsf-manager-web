<template lang="html">
  <div>
    <el-menu mode="horizontal"
             :router="true"
             :defaultActive="initPath"
             >
      <el-menu-item index="/login">注册/登录</el-menu-item>
      <el-menu-item index="/project">测试项目管理</el-menu-item>
      <el-menu-item index="/menu_a">menu_a</el-menu-item>
      <el-menu-item index="/about" :disabled="true">关于</el-menu-item>
    </el-menu>

  </div>
</template>

<script>
export default {
  name: "NavMenu",
  data () {
    return {
      initPath: "/pjut"
    }
  }
}
</script>
