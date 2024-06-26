'use client'

import { FC, useEffect, useState } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import axios from '@/api/axiosMiddleware';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ProductIn {
  id: number;
  price_per_unit : number,
  quantity: number,
  comment: string,
  created_at: TimeRanges,
  product: number,
  supplier: number,
  product_name: string,
  supplier_name: string,

}

interface Supplier {
  id: number;
  company_name: string;
  contact_person_name: string;
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


const initialFormIn: FormIn = {
  price_per_unit: 0,
  quantity: 0,
  comment: '',
  product: null,
  product_name: '',
  supplier: null,
  supplier_name: '',
};

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

const Index: FC = () => {
  const [productIn, setProductIn] = useState<ProductIn[]>([]);
  const [formIn, setFormIn] = useState<FormIn>(initialFormIn);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isModalInOpen, setIsModalInOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

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

  const fetchProductIn = async () => {
    try {
      const { data } = await axios.get('/products/in');
      if (Array.isArray(data)) {
        setProductIn(data);
      } else {
        console.error('Data is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
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




  useEffect(() => {
    fetchProductIn();
  }, []);

  useEffect(() => {
    if (isModalInOpen) {
      fetchSuppliers();
      fetchProducts();
    }
  }, [ isModalInOpen]);



  const handleInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/products/in/', JSON.stringify(formIn));
      setIsModalInOpen(false);
    } catch (error) {
      console.error('Error submitting expense data:', error);
    }
  };


  return (
    <section className="container px-24 py-12">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle>Приход продуктов</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Что написать?</CardDescription>
            <CardTitle className="text-4xl"> Нет </CardTitle>
          </CardHeader>
        </Card>

        <div className="ml-auto flex items-center gap-3">
          <Button onClick={() => setIsModalInOpen(true)}>Зафиксировать приход</Button>
        </div>
      </div>
      <Table>
        <TableCaption>Ваши продукты</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Название продукта</TableHead>
            <TableHead>Количество</TableHead>
            <TableHead>Покупная цена за шт</TableHead>
            <TableHead>Общяя сумма</TableHead>
            <TableHead>Поставщик</TableHead>
            <TableHead>Комментарий</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productIn.map((elements) => (
            <TableRow key={elements.id}>
              <TableCell className="font-medium">{elements.id}</TableCell>
              <TableCell className="font-medium">{elements.product_name}</TableCell>
              <TableCell className="font-medium">{elements.quantity}</TableCell>
              <TableCell className="font-medium">{elements.price_per_unit}</TableCell>
              <TableCell className="font-medium">{elements.price_per_unit * elements.quantity}</TableCell>
              <TableCell className="font-medium">{elements.supplier_name}</TableCell>
              <TableCell className="font-medium">{elements.comment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    
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
                onChange={(e) => setFormIn((prev) => ({ ...prev, price_per_unit: parseFloat(e.target.value) }))}
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
