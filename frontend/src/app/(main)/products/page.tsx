'use client'
import { FC, useState } from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from 'next/image';
import { Button } from '@/components/ui/button';

import AddProduct from '@/components/add-product'

interface Props {
};

const Index: FC<Props> = ({ }) => {
  const [open, setOpen] = useState(false)
  const products = [
    {
      category_id: Math.round(Math.random() * 1000),
      name: 'Cheese',
      photo: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=1173",
      stock_quantity: "20",
      retail_price: "300"
    },
    {
      category_id: Math.round(Math.random() * 1000),
      name: 'Cheese',
      photo: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=1173",
      stock_quantity: "20",
      retail_price: "300"
    },
    {
      category_id: Math.round(Math.random() * 1000),
      name: 'Cheese',
      photo: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=1173",
      stock_quantity: "20",
      retail_price: "300"
    },
    {
      category_id: Math.round(Math.random() * 1000),
      name: 'Cheese',
      photo: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=1173",
      stock_quantity: "20",
      retail_price: "300"
    },
    {
      category_id: Math.round(Math.random() * 1000),
      name: 'Cheese',
      photo: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=1173",
      stock_quantity: "20",
      retail_price: "300"
    },

    {
      category_id: Math.round(Math.random() * 1000),
      name: 'Cheese',
      photo: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=1173",
      stock_quantity: "20",
      retail_price: "300"
    },
    {
      category_id: Math.round(Math.random() * 1000),
      name: 'Cheese',
      photo: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=1173",
      stock_quantity: "20",
      retail_price: "300"
    },
    {
      category_id: Math.round(Math.random() * 1000),
      name: 'Cheese',
      photo: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=1173",
      stock_quantity: "20",
      retail_price: "300"
    },

  ]
  return (
    <section className="container px-24 py-12">
      <h1 className="text-3xl text-left mb-4">Продукты</h1>
      <div className='w-full flex items-center justify-end h-20'>
        <Button onClick={() => setOpen(!open)} className='bg-blue-300 text-black hover:bg-blue-400'>Добавить</Button>
      </div>


      <Table>
        <TableCaption>A list of your recent customers.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">ID</TableHead>
            <TableHead className="">Название</TableHead>
            <TableHead className=" w-[220px]">Изображение</TableHead>
            <TableHead>Остаток</TableHead>
            <TableHead>Цена</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((invoice) => (
            <TableRow key={Math.random()}>
              <TableCell className="font-medium">{invoice.category_id}</TableCell>
              <TableCell className=" font-medium">{invoice.name}</TableCell>
              <TableCell className="font-medium ">
                <Image src={invoice.photo} width={120} height={60} className='rounded-md object-cover' alt={invoice.name} />
              </TableCell>
              <TableCell >{invoice.stock_quantity}</TableCell>
              <TableCell className="w-32">{invoice.retail_price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {open && (
        <AddProduct close={() => setOpen(false)} />
      )}
    </section>
  )
};
export default Index