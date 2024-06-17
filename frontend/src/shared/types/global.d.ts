declare global {}

type TabValue = "info" | "dishes";

interface Tab {
  title: string;
  value: TabValue;
}
