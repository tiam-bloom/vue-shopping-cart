<template>
    <transition name="fade-transform" mode="out-in">
        <keep-alive>
            <router-view :key="$route.name" />
        </keep-alive>
    </transition>
</template>
  
<script>
export default {
    name: 'Main',

}
</script>
  
<style scoped></style>
  