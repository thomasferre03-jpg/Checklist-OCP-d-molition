import { cleanText } from '@/lib/text'
import type { PhaseStats } from '@/types/checklist'

interface RailProgressProps {
  phases: string[]
  currentPhase: string
  statsByPhase: Record<string, PhaseStats>
  onSelectPhase: (phase: string) => void
}

function shortPhaseName(phase: string) {
  return cleanText(phase).replace(/^\d+\.\s*/, '')
}

export function RailProgress({
  phases,
  currentPhase,
  statsByPhase,
  onSelectPhase,
}: RailProgressProps) {
  return (
    <div className="rail-wrap">
      <div className="rail-track">
        {phases.map((phase, index) => {
          const stats = statsByPhase[phase]
          const dotClass = stats.pct === 100 ? 'full' : stats.pct > 0 ? 'partial' : ''
          const isActive = phase === currentPhase

          return (
            <button
              className={`rail-stop${isActive ? ' active' : ''}`}
              key={phase}
              onClick={() => onSelectPhase(phase)}
              type="button"
            >
              <span className="pk mono">PH-{String(index + 1).padStart(2, '0')}</span>
              <span className={`dot ${dotClass}`} />
              <span className="name">{shortPhaseName(phase)}</span>
              <span className="pct mono">{stats.pct}%</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
