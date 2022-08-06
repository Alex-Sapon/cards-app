export const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    // https://developer.mozilla.org/ru/docs/Web/API/FileReader/FileReader
    const reader = new FileReader();

    // https://developer.mozilla.org/ru/docs/Web/API/FileReader/readAsDataURL
    reader.onloadend = () => {
        const file64 = reader.result as string;
        callBack(file64);
    }
    reader.readAsDataURL(file);
}