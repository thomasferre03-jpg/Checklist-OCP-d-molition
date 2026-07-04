import { useEffect, useState } from 'react'
import { Check, ChevronRight } from 'lucide-react'

import { cleanText } from '@/lib/text'
import type { ChecklistItem, ChecklistItemState } from '@/types/checklist'

interface ChecklistCardProps {
  entry: ChecklistItemState
  item: ChecklistItem
  onOpenDetails: (item: ChecklistItem) => void
  onOwnerChange: (itemId: number, porteur: string) => void
  onToggleStatus: (itemId: number) => void
}

export function ChecklistCard({
  entry,
  item,
  onOpenDetails,
  onOwnerChange,
  onToggleStatus,
}: ChecklistCardProps) {
  const [draftPorteur, setDraftPorteur] = useState(entry.porteur)
  const isDone = entry.statut === 'Fait'

  useEffect(() => {
    setDraftPorteur(entry.porteur)
  }, [entry.porteur])

  useEffect(() => {
    if (draftPorteur === entry.porteur) {
      return undefined
    }

    const timer = window.setTimeout(() => {
      onOwnerChange(item.id, draftPorteur)
    }, 500)

    return () => window.clearTimeout(timer)
  }, [draftPorteur, entry.porteur, item.id, onOwnerChange])

  return (
    <article className={`item-card ${isDone ? 'is-fait' : 'is-pasfait'}`}>
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

      <div className="item-main">
        <div className="pk-id mono">
          PK {String(item.id).padStart(3, '0')}
          <span className="cat-tag">{cleanText(item.categorie)}</span>
        </div>
        <button className="action-text" onClick={() => onOpenDetails(item)} type="button">
          {cleanText(item.action)}
        </button>
        <div className="bp-note">
          <b>BP</b>
          <span>{cleanText(item.bonnePratique)}</span>
        </div>
        <div className="item-fields">
          <input
            onChange={(event) => setDraftPorteur(event.target.value)}
            placeholder="Porteur (nom / fonction)"
            type="text"
            value={draftPorteur}
          />
        </div>
      </div>

      <button className="details-btn" onClick={() => onOpenDetails(item)} type="button">
        A traiter <ChevronRight size={16} />
      </button>
    </article>
  )
}
