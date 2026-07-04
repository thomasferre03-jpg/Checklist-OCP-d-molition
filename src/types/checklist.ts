export type ChecklistStatus = 'Fait' | 'Pas fait'

export interface ChecklistItem {
  id: number
  phase: string
  categorie: string
  action: string
  bonnePratique: string
}

export interface ChecklistItemState {
  itemId: number
  statut: ChecklistStatus
  porteur: string
  photoPath: string | null
  updatedAt?: string
}

export type ChecklistStateMap = Record<number, ChecklistItemState>

export interface PhaseStats {
  total: number
  done: number
  pct: number
}
