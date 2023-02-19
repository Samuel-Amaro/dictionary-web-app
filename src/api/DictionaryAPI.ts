import IDataDictionayAPI from "../types/IDataDictionayAPI";

const BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/"; 

export default async function fetchDictionaryAPI(word: string): Promise<IDataDictionayAPI[] | null> {
    try {
        const response = await fetch(BASE_URL + word);
        if(!response.ok) {
            throw new Error(response.statusText);
        }
        const datas: IDataDictionayAPI[] = await response.json();
        return datas;
    } catch (e) {
        if(e instanceof TypeError) {
            console.error(e.message);
            console.error(e.cause);
        }
        return null;
    }
    
}