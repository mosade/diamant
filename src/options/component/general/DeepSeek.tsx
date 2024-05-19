import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface AIBasisConfig {
  url: string;
  apiKey: string;
  model: string | string[];
}

export function DeepSeekConfig() {
  const form = useForm<AIBasisConfig>()
  return (
    <Card>
      <CardHeader>
        <CardTitle>DeepSeek Config</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-8">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Url</FormLabel>
                  <FormControl>
                    <Input placeholder="enter you ai url" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your custom AI url.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Api key</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="enter secret key" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your ai secret key.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Input placeholder="enter model" {...field} />
                  </FormControl>
                  <FormDescription>
                    The model you are using for AI purposes.
                  </FormDescription>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
