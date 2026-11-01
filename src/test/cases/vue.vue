<template>
  <button>Click</button>
</template>

<script setup lang="ts">
const model = defineModel({ default: 1 });
defineProps<{ title: string }>();
const title = 'local';
console.log('test');
</script>

This content is outside the component blocks.
