<template>
    <div class="aside">
        <el-row class="tac">
            <el-col>
                <!-- https://blog.csdn.net/qq_40197100/article/details/111587781 -->
                <el-menu :default-active="$router.path" router class="el-menu-vertical-demo" @open="handleOpen"
                    @close="handleClose">

                    <el-menu-item v-for="route of $router.options.routes[0].children" :index="route.path">
                        <i :class="route.meta.icon"></i>
                        <span slot="title">{{route.meta.title}}</span>
                    </el-menu-item>

                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>
  
<script>

export default {
    name: 'Aside',
    created() {
        console.log(this.$router.options.routes[0].children)
    },
    data() {
        return {
            
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }

}
</script>
  
<style scoped></style>
  