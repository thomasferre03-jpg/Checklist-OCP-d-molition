export interface PlanningMinuteRexTask {
  ouvrage: 'OA41' | 'OA44' | 'OA48' | 'OA54' | 'OA56'
  task: string
  company: string
  duration: string
  supervision: string
  people: string
  equipment: string
  status: 'Tache faite' | 'Point d\'arret realise' | 'Restitution realisee'
  lesson: string
}

export interface PlanningMinuteRexInsight {
  summary: string
  source: string
  tasks: PlanningMinuteRexTask[]
}

function normalizeAction(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’]/g, "'")
    .toLowerCase()
}

const protectionTasks: PlanningMinuteRexTask[] = [
  {
    ouvrage: 'OA41',
    task: 'Mise en place de la protection des voies',
    company: 'Capocci',
    duration: '8 h',
    supervision: 'Chef de chantier + chef d\'equipe',
    people: 'Equipe Capocci dediee, compagnons et conducteurs',
    equipment: 'Geotextile, madriers bois, toles metalliques',
    status: 'Tache faite',
    lesson: 'La protection OA41 est une tache lourde a securiser tot car elle consomme une part importante de la coupure.',
  },
  {
    ouvrage: 'OA48',
    task: 'Mise en place de la protection des voies',
    company: 'Capocci',
    duration: '4 h',
    supervision: 'Chef de chantier + chef d\'equipe',
    people: 'Equipe Capocci et conducteur pelle',
    equipment: 'Geotextile, polystyrene, toles, contreplaque',
    status: 'Tache faite',
    lesson: 'La protection sert aussi de plateforme de travail pour la pelle 25T, son controle conditionne la suite.',
  },
  {
    ouvrage: 'OA54',
    task: 'Mise en place de la protection des voies',
    company: 'Capocci',
    duration: '3 h',
    supervision: 'Chef de chantier protection',
    people: 'Equipe protection Capocci',
    equipment: 'Geotextile, bastaings, plaques OSB',
    status: 'Tache faite',
    lesson: 'La duree est plus courte car le tablier est depose par levage avant demolition hors voie.',
  },
  {
    ouvrage: 'OA56',
    task: 'Mise en place de la protection des voies',
    company: 'Capocci',
    duration: '5 h',
    supervision: 'Chef de chantier protection',
    people: 'Equipe protection Capocci',
    equipment: 'Geotextile, bastaings, plaques OSB',
    status: 'Tache faite',
    lesson: 'Prevoir une equipe dediee par ouvrage evite les conflits de ressources entre OA54 et OA56.',
  },
  {
    ouvrage: 'OA44',
    task: 'Mise en place de la protection des voies',
    company: 'Capocci',
    duration: '5 h',
    supervision: 'Chef de chantier + chef d\'equipe',
    people: 'Equipe terrain Capocci',
    equipment: 'Geotextile, bastaings, toles',
    status: 'Tache faite',
    lesson: 'La pose et le repli de protection doivent etre consideres comme des postes critiques du REX.',
  },
]

