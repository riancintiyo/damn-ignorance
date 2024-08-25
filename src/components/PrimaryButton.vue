<script setup>
defineProps({
    msg: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    icon: {
        type: Boolean,
        required: true
    }
})
</script>
<template>
    <div class="rounded-lg">
        <button
            :class="[
                color,
                'rounded-lg px-8 py-2 flex items-center justify-center'
            ]"
        >
            <slot v-if="icon" name="icon"></slot>
            <span :class="{ 'ml-2': icon }" class="truncate font-jakarta font-bold text-di-small-desc text-di-white-read">{{ msg }}</span>
        </button>
    </div>
</template>
<style></style>
