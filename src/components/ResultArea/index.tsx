import { DataMeaning } from "../../types/IDataDictionayAPI";

type PropsResultArea = {
    meanings: DataMeaning[];
};

export default function ResultArea({meanings} : PropsResultArea) {
    //TODO: CONSTRUIR COMPONENTE AREA DE RESULTADO BASEADO NOS DADOS DA API
    return (
      <>
        <section className="result-area__noun">
          <div className="result-area__container">
            <h3 className="result-area__part-of-speech"></h3>
            <span className="result-area__line-diviser"></span>
          </div>
          <h4 className="result-area"></h4>
        </section>
      </>
    );
}