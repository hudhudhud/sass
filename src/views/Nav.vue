<template>
    <section>
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/sass">Sass</router-link>|
            <router-link to="/about">About</router-link>
        </div>
        <keep-alive v-if='$route.meta.keepAlive'>
            <router-view />
        </keep-alive>
        <router-view  v-else/>
    </section>
</template>
<script>
export default {
    
}
</script>