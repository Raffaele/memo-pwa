<script>
  import Router from 'svelte-spa-router';
  import Modal from './components/Modal/Modal.svelte';
  import * as iconsGroup from 'svelte-awesome/icons';
  import Icon from 'svelte-awesome';
  import Home from './screens/Home/Home.svelte';
  import Game from './screens/Game/Game.svelte';
  import NotFound from './screens/NotFound/NotFound.svelte';
  import Default from './screens/Default/Default.svelte';

  import MainIcon from './icons/main-icon.svg';
  const routes = {
    '/': Default,
    '/home/:page': Home,
    '/game/:cards/:unPair': Game,
    '*': NotFound,
  };
  const { bars } = iconsGroup;
  let isOptionModalVisible = false;
</script>

<header>
  <MainIcon width="50" />
  <h1>MEMO PWA</h1>
  <span on:click={() => (isOptionModalVisible = true)}>
    <Icon data={bars} style="width: 40px; height: 55px; margin-right: .1vw" />
  </span>
</header>

<main>
  <Router {routes} />
</main>
{#if isOptionModalVisible}
  <Modal on:tapOnBackground={() => (isOptionModalVisible = false)}>
    Work in progress
  </Modal>
{/if}

<style>
  header {
    background-color: aliceblue;
    display: flex;
    justify-content: space-between;
    padding: 0 2vw;
  }
  h1 {
    color: orange;
    font-size: 2em;
    font-weight: 700;
    margin: 0;
    padding: 0;
    height: 5vh;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 8vh;
  }
  main {
    display: flex;
    flex: 1;
    width: 100vw;
    overflow-x: hidden;
  }
</style>
