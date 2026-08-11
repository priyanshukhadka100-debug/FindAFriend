// Full per-floor room + facility dataset for the interactive floor navigator.
export const FLOOR_DATA_RAW = {
            'B2': {
                label: 'B2 · Basement 2',
                theme: 'Parking & Sports',
                rooms: [
                    { id: 'b2-1', name: 'Parking Area', type: 'Parking', icon: 'fa-car' },
                    { id: 'b2-2', name: 'Basketball Court', type: 'Sports', icon: 'fa-basketball' },
                    { id: 'b2-3', name: 'Badminton Court', type: 'Sports', icon: 'fa-shuttlecock' },
                    { id: 'b2-4', name: 'Table Tennis (TT) Table', type: 'Sports', icon: 'fa-table-tennis' },
                    { id: 'b2-5', name: 'Indoor Cricket Area', type: 'Sports', icon: 'fa-baseball-ball' },
                    { id: 'b2-6', name: 'Entrepreneurs Point', type: 'Office', icon: 'fa-lightbulb' },
                ]
            },
            'B1': {
                label: 'B1 · Basement 1',
                theme: 'Parking & Lunch Cafeteria',
                rooms: [
                    { id: 'b1-1', name: 'Parking Area', type: 'Parking', icon: 'fa-car' },
                    { id: 'b1-2', name: 'Lunch Cafeteria (Lunch Only)', type: 'Food', icon: 'fa-utensils' },
                ]
            },
            'Ground': {
                label: 'Ground Floor',
                theme: 'Main Campus',
                rooms: [
                    { id: 'g-1', name: 'Main Cafeteria', type: 'Food', icon: 'fa-utensils' },
                    { id: 'g-2', name: 'Administration Office', type: 'Office', icon: 'fa-building' },
                    { id: 'g-3', name: 'ING Skill Academy', type: 'Office', icon: 'fa-graduation-cap' },
                ]
            },
            '1st': {
                label: '1st Floor',
                theme: 'Technology Partner',
                rooms: [
                    { id: '1-1', name: 'My Second Teacher (Technology Partner)', type: 'Office', icon: 'fa-code' },
                    { id: '1-2', name: 'IMPACT Lab', type: 'Office', icon: 'fa-rocket' },
                ]
            },
            '2nd': {
                label: '2nd Floor · Sudurpashchim',
                theme: 'Sudurpashchim',
                rooms: [
                    { id: '2-1', name: 'TR 01 · Byas', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                    { id: '2-2', name: 'TR 02 · Dashrathchand', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                    { id: '2-3', name: 'TR 03 · Khaptad', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                    { id: '2-4', name: 'TR 04 · Surma Sarovar', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                    { id: '2-5', name: 'TR 05 · Aalital', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                    { id: '2-6', name: 'TR 06 · Shuklaphanta', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                    { id: '2-7', name: 'TR 07 · Ramaroshan', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                    { id: '2-8', name: 'TR 08 · Api Nampa', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                    { id: '2-9', name: 'TR 09 · Badimalika', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                ]
            },
            '3rd': {
                label: '3rd Floor · Bagmati',
                theme: 'Bagmati',
                rooms: [
                    { id: '3-1', name: 'Godawari (Library)', type: 'Library', icon: 'fa-book' },
                    { id: '3-3', name: 'One More Bite', type: 'Food', icon: 'fa-utensils' },
                ]
            },
            '4th': {
                label: '4th Floor · Karnali',
                theme: 'Karnali',
                rooms: [
                    { id: '4-1', name: 'TR 10 · Dolpo', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                    { id: '4-2', name: 'TR 11 · Sinja Valley', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                    { id: '4-3', name: 'TR 12 · Kupinde Daha', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                    { id: '4-4', name: 'TR 13 · Panchakoshi', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                    { id: '4-5', name: 'TR 14 · Pachal', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                    { id: '4-6', name: 'Computer Lab', type: 'Lab', icon: 'fa-laptop' },
                    { id: '4-7', name: 'Chemistry Lab', type: 'Lab', icon: 'fa-flask' },
                ]
            },
            '5th': {
                label: '5th Floor · Lumbini',
                theme: 'Lumbini',
                rooms: [
                    { id: '5-1', name: 'TR 15 · Sandhikharka', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                    { id: '5-2', name: 'TR 16 · Kothiyaghat', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                    { id: '5-3', name: 'TR 17 · Ranimahal', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                    { id: '5-4', name: 'TR 18 · Swargadwari', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                    { id: '5-5', name: 'TR 19 · Chisapani', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                    { id: '5-6', name: 'LT01 (Lecture Hall)', type: 'Lecture', icon: 'fa-chalkboard' },
                ]
            },
            '6th': {
                label: '6th Floor · Gandaki',
                theme: 'Gandaki',
                rooms: [
                    { id: '6-1', name: 'TR 21 · Ligligkot', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                    { id: '6-2', name: 'TR 22 · Rainaskot', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                    { id: '6-3', name: 'TR 23 · Lho', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                    { id: '6-4', name: 'TR 24 · Lo Manthang', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                    { id: '6-5', name: 'TR 25 · Kapuche Lake', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                    { id: '6-6', name: 'Physics Lab', type: 'Lab', icon: 'fa-flask' },
                    { id: '6-7', name: 'Biology Lab', type: 'Lab', icon: 'fa-dna' },
                ]
            },
            '7th': {
                label: '7th Floor',
                theme: 'Finance & Leadership',
                rooms: [
                    { id: '7-1', name: 'Finance Department', type: 'Office', icon: 'fa-money-bill' },
                    { id: '7-2', name: "CEO's Office", type: 'Office', icon: 'fa-user-tie' },
                    { id: '7-3', name: 'Infirmary', type: 'Medical', icon: 'fa-kit-medical', isNew: true },
                    { id: '7-4', name: "Teachers' Lounge", type: 'Office', icon: 'fa-mug-hot', isNew: true },
                ]
            },
            '8th': {
                label: '8th Floor · Madhesh',
                theme: 'Madhesh',
                rooms: [
                    { id: '8-1', name: 'TR 26 · Salahesh Fulbari', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                    { id: '8-2', name: 'TR 27 · Nadhiman Taal', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                    { id: '8-3', name: 'TR 28 · Simraungadh', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                    { id: '8-4', name: 'TR 29 · Ghadiarwa', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                    { id: '8-5', name: 'TR 30 · Sakhada', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                    { id: '8-6', name: 'TR 31 · Mithila', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                ]
            },
            '9th': {
                label: '9th Floor · Koshi',
                theme: 'Koshi',
                rooms: [
                    { id: '9-1', name: 'TR 32 · Sandakpur', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                    { id: '9-2', name: 'TR 33 · Mukkumlung', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                    { id: '9-3', name: 'TR 34 · Sagarmatha', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                    { id: '9-4', name: 'TR 35 · Namche', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                    { id: '9-5', name: 'TR 36 · Tinjure', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                    { id: '9-6', name: 'TR 37 · Okhaldhunga', type: 'Classroom', icon: 'fa-chalkboard-teacher' },
                ]
            },
            '10th': {
                label: '10th Floor',
                theme: 'Rooftop',
                rooms: [
                    { id: '10-1', name: 'Rooftop Futsal Court', type: 'Sports', icon: 'fa-futbol' },
                    { id: '10-2', name: 'Mathi Cafe', type: 'Food', icon: 'fa-mug-saucer' },
                ]
            }
        };

export const PANORAMA_360 = {};

export const FLOOR_PLANS = {
            'B2': {
                url: "https://github.com/priyanshukhadka100-debug/find-a-friend/blob/main/public/Images/B2.JPG?raw=true",
                caption: "🏸 B2 Floor – Parking, Basketball, Badminton & TT"
            },
            '2nd': {
                url: "https://github.com/priyanshukhadka100-debug/find-a-friend/blob/main/public/Images/2nd.jpg?raw=true",
                caption: "📚 2nd Floor – TR 01 to TR 09 · Sudurpashchim"
            },
            '3rd': {
                url: "https://github.com/priyanshukhadka100-debug/find-a-friend/blob/main/public/Images/3rd.jpg?raw=true",
                caption: "📚 3rd Floor – Library & One More Bite · Bagmati"
            },
            '10th': {
                url: "https://github.com/priyanshukhadka100-debug/find-a-friend/blob/main/public/Images/10th.jpg?raw=true",
                caption: "🌅 10th Floor – Rooftop · Futsal Court & Mathi Cafe"
            },
        };

export const getAllRooms = () => {
            const allRooms = [];
            const floorKeys = ['B2', 'B1', 'Ground', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];
            const floorLabels = {
                'B2': 'B2', 'B1': 'B1', 'Ground': 'Ground', '1st': '1st',
                '2nd': '2nd', '3rd': '3rd', '4th': '4th', '5th': '5th',
                '6th': '6th', '7th': '7th', '8th': '8th', '9th': '9th', '10th': '10th'
            };

            floorKeys.forEach(floor => {
                const floorData = FLOOR_DATA_RAW[floor];
                if (floorData && floorData.rooms) {
                    floorData.rooms.forEach(room => {
                        allRooms.push({
                            ...room,
                            id: room.id + '_' + floor,
                            floor: floorLabels[floor]
                        });
                    });
                }
            });
            return allRooms;
        };

export const FLOOR_ORDER = ['All', 'B2', 'B1', 'Ground', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];
