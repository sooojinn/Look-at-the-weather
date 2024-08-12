import spinner from '/assets/loading_spinner.gif';

export default function Spinner({ width = 25 }) {
  return <img src={spinner} width={width} className="absolute" alt="Loading..." />;
}
