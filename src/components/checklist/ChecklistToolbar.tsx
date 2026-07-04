import { cleanText } from '@/lib/text'

interface ChecklistToolbarProps {
  categories: string[]
  categoryFilter: string
  phaseProgressLabel: string
  searchTerm: string
  statusFilter: string
  onCategoryFilterChange: (value: string) => void
  onSearchTermChange: (value: string) => void
  onStatusFilterChange: (value: string) => void
}

export function ChecklistToolbar({
  categories,
  categoryFilter,
  phaseProgressLabel,
  searchTerm,
  statusFilter,
  onCategoryFilterChange,
  onSearchTermChange,
  onStatusFilterChange,
}: ChecklistToolbarProps) {
  return (
    <div className="ocp-toolbar">
      <input
        onChange={(event) => onSearchTermChange(event.target.value)}
        placeholder="Rechercher une action..."
        type="text"
        value={searchTerm}
      />
      <select
        onChange={(event) => onCategoryFilterChange(event.target.value)}
        value={categoryFilter}
      >
        <option value="tous">Toutes les categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {cleanText(category)}
          </option>
        ))}
      </select>
      <select
        onChange={(event) => onStatusFilterChange(event.target.value)}
        value={statusFilter}
      >
        <option value="tous">Toutes les actions</option>
        <option value="fait">Fait uniquement</option>
        <option value="pasfait">Pas fait uniquement</option>
      </select>
      <div className="ocp-phase-progress">{phaseProgressLabel}</div>
    </div>
  )
}
