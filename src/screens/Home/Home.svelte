<script>
  import Modal from '../../components/Modal/Modal.svelte';
  export let params;
  let bestTimes;
  import { bestTimesMemory } from '../../stores/bestTimes';
  bestTimesMemory.subscribe((value) => {
    bestTimes = value;
  });
  const UNPAIR_VALUES = [0, 2, 4, 6];
  const pages = UNPAIR_VALUES.map((unpair) => ({ unpair }));
  import HomeGroup from '../../components/HomeGroup/HomeGroup.svelte';
  $: displacement = (params?.page || 0) * 100;
  let unpairCards;
</script>

<section style="transform: translateX(-{displacement}vw)">
  {#each pages as page, index}
    <HomeGroup
      {page}
      nextLink={index + 1}
      prevLink={index - 1}
      maxPage={pages.length}
      timeMemory={bestTimes}
      on:explanationAsk={(event) => {
        unpairCards = event.detail;
      }}
    />
  {/each}
</section>
{#if unpairCards}
  <Modal>
    <Modal on:tapOnBackground={() => (unpairCards = null)}>
      <div slot="title">Unpair cards:</div>
      <p>
        To make the game more interesting, the challenges on this section have
        <strong>{unpairCards}</strong>
        cards that are not paired.
        <br />
        Find all the pairs ignoring the unpaired cards and you'll win
      </p>
    </Modal>
  </Modal>
{/if}

<style>
  section {
    display: flex;
    transition: transform 0.3s;
  }
</style>
