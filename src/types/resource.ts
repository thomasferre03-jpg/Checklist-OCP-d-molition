export type ResourceType = 'link' | 'image' | 'pdf'

export interface AssociatedResource {
  id: string
  itemId: number
  title: string
  type: ResourceType
  url: string
  storageBucket: string | null
  createdAt: string
}
