<script setup>
import { ref, onMounted, onUnmounted, computed, watch, nextTick, shallowRef } from 'vue'
import * as pdfjsLib from 'pdfjs-dist'

// Set up the worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.mjs',
    import.meta.url
).href

const props = defineProps({
    pdfUrl: {
        type: String,
        required: true
    },
    visible: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['close', 'loaded'])

// PDF state - use shallowRef to avoid Vue's deep reactivity on PDF objects
const pdfDoc = shallowRef(null)
const totalPages = ref(0)
const currentSpread = ref(0) // Index of current spread (pair of pages)
const scale = ref(1)
const isLoading = ref(true)
const loadingProgress = ref(0)

// Canvas refs
const leftCanvas = ref(null)
const rightCanvas = ref(null)
const singleCanvas = ref(null)

// View mode
const viewMode = ref('spread') // 'spread' or 'single'
const currentSinglePage = ref(1)

// Touch/swipe handling
const touchStartX = ref(0)
const touchEndX = ref(0)
const isAnimating = ref(false)
const flipDirection = ref(null) // 'left' or 'right'

// Zoom levels
const zoomLevels = [0.5, 0.75, 1, 1.25, 1.5, 2]
const currentZoomIndex = ref(2) // Default to 1x

// Computed properties
const totalSpreads = computed(() => {
    if (!totalPages.value) return 0
    // First page is single (cover), then pairs, last might be single
    return Math.ceil((totalPages.value + 1) / 2)
})

const leftPageNum = computed(() => {
    if (currentSpread.value === 0) return null // Cover spread has no left page
    return currentSpread.value * 2
})

const rightPageNum = computed(() => {
    if (currentSpread.value === 0) return 1 // Cover page
    const pageNum = currentSpread.value * 2 + 1
    return pageNum <= totalPages.value ? pageNum : null
})

const canGoBack = computed(() => {
    if (viewMode.value === 'single') {
        return currentSinglePage.value > 1
    }
    return currentSpread.value > 0
})

const canGoForward = computed(() => {
    if (viewMode.value === 'single') {
        return currentSinglePage.value < totalPages.value
    }
    return currentSpread.value < totalSpreads.value - 1
})

const displayPageInfo = computed(() => {
    if (viewMode.value === 'single') {
        return `${currentSinglePage.value} / ${totalPages.value}`
    }
    if (currentSpread.value === 0) {
        return `1 / ${totalPages.value}`
    }
    const left = leftPageNum.value
    const right = rightPageNum.value
    if (right) {
        return `${left}-${right} / ${totalPages.value}`
    }
    return `${left} / ${totalPages.value}`
})

// Load PDF
const loadPdf = async () => {
    if (!props.pdfUrl) return

    isLoading.value = true
    loadingProgress.value = 0

    try {
        const loadingTask = pdfjsLib.getDocument(props.pdfUrl)

        loadingTask.onProgress = (progress) => {
            if (progress.total) {
                loadingProgress.value = Math.round((progress.loaded / progress.total) * 100)
            }
        }

        pdfDoc.value = await loadingTask.promise
        totalPages.value = pdfDoc.value.numPages
        currentSpread.value = 0
        currentSinglePage.value = 1

        await renderCurrentView()
        isLoading.value = false
        emit('loaded')
    } catch (error) {
        console.error('Error loading PDF:', error)
        isLoading.value = false
    }
}

// Render a single page to a canvas
const renderPage = async (pageNum, canvas, maxWidth, maxHeight) => {
    if (!pdfDoc.value || !canvas || pageNum < 1 || pageNum > totalPages.value) {
        return false
    }

    const page = await pdfDoc.value.getPage(pageNum)
    const viewport = page.getViewport({ scale: 1 })

    // Calculate scale to fit within bounds
    const scaleX = maxWidth / viewport.width
    const scaleY = maxHeight / viewport.height
    const fitScale = Math.min(scaleX, scaleY) * scale.value

    const scaledViewport = page.getViewport({ scale: fitScale })

    canvas.width = scaledViewport.width
    canvas.height = scaledViewport.height

    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)

    await page.render({
        canvasContext: context,
        viewport: scaledViewport
    }).promise

    return true
}

