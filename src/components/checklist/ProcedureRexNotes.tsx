import { ClipboardCheck } from 'lucide-react'

import { getProcedureRexEntries } from '@/data/procedure-rex-data'
import { cleanText } from '@/lib/text'
import type { ChecklistItem } from '@/types/checklist'

interface ProcedureRexNotesProps {
  item: ChecklistItem
}

export function ProcedureRexNotes({ item }: ProcedureRexNotesProps) {
  const entries = getProcedureRexEntries(cleanText(item.action))

  if (!entries?.length) {
    return null
  }

  return (
    <section className="sheet-section ocp-sheet-section procedure-rex">
      <h4>
        <ClipboardCheck size={16} /> REX procedures de demolition
      </h4>
      <div className="procedure-rex-list">
        {entries.map((entry) => (
          <article className={`procedure-rex-card ${entry.type === 'A verifier' ? 'warning' : ''}`} key={`${entry.oa}-${entry.title}`}>
            <div className="procedure-rex-meta">
              <span>{entry.oa}</span>
              <span>{entry.type}</span>
            </div>
            <h5>{entry.title}</h5>
            <p>{entry.text}</p>
            {entry.image ? (
              <figure className="procedure-rex-figure">
                <img alt={`${entry.oa} - ${entry.title}`} src={entry.image} />
              </figure>
            ) : null}
            <small>Source : {entry.source}</small>
          </article>
        ))}
      </div>
    </section>
  )
}
