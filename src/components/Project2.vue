   
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
                <input id="name" name="name" type="text" v-model="p_name" placeholder="project under test">
            </div>

            <div>
                <label>待测模块:</label>
                <input id="module" name="module" type="text" v-model="p_module" placeholder="module under test">  
            </div>

            <div>
                <label for="comment">备注:</label>
                <input id="comment" name="comment" type="text" v-model="p_comment" placeholder="It's a comment here">                
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
                p_name: "",
                p_module: "",
                p_comment: "",
                search_result: []
            }
        },
        methods: {
            proj_update: function() {                
                axios({
                    method:"post",
                    url:"http://127.0.0.1:5000/project/update",
                    data:{
                        "name": this.p_name,
                        "module": this.p_module,
                        "comment": this.p_comment                    
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
            proj_search: function() {
                var _this = this
                axios({
                    method:"get",
                    url:"http://127.0.0.1:5000/project/search"
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

