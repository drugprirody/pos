import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Home() {

  const customers = [
    {
      firstname: "INV001",
      phone_number: "+99364758494",
      address: "Himik 33/24",
      balance: "800",
      comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus laborum adipisci commodi assumenda sit quas? Laborum quibusdam iste reprehenderit eum."
    },
    {
      firstname: "INV001",
      phone_number: "+99364758494",
      address: "Himik 33/24",
      balance: "800",
      comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus laborum adipisci commodi assumenda sit quas? Laborum quibusdam iste reprehenderit eum."
    },
    {
      firstname: "INV001",
      phone_number: "+99364758494",
      address: "Himik 33/24",
      balance: "800",
      comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus laborum adipisci commodi assumenda sit quas? Laborum quibusdam iste reprehenderit eum."
    },
    {
      firstname: "INV001",
      phone_number: "+99364758494",
      address: "Himik 33/24",
      balance: "800",
      comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus laborum adipisci commodi assumenda sit quas? Laborum quibusdam iste reprehenderit eum."
    },
    {
      firstname: "INV001",
      phone_number: "+99364758494",
      address: "Himik 33/24",
      balance: "800",
      comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus laborum adipisci commodi assumenda sit quas? Laborum quibusdam iste reprehenderit eum."
    },
    {
      firstname: "INV001",
      phone_number: "+99364758494",
      address: "Himik 33/24",
      balance: "800",
      comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus laborum adipisci commodi assumenda sit quas? Laborum quibusdam iste reprehenderit eum."
    },

    {
      firstname: "INV001",
      phone_number: "+99364758494",
      address: "Himik 33/24",
      balance: "800",
      comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus laborum adipisci commodi assumenda sit quas? Laborum quibusdam iste reprehenderit eum."
    },
    {
      firstname: "INV001",
      phone_number: "+99364758494",
      address: "Himik 33/24",
      balance: "800",
      comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus laborum adipisci commodi assumenda sit quas? Laborum quibusdam iste reprehenderit eum."
    },
    {
      firstname: "INV001",
      phone_number: "+99364758494",
      address: "Himik 33/24",
      balance: "800",
      comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus laborum adipisci commodi assumenda sit quas? Laborum quibusdam iste reprehenderit eum."
    },
    {
      firstname: "INV001",
      phone_number: "+99364758494",
      address: "Himik 33/24",
      balance: "800",
      comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus laborum adipisci commodi assumenda sit quas? Laborum quibusdam iste reprehenderit eum."
    },

  ]
  return (
    <section className="container px-24 py-12">
      <h1 className="text-3xl text-left mb-4">
        Список пользователей
      </h1>
      <Table>
        <TableCaption>A list of your recent customers.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Имя</TableHead>
            <TableHead className="w-[100px]">Телефон</TableHead>
            <TableHead>Баланс</TableHead>
            <TableHead>Адрес</TableHead>
            <TableHead>Коментарий</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((invoice) => (
            <TableRow key={Math.random()}>
              <TableCell className="font-medium">{invoice.firstname}</TableCell>
              <TableCell className="font-medium">{invoice.phone_number}</TableCell>
              <TableCell>{invoice.balance}</TableCell>
              <TableCell className="w-32">{invoice.address}</TableCell>
              <TableCell className="">{invoice.comment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
