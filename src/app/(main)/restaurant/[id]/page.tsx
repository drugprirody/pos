import { FC } from 'react';

interface Props { };

const Index: FC<Props> = ({ params }: any) => {
  console.log(params)
  return (
    <div className="">page</div>
  )
};
export default Index