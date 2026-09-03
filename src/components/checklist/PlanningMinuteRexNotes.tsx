import { Clock3 } from 'lucide-react'

import { getPlanningMinuteRexInsight } from '@/data/planning-minute-rex-data'
import { cleanText } from '@/lib/text'
import type { ChecklistItem } from '@/types/checklist'

interface PlanningMinuteRexNotesProps {
  item: ChecklistItem
}

export function PlanningMinuteRexNotes({ item }: PlanningMinuteRexNotesProps) {
  const insight = getPlanningMinuteRexInsight(cleanText(item.action))

  if (!insight?.tasks.length) {
    return null
  }

  return (
    <section className="sheet-section ocp-sheet-section planning-minute-rex">
      <h4>
        <Clock3 size={16} /> REX planning minuté
      </h4>
      <p className="planning-minute-rex-summary">{insight.summary}</p>
      <div className="planning-minute-rex-list">
        {insight.tasks.map((entry) => (
          <article className="planning-minute-rex-card" key={`${entry.ouvrage}-${entry.task}`}>
            <div className="planning-minute-rex-head">
              <span className="planning-minute-rex-oa">{entry.ouvrage}</span>
              <span className="planning-minute-rex-status">{entry.status}</span>
            </div>
            <h5>{entry.task}</h5>
            <dl className="planning-minute-rex-grid">
              <div>
                <dt>Entreprise</dt>
                <dd>{entry.company}</dd>
              </div>
              <div>
                <dt>Durée constatée</dt>
                <dd>{entry.duration}</dd>
              </div>
              <div>
                <dt>Encadrement</dt>
                <dd>{entry.supervision}</dd>
              </div>
              <div>
                <dt>Effectifs</dt>
                <dd>{entry.people}</dd>
              </div>
              <div className="wide">
                <dt>Matériel / moyens</dt>
                <dd>{entry.equipment}</dd>
              </div>
              <div className="wide">
                <dt>Enseignement REX</dt>
                <dd>{entry.lesson}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
      <small className="planning-minute-rex-source">Source : {insight.source}</small>
    </section>
  )
}
