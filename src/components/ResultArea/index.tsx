import { DataMeaning } from "../../types/IDataDictionayAPI";

type PropsResultArea = {
  meaning: DataMeaning;
};

export default function ResultArea({ meaning }: PropsResultArea) {
  //TODO: CONSTRUIR COMPONENTE AREA DE RESULTADO BASEADO NOS DADOS DA API
  //console.log(meaning);
  return (
    <section className="result-area">
      <div className="result-area__container">
        <h3 className="result-area__part-of-speech">
          {meaning.partOfSpeech ? meaning.partOfSpeech : "No part of speech"}
        </h3>
        <span className="result-area__line-diviser"></span>
      </div>
      <h4 className="result-area__meaning">Meaning</h4>
      {meaning.definitions.length > 0 ? (
        <ul className="list-definitions">
          {meaning.definitions.map((objDefinition, index) => {
            return (
              <li key={index} className="list-definitions__item">
                <span className="list-definitions__definition">
                  {objDefinition.definition}
                </span>
                {objDefinition.example && (
                  <span className="list-definitions__example">
                    {objDefinition.example}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="result-area__message">No definitions</p>
      )}
      {meaning.antonyms.length > 0 && (
        <p className="result-area__word-term">
          <span className="result-area__term">Antonyms</span>
          <span className="result-area__list-term">
            {meaning.synonyms.join(" ")}
          </span>
        </p>
      )}
      {meaning.synonyms.length > 0 && (
        <p className="result-area__word-term">
          <span className="result-area__term">Synonyms</span>
          <span className="result-area__list-term">
            {meaning.synonyms.join(" ")}
          </span>
        </p>
      )}
    </section>
  );
}
