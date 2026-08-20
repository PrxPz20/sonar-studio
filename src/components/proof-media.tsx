export function ProofMedia() {
  return (
    <figure className="proof-media">
      <div className="proof-shot proof-before">
        <div className="proof-placeholder" role="img" aria-label="Before screenshot will be supplied by the owner">
          <span>BEFORE</span><p>Real screenshot pending</p>
        </div>
      </div>
      <div className="proof-shot proof-after">
        <div className="proof-placeholder proof-placeholder-active" role="img" aria-label="After screenshot will be supplied by the owner">
          <span>AFTER</span><p>Real screenshot pending</p>
        </div>
      </div>
      <figcaption>Before and after. Real screenshots, unedited.</figcaption>
    </figure>
  );
}
