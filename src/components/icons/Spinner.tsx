import Image from 'next/image';

export default function Spinner({ width = 25 }) {
  return <Image src="/assets/loading_spinner.gif" width={width} height={width} alt="Loading..." />;
}
