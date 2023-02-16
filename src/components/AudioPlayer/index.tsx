import Play from "../Icons/Play";

type PropsAudioPlayer = {
    src: string;
};

export default function PlayButton({src}: PropsAudioPlayer) {
    return (
      /*aria-pressed: true -> audio sendo reproduzido, false -> audio mudo, não reproduzido*/
      <>
        <audio src={src}></audio>
        <button
          className="button-play"
          type="button"
          aria-pressed="false"
          aria-label="Button play audio"
        >
          <Play />
        </button>
      </>
    );
}