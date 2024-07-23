import { AIBasisConfig, AICategory } from '@/type'

export const AIConfigToken = 'aiConfig'
export const CurrentUsedAiToken = 'currentUsedAi'

export async function getStorage(token: string) {
  return chrome.storage.local.get(token)
}

export async function setStorage(token: string, value: any) {
  return chrome.storage.local.set({ [token]: value })
}

export async function getAiConfig<T extends AIBasisConfig>(name: AICategory) {
  const aiConfig = await getStorage(AIConfigToken)
  console.log('aiConfig', aiConfig)
  console.log(`aiConfig---${name}`, aiConfig[AIConfigToken][name])
  return aiConfig[AIConfigToken][name] as Promise<T>
}
export async function getAllAiConfig(): Promise<{ [key:string]: AIBasisConfig }> {
  const aiConfig = await getStorage(AIConfigToken)
  return aiConfig[AIConfigToken]
}

export async function setAiConfig(name: AICategory, value: any) {
  const aiConfig = await getStorage(AIConfigToken)
  return setStorage(AIConfigToken, {...aiConfig[AIConfigToken], [name]: value })
}

export async function setCurrentUsedAi(value: string) {
  return setStorage(CurrentUsedAiToken, value)
}
export async function getCurrentUsedAi() {
  const res=await getStorage(CurrentUsedAiToken)
  return res[CurrentUsedAiToken]
}

