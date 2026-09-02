export type RexStatus = 'ATTEINT' | 'PARTIEL' | 'NON_ATTEINT' | 'NON_EVALUABLE'

export interface RexKpi {
  label: string
  value: string
  detail: string
  status: RexStatus
}

export interface RexBarDatum {
  label: string
  value: number
}

export interface RexTable {
  columns: string[]
  rows: string[][]
}

export interface RexInsight {
  summary: string
  kpis?: RexKpi[]
  bars?: {
    title: string
    unit: string
    data: RexBarDatum[]
  }
  table?: RexTable
  analysis: string[]
  unavailable?: string[]
}

export const PROJECT_REX_DATA = {
  ouvrages: ['OA41', 'OA44', 'OA48', 'OA54', 'OA56'],
  safety: {
    accidentsByOa: [
      { label: 'OA41', value: 0 },
      { label: 'OA44', value: 0 },
      { label: 'OA48', value: 0 },
      { label: 'OA54', value: 0 },
      { label: 'OA56', value: 0 },
    ],
    safetyForcesByOa: [
      { label: 'OA41', value: 4 },
      { label: 'OA44', value: 2 },
      { label: 'OA48', value: 3 },
      { label: 'OA54', value: 1 },
      { label: 'OA56', value: 3 },
    ],
  },
  planning: {
    restitutionsSansPenalite: 5,
    totalOcp: 5,
    perturbationEvents: [
      'Panne pelle',
      'Panne grue',
      'Découverte imprévue de réseaux',
      'Conditions météo défavorables',
      'Incident sécurité',
      'Retard livraison fourniture',
      'Défaillance sous-traitant',
    ],
  },
  finance: {
    targetGainPercent: 5,
    targetBenefitEuros: 19848,
    totalBenefitEuros: 20497.62,
  },
} as const

const safetyKpis: RexKpi[] = [
  {
    label: 'Accidents',
    value: '0',
    detail: 'Nombre d’accidents relevé sur les 5 OCP',
    status: 'ATTEINT',
  },
  {
    label: 'Safety Force',
    value: '13',
    detail: 'Fiches sécurité visibles dans le dashboard',
    status: 'ATTEINT',
  },
  {
    label: 'OA suivis',
    value: '5 / 5',
    detail: 'OA41, OA44, OA48, OA54, OA56',
    status: 'ATTEINT',
  },
]

const planningKpis: RexKpi[] = [
  {
    label: 'Restitutions',
    value: '5 / 5',
    detail: 'Restitutions des voies sans pénalité',
    status: 'ATTEINT',
  },
  {
    label: 'Délai marché',
    value: '100 %',
    detail: 'Conformité de restitution visible dans le dashboard',
    status: 'ATTEINT',
  },
]

const financeKpis: RexKpi[] = [
  {
    label: 'Bénéfice total',
    value: '20 497,62 €',
    detail: 'Bénéfice visible dans le dashboard PFE',
    status: 'ATTEINT',
  },
  {
    label: 'Objectif',
    value: '> 19 848 €',
    detail: 'Seuil associé à l’objectif de gain de 5 %',
    status: 'ATTEINT',
  },
]

