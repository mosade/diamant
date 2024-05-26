import * as React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AIBasisConfig, AICategory } from '@/type'
import { useAifConfig } from '@/lib/hook/useAifConfig'

export function DeepSeekConfig() {
  const form =useAifConfig<AIBasisConfig>(AICategory.DeepSeek)

  return (
    <Card>
      <CardHeader>
        <CardTitle>DeepSeek Config</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-8">
            <FormField
              defaultValue='DeepSeek'
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <FormControl>
                    <Input readOnly  {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              defaultValue='https://api.deepseek.com'
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
              defaultValue=''
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
              defaultValue=''
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
