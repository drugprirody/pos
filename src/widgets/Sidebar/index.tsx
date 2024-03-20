import { FC } from 'react';

interface Props {
  className?: string
};

const Index: FC<Props> = ({ className }) => {
  const items = ['item1', 'item2', 'item3', 'item4', 'item5']

  return (
    <div className={`relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-[calc(100vh-64px)]  p-4 shadow-xl  translate-x-[-100%] w-0`}>
      <div className="mb-2 p-4">
        <h5 className=" font-sans text-xl font-semibold text-text-2">Sidebar</h5>
      </div>
      <nav className=" space-y-3 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
        {items.map(item => (

            <div key={item} role="button" tabIndex={0} className="flex items-center w-full px-3 py-2 rounded-lg leading-tight transition-all hover:bg-onHover focus:bg-accent">
              <div className="mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
                  <path fillRule="evenodd" d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z" clipRule="evenodd"></path>
                </svg>
              </div>
              <p className='text-lg'>
                {item}
              </p>
            </div>
          ))}
      </nav >
    </div >)
};
export default Index