import { ref, onMounted, onUnmounted } from "vue";

// The function that helps determine the size of a device to adapt the design accordingly
export function useIsMobileVersion() {
  const isMobile = ref(false);
  const checkIfMobile = () => {
    isMobile.value = window.innerWidth < 768;
  };

  onMounted(() => {
    window.addEventListener("resize", checkIfMobile);
    checkIfMobile();
  });
  onUnmounted(() => {
    window.removeEventListener("resize", checkIfMobile);
  });
  return isMobile;
}
