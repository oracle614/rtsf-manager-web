
<template>
    <div>
        <div>
          <el-button size="mini" @click="form_handler">添加项目</el-button>
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

        <el-dialog :title="dialog_config.title" :visible.sync="dialog_config.edit_dialog_form_visible">
          <el-form :label-position="dialog_config.label_position" label-width="80px" :model="project">
            <el-form-item label="项目名称">
              <el-input v-model="project.name"/>
            </el-form-item>
            <el-form-item label="待测模块">
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
    export default {
        name: 'Project',
        data: function () {
            return {
                proj_url: "http://127.0.0.1:5000/project/manager",
                dialog_config: {
                  title: "",
                  label_position: "right",
                  edit_dialog_form_visible: false,
                },
                project: {},
                tableData: []
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
                var _this = this
                this.dialog_config.edit_dialog_form_visible=false;
                if(typeof(this.project.id) == "undefined") {
                  // create_project
                  var resp =this.$axios.post(this.proj_url, this.project)
                }else {
                  // update_project
                  var resp = this.$axios.put(this.proj_url + "?proj_id=" + this.project.id, this.project)
                }
                resp.then(function (response) {
                  // console.log(response);
                  _this.get_projects();
                })
                .catch(function (error) {
                    console.log(error);
                });
            },

            delete_project: function(index, row) {
                // console.log(index, row);
                var _this = this
                this.$axios.delete(this.proj_url + "?proj_id=" + row.id)
                .then(function(response) {
                  _this.get_projects();
                })
                .catch(function (error) {
                    console.log(error);
                });
            },

            get_projects: function() {
                var _this = this
                this.$axios.get(this.proj_url)
                .then(function (response) {
                    // console.log(response.data);
                    // console.log(response.status);
                    // console.log(response.statusText);
                    // console.log(response.headers);
                    // console.log(response.config);
                    _this.tableData=response.data.result
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            get_project: function() {
                var _this = this
                this.$axios.get(this.proj_url + "?proj_id=" + row.id)
                .then(function (response) {
                    // console.log(response.data);
                    // console.log(response.status);
                    // console.log(response.statusText);
                    // console.log(response.headers);
                    // console.log(response.config);
                    _this.tableData=response.data.result
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        }
    }
</script>
