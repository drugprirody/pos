import Image from "next/image";
import { Button } from "@/components/ui/Button/";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button variant="secondary">hello</Button>
      <h1>hello world</h1>
    </main>
  );
}
