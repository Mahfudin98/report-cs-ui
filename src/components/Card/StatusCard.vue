<template>
  <div class="col-span-12 sm:col-span-6 xl:col-span-3">
    <div
      class="relative transition shadow-md hover:shadow-lg shadow-slate-500/40 hover:shadow-slate-500/60 rounded-md ease-in-out delay-100 hover:-translate-y-1 hover:scale-110"
    >
      <div class="absolute h-10 w-full box-before -bottom-2.5"></div>
      <div
        class="relative bg-white shadow-md shadow-slate-500/40 rounded-md p-5"
      >
        <div class="flex">
          <slot name="icon" />
          <div class="ml-auto">
            <slot name="persen" />
          </div>
        </div>
        <div class="text-3xl font-medium leading-8 mt-6">{{ data }}</div>
        <div class="text-base text-slate-500 mt-1">{{ title }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["title", "data"],
};
</script>
