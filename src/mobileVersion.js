import { ref, onMounted, onUnmounted } from 'vue'

export function useMobileVersion() {
    const isMobile = ref(false)
    const checkIfMobile = () => {
        isMobile.value = window.innerWidth < 768
    }

    onMounted(() => {
        window.addEventListener("resize", checkIfMobile)
        checkIfMobile()
    })

    onUnmounted(() => {
        window.removeEventListener("resize", checkIfMobile)
    })
    return isMobile
}