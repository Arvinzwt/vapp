<template>
    <el-container>
        <el-aside>
            <div>侧边</div>
        </el-aside>
        <el-container>
            <el-header>头</el-header>
            <el-main>
                <nuxt/>
            </el-main>
            <el-footer>尾</el-footer>
        </el-container>
    </el-container>
</template>

<style lang="scss">
.el-container {
    height: 100vh;

    .el-aside {
        min-height: 100vh;
        border: 1px solid red;
    }

    .el-container {
        min-height: 100vh;
        border: 1px solid red;

        .el-header {
            border-bottom: 1px solid red;
        }

        .el-main {
            background: #f7f8fb;
        }

        .el-footer {
            border-top: 1px solid red;
        }
    }
}
</style>
