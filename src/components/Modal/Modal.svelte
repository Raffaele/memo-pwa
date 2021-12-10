<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  function tapOnBackground(evt) {
    if (this !== evt.target) {
      return;
    }
    dispatch('tapOnBackground');
  }
</script>

<div class="modal-main" on:click={tapOnBackground}>
  <div class="modal-content">
    <slot />
  </div>
</div>

<style>
  .modal-main {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: rgba(100, 100, 100, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-content {
    background-color: white;
    padding: 30px;
  }
</style>
