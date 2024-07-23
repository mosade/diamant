import * as React from 'react'


import { AIBasisConfig, AICategory } from '@/type'
import { useAifConfig } from '@/lib/hook/useAifConfig'
import { ConfigForm, FormConfig } from '@/options/component/general/configForm'

export function DeepSeekConfig() {
  const form = useAifConfig<AIBasisConfig>(AICategory.DeepSeek)
  const formConfig: FormConfig[] = [
    {
      name: 'name',
      label: 'name',
      defaultValue: 'DeepSeek',
      type: 'Input',
      placeholder: 'DeepSeek',
      description: 'Name of your DeepSeek',
      readOnly: true,
    },
    {
      name: 'url',
      label: 'Url',
      defaultValue: 'https://api.deepseek.com',
      type: 'Input',
      placeholder: 'enter you ai url',
      description: 'This is your custom AI url.',
    },
    {
      name: 'apiKey',
      label: 'Api key',
      defaultValue: '',
      type: 'Input',
      placeholder: 'enter secret key',
      description: 'This is your ai secret key.',
    },
    {
      name:'model',
      label:'Model',
      type:'Input',
      defaultValue:'deepseek-chat',
      placeholder:' model name',
    }
  ]
  return (
    <ConfigForm title="DeepSeek Config" useFormReturn={form} formConfigs={formConfig}></ConfigForm>
  )
}
