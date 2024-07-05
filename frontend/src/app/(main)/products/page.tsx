'use client'

import { FC, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import axios from '@/api/axiosMiddleware';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import useDebounce from '@/hooks/useDebounce';

interface Product {
  id: number;
  name: string;
  category: number;
  product_category_name: string;
  stock_quantity: number;
  retail_price: number;
  product_supplier_company_name: string;
  purchase_price: string;
  comment: string
}

interface Category {
  id: number;
  name: string;
}

interface Supplier {
  id: number;
  company_name: string;
  contact_person_name: string;
}

type FormData = {
  name: string,
  category: number | null,
  product_category_name: string,
  stock_quantity: number,
  retail_price: number,
  supplier: number | null,
  product_supplier_company_name: string,
  purchase_price: number,
  comment: string,
}

type FormIn = {
  price_per_unit: number,
  quantity: number,
  comment: string,
  product: number | null,
  product_name: string,
  supplier: number | null,
  supplier_name: string,
}

type TurnOver = {
  total_turnover: number | null;
}

type FormCategory = {
  name: string;
  comment: string;
}

const initialFormIn: FormIn = {
  price_per_unit: 0,
  quantity: 0,
  comment: '',
  product: null,
  product_name: '',
  supplier: null,
  supplier_name: '',
};

const initialFormData: FormData = {
  name: '',
  category: null,
  product_category_name: '',
  stock_quantity: 0,
  retail_price: 0,
  supplier: null,
  product_supplier_company_name: '',
  purchase_price: 0,
  comment: '',
};

const initialFormCategory: FormCategory = {
  name: '',
  comment: '',
};

const Index: FC = () => {

  //states
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formIn, setFormIn] = useState<FormIn>(initialFormIn);
  const [formCategory, setFormCategory] = useState<FormCategory>(initialFormCategory);
  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isModalDataOpen, setIsModalDataOpen] = useState(false);
  const [isModalInOpen, setIsModalInOpen] = useState(false);
  const [isModalCategoryOpen, setIsModalCategoryOpen] = useState(false);
  const [turnOver, setTurnOver] = useState<TurnOver>();


  const [search, setSearch] = useState('')
  const debouncedValue: string = useDebounce(search, 500);

  //functions
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('/products/categories');
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        console.error('Data is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const { data } = await axios.get('/products/suppliers');
      if (Array.isArray(data)) {
        setSuppliers(data);
      } else {
        console.error('Data is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/products');
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.error('Data is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const fetchTurnOver = async () => {
    try {
      const { data } = await axios.get('/products/turnover');
      setTurnOver(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchTurnOver();
  }, []);

  useEffect(() => {
    if (isModalDataOpen || isModalInOpen) {
      fetchCategories();
      fetchSuppliers();
    }
  }, [isModalDataOpen, isModalInOpen]);

  const handleDataSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/products/', JSON.stringify(formData));
      console.log('Form data', formData)
      setIsModalDataOpen(false);
    } catch (error) {
      console.error('Error submitting expense data:', error);
    }
  };

  const handleInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/products/in/', JSON.stringify(formIn));
      setIsModalInOpen(false);
    } catch (error) {
      console.error('Error submitting expense data:', error);
    }
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/products/categories/', JSON.stringify(formCategory));
      setIsModalCategoryOpen(false);
    } catch (error) {
      console.error('Error submitting category data:', error);
    }
  };
  const test = () => {
    console.log("test")
  }

  useEffect(() => {
    if (debouncedValue) {

      test()
    }
  }, [debouncedValue])

  return (
    <section className="container px-24 py-12">
      <div className="flex space-y-4 flex-col mb-6">
        <div className='flex space-x-6'>
          <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle>Ваши продукты</CardTitle>
          </CardHeader>
          </Card>
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardDescription>Оборот</CardDescription>
              <CardTitle className="text-4xl">{turnOver?.total_turnover} TMT</CardTitle>
            </CardHeader>
          </Card>
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardDescription>Сегодняшняя выручка</CardDescription>
              <CardTitle className="text-4xl"> 200 TMT</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className=" flex justify-between items-center space-x-8">
          <div className='flex-1 max-w-80'>
            <Input className='w-full' placeholder='Поиск...' value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className='space-x-2'>
          <Button onClick={() => setIsModalDataOpen(true)}>Добавить продукт</Button>
          <Button onClick={() => setIsModalInOpen(true)}>Зафиксировать приход</Button>
          <Button onClick={() => setIsModalCategoryOpen(true)}>Добавить категорию</Button>
          </div>
        </div>
      </div>
      <Table>
        <TableCaption>Ваши продукты</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Название</TableHead>
            <TableHead>Остаток на складе</TableHead>
            <TableHead>Покупная цена</TableHead>
            <TableHead>Поставщик</TableHead>
            <TableHead>Продажная цена</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((elements) => (
            <TableRow key={elements.id}>
              <TableCell className="font-medium">{elements.id}</TableCell>
              <TableCell className="font-medium">{elements.name}</TableCell>
              <TableCell className="font-medium">{elements.stock_quantity}</TableCell>
              <TableCell className="font-medium">{elements.retail_price}</TableCell>
              <TableCell className="font-medium">{elements.product_supplier_company_name}</TableCell>
              <TableCell className="font-medium">{elements.purchase_price}</TableCell>
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
        <Modal title="Добавить продукт" onClose={() => setIsModalDataOpen(false)}>
          <form onSubmit={handleDataSubmit} className='w-full'>
            <div className="flex flex-col gap-4">

              <Input
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Название нового продукта"
              />

              <label htmlFor="stockQuantity" className="text-sm  text-gray-700">
                Шт. на складе
              </label>
              <Input
                value={formData.stock_quantity}
                onChange={(e) => setFormData((prev) => ({ ...prev, stock_quantity: Number(e.target.value) }))}
                placeholder="Название нового продукта"
              />

              <label htmlFor="retailPrice" className="text-sm  text-gray-700">
                Покупная цена
              </label>
              <Input
                value={formData.retail_price}
                onChange={(e) => setFormData((prev) => ({ ...prev, retail_price: Number(e.target.value) }))}
                placeholder="Покупная цена"
              />

              <label htmlFor="purchasePrice" className="text-sm  text-gray-700">
                Продажная цена
              </label>
              <Input
                value={formData.purchase_price}
                onChange={(e) => setFormData((prev) => ({ ...prev, purchase_price: Number(e.target.value) }))}
                placeholder="Продажная цена"
              />

              <div className='flex space-x-4 '>

                <div>

              <label htmlFor="supplier" className="text-sm  text-gray-700">
                Поставщик
              </label>
              <Select onValueChange={(val) => setFormData((prev) => ({ ...prev, supplier: Number(val) }))}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Выберите поставщика" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((elements) => (
                    <SelectItem key={elements.id} value={String(elements.id)}>
                      {elements.company_name} | | {elements.contact_person_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
                </div>

                <div>

              <label htmlFor="category" className="text-sm  text-gray-700">
                Категория продукта
              </label>
              <Select onValueChange={(val) => setFormData((prev) => ({ ...prev, category: Number(val) }))}>
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

              </div>

            </div>
            <div className="flex justify-end mt-3">
              <Button type="submit" className="bg-stone-700 text-white">Submit</Button>
            </div>
          </form>
        </Modal>
      )}

      {isModalInOpen && (
        <Modal title="Зафиксировать приход" onClose={() => setIsModalInOpen(false)}>
          <form onSubmit={handleInSubmit}>
            <div className="flex flex-col gap-4">

              <label htmlFor="products" className="text-sm  text-gray-700">
                Продукт
              </label>
              <Select onValueChange={(val) => setFormIn((prev) => ({ ...prev, product: Number(val) }))}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Выберите продукт" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((elements) => (
                    <SelectItem key={elements.id} value={String(elements.id)}>
                      {elements.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <label htmlFor="supplier" className="text-sm  text-gray-700">
                Поставщик
              </label>
              <Select onValueChange={(val) => setFormIn((prev) => ({ ...prev, supplier: Number(val) }))}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Выберите поставщика" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((elements) => (
                    <SelectItem key={elements.id} value={String(elements.id)}>
                      {elements.company_name} || {elements.contact_person_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>


              <label htmlFor="pricePerUnit" className="text-sm  text-gray-700">
                Цена за шт.
              </label>
              <Input
                value={formIn.price_per_unit}
                type='number'
                onChange={(e) => setFormIn((prev) => ({ ...prev, price_per_unit: Number(e.target.value) }))}
              />

              <label htmlFor="pricePerUnit" className="text-sm  text-gray-700">
                Кол-во пришедших.
              </label>
              <Input
                value={formIn.quantity}
                type='text'
                onChange={(e) => setFormIn((prev) => ({ ...prev, quantity: parseFloat(e.target.value)||0 }))}
              />

              <label htmlFor="comment" className="text-sm  text-gray-700">
                Комментарий
              </label>
              <Input
                value={formIn.comment}
                onChange={(e) => setFormIn((prev) => ({ ...prev, comment: e.target.value }))}
              />


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
    <div className="px-10 py-8 relative bg-blue-300 rounded-md w-[500px]">
      <h2 className="text-xl mb-3">{title}</h2>
      <button type="button" onClick={onClose} className="absolute top-2.5 right-2.5">
        <X />
      </button>

      {children}
    </div>
  </div>
);

export default Index;
