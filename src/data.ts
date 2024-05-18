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
