export interface FieldRexEntry {
  label: string
  text: string
}

export interface FieldRexInsight {
  category: string
  entries: FieldRexEntry[]
}

export const FIELD_REX_SOURCE = {
  title: 'Article chantier Gretz-Troyes',
  url: 'https://capocci.fr/demolition-ouvrages-art-gretz-troyes-sncf/',
}

function normalizeAction(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’]/g, "'")
    .toLowerCase()
}

const tightWindow: FieldRexEntry = {
  label: 'Point de vigilance',
  text: "Les demolitions se font dans des coupures ciblees, principalement le week-end. Il n'y a pas de rattrapage possible : la voie doit etre rendue conforme a l'heure prevue.",
}

const coordination: FieldRexEntry = {
  label: 'REX coordination',
  text: "L'operation repose sur une coordination fluide entre le maitre d'ouvrage, l'entreprise generale et l'entreprise de demolition, avec un enchainement continu jusqu'a la restitution.",
}

const safety: FieldRexEntry = {
  label: 'REX securite',
  text: "La mise en securite prealable, la consignation, la protection de l'infrastructure, le controle des vibrations et le respect des regles ferroviaires sont des conditions a verifier avant demolition.",
}

const waste: FieldRexEntry = {
  label: 'REX dechets',
  text: "Le tri, la gestion des gravats et l'evacuation des materiaux doivent etre anticipes en site contraint pour eviter toute rupture du cycle de demolition.",
}

