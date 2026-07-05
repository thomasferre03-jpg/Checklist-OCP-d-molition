import { cleanText } from '@/lib/text'

interface ChecklistToolbarProps {
  categories: string[]
  categoryFilter: string
  deadlineFilter: string
  phaseProgressLabel: string
  ownerFilter: string
  searchTerm: string
  statusFilter: string
  onCategoryFilterChange: (value: string) => void
  onDeadlineFilterChange: (value: string) => void
  onOwnerFilterChange: (value: string) => void
  onSearchTermChange: (value: string) => void
  onStatusFilterChange: (value: string) => void
}

export function ChecklistToolbar({
  categories,
  categoryFilter,
  deadlineFilter,
  phaseProgressLabel,
  ownerFilter,
  searchTerm,
  statusFilter,
  onCategoryFilterChange,
  onDeadlineFilterChange,
  onOwnerFilterChange,
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
      <input
        onChange={(event) => onOwnerFilterChange(event.target.value)}
        placeholder="Filtrer par porteur..."
        type="text"
        value={ownerFilter}
      />
      <input
        aria-label="Filtrer par echeance"
        onChange={(event) => onDeadlineFilterChange(event.target.value)}
        type="date"
        value={deadlineFilter}
      />
      <div className="ocp-phase-progress">{phaseProgressLabel}</div>
    </div>
  )
}
