export type AirportInfo = {
  code: string;
  city: string;
  region?: string;
  country: string;
  name: string;
};

const AIRPORTS: Record<string, AirportInfo> = {
  ABQ: {
    code: "ABQ",
    city: "Albuquerque",
    region: "NM",
    country: "United States",
    name: "Albuquerque International Sunport",
  },
  ALB: {
    code: "ALB",
    city: "Albany",
    region: "NY",
    country: "United States",
    name: "Albany International Airport",
  },
  ATL: {
    code: "ATL",
    city: "Atlanta",
    region: "GA",
    country: "United States",
    name: "Hartsfield-Jackson Atlanta International Airport",
  },
  AUS: {
    code: "AUS",
    city: "Austin",
    region: "TX",
    country: "United States",
    name: "Austin-Bergstrom International Airport",
  },
  BDL: {
    code: "BDL",
    city: "Hartford",
    region: "CT",
    country: "United States",
    name: "Bradley International Airport",
  },
  BNA: {
    code: "BNA",
    city: "Nashville",
    region: "TN",
    country: "United States",
    name: "Nashville International Airport",
  },
  BOS: {
    code: "BOS",
    city: "Boston",
    region: "MA",
    country: "United States",
    name: "Boston Logan International Airport",
  },
  BUF: {
    code: "BUF",
    city: "Buffalo",
    region: "NY",
    country: "United States",
    name: "Buffalo Niagara International Airport",
  },
  BWI: {
    code: "BWI",
    city: "Baltimore",
    region: "MD",
    country: "United States",
    name: "Baltimore/Washington International Thurgood Marshall Airport",
  },
  CHS: {
    code: "CHS",
    city: "Charleston",
    region: "SC",
    country: "United States",
    name: "Charleston International Airport",
  },
  CLE: {
    code: "CLE",
    city: "Cleveland",
    region: "OH",
    country: "United States",
    name: "Cleveland Hopkins International Airport",
  },
  CLT: {
    code: "CLT",
    city: "Charlotte",
    region: "NC",
    country: "United States",
    name: "Charlotte Douglas International Airport",
  },
  CMH: {
    code: "CMH",
    city: "Columbus",
    region: "OH",
    country: "United States",
    name: "John Glenn Columbus International Airport",
  },
  CVG: {
    code: "CVG",
    city: "Cincinnati",
    region: "OH",
    country: "United States",
    name: "Cincinnati/Northern Kentucky International Airport",
  },
  DAL: {
    code: "DAL",
    city: "Dallas",
    region: "TX",
    country: "United States",
    name: "Dallas Love Field",
  },
  DCA: {
    code: "DCA",
    city: "Washington",
    region: "DC",
    country: "United States",
    name: "Ronald Reagan Washington National Airport",
  },
  DEN: {
    code: "DEN",
    city: "Denver",
    region: "CO",
    country: "United States",
    name: "Denver International Airport",
  },
  DFW: {
    code: "DFW",
    city: "Dallas-Fort Worth",
    region: "TX",
    country: "United States",
    name: "Dallas Fort Worth International Airport",
  },
  DTW: {
    code: "DTW",
    city: "Detroit",
    region: "MI",
    country: "United States",
    name: "Detroit Metropolitan Wayne County Airport",
  },
  EWR: {
    code: "EWR",
    city: "Newark",
    region: "NJ",
    country: "United States",
    name: "Newark Liberty International Airport",
  },
  FLL: {
    code: "FLL",
    city: "Fort Lauderdale",
    region: "FL",
    country: "United States",
    name: "Fort Lauderdale-Hollywood International Airport",
  },
  HNL: {
    code: "HNL",
    city: "Honolulu",
    region: "HI",
    country: "United States",
    name: "Daniel K. Inouye International Airport",
  },
  HOU: {
    code: "HOU",
    city: "Houston",
    region: "TX",
    country: "United States",
    name: "William P. Hobby Airport",
  },
  IAD: {
    code: "IAD",
    city: "Washington",
    region: "DC",
    country: "United States",
    name: "Washington Dulles International Airport",
  },
  IAH: {
    code: "IAH",
    city: "Houston",
    region: "TX",
    country: "United States",
    name: "George Bush Intercontinental Airport",
  },
  IND: {
    code: "IND",
    city: "Indianapolis",
    region: "IN",
    country: "United States",
    name: "Indianapolis International Airport",
  },
  JAX: {
    code: "JAX",
    city: "Jacksonville",
    region: "FL",
    country: "United States",
    name: "Jacksonville International Airport",
  },
  JFK: {
    code: "JFK",
    city: "New York",
    region: "NY",
    country: "United States",
    name: "John F. Kennedy International Airport",
  },
  LAS: {
    code: "LAS",
    city: "Las Vegas",
    region: "NV",
    country: "United States",
    name: "Harry Reid International Airport",
  },
  LAX: {
    code: "LAX",
    city: "Los Angeles",
    region: "CA",
    country: "United States",
    name: "Los Angeles International Airport",
  },
  LGA: {
    code: "LGA",
    city: "New York",
    region: "NY",
    country: "United States",
    name: "LaGuardia Airport",
  },
  MCI: {
    code: "MCI",
    city: "Kansas City",
    region: "MO",
    country: "United States",
    name: "Kansas City International Airport",
  },
  MCO: {
    code: "MCO",
    city: "Orlando",
    region: "FL",
    country: "United States",
    name: "Orlando International Airport",
  },
  MDW: {
    code: "MDW",
    city: "Chicago",
    region: "IL",
    country: "United States",
    name: "Chicago Midway International Airport",
  },
  MEM: {
    code: "MEM",
    city: "Memphis",
    region: "TN",
    country: "United States",
    name: "Memphis International Airport",
  },
  MIA: {
    code: "MIA",
    city: "Miami",
    region: "FL",
    country: "United States",
    name: "Miami International Airport",
  },
  MKE: {
    code: "MKE",
    city: "Milwaukee",
    region: "WI",
    country: "United States",
    name: "Milwaukee Mitchell International Airport",
  },
  MSP: {
    code: "MSP",
    city: "Minneapolis-St. Paul",
    region: "MN",
    country: "United States",
    name: "Minneapolis-Saint Paul International Airport",
  },
  MSY: {
    code: "MSY",
    city: "New Orleans",
    region: "LA",
    country: "United States",
    name: "Louis Armstrong New Orleans International Airport",
  },
  OAK: {
    code: "OAK",
    city: "Oakland",
    region: "CA",
    country: "United States",
    name: "Oakland San Francisco Bay Airport",
  },
  ORD: {
    code: "ORD",
    city: "Chicago",
    region: "IL",
    country: "United States",
    name: "Chicago O'Hare International Airport",
  },
  PBI: {
    code: "PBI",
    city: "West Palm Beach",
    region: "FL",
    country: "United States",
    name: "Palm Beach International Airport",
  },
  PDX: {
    code: "PDX",
    city: "Portland",
    region: "OR",
    country: "United States",
    name: "Portland International Airport",
  },
  PHL: {
    code: "PHL",
    city: "Philadelphia",
    region: "PA",
    country: "United States",
    name: "Philadelphia International Airport",
  },
  PHX: {
    code: "PHX",
    city: "Phoenix",
    region: "AZ",
    country: "United States",
    name: "Phoenix Sky Harbor International Airport",
  },
  PIT: {
    code: "PIT",
    city: "Pittsburgh",
    region: "PA",
    country: "United States",
    name: "Pittsburgh International Airport",
  },
  RDU: {
    code: "RDU",
    city: "Raleigh-Durham",
    region: "NC",
    country: "United States",
    name: "Raleigh-Durham International Airport",
  },
  RIC: {
    code: "RIC",
    city: "Richmond",
    region: "VA",
    country: "United States",
    name: "Richmond International Airport",
  },
  ROC: {
    code: "ROC",
    city: "Rochester",
    region: "NY",
    country: "United States",
    name: "Frederick Douglass Greater Rochester International Airport",
  },
  SAN: {
    code: "SAN",
    city: "San Diego",
    region: "CA",
    country: "United States",
    name: "San Diego International Airport",
  },
  SAT: {
    code: "SAT",
    city: "San Antonio",
    region: "TX",
    country: "United States",
    name: "San Antonio International Airport",
  },
  SAV: {
    code: "SAV",
    city: "Savannah",
    region: "GA",
    country: "United States",
    name: "Savannah/Hilton Head International Airport",
  },
  SEA: {
    code: "SEA",
    city: "Seattle",
    region: "WA",
    country: "United States",
    name: "Seattle-Tacoma International Airport",
  },
  SFO: {
    code: "SFO",
    city: "San Francisco",
    region: "CA",
    country: "United States",
    name: "San Francisco International Airport",
  },
  SJC: {
    code: "SJC",
    city: "San Jose",
    region: "CA",
    country: "United States",
    name: "San José Mineta International Airport",
  },
  SLC: {
    code: "SLC",
    city: "Salt Lake City",
    region: "UT",
    country: "United States",
    name: "Salt Lake City International Airport",
  },
  SMF: {
    code: "SMF",
    city: "Sacramento",
    region: "CA",
    country: "United States",
    name: "Sacramento International Airport",
  },
  SRQ: {
    code: "SRQ",
    city: "Sarasota",
    region: "FL",
    country: "United States",
    name: "Sarasota Bradenton International Airport",
  },
  STL: {
    code: "STL",
    city: "St. Louis",
    region: "MO",
    country: "United States",
    name: "St. Louis Lambert International Airport",
  },
  TPA: {
    code: "TPA",
    city: "Tampa",
    region: "FL",
    country: "United States",
    name: "Tampa International Airport",
  },

  YYZ: {
    code: "YYZ",
    city: "Toronto",
    region: "ON",
    country: "Canada",
    name: "Toronto Pearson International Airport",
  },
  YUL: {
    code: "YUL",
    city: "Montreal",
    region: "QC",
    country: "Canada",
    name: "Montréal-Trudeau International Airport",
  },
  YVR: {
    code: "YVR",
    city: "Vancouver",
    region: "BC",
    country: "Canada",
    name: "Vancouver International Airport",
  },

  CUN: {
    code: "CUN",
    city: "Cancún",
    country: "Mexico",
    name: "Cancún International Airport",
  },
  MEX: {
    code: "MEX",
    city: "Mexico City",
    country: "Mexico",
    name: "Mexico City International Airport",
  },

  NAS: {
    code: "NAS",
    city: "Nassau",
    country: "Bahamas",
    name: "Lynden Pindling International Airport",
  },
  MBJ: {
    code: "MBJ",
    city: "Montego Bay",
    country: "Jamaica",
    name: "Sangster International Airport",
  },
  PUJ: {
    code: "PUJ",
    city: "Punta Cana",
    country: "Dominican Republic",
    name: "Punta Cana International Airport",
  },
  SJU: {
    code: "SJU",
    city: "San Juan",
    region: "PR",
    country: "United States",
    name: "Luis Muñoz Marín International Airport",
  },

  DUB: {
    code: "DUB",
    city: "Dublin",
    country: "Ireland",
    name: "Dublin Airport",
  },
  SNN: {
    code: "SNN",
    city: "Shannon",
    country: "Ireland",
    name: "Shannon Airport",
  },
  EDI: {
    code: "EDI",
    city: "Edinburgh",
    country: "Scotland",
    name: "Edinburgh Airport",
  },
  GLA: {
    code: "GLA",
    city: "Glasgow",
    country: "Scotland",
    name: "Glasgow Airport",
  },
  LHR: {
    code: "LHR",
    city: "London",
    country: "England",
    name: "Heathrow Airport",
  },
  LGW: {
    code: "LGW",
    city: "London",
    country: "England",
    name: "Gatwick Airport",
  },

  AMS: {
    code: "AMS",
    city: "Amsterdam",
    country: "Netherlands",
    name: "Amsterdam Airport Schiphol",
  },
  BCN: {
    code: "BCN",
    city: "Barcelona",
    country: "Spain",
    name: "Barcelona-El Prat Airport",
  },
  CDG: {
    code: "CDG",
    city: "Paris",
    country: "France",
    name: "Charles de Gaulle Airport",
  },
  FCO: {
    code: "FCO",
    city: "Rome",
    country: "Italy",
    name: "Leonardo da Vinci-Fiumicino Airport",
  },
  FRA: {
    code: "FRA",
    city: "Frankfurt",
    country: "Germany",
    name: "Frankfurt Airport",
  },
  MAD: {
    code: "MAD",
    city: "Madrid",
    country: "Spain",
    name: "Adolfo Suárez Madrid-Barajas Airport",
  },
};

export function getAirportInfo(
  code: string | null | undefined
): AirportInfo {
  const normalized = code?.trim().toUpperCase() ?? "";

  const knownAirport = AIRPORTS[normalized];

  if (knownAirport) {
    return knownAirport;
  }

  return {
    code: normalized,
    city: "",
    country: "",
    name: normalized,
  };
}

export function getAirportLocation(
  code: string | null | undefined
) {
  const airport = getAirportInfo(code);

  if (!airport.city) {
    return "";
  }

  if (airport.region) {
    return `${airport.city}, ${airport.region}`;
  }

  if (airport.country) {
    return `${airport.city}, ${airport.country}`;
  }

  return airport.city;
}

export function getAirportName(
  code: string | null | undefined
) {
  const airport = getAirportInfo(code);

  if (!airport.code) {
    return "";
  }

  if (airport.name === airport.code) {
    return airport.code;
  }

  return `${airport.name} (${airport.code})`;
}