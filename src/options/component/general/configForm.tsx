import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import * as React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { AIBasisConfig } from '@/type'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export interface FormConfig {
  name: string;
  label: string;
  defaultValue: any;
  type: 'Input';
  placeholder: string;
  description: string;
  readOnly?: boolean;
}

export function ConfigForm(props: {title:string, useFormReturn: UseFormReturn, formConfigs: FormConfig[] }) {
  const { useFormReturn: form, formConfigs ,title} = props
  return <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <Form {...form}>
        <form className="space-y-8">
          {formConfigs.map(config => <FormField
            key={config.name}
            defaultValue={config.defaultValue}
            control={form.control}
            name={config.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{config.label}</FormLabel>
                <FormControl>
                  <Input readOnly={config.readOnly} placeholder={config.placeholder} {...field} />
                </FormControl>
                <FormDescription>
                  {config.description}
                </FormDescription>
              </FormItem>
            )}
          />)}
        </form>
      </Form>
    </CardContent>
  </Card>
}
