import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import IDataDictionayAPI from "../../types/IDataDictionayAPI";
import Header from "../Header";
import "./App.css";
import Heading from "../Heading";
import AudioPlayer from "../AudioPlayer";

function App() {

  /*const response = useFetch<IDataDictionayAPI[]>(
    "https://api.dictionaryapi.dev/api/v2/entries/en/keyboard"
  );

  useEffect(() => {
    if (response.data?.length) {
      console.log(response.data[0]);
    }
    console.log(response.error);
  }, []);
  */

  return (
    <>
      <Header />
      <div className="wrapper__container">
        <div className="wrapper__titles">
          <Heading level={1} className="wrapper__title">
            Teste Title
          </Heading>
          <Heading level={2} className="wrapper__subtitle">
            Teste Subtitle
          </Heading>
        </div>
        <AudioPlayer />
      </div>
    </>
  );
}

export default App;
