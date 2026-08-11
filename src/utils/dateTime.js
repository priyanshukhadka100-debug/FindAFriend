// Parses an event's date + time strings (e.g. '2026-03-04', '4:30 PM') into a Date.
export function parseEventDateTime(dateStr, timeStr) {
            if (!dateStr) return new Date(0);
            if (!timeStr) return new Date(dateStr + 'T00:00:00');
            const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
            if (match) {
                let hour = parseInt(match[1]);
                const minute = match[2];
                const ampm = match[3].toUpperCase();
                if (ampm === 'PM' && hour !== 12) hour += 12;
                if (ampm === 'AM' && hour === 12) hour = 0;
                const date = new Date(dateStr);
                if (isNaN(date.getTime())) return new Date(0);
                date.setHours(hour, parseInt(minute), 0, 0);
                return date;
            }
            const d = new Date(dateStr + 'T' + timeStr);
            return isNaN(d.getTime()) ? new Date(0) : d;
}
