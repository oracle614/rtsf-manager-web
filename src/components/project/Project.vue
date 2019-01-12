
<template>
    <div>
        <div>
          <el-button size="mini" @click="form_handler" >添加项目</el-button>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" :index="indexMethod" width="180"/>
            <el-table-column prop="name" label="项目名称" width="180"/>
            <el-table-column prop="module" label="项目模块" width="180"/>
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
        <div style="width: 100%">
          <el-pagination layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="[10, 20, 30]"
            :page-size="pagesize"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            style="float:left;">
          </el-pagination>
        </div>

        <el-dialog :title="dialog_config.title" :visible.sync="dialog_config.edit_dialog_form_visible">
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
          </el-form>
          <div slot="footer">
            <el-button @click="dialog_config.edit_dialog_form_visible=false">取 消</el-button>
            <el-button type="primary" @click="submit_form">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
  import {create_project, update_project, del_project, get_project_list_page} from '@/api/api';
  export default {
      name: 'Project',
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
              pagesize: 10,
              currpage: 1,
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
                  if (resp.status !== true) {
                    this.$message({
                      message: resp.message,
                      type: 'error'
                    });
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
              })
              .catch(error => console.log(error))
          },
          handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.pagesize = val;
            var param = {"page": this.currpage, "size": val}
            this.get_projects(param)
          },
          handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.currpage = val;
            var param = {"page": val, "size": this.pagesize}
            this.get_projects(param)
          }
      }
  }
</script>
