export function shuffle(arr, sizeShuffledArray = arr.length) {
    let result = [];
    const arrCopy = [...arr];
    while(result.length < sizeShuffledArray) {
        const randomIndex = Math.floor(Math.random() * arrCopy.length);
        const extracted = arrCopy.splice(randomIndex, 1);
        result = result.concat(extracted);
    }
    return result;
}