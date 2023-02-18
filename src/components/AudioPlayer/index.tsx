import { DataPhonetic } from "../../types/IDataDictionayAPI";
import { useEffect, useRef, useState } from "react";
import Play from "../Icons/Play";

type PropsAudioPlayer = {
  phonetics: DataPhonetic[];
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

export default function AudioPlayer({ phonetics }: PropsAudioPlayer) {
  const refSrcMediaAudio = useRef<string | null>(null);
  const refAudioElement = useRef<HTMLAudioElement>(null);
  const [btnIsPressed, setBtnIsPressed] = useState(false);

  function playAudio() {
    if(refAudioElement.current) {
      refAudioElement.current.play();
    }
    setBtnIsPressed(!btnIsPressed);
  }

  useEffect(() => {
    refSrcMediaAudio.current = filterAudioPhonetics(phonetics);
  }, [phonetics]);

  return (
    /*aria-pressed: true -> audio sendo reproduzido, false -> audio mudo, não reproduzido*/
    <>
      {refSrcMediaAudio.current && (
        <audio ref={refAudioElement} src={refSrcMediaAudio.current}></audio>
      )}
      <button
        className="button-play"
        type="button"
        aria-pressed={btnIsPressed}
        aria-label="Button play audio"
        onPointerDown={() => {
          playAudio();
        }}
        onKeyDown={(event) => {
          if (
            refAudioElement.current &&
            (event.key === "Enter" || event.key === " ")
          ) {
            playAudio();
          }
        }}
      >
        <Play />
      </button>
    </>
  );
}
