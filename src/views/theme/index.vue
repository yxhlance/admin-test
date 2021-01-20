<template>
    <div class="app-container">
        <el-card class="box-card">
            <div slot="header">
                <a class="link-type link-title" target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/guide/advanced/theme.html">
                Theme documentation
                </a>
            </div>
            <div class="box-item">
                <span class="field-label">Change Theme : </span>
                <el-switch v-model="theme" />
                <aside style="margin-top:15px;">
                Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.
                </aside>
            </div>
        </el-card>

        <div class="block">
            <el-button type="primary">
                Primary
            </el-button>
            <el-button type="success">
                Success
            </el-button>
            <el-button type="info">
                Info
            </el-button>
            <el-button type="warning">
                Warning
            </el-button>
            <el-button type="danger">
                Danger
            </el-button>
        </div>
    </div>
</template>

<style scoped>
.field-label{
  vertical-align: middle;
}
.box-card {
  width: 400px;
  max-width: 100%;
  margin: 20px auto;
}

.block {
  padding: 30px 24px;
}

.tag-item {
  margin-right: 15px;
}
</style>