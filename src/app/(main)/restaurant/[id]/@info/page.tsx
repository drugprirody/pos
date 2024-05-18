import { FC } from 'react';

interface Props { };

const Index: FC<Props> = ({ params }: any) => {
  console.log('params', params);
  return (
    <div className="">info tab</div>
  )
};
export default Index