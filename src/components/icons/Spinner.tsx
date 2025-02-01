import Image from 'next/image';
import spinner from '@/assets/loading_spinner.gif';

export default function Spinner({ width = 25 }) {
  return <Image src={spinner} width={width} height={width} alt="Loading..." priority />;
}
