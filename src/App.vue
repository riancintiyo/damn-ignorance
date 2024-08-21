<script setup>
// @ts-ignore
import { RouterLink, RouterView } from 'vue-router'
import DamnIgnoranceLogo from './components/icons/DamnIgnorance.vue'
import PrimaryButton from './components/PrimaryButton.vue'
</script>

<template>
    <header
        class="px-6 py-4 sticky top-0 z-40 w-full backdrop-blur bg-di-black transition-colors duration-500"
    >
        <div class="flex justify-between space-x-2">
            <div class="logo">
                <DamnIgnoranceLogo />
            </div>
            <nav class="flex items-center space-x-4 justify-center">
                <RouterLink to="/" class="font-jakarta text-di-small-desc"
                    >Home</RouterLink
                >
                <RouterLink to="/about" class="font-jakarta text-di-small-desc"
                    >About</RouterLink
                >
            </nav>
            <div class="flex space-x-6 font-jakarta items-center">
                <div class="text-di-small-desc text-di-white-read">FAQ</div>
                <PrimaryButton msg="Join Us" :color="`bg-di-red`" :icon="false">
                </PrimaryButton>
            </div>
        </div>
    </header>

    <RouterView />
</template>

<style scoped>
header {
    line-height: 1.5;
    max-height: 100vh;
}

.logo {
    display: block;
    /* margin: 0 auto 2rem; */
}

nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    /* margin-top: 2rem; */
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    /* border-left: 1px solid var(--color-border); */
}

nav a:first-of-type {
    border: 0;
}

@media sreen and (min-width: 1024px) {
    nav {
        text-align: left;
        /* margin-left: -1rem; */
        font-size: 1rem;

        /* padding: 1rem 0; */
        /* margin-top: 1rem; */
    }
}
</style>
