import { DataMeaning } from "../../types/IDataDictionayAPI";
import Heading from "../Heading";
import "./ResultArea.css";

type PropsResultArea = {
  meaning: DataMeaning;
};

export default function ResultArea({ meaning }: PropsResultArea) {
  return (
    <section className="result-area">
      <div className="result-area__container">
        <Heading level={3} className="result-area__part-of-speech">
          {meaning.partOfSpeech ? meaning.partOfSpeech : "No part of speech"}
        </Heading>
        <span className="result-area__line-diviser"></span>
      </div>
      <Heading level={4} className="result-area__meaning">
        Meaning
      </Heading>
      {meaning.definitions.length > 0 ? (
        <ul className="list-definitions">
          {meaning.definitions.map((objDefinition, index) => {
            return (
              <li key={index} className="list-definitions__item">
                {/*<span className="list-defitions__marker"></span>*/}
                {objDefinition.example ? (
                  <p className="list-definitions__text">
                    <span className="list-definitions__definition">
                      {objDefinition.definition}
                    </span>
                    <span className="list-definitions__example">
                      {`“${objDefinition.example}”`}
                    </span>
                  </p>
                ) : (
                  <p className="list-definitions__text">
                    {objDefinition.definition}
                  </p>
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
            {meaning.antonyms.join(" ")}
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
