<template>
    <div class="login-container" vv-if="loginForm">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

            <div class="title-container">
                <!-- <h3 class="title">login Form</h3> -->
            </div>

            <el-form-item prop="username">
                <el-input 
                    ref="username"
                    v-model="loginForm.username"
                    placeholder="Username"
                    name="username"
                    type="text"
                    tabindex="1"
                    autocomplete="on"
                    ></el-input>
            </el-form-item>

            <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
                <!-- manual 没有设置这个属性时 mouseleave事件也会触发提示 -->
                <el-form-item prop="password">
                    <el-input
                        ref="password"
                        v-model="loginForm.password"
                        :type="passwordType"
                        placeholder="Password"
                        name="password"
                        tabindex="2"
                        autocomplete="on"
                        @keyup.native="checkCapslock"
                        @blur="capsTooltip = false"
                        @keyup.enter.native="handleLogin"
                    />
                </el-form-item>
            </el-tooltip>

            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>
        </el-form>
    </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
export default {
    data () {
        const validateUsername = (rule, value, callback) => {
            if (!validUsername(value)) {
                callback(new Error('Please enter the correct user name'))
            } else {
                callback()
            }
        }
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('The password can not be less than 6 digits'))
            } else {
                callback()
            }
        }
        return {
            loginForm: {
                username: 'admin',
                password: '111111'
            },
            loginRules: {
                username: [{required: true, trigger: 'blur', validator: validateUsername}],
                password: [{required: true, trigger: 'blur', validator: validatePassword}]
            },
            capsTooltip: false,
            passwordType: 'password',
            loading: false
        }
    },
    methods: {
        checkCapslock (e) {
            const { key } = e
            this.capsTooltip = key && key.length===1 && (key>='A' && key<='Z')
        },
        // showPwd () {

        // },

        /**
         * login click => vuex dispatch => api login(prams, success set token) => axios request
         * **/
        handleLogin () {
          let that = this
            this.$refs.loginForm.validate((valid, errObj) => {
                console.log('validate => errObj',errObj)
                if (valid) {
                    this.loading = true
                    this.$store.dispatch('login', this.loginForm)
                        .then(res => {
                            this.loading = false
                            that.$router.push({ path: '/'})
                            console.log(res)
                        })
                        .catch(err => {
                            this.loading = false
                            console.log('登陆报错',err)
                        })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
//   background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
