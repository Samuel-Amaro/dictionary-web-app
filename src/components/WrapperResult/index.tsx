import { DataMeaning } from "../../types/IDataDictionayAPI";
import ResultArea from "../ResultArea";

type PropsWrapperResult = {
  meanings: DataMeaning[];
};

export default function WrapperResult({meanings} : PropsWrapperResult) {
    return (
        <>
         {
            meanings.map((meaning, index) => {
                return <ResultArea key={index} meaning={meaning}/>
            })
         }
        </>
    );
}