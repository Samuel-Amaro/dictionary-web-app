export default interface IDataDictionayAPI {
    word: string;
    phonetic: string;
    phonetics: DataPhonetic[];
    origin: string;
    meanings: DataMeaning[];
    sourceURls: string[];
    license: DataLicense;
}

export interface DataPhonetic {
    text: string;
    audio: string;
    license: DataLicense;
    sourceUrl: string;
}

export interface DataMeaning {
    partOfSpeech: string;
    definitions: DataDefinition[];
}

export interface DataDefinition {
    definition: string;
    example: string;
    synonyms: [];
    antonyms: [];
}

interface DataLicense {
    name: string;
    url: string;
}