// Render current spread or single page
const renderCurrentView = async () => {
    if (!pdfDoc.value) return

    await nextTick()

    const containerWidth = window.innerWidth * 0.9
    const containerHeight = window.innerHeight * 0.8

    if (viewMode.value === 'single') {
        const canvas = singleCanvas.value
        if (canvas) {
            await renderPage(currentSinglePage.value, canvas, containerWidth - 100, containerHeight - 120)
        }
    } else {
        // Spread view
        const pageWidth = (containerWidth - 120) / 2
        const pageHeight = containerHeight - 120

        if (currentSpread.value === 0) {
            // Cover page - single page centered
            if (rightCanvas.value) {
                await renderPage(1, rightCanvas.value, pageWidth, pageHeight)
            }
            if (leftCanvas.value) {
                const ctx = leftCanvas.value.getContext('2d')
                leftCanvas.value.width = 0
                leftCanvas.value.height = 0
            }
        } else {
            // Regular spread
            const leftPage = leftPageNum.value
            const rightPage = rightPageNum.value

            if (leftCanvas.value && leftPage) {
                await renderPage(leftPage, leftCanvas.value, pageWidth, pageHeight)
            }

            if (rightCanvas.value && rightPage) {
                await renderPage(rightPage, rightCanvas.value, pageWidth, pageHeight)
            } else if (rightCanvas.value) {
                rightCanvas.value.width = 0
                rightCanvas.value.height = 0
            }
        }
    }
}

// Navigation
const goToNextSpread = () => {
    if (!canGoForward.value || isAnimating.value) return

    isAnimating.value = true
    flipDirection.value = 'left'

    setTimeout(() => {
        if (viewMode.value === 'single') {
            currentSinglePage.value++
        } else {
            currentSpread.value++
        }
        renderCurrentView()

        setTimeout(() => {
            isAnimating.value = false
            flipDirection.value = null
        }, 300)
    }, 150)
}

const goToPrevSpread = () => {
    if (!canGoBack.value || isAnimating.value) return

    isAnimating.value = true
    flipDirection.value = 'right'

    setTimeout(() => {
        if (viewMode.value === 'single') {
            currentSinglePage.value--
        } else {
            currentSpread.value--
        }
        renderCurrentView()

        setTimeout(() => {
            isAnimating.value = false
            flipDirection.value = null
        }, 300)
    }, 150)
}

const goToPage = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPages.value) return

    if (viewMode.value === 'single') {
        currentSinglePage.value = pageNum
    } else {
        // Calculate spread for this page
        if (pageNum === 1) {
            currentSpread.value = 0
        } else {
            currentSpread.value = Math.floor(pageNum / 2)
        }
    }
    renderCurrentView()
}

// Zoom controls
const zoomIn = () => {
    if (currentZoomIndex.value < zoomLevels.length - 1) {
        currentZoomIndex.value++
        scale.value = zoomLevels[currentZoomIndex.value]
        renderCurrentView()
    }
}

const zoomOut = () => {
    if (currentZoomIndex.value > 0) {
        currentZoomIndex.value--
        scale.value = zoomLevels[currentZoomIndex.value]
        renderCurrentView()
    }
}

const resetZoom = () => {
    currentZoomIndex.value = 2
    scale.value = 1
    renderCurrentView()
}

// Toggle view mode
const toggleViewMode = () => {
    if (viewMode.value === 'spread') {
        viewMode.value = 'single'
        // Convert spread position to single page
        if (currentSpread.value === 0) {
            currentSinglePage.value = 1
        } else {
            currentSinglePage.value = currentSpread.value * 2
        }
    } else {
        viewMode.value = 'spread'
        // Convert single page to spread position
        if (currentSinglePage.value === 1) {
            currentSpread.value = 0
        } else {
            currentSpread.value = Math.floor(currentSinglePage.value / 2)
        }
    }
    renderCurrentView()
}

