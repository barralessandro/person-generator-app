export interface PersonData {
    taxCode: string;
    name: string;
    surname: string;
    sex: 'M' | 'F';
    birthDate: Date;
    birthPlaceIstatCode: string;
    birthPlace: string;
    birthPlaceProvince: string;
}

const VOWELS = ['A', 'E', 'I', 'O', 'U'];

const MONTH_CODES: Record<number, string> = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'H',
  6: 'L',
  7: 'M',
  8: 'P',
  9: 'R',
  10: 'S',
  11: 'T'
};

const ODD_VALUES: Record<string, number> = {
  '0': 1,'1': 0,'2': 5,'3': 7,'4': 9,'5': 13,'6': 15,'7': 17,'8': 19,'9': 21,
  'A': 1,'B': 0,'C': 5,'D': 7,'E': 9,'F': 13,'G': 15,'H': 17,'I': 19,'J': 21,
  'K': 2,'L': 4,'M': 18,'N': 20,'O': 11,'P': 3,'Q': 6,'R': 8,'S': 12,'T': 14,
  'U': 16,'V': 10,'W': 22,'X': 25,'Y': 24,'Z': 23
};

const EVEN_VALUES: Record<string, number> = {
  '0': 0,'1': 1,'2': 2,'3': 3,'4': 4,'5': 5,'6': 6,'7': 7,'8': 8,'9': 9,
  'A': 0,'B': 1,'C': 2,'D': 3,'E': 4,'F': 5,'G': 6,'H': 7,'I': 8,'J': 9,
  'K': 10,'L': 11,'M': 12,'N': 13,'O': 14,'P': 15,'Q': 16,'R': 17,'S': 18,'T': 19,
  'U': 20,'V': 21,'W': 22,'X': 23,'Y': 24,'Z': 25
};

function cleanString(value: string): string {
  return value
    .toUpperCase()
    .replace(/[^A-Z]/g, '');
}

function getSurnameCode(surname: string): string {
  const s = cleanString(surname);
  const consonants = [...s].filter(c => !VOWELS.includes(c));
  const vowels = [...s].filter(c => VOWELS.includes(c));
  return (consonants.join('') + vowels.join('') + 'XXX').slice(0, 3);
}

function getNameCode(name: string): string {
  const n = cleanString(name);
  const consonants = [...n].filter(c => !VOWELS.includes(c));
  const vowels = [...n].filter(c => VOWELS.includes(c));

  if (consonants.length >= 4) {
    return `${consonants[0]}${consonants[2]}${consonants[3]}`;
  }

  return (consonants.join('') + vowels.join('') + 'XXX').slice(0, 3);
}

function getYearCode(date: Date): string {
  return date.getFullYear().toString().slice(-2);
}

function getMonthCode(date: Date): string {
  return MONTH_CODES[date.getMonth()];
}

function getDayCode(date: Date, sex: 'M' | 'F'): string {
  const day = date.getDate() + (sex === 'F' ? 40 : 0);
  return day.toString().padStart(2, '0');
}

function getControlChar(code15: string): string {
  let sum = 0;

  for (let i = 0; i < code15.length; i++) {
    const char = code15[i];
    sum += (i % 2 === 0)
      ? ODD_VALUES[char]
      : EVEN_VALUES[char];
  }

  return String.fromCharCode((sum % 26) + 65);
}



export function generateFiscalCode(data: PersonData): string {
  const code15 =
    getSurnameCode(data.surname) +
    getNameCode(data.name) +
    getYearCode(data.birthDate) +
    getMonthCode(data.birthDate) +
    getDayCode(data.birthDate, data.sex) +
    data.birthPlaceIstatCode.toUpperCase();

  return code15 + getControlChar(code15);
}


export function generateRandomDate(start: Date, end: Date): Date {
  const startTime = start.getTime();
  const endTime = end.getTime();

  const randomTime = startTime + Math.random() * (endTime - startTime);
  return new Date(randomTime);
}