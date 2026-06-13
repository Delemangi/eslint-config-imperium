<script lang="ts">
  let title = 'imperium';
  const items = ['a', 'b', 'c'];
</script>

<button>{title}</button>

{@html '<b>unsafe</b>'}

{#each items as item}
  <span>{item}</span>
{/each}