// Touch handling for swipe
const handleTouchStart = (e) => {
    touchStartX.value = e.touches[0].clientX
}

const handleTouchMove = (e) => {
    touchEndX.value = e.touches[0].clientX
}

const handleTouchEnd = () => {
    const diff = touchStartX.value - touchEndX.value
    const threshold = 50

    if (Math.abs(diff) > threshold) {
        if (diff > 0) {
            goToNextSpread()
        } else {
            goToPrevSpread()
        }
    }
}

// Keyboard navigation
const handleKeydown = (e) => {
    if (!props.visible) return

    switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
            e.preventDefault()
            goToNextSpread()
            break
        case 'ArrowLeft':
        case 'ArrowUp':
            e.preventDefault()
            goToPrevSpread()
            break
        case 'Escape':
            emit('close')
            break
        case '+':
        case '=':
            zoomIn()
            break
        case '-':
            zoomOut()
            break
        case '0':
            resetZoom()
            break
    }
}

// Handle window resize
const handleResize = () => {
    renderCurrentView()
}

// Watchers
watch(() => props.visible, (newVal) => {
    if (newVal && !pdfDoc.value) {
        loadPdf()
    } else if (newVal && pdfDoc.value) {
        renderCurrentView()
    }
})

// Lifecycle
onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
    window.addEventListener('resize', handleResize)

    if (props.visible) {
        loadPdf()
    }
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
    window.removeEventListener('resize', handleResize)
})
</script>

