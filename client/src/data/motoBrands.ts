export interface MotoBrand {
  id: number;
  nom: string;
  modeles: string[];
}

export const MOTO_BRANDS: MotoBrand[] = [
  {
    id: 1,
    nom: "Honda",
    modeles: ["SH 125", "SH 150", "PCX 125", "Forza 125", "Forza 350", "X-ADV 750", "Africa Twin", "CB500X", "CB650R", "CBR 650R", "Hornet 750"]
  },
  {
    id: 2,
    nom: "Yamaha",
    modeles: ["TMAX 530", "TMAX 560", "XMAX 125", "XMAX 300", "NMAX 125", "MT-07", "MT-09", "Tracer 7", "Tracer 9", "YZF-R7", "Crypton 110"]
  },
  {
    id: 3,
    nom: "SYM",
    modeles: ["Symphony 50", "Symphony 125", "Symphony ST", "Orbit 50", "Jet 14", "Cruisym 300", "Joyride 125", "Fiddle III", "Maxsym TL 508"]
  },
  {
    id: 4,
    nom: "Kymco",
    modeles: ["Agility 50", "Agility 125", "Like 125", "People S 125", "X-Town 300", "Downtown 350", "AK 550"]
  },
  {
    id: 5,
    nom: "Sanya / Becane / Docker",
    modeles: ["C50", "C90", "Sanya Fice", "Docker Monster", "Becane Spring", "Becane Super Sport", "Rato 50", "Coop 50"]
  },
  {
    id: 6,
    nom: "Piaggio / Vespa",
    modeles: ["Vespa Primavera 50", "Vespa Primavera 125", "Vespa GTS 300", "Piaggio Liberty 50", "Piaggio Liberty 125", "Beverly 300", "Beverly 400", "Medley 125"]
  },
  {
    id: 7,
    nom: "Peugeot",
    modeles: ["Kisbee 50", "Django 125", "Tweet 125", "Speedfight 50", "Metropolis 400", "Pulsion 125"]
  },
  {
    id: 8,
    nom: "Kawasaki",
    modeles: ["Z650", "Z900", "Ninja 400", "Ninja 650", "Versys 650", "Z400", "ZX-6R", "Vulcan S"]
  },
  {
    id: 9,
    nom: "BMW Motorrad",
    modeles: ["C 400 GT", "C 400 X", "R 1250 GS", "R 1300 GS", "F 850 GS", "F 900 R", "G 310 R", "G 310 GS", "S 1000 RR"]
  },
  {
    id: 10,
    nom: "Suzuki",
    modeles: ["Burgman 125", "Burgman 400", "Address 125", "V-Strom 650", "V-Strom 1050", "GSX-8S", "Hayabusa"]
  },
  {
    id: 11,
    nom: "KTM",
    modeles: ["Duke 125", "Duke 200", "Duke 390", "Duke 790", "Duke 890", "Adventure 390", "RC 390"]
  },
  {
    id: 12,
    nom: "Ducati",
    modeles: ["Monster", "Scrambler 800", "Multistrada V2", "Multistrada V4", "Panigale V2", "Hypermotard"]
  },
  {
    id: 13,
    nom: "Benelli",
    modeles: ["TRK 502", "TRK 702", "Leoncino 500", "TNT 125", "Imperiale 400"]
  },
  {
    id: 14,
    nom: "Autre",
    modeles: ["Autre modèle"]
  }
];

export const MOTO_CLASSES = [
  {
    code: "D1 Sc1",
    label: "D1 Sc1 : Bicyclettes et Vélomoteurs <= 50 cm3 et <= 60 Km/h",
    basePrime: 750
  },
  {
    code: "D1 Sc2",
    label: "D1 Sc2 : Bicyclettes et Vélomoteurs <= 50 cm3 et > 60 Km/h",
    basePrime: 980
  },
  {
    code: "D2",
    label: "D2 : Motocyclettes > 50 cm3 à 125 cm3",
    basePrime: 1450
  },
  {
    code: "D3",
    label: "D3 : Motocyclettes > 125 cm3 à 250 cm3",
    basePrime: 2200
  },
  {
    code: "D4",
    label: "D4 : Motocyclettes > 250 cm3 à 500 cm3",
    basePrime: 2950
  },
  {
    code: "D5",
    label: "D5 : Motocyclettes > 500 cm3 (Grosses cylindrées, TMAX, etc.)",
    basePrime: 3750
  },
  {
    code: "D6",
    label: "D6 : Vélomoteurs et tricycles à usage commercial / livraison",
    basePrime: 1650
  }
];

export const MOROCCAN_CITIES = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Tanger",
  "Fès",
  "Agadir",
  "Meknès",
  "Oujda",
  "Kénitra",
  "Tétouan",
  "Salé",
  "Témara",
  "Mohammedia",
  "El Jadida",
  "Safi",
  "Nador",
  "Beni Mellal",
  "Autre ville"
];
