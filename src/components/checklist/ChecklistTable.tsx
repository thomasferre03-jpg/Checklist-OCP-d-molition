import { useEffect, useState } from 'react'
import { Check, ChevronRight } from 'lucide-react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cleanText } from '@/lib/text'
import type { ChecklistItem, ChecklistItemState } from '@/types/checklist'

interface ChecklistTableProps {
  entriesByItemId: (itemId: number) => ChecklistItemState
  items: ChecklistItem[]
  onOpenDetails: (item: ChecklistItem) => void
  onOwnerChange: (itemId: number, porteur: string) => void
  onToggleStatus: (itemId: number) => void
}

interface OwnerCellProps {
  entry: ChecklistItemState
  itemId: number
  onOwnerChange: (itemId: number, porteur: string) => void
}

function OwnerCell({ entry, itemId, onOwnerChange }: OwnerCellProps) {
  const [draftPorteur, setDraftPorteur] = useState(entry.porteur)

  useEffect(() => {
    setDraftPorteur(entry.porteur)
  }, [entry.porteur])

  useEffect(() => {
    if (draftPorteur === entry.porteur) {
      return undefined
    }

    const timer = window.setTimeout(() => {
      onOwnerChange(itemId, draftPorteur)
    }, 500)

    return () => window.clearTimeout(timer)
  }, [draftPorteur, entry.porteur, itemId, onOwnerChange])

  return (
    <input
      className="table-owner-input"
      onChange={(event) => setDraftPorteur(event.target.value)}
      placeholder="Porteur"
      type="text"
      value={draftPorteur}
    />
  )
}

export function ChecklistTable({
  entriesByItemId,
  items,
  onOpenDetails,
  onOwnerChange,
  onToggleStatus,
}: ChecklistTableProps) {
  return (
    <div className="checklist-table-shell">
      <Table className="checklist-table">
        <TableHeader>
          <TableRow>
            <TableHead className="status-col">Statut</TableHead>
            <TableHead className="category-col">Categorie</TableHead>
            <TableHead>Action</TableHead>
            <TableHead className="owner-col">Porteur</TableHead>
            <TableHead className="details-col">Detail</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const entry = entriesByItemId(item.id)
            const isDone = entry.statut === 'Fait'

            return (
              <TableRow className={isDone ? 'is-fait' : 'is-pasfait'} key={item.id}>
                <TableCell>
                  <button
                    aria-label={`Marquer ${cleanText(item.action)} comme ${isDone ? 'pas fait' : 'fait'}`}
                    className={`toggle-btn ${isDone ? 'fait' : 'pasfait'}`}
                    onClick={() => onToggleStatus(item.id)}
                    type="button"
                  >
                    {isDone ? (
                      <>
                        <Check size={14} /> Fait
                      </>
                    ) : (
                      'Pas fait'
                    )}
                  </button>
                </TableCell>
                <TableCell>
                  <span className="cat-tag">{cleanText(item.categorie)}</span>
                </TableCell>
                <TableCell>
                  <button className="table-action-btn" onClick={() => onOpenDetails(item)} type="button">
                    {cleanText(item.action)}
                  </button>
                </TableCell>
                <TableCell>
                  <OwnerCell entry={entry} itemId={item.id} onOwnerChange={onOwnerChange} />
                </TableCell>
                <TableCell>
                  <button className="details-btn" onClick={() => onOpenDetails(item)} type="button">
                    Voir <ChevronRight size={16} />
                  </button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
