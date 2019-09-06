<template>
    <section>
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/sass">Sass</router-link>|
            <router-link to="/about">About</router-link>
        </div>
        <router-view/>
    </section>
</template>
<script>
export default {
    
}
</script>