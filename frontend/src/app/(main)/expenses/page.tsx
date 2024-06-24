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
import { X, PlusCircle } from 'lucide-react';



interface Expense {
  id: number;
  expense_category: number;
  expense_category_name: string;
  total: number;
  payed: number;
  comment: string;
  created_at: string;
}

interface Category {
  id: number;
  name: string
}

type FormData = {
  expense_category: number | null;
  total: number;
  comment: string;
}

type SumPeriod = {
  total_expense: number
}

type FormCategory = {
  name: string;
  comment: string;
}

const initStateData = {
  expense_category: null,
  total: 0,
  payed: 0,
  comment: ''
}
const initStateCategory = {
  name: '',
  comment: ''
}

const Index: FC = () => {
  const [expenses, setExpense] = useState<Expense[]>([])
  const [formData, setFormData] = useState<FormData>(initStateData)
  const [formCategory, setFormCategory] = useState<FormCategory>(initStateCategory)
  const [categories, setCategory] = useState<Category[]>([])
  const [openModalData, setOpenModalData] = useState(false)
  const [openModalCategory, setOpenModalCategory] = useState(false)
  const [sumPeriod1, setSumPeriod1] = useState<SumPeriod>()
  const [sumPeriod2, setSumPeriod2] = useState<SumPeriod>()

  const fetchCategory = async () => {
    try {
      const { data } = await axios({
        url: '/expenses/categories',
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

  const fetchSumPeriod1 = async (day1: number) => {
    try {
      const { data } = await axios({
        url: '/expenses/sum-period/' + day1 +'/',
      })
      setSumPeriod1(data)
    } catch (err: any) {
      console.log('err', err)
    }
  }

  const fetchSumPeriod2 = async (day2: number) => {
    try {
      const { data } = await axios({
        url: '/expenses/sum-period/' + day2  +'/',
      })
      setSumPeriod2(data)
    } catch (err: any) {
      console.log('err', err)
    }
  }


  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchSumPeriod1(7)
  }, [])

  useEffect(() => {
    fetchSumPeriod2(30)
  }, [])


  useEffect(() => {
    if (openModalData) {
      fetchCategory();
    }
  }, [openModalData]);

  const handleSubmitData = async (e: any) => {
    e.preventDefault()
    try {
      const data = JSON.stringify(formData)
      await axios({
        url: '/expenses/',
        method: 'POST',
        data
      })
    } catch (err: any) {
      console.log('exspence error', err)
    }
    setOpenModalData(!openModalData)
  }

  const handleSubmitCategory = async (e: any) => {
    e.preventDefault()
    try {
      const data = JSON.stringify(formCategory)
      await axios({
        url: '/expenses/categories/',
        method: 'POST',
        data
      })
    } catch (err: any) {
      console.log('exspense category error', err)
    }
    setOpenModalCategory(!openModalCategory)
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
          </CardFooter>
        </Card>
        <Card x-chunk="dashboard-05-chunk-1">
          <CardHeader className="pb-2">
            <CardDescription>За последние 30 дней</CardDescription>
            <CardTitle className="text-4xl">                 
            {sumPeriod2?.total_expense} TMT
            </CardTitle>
          </CardHeader>

        </Card>
        <Card x-chunk="dashboard-05-chunk-2">
          <CardHeader className="pb-2">
            <CardDescription>За последние 7 дней</CardDescription>
            <CardTitle className="text-4xl">{sumPeriod1?.total_expense} TMT</CardTitle>
          </CardHeader>

        </Card>

        <div className="ml-auto flex items-center gap-3">
          <Button onClick={() => setOpenModalData(!openModalData)} >Зафиксировать расход</Button>
          <Button onClick={() => setOpenModalCategory(!openModalCategory)} >Добавить категорию</Button>
        </div>
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
              <TableCell className="font-medium">{exp.expense_category_name}</TableCell>
              <TableCell className="font-medium">{exp.total}</TableCell>
              <TableCell className="font-medium">{exp.created_at}</TableCell>
              <TableCell className="font-medium">{exp.comment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {openModalCategory && (
        <div className='w-screen h-screen fixed top-0 left-0 z-40 bg-black/50 flex items-center justify-center'>
          <form className="px-10 py-8 relative bg-blue-300 rounded-md" onSubmit={handleSubmitCategory}>
            <h2 className='text-xl mb-3'>Добавить категорию</h2>
            <div className='flex flex-col gap-4'>
              <button type="button" onClick={() => setOpenModalCategory(!openModalCategory)} className='absolute top-2.5 right-2.5'><X /></button>

              <div className='flex gap-4'>
                <Input value={formCategory.name} type="string" onChange={(e) => setFormCategory(prev => ({ ...prev, "name": e.target.value }))} placeholder='Название категории' />
                <Input value={formCategory.comment} onChange={(e) => setFormCategory(prev => ({ ...prev, "comment": e.target.value }))} placeholder='Комментарий' />
              </div>
            </div>

            <div className='flex justify-end mt-3'>
              <Button type='submit' className='bg-stone-700 text-white'>Submit</Button>
            </div>
          </form>
        </div>

      )}
      {openModalData && (
        <div className='w-screen h-screen fixed top-0 left-0 z-40 bg-black/50 flex items-center justify-center'>
          <form className="px-10 py-8 relative bg-blue-300 rounded-md" onSubmit={handleSubmitData}>
            <h2 className='text-xl mb-3'>Зафиксировать расход</h2>
            <div className='flex flex-col gap-4'>
              <button type="button" onClick={() => setOpenModalData(!openModalData)} className='absolute top-2.5 right-2.5'><X /></button>

              <div className='flex gap-4'>
                <Input value={formData.total} type="number" onChange={(e) => setFormData(prev => ({ ...prev, "total": Number(e.target.value) }) )}/>
                <Input value={formData.comment} onChange={(e) => setFormData(prev => ({ ...prev, "comment": e.target.value }))} placeholder='Комментарий' />
              </div>

              <Select onValueChange={(val) => setFormData(prev => ({ ...prev, "expense_category": Number(val) }))}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(item => (
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
