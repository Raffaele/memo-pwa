import { writable } from 'svelte/store';

const STORAGE_KEY = 'memoPwa.bestTimes';

const storedBestTime = getJsonLocalStorage(STORAGE_KEY) || {};
export const bestTimesMemory = writable(storedBestTime);

export function saveBestTimeMemory(totalCards, unpairCards, bestTime) {
    const key = getKey(totalCards, unpairCards);
    bestTimesMemory.update(stored => {
        if (stored[key] <= bestTime) return stored;
        return {
            ...stored,
            [key]: bestTime
        };
    });
}

function getKey(totalCards, unpairCards) {
    return `bestTime--${totalCards}--${unpairCards}`;
}

bestTimesMemory.subscribe(value => setJsonLocalStorage(STORAGE_KEY, value));

function setJsonLocalStorage(key, value) {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(key, jsonValue);
}

function getJsonLocalStorage(key) {
    const strValue = localStorage.getItem(key);
    return JSON.parse(strValue);
}
