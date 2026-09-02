import financeBeneficeTotal from '@/assets/rex-dashboard/finance-benefice-total.png'
import financeBeneficesOa from '@/assets/rex-dashboard/finance-benefices-oa.png'
import financeDepensesRecettesOa from '@/assets/rex-dashboard/finance-depenses-recettes-oa.png'
import planningDureeExecutionOa from '@/assets/rex-dashboard/planning-duree-execution-oa.png'
import planningEvenementsRestitution from '@/assets/rex-dashboard/planning-evenements-restitution.png'
import planningReductionDureeOcp from '@/assets/rex-dashboard/planning-reduction-duree-ocp.png'
import planningRestitutionSansPenalites from '@/assets/rex-dashboard/planning-restitution-sans-penalites.png'
import rexCadenceOa41 from '@/assets/rex-dashboard/rex-cadence-oa41.png'
import rexCadenceOa44 from '@/assets/rex-dashboard/rex-cadence-oa44.png'
import rexCadenceOa48 from '@/assets/rex-dashboard/rex-cadence-oa48.png'
import rexCadenceOa54 from '@/assets/rex-dashboard/rex-cadence-oa54.png'
import rexDureePhasesOa41 from '@/assets/rex-dashboard/rex-duree-phases-oa41.png'
import rexDureePhasesOa44 from '@/assets/rex-dashboard/rex-duree-phases-oa44.png'
import rexDureePhasesOa48 from '@/assets/rex-dashboard/rex-duree-phases-oa48.png'
import rexDureePhasesOa54 from '@/assets/rex-dashboard/rex-duree-phases-oa54.png'
import rexDureePhasesOa56 from '@/assets/rex-dashboard/rex-duree-phases-oa56.png'
import securityAccidentsOcp from '@/assets/rex-dashboard/security-accidents-ocp.png'
import securityAnomaliesMesures from '@/assets/rex-dashboard/security-anomalies-mesures.png'
import securitySafetyForceOcp from '@/assets/rex-dashboard/security-safety-force-ocp.png'
import securityValidationLpa from '@/assets/rex-dashboard/security-validation-lpa.png'

export interface RexVisual {
  title: string
  image: string
  alt: string
}

export interface RexVisualGroup {
  label: string
  visuals: RexVisual[]
}

export interface RexInsight {
  summary: string
  visuals?: RexVisual[]
  groups?: RexVisualGroup[]
}

const securityVisuals: RexVisual[] = [
  {
    title: "Nombre d'accidents sur les OCP",
    image: securityAccidentsOcp,
    alt: "Graphique du dashboard montrant le nombre d'accidents sur les OCP",
  },
  {
    title: 'Nombre de Safety Force sur les OCP',
    image: securitySafetyForceOcp,
    alt: 'Histogramme du dashboard montrant le nombre de Safety Force par OA',
  },
  {
    title: 'Anomalies / Mesures à prendre',
    image: securityAnomaliesMesures,
    alt: 'Radar du dashboard sur les anomalies et mesures à prendre',
  },
  {
    title: 'Validation LPA',
    image: securityValidationLpa,
    alt: 'Histogramme du dashboard sur la validation LPA',
  },
]

const planningVisuals: RexVisual[] = [
  {
    title: 'Restitution des voies sans pénalités',
    image: planningRestitutionSansPenalites,
    alt: 'Graphique du dashboard sur la restitution des voies sans pénalités',
  },
  {
    title: 'Réduction de la durée des OCP en %',
    image: planningReductionDureeOcp,
    alt: 'Histogramme du dashboard sur la réduction de durée des OCP',
  },
  {
    title: 'Événements impactant la restitution',
    image: planningEvenementsRestitution,
    alt: 'Graphique du dashboard sur les événements pouvant impacter la restitution des voies',
  },
  {
    title: "Durée d'exécution des travaux par OA",
    image: planningDureeExecutionOa,
    alt: "Histogramme du dashboard comparant durée théorique, durée réelle et marge par OA",
  },
]

const financeVisuals: RexVisual[] = [
  {
    title: 'Bénéfices sur les OCP de démolition EG3',
    image: financeBeneficeTotal,
    alt: 'Graphique du dashboard indiquant le bénéfice total des OCP de démolition EG3',
  },
  {
    title: 'Dépenses et recettes par OA',
    image: financeDepensesRecettesOa,
    alt: 'Histogramme du dashboard comparant dépenses et recettes par OA',
  },
  {
    title: 'Bénéfices par OA',
    image: financeBeneficesOa,
    alt: 'Diagramme circulaire du dashboard montrant les bénéfices par OA',
  },
]

