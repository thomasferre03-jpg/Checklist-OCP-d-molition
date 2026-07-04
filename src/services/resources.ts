import { supabase } from '@/lib/supabase'
import type { AssociatedResource, ResourceType } from '@/types/resource'

const RESOURCES_TABLE = 'resources'
const DEFAULT_RESOURCE_BUCKET = 'resources'

interface ResourceRow {
  id: string
  item_id: number
  title: string | null
  type: ResourceType
  url: string
  storage_bucket: string | null
  created_at: string
}

function rowToResource(row: ResourceRow): AssociatedResource {
  return {
    id: row.id,
    itemId: row.item_id,
    title: row.title || fallbackTitle(row),
    type: row.type,
    url: row.url,
    storageBucket: row.storage_bucket,
    createdAt: row.created_at,
  }
}

function fallbackTitle(row: ResourceRow) {
  if (row.type === 'link') {
    return row.url
  }

  const pathParts = row.url.split('/').filter(Boolean)
  return pathParts[pathParts.length - 1] || 'Ressource'
}

function isExternalUrl(url: string) {
  return /^https?:\/\//i.test(url)
}

export async function fetchResourcesForItem(itemId: number): Promise<AssociatedResource[]> {
  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .from(RESOURCES_TABLE)
    .select('id, item_id, title, type, url, storage_bucket, created_at')
    .eq('item_id', itemId)
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return (data as ResourceRow[]).map(rowToResource)
}

export function getResourceDisplayUrl(resource: AssociatedResource) {
  if (isExternalUrl(resource.url) || !supabase) {
    return resource.url
  }

  const bucket = resource.storageBucket || DEFAULT_RESOURCE_BUCKET
  return supabase.storage.from(bucket).getPublicUrl(resource.url).data.publicUrl
}

export function getResourceDownloadUrl(resource: AssociatedResource) {
  if (isExternalUrl(resource.url)) {
    return resource.url
  }

  const displayUrl = getResourceDisplayUrl(resource)
  const separator = displayUrl.includes('?') ? '&' : '?'
  return `${displayUrl}${separator}download=${encodeURIComponent(resource.title)}`
}
