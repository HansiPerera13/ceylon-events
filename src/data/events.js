// Hard-coded sample data for the app (dates/venues are illustrative).
export const CATEGORIES = ['All', 'Music', 'Food', 'Culture', 'Sports', 'Tech'];

const img = (seed) => `https://picsum.photos/seed/${seed}/800/500`;

export const EVENTS = [
  {
    id: '1',
    title: 'Colombo Jazz Night',
    category: 'Music',
    date: '2026-12-05',
    time: '7:00 PM',
    location: 'Galle Face Hotel, Colombo 03',
    price: 'LKR 3,500',
    image: img('jazz-colombo'),
    description:
      'An evening of live jazz featuring local and visiting artists on the seafront lawn. Enjoy smooth saxophone sets, a candle-lit setting and sunset views over the Indian Ocean.',
  },
  {
    id: '2',
    title: 'Street Food Carnival',
    category: 'Food',
    date: '2026-12-12',
    time: '11:00 AM',
    location: 'Independence Square, Colombo 07',
    price: 'Free entry',
    image: img('street-food'),
    description:
      'Over 60 stalls serving kottu, hoppers, isso wade, watalappan and more. Includes live cooking demos by well-known Sri Lankan chefs and a family play zone.',
  },
  {
    id: '3',
    title: 'Kandyan Dance Showcase',
    category: 'Culture',
    date: '2026-12-15',
    time: '6:30 PM',
    location: 'Cultural Centre, Kandy',
    price: 'LKR 2,000',
    image: img('kandyan-dance'),
    description:
      'Traditional Kandyan drummers and dancers perform Ves, Udekki and Pantheru dances, followed by a fire-walking finale. A great introduction to Sri Lankan heritage.',
  },
  {
    id: '4',
    title: 'Galle Fort Marathon',
    category: 'Sports',
    date: '2026-12-20',
    time: '5:30 AM',
    location: 'Galle Fort, Galle',
    price: 'LKR 1,500',
    image: img('galle-marathon'),
    description:
      'A scenic 10K and 21K run around the ramparts of the Dutch Fort and along the coast. Finisher medals and refreshments for every participant.',
  },
  {
    id: '5',
    title: 'Mobile Dev Meetup Kelaniya',
    category: 'Tech',
    date: '2026-11-28',
    time: '2:00 PM',
    location: 'Dept. of Statistics & Computer Science, Kelaniya',
    price: 'Free entry',
    image: img('dev-meetup'),
    description:
      'Talks and live demos on React Native, Expo Router and mobile UX. Includes a networking session with industry mentors and student project showcases.',
  },
  {
    id: '6',
    title: 'Hill Country Tea Festival',
    category: 'Food',
    date: '2027-01-09',
    time: '9:00 AM',
    location: 'Pedro Tea Estate, Nuwara Eliya',
    price: 'LKR 2,500',
    image: img('tea-festival'),
    description:
      'Guided estate walks, tea-tasting flights and a plucking experience in the cool hill country. Ends with a high-tea buffet overlooking the valley.',
  },
  {
    id: '7',
    title: 'Baila Beach Party',
    category: 'Music',
    date: '2026-12-31',
    time: '8:00 PM',
    location: 'Mount Lavinia Beach, Dehiwala',
    price: 'LKR 5,000',
    image: img('baila-party'),
    description:
      'Ring in the New Year on the sand with the best baila bands, DJs and a midnight fireworks display. Food and drink stalls available all night.',
  },
  {
    id: '8',
    title: 'Poya Day Lantern Walk',
    category: 'Culture',
    date: '2026-12-23',
    time: '6:00 PM',
    location: 'Beira Lake, Colombo 02',
    price: 'Free entry',
    image: img('lantern-walk'),
    description:
      'A calm community walk around the lake lit by hand-made lanterns, with traditional music and a short talk about the meaning of Poya celebrations.',
  },
  {
    id: '9',
    title: 'Sri Lanka Cricket Fan Day',
    category: 'Sports',
    date: '2027-01-16',
    time: '10:00 AM',
    location: 'R. Premadasa Stadium, Colombo 14',
    price: 'LKR 1,000',
    image: img('cricket-fan'),
    description:
      'Meet national players, join net sessions, and take part in fun fan challenges. Autograph booths and exclusive merchandise on sale.',
  },
  {
    id: '10',
    title: 'AI & Startup Summit',
    category: 'Tech',
    date: '2027-01-22',
    time: '9:00 AM',
    location: 'BMICH, Colombo 07',
    price: 'LKR 6,000',
    image: img('ai-summit'),
    description:
      'A full-day summit with keynote speakers, startup pitches and workshops on AI, fintech and cloud. Lunch and networking coffee included.',
  },
];
