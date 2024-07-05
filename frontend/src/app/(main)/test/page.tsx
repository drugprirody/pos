'use client'
import { FC, useState } from 'react';
import { Label } from '@/components/ui/label';

import { Check, ChevronsUpDown } from "lucide-react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from '@/components/ui/input';

interface Props { };

const backend = [
  {
    id: 1,
    title: 'hello world',
    price: 200,
    available: 200,
  },
  {
    id: 2,
    title: 'hello world2',
    price: 200,
    available: 200,
  },
  {
    id: 3,
    title: 'hello world3',
    price: 200,
    available: 200,
  },
]

const Index: FC<Props> = () => {

  const [selectedData, setSelectedData] = useState<any>([])


  console.log('selectedData', selectedData)

  return (
    <section className=" max-w-[1600px w-full h-screen">
      <div className='p-20'>
        <header className='mb-6'>
          <h1 className='text-3xl font-semibold '>Продаем что то</h1>

        </header>

        <div className='bg-gray-50 px-4 py-2'>

          <div className='flex flex-col space-y-2'>
            <Label className='text-lg font-medium'>Test label</Label>
            <ComboboxDemo selectedData={selectedData} setSelectedData={setSelectedData} />
          </div>
        </div>

        <Table>
          <TableCaption>Список поставщиков</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>title</TableHead>
              <TableHead>price</TableHead>
              <TableHead>quantity</TableHead>
              <TableHead>availabe</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedData && selectedData.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell className="font-medium">{item.price}</TableCell>
                <TableCell className="font-medium">
                  <div className='max-w-64'>
                    <Input placeholder="введите кол-во" onChange={(e) => console.log(e.target.value)} />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{item.available}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
};
export default Index

export function ComboboxDemo({ selectedData, setSelectedData }: any) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? backend.find((item) => item.title === value)?.title
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {backend.map((item) => (
                <CommandItem
                  key={item.title}
                  value={item.title}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setSelectedData((prev: any) => ([...prev, item]));
                    setOpen(false)
                  }}
                >
                  {item.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}