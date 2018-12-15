
<template>
    <div>
        <div>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="项目名称" width="180"/>
            <el-table-column prop="module" label="项目模块" width="180"/>
            <el-table-column prop="comment" label="备注"/>
            <el-table-column prop="c_time" label="创建时间"/>
            <el-table-column prop="u_time" label="更新时间"/>
          </el-table>
        </div>

        <h1>新增待测试项目</h1>
        <form action="" method="post" class="form" role="form">
            <div>
                <label>项目名称:</label>
                <input id="name" name="name" type="text" v-model="project.name" placeholder="project under test">
            </div>

            <div>
                <label>待测模块:</label>
                <input id="module" name="module" type="text" v-model="project.module" placeholder="module under test">
            </div>

            <div>
                <label for="comment">备注:</label>
                <input id="comment" name="comment" type="text" v-model="project.comment" placeholder="It's a comment here">
            </div>
            <input @click="create_project" id="submit" name="submit" type="button" value="提交">
            <input @click="get_projects" id="search" name="search" type="button" value="查询">
            <input @click="delete_project" id="delete" name="search" type="button" value="删除">
            <input @click="edit_project" id="edit" name="edit" type="button" value="编辑">
        </form>

    </div>
</template>

<script>
    export default {
        name: 'Project',
        data: function () {
            return {
                proj_url: "http://127.0.0.1:5000/project/manager",
                project: {},
                tableData: []
            }
        },
        mounted: function() {
            this.get_projects()
        },
        methods: {
            create_project: function() {
                this.$axios.post(this.proj_url, this.project)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            delete_project: function() {
                this.$axios.delete(this.proj_url + "?proj_id=8")
                .catch(function (error) {
                    console.log(error);
                });
            },
            edit_project: function() {
                this.$axios.put(this.proj_url + "?proj_id=10", this.project)
                .then(function (response) {
                  console.log("update ok");
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
            }
        }
    }
</script>
