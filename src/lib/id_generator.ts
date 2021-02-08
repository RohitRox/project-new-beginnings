import { customAlphabet } from 'nanoid'

const idFunc = customAlphabet('ABCDEF123456789', 6)

export async function uid() {
  return await idFunc()
}