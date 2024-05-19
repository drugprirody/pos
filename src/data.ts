import {
  AlarmClockCheck,
  AlarmSmoke,
  LucideChevronRight,
  Warehouse,
} from "lucide-react";

export const NAV_ITEMS = [
  { title: "Main", url: "/", Icon: AlarmSmoke },
  { title: "Restaurants", url: "/restaurants", Icon: LucideChevronRight },
  { title: "Restaurant", url: "/restaurant", Icon: AlarmClockCheck },
  { title: "Users", url: "/users", Icon: Warehouse },
  // { title: "additional-2", url: "/additional-2", Icon: LucideChevronRight },
];

export const TABS: Tab[] = [
  {
    title: "Информация",
    value: "info",
  },
  {
    title: "Блюда",
    value: "dishes",
  },
];

export const WORK_TIMES = [
  [
    { title: "06:00", value: "06:00" },
    { title: "07:00", value: "07:00" },
    { title: "08:00", value: "08:00" },
    { title: "09:00", value: "09:00" },
    { title: "10:00", value: "10:00" },
    { title: "11:00", value: "11:00" },
    { title: "12:00", value: "12:00" },
  ],
  [
    { title: "21:00", value: "21:00" },
    { title: "22:00", value: "22:00" },
    { title: "23:00", value: "23:00" },
    { title: "00:00", value: "00:00" },
    { title: "01:00", value: "01:00" },
    { title: "02:00", value: "02:00" },
  ],
];

export const DELIVERY_TIME = [
  { title: "~30", value: "30" },
  { title: "30-60", value: "30-60" },
  { title: "60-90", value: "60-90" },
  { title: "90-120", value: "90-120" },
  { title: "120+", value: "120+" },
];

export const TAGS = [
  { title: "Бургер", value: "Бургер" },
  { title: "Пицца", value: "Пицца" },
  { title: "Вок", value: "Вок" },
  { title: "Шашлык", value: "Шашлык" },
  { title: "Суп", value: "Суп" },
  { title: "Суши", value: "Суши" },
  { title: "Роллы", value: "Роллы" },
  { title: "Картошка фри", value: "Картошка фри" },
];
