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
                  <a target="_blank" rel="noreferrer" href={source} key={index}>
                    {source}
                  </a>
                );
              })}
            </div>
          ) : (
            <a target="_blank" rel="noreferrer" href={source[0]}>
              {source[0]}
            </a>
          )}
        </div>
      )}
    </>
  );
}
