<template>
  <nav class="w-full sm:w-auto sm:mr-auto">
    <ul class="inline-flex -space-x-px">
      <li>
        <a
          href="javascript:;"
          @click.prevent="onClickFirstPage"
          class="py-2 px-3 ml-0 leading-tight"
          :class="{
            'cursor-not-allowed text-theme-primary': isInFirstPage,
            'text-gray-500': !isInFirstPage,
          }"
        >
          <i class="fa-solid fa-angles-left"></i>
        </a>
      </li>
      <li>
        <a
          href="javascript:;"
          @click="onClickPreviousPage"
          :disabled="isInFirstPage"
          class="py-2 px-3 ml-0 leading-tight"
          :class="{
            'cursor-not-allowed text-theme-primary': isInFirstPage,
            'text-gray-500': !isInFirstPage,
          }"
        >
          <i class="fa-solid fa-angle-left"></i>
        </a>
      </li>

      <li v-for="page in pages" :key="page.name">
        <a
          href="javascript:;"
          class="py-2 px-3 ml-0 leading-tight"
          @click.prevent="onClickPage(page.name)"
          role="button"
          :class="{
            'cursor-not-allowed text-theme-primary': isPageActive(page.name),
            'text-gray-500': !isPageActive(page.name),
          }"
          >{{ page.name }}</a
        >
      </li>

      <li>
        <a
          href="javascript:;"
          class="py-2 px-3 ml-0 leading-tight"
          @click="onClickNextPage"
          :disabled="isInLastPage"
          :class="{
            'cursor-not-allowed text-theme-primary': isInLastPage,
            'text-gray-500': !isInLastPage,
          }"
        >
          <i class="fa-solid fa-angle-right"></i>
        </a>
      </li>
      <li>
        <a
          href="javascript:;"
          class="py-2 px-3 ml-0 leading-tight"
          @click.prevent="onClickLastPage"
          :class="{
            'cursor-not-allowed text-theme-primary': isInLastPage,
            'text-gray-500': !isInLastPage,
          }"
        >
          <i class="fa-solid fa-angles-right"></i>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },

    totalPages: {
      type: Number,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },

    perPage: {
      type: Number,
      required: true,
    },

    currentPage: {
      type: Number,
      required: true,
    },

    hasMorePages: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }

      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1;
      }

      return this.currentPage - 1;
    },
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      );
    },
    pages() {
      const range = [];

      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        });
      }

      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },

  methods: {
    onClickFirstPage() {
      this.$emit("pagechanged", 1);
    },
    onClickPreviousPage() {
      this.$emit("pagechanged", this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit("pagechanged", page);
    },
    onClickNextPage() {
      this.$emit("pagechanged", this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit("pagechanged", this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    },
  },
};
</script>
