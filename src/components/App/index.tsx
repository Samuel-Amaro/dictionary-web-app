import { useEffect, useState } from "react";
import IDataDictionayAPI from "../../types/IDataDictionayAPI";
import Header from "../Header";
import "./App.css";
import Heading from "../Heading";
import AudioPlayer from "../AudioPlayer";
import NotFound from "../NotFound";
import fetchDictionaryAPI from "../../api/DictionaryAPI";
import WrapperResult from "../WrapperResult";
import { ThemeContextProvider } from "../../context/ThemeContext";
import Source from "../Source";

function App() {

  const [data, setData] = useState<IDataDictionayAPI | null>(null);
  const [error, setError] = useState(false);
  const [word, setWord] = useState<string>("");

  async function loaderData(word: string) {
    const d = await fetchDictionaryAPI(word);
    if (d) {
      //console.log(d[0]);
      setData(d[0]);
      setError(false);
      setWord(d[0].word);
    } else {
      setData(null);
      setError(true);
    }
  }

  useEffect(() => {
    //se for word vazia nem faz pesquisa
    if (word === "") {
      //loaderData("keyboard");
      return;
    }
    loaderData(word);
  }, [word]);

  return (
    <ThemeContextProvider>
      <Header word={word} setWord={setWord} />
      {error && <NotFound />}
      {data && (
        <main className="wrapper__main">
          <section className="wrapper__section-titles">
            <div className="wrapper__titles">
              <Heading level={1} className="wrapper__title">
                {data.word}
              </Heading>
              <Heading level={2} className="wrapper__subtitle">
                {data.phonetic}
              </Heading>
            </div>
            <AudioPlayer phonetics={data.phonetics} word={data.word} />
          </section>
          <WrapperResult meanings={data.meanings} />
          <Source source={data.sourceUrls}/>
        </main>
      )}
    </ThemeContextProvider>
  );
}

export default App;
