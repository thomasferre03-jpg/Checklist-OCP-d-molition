import { CalendarDays, FileText, X } from 'lucide-react'

import { AssociatedResources } from '@/components/checklist/AssociatedResources'
import { FieldRexNotes } from '@/components/checklist/FieldRexNotes'
import { ProcedureRexNotes } from '@/components/checklist/ProcedureRexNotes'
import { RexInsights } from '@/components/checklist/RexInsights'
import { cleanText } from '@/lib/text'
import type { ChecklistItem, ChecklistItemState } from '@/types/checklist'

interface ActionSheetProps {
  entry: ChecklistItemState
  item: ChecklistItem | null
  onClose: () => void
  onStatusChange: (itemId: number) => void
}

function descriptionFor(item: ChecklistItem) {
  return `Cette action doit etre pilotee dans la phase "${cleanText(item.phase)}". Elle sert a securiser le point "${cleanText(item.action)}", a clarifier le porteur et a conserver les preuves utiles pour le retour d'experience.`
}

function actionDescriptionFor(item: ChecklistItem) {
  const description = cleanText(item.description)
  return description || descriptionFor(item)
}

function formatDate(value: string) {
  if (!value) {
    return 'Echeance a renseigner'
  }

  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(`${value}T00:00:00`))
}

export function ActionSheet({ entry, item, onClose, onStatusChange }: ActionSheetProps) {
  const isOpen = Boolean(item)

  return (
    <div className={`sheet-layer${isOpen ? ' open' : ''}`} aria-hidden={!isOpen}>
      <button className="sheet-backdrop" onClick={onClose} type="button" />
      <aside aria-label="Detail de l'action" className="action-sheet ocp-sheet-content">
        {item ? (
          <>
            <div className="sheet-head ocp-sheet-header">
              <div className="sheet-head-main">
                <div className="sheet-kicker mono ocp-sheet-kicker">
                  <span>PH-{String(item.phase.match(/^\d+/)?.[0] ?? '0').padStart(2, '0')}</span>
                  <span>{cleanText(item.phase).replace(/^\d+\.\s*/, '')}</span>
                  <span>{cleanText(item.categorie)}</span>
                </div>
                <h3 className="ocp-sheet-title">{cleanText(item.action)}</h3>
                <p className="ocp-sheet-description">
                  Fiche action #{String(item.id).padStart(3, '0')}
                </p>
                <div className="sheet-status-group" aria-label="Statut de l'action">
                  {(['Fait', 'Pas fait'] as const).map((status) => (
                    <button
                      aria-pressed={entry.statut === status}
                      className={`${status === 'Fait' ? 'fait' : 'pasfait'}${entry.statut === status ? ' active' : ''}`}
                      key={status}
                      onClick={() => {
                        if (entry.statut !== status) {
                          onStatusChange(item.id)
                        }
                      }}
                      type="button"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              <button aria-label="Fermer la fiche action" className="sheet-close" onClick={onClose} type="button">
                <X size={18} />
              </button>
            </div>

            <div className="ocp-sheet-body">
              <section className="sheet-section ocp-sheet-section">
                <h4>Description de l'action</h4>
                <p>{actionDescriptionFor(item)}</p>
              </section>

              <section className="sheet-section ocp-sheet-section">
                <h4>Bonne pratique</h4>
                <div className="bp-note sheet-bp-note">
                  <b>Bonne pratique&nbsp;:</b>
                  <span>{cleanText(item.bonnePratique)}</span>
                </div>
              </section>

              <FieldRexNotes item={item} />
              <ProcedureRexNotes item={item} />

              <section className="sheet-section ocp-sheet-section">
                <h4>
                  <CalendarDays size={16} /> Suivi terrain
                </h4>
                <div className="sheet-field-grid">
                  <div className="sheet-field-readonly">
                    <span>Porteur</span>
                    <strong>{entry.porteur || 'Porteur a renseigner'}</strong>
                  </div>
                  <div className="sheet-field-readonly">
                    <span>Echeance</span>
                    <strong>{formatDate(entry.echeance)}</strong>
                  </div>
                </div>
              </section>

              <section className="sheet-section ocp-sheet-section">
                <h4>
                  <FileText size={16} /> Ressources associées
                </h4>
                <AssociatedResources itemId={item.id} staticResources={item.resources} />
              </section>

              <RexInsights item={item} />
            </div>
          </>
        ) : null}
      </aside>
    </div>
  )
}

