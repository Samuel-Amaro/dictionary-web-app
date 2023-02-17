export default function NotFound() {
  return (
    <div className="notfound">
      <span className="notfound__icon">😕</span>
      <h3 className="notfound__description">No Definitions Found</h3>
      <p className="notfound__message">
        Sorry pal, we couldn't find definitions for the word you were looking
        for. You can try the search again at later time or head to the web
        instead.
      </p>
    </div>
  );
}
