// Sidebar-config
import { AlarmSmoke, FootprintsIcon, Book, Airplay, Banana, BarChart, SquareSplitHorizontal,Barcode} from "lucide-react";

export const NAV_ITEMS = [
  { title: "Клиенты", url: "/", Icon: AlarmSmoke },
  { title: "Поставщики", url: "/suppliers", Icon: Banana },
  { title: "Категории -PR", url: "/categories", Icon: Airplay },
  { title: "Расходы", url: "/expenses", Icon: Book },
  { title: "Продукты", url: "/products", Icon: FootprintsIcon },
  { title: "Приход -PR", url: "/products/in", Icon: BarChart },
  { title: "Уход -PR", url: "/products/out", Icon: SquareSplitHorizontal },
  { title: "test", url: "/test", Icon: SquareSplitHorizontal },
];

