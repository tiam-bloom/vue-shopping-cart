<template>
    <div class="home">
        <el-descriptions class="margin-top" title="个人中心" :column="1">
            <el-descriptions-item label="用户名">
                <span v-if="username">{{ username }}</span>
                <span v-else>未登录, 请先 <router-link to="/login">登录</router-link> </span>
            </el-descriptions-item>
            <template v-if="username">
                <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
                <el-descriptions-item label="居住地" :span="2">苏州市</el-descriptions-item>
                <el-descriptions-item label="备注">
                    <el-tag size="small">学校</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
                <el-descriptions-item label="操作">
                    <el-link @click.native.prevent="logout" type="info">退出登录</el-link>
                </el-descriptions-item>
            </template>
        </el-descriptions>
    </div>
</template>
  
<script>
export default {
    name: 'Home',
    data() {
        return {
            username: sessionStorage.getItem('token')
        }
    },
    methods: {
        logout() {
            sessionStorage.removeItem('token');
            this.$message.success('退出成功');
            // 重新加载组件
            this.$router.go(0);
        }
    }

}
</script>
  
<style scoped></style>
  