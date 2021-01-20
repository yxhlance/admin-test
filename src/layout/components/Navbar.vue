<template>
    <div class="navbar">
        <!-- <hamburger></hamburger> -->
        <!-- <breadcrumb></breadcrumb> -->

        <div class="right-menu">
            <!-- <template>

            </template> -->

            <el-dropdown class="avatar-container right-menu-item hover-effect">
                <div class="avatar-wrapper">
                    <img src="" alt="" class="user-avatar" />
                    <i class="el-icon-caret-bottom"></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <router-link to="/profile/index">
                        <el-dropdown-item>Profile</el-dropdown-item>
                    </router-link>
                    <router-link to="/">
                        <el-dropdown-item>Dashboard</el-dropdown-item>
                    </router-link>
                    
                    <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
                        <el-dropdown-item>Github</el-dropdown-item>
                    </a>
                    <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
                        <el-dropdown-item>Docs</el-dropdown-item>
                    </a>
                    
                    <el-dropdown-item divided @click.native="logout">
                        <span style="display:block;">Log Out</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
    data () {
        return {

        }
    },
    computed: {
        ...mapGetters([
            'sidebar',
            'avatar',
            'device'
        ])
    },
    methods: {
        toggleSideBar () {

        },
        async logout () {

        }
    }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>