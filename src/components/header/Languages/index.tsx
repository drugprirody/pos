import { Languages } from 'lucide-react';
import { FC } from 'react';

interface Props { };

const Index: FC<Props> = () => {
  const langs = ['Русский', "Türkmen"];

  return (
    <button type="button" className="group relative">
      <Languages />
      <div className=" right-0 top-4 box-border w-32 rounded-sm bg-bg-1 py-2 dark:bg-text-[#f2f]">
        <ul className="absolute flex flex-col h-full">
          {langs.map(l => (
            <li key={l} className="h-8 w-full px-3">{l}</li>
          ))}
          <li className="h-8 w-full px-3 py-2">Lorem, ipsum.</li>
        </ul>
      </div>
    </button>)
};
export default Index