export const FIELD_REX_INSIGHTS: Record<string, FieldRexInsight> = {
  'identification des contraintes sncf': {
    category: 'Contraintes ferroviaires',
    entries: [
      {
        label: 'Information complementaire',
        text: "Le chantier Gretz-Troyes s'inscrit dans un calendrier contraint par les circulations ferroviaires et par des coupures ciblees.",
      },
    ],
  },
  "identification des contraintes d'exploitation": {
    category: 'Contraintes ferroviaires',
    entries: [tightWindow],
  },
  'identifier les jalons critiques': {
    category: 'Planning',
    entries: [tightWindow],
  },
  'elaborer le macro-planning de preparation': {
    category: 'Planning',
    entries: [
      {
        label: 'Bonne pratique terrain',
        text: "La preparation en amont, le phasage precis et la logistique anticipee sont les leviers principaux pour tenir une OCP sous contrainte horaire forte.",
      },
    ],
  },
  'verifier les contraintes sncf': {
    category: 'Contraintes ferroviaires',
    entries: [
      {
        label: 'Source externe',
        text: "L'exemple Gretz-Troyes confirme l'importance de rattacher les contraintes ferroviaires aux coupures autorisees et aux obligations de restitution.",
      },
    ],
  },
  'choix de la methode de demolition': {
    category: 'Methode',
    entries: [
      {
        label: 'Information complementaire',
        text: 'Le phasage terrain comprend une deconstruction mecanique ciblee apres mise en securite et consignation.',
      },
    ],
  },
  'definir le phasage detaille': {
    category: 'Methode',
    entries: [
      {
        label: 'Exemple chantier',
        text: "Phasage observe : mise en securite et consignation, deconstruction mecanique ciblee, evacuation des materiaux, nettoyage et controle final, restitution de l'infrastructure.",
      },
      {
        label: 'Dates OA',
        text: 'OA41 et OA48 : week-end du 4 avril ; OA54 et OA56 : week-end du 11 avril ; OA44 : week-end du 2 mai.',
      },
    ],
  },
  "elaborer les procedures d'execution": {
    category: 'Methode',
    entries: [
      {
        label: 'Information complementaire',
        text: "Les procedures doivent couvrir la protection de l'infrastructure, la gestion des gravats, le controle des vibrations et la remise en securite avant restitution.",
      },
    ],
  },
  'definir les sequences critiques': {
    category: 'Planning',
    entries: [tightWindow],
  },
  'elaborer le planning minute': {
    category: 'Planning',
    entries: [tightWindow],
  },
  'identifier le chemin critique': {
    category: 'Planning',
    entries: [tightWindow],
  },
  'prevoir les temps de repli': {
    category: 'Restitution',
    entries: [
      {
        label: 'Point de vigilance',
        text: "Le nettoyage, le controle final de la plateforme et la restitution conforme de l'infrastructure doivent etre integres avant la fin du creneau.",
      },
    ],
  },
  'verifier les interfaces avec les autres entreprises': {
    category: 'Coordination',
    entries: [coordination],
  },
  'verification des sous-traitants': {
    category: 'Coordination',
    entries: [
      {
        label: 'Information complementaire',
        text: "L'entreprise de demolition doit etre clairement integree au dispositif d'interfaces avec l'entreprise generale et le maitre d'ouvrage.",
      },
    ],
  },
  'faire un planning ressource': {
    category: 'Ressources humaines',
    entries: [
      {
        label: 'Bonne pratique terrain',
        text: 'Une mobilisation des equipes en continu, de jour comme de nuit si necessaire, permet de garantir la securite, la preservation des voies et les delais contractuels.',
      },
    ],
  },
  'aire dechets': {
    category: 'Dechets',
    entries: [waste],
  },
  'tous les engins reserves': {
    category: 'Logistique',
    entries: [
      {
        label: 'Point de vigilance',
        text: "L'installation des engins fait partie des operations a caler dans des fenetres d'intervention tres courtes.",
      },
    ],
  },
  'moyens de nettoyage disponibles': {
    category: 'Restitution',
    entries: [
      {
        label: 'Point de vigilance',
        text: "Le nettoyage et le controle final de la plateforme sont des etapes a preparer avant restitution de l'infrastructure.",
      },
    ],
  },
  'ppsps (plan particulier de securite et de protection de la sante)': {
    category: 'Securite',
    entries: [safety],
  },
  'gestion des dechets (soged)': {
    category: 'Dechets',
    entries: [waste],
  },
  'protection des reseaux': {
    category: 'Securite',
    entries: [
      {
        label: 'REX securite',
        text: "La protection de l'infrastructure et la preservation des voies sont a verifier pendant toute l'intervention.",
      },
    ],
  },
  'reunion sous-traitants organisee': {
    category: 'Coordination',
    entries: [coordination],
  },
  'reunion sncf organisee': {
    category: 'Coordination',
    entries: [coordination],
  },
  'planning partage': {
    category: 'Coordination',
    entries: [coordination],
  },
  'procedure go / no go definie': {
    category: 'GO / NO GO',
    entries: [tightWindow],
  },
  'tous les reseaux consignes': {
    category: 'Securite',
    entries: [safety],
  },
  'briefing securite realise': {
    category: 'Securite',
    entries: [safety],
  },
  'respect du planning horaire': {
    category: 'Pilotage OCP',
    entries: [tightWindow],
  },
  'respect du planning minute par minute': {
    category: 'Pilotage OCP',
    entries: [tightWindow],
  },
  'suivi du chemin critique': {
    category: 'Pilotage OCP',
    entries: [tightWindow],
  },
  "coordination permanente entre les equipes": {
    category: 'Coordination',
    entries: [coordination],
  },
  'gestion des interfaces entre entreprises': {
    category: 'Coordination',
    entries: [coordination],
  },
  'dechets evacues': {
    category: 'Dechets',
    entries: [waste],
  },
  'autorisation de restitution obtenue': {
    category: 'Restitution',
    entries: [
      {
        label: 'Point de vigilance',
        text: "A l'issue de l'intervention, la voie doit etre rendue conforme, sans impact sur la reprise du trafic.",
      },
    ],
  },
  'restitution de la zone dans les delais contractuels': {
    category: 'Restitution',
    entries: [tightWindow],
  },
  'comparaison planning prevu / realise': {
    category: 'REX planning',
    entries: [tightWindow],
  },
  'analyse des ecarts de delai': {
    category: 'REX planning',
    entries: [tightWindow],
  },
  'inventaire des dechets effectue': {
    category: 'REX dechets',
    entries: [waste],
  },
  'identification des bonnes pratiques': {
    category: 'REX',
    entries: [
      {
        label: 'Bonne pratique terrain',
        text: "L'exemple Gretz-Troyes met en avant la preparation en amont, le phasage precis, la logistique anticipee, la coordination des equipes et la securisation des zones d'intervention.",
      },
    ],
  },
  "proposition d'actions preventives": {
    category: 'REX',
    entries: [
      {
        label: 'Action preventive',
        text: "Prevoir les moyens, l'enchainement des taches et les solutions de repli avant la coupure pour eviter toute rupture de production pendant l'OCP.",
      },
    ],
  },
  'mise a jour des procedures internes': {
    category: 'REX',
    entries: [
      {
        label: 'Capitalisation',
        text: 'Les procedures types doivent integrer les exigences observees : protection infrastructure, controle vibrations, gestion gravats, controle final et restitution conforme.',
      },
    ],
  },
  'mise a jour des checklists': {
    category: 'REX',
    entries: [
      {
        label: 'Capitalisation',
        text: 'Les checklists futures doivent verifier explicitement la securisation, la consignation, les engins, la sequence de demolition, l evacuation, le nettoyage, le controle final et la restitution.',
      },
    ],
  },
  'capitalisation des enseignements': {
    category: 'REX',
    entries: [
      {
        label: 'Exemple chantier',
        text: 'Ouvrages cites : OA41 Pont de la Comtesse a Romilly-sur-Seine, OA48 Saint-Mesmin, OA54 et OA56 Saint-Lye, OA44 Pont de la Garenne a Romilly-sur-Seine.',
      },
      {
        label: 'Enseignement',
        text: "La rapidite d'execution repose sur la preparation amont, le phasage, la logistique, la coordination et la securisation, puis sur un enchainement sans rupture jusqu'a la restitution.",
      },
    ],
  },
  'delais de restitution respectes': {
    category: 'REX restitution',
    entries: [tightWindow],
  },
  'objectifs de securite atteints': {
    category: 'REX securite',
    entries: [safety],
  },
  'validation des kpi du projet': {
    category: 'REX KPI',
    entries: [
      {
        label: 'Indicateurs qualitatifs',
        text: "Les criteres a suivre en cloture sont : respect des delais contractuels, preservation des voies, securite des intervenants et absence d'impact sur la reprise du trafic.",
      },
    ],
  },
}

export function getFieldRexInsight(action: string) {
  return FIELD_REX_INSIGHTS[normalizeAction(action)]
}
