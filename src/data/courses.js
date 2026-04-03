// Static course database – no API key needed
// Data sourced from public knowledge about famous golf courses

export const COURSES = [
  {
    id: 1,
    name: 'Augusta National Golf Club',
    location: 'Augusta, GA, USA',
    designer: 'Alister MacKenzie & Bobby Jones',
    yearOpened: 1933,
    par: 72,
    yardage: 7475,
    holes: 18,
    rating: 4.9,
    reviewCount: 2841,
    difficulty: 5,
    type: 'Private',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80',
    description:
      'Home of The Masters, Augusta National is arguably the most famous golf course in the world. Known for its pristine conditions, azaleas, and iconic holes like Amen Corner.',
    hostsTournaments: ['The Masters Tournament'],
    amenities: ['Caddie Service', 'Pro Shop', 'Dining', 'Practice Range'],
    famousHoles: [
      { hole: 12, name: 'Golden Bell', description: 'The most famous par-3 in golf, crossing Rae\'s Creek with Azalea bushes in bloom.' },
      { hole: 16, name: 'Redbud', description: 'Iconic par-3 where patrons gather to witness hole-outs.' },
    ],
    reviews: [
      { author: 'James T.', rating: 5, text: 'An absolute bucket-list experience. The course is even more spectacular in person.', date: '2024-04-10' },
      { author: 'Sarah M.', rating: 5, text: 'Walking the same fairways as Nicklaus and Tiger is surreal. Perfectly manicured.', date: '2024-04-05' },
    ],
  },
  {
    id: 2,
    name: 'Pebble Beach Golf Links',
    location: 'Pebble Beach, CA, USA',
    designer: 'Jack Neville & Douglas Grant',
    yearOpened: 1919,
    par: 72,
    yardage: 6828,
    holes: 18,
    rating: 4.8,
    reviewCount: 3201,
    difficulty: 4,
    type: 'Public',
    image: 'https://images.unsplash.com/photo-1587174145226-14cd77564a02?w=800&q=80',
    description:
      'Stretching along the rugged Monterey Peninsula coastline, Pebble Beach is one of the most scenic public courses in the world and has hosted six U.S. Opens.',
    hostsTournaments: ['AT&T Pebble Beach Pro-Am', 'U.S. Open'],
    amenities: ['Caddie Service', 'Pro Shop', 'The Lodge Dining', 'Practice Facility', 'Golf Academy'],
    famousHoles: [
      { hole: 7, name: 'Alcatraz', description: 'Tiny par-3 perched over the Pacific — one of the most photographed holes in the world.' },
      { hole: 18, name: 'Home', description: 'Dramatic closing par-5 hugging the coastline, famous for Tom Watson\'s chip-in in 1982.' },
    ],
    reviews: [
      { author: 'Mike D.', rating: 5, text: 'Playing Pebble Beach is a dream come true. The ocean views on holes 7 and 18 are breathtaking.', date: '2024-02-18' },
      { author: 'Linda K.', rating: 4, text: 'Expensive but worth every penny. Carry an extra sweater for the coastal wind!', date: '2024-01-30' },
    ],
  },
  {
    id: 3,
    name: 'St Andrews Links – Old Course',
    location: 'St Andrews, Fife, Scotland',
    designer: 'Natural Links (evolved over centuries)',
    yearOpened: 1552,
    par: 72,
    yardage: 7305,
    holes: 18,
    rating: 4.9,
    reviewCount: 4102,
    difficulty: 4,
    type: 'Public',
    image: 'https://images.unsplash.com/photo-1606904571063-0bcb7b2fb4b8?w=800&q=80',
    description:
      'The "Home of Golf," the Old Course at St Andrews has been played for over 600 years and hosts The Open Championship regularly. Its wide fairways, deep bunkers, and shared greens are unlike anywhere else.',
    hostsTournaments: ['The Open Championship'],
    amenities: ['Caddie Service', 'Clubhouse', 'Golf Museum', 'Practice Areas'],
    famousHoles: [
      { hole: 17, name: 'Road Hole', description: 'Infamous par-4 with the Road Hole Bunker — perhaps the hardest hole in major championship golf.' },
      { hole: 18, name: 'Tom Morris', description: 'Wide par-4 finishing in front of the historic R&A Clubhouse and Swilcan Bridge.' },
    ],
    reviews: [
      { author: 'Tom A.', rating: 5, text: 'Walking the Swilcan Bridge and finishing in front of the R&A clubhouse gave me chills. Pure golf history.', date: '2023-07-22' },
      { author: 'Helen B.', rating: 5, text: 'The Old Course is unlike anything else. The history is palpable on every hole.', date: '2023-08-14' },
    ],
  },
  {
    id: 4,
    name: 'Torrey Pines Golf Course (South)',
    location: 'La Jolla, CA, USA',
    designer: 'William Bell (redesigned Rees Jones)',
    yearOpened: 1957,
    par: 72,
    yardage: 7765,
    holes: 18,
    rating: 4.5,
    reviewCount: 1987,
    difficulty: 4,
    type: 'Municipal',
    image: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=800&q=80',
    description:
      'A stunning municipal course set on the cliffs above the Pacific Ocean near San Diego. Torrey Pines South hosted Tiger Woods\'s 2008 U.S. Open win and the Farmers Insurance Open annually.',
    hostsTournaments: ['Farmers Insurance Open', 'U.S. Open (2008, 2021)'],
    amenities: ['Pro Shop', 'Restaurant', 'Driving Range', 'Practice Greens'],
    famousHoles: [
      { hole: 6, name: 'The Cliffhanger', description: 'Par-5 that runs along the cliff edge with stunning ocean panoramas.' },
      { hole: 18, name: 'The Closer', description: 'Uphill par-5 — site of Tiger\'s famous birdie putt in the 2008 U.S. Open playoff.' },
    ],
    reviews: [
      { author: 'Carlos R.', rating: 5, text: 'Can\'t beat the price for what you get. Ocean views are incredible and the course is a real test.', date: '2024-03-01' },
      { author: 'Pam H.', rating: 4, text: 'Make reservations early — tee times book up fast. Challenging but fair.', date: '2024-02-10' },
    ],
  },
  {
    id: 5,
    name: 'TPC Sawgrass – Stadium Course',
    location: 'Ponte Vedra Beach, FL, USA',
    designer: 'Pete Dye',
    yearOpened: 1980,
    par: 72,
    yardage: 7245,
    holes: 18,
    rating: 4.7,
    reviewCount: 2356,
    difficulty: 5,
    type: 'Resort',
    image: 'https://images.unsplash.com/photo-1563132337-f159f484226c?w=800&q=80',
    description:
      'Permanent home of The Players Championship (golf\'s 5th major), TPC Sawgrass is famous for Pete Dye\'s dramatic designs, most notably the iconic island green par-3 17th hole.',
    hostsTournaments: ['THE PLAYERS Championship'],
    amenities: ['Caddie Service', 'Pro Shop', 'Champions Club Restaurant', 'Golf Academy', 'Multiple Practice Areas'],
    famousHoles: [
      { hole: 17, name: 'The Island Green', description: 'The most famous short par-3 in the world — a tiny island green surrounded by water.' },
      { hole: 18, name: 'The Finisher', description: 'Par-4 with water guarding the entire left side and a grandstand-style finish.' },
    ],
    reviews: [
      { author: 'Brett W.', rating: 5, text: 'Standing on the 17th tee is nerve-wracking even without money on the line. Incredible course!', date: '2024-03-15' },
      { author: 'Angela S.', rating: 4, text: 'Water, water, everywhere. Bring extra balls and your A-game. The facilities are world-class.', date: '2024-01-20' },
    ],
  },
  {
    id: 6,
    name: 'Royal Melbourne Golf Club (West)',
    location: 'Black Rock, Victoria, Australia',
    designer: 'Alister MacKenzie',
    yearOpened: 1931,
    par: 72,
    yardage: 6600,
    holes: 18,
    rating: 4.8,
    reviewCount: 987,
    difficulty: 4,
    type: 'Private',
    image: 'https://images.unsplash.com/photo-1617204833598-5f2180a48b1c?w=800&q=80',
    description:
      'Widely regarded as Australia\'s best and one of the top-10 courses in the world. Alister MacKenzie\'s sandbelt masterpiece features bold bunkering, fast greens, and perfectly natural routing.',
    hostsTournaments: ['Australian Open', 'Presidents Cup'],
    amenities: ['Caddie Service', 'Clubhouse Dining', 'Practice Facilities'],
    famousHoles: [
      { hole: 6, name: 'MacKenzie\'s Gem', description: 'Short par-4 showcasing MacKenzie\'s genius with dramatic contoured bunkers.' },
      { hole: 7, name: 'The Creek Hole', description: 'Driveable par-4 with a creek crossing the fairway and a well-bunkered green.' },
    ],
    reviews: [
      { author: 'Liam C.', rating: 5, text: 'As good as any course I\'ve played anywhere in the world. MacKenzie\'s bunkering is art.', date: '2023-11-05' },
      { author: 'Zoe P.', rating: 5, text: 'The sandbelt turf is unmatched. Pure golf in every sense of the word.', date: '2023-12-01' },
    ],
  },
];

export function getCourseById(id) {
  return COURSES.find((c) => c.id === Number(id)) || null;
}

export function searchCourses(query) {
  const q = query.toLowerCase();
  return COURSES.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.location.toLowerCase().includes(q) ||
      c.designer.toLowerCase().includes(q) ||
      (c.hostsTournaments || []).some((t) => t.toLowerCase().includes(q))
  );
}

export function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return { full, half, empty: 5 - full - (half ? 1 : 0) };
}
