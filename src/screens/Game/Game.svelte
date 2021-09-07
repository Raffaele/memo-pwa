<script>
    import Icon from 'svelte-awesome';
    import { home } from 'svelte-awesome/icons';
    import { getRandomIcons } from '../../lib/icons';
    import { shuffle } from '../../lib/array';
    const gameIcons = getRandomIcons();

    import {bestTimesMemory, saveBestTimeMemory} from '../../stores/bestTimes';
    let recordTime;
    bestTimesMemory.subscribe(value => recordTime = value);

    import {pop} from 'svelte-spa-router'
    import { onMount } from 'svelte';
    export let params;
    let selectedCard = -1;
    let isTemporaryBlocked = false;
    let numOfCouples;
    let cards;
    let cardMap;
    let totalPaired;
    let timeStart;
    let timeDiff = 0;
    let intervalId;
    let won = false;

    onMount(()=>{
        // console.log('on mount');
        // startGame(params);
    });

    $: numOfCards = params.cards;
    $: unPair = params.unPair;

    $: {
        startGame(params);
    }

    $: {
        won = totalPaired === numOfCouples;
        if (won) {
            saveBestTimeMemory(params.cards, params.unPair, +timeDiff);
            clearInterval(intervalId);
            intervalId = null;
        }
    }
    function startGame(params) {
        numOfCouples = (params.cards - params.unPair)/2;
        resetGame();
    }

    function resetGame() {
        totalPaired = 0;
        cardMap = getCardMap(params.cards);
        cards = createCards(numOfCouples, params.unPair);
        timeStart = null;
        intervalId = null;
        timeDiff = '0.00';
    }
    $: cardLines = getCardLines(cards, cardMap);

    function getCardMap(mapSize) {
        const sortedArray = Array.from({length: mapSize})
            .map((_, i) => i);

        return shuffle(sortedArray);
    }

    function createCards(numOfCouples, numOfUnpair) {
        const completeCouples = Array.from({length: numOfCouples}).map((_, i) => [i, i]).flat();
        const notRepeated = Array.from({length: numOfUnpair}).map((_, i) => i + numOfCouples);
        return [...completeCouples, ...notRepeated].map((value, index) => ({
            index,
            value,
            status: 'hidden'
        }));
    }

    function getCardLines(cards, cardMap) {
        const lineSizes = getLineSizes(cards);
        const shafledCards = cardMap.map(i => cards[i]);
        return  lineSizes.map(lineSize => 
            shafledCards.splice(0, lineSize)
        );
    }

    function getLineSizes(totalCards) {
        const numOfCards = totalCards.length;
        const minNumOfLines = Math.trunc(Math.sqrt(numOfCards));
        const isMinNumOfLinesValid = numOfCards <= minNumOfLines*(minNumOfLines+1);
        const numOfLines = isMinNumOfLinesValid ? minNumOfLines : minNumOfLines + 1;
        const extraCards = numOfCards - numOfLines * minNumOfLines;
        const lineSizes = Array.from({length: numOfLines}).map((_, i) => minNumOfLines + (i<extraCards));
        return lineSizes;
    }

    function updateCard(index, status) {
        cards = cards.map((c, i) => i === index ? {...c, status} : c);
    }

    function startTime() {
        timeStart = new Date();
        intervalId = setInterval(() => {
            const diff = (new Date() - timeStart)/1000;
            timeDiff = diff.toFixed(2);
        }, 10);
    }

    function handleCardClick(card) {
        if (!timeStart) {
            startTime();
        }
        const cardStatus = card.status;
        if (cardStatus !== 'hidden' || isTemporaryBlocked) {
            return;
        }
        updateCard(card.index, 'tmp-shown');
        if (selectedCard === -1) {
            selectedCard = card.index;
            return;
        }
        if (card.value === cards[selectedCard].value) {
            updateCard(card.index, 'paired');
            updateCard(selectedCard, 'paired');
            selectedCard = -1;
            totalPaired = cards.filter(c => c.status === 'paired').length / 2;
            return;
        }
        updateCard(selectedCard, 'wrong');
        updateCard(card.index, 'wrong');
        isTemporaryBlocked = true;
        setTimeout(() => {
            updateCard(selectedCard, 'hidden');
            updateCard(card.index, 'hidden');
            isTemporaryBlocked = false;
            selectedCard = -1;
        }, 800);
    }
</script>

<div class="page">
    <div class="first-line">
        <div class="home-button" on:click={pop}>
            <Icon data={home} />
        </div>
        <div class="timer">
            {timeDiff || '0.00'} secs
        </div>
        <div class="partial-result">
            {totalPaired}/{numOfCouples}
        </div>
    </div>
    <div class="game-grid">
        {#each cardLines as cardLine}
            <div class="game-line">
                {#each cardLine as singleCard}
                    <div class="card status--{singleCard.status}" on:click={() => handleCardClick(singleCard)}>
                        {#if singleCard.status !== 'hidden'}
                            <Icon data={gameIcons[singleCard.value]} scale="2" />
                        {/if}
                        
                    </div>
                {/each}
            </div>
        {/each}
    </div>
    {#if won}
    <div class="win-disclaimer">
        <div>You won</div>
        <button on:click={resetGame}>Reset</button>
    </div>
    {/if}
</div>


<style>
    .page {
        width: 100%;
        height: 90vh;
        display: flex;
        flex-direction: column;
        background-color: azure;
    }

    .game-line {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }

    .game-grid {
        padding: 2vh 2vw;
    }

    .game-field {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }

    .card.status--wrong {
        border-color: red;
    }

    .card {
        width: 10vw;
        height: 10vh;
        text-align: center;
        margin: 1%;
        background-color: gray;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 5px solid transparent;
        font-weight: bolder;
        border-color: orange;
        border-radius: 5px;
    }

    .card.status--hidden {
        border-color: transparent;
    }

    .card.status--paired {
        border-color: green;
        color: blue;
        background-color: cyan;
    }
    .first-line {
        display: flex;
        flex-direction:row;
        justify-content: space-between;
        background-color: lightseagreen;
        color: white;
        align-items: center;
        padding: 1vh 2vw;
    }
    .partial-result,
    .home-button,
    .timer {
        background-color: rgba(255, 0, 0, .5);
        padding: 6px;
        border-radius: 6px;
    }

    .win-disclaimer {
        background-color: rgba(255, 0, 0, .5);
    }
</style>