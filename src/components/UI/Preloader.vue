<template>
  <div class="loader-wrap">
    <div class="loader"></div>
  </div>
</template>

<style scoped>
.loader-wrap {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
}

.loader {
  border: 20px solid #eaf0f6;
  border-radius: 50%;
  border-top: 20px solid var(--primary);
  width: 200px;
  height: 200px;
  animation: spinner 4s linear infinite;
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