const lessonsGroups: RexVisualGroup[] = [
  {
    label: 'OA41',
    visuals: [
      {
        title: 'Durée par phase : démolition OA41',
        image: rexDureePhasesOa41,
        alt: 'Graphique du dashboard sur les durées par phase de démolition OA41',
      },
      {
        title: 'Cadence de démolition OA41',
        image: rexCadenceOa41,
        alt: 'Graphique du dashboard sur la cadence de démolition OA41',
      },
    ],
  },
  {
    label: 'OA44',
    visuals: [
      {
        title: 'Durée par phase : démolition OA44',
        image: rexDureePhasesOa44,
        alt: 'Graphique du dashboard sur les durées par phase de démolition OA44',
      },
      {
        title: 'Cadence de démolition OA44',
        image: rexCadenceOa44,
        alt: 'Graphique du dashboard sur la cadence de démolition OA44',
      },
    ],
  },
  {
    label: 'OA48',
    visuals: [
      {
        title: 'Durée par phase : démolition OA48',
        image: rexDureePhasesOa48,
        alt: 'Graphique du dashboard sur les durées par phase de démolition OA48',
      },
      {
        title: 'Cadence de démolition OA48',
        image: rexCadenceOa48,
        alt: 'Graphique du dashboard sur la cadence de démolition OA48',
      },
    ],
  },
  {
    label: 'OA54',
    visuals: [
      {
        title: 'Durée par phase : démolition OA54',
        image: rexDureePhasesOa54,
        alt: 'Graphique du dashboard sur les durées par phase de démolition OA54',
      },
      {
        title: 'Cadence de démolition OA54',
        image: rexCadenceOa54,
        alt: 'Graphique du dashboard sur la cadence de démolition OA54',
      },
    ],
  },
  {
    label: 'OA56',
    visuals: [
      {
        title: 'Durée par phase : démolition OA56',
        image: rexDureePhasesOa56,
        alt: 'Graphique du dashboard sur les durées par phase de démolition OA56',
      },
    ],
  },
]

export const PH12_REX_INSIGHTS: Record<string, RexInsight> = {
  'objectifs de sécurité atteints': {
    summary: 'Visuels sécurité réutilisés depuis le dashboard PFE.',
    visuals: securityVisuals,
  },
  'délais de restitution respectés': {
    summary: 'Visuels restitution, durée, marge et événements repris du dashboard PFE.',
    visuals: planningVisuals,
  },
  'objectifs financiers atteints': {
    summary: 'Visuels budget et bénéfices repris du dashboard PFE.',
    visuals: financeVisuals,
  },
  'validation des kpi du projet': {
    summary: 'Sélection des visuels les plus utiles pour vérifier les KPI finaux du projet.',
    visuals: [
      securityVisuals[0],
      securityVisuals[1],
      planningVisuals[0],
      planningVisuals[3],
      financeVisuals[0],
      financeVisuals[2],
    ],
  },
  'capitalisation des enseignements': {
    summary: 'Graphiques détaillés de durée et de cadence, organisés par OA.',
    groups: lessonsGroups,
  },
  'mise à jour des checklists': {
    summary: 'Visuels utiles pour repérer les contrôles à renforcer dans les futures checklists.',
    visuals: [securityAnomaliesMesures, planningEvenementsRestitution].map((image, index) => ({
      title: index === 0 ? 'Anomalies / Mesures à prendre' : 'Événements impactant la restitution',
      image,
      alt: index === 0 ? 'Visuel dashboard des anomalies et mesures à prendre' : 'Visuel dashboard des événements de restitution',
    })),
  },
  'proposition d’actions préventives': {
    summary: 'Visuels utiles pour relier les anomalies et événements à des actions préventives.',
    visuals: [securityAnomaliesMesures, planningEvenementsRestitution].map((image, index) => ({
      title: index === 0 ? 'Anomalies / Mesures à prendre' : 'Événements impactant la restitution',
      image,
      alt: index === 0 ? 'Visuel dashboard des anomalies et mesures à prendre' : 'Visuel dashboard des événements de restitution',
    })),
  },
  "proposition d'actions préventives": {
    summary: 'Visuels utiles pour relier les anomalies et événements à des actions préventives.',
    visuals: [securityAnomaliesMesures, planningEvenementsRestitution].map((image, index) => ({
      title: index === 0 ? 'Anomalies / Mesures à prendre' : 'Événements impactant la restitution',
      image,
      alt: index === 0 ? 'Visuel dashboard des anomalies et mesures à prendre' : 'Visuel dashboard des événements de restitution',
    })),
  },
}

export function getRexInsightForAction(action: string) {
  return PH12_REX_INSIGHTS[action.toLowerCase()]
}