const demolitionTasks: PlanningMinuteRexTask[] = [
  {
    ouvrage: 'OA41',
    task: 'Demolition tablier et extraction des dechets',
    company: 'Capocci',
    duration: '22 h',
    supervision: 'Encadrant + chef chantier + chef d\'equipe',
    people: 'Deux equipes de 10 h, conducteurs pelles, conducteurs camions, compagnons',
    equipment: 'Deux pelles 50T, BRH, cisailles beton, pelle 20/25T, camions, brumisateurs',
    status: 'Tache faite',
    lesson: 'Le tablier OA41 est le poste le plus long identifie dans les plannings minutes.',
  },
  {
    ouvrage: 'OA48',
    task: 'Demolition tablier puis demolition des culees C0/C1',
    company: 'Capocci',
    duration: '11 h + 12 h + 12 h',
    supervision: 'Encadrant + chef chantier + chef d\'equipe',
    people: 'Deux equipes de 10 h, conducteurs pelles, chauffeurs, compagnons',
    equipment: 'Pelle 25T, pelle 50T, BRH, cisaille beton, camions 8x4',
    status: 'Tache faite',
    lesson: 'OA48 montre qu il faut distinguer tablier, extraction gravats et culees pour analyser les rendements.',
  },
  {
    ouvrage: 'OA54',
    task: 'Carottage, desolidarisation, grutage puis demolition du tablier',
    company: 'Capocci',
    duration: '1 h + 2 h + 2 h + 1 h',
    supervision: 'Chef chantier grutage + chef chantier terrassement',
    people: 'Equipe levage dediee, conducteurs pelles, compagnons',
    equipment: 'Pelle 50T, elingues, chalumeau, carotteuse, zone de stockage',
    status: 'Tache faite',
    lesson: 'Le REX OA54 doit alimenter les futures operations avec tablier a lever avant demolition.',
  },
  {
    ouvrage: 'OA56',
    task: 'Carottage, desolidarisation, grutage puis demolition du tablier',
    company: 'Capocci',
    duration: '1 h + 2 h + 2 h + 1 h',
    supervision: 'Chef chantier grutage + chef chantier general',
    people: 'Equipe levage dediee, conducteurs pelles, compagnons',
    equipment: 'Pelle 50T, pelle 25T, elingues, chalumeau, zone de stockage',
    status: 'Tache faite',
    lesson: 'Le commentaire VISA demande de corriger l organisation pour disposer d une equipe dediee par ouvrage.',
  },
  {
    ouvrage: 'OA44',
    task: 'Demolition tablier, piles intermediaires et culees',
    company: 'Capocci',
    duration: '8 h + 6 h + 6 h',
    supervision: 'Encadrant + chef chantier + chef d\'equipe',
    people: 'Equipes Capocci en roulement, conducteurs pelles, compagnons',
    equipment: 'Pelles 50T/40T/25T/20T, minipelle, BRH, cisailles, camions',
    status: 'Tache faite',
    lesson: 'OA44 confirme l interet de separer tablier, piles et culees dans le suivi REX.',
  },
]

const repliTasks: PlanningMinuteRexTask[] = [
  {
    ouvrage: 'OA41',
    task: 'Nettoyage gravats puis repli protection voie',
    company: 'Capocci',
    duration: '6 h + 9 h',
    supervision: 'Chef de chantier + chef d\'equipe',
    people: 'Equipe nettoyage/repli Capocci',
    equipment: 'Pelles, camions, moyens de nettoyage',
    status: 'Tache faite',
    lesson: 'Le repli OA41 est plus long que le nettoyage et doit rester dans le chemin critique.',
  },
  {
    ouvrage: 'OA48',
    task: 'Nettoyage et enlevement protection voie',
    company: 'Capocci',
    duration: '10 h',
    supervision: 'Chef de chantier + chef d\'equipe',
    people: 'Equipe nettoyage/repli Capocci',
    equipment: 'Pelles, camions, protections a deposer',
    status: 'Tache faite',
    lesson: 'Le nettoyage OA48 represente une duree majeure a comparer au temps de demolition du tablier.',
  },
  {
    ouvrage: 'OA54',
    task: 'Nettoyage gravats et enlevement protection voie',
    company: 'Capocci',
    duration: '5 h + 5 h',
    supervision: 'Chef de chantier protection',
    people: 'Equipe nettoyage/repli Capocci',
    equipment: 'Pelles, moyens de nettoyage, protections bois',
    status: 'Tache faite',
    lesson: 'Le nettoyage/repli totalise 10 h meme lorsque le tablier est leve hors voie.',
  },
  {
    ouvrage: 'OA56',
    task: 'Nettoyage gravats et enlevement protection voie',
    company: 'Capocci',
    duration: '5 h + 5 h',
    supervision: 'Chef de chantier protection',
    people: 'Equipe nettoyage/repli Capocci',
    equipment: 'Pelles, moyens de nettoyage, protections bois',
    status: 'Tache faite',
    lesson: 'La symetrie OA54/OA56 permet de reutiliser ces durees comme base REX pour futurs ouvrages similaires.',
  },
  {
    ouvrage: 'OA44',
    task: 'Nettoyage gravats puis repli protection voie',
    company: 'Capocci',
    duration: '5 h + 6 h',
    supervision: 'Chef de chantier + chef d\'equipe',
    people: 'Equipe nettoyage/repli Capocci',
    equipment: 'Pelles, camions, protections a deposer',
    status: 'Tache faite',
    lesson: 'Le REX OA44 confirme que le nettoyage et le repli doivent etre suivis comme des taches faites, pas comme une simple fin de chantier.',
  },
]

