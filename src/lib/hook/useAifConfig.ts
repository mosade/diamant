import { useForm } from 'react-hook-form'
import { AIBasisConfig, AICategory } from '@/type'
import { useEffect } from 'react'
import { getAiConfig, setAiConfig } from '@/lib/storage'

export function useAifConfig<T extends AIBasisConfig>(aiCategory: AICategory) {
  const form = useForm<T>({
    defaultValues:async () => getAiConfig(aiCategory),
  })
  const { watch } = form
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
        setAiConfig(aiCategory, value)
      },
    )
    return () => subscription.unsubscribe()
  }, [watch])

  return {
    ...form,
  }
}
