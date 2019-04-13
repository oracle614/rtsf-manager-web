
<template>
    <div>
      <Pagination :total="total" @get_total="get_projects">
        <div slot="table">
          <el-button size="mini" @click="form_handler" >添加项目</el-button>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" :index="indexMethod"/>
            <el-table-column prop="name" label="项目名称"/>
            <el-table-column prop="module" label="项目模块"/>
            <el-table-column prop="comment" label="备注"/>
            <el-table-column prop="c_time" label="创建时间"/>
            <el-table-column prop="u_time" label="更新时间"/>
            <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="form_handler(scope.$index, scope.row)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="delete_project(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
          </el-table>
        </div>
      </Pagination>

        <el-dialog :title="dialog_config.title" :visible.sync="dialog_config.edit_dialog_form_visible">
          <section class="form-section">
            <el-form :label-position="dialog_config.label_position" label-width="80px" :model="project" :rules="rule" ref="project_form">
              <el-form-item label="项目名称" prop="name">
                <el-input v-model="project.name"/>
              </el-form-item>
              <el-form-item label="待测模块" prop="module">
                <el-input v-model="project.module"/>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="project.comment"/>
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
  import {create_project, update_project, del_project, get_project_list_page} from '@/api/api';
  import Pagination from "@/components/common/Pagination.vue"
  export default {
      name: 'Project',
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
            project: {},
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
        this.get_projects()
    },
    methods: {

        indexMethod(index) {
          return index + 1;
        },

        form_handler: function(index, row){
            // console.log(index, row, JSON.parse(JSON.stringify(row)));
            this.dialog_config.edit_dialog_form_visible = true;
            if(typeof(row)=="undefined") {
              this.dialog_config.title = "添加项目"
              this.project = {};
            } else {
              this.dialog_config.title = "编辑项目"
              this.project=JSON.parse(JSON.stringify(row));
            }
        },

        submit_form: function() {
          this.$refs['project_form'].validate((valid) => {
            if (valid) {
              if(typeof(this.project.id) == "undefined") {
                var resp = create_project(this.project)
              }else {
                var resp = update_project(this.project)
              }

              resp.then(resp => {
                if (resp.data.status !== true) {
                  this.$message({message: resp.message,type: 'error'});
                } else {
                  this.dialog_config.edit_dialog_form_visible=false;
                  this.get_projects()
                }
              })
              .catch(error => console.log(error))
            } else {
              console.log('error submit!!');
              return false;
            }
          })
        },

        delete_project: function(index, row) {
            // console.log(index, row);
            del_project(row)
            .then(resp => this.get_projects())
            .catch(error => console.log(error))
        },

        get_projects: function(params) {
            get_project_list_page(params)
            .then(resp => {
              this.total = resp.data.result.total
              this.tableData = resp.data.result.projects
              // console.log(this.tableData.length)
              // console.log(Object.keys(this.tableData[100]))
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
