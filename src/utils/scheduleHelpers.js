// Time/date parsing helpers shared by both the admin and student dashboards'
// "create activity" scheduling UI.

export const CATEGORY_LOCATIONS = {
  sport: [
    { label: '⚽ 10th Floor · Rooftop Futsal Court', value: '10th Floor · Rooftop Futsal Court' },
    { label: '🏀 B2 · Basketball Court', value: 'B2 · Basketball Court' },
    { label: '🏸 B2 · Badminton Court', value: 'B2 · Badminton Court' },
    { label: '🏓 B2 · Table Tennis (TT) Table', value: 'B2 · Table Tennis (TT) Table' },
    { label: '🏏 B2 · Indoor Cricket Area', value: 'B2 · Indoor Cricket Area' },
    { label: '✏️ Custom / Other Location...', value: 'Custom / Other Location...' },
  ],
  hangout: [
    { label: '☕ Ground Floor · Main Cafeteria', value: 'Ground Floor · Main Cafeteria' },
    { label: '🍱 B1 · Lunch Cafeteria', value: 'B1 · Lunch Cafeteria' },
    { label: '🍕 3rd Floor · One More Bite', value: '3rd Floor · One More Bite' },
    { label: '🥤 10th Floor · Mathi Cafe', value: '10th Floor · Mathi Cafe' },
    { label: '✏️ Custom / Other Location...', value: 'Custom / Other Location...' },
  ],
  project: [
    { label: '📚 3rd Floor · Godawari (Library)', value: '3rd Floor · Godawari (Library)' },
    { label: '🚀 1st Floor · IMPACT Lab', value: '1st Floor · IMPACT Lab' },
    { label: '💻 4th Floor · Computer Lab', value: '4th Floor · Computer Lab' },
    { label: '💡 B2 · Entrepreneurs Point', value: 'B2 · Entrepreneurs Point' },
    { label: '🎓 Ground Floor · ING Skill Academy', value: 'Ground Floor · ING Skill Academy' },
    { label: '🎙️ 5th Floor · LT01 (Lecture Hall)', value: '5th Floor · LT01 (Lecture Hall)' },
    { label: '✏️ Custom / Other Location...', value: 'Custom / Other Location...' },
  ],
};

export const CAMPUS_HOURS = [
  { hour: '07', ampm: 'AM', display: '07:00 AM' },
  { hour: '08', ampm: 'AM', display: '08:00 AM' },
  { hour: '09', ampm: 'AM', display: '09:00 AM' },
  { hour: '10', ampm: 'AM', display: '10:00 AM' },
  { hour: '11', ampm: 'AM', display: '11:00 AM' },
  { hour: '12', ampm: 'PM', display: '12:00 PM (Noon)' },
  { hour: '01', ampm: 'PM', display: '01:00 PM' },
  { hour: '02', ampm: 'PM', display: '02:00 PM' },
  { hour: '03', ampm: 'PM', display: '03:00 PM' },
  { hour: '04', ampm: 'PM', display: '04:00 PM' },
  { hour: '05', ampm: 'PM', display: '05:00 PM' },
  { hour: '06', ampm: 'PM', display: '06:00 PM' },
];

export const get24HourVal = (hourStr, ampmStr) => {
  let hour = parseInt(hourStr);
  const ampm = (ampmStr || '').toUpperCase();
  if (ampm === 'PM' && hour !== 12) hour += 12;
  if (ampm === 'AM' && hour === 12) hour = 0;
  return hour;
};

export const getMinutesFromMidnight = (hourStr, minuteStr, ampmStr) => {
  const h24 = get24HourVal(hourStr, ampmStr);
  return h24 * 60 + parseInt(minuteStr || '0');
};

export const convertTo24Hour = (timeStr) => {
  if (!timeStr) return '00:00';
  const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return timeStr;
  let hour = parseInt(match[1]);
  const minute = match[2];
  const ampm = match[3].toUpperCase();
  if (ampm === 'PM' && hour !== 12) hour += 12;
  if (ampm === 'AM' && hour === 12) hour = 0;
  return `${String(hour).padStart(2, '0')}:${minute}`;
};

export const parseEventDateTime = (dateStr, timeStr) => {
  const time24 = convertTo24Hour(timeStr || '00:00');
  return new Date(`${dateStr}T${time24}`);
};

export const formatTimeDisplay = (timeStr) => {
  if (!timeStr) return '';
  return timeStr;
};
