'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FC, useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';



interface Expense {
  id: number;
  expense_type: number;
  expense_type_name: string;
  total: number;
  payed: number;
  comment: string;
  created_at: string;
}

interface Category {
  id: number;
  name: string
}

type Form = {
  expense_type: number | null;
  total: number;
  payed: number;
  comment: string;
}

const initState = {
  expense_type: null,
  total: 0,
  payed:0,
  comment: ''
}

const Index: FC = () => {
  const [expenses, setExpense] = useState<Expense[]>([]); // Инициализация как пустой массив
  const [form, setForm] = useState<Form>(initState)
  const [types, setCategory] = useState<Category[]>([]); 
  const [openModal, setOpenModal] = useState(false)

  const fetchCategory = async () => {
    try {
      const { data } = await axios({
        url: '/expenses/category',
        // params: {} // query
        // data: {} // datasdasdasd
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


  const fetchData = async () => {
    try {
      const { data } = await axios({
        url: '/expenses',

      })
      console.log('data', data)
      if (Array.isArray(data)) { 
        setExpense(data)
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

  useEffect(() => {
    if (openModal) {
      fetchCategory(); // Вызываем fetchTypes при открытии модального окна
    }
  }, [openModal]);

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const data = JSON.stringify(form)
      await axios({
        url: '/expenses/',
        method: 'POST',
        data
      })
    } catch (err: any) {
      console.log('exspence error', err)
    }
  }

  return (

    <section className="container px-24 py-12">
      {/* <h1 className="text-3xl text-left mb-4">Расходы</h1> */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card
          className="sm:col-span-1 " x-chunk="dashboard-05-chunk-0"
        >
          <CardHeader className="pb-2">
            <CardTitle>Ваши расходы</CardTitle>

          </CardHeader>
          <br />
          <CardFooter>
          <Button onClick={() => setOpenModal(!openModal)} >Добавить</Button>
          </CardFooter>
        </Card>
        <Card x-chunk="dashboard-05-chunk-1">
          <CardHeader className="pb-2">
            <CardDescription>Общий долг</CardDescription>
            <CardTitle className="text-4xl">1,329 TMT</CardTitle>
          </CardHeader>

        </Card>
        <Card x-chunk="dashboard-05-chunk-2">
          <CardHeader className="pb-2">
            <CardDescription>Выплаченные</CardDescription>
            <CardTitle className="text-4xl">5,329 TMT</CardTitle>
          </CardHeader>

        </Card>

        <Card x-chunk="dashboard-05-chunk-2">
          <CardHeader className="pb-2">
            <CardDescription>Общий расход</CardDescription>
            <CardTitle className="text-4xl">7,329 TMT</CardTitle>
          </CardHeader>

        </Card>
      </div>

      <Table>
        <TableCaption>Список расходов</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead >ID</TableHead>
            <TableHead >Категория</TableHead>
            <TableHead >Сумма</TableHead>
            <TableHead>Дата создание</TableHead>
            <TableHead>Комментарий</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((exp) => (
            <TableRow key={exp.id}>
              <TableCell className="font-medium">{exp.id}</TableCell>
              <TableCell className="font-medium">{exp.expense_type_name}</TableCell>
              <TableCell className="font-medium">{exp.total}</TableCell>
              <TableCell className="font-medium">{exp.created_at}</TableCell>
              <TableCell className="font-medium">{exp.comment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {openModal && (
        <div className='w-screen h-screen fixed top-0 left-0 z-40 bg-black/50 flex items-center justify-center'>
          <form className="px-10 py-8 relative bg-blue-300 rounded-md" onSubmit={handleSubmit}>
            <h2 className='text-xl mb-3'>Добавить продукт</h2>
            <div className='flex flex-col gap-4'>
              <button type="button" onClick={() => setOpenModal(!openModal) }  className='absolute top-2.5 right-2.5'><X /></button>

              <div className='flex gap-4'>
                <Input value={form.total} type="number" onChange={(e) => setForm(prev => ({ ...prev, "total": Number(e.target.value) }))} placeholder='Полная сумма' />
                <Input value={form.payed} type="number" onChange={(e) => setForm(prev => ({ ...prev, "payed": Number(e.target.value) }))} placeholder='Оплаченная сумма' />
                <Input value={form.comment} onChange={(e) => setForm(prev => ({ ...prev, "comment": e.target.value }))} placeholder='Комментарий' />
              </div>

              <Select onValueChange={(val) => setForm(prev => ({ ...prev, "expense_type_id": Number(val) }))}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  {types.map(item => (
                    <SelectItem key={item.id} value={String(item.id)}>{item.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

            </div>
            <div className='flex justify-end mt-3'>

              <Button type='submit' className='bg-stone-700 text-white'>Submit</Button>
            </div>
          </form>
        </div>

      )}
    </section>
  )
}

export default Index
