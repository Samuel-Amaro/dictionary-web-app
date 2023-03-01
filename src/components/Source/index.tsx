import NewWindow from "../Icons/NewWindow";
import "./Source.css";

type PropsSource = {
  source: string[];
};

export default function Source({ source }: PropsSource) {
  return (
    <>
      <hr className="diviser-line" />
      {source.length > 0 && (
        <div className="wrapper__source">
          <span className="wrapper__source-term">Source</span>
          {source.length > 1 ? (
            <div className="wrapper__source-container-links">
              {source.map((source, index) => {
                return (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={source}
                    key={index}
                    className="wrapper__link"
                  >
                    <span className="wrapper__text-link">{source}</span>
                    <NewWindow className="wrapper__icon-link"/>
                  </a>
                );
              })}
            </div>
          ) : (
            <a
              target="_blank"
              rel="noreferrer"
              href={source[0]}
              className="wrapper__link"
            >
              <span className="wrapper__text-link">{source[0]}</span>
              <NewWindow className="wrapper__icon-link"/>
            </a>
          )}
        </div>
      )}
    </>
  );
}
