export interface CarBrand {
  id: number;
  nom: string;
  modeles: string[];
}

export const CAR_BRANDS: CarBrand[] = [
  {
    id: 1,
    nom: "Dacia",
    modeles: ["Dokker", "Duster", "Lodgy", "Logan", "Sandero", "Sandero Stepway", "Spring", "Jogger"]
  },
  {
    id: 2,
    nom: "Renault",
    modeles: ["Clio", "Clio 4", "Clio 5", "Megane", "Captur", "Express", "Kadjar", "Kangoo", "Arkana", "Austral", "Talisman"]
  },
  {
    id: 3,
    nom: "Peugeot",
    modeles: ["208", "308", "2008", "3008", "5008", "Partner", "Rifter", "508", "108", "301"]
  },
  {
    id: 4,
    nom: "Volkswagen",
    modeles: ["Golf", "Golf 7", "Golf 8", "Polo", "Tiguan", "T-Roc", "Touareg", "Passat", "Caddy", "Arteon", "Taigo"]
  },
  {
    id: 5,
    nom: "Hyundai",
    modeles: ["i10", "Grand i10", "i20", "i30", "Accent", "Elantra", "Creta", "Tucson", "Santa Fe", "Kona"]
  },
  {
    id: 6,
    nom: "Toyota",
    modeles: ["Yaris", "Corolla", "Corolla Cross", "C-HR", "RAV4", "Hilux", "Land Cruiser", "Prado", "Fortuner", "Aygo"]
  },
  {
    id: 7,
    nom: "Citroën",
    modeles: ["C3", "C3 Aircross", "C4", "C4 Cactus", "C5 Aircross", "Berlingo", "C-Elysée", "C1", "Jumpy"]
  },
  {
    id: 8,
    nom: "Fiat",
    modeles: ["500", "500X", "500L", "Tipo", "Panda", "Fiorino", "Doblo", "Punto"]
  },
  {
    id: 9,
    nom: "Kia",
    modeles: ["Picanto", "Rio", "Ceed", "Sportage", "Seltos", "Sorento", "Niro", "Carnival", "K5"]
  },
  {
    id: 10,
    nom: "Audi",
    modeles: ["A1", "A3", "A4", "A5", "A6", "A7", "A8", "Q2", "Q3", "Q5", "Q7", "Q8", "TT"]
  },
  {
    id: 11,
    nom: "BMW",
    modeles: ["Série 1", "Série 2", "Série 3", "Série 4", "Série 5", "Série 7", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "Z4"]
  },
  {
    id: 12,
    nom: "Mercedes-Benz",
    modeles: ["Classe A", "Classe B", "Classe C", "Classe E", "Classe S", "CLA", "GLA", "GLB", "GLC", "GLE", "GLS", "Vito"]
  },
  {
    id: 13,
    nom: "Nissan",
    modeles: ["Qashqai", "Micra", "Juke", "X-Trail", "Navara", "Patrol", "Sunny"]
  },
  {
    id: 14,
    nom: "Ford",
    modeles: ["Fiesta", "Focus", "Kuga", "Ranger", "Puma", "EcoSport", "Mondeo", "Explorer"]
  },
  {
    id: 15,
    nom: "Seat",
    modeles: ["Ibiza", "Leon", "Arona", "Ateca", "Tarraco", "Toledo"]
  },
  {
    id: 16,
    nom: "Skoda",
    modeles: ["Fabia", "Octavia", "Superb", "Kamiq", "Karoq", "Kodiaq", "Scala"]
  },
  {
    id: 17,
    nom: "Opel",
    modeles: ["Corsa", "Astra", "Mokka", "Crossland", "Grandland", "Insignia"]
  },
  {
    id: 18,
    nom: "Suzuki",
    modeles: ["Swift", "Celerio", "Baleno", "Vitara", "Jimny", "S-Cross", "Ignis", "Dzire"]
  },
  {
    id: 19,
    nom: "Jeep",
    modeles: ["Renegade", "Compass", "Cherokee", "Grand Cherokee", "Wrangler", "Gladiator"]
  },
  {
    id: 20,
    nom: "Land Rover",
    modeles: ["Range Rover", "Range Rover Sport", "Range Rover Velar", "Range Rover Evoque", "Discovery", "Defender"]
  },
  {
    id: 21,
    nom: "Alfa Romeo",
    modeles: ["Giulietta", "Giulia", "Stelvio", "Tonale", "Mito", "159"]
  },
  {
    id: 22,
    nom: "Volvo",
    modeles: ["XC40", "XC60", "XC90", "V40", "V60", "S60", "S90"]
  },
  {
    id: 23,
    nom: "Honda",
    modeles: ["Civic", "CR-V", "HR-V", "City", "Jazz", "Accord"]
  },
  {
    id: 24,
    nom: "Cupra",
    modeles: ["Formentor", "Leon", "Ateca", "Born"]
  },
  {
    id: 25,
    nom: "MG",
    modeles: ["MG ZS", "MG HS", "MG4", "MG5", "MG One", "MG GT"]
  },
  {
    id: 26,
    nom: "Porsche",
    modeles: ["Macan", "Cayenne", "Panamera", "911 Carrera", "Taycan", "718 Boxster"]
  },
  {
    id: 27,
    nom: "Maserati",
    modeles: ["Ghibli", "Levante", "Grecale", "Quattroporte"]
  },
  {
    id: 28,
    nom: "Mitsubishi",
    modeles: ["L200", "Pajero", "Outlander", "Eclipse Cross", "ASX", "Attrage"]
  },
  {
    id: 29,
    nom: "Chevrolet",
    modeles: ["Aveo", "Captiva", "Cruze", "Spark", "Trax", "Orlando"]
  },
  {
    id: 30,
    nom: "Autre",
    modeles: ["Autre modèle"]
  }
];

