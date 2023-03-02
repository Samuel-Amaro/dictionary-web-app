import React from "react";
import { DataMeaning } from "../../types/IDataDictionayAPI";
import Heading from "../Heading";
import "./ResultArea.css";

type PropsResultArea = {
  meaning: DataMeaning;
  setWord: React.Dispatch<React.SetStateAction<string>>;
};

export default function ResultArea({ meaning, setWord }: PropsResultArea) {

  function handleEvents(event: React.PointerEvent | React.KeyboardEvent, value: string) {
    //teclado
    if(event instanceof KeyboardEvent) {
      if(event.key === "Enter" || event.key === " ") {
        setWord(value);
       return; 
      }
      return;
    }
    //click
    setWord(value);
  }

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
        <div className="result-area__word-term">
          <Heading level={4} className="result-area__term">
            Antonyms
          </Heading>
          <ul className="result-area__list-term">
            {meaning.antonyms.map((antonym, index) => {
              return (
                <li className="result-area__list-item" key={index}>
                  <button
                    className="result-area__button-action"
                    aria-label={`Search term ${meaning.partOfSpeech} ${antonym}`}
                    type="button"
                    onPointerDown={(event) => {
                      handleEvents(event, antonym);
                    }}
                    onKeyDown={(event) => {
                      handleEvents(event, antonym);
                    }}
                  >
                    {antonym}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {meaning.synonyms.length > 0 && (
        <div className="result-area__word-term">
          <Heading level={4} className="result-area__term">
            Synonyms
          </Heading>
          <ul className="result-area__list-term">
            {meaning.synonyms.map((synonym, index) => {
              return (
                <li className="result-area__list-item" key={index}>
                  <button
                    className="result-area__button-action"
                    aria-label={`Search term ${meaning.partOfSpeech} ${synonym}`}
                    type="button"
                    onPointerDown={(event) => {
                      handleEvents(event, synonym);
                    }}
                    onKeyDown={(event) => {
                      handleEvents(event, synonym);
                    }}
                  >
                    {synonym}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}
