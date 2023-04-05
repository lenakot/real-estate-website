import { ref, onMounted, onUnmounted } from "vue";

export function useIsMobileVersion() {
  const isMobile = ref(false);
  const checkIfMobile = () => {
    isMobile.value = window.innerWidth < 768;
  };

  onMounted(() => {
    window.addEventListener("resize", checkIfMobile);
    checkIfMobile();
  });
  return isMobile;
}
