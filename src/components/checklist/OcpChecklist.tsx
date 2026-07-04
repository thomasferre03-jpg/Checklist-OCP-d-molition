import { useCallback, useEffect, useMemo, useState } from 'react'

import { ActionSheet } from '@/components/checklist/ActionSheet'
import { ChecklistTable } from '@/components/checklist/ChecklistTable'
import { ChecklistToolbar } from '@/components/checklist/ChecklistToolbar'
import { RailProgress } from '@/components/checklist/RailProgress'
import { CHECKLIST_ITEMS as SOURCE_CHECKLIST_ITEMS } from '@/data/checklist-items'
import { hasSupabaseConfig } from '@/lib/supabase'
import { cleanText } from '@/lib/text'
import {
  emptyStateFor,
  fetchChecklistState,
  saveChecklistState,
  subscribeChecklistState,
} from '@/services/checklist-state'
import type {
  ChecklistItem,
  ChecklistItemState,
  ChecklistStateMap,
  PhaseStats,
} from '@/types/checklist'

const CHECKLIST_ITEMS: ChecklistItem[] = SOURCE_CHECKLIST_ITEMS.map((item, index) => ({
  ...item,
  id: index + 1,
}))
const PHASES = Array.from(new Set(CHECKLIST_ITEMS.map((item) => item.phase)))
const CATEGORIES = Array.from(new Set(CHECKLIST_ITEMS.map((item) => item.categorie))).sort()
const EIFFAGE_LOGO_URL = '/eiffage-genie-civil-logo.png'

function messageFromError(error: unknown) {
  if (error instanceof Error) {
    return error.message
  }

  return 'Une erreur est survenue.'
}

function statsForItems(items: ChecklistItem[], stateMap: ChecklistStateMap): PhaseStats {
  const done = items.filter((item) => {
    const entry = stateMap[item.id] ?? emptyStateFor(item.id)
    return entry.statut === 'Fait'
  }).length

  return {
    total: items.length,
    done,
    pct: items.length ? Math.round((done / items.length) * 100) : 0,
  }
}

function applyStateToMap(stateMap: ChecklistStateMap, entry: ChecklistItemState) {
  return {
    ...stateMap,
    [entry.itemId]: entry,
  }
}

