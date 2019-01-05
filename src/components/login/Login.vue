<template lang="html">
  <div>
    <div>
      <el-form :model="login_form" :rules="rule" ref="login_form" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="login_form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="login_form.password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button type="primary" @click="submitForm('login_form')">提交</el-button>
      <el-button @click="resetForm('login_form')">重置</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        auth_url: "http://127.0.0.1:5000/auth",
        login_form: {
          username: '',
          password: '',
          remember: true
        },
        rule: {
          username:[
              {
                  required: true,
                  message: '请输入用户名',
                  trigger: 'blur'
              },
              {
                  min: 2,
                  max: 24,
                  message: '长度在 2 到 24 个字符'
              },
              {
                  pattern: /^[\u4E00-\u9FA5]+$/,
                  message: '用户名只能为中文'
              }
          ],
          password: [
              {
                  required: true,
                  message: '请输入密码',
                  trigger: 'blur'
              },
              {
                  min: 6,
                  max: 30,
                  message: '长度在 6 到 30 个字符'
              },
              {
                  pattern: /^(\w){6,20}$/,
                  message: '只能输入6-20个字母、数字、下划线'
              }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            var _this = this
            this.$axios.post(this.auth_url + "/login", this.login_form)
            .then(function (response) {
              // console.log(response.data)              
              _this.$router.go(0)
            })
            .catch(function (error) {
                console.log(error);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
    // watch: {
    //   '$route' (to, from) {
    //     this.$router.go(0);
    //   }
    // }
  }
</script>