export const MOROCCAN_PREFECTURES = [
  { code: "1", label: "1 - Rabat" },
  { code: "6", label: "6 - Casablanca - Anfa" },
  { code: "7", label: "7 - Casablanca - Hay Mohammadi" },
  { code: "8", label: "8 - Casablanca - Mers Sultan" },
  { code: "9", label: "9 - Casablanca - Ben M'sik" },
  { code: "10", label: "10 - Casablanca - Moulay Rachid" },
  { code: "11", label: "11 - Casablanca - Aïn Sebaâ" },
  { code: "12", label: "12 - Casablanca - Hay Hassani" },
  { code: "13", label: "13 - Casablanca - Aïn Chock" },
  { code: "14", label: "14 - Casablanca - Nouaceur" },
  { code: "15", label: "15 - Casablanca - Médiouna" },
  { code: "16", label: "16 - Fès" },
  { code: "20", label: "20 - Meknès" },
  { code: "26", label: "26 - Marrakech" },
  { code: "33", label: "33 - Agadir Ida-Outanane" },
  { code: "40", label: "40 - Tanger - Assilah" },
  { code: "44", label: "44 - Tétouan" },
  { code: "48", label: "48 - Oujda-Angad" },
  { code: "50", label: "50 - Nador" },
  { code: "54", label: "54 - Kénitra" },
  { code: "56", label: "56 - Sidi Kacem" },
  { code: "58", label: "58 - Salé" },
  { code: "59", label: "59 - Skhirat - Témara" },
  { code: "68", label: "68 - El Jadida" },
  { code: "70", label: "70 - Safi" },
  { code: "72", label: "72 - Mohammedia" },
  { code: "78", label: "78 - Beni Mellal" }
];

export const ARABIC_LETTERS = ["أ", "ب", "د", "و", "هـ", "ج", "ز", "ح", "ط", "ي", "ك", "ل", "م", "ن", "س", "ع", "ف", "ص", "ق", "ر", "ش", "ت", "ث", "خ", "ذ", "ض", "ظ", "غ"];
