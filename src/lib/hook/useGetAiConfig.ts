import { AIBasisConfig, AICategory } from '@/type'
import { getAiConfig, getAllAiConfig } from '@/lib/storage'
import { useAifConfig } from '@/lib/hook/useAifConfig'
import { useEffect, useState } from 'react'

export function useGetAiConfig() {
  const [aiConfigs, setAiConfigs] = useState<AIBasisConfig[]>([])
  useEffect(() => {
    getAllAiConfig().then((value) => {
      setAiConfigs(Object.values(value ?? {}))
    })

    const onStorageChange = (changes: any, areaName: string) => {
      if (areaName === 'local' && changes.aiConfig) {
        setAiConfigs(Object.values(changes.aiConfig.newValue))
      }
    }
    chrome.storage.onChanged.addListener(onStorageChange)
    return () => {
      chrome.storage.onChanged.removeListener(onStorageChange)
    }
  }, [])
  return {
    aiConfigs, setAiConfigs,
  }
}
