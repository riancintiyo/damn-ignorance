<script setup>
// @ts-ignore
import { RouterLink, RouterView } from 'vue-router'
import DamnIgnoranceLogo from './components/icons/DamnIgnorance.vue'
import PrimaryButton from './components/PrimaryButton.vue'
import HamburgerMenu from './components/icons/HamburgerMenu.vue'
import { useScrollToSection } from '@/views/composables/routerto.js'

const { scrollToSection } = useScrollToSection()
</script>

<template>
    <header
        class="px-1 py-4 md:px-6 md:py-4 sticky top-0 z-40 w-full backdrop-blur bg-di-black transition-colors duration-500"
    >
        <div class="flex justify-between items-center space-x-2">
            <div class="logo">
                <DamnIgnoranceLogo />
            </div>
            <nav class="md:flex items-center space-x-4 justify-center hidden">
                <a
                    @click.prevent="scrollToSection('home')"
                    class="font-jakarta text-di-small-desc"
                    >Home</a
                >
                <a
                    @click.prevent="scrollToSection('about')"
                    class="font-jakarta text-di-small-desc"
                    >About Us</a
                >
                <a
                    @click.prevent="scrollToSection('solution')"
                    class="font-jakarta text-di-small-desc"
                    >Our Approach</a
                >
            </nav>
            <div class="hidden md:flex space-x-6 font-jakarta items-center">
                <a
                    @click.prevent="scrollToSection('join')"
                    class="font-jakarta text-di-small-desc"
                    ><PrimaryButton
                        msg="Join Us"
                        :color="`bg-di-red`"
                        :icon="false"
                    >
                    </PrimaryButton
                ></a>
            </div>
            <div class="mt-1 p-2 cursor-pointer hover:bg-di-gray md:hidden">
                <HamburgerMenu />
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
    color: #fff;
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
