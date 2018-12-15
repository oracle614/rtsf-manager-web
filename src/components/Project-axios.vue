
<template>
    <div>
        <div>
            <table border="1">
                <tr>
                    <th></th>
                    <th>项目名称</th>
                    <th>项目模块</th>
                    <th>备注</th>
                    <th>创建时间</th>
                    <th>更新时间</th>
                </tr>
                <tr v-for="(res, index) in search_result" :key="res.id">
                    <td v-text="index"></td>
                    <td v-text="res.name"></td>
                    <td v-text="res.module"></td>
                    <td v-text="res.comment"></td>
                    <td v-text="res.c_time"></td>
                    <td v-text="res.u_time"></td>
                </tr>
            </table>
        </div>

        <h1>更新/新增待测试项目</h1>
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

            <input @click="proj_update" id="submit" name="submit" type="button" value="提交">
            <input @click="proj_search" id="search" name="search" type="button" value="查询">
        </form>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'Project',
        data: function () {
            return {
                proj_url: "http://127.0.0.1:5000/project/",
                project: {},
                search_result: []
            }
        },
        methods: {
            proj_update: function() {
                axios({
                    method:"post",
                    url:this.proj_url,
                    data:this.project,
                    headers:{}
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            proj_search: function() {
                var _this = this
                axios({
                    method:"get",
                    url:this.proj_url
                })
                .then(function (response) {
                    console.log(response.data);
                    console.log(response.status);
                    console.log(response.statusText);
                    console.log(response.headers);
                    console.log(response.config);
                    _this.search_result=response.data.result
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        }
    }
</script>