const holdPointTasks: PlanningMinuteRexTask[] = [
  {
    ouvrage: 'OA41',
    task: 'PA CACES, PA protection voie, GO/NO GO demolition, PA repli protection',
    company: 'SNCF / EGC',
    duration: '1 h + 30 min + PA + 30 min',
    supervision: 'Responsable OCP + interlocuteurs SNCF',
    people: 'Encadrement EGC, SNCF, chef chantier Capocci',
    equipment: 'Dossiers CACES, controle protection, controle restitution',
    status: 'Point d\'arret realise',
    lesson: 'Les PA structurent la poursuite de l OCP et doivent etre traces dans le REX.',
  },
  {
    ouvrage: 'OA48',
    task: 'PA CACES, PA protection, GO/NO GO apres demolition tablier, PA fin demolition, PA repli',
    company: 'SNCF / EGC',
    duration: '1 h + 30 min + PA + 30 min + 30 min',
    supervision: 'Responsable OCP + SNCF + EGC',
    people: 'Encadrement EGC, SNCF, chef chantier Capocci',
    equipment: 'Controle protection, controle cotes, controle nettoyage',
    status: 'Point d\'arret realise',
    lesson: 'OA48 montre qu un PA intermediaire apres tablier securise la poursuite sur les culees.',
  },
  {
    ouvrage: 'OA54',
    task: 'PA CACES, PA protection, PA fin demolition/talutage, PA repli protection',
    company: 'SNCF / EGC',
    duration: '30 min + 30 min + 30 min + 30 min',
    supervision: 'Responsable OCP + SNCF + EGC',
    people: 'Encadrement EGC, SNCF, chefs chantier Capocci',
    equipment: 'Controle CACES, protection, talutage, restitution',
    status: 'Point d\'arret realise',
    lesson: 'Les PA courts mais nombreux doivent etre visibles pour eviter une perte de temps masquee.',
  },
  {
    ouvrage: 'OA56',
    task: 'PA CACES, PA protection, PA fin demolition/talutage, PA repli protection',
    company: 'SNCF / EGC',
    duration: '30 min + 30 min + 30 min + 30 min',
    supervision: 'Responsable OCP + SNCF + EGC',
    people: 'Encadrement EGC, SNCF, chefs chantier Capocci',
    equipment: 'Controle CACES, protection, talutage, restitution',
    status: 'Point d\'arret realise',
    lesson: 'Le REX rappelle de synchroniser les PA entre OA54 et OA56.',
  },
  {
    ouvrage: 'OA44',
    task: 'PA CACES, PA protection voie, GO/NO GO culées, PA nettoyage/repli',
    company: 'SNCF / EGC',
    duration: '1 h + 30 min + 30 min + 30 min',
    supervision: 'Responsable OCP + SNCF + EGC',
    people: 'Encadrement EGC, SNCF, chef chantier Capocci',
    equipment: 'Controle protection, controle nettoyage, filets orange',
    status: 'Point d\'arret realise',
    lesson: 'Le PA final OA44 integre aussi la pose de filets orange a 3 m de l axe voies.',
  },
]

const topoRestitutionTasks: PlanningMinuteRexTask[] = [
  {
    ouvrage: 'OA41',
    task: 'Intervention topo fin OCP et restitution voies',
    company: 'Louvet / EGC',
    duration: '1 h + 30 min',
    supervision: 'Encadrement EGC',
    people: 'Geometre + responsable restitution',
    equipment: 'Materiel topographique',
    status: 'Restitution realisee',
    lesson: 'Le topo final est directement lie a l autorisation de restitution.',
  },
  {
    ouvrage: 'OA48',
    task: 'Intervention topo fin OCP et restitution voies',
    company: 'Louvet / EGC',
    duration: '1 h + 30 min',
    supervision: 'Encadrement EGC',
    people: 'Geometre + responsable restitution',
    equipment: 'Materiel topographique',
    status: 'Restitution realisee',
    lesson: 'Les cotes finales de culees rendent le controle topo indispensable dans le REX.',
  },
  {
    ouvrage: 'OA54',
    task: 'Intervention topo fin OCP et restitution voies',
    company: 'Louvet / EGC',
    duration: '30 min + 30 min',
    supervision: 'Encadrement EGC',
    people: 'Geometre + responsable restitution',
    equipment: 'Materiel topographique',
    status: 'Restitution realisee',
    lesson: 'La restitution OA54 s appuie sur un controle topo court mais a ne pas absorber dans le repli.',
  },
  {
    ouvrage: 'OA56',
    task: 'Intervention topo fin OCP et restitution voies',
    company: 'Louvet / EGC',
    duration: '30 min + 30 min',
    supervision: 'Encadrement EGC',
    people: 'Geometre + responsable restitution',
    equipment: 'Materiel topographique',
    status: 'Restitution realisee',
    lesson: 'Le controle final confirme la liberation de la zone et doit etre capitalise dans le REX.',
  },
  {
    ouvrage: 'OA44',
    task: 'Intervention topo fin OCP et restitution voies',
    company: 'Louvet / EGC',
    duration: '1 h + restitution',
    supervision: 'Encadrement EGC',
    people: 'Geometre + responsable restitution',
    equipment: 'Materiel topographique',
    status: 'Restitution realisee',
    lesson: 'La date du planning OA44 presente une incoherence documentaire a verifier avant reutilisation.',
  },
]

