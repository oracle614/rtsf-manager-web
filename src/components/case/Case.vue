
<template>
    <div>
        <Pagination :total="total" @get_total="ui_get_cases">
          <div slot="table">
            <el-button size="mini" @click="form_handler" >添加用例</el-button>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column type="index" :index="indexMethod" width="180"/>
              <el-table-column prop="project_name" label="隶属项目" width="180"/>
              <el-table-column prop="project_module" label="隶属模块" width="180"/>
              <el-table-column prop="name" label="名称"/>
              <el-table-column prop="desc" label="描述"/>
              <el-table-column prop="case_type" label="类型"/>
              <el-table-column prop="func" label="别名"/>
              <el-table-column prop="responsible" label="责任人"/>
              <el-table-column prop="tester" label="执行人"/>

              <el-table-column prop="c_time" label="创建时间"/>
              <el-table-column prop="u_time" label="更新时间"/>
              <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="form_handler(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="ui_delete_case(scope.$index, scope.row)">删除</el-button>
                  </template>
              </el-table-column>
            </el-table>
          </div>
        </Pagination>


        <el-dialog :title="dialog_config.title" :visible.sync="dialog_config.edit_dialog_form_visible">
          <section class="form-section">
            <el-form :label-position="dialog_config.label_position" label-width="80px" :model="case_data" :rules="rule" ref="case_form">
              <el-form-item label="隶属项目" prop="proj_name">
                <el-input v-model="case_data.project_name"/>
              </el-form-item>
              <el-form-item label="隶属模块" prop="proj_module">
                <el-input v-model="case_data.project_module"/>
              </el-form-item>
              <el-form-item label="用例名称" prop="case_name">
                <el-input v-model="case_data.name"/>
              </el-form-item>
              <el-form-item label="用例描述" prop="case_desc">
                <el-input v-model="case_data.desc"/>
              </el-form-item>
              <el-form-item label="用例类型" prop="case_type">
                <el-input v-model="case_data.case_type"/>
              </el-form-item>
              <el-form-item v-if="case_data.case_type ==='api' || case_data.case_type === 'suite'" label="用例别名" prop="case_func">
                <el-input v-model="case_data.func"/>
              </el-form-item>
              <el-form-item label="责任人" prop="case_responsible">
                <el-input v-model="case_data.responsible"/>
              </el-form-item>
              <el-form-item label="执行人" prop="case_tester">
                <el-input v-model="case_data.tester"/>
              </el-form-item>

              <el-form-item>
                <el-button @click="dialog_config.edit_dialog_form_visible=false">取 消</el-button>
                <el-button type="primary" @click="submit_form">确 定</el-button>
              </el-form-item>
            </el-form>
          </section>
        </el-dialog>
    </div>
</template>

<script>
  import {get_case, add_case, update_case, del_case} from '@/api/api';
  import Pagination from "@/components/common/Pagination.vue"
  export default {
      name: 'Case',
      components: {
        Pagination,
      },
      data: function () {
          return {
              dialog_config: {
                title: "",
                label_position: "right",
                edit_dialog_form_visible: false,
              },
              case_data: {},
              tableData: [],
              total: 0,
              rule: {
                name:[
                    {
                        required: true,
                        message: '请输入待测项目',
                        trigger: 'blur'
                    },
                    {
                        pattern: /[\u4E00-\u9FA5\w]+/,
                        message: '用户名只能为中文、字母、数字、下划线'
                    }
                ],
                module:[
                    {
                        required: true,
                        message: '请输入待测模块',
                        trigger: 'blur'
                    },
                    {
                        pattern: /[\u4E00-\u9FA5\w]+/,
                        message: '用户名只能为中文、字母、数字、下划线'
                    }
                ]
              }
          }
      },
      mounted: function() {
          this.ui_get_cases()
      },
      methods: {

          indexMethod(index) {
            return index + 1;
          },

          form_handler: function(index, row){
              // console.log(index, row, JSON.parse(JSON.stringify(row)));
              this.dialog_config.edit_dialog_form_visible = true;
              if(typeof(row)=="undefined") {
                this.dialog_config.title = "添加用例"
                this.case_data = {};
              } else {
                this.dialog_config.title = "编辑用例"
                this.case_data=JSON.parse(JSON.stringify(row));
              }
          },

          submit_form: function() {
            this.$refs['case_form'].validate((valid) => {
              if (valid) {
                if(typeof(this.case_data.id) == "undefined") {
                  var resp = add_case(this.case_data)
                }else {
                  var resp = update_case(this.case_data)
                }

                resp.then(resp => {
                  console.log(resp)
                  console.log(resp.data)
                  if (resp.status !== true) {
                    this.$message({message: resp.message,type: 'error'});
                  } else {
                    this.dialog_config.edit_dialog_form_visible=false;
                    this.ui_get_cases()
                  }
                })
                .catch(error => console.log(error))
              } else {
                console.log('error submit!!');
                return false;
              }
            })
          },

          ui_delete_case: function(index, row) {
              // console.log(index, row);
              del_case(row)
              .then(resp => this.ui_get_cases())
              .catch(error => console.log(error))
          },

          ui_get_cases: function(params) {
              get_case(params)
              .then(resp => {
                this.total = resp.data.result.total
                this.tableData = resp.data.result.cases
              })
              .catch(error => console.log(error))
          },
      }
  }
</script>

<style>
  .form-section {
    padding: 10px;
    width: 500px;
  }
</style>
