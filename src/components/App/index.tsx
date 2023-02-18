import { useEffect, useState } from "react";
import IDataDictionayAPI from "../../types/IDataDictionayAPI";
import Header from "../Header";
import "./App.css";
import Heading from "../Heading";
import AudioPlayer from "../AudioPlayer";
import NotFound from "../NotFound";
import fetchDictionaryAPI from "../../api/DictionaryAPI";

function App() {
  const [data, setData] = useState<IDataDictionayAPI | null>(null);
  const [error, setError] = useState(false);
  const [word, setWord] = useState<string>('');

  useEffect(() => {
    (async () => {
      const d = await fetchDictionaryAPI("keyboard");
      if (d) {
        //console.log(d[0]);
        setData(d[0]);
        setError(false);
        setWord(d[0].word);
      } else {
        setData(null);
        setError(true);
        setWord('');
      }
    })();
  }, []);

  return (
    <>
      <Header />
      {error && <NotFound />}
      {data && (
        <div className="wrapper__container">
          <div className="wrapper__titles">
            <Heading level={1} className="wrapper__title">
              {data.word}
            </Heading>
            <Heading level={2} className="wrapper__subtitle">
              {data.phonetic}
            </Heading>
          </div>
          <AudioPlayer phonetics={data.phonetics} />
        </div>
      )}
    </>
  );
}

export default App;
