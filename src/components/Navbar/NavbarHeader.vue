<template>
  <nav class="w-1/2 px-4">
    <ol class="flex gap-3">
      <li>
        <a href="javascript:;" class="text-sm text-theme-primary font-poppins">
          Application
        </a>
      </li>
      <li>
        <i
          class="text-sm text-slate-500 font-poppins fa-solid fa-chevron-right"
        ></i>
      </li>
      <li>
        <a href="javascript:;" class="text-sm text-slate-500 font-poppins">
          {{ $route.meta.title }}
        </a>
      </li>
    </ol>
  </nav>
</template>
