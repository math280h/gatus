<script setup>
  import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="mt-3 flex">
    <div class="flex-1">
      <Button 
        v-if="currentPage < 5" 
        @click="nextPage"
      >
        &lt; Previous
      </Button>
    </div>
    <div class="flex-1 text-right">
      <Button 
        v-if="currentPage > 1" 
        @click="previousPage"
      >
        Next &gt;
      </Button>
    </div>
  </div>
</template>


<script>
export default {
  name: 'Pagination',
  components: {},
  emits: ['page'],
  methods: {
    nextPage() {
      this.currentPage++;
      this.$emit('page', this.currentPage);
    },
    previousPage() {
      this.currentPage--;
      this.$emit('page', this.currentPage);
    }
  },
  data() {
    return {
      currentPage: 1,
    }
  }
}
</script>