<script>
  import { link, push } from 'svelte-spa-router';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  import Icon from 'svelte-awesome';
  export let page;
  export let maxPage;
  export let nextLink;
  export let prevLink;
  export let timeMemory;
  import { questionCircleO } from 'svelte-awesome/icons';
  const gameOptions = Array.from({ length: 8 }).map(
    (_, i) => 2 * i + 8 + page.unpair
  );
  function goToPage(page) {
    push(`/home/${page}`);
  }
</script>

<div class="main">
  <div class="side-panel">
    {#if prevLink !== -1}
      <button
        class="switch-btn switch-btn-prev"
        on:click={() => goToPage(prevLink)}
      />
    {/if}
  </div>
  <div class="central-panel">
    <h2>
      {#if page.unpair === 0}
        Normal
      {:else}
        Unpair cards: {page.unpair}
        <span on:click={() => dispatch('explanationAsk', page.unpair)}>
          <Icon data={questionCircleO} />
        </span>
      {/if}
    </h2>
    <div class="game-list">
      {#each gameOptions as numOfCards}
        <a
          class="game-option"
          href="#/game/{numOfCards}/{page.unpair}"
          use:link
        >
          {#if timeMemory[`bestTime--${numOfCards}--${page.unpair}`]}
            <div>
              {numOfCards}
            </div>
            ({timeMemory[`bestTime--${numOfCards}--${page.unpair}`]} secs)
          {:else}
            {numOfCards}
          {/if}
        </a>
      {/each}
    </div>
  </div>
  <div class="side-panel">
    {#if nextLink !== maxPage}
      <button
        class="switch-btn switch-btn-next"
        on:click={() => goToPage(nextLink)}
      />
    {/if}
  </div>
</div>

<style>
  .main {
    width: 100vw;
    color: white;
    background-color: red;
    display: flex;
    padding: 3vh 0;
  }

  h2 {
    text-align: center;
  }
  .side-panel {
    display: flex;
    width: 15vw;
    justify-content: center;
    align-items: flex-start;
    padding-top: 3vh;
  }

  .switch-btn {
    display: flex;
    margin: 0;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    background-color: transparent;
  }

  .switch-btn::after {
    --button-color: cyan;
    --arrow-size: 4px var(--button-color) solid;
    content: '';
    width: 4vw;
    height: 4vw;
    border-bottom: var(--arrow-size);
    border-right: var(--arrow-size);
    transform: translate(-0.5vw, -0.5vw);
    border-color: var(--button-color);
  }

  .switch-btn-next {
    transform: rotate(-45deg);
  }

  .switch-btn-prev {
    transform: rotate(135deg);
  }

  .central-panel {
    background-color: lightcoral;
    width: 70vw;
    padding: 0 5vw;
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
  }
  .game-list {
    flex: 1;
    overflow-y: scroll;
  }
  .game-option {
    background-color: green;
    margin: 5% 1%;
    text-align: center;
    padding: 10% 0;
    display: flex;
    flex-direction: column;
    color: white;
    height: 40px;
    justify-content: space-evenly;
  }
</style>
