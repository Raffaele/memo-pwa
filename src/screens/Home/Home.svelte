<script>
    export let params;
    let bestTimes;
    import {bestTimesMemory} from '../../stores/bestTimes';
    bestTimesMemory.subscribe(value => {
        bestTimes = value;
    })
    const UNPAIR_VALUES = [0, 2, 4, 6];
    const pages = UNPAIR_VALUES.map(unpair => ({unpair}));
    import HomeGroup from '../../components/HomeGroup/HomeGroup.svelte';
    $: displacement = (params?.page||0) * 100;
</script>


<section style="transform: translateX(-{displacement}vw)">
    {#each pages as page, index}
        <HomeGroup page={page} nextLink={index+1} prevLink={index-1} maxPage={pages.length} timeMemory={bestTimes} />
    {/each}
</section>

<style>
    section {
        display: flex;
        transition: transform .3s;
    }
</style>
