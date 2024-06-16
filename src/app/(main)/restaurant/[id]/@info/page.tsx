'use client'
import { FC } from 'react';

//components
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Banner from '@/components/restaurant/Banner'

import { useRestaurantInfoScheme } from '@/shared/lib/zod';

import { DELIVERY_TIME, TAGS, WORK_TIMES } from '@/data';


interface Props { };

const Index: FC<Props> = ({ params }: any) => {

  const from = WORK_TIMES[0]
  const until = WORK_TIMES[1]


  const { form, onSubmit } = useRestaurantInfoScheme()
  return (
    <div className="w-full px-8 py-6">
      <div className='perfect-scrollbar flex space-x-8  h-[calc(100vh-64px-144px-48px)]'>
        <div className='w-2/3 h-56'>
          <Banner classes="mb-6" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='p-6 border border-dark/10  rounded-lg text-card-light-foreground  space-y-6 text-sm font-medium'>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-dark'>Название заведения</FormLabel>
                      <FormControl>
                        <Input placeholder="Title..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex space-x-8'>
                  <div className='flex-1'>
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className='flex-1'>
                          <FormLabel className='text-dark'>Адрес</FormLabel>
                          <FormControl>
                            <Input placeholder="Address..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* WORKTIME */}
                  <div className='flex space-x-4 items-end flex-1'>
                    <FormField
                      control={form.control}
                      name="workTime.from"
                      render={({ field }) => (
                        <FormItem className='flex-1'>
                          <FormLabel className='text-dark'>Режим работы</FormLabel>
                          <FormControl>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="С" />
                              </SelectTrigger>
                              <SelectContent>
                                {from.map(({ title, value }) => (
                                  <SelectItem key={value} value={value}>{title}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="workTime.until"
                      render={({ field }) => (
                        <FormItem className='flex-1'>
                          <FormControl>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="До" />
                              </SelectTrigger>
                              <SelectContent>
                                {until.map(({ title, value }) => (
                                  <SelectItem key={value} value={value}>{title}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className='flex w-full space-x-8'>
                  <FormField
                    control={form.control}
                    name="deliveryTime"
                    render={({ field }) => (
                      <FormItem className='flex-1'>
                        <FormLabel className='text-dark '>Время доставки</FormLabel>
                        <FormControl>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="С" />
                            </SelectTrigger>
                            <SelectContent>
                              {DELIVERY_TIME.map(({ title, value }) => (
                                <SelectItem key={value} value={value}>{title}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="deliveryTime"
                    render={({ field }) => (
                      <FormItem className='flex-1'>
                        <FormLabel className='text-dark '>Время доставки</FormLabel>
                        <FormControl>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="С" />
                            </SelectTrigger>
                            <SelectContent>
                              {TAGS.map(({ title, value }) => (
                                <SelectItem key={value} value={value}>{title}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className='bg-primary-light darkk:bg-primary-dark text-primary-light-foreground darkk:text-primary-dark-foreground hover:bg-primary-dark darkk:hover:bg-primary-light'>Сохранить</Button>
              </div>
            </form>
          </Form>
        </div>

        <div className='w-1/3 h-56 bg-red-200'>

        </div>
      </div>
    </div>
  )
};
export default Index