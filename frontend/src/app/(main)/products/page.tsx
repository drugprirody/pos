'use client'

import { FC, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import axios from '@/api/axiosMiddleware';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

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

type TurnOver = {
  total_turnover: number | null;
}

type FormCategory = {
  name: string;
  comment: string;
}

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
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formCategory, setFormCategory] = useState<FormCategory>(initialFormCategory);
  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isModalDataOpen, setIsModalDataOpen] = useState(false);
  const [isModalCategoryOpen, setIsModalCategoryOpen] = useState(false);
  const [turnOver, setTurnOver] = useState<TurnOver>();

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
    if (isModalDataOpen) {
      fetchCategories();
      fetchSuppliers();
    }
  }, [isModalDataOpen]);

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

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/products/categories/', JSON.stringify(formCategory));
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
            <CardTitle>Ваши продукты</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Денег на обороте</CardDescription>
            <CardTitle className="text-4xl">{turnOver?.total_turnover} TMT</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Сегодняшяя выручка</CardDescription>
            <CardTitle className="text-4xl"> Undefined TMT</CardTitle>
          </CardHeader>
        </Card>

        <div className="ml-auto flex items-center gap-3">
          <Button onClick={() => setIsModalDataOpen(true)}>Добавить продукт</Button>
          <Button onClick={() => setIsModalCategoryOpen(true)}>Добавить категорию</Button>
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
          <form onSubmit={handleDataSubmit}>
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
