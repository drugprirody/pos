'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import axios from '@/api/axiosMiddleware'
import { useEffect, useState } from "react"

export default function Home() {
  const [cust, setCust] = useState<any>()
  const fetchData = async () => {

    try {
      const { data } = await axios({
        url: '/customers',
        // params: {} //query
        // data: {} //data
      })

      if (data) {
        setCust(data)
      }
    } catch (err: any) {
      console.log('err', err)
    }
  }

  const customers = [
    {
      firstname: "INV001",
      phone_number: "+99364758494",
      address: "Himik 33/24",
      balance: "800",
      comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus laborum adipisci commodi assumenda sit quas? Laborum quibusdam iste reprehenderit eum."
    },
    {
      firstname: "INV001",
      phone_number: "+99364758494",
      address: "Himik 33/24",
      balance: "800",
      comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus laborum adipisci commodi assumenda sit quas? Laborum quibusdam iste reprehenderit eum."
    },
    {
      firstname: "INV001",
      phone_number: "+99364758494",
      address: "Himik 33/24",
      balance: "800",
      comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus laborum adipisci commodi assumenda sit quas? Laborum quibusdam iste reprehenderit eum."
    },
    {
      firstname: "INV001",
      phone_number: "+99364758494",
      address: "Himik 33/24",
      balance: "800",
      comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus laborum adipisci commodi assumenda sit quas? Laborum quibusdam iste reprehenderit eum."
    },
    {
      firstname: "INV001",
      phone_number: "+99364758494",
      address: "Himik 33/24",
      balance: "800",
      comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus laborum adipisci commodi assumenda sit quas? Laborum quibusdam iste reprehenderit eum."
    },
    {
      firstname: "INV001",
      phone_number: "+99364758494",
      address: "Himik 33/24",
      balance: "800",
      comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus laborum adipisci commodi assumenda sit quas? Laborum quibusdam iste reprehenderit eum."
    },

    {
      firstname: "INV001",
      phone_number: "+99364758494",
      address: "Himik 33/24",
      balance: "800",
      comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus laborum adipisci commodi assumenda sit quas? Laborum quibusdam iste reprehenderit eum."
    },
    {
      firstname: "INV001",
      phone_number: "+99364758494",
      address: "Himik 33/24",
      balance: "800",
      comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus laborum adipisci commodi assumenda sit quas? Laborum quibusdam iste reprehenderit eum."
    },
    {
      firstname: "INV001",
      phone_number: "+99364758494",
      address: "Himik 33/24",
      balance: "800",
      comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus laborum adipisci commodi assumenda sit quas? Laborum quibusdam iste reprehenderit eum."
    },
    {
      firstname: "INV001",
      phone_number: "+99364758494",
      address: "Himik 33/24",
      balance: "800",
      comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus laborum adipisci commodi assumenda sit quas? Laborum quibusdam iste reprehenderit eum."
    },

  ]

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <section className="container px-24 py-12">
      <h1 className="text-3xl text-left mb-4">
        Список пользователей
      </h1>
      <Table>
        <TableCaption>A list of your recent customers.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Имя</TableHead>
            <TableHead className="w-[100px]">Телефон</TableHead>
            <TableHead>Баланс</TableHead>
            <TableHead>Адрес</TableHead>
            <TableHead>Коментарий</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((cust) => (
            <TableRow key={Math.random()}>
              <TableCell className="font-medium">{cust.firstname}</TableCell>
              <TableCell className="font-medium">{cust.phone_number}</TableCell>
              <TableCell>{cust.balance}</TableCell>
              <TableCell className="w-32">{cust.address}</TableCell>
              <TableCell className="line-clamp-3">{cust.comment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
