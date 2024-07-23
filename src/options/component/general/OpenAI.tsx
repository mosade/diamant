import { useAifConfig } from '@/lib/hook/useAifConfig'
import { AIBasisConfig, AICategory } from '@/type'
import { ConfigForm, FormConfig } from '@/options/component/general/configForm'

export function OpenAIConfig() {
  const form = useAifConfig<AIBasisConfig>(AICategory.OpenAI)
  const formConfig: FormConfig[] = [
    {
      name: 'name',
      label: 'name',
      defaultValue: 'OpenAI',
      type: 'Input',
      placeholder: 'OpenAI',
      description: 'Name of your OpenAI',
      readOnly:true
    },
    {
      name: 'url',
      label: 'Url',
      defaultValue: 'https://api.openai.com',
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
  ]
  return <ConfigForm title="OpenAI Config" useFormReturn={form} formConfigs={formConfig} />
}