export const PH12_REX_INSIGHTS: Record<string, RexInsight> = {
  'objectifs de sécurité atteints': {
    summary: 'Le dashboard indique 0 accident sur les OCP suivies.',
    kpis: safetyKpis,
    bars: {
      title: 'Safety Force par OA',
      unit: 'fiche(s)',
      data: [...PROJECT_REX_DATA.safety.safetyForcesByOa],
    },
    table: {
      columns: ['OA', 'Accidents', 'Safety Force'],
      rows: PROJECT_REX_DATA.ouvrages.map((oa) => {
        const accident = PROJECT_REX_DATA.safety.accidentsByOa.find((item) => item.label === oa)?.value ?? 0
        const safetyForce = PROJECT_REX_DATA.safety.safetyForcesByOa.find((item) => item.label === oa)?.value ?? 0
        return [oa, String(accident), String(safetyForce)]
      }),
    },
    analysis: [
      'L’objectif sécurité est atteint sur l’indicateur accidents.',
      'Les Safety Force sont concentrées sur OA41, OA48 et OA56, ce qui donne une base utile pour le REX sécurité.',
      'Les anomalies et mesures à prendre sont visibles dans le dashboard mais ne sont pas encore disponibles comme données structurées dans le code.',
    ],
  },
  'délais de restitution respectés': {
    summary: 'Les 5 OCP sont indiquées comme restituées sans pénalité.',
    kpis: planningKpis,
    table: {
      columns: ['Indicateur', 'Résultat', 'Statut'],
      rows: [
        ['Restitution sans pénalité', '5 / 5 OCP', 'ATTEINT'],
        ['Respect délai marché', '100 %', 'ATTEINT'],
        ['Événements perturbateurs', 'Présents dans le dashboard', 'À analyser'],
      ],
    },
    analysis: [
      'Le résultat global de restitution est favorable.',
      'Les événements perturbateurs doivent servir à identifier ce qui a consommé la marge avant restitution.',
      'Les graphiques durée théorique/réelle par phase sont la source à exploiter pour isoler les tâches critiques.',
    ],
  },
  'objectifs financiers atteints': {
    summary: 'Le bénéfice visible dans le dashboard dépasse le seuil associé au gain de 5 %.',
    kpis: financeKpis,
    table: {
      columns: ['Objectif', 'Seuil', 'Résultat', 'Statut'],
      rows: [['Gain financier', '> 19 848 €', '20 497,62 €', 'ATTEINT']],
    },
    analysis: [
      'L’objectif financier global est atteint sur la donnée consolidée disponible.',
      'Les dépenses et recettes par OA sont visibles dans le dashboard, mais les valeurs exactes doivent être structurées avant d’être réutilisées automatiquement.',
    ],
  },
  'validation des kpi du projet': {
    summary: 'Synthèse des KPI exploitables directement depuis le dashboard PFE.',
    kpis: [
      ...safetyKpis.slice(0, 2),
      ...planningKpis,
      ...financeKpis,
      {
        label: 'Cadence',
        value: 'Par OA',
        detail: 'Graphiques disponibles pour OA41, OA44, OA48, OA54, OA56',
        status: 'PARTIEL',
      },
    ],
    table: {
      columns: ['KPI', 'Objectif', 'Résultat', 'Statut'],
      rows: [
        ['Accidents', '0', '0', 'ATTEINT'],
        ['Restitution voies', 'Sans pénalité', '5 / 5 OCP', 'ATTEINT'],
        ['Gain financier', '> 19 848 €', '20 497,62 €', 'ATTEINT'],
        ['Cadence démolition', 'Comparer théorie/réel', 'Graphiques par OA', 'PARTIEL'],
      ],
    },
    analysis: [
      'Les KPI sécurité, restitution et finance disposent d’une conclusion exploitable.',
      'Les KPI cadence et durée doivent être centralisés en valeurs numériques pour produire des conclusions totalement automatiques par tâche.',
    ],
  },
  'capitalisation des enseignements': {
    summary: 'Les graphes de durée par phase et de cadence constituent la base principale de capitalisation.',
    table: {
      columns: ['Source dashboard', 'Usage REX'],
      rows: [
        ['Durée par phase OA41 à OA56', 'Repérer les tâches plus longues ou plus rapides que prévu'],
        ['Cadence démolition par OA', 'Réutiliser les rendements réels dans les futurs plannings OCP'],
        ['Événements perturbateurs', 'Identifier les causes de perte de marge'],
      ],
    },
    analysis: [
      'Cette fiche doit servir de point d’entrée REX plutôt que de simple stockage documentaire.',
      'Les écarts durée théorique/réelle doivent alimenter les futurs ratios de préparation.',
    ],
  },
  'mise à jour des checklists': {
    summary: 'Les écarts et événements du dashboard peuvent indiquer les contrôles à renforcer.',
    table: {
      columns: ['Constat dashboard', 'Évolution checklist possible'],
      rows: [
        ['Anomalies / mesures à prendre', 'Renforcer ou ajouter les points de contrôle concernés'],
        ['Points d’arrêt GO/NO GO', 'Vérifier que chaque jalon critique est explicitement présent'],
        ['Événements perturbateurs', 'Ajouter les vérifications préventives avant OCP'],
      ],
    },
    analysis: [
      'Les modifications de checklist doivent être décidées à partir des écarts récurrents, pas à partir d’une seule impression terrain.',
    ],
  },
  'mise à jour des procédures internes': {
    summary: 'Les écarts récurrents peuvent justifier une évolution des méthodes internes.',
    table: {
      columns: ['Donnée à examiner', 'Décision possible'],
      rows: [
        ['GO / NO GO et points d’arrêt', 'Formaliser ou clarifier les critères de validation'],
        ['Écarts de durée par tâche', 'Mettre à jour les méthodes et rendements théoriques'],
        ['Événements perturbateurs', 'Prévoir une procédure de contournement ou de renfort'],
      ],
    },
    analysis: [
      'Aucune procédure ne doit être modifiée sans rattacher la décision à un écart ou à un événement observé.',
    ],
  },
  "proposition d'actions préventives": {
    summary: 'Les actions préventives doivent relier un constat à une conséquence puis à une action.',
    table: {
      columns: ['Constat', 'Conséquence', 'Action préventive possible'],
      rows: [
        ['Événement perturbateur', 'Marge de restitution réduite', 'Prévoir un scénario de secours dédié'],
        ['Écart durée théorique/réelle', 'Planning minute moins fiable', 'Actualiser le rendement utilisé en préparation'],
        ['Anomalie sécurité', 'Risque terrain accru', 'Renforcer le contrôle avant GO'],
      ],
    },
    analysis: [
      'Ces propositions restent à valider avec les données détaillées par OA lorsqu’elles seront structurées.',
    ],
  },
}

export function getRexInsightForAction(action: string) {
  return PH12_REX_INSIGHTS[action.toLowerCase()]
}
