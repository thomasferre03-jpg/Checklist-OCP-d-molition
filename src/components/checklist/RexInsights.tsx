import { BarChart3 } from 'lucide-react'

import { getRexInsightForAction, type RexBarDatum, type RexKpi, type RexStatus } from '@/data/project-rex-data'
import { cleanText } from '@/lib/text'
import type { ChecklistItem } from '@/types/checklist'

interface RexInsightsProps {
  item: ChecklistItem
}

function statusLabel(status: RexStatus) {
  if (status === 'NON_ATTEINT') {
    return 'Non atteint'
  }
  if (status === 'NON_EVALUABLE') {
    return 'Non évaluable'
  }
  if (status === 'PARTIEL') {
    return 'Partiel'
  }
  return 'Atteint'
}

function KpiCard({ kpi }: { kpi: RexKpi }) {
  return (
    <article className="rex-kpi-card">
      <div className="rex-kpi-head">
        <span>{kpi.label}</span>
        <strong className={`rex-status ${kpi.status.toLowerCase().replace('_', '-')}`}>
          {statusLabel(kpi.status)}
        </strong>
      </div>
      <div className="rex-kpi-value">{kpi.value}</div>
      <p>{kpi.detail}</p>
    </article>
  )
}

function MiniBarChart({ data, unit }: { data: RexBarDatum[]; unit: string }) {
  const max = Math.max(...data.map((datum) => datum.value), 1)

  return (
    <div className="rex-bars">
      {data.map((datum) => (
        <div className="rex-bar-row" key={datum.label}>
          <span>{datum.label}</span>
          <div className="rex-bar-track">
            <i style={{ width: `${Math.max(4, (datum.value / max) * 100)}%` }} />
          </div>
          <strong>
            {datum.value} {unit}
          </strong>
        </div>
      ))}
    </div>
  )
}

export function RexInsights({ item }: RexInsightsProps) {
  const isPh12 = cleanText(item.phase).startsWith('12.')
  const insight = getRexInsightForAction(cleanText(item.action))

  if (!isPh12) {
    return null
  }

  if (!insight) {
    return (
      <section className="sheet-section ocp-sheet-section rex-insights">
        <h4>
          <BarChart3 size={16} /> Résultats du projet
        </h4>
        <div className="associated-empty">
          Aucune donnée quantitative disponible dans le dashboard pour cet indicateur.
        </div>
      </section>
    )
  }

  return (
    <section className="sheet-section ocp-sheet-section rex-insights">
      <h4>
        <BarChart3 size={16} /> Résultats du projet
      </h4>
      <p className="rex-summary">{insight.summary}</p>

      {insight.kpis?.length ? (
        <div className="rex-kpi-grid">
          {insight.kpis.map((kpi) => (
            <KpiCard key={`${kpi.label}-${kpi.value}`} kpi={kpi} />
          ))}
        </div>
      ) : null}

      {insight.bars ? (
        <div className="rex-block">
          <h5>{insight.bars.title}</h5>
          <MiniBarChart data={insight.bars.data} unit={insight.bars.unit} />
        </div>
      ) : null}

      {insight.table ? (
        <div className="rex-table-wrap">
          <table className="rex-table">
            <thead>
              <tr>
                {insight.table.columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {insight.table.rows.map((row) => (
                <tr key={row.join('-')}>
                  {row.map((cell) => (
                    <td key={cell}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      <div className="rex-block">
        <h5>Analyse REX</h5>
        <ul>
          {insight.analysis.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
