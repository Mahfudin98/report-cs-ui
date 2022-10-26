<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <span
    class="group max-w-max relative flex flex-col items-center justify-center transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110"
  >
    <!-- Text/Icon goes here -->
    <button
      type="button"
      class="text-center rounded-xl mx-1 bg-white text-theme-bg-light text-xs font-bold px-3 py-2 leading-1 shadow-md shadow-slate-500/40"
    >
      {{ button }}
    </button>
    <!-- Tooltip here -->
    <div
      class="[transform:perspective(50px)_translateZ(0)_rotateX(10deg)] group-hover:[transform:perspective(0px)_translateZ(0)_rotateX(0deg)] absolute bottom-0 mb-10 origin-bottom transform rounded text-white opacity-0 transition-all duration-300 group-hover:opacity-100"
    >
      <div class="flex max-w-xs flex-col items-center">
        <div class="rounded bg-gray-900 p-2 text-xs text-center shadow-lg">
          {{ title }}
        </div>
        <div class="clip-bottom h-2 w-4 bg-gray-900"></div>
      </div>
    </div>
  </span>
</template>
<script>
export default {
  props: ["button", "title"],
};
</script>
<style>
.clip-bottom {
  clip-path: polygon(100% 50%, 0 0, 100% 0, 50% 100%, 0 0);
}
</style>
