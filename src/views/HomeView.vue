<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
import { ArrowDownIcon } from '@heroicons/vue/24/solid'
import 'swiper/swiper-bundle.css'
import { register } from 'swiper/element/bundle'
import { descriptions } from './data/descriptions'
import ScaleIcon from '@/components/icons/ScaleIcon.vue'
import Man from '@/assets/man.svg'
import Woman from '@/assets/woman.svg'
import Dots from '@/assets/dot-stat.png'
import Maps from '@/assets/map-and-pin.png'

// // register Swiper custom elements
register()
</script>

<template>
    <section class="main mt-10 md:mt-20">
        <!-- <TheWelcome /> -->
        <div class="flex flex-col items-center">
            <h1
                class="text-center text-di-white-read text-di-title-mobile md:text-di-title font-noto"
            >
                Dam<span
                    class="text-di-red text-di-title-mobile md:text-di-title"
                    >n</span
                >
                Ignoranc<span
                    class="text-di-red text-di-title-mobile md:text-di-title"
                    >e</span
                >
            </h1>
            <p
                class="font-jakarta text-di-white-read text-di-desc px-2 md:px-0 md:w-[828px] text-center mt-4"
            >
                Indonesia's fintech industry is experiencing explosive growth,
                with outstanding loans reaching a staggering 60 trillion rupiah
                in 2024. This rapid expansion offers undeniable convenience, but
                it also casts a dark shadow. Predatory, illegal lenders exploit
                the same ease of access as legal platforms, operating with no
                oversight.
            </p>
            <div class="mt-6 hover:animate-bounce cursor-pointer">
                <div class="border rounded-full border-di-white-read p-2">
                    <ArrowDownIcon class="size-6 text-di-white-read" />
                </div>
            </div>
        </div>
        <div class="mt-8 md:mt-12">
            <h1
                class="text-di-white-read font-jakarta text-di-desc font-semibold p-4"
            >
                What They Said:
            </h1>
            <div class="mt-4 swiper-container">
                <swiper-container
                    :slidesPerView="1"
                    :breakpoints="{
                        '640': {
                            slidesPerView: 1,
                            spaceBetween: 20
                        },
                        '768': {
                            slidesPerView: 1,
                            spaceBetween: 20
                        },
                        '1024': {
                            slidesPerView: 2,
                            spaceBetween: 30
                        }
                    }"
                    :spaceBetween="30"
                    :centeredSlides="true"
                    :autoplay="{
                        delay: 4000,
                        disableOnInteraction: false
                    }"
                >
                    <template v-for="item in descriptions" :key="item.id">
                        <swiper-slide>
                            <div
                                class="bg-di-gray px-4 py-2 rounded-lg min-w-[200px] md:min-w-[560px]"
                            >
                                <p
                                    class="font-jakarta text-di-desc text-di-white-read"
                                >
                                    {{ item.text }}
                                </p>
                            </div>
                        </swiper-slide>
                    </template>
                </swiper-container>
            </div>
        </div>
    </section>
    <section class="mt-14 md:mt-8 px-2 md:px-4">
        <h1 class="font-noto text-di-sub-title text-di-white-read px-4">
            About Us
        </h1>
        <div
            class="grid grid-cols-1 md:grid-cols-2 mt-4 gap-6 p-4 items-center"
        >
            <div class="order-1 md:order-2 relative">
                <div
                    class="hidden md:inline-block absolute w-full h-full max-h-[420px] border border-1 border-white -z-10 -top-6 rounded-lg translate-x-6"
                ></div>
                <div
                    class="hidden md:inline-block absolute w-full h-full max-h-[400px] border border-1 border-white -z-50 -top-10 rounded-lg translate-x-10"
                ></div>
                <div
                    class="border-1 border border-white py-4 px-4 rounded-lg bg-di-black"
                >
                    <div
                        class="border-1 border-dashed border border-white px-2 py-2 rounded-lg flex flex-col flex-nowrap gap-6"
                    >
                        <div class="mt-1 flex items-center p-1">
                            <div
                                class="rounded-full border border-1 p-4 border-white w-12 h-12 flex items-center justify-center"
                            >
                                <div
                                    class="text-xs font-light font-jakarta text-white text-center"
                                >
                                    Why
                                </div>
                            </div>
                            <hr class="text-left w-full border-1 text-white" />
                            <div
                                class="text-white text-[10px] font-jakarta font-extralight text-nowrap ml-2"
                            >
                                They said it's not our responsibility
                            </div>
                        </div>
                        <div>
                            <ScaleIcon class="mx-auto" />
                        </div>
                        <div
                            class="text-jakarta font-extralight text-[10px] text-white ml-1 mb-2"
                        >
                            We said, it's act of apathy and ignorance
                        </div>
                    </div>
                </div>
            </div>
            <div class="order-2 md:order-1">
                <h2
                    class="font-jakarta text-di-paragraph text-di-white-read font-semibold mt-1 md:mt-2"
                >
                    Have you ever thought that the convenience of online loans
                    could turn into a nightmare?
                </h2>
                <p
                    class="font-jakarta text-di-paragraph text-di-white-read font-light mt-2 md:mt-4"
                >
                    This is the harsh reality for countless Indonesians facing
                    the growing threat of illegal fintech. These lenders operate
                    in the shadows, using intimidation and harassment to exploit
                    unsuspecting victims.
                </p>
                <p
                    class="font-jakarta text-di-paragraph text-di-white-read font-light mt-2 md:mt-4"
                >
                    The impact of illegal fintech goes beyond financial ruin.
                    Victims face relentless psychological pressure, with some
                    even driven to desperate measures. This is a societal issue
                    demanding a collective solution.
                </p>
            </div>
        </div>
    </section>
    <section class="mt-14 md:mt-16 px-2 md:px-4">
        <h1 class="text-di-sub-title font-noto text-di-white-read text-center">
            Data from OJK January 2024
        </h1>
        <div
            class="flex justify-between items-center mt-10 flex-col md:flex-row flex-wrap gap-10 md:gap-0"
        >
            <div
                class="flex justify-center items-center flex-col gap-2 md:gap-4"
            >
                <p class="text-di-paragraph text-di-white-read font-light">
                    Outstanding Loans
                </p>
                <div class="text-di-stat-desc text-di-white-read">60T</div>
            </div>
            <div
                class="flex justify-center items-center flex-col gap-2 md:gap-4"
            >
                <p class="text-di-paragraph text-di-white-read font-light">
                    Growth
                </p>
                <div class="text-di-stat-desc text-di-white-read">18.4%</div>
            </div>
            <div
                class="flex justify-center items-center flex-col gap-2 md:gap-4"
            >
                <p class="text-di-paragraph text-di-white-read font-light">
                    NPL
                </p>
                <div class="text-di-stat-desc text-di-white-read">2.95%</div>
            </div>
            <div
                class="flex justify-center items-center flex-col gap-2 md:gap-4"
            >
                <p class="text-di-paragraph text-di-white-read font-light">
                    Registered Platforms
                </p>
                <div class="text-di-stat-desc text-di-white-read">101</div>
            </div>
        </div>
    </section>
    <section class="mt-14 md:mt-16 px-2 md:px-4 bg-di-gray py-8">
        <h1
            class="text-di-sub-title font-jakarta text-di-white-read text-center"
        >
            Statistic Divided by Gender
        </h1>
        <div class="grid grid-cols-1 md:grid-cols-[160px_1fr_1fr_1fr] mt-6">
            <div class="flex">
                <div class="order-1 min-w-[150px] md:hidden"></div>
                <div
                    class="order-2 md:mr-0 flex md:flex-col items-center justify-center gap-16 w-full md:mt-20"
                >
                    <div class="min-w-12">
                        <img class="" :src="Man" alt="man icon" />
                    </div>
                    <div class="min-w-12">
                        <img :src="Woman" alt="woman icon" />
                    </div>
                </div>
            </div>
            <div
                class="flex md:flex-col w-full items-center mt-6 overflow-hidden"
            >
                <p
                    class="min-w-[140px] w-[140px] md:w-full text-di-white-read md:text-center text-di-paragraph font-semibold max-w-20 md:max-w-none text-center md:mb-6"
                >
                    Total Outstanding Loans
                </p>
                <div
                    class="flex md:flex-col md:items-center justify-center justify-self-center w-full gap-16"
                >
                    <div
                        class="text-di-white-read font-light text-di-secondary-sub-title"
                    >
                        8M
                    </div>
                    <div
                        class="text-di-white-read font-light text-di-secondary-sub-title"
                    >
                        9M
                    </div>
                </div>
            </div>
            <div class="flex md:flex-col w-full items-center mt-6">
                <div
                    class="min-w-[140px] w-[140px] md:w-full text-di-white-read md:text-center text-di-paragraph font-semibold max-w-20 md:max-w-none text-center md:mb-6"
                >
                    Non Performing Loans
                </div>
                <div
                    class="flex md:flex-col md:items-center justify-center justify-self-center w-full gap-16"
                >
                    <div
                        class="text-di-white-read font-light text-di-secondary-sub-title"
                    >
                        1.2M
                    </div>
                    <div
                        class="text-di-white-read font-light text-di-secondary-sub-title"
                    >
                        943K
                    </div>
                </div>
            </div>
            <div class="flex md:flex-col w-full items-center mt-6">
                <div
                    class="min-w-[140px] w-[140px] md:w-full text-di-white-read md:text-center text-di-paragraph font-semibold max-w-20 md:max-w-none text-center md:mb-6"
                >
                    Financial Literacy
                </div>
                <div
                    class="flex md:flex-col md:items-center justify-center justify-self-center w-full gap-16"
                >
                    <div
                        class="text-di-white-read font-light text-di-secondary-sub-title"
                    >
                        49%
                    </div>
                    <div
                        class="text-di-white-read font-light text-di-secondary-sub-title"
                    >
                        50%
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="mt-14 md:mt-16 px-2 md:px-4 text-di-white-read">
        <h1 class="text-di-sub-title font-noto text-center">Top 3 Provinces With Outstanding Loans</h1>
        <div class="flex items-center justify-center w-full mx-2 mt-8">
            <img :src="Maps" alt="Map Indonesia">
        </div>
    </section>
    <section class="mt-14 md:mt-16 px-2 md:px-4">
        <div class="grid md:grid-cols-2 grid-cols-1 gap-4 items-center justify-items-center">
            <div class="order-1 font-jakarta text-di-white-read">
                <h1 class="font-light text-di-sub-title">
                    <span class="font-extrabold text-[2.5rem]">A Shocking</span>
                    <br />
                    Pattern Emerges
                </h1>
                <h1 class="text-[120px] font-extrabold">42%</h1>
                <p class="mt-4 text-di-paragraph font-light">
                    Data reveals a disturbing truth: a staggering 42% of illegal
                    fintech victims come from the teaching profession. These
                    educators, entrusted with nurturing young minds, are
                    themselves falling prey to predatory lenders. This is
                    followed by a concerning 21% of victims from housewives,
                    another demographic often facing financial vulnerability.
                </p>
            </div>
            <div class="order-2">
                <img class="object-cover bg-center" :src="Dots" alt="dots statistic">
            </div>
        </div>
    </section>
    <section class="mt-14 md:mt-16 px-2 md:px-4 text-di-white-read">
        <h1 class="font-noto text-di-sub-title max-w-[600px]">How Can We Design an Innovative Solutions?</h1>
    </section>
</template>

<style scoped>
.swiper-container {
    width: 100%;
    max-width: 100%;
    max-height: 100vh;
    min-height: 0;
    min-width: 0;
}
@media (min-width: 1024px) {
    .main {
        min-height: 100vh;
    }
}
</style>
