<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <router-link to="/login">登陆</router-link>
        </span>
      </h3>
      <el-form :model="ValidateForm" :rules="rules" ref="ValidateForm" label-width="80px" class="demo-ruleForm">

        <!-- 手机号 -->
        <el-form-item label="手机号" prop="phone">
          <el-input v-model.number="ValidateForm.phone" autocomplete="off" style="width:250px"></el-input>
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item label="验证码" prop="code" :rules="[
          { required: true, message: '验证码不能为空' },
        ]">
          <el-input v-model.number="ValidateForm.code" autocomplete="off" style="width:100px"></el-input>
          <button style="height:40px;width: 80px;margin-left: 5px;" @click="getCode(ValidateForm.phone)">获取验证码</button>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ValidateForm.password" autocomplete="off" style="width:350px"></el-input>
        </el-form-item>

        <!-- 确认密码 -->
        <el-form-item label="确认密码" prop="confirmPsd">
          <el-input type="password" v-model="ValidateForm.confirmPsd" autocomplete="off" style="width:350px"></el-input>
        </el-form-item>

        <!-- 同意用户协议 -->
        <el-form-item prop="type" style="margin-left:30px" :rules="[
          { required: true, message: '请阅读并同意用户协议' }
        ]">
          <el-checkbox label="同意协议并注册《尚品汇用户协议》" v-model="ValidateForm.agree"></el-checkbox>
        </el-form-item>
      </el-form>

      <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      //收集表单数据
      ValidateForm: {
        phone: '',
        code: ' ',
        password: '',
        confirmPsd: '',
        agree: true
      },
      //表单规则
      rules: {
        phone: [
          { required: true, message: '手机号不能为空' },
          { type: 'number', message: '手机号必须为数字值' },
        ]
      }
    }
  },
  methods: {
    //获取验证码
    getCode(phone) {
      if (phone) {
        this.$store.dispatch('user/getCode', phone)
        this.ValidateForm.code = this.$store.state.user.code
      } else {
        alert('手机号不能为空')
      }
    },
    //用户注册
    async userRegister() {
      try {
        if (!this.ValidateForm.phone) {
          alert('手机号不能为空')
        } else if (!this.ValidateForm.code) {
          alert('验证码不能为空')
        } else if (this.ValidateForm.password != this.ValidateForm.confirmPsd) {
          alert('两次输入密码不一致')
        } else {
          await this.$store.dispatch('user/userRegister', { phone: this.ValidateForm.phone, code: this.ValidateForm.code, password: this.ValidateForm.password })
          this.$router.push('/login')
        }
      } catch (err) {
        alert('信息没有填写完整')
      }

    }
  }
}
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }


    .el-form {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;
      margin-top: 30px;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        margin-left: 200px;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
        cursor: pointer;

        &:hover {
          background: #c04037;
        }
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>