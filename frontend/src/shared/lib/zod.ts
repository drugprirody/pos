"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const workTime = z.object({
  from: z.string().min(2).max(50),
  until: z.string().min(2).max(50),
});

const restaurantInfoSchema = z.object({
  title: z.string().min(2).max(50),
  address: z.string().min(2).max(50),
  workTime,
  deliveryTime: z.string().min(2).max(50),
  tags: z.array(z.string()),
  description: z.string().min(2).max(50),
});

export const useRestaurantInfoScheme = () => {
  const form = useForm<z.infer<typeof restaurantInfoSchema>>({
    resolver: zodResolver(restaurantInfoSchema),
    defaultValues: {
      title: "",
      address: "",
      workTime: { from: "", until: "" },
      deliveryTime: "",
      tags: [],
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof restaurantInfoSchema>) {
    console.log(values);
  }

  return { form, onSubmit };
};
