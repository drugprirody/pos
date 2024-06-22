'use client'
import { FC, useEffect, useState } from 'react'
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

interface Category {
  id: number;
  company_name: string;
  contact_person_name: string;
  contact_phone: string;
  comment: string;
  // Добавьте здесь другие поля, если необходимо
}

const Index: FC = () => {
  const [suppliers, setCategory] = useState<Category[]>([]); // Инициализация как пустой массив

  const fetchData = async () => {
    try {
      const { data } = await axios({
        url: '/products/suppliers',
        // params: {} // query
        // data: {} // data
      })
      console.log('data', data)
      if (Array.isArray(data)) { // Убедитесь, что data является массивом
        setCategory(data)
      } else {
        console.error('Data is not an array:', data)
      }
    } catch (err: any) {
      console.log('err', err)
    } 
  }

  useEffect(() => {
    fetchData()
  }, [])



  return (
    <section className="container px-24 py-12">
      <h1 className="text-3xl text-left mb-4">Поставщики</h1>
      <Table>
        <TableCaption>Список поставщиков</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">ID</TableHead>
            <TableHead className="">Имя компании</TableHead>
            <TableHead className="">Имя сотрудника</TableHead>
            <TableHead>Контактный номер сотрудника</TableHead>
            <TableHead>Комментарий</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers.map((supp) => (
            <TableRow key={supp.id}>
              <TableCell className="font-medium">{supp.id}</TableCell>
              <TableCell className="font-medium">{supp.company_name}</TableCell>
              <TableCell className="font-medium">{supp.contact_person_name}</TableCell>
              <TableCell className="font-medium">{supp.contact_phone}</TableCell>
              <TableCell className="font-medium">{supp.comment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}

export default Index
