<template>
    <el-container>
        <el-header>
            <Header />
        </el-header>
        <el-container>
            <el-aside width="200px">
                <Aside />
            </el-aside>
            <el-main>
                <Main />
            </el-main>
        </el-container>
        <el-backtop target=".el-main" :bottom="100">
            <div class="backup">
                UP
            </div>
        </el-backtop>
    </el-container>
</template>
  
<script>
import Header from '@/layout/Header.vue'
import Aside from '@/layout/Aside.vue'
import Main from '@/layout/Main.vue'

export default {
    name: 'Index',
    components: {
        Header,
        Aside,
        Main
    }

}
</script>
  
<style scoped>
.el-aside {
    overflow: hidden;
}

.el-header {
    padding: 0;
}

.el-main {
    height: calc(100vh - 60px);
    overflow-y: auto;
}

.backup {
    height: 100%;
    width: 100%;
    background-color: #f2f5f6;
    box-shadow: 0 0 6px rgba(0, 0, 0, .12);
    text-align: center;
    line-height: 40px;
    color: #1989fa;
}
</style>
  