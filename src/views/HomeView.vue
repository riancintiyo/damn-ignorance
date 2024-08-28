<script setup>
import { useScrollToSection } from '@/views/composables/routerto.js'
import { ArrowDownIcon } from '@heroicons/vue/24/solid'
import 'swiper/swiper-bundle.css'
import { register } from 'swiper/element/bundle'
import { descriptions } from './data/descriptions'
import ScaleIcon from '@/components/icons/ScaleIcon.vue'
import Man from '@/assets/man.svg'
import Woman from '@/assets/woman.svg'
import Dots from '@/assets/dot-stat.png'
import Maps from '@/assets/map-and-pin.png'
import FocusIcon from '@/assets/focus-icon.svg'
import LineIcon from '@/assets/line-icon.svg'
import TelegramIcon from '@/assets/telegram-icon.svg'
import Email from '@/assets/email-icon.svg'
import GithubIcon from '@/assets/github_link.svg'
import TeamIcon from '@/assets/team-icon.png'
import AstroIcon from '@/assets/astronaut-icon.png'
import PrimaryButton from '@/components/PrimaryButton.vue'
import DamnIgnoranceLogo from '@/components/icons/DamnIgnorance.vue'
import 'aos/dist/aos.css'
import AOS from 'aos'
import anime from 'animejs/lib/anime.es.js';

import { ref, onMounted, onUnmounted  } from 'vue'

AOS.init()
const { scrollToSection } = useScrollToSection()
// // register Swiper custom elements
register()

const increment = ref(null)
const section = ref(null);
const animateIncrement = () => {
  anime({
    targets: increment.value,
    textContent: 42,
    round: 1,
    easing: 'easeInOutQuad',
    duration: 3500,
  });
};

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateIncrement();
        observer.unobserve(section.value); // Stop observing after animation starts
      }
    });
  });

  observer.observe(section.value);

  onUnmounted(() => {
    observer.disconnect(); // Cleanup observer when component is unmounted
  });
});
</script>

