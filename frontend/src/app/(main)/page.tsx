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

  // const customers = [
  // ]

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
            <TableHead className="w-[100px]">Фамилия</TableHead>
            <TableHead className="w-[100px]">Телефон</TableHead>
            <TableHead>Баланс</TableHead>
            <TableHead>Адрес</TableHead>
            <TableHead>Коментарий</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cust?.map((c: any) => (
            <TableRow key={Math.random()}>
              <TableCell className="font-medium">{c.firstname}</TableCell>
              <TableCell className="font-medium">{c.lastname}</TableCell>
              <TableCell className="font-medium">{c.phone_number}</TableCell>
              <TableCell>{c.balance}</TableCell>
              <TableCell className="w-32">{c.address}</TableCell>
              <TableCell className="line-clamp-3">{c.comment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
