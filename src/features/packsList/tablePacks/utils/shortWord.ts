export const shortWord = (word: string, num: number) => {
    if (word.length > num) {
        return `${word.slice(0, num)}...`;
    }

    return word;
}