const peopleEquipmentTasks: PlanningMinuteRexTask[] = [
  {
    ouvrage: 'OA41',
    task: 'Mobilisation des equipes et moyens de demolition',
    company: 'Capocci / EGC',
    duration: 'Roulements 10 h et equipes EGC 8 h',
    supervision: 'Encadrant, chef chantier, chef equipe, soutien EGC',
    people: 'Conducteurs pelles/camions, compagnons, encadrement EGC',
    equipment: 'Pelles 50T, 20/25T, minipelle, camions, brumisateurs, roulotte, groupe, cuves',
    status: 'Tache faite',
    lesson: 'Le REX doit conserver la composition des equipes, pas seulement le nom du porteur.',
  },
  {
    ouvrage: 'OA48',
    task: 'Mobilisation des equipes et moyens de demolition',
    company: 'Capocci / EGC',
    duration: 'Roulements 10 h et equipes EGC 8 h',
    supervision: 'Encadrant, chef chantier, chef equipe, soutien EGC',
    people: 'Conducteurs pelles/camions, compagnons, encadrement EGC',
    equipment: 'Pelle 50T, pelle 25T, minipelle, 8x4, polybenne, brumisateur, eclairage, cuves',
    status: 'Tache faite',
    lesson: 'La pelle 25T a un role central sur OA48 et doit apparaitre comme moyen cle.',
  },
  {
    ouvrage: 'OA54',
    task: 'Mobilisation equipe levage, terrassement et protection',
    company: 'Capocci / EGC',
    duration: 'Equipes Capocci et EGC en postes',
    supervision: 'Chef chantier protection, grutage, terrassement, chef chantier general',
    people: 'Equipe levage, conducteurs pelles, compagnons, encadrement EGC',
    equipment: 'Pelle 50T, pelle 25T, minipelle, camion 8x4, porte-char astreinte, groupe, eclairage',
    status: 'Tache faite',
    lesson: 'Le decoupage par encadrement specialise rend le REX plus utile pour les futurs levages.',
  },
  {
    ouvrage: 'OA56',
    task: 'Mobilisation equipe dediee par ouvrage',
    company: 'Capocci / EGC',
    duration: 'Equipes Capocci et EGC en postes',
    supervision: 'Chef chantier protection, grutage, terrassement, chef chantier general',
    people: 'Equipe levage, conducteurs pelles, compagnons, encadrement EGC',
    equipment: 'Pelles 50T/25T/20T, minipelle, camion 8x4, roulotte, groupe, eclairage, cuves',
    status: 'Tache faite',
    lesson: 'Le VISA signale explicitement l interet d une equipe dediee par ouvrage.',
  },
  {
    ouvrage: 'OA44',
    task: 'Mobilisation des equipes et moyens de demolition',
    company: 'Capocci / EGC',
    duration: 'Equipes Capocci en roulement et equipes EGC 8 h',
    supervision: 'Encadrant, chef chantier, chef equipe, soutien EGC',
    people: 'Conducteurs pelles/camions, compagnons, encadrement EGC',
    equipment: 'Pelles 50T/40T/25T/20T, minipelle 6T, camions, porte-char astreinte',
    status: 'Tache faite',
    lesson: 'OA44 confirme la necessite de lier les engins aux taches realisees.',
  },
]

