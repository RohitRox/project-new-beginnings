export interface IStore {
  find:   <T>(id: string) => T
  create: <T>(id: string, props: T) => void
  update: <T>(id: string, props: T) => void
  delete: (id: string) => void
}