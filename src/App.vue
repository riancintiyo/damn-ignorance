<script setup>
// @ts-ignore
import { RouterView } from 'vue-router'
import DamnIgnoranceLogo from './components/icons/DamnIgnorance.vue'
import PrimaryButton from './components/PrimaryButton.vue'
import HamburgerMenu from './components/icons/HamburgerMenu.vue'
// import { useScrollToSection } from '@/views/composables/routerto.js'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
// const { scrollToSection } = useScrollToSection()

const router = useRouter()
const asideVisible = ref(false)

const toggleAsideMenu = () => {
    asideVisible.value = !asideVisible.value
    console.log('Show')
}

const scrollToSection = (sectionId) => {
    router.push({ path: '/', hash: `#${sectionId}` })
}

const scrollToSectionAside = (sectionId) => {
    scrollToSection(sectionId)
    asideVisible.value = false
}
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
            <div
                class="mt-1 p-2 cursor-pointer hover:bg-di-gray md:hidden"
                @click="toggleAsideMenu"
            >
                <HamburgerMenu />
            </div>
        </div>
    </header>
    <template v-if="asideVisible">
        <aside
            class="fixed top-0 left-0 w-full h-full bg-di-black bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out"
            :class="{ 'opacity-0': !asideVisible }"
        >
            <div
                class="aside-menu w-80 bg-di-black h-full p-4 absolute top-0 left-0 transition-transform duration-500 ease-in-out"
                :style="{
                    transform: `translateX(${asideVisible ? '0' : '-100%'})`
                }"
            >
                <div class="logo mb-4">
                    <DamnIgnoranceLogo />
                </div>
                <ul class="space-y-4">
                    <li
                        class="transition-transform duration-500 ease-in-out"
                        :style="{
                            transform: `translateX(${asideVisible ? '0' : '-100%'})`
                        }"
                    >
                        <a
                            @click.prevent="scrollToSectionAside('home')"
                            class="font-jakarta text-di-small-desc"
                            >Home</a
                        >
                    </li>
                    <li
                        class="transition-transform duration-500 ease-in-out"
                        :style="{
                            transform: `translateX(${asideVisible ? '0' : '-100%'})`
                        }"
                    >
                        <a
                            @click.prevent="scrollToSectionAside('about')"
                            class="font-jakarta text-di-small-desc"
                            >About Us</a
                        >
                    </li>
                    <li
                        class="transition-transform duration-500 ease-in-out"
                        :style="{
                            transform: `translateX(${asideVisible ? '0' : '-100%'})`
                        }"
                    >
                        <a
                            @click.prevent="scrollToSectionAside('solution')"
                            class="font-jakarta text-di-small-desc"
                            >Our Approach</a
                        >
                    </li>
                    <li
                        class="transition-transform duration-500 ease-in-out"
                        :style="{
                            transform: `translateX(${asideVisible ? '0' : '-100%'})`
                        }"
                    >
                        <a
                            @click.prevent="scrollToSectionAside('join')"
                            class="font-jakarta text-di-small-desc"
                            ><PrimaryButton
                                msg="Join Us"
                                :color="`bg-di-red`"
                                :icon="false"
                            ></PrimaryButton
                        ></a>
                    </li>
                </ul>
            </div>
        </aside>
    </template>

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
