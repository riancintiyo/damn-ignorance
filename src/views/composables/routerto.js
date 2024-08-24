// useScrollToSection.js
import { useRouter } from 'vue-router'

export function useScrollToSection() {
    const router = useRouter()

    const scrollToSection = (sectionId) => {
        router.push({ path: '/', hash: `#${sectionId}` })
    }

    return { scrollToSection }
}
