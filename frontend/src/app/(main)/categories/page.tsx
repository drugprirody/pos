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
  name: string;
  comment: string;
  // Добавьте здесь другие поля, если необходимо
}

const Index: FC = () => {
  const [categories, setCategory] = useState<Category[]>([]); // Инициализация как пустой массив

  const fetchData = async () => {
    try {
      const { data } = await axios({
        url: '/categories',
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
      <h1 className="text-3xl text-left mb-4">Категории</h1>
      <Table>
        <TableCaption>Список категорий</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">ID</TableHead>
            <TableHead className="">Имя</TableHead>
            <TableHead className="">Комментарий</TableHead>
            <TableHead>Кол-во вида продуктов</TableHead>
            <TableHead>Общее кол-во продуктов</TableHead>
            <TableHead>Сумма стоимости всех продуктов</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((cat) => (
            <TableRow key={cat.id}>
              <TableCell className="font-medium">{cat.id}</TableCell>
              <TableCell className="font-medium">{cat.name}</TableCell>
              <TableCell className="font-medium">{cat.comment}</TableCell>
              <TableCell>0</TableCell> {/* Предположим, что эти данные пока отсутствуют */}
              <TableCell className="w-32">0</TableCell> {/* Предположим, что эти данные пока отсутствуют */}
              <TableCell className="w-32">0</TableCell> {/* Предположим, что эти данные пока отсутствуют */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}

export default Index
