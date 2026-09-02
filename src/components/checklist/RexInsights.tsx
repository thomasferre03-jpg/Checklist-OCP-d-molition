import { BarChart3, ZoomIn, X } from 'lucide-react'
import { useMemo, useState } from 'react'

import { getRexInsightForAction, type RexVisual } from '@/data/project-rex-data'
import { cleanText } from '@/lib/text'
import type { ChecklistItem } from '@/types/checklist'

interface RexInsightsProps {
  item: ChecklistItem
}

function RexVisualCard({ visual, onOpen }: { visual: RexVisual; onOpen: (visual: RexVisual) => void }) {
  return (
    <button className="rex-visual-card" type="button" onClick={() => onOpen(visual)}>
      <span className="rex-visual-title">{visual.title}</span>
      <img src={visual.image} alt={visual.alt} loading="lazy" />
      <span className="rex-zoom-hint">
        <ZoomIn size={14} /> Agrandir
      </span>
    </button>
  )
}

export function RexInsights({ item }: RexInsightsProps) {
  const isPh12 = cleanText(item.phase).startsWith('12.')
  const insight = getRexInsightForAction(cleanText(item.action))
  const [lightboxVisual, setLightboxVisual] = useState<RexVisual | null>(null)
  const [activeGroupLabel, setActiveGroupLabel] = useState<string | null>(null)

  const activeGroup = useMemo(() => {
    if (!insight?.groups?.length) {
      return null
    }

    return insight.groups.find((group) => group.label === activeGroupLabel) ?? insight.groups[0]
  }, [activeGroupLabel, insight?.groups])

  if (!isPh12) {
    return null
  }

  if (!insight) {
    return (
      <section className="sheet-section ocp-sheet-section rex-insights">
        <h4>
          <BarChart3 size={16} /> Résultats / REX de l'opération
        </h4>
        <div className="associated-empty">Aucun visuel dashboard pertinent pour cette fiche.</div>
      </section>
    )
  }

  return (
    <section className="sheet-section ocp-sheet-section rex-insights">
      <h4>
        <BarChart3 size={16} /> Résultats / REX de l'opération
      </h4>
      <p className="rex-summary">{insight.summary}</p>

      {insight.visuals?.length ? (
        <div className="rex-visual-grid">
          {insight.visuals.map((visual) => (
            <RexVisualCard key={visual.title} visual={visual} onOpen={setLightboxVisual} />
          ))}
        </div>
      ) : null}

      {insight.groups?.length && activeGroup ? (
        <div className="rex-oa-analysis">
          <div className="rex-tabs" aria-label="Choisir un ouvrage d'art">
            {insight.groups.map((group) => (
              <button
                className={group.label === activeGroup.label ? 'active' : ''}
                key={group.label}
                type="button"
                onClick={() => setActiveGroupLabel(group.label)}
              >
                {group.label}
              </button>
            ))}
          </div>

          <div className="rex-visual-grid">
            {activeGroup.visuals.map((visual) => (
              <RexVisualCard key={visual.title} visual={visual} onOpen={setLightboxVisual} />
            ))}
          </div>
        </div>
      ) : null}

      {lightboxVisual ? (
        <div className="rex-lightbox" role="dialog" aria-modal="true" aria-label={lightboxVisual.title}>
          <button className="rex-lightbox-close" type="button" onClick={() => setLightboxVisual(null)}>
            <X size={18} />
          </button>
          <figure>
            <img src={lightboxVisual.image} alt={lightboxVisual.alt} />
            <figcaption>{lightboxVisual.title}</figcaption>
          </figure>
        </div>
      ) : null}
    </section>
  )
}
