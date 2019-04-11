<template lang="html">
  <div>
    <slot name="table"></slot>
    
    <el-pagination layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 20, 30]"
      :page-size="pagesize"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="float:left;">
    </el-pagination>
  </div>
</template>

<script type="text/javascript">

  export default {
    data: function() {
      return {
        pagesize: 10,
        currpage: 1,
      }
    },
    props: ["total"],
    methods: {
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pagesize = val;
        var param = {"page": this.currpage, "size": val}
        this.$emit("get_total", param)
      },
      handleCurrentChange(val) {
        // console.log(`page: ${val}`);
        // console.log(`size: ${this.pagesize}`);
        this.currpage = val;
        var param = {"page": val, "size": this.pagesize}
        this.$emit("get_total", param)
      }
    }
  }
</script>
