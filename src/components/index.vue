<template>
  <div>
    <el-container>
      <el-header>
        <NavMenu/>
      </el-header>

      <el-main>
        <router-view/>
      </el-main>

      <!-- <el-footer>
        年少不知愁滋味，爱登层楼；爱登层楼，为赋新词强说愁；<br/>
        如今识尽愁滋味，欲说还休；欲说还休，却道天凉好个秋。
      </el-footer> -->
    </el-container>
  </div>
</template>

<script>
import NavMenu from "@/components/navigate/NavMenu.vue"
export default {
  components: {
    NavMenu
  }
}
</script>

<style>

</style>
