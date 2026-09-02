import { ExternalLink, Lightbulb } from 'lucide-react'

import { FIELD_REX_SOURCE, getFieldRexInsight } from '@/data/field-rex-data'
import { cleanText } from '@/lib/text'
import type { ChecklistItem } from '@/types/checklist'

interface FieldRexNotesProps {
  item: ChecklistItem
}

export function FieldRexNotes({ item }: FieldRexNotesProps) {
  const insight = getFieldRexInsight(cleanText(item.action))

  if (!insight) {
    return null
  }

  return (
    <section className="sheet-section ocp-sheet-section field-rex">
      <h4>
        <Lightbulb size={16} /> Retour d'experience terrain
      </h4>
      <div className="field-rex-card">
        <div className="field-rex-category">{insight.category}</div>
        {insight.entries.map((entry) => (
          <p key={`${entry.label}-${entry.text}`}>
            <strong>{entry.label} :</strong> {entry.text}
          </p>
        ))}
        <a className="field-rex-source" href={FIELD_REX_SOURCE.url} rel="noreferrer" target="_blank">
          <ExternalLink size={14} />
          Source externe
        </a>
      </div>
    </section>
  )
}
