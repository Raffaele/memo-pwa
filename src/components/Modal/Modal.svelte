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
    <h3 class="modal-title">
      <slot name="title" />
    </h3>
    <h4 class="modal-sub-title">
      <slot name="sub-title" />
    </h4>
    <slot />
  </div>
</div>

<style>
  .modal-main {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(100, 100, 100, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10%;
  }
  .modal-content {
    background-color: lightyellow;
    padding: 5%;
    border-radius: 20px;
    flex: 1;
  }
  .modal-title,
  .modal-sub-title {
    margin-top: 0;
    text-align: center;
  }
</style>
