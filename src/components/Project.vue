   
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
                <input id="name" name="name" type="text" v-model="project.p_name" placeholder="project under test">
            </div>

            <div>
                <label>待测模块:</label>
                <input id="module" name="module" type="text" v-model="project.p_module" placeholder="module under test">  
            </div>

            <div>
                <label for="comment">备注:</label>
                <input id="comment" name="comment" type="text" v-model="project.p_comment" placeholder="It's a comment here">                
            </div>

            <input @click="create_project" id="submit" name="submit" type="button" value="提交">
            <input @click="get_projects" id="search" name="search" type="button" value="查询">
        </form>
    </div>
</template>

<script>
    export default {
        name: 'Project',
        data: function () {
            return {
                proj_url: "http://127.0.0.1:5000/project",
                project: {
                    p_name: "",
                    p_module: "",
                    p_comment: ""
                },                
                search_result: []
            }
        },
        mounted: function() {
            this.get_projects()
        },
        methods: {
            create_project: function() {                
                this.$http({
                    method:"post",
                    url: this.proj_url,
                    data:{
                        "name": this.project.p_name,
                        "module": this.project.p_module,
                        "comment": this.project.p_comment                    
                    },
                    headers:{}
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            get_projects: function() {
                this.$http({
                    method:"get",
                    url: this.proj_url
                })
                .then(function (response) {
                    console.log(response.data);
                    console.log(response.status);
                    console.log(response.statusText);
                    console.log(response.headers);
                    console.log(response.config);
                    this.search_result=response.data.result
                })
                .catch(function (error) {
                    console.log(error);
                });                            
            }
        }
    }
</script>

