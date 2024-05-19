import Image from "next/image";
import { FC } from "react";

interface Props {
  classes?: string
}

const Index: FC<Props> = ({ classes }) => {
  return (
    <div className={`relative h-80 max-w-full overflow-hidden rounded-lg ${classes}`}>
      <Image className="absolute z-0" src="/images/6.jpg" fill={true} objectFit="cover" alt="hello world" />
    </div>
  );
};
export default Index;