const planningSummaryTasks: PlanningMinuteRexTask[] = [
  {
    ouvrage: 'OA41',
    task: 'Deroulement OCP avec marge finale',
    company: 'Capocci / EGC / SNCF / Louvet',
    duration: 'Marge constatee 4 h 30',
    supervision: 'Responsable OCP + encadrement entreprises',
    people: 'Capocci, EGC, SNCF, Louvet',
    equipment: 'Moyens demolition, protection, topo et restitution',
    status: 'Tache faite',
    lesson: 'La marge OA41 est faible au regard de la duree de demolition et de repli.',
  },
  {
    ouvrage: 'OA48',
    task: 'Deroulement OCP avec marge finale',
    company: 'Capocci / EGC / SNCF / Louvet',
    duration: 'Marge constatee 9 h 30',
    supervision: 'Responsable OCP + encadrement entreprises',
    people: 'Capocci, EGC, SNCF, Louvet',
    equipment: 'Moyens demolition, protection, topo et restitution',
    status: 'Tache faite',
    lesson: 'La marge OA48 absorbe mieux les aleas mais le nettoyage reste un poste long.',
  },
  {
    ouvrage: 'OA54',
    task: 'Deroulement OCP avec marge finale',
    company: 'Capocci / EGC / SNCF / Louvet',
    duration: 'Marge constatee 19 h 30',
    supervision: 'Responsable OCP + encadrement entreprises',
    people: 'Capocci, EGC, SNCF, Louvet',
    equipment: 'Moyens levage, demolition, protection, topo et restitution',
    status: 'Tache faite',
    lesson: 'La methode par levage laisse une marge importante mais demande une preparation tres structuree.',
  },
  {
    ouvrage: 'OA56',
    task: 'Deroulement OCP avec marge finale',
    company: 'Capocci / EGC / SNCF / Louvet',
    duration: 'Marge constatee 15 h 30',
    supervision: 'Responsable OCP + encadrement entreprises',
    people: 'Capocci, EGC, SNCF, Louvet',
    equipment: 'Moyens levage, demolition, protection, topo et restitution',
    status: 'Tache faite',
    lesson: 'La marge OA56 reste confortable si les equipes dediees sont bien verrouillees.',
  },
  {
    ouvrage: 'OA44',
    task: 'Deroulement OCP avec marge finale',
    company: 'Capocci / EGC / SNCF / Louvet',
    duration: 'Marge constatee environ 9 h',
    supervision: 'Responsable OCP + encadrement entreprises',
    people: 'Capocci, EGC, SNCF, Louvet',
    equipment: 'Moyens demolition, protection, topo et restitution',
    status: 'Tache faite',
    lesson: 'Le REX OA44 doit etre conserve avec une verification de l incoherence de date du document.',
  },
]

