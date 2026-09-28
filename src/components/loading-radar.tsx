export function LoadingRadar() {
  return (
    <div className="loading-radar" aria-hidden="true">
      <span className="loading-radar-range loading-radar-range-outer" />
      <span className="loading-radar-range loading-radar-range-inner" />
      <span className="loading-radar-sweep" />
      <span className="loading-radar-core" />
      <span className="loading-radar-blip loading-radar-blip-1" />
      <span className="loading-radar-blip loading-radar-blip-2" />
      <span className="loading-radar-blip loading-radar-blip-3" />
    </div>
  );
}
