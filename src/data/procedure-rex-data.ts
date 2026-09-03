import oa41CinematiqueDemolition from '@/assets/procedure-rex/oa41-cinematique-demolition.png'
import oa41PlanPhasage from '@/assets/procedure-rex/oa41-plan-phasage.png'
import oa48ProtectionVoies from '@/assets/procedure-rex/oa48-protection-voies.png'
import oa56CarottagesElingage from '@/assets/procedure-rex/oa56-carottages-elingage.png'
import oa56LevageTablier from '@/assets/procedure-rex/oa56-levage-tablier.png'

export type ProcedureRexType = 'Exigence / controle' | 'Methode / moyen' | 'REX / bonne pratique' | 'A verifier'

export interface ProcedureRexEntry {
  oa: 'OA41' | 'OA48' | 'OA56' | 'OA41 / OA48 / OA56' | 'OA48 / OA56'
  type: ProcedureRexType
  title: string
  text: string
  source: string
  image?: string
}

function normalizeAction(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’]/g, "'")
    .toLowerCase()
}

const RAW_PROCEDURE_REX_BY_ACTION = {
  "Identifier le type d'ouvrage (matériau, structure, mode de construction)": [
    {
      oa: 'OA41',
      type: 'Methode / moyen',
      title: 'Pont poutre beton avec appuis intermediaires',
      text: "Le volume indique est de 180 m3 pour la superstructure tablier + poteaux et 13 m3 pour les semelles. Cette donnee sert a cadrer les moyens, les volumes et les zones de demolition.",
      source: 'Procedure demolition OA41, §1.5, page 13',
    },
    {
      oa: 'OA48',
      type: 'Methode / moyen',
      title: 'Pont dalle beton avec culées importantes',
      text: "Le document indique 32 m3 de tablier et 132 m3 de culees/murets de soutenement. La methode doit donc traiter autant la demolition du tablier que le terrassement-demolition des culees.",
      source: 'Procedure demolition OA48, §1.5, page 18',
    },
    {
      oa: 'OA56',
      type: 'A verifier',
      title: 'Incoherence documentaire OA56 / OA54',
      text: "La procedure intitulee OA56 decrit dans le corps du document un ouvrage OA54, pont mixte metal/bois avec tablier de 6,2 t. Cette information doit etre verifiee avant d'etre reutilisee comme donnee de reference.",
      source: 'Procedure demolition OA56, §1.4, page 9',
    },
  ],
  'Arrêtés de circulation obtenus': [
    {
      oa: 'OA41 / OA48 / OA56',
      type: 'Exigence / controle',
      title: 'Fermeture de voirie et deviation en amont',
      text: "Les procedures placent la fermeture de voirie et la deviation circulation avant l'OCP. Ce point doit etre securise avant le week-end pour ne pas consommer la coupure.",
      source: 'OA41 §3 page 15, OA48 §3 page 20, OA56 §1.1 page 6',
    },
  ],
  'Définir le phasage détaillé': [
    {
      oa: 'OA41',
      type: 'REX / bonne pratique',
      title: 'Decroutage avant week-end',
      text: "Le retrait de l'enrobe du tablier est realise avant week-end. Un geotextile est fixe sur les garde-corps pour eviter les chutes de materiaux sur voie.",
      source: 'Procedure demolition OA41, §4.1.2, page 16',
      image: oa41PlanPhasage,
    },
    {
      oa: 'OA48',
      type: 'REX / bonne pratique',
      title: 'Pre-terrassement a -2 m du terrain naturel',
      text: "Le pre-terrassement evacue l'interieur des culees jusqu'a environ -2 m du TN afin d'anticiper les travaux du week-end.",
      source: 'Procedure demolition OA48, §4.1.2, page 21',
    },
    {
      oa: 'OA56',
      type: 'Methode / moyen',
      title: 'Pre-terrassement pour levage',
      text: "La plateforme est preparee a environ -1,5 m du terrain initial pour permettre la desolidarisation du tablier de ses appareils d'appui.",
      source: 'Procedure demolition OA56, §4.1.1, page 12',
    },
  ],
  'Préparer les plans de phasage': [
    {
      oa: 'OA41 / OA48 / OA56',
      type: 'Methode / moyen',
      title: 'Plans, vues 3D et cinematiques a exploiter',
      text: "Les procedures contiennent des vues de protection, de circulation d'engins, de pre-terrassement, de demolition et de levage. Ces visuels doivent etre repris comme supports de briefing quand ils concernent directement la tache.",
      source: 'OA41 pages 16-24, OA48 pages 21-25, OA56 pages 12-16',
    },
  ],
  'Protection des réseaux': [
    {
      oa: 'OA41',
      type: 'Methode / moyen',
      title: 'Protection voie par geotextile, madriers et toles',
      text: "La surface protegee couvre le tablier a demolir avec 4 m de part et d'autre. Les madriers compensent notamment le niveau different entre les deux voies.",
      source: 'Procedure demolition OA41, §4.2.1, pages 19-20',
    },
    {
      oa: 'OA48',
      type: 'Methode / moyen',
      title: 'Protection renforcee pour circulation de pelle',
      text: "La protection associe geotextile, sacs de sable, polystyrene, toles de 30 mm au droit de la pelle 25T et contreplaque 22 mm pour faciliter le curage.",
      source: 'Procedure demolition OA48, §4.2.2, page 22',
      image: oa48ProtectionVoies,
    },
    {
      oa: 'OA56',
      type: 'Methode / moyen',
      title: 'Protection bois pour tablier grute',
      text: "La protection repose sur geotextile, bastings et plaques bois de 22 mm. Elle est adaptee a une methode ou le tablier est leve, avec peu de blocs attendus sur la protection.",
      source: 'Procedure demolition OA56, §4.1.2-4.1.3, pages 12-13',
    },
  ],
  'Tous les engins réservés': [
    {
      oa: 'OA41',
      type: 'Methode / moyen',
      title: 'Atelier de demolition surdimensionne',
      text: "Deux pelles 50T equipees cisaille/BRH demolissent depuis les deux rives, avec pelle 20/25T pour extraction et chargement, pelle 8T, chargeuse 5T, camions et brumisateurs.",
      source: 'Procedure demolition OA41, §2.1 page 14 et §4.2.3 page 20',
    },
    {
      oa: 'OA48',
      type: 'Methode / moyen',
      title: 'Role precis de la pelle 25T',
      text: "La pelle 25T travaille depuis la plateforme de protection avec cisaille beton, puis passe au godet pour rapprocher les gravats vers la pelle 50T.",
      source: 'Procedure demolition OA48, §4.2.5, page 24',
    },
  ],
  'Matériel de secours prévu': [
    {
      oa: 'OA41',
      type: 'REX / bonne pratique',
      title: 'Astreinte stockee sur zone OA41',
      text: "Le materiel d'astreinte annonce comprend pelle 50T, pelle 20T, minipelle et camion 8x4, stockes dans la zone de stock OA41.",
      source: 'Procedure demolition OA41, §2.1, page 14',
    },
    {
      oa: 'OA48',
      type: 'REX / bonne pratique',
      title: 'Astreinte mutualisee avec porte-char',
      text: "L'astreinte est stockee a l'OA41 pour OA48, avec un porte-char prevu pendant le week-end pour les transferts.",
      source: 'Procedure demolition OA48, §2.1, page 19',
    },
    {
      oa: 'OA56',
      type: 'REX / bonne pratique',
      title: 'Astreinte minimale a confirmer',
      text: "La procedure prevoit 1 pelle 50T, 1 pelle 20T et 1 camion 8x4 en astreinte. La localisation n'est pas detaillee dans l'extrait analyse.",
      source: 'Procedure demolition OA56, §2.1, page 10',
    },
  ],
  'Moyens de levage disponibles': [
    {
      oa: 'OA56',
      type: 'Exigence / controle',
      title: 'Levage du tablier a la pelle 50T',
      text: "La configuration indique une portee de 7,5 m, une hauteur de fleche de 6 m et un poids de tablier retenu de 6,3 t. L'adequation de levage doit etre verifiee avant execution.",
      source: 'Procedure demolition OA56, §4.1.4, pages 14-15',
      image: oa56LevageTablier,
    },
    {
      oa: 'OA56',
      type: 'Exigence / controle',
      title: 'Elingage par carottages',
      text: "Des carottages sont realises dans le sol bois pour passer les elingues textiles en panier autour des poutres metalliques. Les travailleurs conservent les garde-corps et portent un harnais.",
      source: 'Procedure demolition OA56, §4.1.4, page 14',
      image: oa56CarottagesElingage,
    },
  ],
  'Vérifier les effectifs': [
    {
      oa: 'OA41 / OA48 / OA56',
      type: 'Methode / moyen',
      title: 'Fonctions terrain a controler',
      text: "Les procedures citent conducteurs de travaux, chef de chantier, chauffeurs d'engins, ingenieur sols pollues, agent tracabilite, geometres, hommes trafic et ouvrier en insertion.",
      source: 'OA41 §2.2 page 14, OA48 §2.2 page 19, OA56 §2.2 page 10',
    },
  ],
  'Vérifier les habilitations': [
    {
      oa: 'OA41 / OA48 / OA56',
      type: 'Exigence / controle',
      title: 'Dossiers personnel avant demarrage',
      text: "La liste du personnel et les dossiers CACES/autorisations de conduite sont transmis au mandataire. Le travail sur site ne demarre qu'apres retour ou point d'arret SNCF.",
      source: 'OA41 §2.2 page 14, OA48 §2.2 page 19, OA56 §2.2 page 10',
    },
  ],
  'VGP valides': [
    {
      oa: 'OA41 / OA48 / OA56',
      type: 'Exigence / controle',
      title: 'Controle documentaire des conducteurs et engins',
      text: "Les points d'arret demandent la verification CACES des conducteurs d'engins avant demarrage, avec envoi des CACES en amont et validation apres briefing.",
      source: 'OA41 PA page 26, OA48 PA page 27, OA56 PA page 17',
    },
  ],
  'Diagnostic plomb': [
    {
      oa: 'OA41 / OA48 / OA56',
      type: 'Exigence / controle',
      title: 'Garde-corps plombes en filiere adaptee',
      text: "Les garde-corps sont retires mecaniquement, mis en benne ampiroll dediee puis evacues vers une filiere de traitement plomb. Le body-benne n'est pas retenu comme stockage plomb.",
      source: 'OA41 §4.2.2 page 20, OA48 §4.2.4 page 24, OA56 §4.1.5 page 16',
    },
  ],
  'Diagnostic amiante': [
    {
      oa: 'OA41',
      type: 'Exigence / controle',
      title: 'Poteaux amiantes traites a part',
      text: "OA41 prevoit l'encapsulage des poteaux amiantes de nuit sous ITC, avec nacelle ou echafaudage, resine d'encapsulage, puis evacuation en ISDD apres desolidarisation.",
      source: 'Procedure demolition OA41, §4.1 page 19 et §4.2.2 page 24',
    },
  ],
  'Choix de la méthode de démolition': [
    {
      oa: 'OA41',
      type: 'Methode / moyen',
      title: 'Demolition mecanique du tablier aux cisailles',
      text: "Le tablier est demoli avec deux pelles 50T equipees de cisailles beton, positionnees rive gauche et rive droite. Le BRH est cite comme outil disponible mais la cisaille pilote la demolition du tablier.",
      source: 'Procedure demolition OA41, §4.2.3, page 20',
      image: oa41CinematiqueDemolition,
    },
    {
      oa: 'OA48',
      type: 'REX / bonne pratique',
      title: 'Cisaille puis godet pour gerer les gravats',
      text: "La pelle 25T croque le tablier a la cisaille depuis la protection, puis passe au godet pour rapprocher les gravats vers la pelle 50T.",
      source: 'Procedure demolition OA48, §4.2.5, page 24',
    },
    {
      oa: 'OA56',
      type: 'Methode / moyen',
      title: 'Cas distinct: tablier leve avant demolition',
      text: "Le tablier n'est pas demoli en place comme OA41/OA48: il est desolidarise, elingue, leve, puis demoli et charge hors voie.",
      source: 'Procedure demolition OA56, §4.1.4, pages 13-16',
    },
  ],
  "Définir les points d'arrêt": [
    {
      oa: 'OA41 / OA48 / OA56',
      type: 'Exigence / controle',
      title: 'Points d\'arret recurrents',
      text: "Les points d'arret identifies portent sur la verification CACES avant demarrage, la protection de voie apres mise en place, les cotes finales de terrassement, et selon OA56 la demolition des semelles et la stabilite des voies avant/apres travaux.",
      source: 'OA41 page 26, OA48 page 27, OA56 page 17',
    },
  ],
  'Validation des points d\'arrêt avant poursuite': [
    {
      oa: 'OA41 / OA48 / OA56',
      type: 'Exigence / controle',
      title: 'Ne pas poursuivre sans levee de PA',
      text: "Les PA sont positionnes comme conditions de poursuite: protection voie terminee, cote de terrassement controlee, suivi stabilite voie realise quand demande.",
      source: 'OA41 page 26, OA48 page 27, OA56 page 17',
    },
  ],
  'Contrôle topographique réalisé': [
    {
      oa: 'OA48 / OA56',
      type: 'Exigence / controle',
      title: 'Cotes et stabilite voie',
      text: "OA48 donne des cotes de fin de terrassement par culee. OA56 indique un suivi de stabilite des voies avant et apres travaux.",
      source: 'OA48 §4.2.7 page 25, OA56 PA page 17',
    },
  ],
  'Analyse des risques réalisée': [
    {
      oa: 'OA41 / OA48 / OA56',
      type: 'Exigence / controle',
      title: 'Risques a rattacher aux taches operationnelles',
      text: "Les tableaux risques couvrent heurt ferroviaire, coactivite engins/pietons, poussiere, chute du tablier, elingage/manutention, plomb/amiante, incendie au chalumeau et pollution.",
      source: 'OA41 pages 27-31, OA48 pages 28-31, OA56 pages 18-22',
    },
  ],
  'Gestion des poussières': [
    {
      oa: 'OA41 / OA48 / OA56',
      type: 'Exigence / controle',
      title: 'Arrosage et brumisation',
      text: "Les procedures prevoient arroseuse, lance a eau ou brumisateurs pour limiter l'inhalation de poussieres pendant demolition, chargement et circulation des engins.",
      source: 'Tableaux risques environnement et securite OA41/OA48/OA56',
    },
  ],
  'Gestion des déchets (SOGED)': [
    {
      oa: 'OA41 / OA48 / OA56',
      type: 'Exigence / controle',
      title: 'Separations de flux',
      text: "Les gravats inertes, garde-corps plombes et elements amiantes ne suivent pas les memes filieres. Les bennes et zones de stock doivent etre identifiees avant OCP.",
      source: 'OA41 §4.2.2/4.2.3, OA48 §4.2.4/4.2.8, OA56 §4.1.5/4.1.7',
    },
  ],
  'Élaborer le planning minute': [
    {
      oa: 'OA41 / OA48 / OA56',
      type: 'Methode / moyen',
      title: 'Planning par phase, poste et engin',
      text: "Les annexes planning minute servent a caler l'ordre des protections, demolitions, extractions, controles et restitutions. OA56 precise que le planning doit etre envoye avec les equipes et engins par poste.",
      source: 'OA41 annexe page 37, OA48 annexe page 39, OA56 annexe page 27 et reponse VISA page 5',
    },
  ],
  'Prévoir les temps de repli': [
    {
      oa: 'OA41 / OA48 / OA56',
      type: 'REX / bonne pratique',
      title: 'Nettoyage et restitution integres au deroulement',
      text: "Les procedures integrent extraction des gravats, nettoyage des protections, retrait du materiel et constat de bonne restitution avec les techniciens SNCF.",
      source: 'OA41 §4.2.3 page 25, OA48 §4.2.8 page 26, OA56 §4.1.7 page 16',
    },
  ],
  'Autorisation de restitution obtenue': [
    {
      oa: 'OA41 / OA48 / OA56',
      type: 'Exigence / controle',
      title: 'Constat avec techniciens SNCF',
      text: "Un constat de bonne restitution des voies est prevu avec les techniciens SNCF presents sur site avant repli complet.",
      source: 'OA41 page 25, OA48 page 26, OA56 page 16',
    },
  ],
} satisfies Record<string, ProcedureRexEntry[]>

const PROCEDURE_REX_BY_ACTION: Record<string, ProcedureRexEntry[]> = Object.fromEntries(
  Object.entries(RAW_PROCEDURE_REX_BY_ACTION).map(([action, entries]) => [normalizeAction(action), entries]),
)

export function getProcedureRexEntries(action: string) {
  return PROCEDURE_REX_BY_ACTION[normalizeAction(action)] ?? null
}
