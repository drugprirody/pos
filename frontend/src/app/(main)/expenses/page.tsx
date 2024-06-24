'use client'

import { FC, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import axios from '@/api/axiosMiddleware';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

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
  name: string;
}

type FormData = {
  expense_category: number | null;
  total: number;
  comment: string;
}

type SumPeriod = {
  total_expense: number;
}

type FormCategory = {
  name: string;
  comment: string;
}

const initialFormData: FormData = {
  expense_category: null,
  total: 0,
  comment: '',
};

const initialFormCategory: FormCategory = {
  name: '',
  comment: '',
};

const Index: FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formCategory, setFormCategory] = useState<FormCategory>(initialFormCategory);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalDataOpen, setIsModalDataOpen] = useState(false);
  const [isModalCategoryOpen, setIsModalCategoryOpen] = useState(false);
  const [sumPeriod1, setSumPeriod1] = useState<SumPeriod>();
  const [sumPeriod2, setSumPeriod2] = useState<SumPeriod>();

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('/expenses/categories');
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        console.error('Data is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const { data } = await axios.get('/expenses');
      if (Array.isArray(data)) {
        setExpenses(data);
      } else {
        console.error('Data is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const fetchSumPeriod = async (days: number, setSumPeriod: (sumPeriod: SumPeriod) => void) => {
    try {
      const { data } = await axios.get(`/expenses/sum-period/${days}/`);
      setSumPeriod(data);
    } catch (error) {
      console.error(`Error fetching sum period for ${days} days:`, error);
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchSumPeriod(7, setSumPeriod1);
    fetchSumPeriod(30, setSumPeriod2);
  }, []);

  useEffect(() => {
    if (isModalDataOpen) {
      fetchCategories();
    }
  }, [isModalDataOpen]);

  const handleDataSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/expenses/', JSON.stringify(formData));
      setIsModalDataOpen(false);
    } catch (error) {
      console.error('Error submitting expense data:', error);
    }
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/expenses/categories/', JSON.stringify(formCategory));
      setIsModalCategoryOpen(false);
    } catch (error) {
      console.error('Error submitting category data:', error);
    }
  };

  return (
    <section className="container px-24 py-12">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card className="sm:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle>Ваши расходы</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>За последние 30 дней</CardDescription>
            <CardTitle className="text-4xl">{sumPeriod2?.total_expense} TMT</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>За последние 7 дней</CardDescription>
            <CardTitle className="text-4xl">{sumPeriod1?.total_expense} TMT</CardTitle>
          </CardHeader>
        </Card>
        <div className="ml-auto flex items-center gap-3">
          <Button onClick={() => setIsModalDataOpen(true)}>Зафиксировать расход</Button>
          <Button onClick={() => setIsModalCategoryOpen(true)}>Добавить категорию</Button>
        </div>
      </div>
      <Table>
        <TableCaption>Список расходов</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Категория</TableHead>
            <TableHead>Сумма</TableHead>
            <TableHead>Дата создание</TableHead>
            <TableHead>Комментарий</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell className="font-medium">{expense.id}</TableCell>
              <TableCell className="font-medium">{expense.expense_category_name}</TableCell>
              <TableCell className="font-medium">{expense.total}</TableCell>
              <TableCell className="font-medium">{expense.created_at}</TableCell>
              <TableCell className="font-medium">{expense.comment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isModalCategoryOpen && (
        <Modal title="Добавить категорию" onClose={() => setIsModalCategoryOpen(false)}>
          <form onSubmit={handleCategorySubmit}>
            <div className="flex flex-col gap-4">
              <Input
                value={formCategory.name}
                onChange={(e) => setFormCategory((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Название категории"
              />
              <Input
                value={formCategory.comment}
                onChange={(e) => setFormCategory((prev) => ({ ...prev, comment: e.target.value }))}
                placeholder="Комментарий"
              />
            </div>
            <div className="flex justify-end mt-3">
              <Button type="submit" className="bg-stone-700 text-white">Submit</Button>
            </div>
          </form>
        </Modal>
      )}
      {isModalDataOpen && (
        <Modal title="Зафиксировать расход" onClose={() => setIsModalDataOpen(false)}>
          <form onSubmit={handleDataSubmit}>
            <div className="flex flex-col gap-4">
              <Input
                value={formData.total}
                type="number"
                onChange={(e) => setFormData((prev) => ({ ...prev, total: Number(e.target.value) }))}
              />
              <Input
                value={formData.comment}
                onChange={(e) => setFormData((prev) => ({ ...prev, comment: e.target.value }))}
                placeholder="Комментарий"
              />
              <Select onValueChange={(val) => setFormData((prev) => ({ ...prev, expense_category: Number(val) }))}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={String(category.id)}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end mt-3">
              <Button type="submit" className="bg-stone-700 text-white">Submit</Button>
            </div>
          </form>
        </Modal>
      )}
    </section>
  );
};

const Modal: FC<{ title: string; onClose: () => void; children: React.ReactNode }> = ({ title, onClose, children }) => (
  <div className="w-screen h-screen fixed top-0 left-0 z-40 bg-black/50 flex items-center justify-center">
    <div className="px-10 py-8 relative bg-blue-300 rounded-md">
      <h2 className="text-xl mb-3">{title}</h2>
      <button type="button" onClick={onClose} className="absolute top-2.5 right-2.5">
        <X />
      </button>
      {children}
    </div>
  </div>
);

export default Index;
