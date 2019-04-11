<template>
  <div>
    <el-card class="box-card">

      <div slot="header" class="clearfix">
        <el-steps :active="active" finish-status="success">
          <el-step title="选择项目"></el-step>
          <el-step title="用例"></el-step>
          <el-step title="添加请求"></el-step>
        </el-steps>
      </div>

      <div v-if="active===0">
        <section class="form-section">
          <el-form label-width="80px" :model="project" ref="project_form">
            <el-form-item label="project" prop="name">
              <el-input v-model="project.name"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="next">下一步</el-button>
            </el-form-item>
          </el-form>
        </section>
      </div>

      <div v-else-if="active === 1">
        <section class="form-section">
          <el-form label-width="80px" :model="ccase" ref="case_form">
            <el-form-item label="ccase" prop="name">
              <el-input v-model="ccase.name"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="next">下一步</el-button>
            </el-form-item>
          </el-form>
        </section>
      </div>

      <div v-else>
        <section class="form-section">
          <el-form label-width="80px" :model="case_requests" ref="case_requests_form">
            <el-form-item label="case_requests" prop="name">
              <el-input v-model="case_requests.name"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="next">确认</el-button>
            </el-form-item>
          </el-form>
        </section>
      </div>
    </el-card>
  </div>
</template>


<script type="text/javascript">
  export default {
    data() {
        return {
          active: 0,
          tmpdata: [{}],
          project: {},
          ccase: {},
          case_requests: {},
        };
      },

    methods: {
      next() {
        if (this.active == 0) {console.log("step 1 done");this.p0_css = "hidden"; this.p1_css = "visible"; this.p2_css = "hidden";}
        if (this.active == 1) {console.log("step 2 done");this.p0_css = "hidden"; this.p1_css = "hidden"; this.p2_css = "visible";}
        if (this.active == 2) {console.log("step 3 done");}
        if (this.active++ > 2) {console.log("steps already done. reset");this.active = 0; this.p0_css = "visible"; this.p1_css = "hidden"; this.p2_css = "hidden";}
      }
    }
  }
</script>


<style>
  .box-card {
    width: 480px;
  }
  .form-section {
    padding: 10px;
  }
</style>
