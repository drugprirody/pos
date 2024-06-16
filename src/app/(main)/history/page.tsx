import { FC } from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
  ;
import Image from 'next/image';

interface Props {
};

const Index: FC<Props> = ({ }) => {

  const movements = [
    {
      product_id: Math.round(Math.random() * 1000),
      movement_status: 'Cheese',
      quantity: "54",
      moved_by_id: Math.round(Math.random() * 1000),
      created_at: "22.10.2024"
    },
    {
      product_id: Math.round(Math.random() * 1000),
      movement_status: 'Cheese',
      quantity: "54",
      moved_by_id: Math.round(Math.random() * 1000),
      created_at: "22.10.2024"
    },

    {
      product_id: Math.round(Math.random() * 1000),
      movement_status: 'Cheese',
      quantity: "54",
      moved_by_id: Math.round(Math.random() * 1000),
      created_at: "22.10.2024"
    },

    {
      product_id: Math.round(Math.random() * 1000),
      movement_status: 'Cheese',
      quantity: "54",
      moved_by_id: Math.round(Math.random() * 1000),
      created_at: "22.10.2024"
    },

    {
      product_id: Math.round(Math.random() * 1000),
      movement_status: 'Cheese',
      quantity: "54",
      moved_by_id: Math.round(Math.random() * 1000),
      created_at: "22.10.2024"
    },



  ]
  return (
    <section className="container px-24 py-12">
      <h1 className="text-3xl text-left mb-4">История </h1>
      <Table>
        <TableCaption>A list of your recent customers.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">ID</TableHead>
            <TableHead className="">Количество</TableHead>
            <TableHead className="">Статус</TableHead>
            <TableHead>Исполнитель</TableHead>
            <TableHead>Дата создания</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movements.map((invoice) => (
            <TableRow key={Math.random()}>
              <TableCell className="font-medium">{invoice.product_id}</TableCell>
              <TableCell className=" font-medium">{invoice.quantity}</TableCell>
              <TableCell className="font-medium ">{invoice.movement_status}</TableCell>
              <TableCell >{invoice.moved_by_id}</TableCell>
              <TableCell className="w-32">{invoice.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
};
export default Index