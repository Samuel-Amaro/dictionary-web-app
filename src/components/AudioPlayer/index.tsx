import { DataPhonetic } from "../../types/IDataDictionayAPI";
import { useEffect, useState } from "react";
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
  const [btnIsPressed, setBtnIsPressed] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  );

  function playAudio() {
    if (audioElement && audioElement.readyState >= 2) {
      audioElement.play();
    }
    setBtnIsPressed(!btnIsPressed);
  }

  useEffect(() => {
    const srcMediaAudio = filterAudioPhonetics(phonetics);
    if (srcMediaAudio) {
      const audio = new Audio(srcMediaAudio);
      audio.addEventListener("ended", () => {
        setBtnIsPressed(false);
      });
      setAudioElement(audio);
    } else {
      setAudioElement(null);
    }
  }, [phonetics]);

  return (
    /*aria-pressed: true -> audio sendo reproduzido, false -> audio mudo, não reproduzido*/
    /*srcMediaAudio*/ audioElement ? (
      <div className="container-audio">
        <button
          className="button-play"
          type="button"
          aria-pressed={btnIsPressed}
          aria-label="Button play audio"
          title="Button play audio"
          onPointerDown={() => {
            playAudio();
          }}
          onKeyDown={(event) => {
            if (
              event.key === "Enter" ||
              event.key === " "
            ) {
              playAudio();
            }
          }}
        >
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