<template>
    <Transition name="modal">
        <div
            v-if="visible"
            class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
            @click.self="$emit('close')"
        >
            <div class="relative w-[95vw] h-[90vh] max-w-7xl flex flex-col">
                <!-- Top Controls Bar -->
                <div class="flex items-center justify-between px-4 py-2 bg-zinc-900/90 rounded-t-lg backdrop-blur">
                    <!-- Left: View mode toggle -->
                    <div class="flex items-center gap-2">
                        <button
                            @click="toggleViewMode"
                            class="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            :title="viewMode === 'spread' ? 'Switch to single page' : 'Switch to spread view'"
                        >
                            <svg v-if="viewMode === 'spread'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </button>
                    </div>

                    <!-- Center: Page info -->
                    <div class="flex items-center gap-4">
                        <span class="text-white/90 font-jakarta text-sm">{{ displayPageInfo }}</span>
                    </div>

                    <!-- Right: Zoom controls & Close -->
                    <div class="flex items-center gap-1">
                        <button
                            @click="zoomOut"
                            :disabled="currentZoomIndex === 0"
                            class="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Zoom out (-)"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                            </svg>
                        </button>
                        <button
                            @click="resetZoom"
                            class="px-2 py-1 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm font-jakarta"
                            title="Reset zoom (0)"
                        >
                            {{ Math.round(scale * 100) }}%
                        </button>
                        <button
                            @click="zoomIn"
                            :disabled="currentZoomIndex === zoomLevels.length - 1"
                            class="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Zoom in (+)"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                            </svg>
                        </button>

                        <div class="w-px h-6 bg-white/20 mx-2"></div>

                        <button
                            @click="$emit('close')"
                            class="p-2 text-white/70 hover:text-white hover:bg-di-red rounded-lg transition-colors"
                            title="Close (Esc)"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Main Viewer Area -->
                <div
                    class="flex-1 relative bg-zinc-800 overflow-auto flex items-center justify-center"
                    @touchstart="handleTouchStart"
                    @touchmove="handleTouchMove"
                    @touchend="handleTouchEnd"
                >
                    <!-- Loading Overlay -->
                    <Transition name="fade-loading">
                        <div
                            v-if="isLoading"
                            class="absolute inset-0 z-10 flex flex-col items-center justify-center bg-zinc-900"
                        >
                            <div class="booklet-loader"></div>
                            <p class="mt-4 text-white font-jakarta text-sm">Loading booklet... {{ loadingProgress }}%</p>
                        </div>
                    </Transition>

                    <!-- Navigation Arrows -->
                    <button
                        v-show="!isLoading && canGoBack"
                        @click="goToPrevSpread"
                        class="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all hover:scale-110"
                        :class="{ 'opacity-50 pointer-events-none': isAnimating }"
                        title="Previous page (←)"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        v-show="!isLoading && canGoForward"
                        @click="goToNextSpread"
                        class="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all hover:scale-110"
                        :class="{ 'opacity-50 pointer-events-none': isAnimating }"
                        title="Next page (→)"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <!-- PDF Pages Container -->
                    <div
                        v-show="!isLoading"
                        class="flex items-center justify-center gap-1 p-4 transition-transform duration-300"
                        :class="{
                            'animate-flip-left': flipDirection === 'left',
                            'animate-flip-right': flipDirection === 'right'
                        }"
                    >
                        <!-- Spread View -->
                        <template v-if="viewMode === 'spread'">
                            <div class="page-container shadow-2xl" :class="{ 'opacity-0': currentSpread === 0 }">
                                <canvas ref="leftCanvas" class="max-h-[calc(90vh-120px)] bg-white"></canvas>
                            </div>
                            <div class="page-container shadow-2xl">
                                <canvas ref="rightCanvas" class="max-h-[calc(90vh-120px)] bg-white"></canvas>
                            </div>
                        </template>

                        <!-- Single Page View -->
                        <template v-else>
                            <div class="page-container shadow-2xl">
                                <canvas ref="singleCanvas" class="max-h-[calc(90vh-120px)] bg-white"></canvas>
                            </div>
                        </template>
                    </div>
                </div>

                <!-- Bottom Thumbnails/Page Slider -->
                <div class="px-4 py-3 bg-zinc-900/90 rounded-b-lg backdrop-blur">
                    <div class="flex items-center gap-4">
                        <input
                            type="range"
                            :min="1"
                            :max="totalPages"
                            :value="viewMode === 'single' ? currentSinglePage : (currentSpread === 0 ? 1 : currentSpread * 2)"
                            @input="goToPage(Number($event.target.value))"
                            class="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider-thumb"
                        />
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.page-container {
    background: white;
    border-radius: 2px;
}

/* Page flip animations */
@keyframes flipLeft {
    0% {
        transform: perspective(1000px) rotateY(0deg);
    }
    50% {
        transform: perspective(1000px) rotateY(-5deg);
    }
    100% {
        transform: perspective(1000px) rotateY(0deg);
    }
}

@keyframes flipRight {
    0% {
        transform: perspective(1000px) rotateY(0deg);
    }
    50% {
        transform: perspective(1000px) rotateY(5deg);
    }
    100% {
        transform: perspective(1000px) rotateY(0deg);
    }
}

.animate-flip-left {
    animation: flipLeft 0.3s ease-out;
}

.animate-flip-right {
    animation: flipRight 0.3s ease-out;
}

/* Loading spinner */
.booklet-loader {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(255, 255, 255, 0.2);
    border-top-color: #e53935;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

/* Range slider styling */
.slider-thumb::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background: #e53935;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.15s ease;
}

.slider-thumb::-webkit-slider-thumb:hover {
    transform: scale(1.2);
}

.slider-thumb::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: #e53935;
    border: none;
    border-radius: 50%;
    cursor: pointer;
}

/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

/* Loading fade transition */
.fade-loading-enter-active,
.fade-loading-leave-active {
    transition: opacity 0.4s ease;
}
.fade-loading-enter-from,
.fade-loading-leave-to {
    opacity: 0;
}
</style>
