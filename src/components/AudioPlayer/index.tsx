import { DataPhonetic } from "../../types/IDataDictionayAPI";
import { useEffect, useRef, useState } from "react";
import Play from "../Icons/Play";

type PropsAudioPlayer = {
  phonetics: DataPhonetic[];
  word: string;
};

function filterAudioPhonetics(phonetics: DataPhonetic[]) {
  const filterAudio = phonetics.filter((dp) => {
    return dp.audio;
  });
  if (filterAudio.length > 0) {
    return filterAudio[0].audio;
  }
  return null;
}

export default function AudioPlayer({ phonetics, word }: PropsAudioPlayer) {
  const refSrcMediaAudio = useRef<string | null>(null);
  const refAudioElement = useRef<HTMLAudioElement>(null);
  const [btnIsPressed, setBtnIsPressed] = useState(false);
  const [mediaIsPlayable, setMediaIsPlayable] = useState(false);

  function playAudio() {
    if (refAudioElement.current && mediaIsPlayable) {
      refAudioElement.current.play();
    }
    setBtnIsPressed(!btnIsPressed);
  }

  useEffect(() => { 
    refSrcMediaAudio.current = filterAudioPhonetics(phonetics);
  }, [phonetics]);

  //TODO: ENCONTRAR UMA FORMA DE DESABILITAR BOTÃO ENQUANTO AUDIO NÃO ESTA PRONTO PARA SER REPRODUZIDO
  //TODO: VERIFICAR SE TRANSCRIÇÃO DO AUDIO ESTA CORRETA, E SE O ARIA-PRESSED ATRIBUTO DO BUTTON ESTA CORRETO

  return (
    /*aria-pressed: true -> audio sendo reproduzido, false -> audio mudo, não reproduzido*/
    refSrcMediaAudio.current ? (
      <div className="container-audio">
        <audio
          ref={refAudioElement}
          src={refSrcMediaAudio.current}
          onLoadedData={() => {
            if (
              refAudioElement.current &&
              refAudioElement.current.readyState >= 3
            ) {
              console.log("pronto pode ouvir");
              setMediaIsPlayable(true);
              return;
            }
            //setMediaIsPlayable(false);
          }}
        ></audio>
        <button
          className="button-play"
          type="button"
          aria-pressed={btnIsPressed}
          aria-label="Button play audio"
          onPointerDown={() => {
            playAudio();
            setBtnIsPressed(false);
          }}
          onKeyDown={(event) => {
            if (
              refAudioElement.current &&
              (event.key === "Enter" || event.key === " ")
            ) {
              playAudio();
              setBtnIsPressed(false);
            }
          }}
          /*disabled={mediaIsPlayable}*/>
          <Play />
        </button>
        <details className="container-audio__details">
          <summary className="container-audio__summary">
            Audio Transcription
          </summary>
          <p className="container-audio__trascription-audio">{word}</p>
        </details>
      </div>
    ) : (
      <span className="message">No audio</span>
    )
  );
}
