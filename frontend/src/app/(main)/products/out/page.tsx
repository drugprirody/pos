'use client'

import { FC, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import axios from '@/api/axiosMiddleware';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';



const outChoises = new Map([
  ['defective', 'Брак'],
  ['writeoff', 'Списано'],
  ['home', 'Домой']
]);

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

interface Loss {
  id: number;
  stock_quantity: number;
  movement_status_name: string;
  movement_status: string;
  quantity: number;
  retail_price: number;
  comment: string
  created_at: string;
  product_name: string;
  sum_of_losses: number
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

type FormOut = {
  movement_status: string;
  quantity: number;
  retail_price: number;
  comment: string;
  product: number | null;
}

type LossSum = {
  total_product_out_period: number | null;
}

type FormCategory = {
  name: string;
  comment: string;
}

const initialFormIn: FormOut = {
  movement_status: '',
  quantity: 0,
  retail_price: 0,
  comment: '',
  product: null
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
  const [products, setProducts] = useState<Product[]>([]);
  const [losses, setLosses] = useState<Loss[]>([]);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formOut, setFormOut] = useState<FormOut>(initialFormIn);
  const [formCategory, setFormCategory] = useState<FormCategory>(initialFormCategory);
  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isModalDataOpen, setIsModalDataOpen] = useState(false);
  const [isModalOutOpen, setIsModalOutOpen] = useState(false);
  const [isModalCategoryOpen, setIsModalCategoryOpen] = useState(false);
  const [lossSum, setLossSUm] = useState<LossSum>();



  const fetchLosses = async () => {
    try {
      const { data } = await axios.get('/products/out');
      if (Array.isArray(data)) {
        setLosses(data);
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

  const fetchLossSum = async () => {
    try {
      const { data } = await axios.get('/products/products_loss/sum-period/30/');
      setLossSUm(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    fetchLosses();
    fetchProducts();
    fetchLossSum();
  }, []);

  useEffect(() => {
    if (isModalOutOpen) {
      fetchProducts();
    }
  }, [isModalOutOpen]);



  const handleOutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/products/out/', JSON.stringify(formOut));
      setIsModalOutOpen(false);
    } catch (error) {
      console.error('Error submitting expense data:', error);
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
            <CardDescription>Убытка за последние 30 дней</CardDescription>
            <CardTitle className="text-4xl">{lossSum?.total_product_out_period} TMT</CardTitle>
          </CardHeader>
        </Card>

        <div className="ml-auto flex items-center gap-3">
          <Button onClick={() => setIsModalOutOpen(true)}>Зафиксировать убытку</Button>
        </div>
      </div>
      <Table>
        <TableCaption>Ваши продукты</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Название продукта</TableHead>
            <TableHead>Статус списание</TableHead>
            <TableHead>Количество</TableHead>
            <TableHead>Сумма убытки</TableHead>
            <TableHead>Продажная цена</TableHead>
            <TableHead>Комментарий</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {losses.map((elements) => (
            <TableRow key={elements.id}>
              <TableCell className="font-medium">{elements.id}</TableCell>
              <TableCell className="font-medium">{elements.product_name}</TableCell>
              <TableCell className="font-medium">{elements.movement_status_name}</TableCell>
              <TableCell className="font-medium">{elements.quantity}</TableCell>
              <TableCell className="font-medium">{elements.sum_of_losses}</TableCell>
              <TableCell className="font-medium">{elements.created_at}</TableCell>
              <TableCell className="font-medium">{elements.comment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isModalOutOpen && (
        <Modal title="Зафиксировать убытку" onClose={() => setIsModalOutOpen(false)}>
          <form onSubmit={handleOutSubmit}>
            <div className="flex flex-col gap-4">

              <label htmlFor="products" className="text-sm  text-gray-700">
                Продукт
              </label>
              <Select onValueChange={(val) => {
                const [productId, retailPrice] = val.split('-');
                setFormOut((prev) => ({
                  ...prev,
                  product: Number(productId),
                  retail_price: Number(retailPrice)
                }));
              }}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Выберите продукт" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((elements) => (
                    <SelectItem key={elements.id} value={`${elements.id}-${elements.retail_price}`}>
                      {elements.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>


              <label htmlFor="ubytka" className="text-sm  text-gray-700">
                Статус
              </label>
              <Select onValueChange={(val) => setFormOut((prev) => ({ ...prev, movement_status: val }))}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    { value: 'defective', label: 'Брак' },
                    { value: 'writeoff', label: 'Списано' },
                    { value: 'home', label: 'Домой' },
                  ].map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>


              <label htmlFor="quantity" className="text-sm  text-gray-700">
                Кол-во
              </label>
              <Input
                value={formOut.quantity}
                type='text'
                onChange={(e) => setFormOut((prev) => ({ ...prev, quantity: parseFloat(e.target.value) || 0 }))}
              />

              <label htmlFor="comment" className="text-sm  text-gray-700">
                Комментарий
              </label>
              <Input
                value={formOut.comment}
                onChange={(e) => setFormOut((prev) => ({ ...prev, comment: e.target.value }))}
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
