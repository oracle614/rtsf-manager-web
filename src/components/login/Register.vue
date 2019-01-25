<template lang="html">
  <div>
    <el-form label-width="80px" :model="register" :rules="rule" ref="register_form">
      <el-form-item label="用户名称" prop="username">
        <el-input v-model="register.username"/>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="register.email"/>
      </el-form-item>
      <el-form-item label="身份证" prop='identity_id'>
        <el-input v-model="register.identity_id"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="register.password"/>
      </el-form-item>
      <el-form-item label="确认密码" prop="password_confirm">
        <el-input type="password" v-model="register.password_confirm"/>
      </el-form-item>
      <el-form-item label="备注" prop="about_me">
        <el-input v-model="register.about_me"/>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="cancelForm('register_form')">取 消</el-button>
      <el-button type="primary" @click="submitForm('register_form')">确 定</el-button>
    </div>
  </div>
</template>

<script>
  import { add_user } from '@/api/api';
  export default {
    name: 'Rigister',
    data() {
      var validatePass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('输入不可以为空'));
        } else if (value !== this.register.password) {
          console.log(value)
          console.log(this.register.password)
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        register: {
          username: '',
          email: '',
          identity_id: "",
          password: "",
          password_confirm: "",
          about_me: ""
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
          email:[
              {
                  required: true,
                  message: '请输入邮箱地址',
                  trigger: 'blur'
              },
              {
                  pattern: /[\w]+@[\w\.]+/,
                  message: '非法邮箱格式'
              }
          ],
          identity_id:[
              {
                  required: true,
                  message: '请输入身份证号码',
                  trigger: 'blur'
              },
              {
                  pattern: /[\d]{18}|[\d]{17}x/,
                  message: '非法身份证'
              },
              {
                  len: 18,
                  message: '请输入18位的身份证'
              },
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
          ],
          password_confirm: [
              {
                  required: true,
                  message: '请输入密码',
                  trigger: 'blur'
              },
              {
                  validator: validatePass,
                  trigger: 'blur'
              }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            add_user(this.register)
            .then(data => {
              if (data.status !== true) {
                this.$message({
                  message: data.message,
                  type: 'error'
                });
              } else {
                this.$router.push({ path: '/index' });
                this.$message({
                  message: data.message,
                  type: 'success'
                });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      cancelForm(formName) {
        this.$router.push({ path: '/index' });
      }
    }
  }
</script>
