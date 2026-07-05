import { supabase } from '@/lib/supabase'
import type {
  ChecklistItemState,
  ChecklistStateMap,
  ChecklistStatus,
} from '@/types/checklist'

const STATE_TABLE = 'checklist_item_state'
const PHOTO_BUCKET = 'checklist-photos'

interface ChecklistStateRow {
  item_id: number
  statut: ChecklistStatus
  porteur: string | null
  echeance?: string | null
  photo_path: string | null
  updated_at: string
}

interface ChecklistStatePayload {
  eventType: 'INSERT' | 'UPDATE' | 'DELETE'
  new: ChecklistStateRow | Record<string, never>
  old: Partial<ChecklistStateRow>
}

function requireSupabase() {
  if (!supabase) {
    throw new Error('Configurez Supabase pour partager les données avec l’équipe.')
  }

  return supabase
}

function rowToState(row: ChecklistStateRow): ChecklistItemState {
  return {
    itemId: row.item_id,
    statut: row.statut,
    porteur: row.porteur ?? '',
    echeance: row.echeance ?? '',
    photoPath: row.photo_path,
    updatedAt: row.updated_at,
  }
}

export function emptyStateFor(itemId: number): ChecklistItemState {
  return {
    itemId,
    statut: 'Pas fait',
    porteur: '',
    echeance: '',
    photoPath: null,
  }
}

export async function fetchChecklistState(): Promise<ChecklistStateMap> {
  if (!supabase) {
    return {}
  }

  const { data, error } = await supabase
    .from(STATE_TABLE)
    .select('item_id, statut, porteur, photo_path, updated_at')

  if (error) {
    throw error
  }

  return Object.fromEntries((data as ChecklistStateRow[]).map((row) => [row.item_id, rowToState(row)]))
}

export async function saveChecklistState(entry: ChecklistItemState) {
  const client = requireSupabase()
  const { data, error } = await client
    .from(STATE_TABLE)
    .upsert(
      {
        item_id: entry.itemId,
        statut: entry.statut,
        porteur: entry.porteur,
        photo_path: entry.photoPath,
      },
      { onConflict: 'item_id' },
    )
    .select('item_id, statut, porteur, photo_path, updated_at')
    .single()

  if (error) {
    throw error
  }

  return {
    ...rowToState(data as ChecklistStateRow),
    echeance: entry.echeance,
  }
}

export function subscribeChecklistState(
  onUpsert: (entry: ChecklistItemState) => void,
  onDelete: (itemId: number) => void,
) {
  if (!supabase) {
    return () => undefined
  }

  const client = supabase
  const channel = client
    .channel('checklist-item-state')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: STATE_TABLE },
      (payload) => {
        const typedPayload = payload as ChecklistStatePayload
        if (typedPayload.eventType === 'DELETE') {
          const itemId = typedPayload.old.item_id
          if (typeof itemId === 'number') {
            onDelete(itemId)
          }
          return
        }

        onUpsert(rowToState(typedPayload.new as ChecklistStateRow))
      },
    )
    .subscribe()

  return () => {
    void client.removeChannel(channel)
  }
}

export async function uploadChecklistPhoto(
  itemId: number,
  photo: Blob,
  previousPath: string | null,
) {
  const client = requireSupabase()
  const path = `item-${itemId}/${Date.now()}.jpg`
  const { error } = await client.storage.from(PHOTO_BUCKET).upload(path, photo, {
    contentType: 'image/jpeg',
    upsert: true,
  })

  if (error) {
    throw error
  }

  if (previousPath) {
    await client.storage.from(PHOTO_BUCKET).remove([previousPath])
  }

  return path
}

export async function deleteChecklistPhoto(path: string | null) {
  if (!path) {
    return
  }

  const client = requireSupabase()
  const { error } = await client.storage.from(PHOTO_BUCKET).remove([path])

  if (error) {
    throw error
  }
}

export function getPhotoPublicUrl(path: string | null) {
  if (!path || !supabase) {
    return ''
  }

  return supabase.storage.from(PHOTO_BUCKET).getPublicUrl(path).data.publicUrl
}
