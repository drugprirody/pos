'use client'
import { FC, useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { DoorClosedIcon, FolderClosed, X } from 'lucide-react';

interface Props {
  close: () => void
};

type Form = {
  name: string,
  photo: null | File,
  retail_price: string
}

const initState: Form = {
  name: '',
  photo: null,
  retail_price: ''
}

const Index: FC<Props> = ({ close }) => {

  const [form, setForm] = useState(initState)
  const handleSubmit = (e: any) => {
    e.preventDefault()
  }

  useEffect(() => {
    console.log(form)
  }, [form])
  return (
    <div className='w-screen h-screen fixed top-0 left-0 z-40 bg-black/50 flex items-center justify-center'>
      <form className="px-10 py-8 relative bg-blue-300 rounded-md" onSubmit={handleSubmit}>
        <h2 className='text-xl mb-3'>Добавить продукт</h2>
        <div className='flex flex-col gap-4'>
          <button onClick={close} className='absolute top-2.5 right-2.5'><X /></button>

          <div className='flex gap-4'>
            <Input onChange={(e) => setForm(prev => ({ ...prev, "name": e.target.value }))} placeholder='name' />
            <Input onChange={(e) => setForm(prev => ({ ...prev, "retail_price": e.target.value }))} placeholder='name' />
          </div>

          <input onChange={(e) => setForm(prev => ({ ...prev, "photo": e.target.files![0] }))} type="file" className='file:bg-blue-400 file:text-white' />

        </div>
        <div className='flex justify-end mt-3'>

          <Button className='bg-stone-700 text-white'>Submit</Button>
        </div>
      </form>
    </div>

  )
};
export default Index