const RAW_PLANNING_MINUTE_REX_BY_ACTION = {
  'Élaborer le planning minute': {
    summary: 'Les plannings minutes deviennent la base REX: ils conservent les taches reellement deroulees, leur duree, les marges et les intervenants.',
    source: 'Plannings minutes OA41/OA48, OA54/OA56 et OA44',
    tasks: planningSummaryTasks,
  },
  'Faire un planning ressourcé': {
    summary: 'Le REX montre que le planning doit croiser les taches avec les equipes, l encadrement, les engins et les postes horaires.',
    source: 'Plannings minutes OA41/OA48, OA54/OA56 et OA44',
    tasks: peopleEquipmentTasks,
  },
  'Vérifier les effectifs': {
    summary: 'Les plannings donnent les fonctions mobilisees: encadrants, chefs chantier, chefs equipe, conducteurs pelles/camions, compagnons et soutien EGC.',
    source: 'Plannings minutes OA41/OA48, OA54/OA56 et OA44',
    tasks: peopleEquipmentTasks,
  },
  'Tous les engins réservés': {
    summary: 'Les moyens utilises sont a capitaliser par ouvrage pour dimensionner les futures OCP.',
    source: 'Plannings minutes OA41/OA48, OA54/OA56 et OA44',
    tasks: peopleEquipmentTasks,
  },
  'Protection des réseaux': {
    summary: 'Dans les plannings minutes, ce sujet correspond surtout au REX de protection des voies ferrees.',
    source: 'Plannings minutes OA41/OA48, OA54/OA56 et OA44',
    tasks: protectionTasks,
  },
  'Choix de la méthode de démolition': {
    summary: 'Les plannings distinguent demolition mecanique en place et demolition apres levage, a conserver comme REX methode.',
    source: 'Plannings minutes OA41/OA48, OA54/OA56 et OA44',
    tasks: demolitionTasks,
  },
  'Moyens de levage disponibles': {
    summary: 'OA54 et OA56 apportent un REX specifique sur carottage, elingage, desolidarisation et grutage du tablier.',
    source: 'Planning minute OA54/OA56',
    tasks: demolitionTasks.filter((task) => task.ouvrage === 'OA54' || task.ouvrage === 'OA56'),
  },
  'Définir les points d\'arrêt': {
    summary: 'Les PA des plannings doivent etre capitalises comme jalons reels de controle et de poursuite.',
    source: 'Plannings minutes OA41/OA48, OA54/OA56 et OA44',
    tasks: holdPointTasks,
  },
  'Validation des points d\'arrêt avant poursuite': {
    summary: 'Le REX confirme que les points d arret conditionnent la poursuite des taches critiques.',
    source: 'Plannings minutes OA41/OA48, OA54/OA56 et OA44',
    tasks: holdPointTasks,
  },
  'Respect du planning minute par minute': {
    summary: 'Le pilotage OCP doit suivre les taches faites dans l ordre reel du planning minute.',
    source: 'Plannings minutes OA41/OA48, OA54/OA56 et OA44',
    tasks: [...protectionTasks, ...demolitionTasks, ...repliTasks].slice(0, 12),
  },
  'Suivi du chemin critique': {
    summary: 'Les taches longues du REX sont la protection, la demolition, le nettoyage et le repli protection.',
    source: 'Plannings minutes OA41/OA48, OA54/OA56 et OA44',
    tasks: [...planningSummaryTasks, ...repliTasks],
  },
  'Prévoir les temps de repli': {
    summary: 'Les temps de nettoyage et repli sont des donnees REX majeures a reutiliser dans les futures estimations.',
    source: 'Plannings minutes OA41/OA48, OA54/OA56 et OA44',
    tasks: repliTasks,
  },
  'Contrôle topographique réalisé': {
    summary: 'Le topo final est present sur chaque ouvrage et precede la restitution.',
    source: 'Plannings minutes OA41/OA48, OA54/OA56 et OA44',
    tasks: topoRestitutionTasks,
  },
  'Autorisation de restitution obtenue': {
    summary: 'La restitution est la derniere validation terrain apres nettoyage, repli et topo final.',
    source: 'Plannings minutes OA41/OA48, OA54/OA56 et OA44',
    tasks: topoRestitutionTasks,
  },
  'Comparaison planning prévu / réalisé': {
    summary: 'Les marges et durees issues des plannings minutes servent de reference REX pour comparer les futures OCP.',
    source: 'Plannings minutes OA41/OA48, OA54/OA56 et OA44',
    tasks: planningSummaryTasks,
  },
  'Analyse des rendements obtenus': {
    summary: 'Les durees par tache permettent d isoler les rendements de protection, demolition, nettoyage et repli.',
    source: 'Plannings minutes OA41/OA48, OA54/OA56 et OA44',
    tasks: [...demolitionTasks, ...repliTasks],
  },
  'Capitalisation des enseignements': {
    summary: 'Les plannings minutes doivent etre archives comme REX operationnel par ouvrage, equipe, moyen et tache faite.',
    source: 'Plannings minutes OA41/OA48, OA54/OA56 et OA44',
    tasks: [...planningSummaryTasks, ...peopleEquipmentTasks],
  },
  'Intégration des enseignements dans les futurs modes opératoires': {
    summary: 'Le REX planning minute doit enrichir les modes operatoires types: equipes dediees, protections, levage, repli et PA.',
    source: 'Plannings minutes OA41/OA48, OA54/OA56 et OA44',
    tasks: [...protectionTasks, ...demolitionTasks, ...holdPointTasks],
  },
} satisfies Record<string, PlanningMinuteRexInsight>

const PLANNING_MINUTE_REX_BY_ACTION: Record<string, PlanningMinuteRexInsight> = Object.fromEntries(
  Object.entries(RAW_PLANNING_MINUTE_REX_BY_ACTION).map(([action, insight]) => [normalizeAction(action), insight]),
)

export function getPlanningMinuteRexInsight(action: string) {
  return PLANNING_MINUTE_REX_BY_ACTION[normalizeAction(action)] ?? null
}
