import { useEffect, useState } from "react";
import useFetch  from "../../hooks/useFetch";
import IDataDictionayAPI from "../../types/IDataDictionayAPI";
import Header from "../Header";
import "./App.css";
import Heading from "../Heading";
import AudioPlayer from "../AudioPlayer";
import NotFound from "../NotFound";
import fetchDictionaryAPI from "../../api/DictionaryAPI";

function App() {
  const[data, setData] = useState<IDataDictionayAPI[]>();
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      const d = await fetchDictionaryAPI("keyboard");
      if(d) {
        setData(d);
      }else{
        setError(true);
      } 
    })();
  }, []);

  return (
    <>
      <Header />
      {error ? (
        <NotFound />
      ) : (
        <div className="wrapper__container">
          <div className="wrapper__titles">
            <Heading level={1} className="wrapper__title">
              Teste Title
            </Heading>
            <Heading level={2} className="wrapper__subtitle">
              Teste Subtitle
            </Heading>
          </div>
          <AudioPlayer src="" />
        </div>
      )}
    </>
  );
}

export default App;
