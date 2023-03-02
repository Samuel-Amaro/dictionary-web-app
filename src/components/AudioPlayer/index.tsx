import { DataPhonetic } from "../../types/IDataDictionayAPI";
import { useEffect, useState } from "react";
import "./AudioPlayer.css";

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
  const [mediaIsLoaded, setMediaIsLoaded] = useState(false);

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
        //setMediaIsLoaded(false);
      });
      audio.addEventListener("loadeddata", () => {
        if(audio.readyState >= 2) {
          setMediaIsLoaded(true);
        }
      });
      setAudioElement(audio);
    } else {
      setAudioElement(null);
    }
  }, [phonetics]);

  return audioElement ? (
    <button
      className={
        mediaIsLoaded ? "button-play" : "button-play button-play--padding"
      }
      type="button"
      aria-pressed={btnIsPressed}
      aria-label="Button play audio"
      title="Button play audio"
      onPointerDown={() => {
        playAudio();
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          playAudio();
        }
      }}
    >
      {mediaIsLoaded ? (
        <span className="container-audio__icon"></span>
      ) : (
        <span className="message__loader"></span>
      )}
    </button>
  ) : (
    <span className="message__alert">No audio</span>
  );
  
}