<template>
    <section
        id="home"
        class="main mt-10 md:mt-20"
        data-aos="fade-up"
        data-aos-duration="1000"
    >
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
                <a
                    aria-label="Go to about section"
                    id="bounce"
                    href="#about"
                    @click.prevent="scrollToSection('about')"
                    class="!hover:bg-none !hover:border-none !hover:color-none"
                >
                    <div class="border rounded-full border-di-white-read p-2">
                        <ArrowDownIcon class="size-6 text-di-white-read" />
                    </div>
                </a>
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
    <section
        id="about"
        class="mt-14 md:mt-8 px-2 md:px-4"
        data-aos="fade-up"
        data-aos-duration="1000"
    >
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
    <section
        class="mt-14 md:mt-16 px-2 md:px-4"
        data-aos="fade-up"
        data-aos-duration="1000"
    >
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
    <section
        class="mt-14 md:mt-16 px-2 md:px-4 bg-di-gray py-8"
        data-aos="fade-up"
        data-aos-duration="1000"
    >
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
                    class="min-w-[140px] w-[140px] md:w-full text-di-white-read md:text-center text-di-desc md:text-di-paragraph font-semibold max-w-20 md:max-w-none text-center md:mb-6"
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
                    class="min-w-[140px] w-[140px] md:w-full text-di-white-read md:text-center text-di-desc md:text-di-paragraph font-semibold max-w-20 md:max-w-none text-center md:mb-6"
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
                    class="min-w-[140px] w-[140px] md:w-full text-di-white-read md:text-center text-di-desc md:text-di-paragraph font-semibold max-w-20 md:max-w-none text-center md:mb-6"
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
        <h1 class="text-di-sub-title font-noto text-center">
            Top 3 Provinces With Outstanding Loans
        </h1>
        <div class="flex items-center justify-center w-full mx-2 mt-8">
            <img :src="Maps" alt="Map Indonesia" />
        </div>
    </section>
    <section ref="section" class="mt-14 md:mt-16 px-2 md:px-4">
        <div
            class="grid md:grid-cols-2 grid-cols-1 gap-4 items-center justify-items-center"
        >
            <div class="order-1 font-jakarta text-di-white-read">
                <h1 class="font-light text-di-sub-title">
                    <span class="font-extrabold text-[2.5rem]">A Shocking</span>
                    <br />
                    Pattern Emerges
                </h1>
                <h1 ref="increment" class="text-[120px] font-extrabold">0<span>%</span></h1>
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
                <img
                    class="object-cover bg-center"
                    :src="Dots"
                    alt="dots statistic"
                />
            </div>
        </div>
    </section>
    <section
        id="solution"
        class="mt-14 md:mt-16 px-2 md:px-4 text-di-white-read"
    >
        <h1 class="font-noto text-di-sub-title max-w-[600px]">
            How Can We Design an Innovative Solutions?
        </h1>
        <p class="text-di-paragraph font-jakarta mt-2 w-full">
            This project tackles the growing threat of illegal fintech by
            harnessing the power of <b class="text-di-red">design thinking</b>.
            Unlike traditional approaches,
            <b class="text-di-red">design thinking</b> is a human-centered
            process that prioritizes empathy and creative problem-solving.
        </p>
        <div
            class="flex justify-center md:justify-evenly items-center flex-col md:flex-row mt-4 md:mt-10 gap-4 md:gap-6"
        >
            <div
                class="overflow-hidden min-w-[281px] md:min-h-[297px] p-4 bg-di-gray rounded-lg flex-col flex-nowrap flex justify-between items-start gap-6 relative"
            >
                <div class="text-di-white-read">
                    <p class="text-di-desc font-medium">Framework Solution</p>
                    <h2 class="text-di-secondary-sub-title font-bold">
                        User Focused
                    </h2>
                </div>
                <div
                    class="max-w-56 max-h-56 self-center backdrop-blur-sm blur-[1px]"
                >
                    <img :src="FocusIcon" alt="User Focused Icon" />
                </div>
                <div class="md:h-8 h-20"></div>
                <div
                    class="bg-di-black absolute w-full p-2 bottom-0 z-10 text-center bg-opacity-80 backdrop-blur-sm right-0 left-0 mx-auto text-ellipsis overflow-hidden text-di-small-desc text-di-white-read"
                >
                    We'll delve into the experiences of victims and understand
                    their struggles to craft solutions that truly address their
                    needs.
                </div>
            </div>
            <div
                class="overflow-hidden p-4 max-w-[281px] md:max-h-[297px] bg-di-gray rounded-lg flex-col flex-nowrap flex justify-between items-start relative md:w-full"
            >
                <div class="text-di-white-read">
                    <p class="text-di-desc font-medium">Framework Solution</p>
                    <h2 class="text-di-secondary-sub-title font-bold">
                        Collaborative Spirit
                    </h2>
                </div>
                <div
                    class="max-w-56 max-h-56 backdrop-blur-sm blur-[1px] self-center"
                >
                    <img
                        class="object-cover bg-center max-h-[168px]"
                        :src="TeamIcon"
                        alt="User Focused Icon"
                    />
                </div>
                <!-- <div class="h-8"></div> -->
                <div
                    class="bg-di-black absolute w-full p-2 bottom-0 z-10 text-center bg-opacity-80 backdrop-blur-sm right-0 left-0 mx-auto text-ellipsis overflow-hidden text-di-small-desc text-di-white-read"
                >
                    No one has all the answers. By joining forces, we can
                    combine diverse perspectives to generate innovative ideas.
                </div>
            </div>
            <div
                class="overflow-hidden p-4 bg-di-gray rounded-lg flex-col flex-nowrap flex justify-between items-start gap-6 relative"
            >
                <div class="text-di-white-read">
                    <p class="text-di-desc font-medium">Framework Solution</p>
                    <h2 class="text-di-secondary-sub-title font-bold">
                        Action Oriented
                    </h2>
                </div>
                <div
                    class="max-w-56 max-h-56 backdrop-blur-sm blur-[1px] self-center"
                >
                    <img :src="AstroIcon" alt="User Focused Icon" />
                </div>
                <!-- <div class="h-8"></div> -->
                <div
                    class="bg-di-black absolute w-full p-2 bottom-0 z-10 text-center bg-opacity-80 backdrop-blur-sm right-0 left-0 mx-auto text-ellipsis overflow-hidden text-di-small-desc text-di-white-read"
                >
                    We won't just brainstorm – we'll develop practical solutions
                    and test them in the real world, iterating towards impactful
                    results.
                </div>
            </div>
        </div>
    </section>
    <section
        id="join"
        class="mt-14 md:mt-16 md:px-4 text-di-white-read bg-di-gray px-2 py-4"
    >
        <div class="flex flex-col flex-nowrap max-w-fit">
            <h1 class="font-noto text-di-sub-title max-w-[600px] px-2">
                How to join us?
            </h1>
            <hr class="w-full text-di-red border-di-red bg-di-red" />
        </div>
        <p class="mt-6 px-2 font-jakarta text-di-paragraph">
            <b>No prior experience with design thinking is necessary.</b> In
            fact this project is a chance to practice design thinking in real
            case project, learn alongside like-minded individuals, unleash your
            creativity and contribute to a solution that protects Indonesians
            from financial exploitation.`
        </p>
        <p class="mt-4 px-2 font-jakarta text-di-paragraph">
            Here's how to join:
        </p>
        <p class="mt-4 px-2 font-jakarta text-di-paragraph">
            1. Send a message to our contact, with message
            <b>"Design Thinking for Change: I Want to Help!"</b>
            <span class="inline-block mt-4">
                2. In next description, tell us a little about yourself and
                share why you're passionate about tackling this problem.
            </span>
        </p>
        <p class="mt-4 px-2 font-jakarta text-di-paragraph">Contact Us:</p>
        <div class="flex justify-start items-center gap-6 mt-4">
            <a href="mailto:damnignorance@outlook.com">
                <PrimaryButton :color="`bg-di-black`" msg="Email" :icon="true">
                    <template #icon>
                        <div>
                            <img :src="Email" alt="Email Icon" />
                        </div>
                    </template>
                </PrimaryButton>
            </a>
            <a href="https://t.me/damnignorance">
                <PrimaryButton
                    :color="`bg-di-black`"
                    msg="Telegram"
                    :icon="true"
                >
                    <template #icon>
                        <div>
                            <img :src="TelegramIcon" alt="Telegram Icon" />
                        </div>
                    </template>
                </PrimaryButton>
            </a>
        </div>
    </section>
    <footer
        class="mt-20 md:mt-16 py-4 px-4 md:px-6 md:py-8 text-di-white-read border border-x-0 border-y border-opacity-50 border-white"
    >
        <div
            class="flex flex-col md:flex-row justify-center items-start md:justify-between md:items-center"
        >
            <div class="flex flex-col">
                <DamnIgnoranceLogo />
                <p class="text-di-small-desc max-w-[306px]">
                    Be part of solutions, while others focus on problems.
                </p>
            </div>
            <div class="flex flex-wrap gap-6 md:gap-10 mt-4">
                <div class="">
                    <div
                        class="text-di-white-read font-jakarta font-bold text-di-desc"
                    >
                        Information
                    </div>
                    <p class="max-w-[250px] text-di-small-desc">
                        Project initiated by Rian C. Dedicated to combating
                        illegal fintech and empowering victims.
                    </p>
                </div>
                <div class="">
                    <div
                        class="text-di-white-read font-jakarta font-bold text-di-desc"
                    >
                        Contact Initiator:
                    </div>
                    <a
                        class="max-w-[250px] text-di-small-desc"
                        href="mailto:cintiyo.ryan@gmail.com"
                    >
                        @rian_cintiyo
                    </a>
                </div>
            </div>
        </div>
    </footer>
    <div
        class="flex justify-between items-center mt-4 px-4 text-di-small-desc text-di-white-read"
    >
        <p>&#169; 2024.Damn Ignorance. All right reserved</p>
        <a
            href="https://github.com/riancintiyo"
            target="_blank"
            rel="noopener noreferrer"
        >
            <div class="w-6 h-6">
                <img :src="GithubIcon" alt="Github Icon" />
            </div>
        </a>
    </div>
</template>

<style>
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