export function OcpChecklist() {
  const [stateMap, setStateMap] = useState<ChecklistStateMap>({})
  const [currentPhase, setCurrentPhase] = useState(PHASES[0])
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('tous')
  const [statusFilter, setStatusFilter] = useState('tous')
  const [toast, setToast] = useState('')
  const [selectedItem, setSelectedItem] = useState<ChecklistItem | null>(null)
  const [isLoading, setIsLoading] = useState(hasSupabaseConfig)
  const [isRemoteStateAvailable, setIsRemoteStateAvailable] = useState(hasSupabaseConfig)
  const [loadError, setLoadError] = useState('')

  const showToast = useCallback((message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2400)
  }, [])

  const getEntry = useCallback(
    (itemId: number) => stateMap[itemId] ?? emptyStateFor(itemId),
    [stateMap],
  )

  const persistEntry = useCallback(
    async (nextEntry: ChecklistItemState, successMessage?: string) => {
      setStateMap((current) => applyStateToMap(current, nextEntry))

      if (!hasSupabaseConfig || !isRemoteStateAvailable) {
        if (successMessage) {
          showToast(`${successMessage} Mode local uniquement.`)
        }
        return
      }

      try {
        const savedEntry = await saveChecklistState(nextEntry)
        setStateMap((current) => applyStateToMap(current, savedEntry))
        if (successMessage) {
          showToast(successMessage)
        }
      } catch (error) {
        setIsRemoteStateAvailable(false)
        setLoadError(messageFromError(error))
        showToast('Sauvegarde distante indisponible - mode local.')
      }
    },
    [isRemoteStateAvailable, showToast],
  )

  useEffect(() => {
    let isMounted = true

    async function loadState() {
      if (!hasSupabaseConfig) {
        setIsLoading(false)
        return
      }

      try {
        const remoteState = await fetchChecklistState()
        if (isMounted) {
          setStateMap(remoteState)
          setLoadError('')
        }
      } catch (error) {
        if (isMounted) {
          setIsRemoteStateAvailable(false)
          setLoadError(messageFromError(error))
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadState()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    return subscribeChecklistState(
      (entry) => setStateMap((current) => applyStateToMap(current, entry)),
      (itemId) => {
        setStateMap((current) => {
          const next = { ...current }
          delete next[itemId]
          return next
        })
      },
    )
  }, [])

  const statsByPhase = useMemo(() => {
    return Object.fromEntries(
      PHASES.map((phase) => [
        phase,
        statsForItems(
          CHECKLIST_ITEMS.filter((item) => item.phase === phase),
          stateMap,
        ),
      ]),
    ) as Record<string, PhaseStats>
  }, [stateMap])

  const globalStats = useMemo(() => statsForItems(CHECKLIST_ITEMS, stateMap), [stateMap])
  const currentPhaseStats = statsByPhase[currentPhase]

  const filteredItems = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return CHECKLIST_ITEMS.filter((item) => item.phase === currentPhase).filter((item) => {
      const entry = stateMap[item.id] ?? emptyStateFor(item.id)
      if (categoryFilter !== 'tous' && item.categorie !== categoryFilter) {
        return false
      }
      if (statusFilter === 'fait' && entry.statut !== 'Fait') {
        return false
      }
      if (statusFilter === 'pasfait' && entry.statut !== 'Pas fait') {
        return false
      }
      if (!normalizedSearch) {
        return true
      }

      return `${cleanText(item.action)} ${cleanText(item.categorie)} ${cleanText(item.bonnePratique)}`
        .toLowerCase()
        .includes(normalizedSearch)
    })
  }, [categoryFilter, currentPhase, searchTerm, stateMap, statusFilter])

  const phaseProgressLabel = `Phase en cours - ${currentPhaseStats.done}/${currentPhaseStats.total} actions faites (${currentPhaseStats.pct}%)`

  const handleToggleStatus = useCallback(
    (itemId: number) => {
      const entry = getEntry(itemId)
      persistEntry({
        ...entry,
        statut: entry.statut === 'Fait' ? 'Pas fait' : 'Fait',
      })
    },
    [getEntry, persistEntry],
  )

  const handleOwnerChange = useCallback(
    (itemId: number, porteur: string) => {
      const entry = getEntry(itemId)
      persistEntry({ ...entry, porteur })
    },
    [getEntry, persistEntry],
  )

  const selectedEntry = selectedItem ? getEntry(selectedItem.id) : emptyStateFor(0)

  return (
    <>
      <div id="ocp-root">
        <header className="ocp-header">
          <div className="ocp-header-top">
            <div>
              <div className="brand-line">
                <img alt="Eiffage Genie Civil" className="brand-logo" src={EIFFAGE_LOGO_URL} />
                <span className="brand-chip">Eiffage - Ouvrages d'art - Operation coup de poing</span>
              </div>
              <h1 className="ocp-title">Checklist OCP - Demolition d'ouvrage d'art</h1>
              <div className="ocp-subtitle mono">
                Preparation &amp; pilotage - Operation coup de poing
              </div>
            </div>
            <div className="ocp-global-pct">
              <div className="num mono">{globalStats.pct}%</div>
              <div className="lbl">avancement global</div>
            </div>
          </div>
          <RailProgress
            currentPhase={currentPhase}
            onSelectPhase={setCurrentPhase}
            phases={PHASES}
            statsByPhase={statsByPhase}
          />
          <div className="rail-legend mono">
            <span>Ligne operationnelle - {PHASES.length} stations</span>
            <span className="legend-items">
              <i className="legend-dot todo" /> A traiter
              <i className="legend-dot progress" /> En cours
              <i className="legend-dot done" /> Termine
            </span>
          </div>
        </header>

        <ChecklistToolbar
          categories={CATEGORIES}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
          onSearchTermChange={setSearchTerm}
          onStatusFilterChange={setStatusFilter}
          phaseProgressLabel={phaseProgressLabel}
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        />

        <div className="ocp-sync-line">
          <div className={`connection-pill ${hasSupabaseConfig ? 'connected' : 'disconnected'}`}>
            {hasSupabaseConfig
              ? isLoading
                ? 'Synchronisation Supabase...'
                : isRemoteStateAvailable
                  ? 'Donnees partagees via Supabase'
                  : 'Mode local - Supabase indisponible'
              : 'Supabase non configure - les changements ne seront pas partages'}
          </div>
          {loadError ? <div className="sync-error">{loadError}</div> : null}
        </div>

        <div className="disclaimer">
          Les statuts et porteurs sont accessibles aux personnes qui recoivent le lien
          du projet lorsque Supabase est configure.
        </div>

        <main className="ocp-body">
          <div className="phase-heading">
            <span className="badge">Phase {String(PHASES.indexOf(currentPhase) + 1).padStart(2, '0')}</span>
            <h2>{cleanText(currentPhase)}</h2>
          </div>

          {filteredItems.length ? (
            <ChecklistTable
              entriesByItemId={getEntry}
              items={filteredItems}
              onOpenDetails={setSelectedItem}
              onOwnerChange={handleOwnerChange}
              onToggleStatus={handleToggleStatus}
            />
          ) : (
            <div className="empty-msg">
              Aucune action ne correspond aux filtres selectionnes dans cette phase.
            </div>
          )}
        </main>
      </div>

      <div className={`toast${toast ? ' show' : ''}`}>{toast}</div>
      <ActionSheet
        entry={selectedEntry}
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onStatusChange={handleToggleStatus}
      />
    </>
  )
}
