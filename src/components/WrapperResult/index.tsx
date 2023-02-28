import { DataMeaning } from "../../types/IDataDictionayAPI";
import ResultArea from "../ResultArea";

type PropsWrapperResult = {
  meanings: DataMeaning[];
  setWord: React.Dispatch<React.SetStateAction<string>>;
};

export default function WrapperResult({meanings,setWord} : PropsWrapperResult) {
    return (
        <>
         {
            meanings.map((meaning, index) => {
                return <ResultArea key={index} meaning={meaning} setWord={setWord}/>
            })
         }
        </>
    );
}