// ===================== DEPARTMENT OVERVIEW (IIT BOMBAY) =====================
export const departmentInfo = {
  name: 'Department of Civil Engineering',
  institute: 'Indian Institute of Technology Bombay',
  established: 1958,
  hod: {
    name: 'Prof. Tom V Mathew',
    designation: 'Head of Department & Professor (HAG)',
    department: 'Transportation Systems Engineering',
    email: 'hod@civil.iitb.ac.in',
    phone: '+91-22-2576-7300',
    office: 'Room 115, Civil Engineering Building, IIT Bombay',
    website: 'https://www.civil.iitb.ac.in/~vmtom',
  },
  vision: 'To be the fountain-head of new ideas and innovations in Civil Engineering.',
  mission: 'To offer world-class undergraduate and post-graduate education, research guidance, professional consultancy, outreach and manpower training as well as leadership in Civil Engineering.',
  goals: 'To offer world-class undergraduate and post-graduate education, research guidance, professional consultancy, outreach and manpower training as well as leadership in Civil Engineering.',
  rankings: {
    qsIndia: '#1 in India',
    qsWorld: '51–100 Worldwide',
    qsContext: 'QS World University Rankings by Subject: Civil Engineering',
    stanfordTop2: '9+ Faculty members in Stanford/Elsevier Global Top 2% Scientists',
  },
  stats: {
    facultyCount: '55 Regular Faculty, 2 Adjunct & 1 Visiting',
    labsCount: '17 Advanced Teaching & Research Laboratories',
    ugStudents: '600+ B.Tech Students on Roll',
    pgStudents: '415+ M.Tech & Ph.D. Scholars',
  },
  contact: {
    address: 'The Head, Department of Civil Engineering, Indian Institute of Technology Bombay, Powai, Mumbai - 400076, Maharashtra, India.',
    phone: '+91-22-2576 7301 / 7300',
    fax: '+91-22-2576 7302',
    email: 'hod@civil.iitb.ac.in',
    dampEmail: 'damp@civil.iitb.ac.in',
    portalUrl: 'https://www.civil.iitb.ac.in/',
    webmailUrl: 'https://www.civil.iitb.ac.in/cemail/',
    profileLoginUrl: 'https://www.civil.iitb.ac.in/faculty-master',
  },
};

// ===================== 7 SPECIALIZATIONS =====================
export const specializations = [
  {
    id: 1,
    code: 'CE-1',
    name: 'Transportation Systems Engineering',
    shortName: 'TSE',
    established: 1988,
    url: 'https://www.civil.iitb.ac.in/~tse/',
    description: 'Focuses on traffic flow modeling and simulation, intelligent transportation systems (ITS), sustainable urban transit planning, travel behavior analysis, and highway pavement materials.',
    keyLabs: ['Traffic Engineering Lab', 'Transportation Systems Simulation Lab', 'Pavement Materials Lab'],
  },
  {
    id: 2,
    code: 'CE-2',
    name: 'Geotechnical Engineering',
    shortName: 'GTE',
    established: 1959,
    url: 'https://www.civil.iitb.ac.in/Home/research/2',
    description: 'Encompasses geotechnical earthquake engineering, soil dynamics, centrifuge modeling, environmental geotechnology, underground tunneling, deep excavations, and reinforced soil structures.',
    keyLabs: ['National Geotechnical Centrifuge Facility (NGCF)', 'Geotechnical Earthquake Engg Lab (GEEL)', 'Soil Mechanics & Foundation Testing Lab'],
  },
  {
    id: 3,
    code: 'CE-3',
    name: 'Water Resources Engineering',
    shortName: 'WRE',
    established: 1958,
    url: 'https://www.civil.iitb.ac.in/wre.labs/index.html',
    description: 'Covers hydro-climatology, climate change impact on Indian monsoons, meso-scale hydrologic modeling, urban stormwater drainage, groundwater contaminant transport, and coastal hydrodynamics.',
    keyLabs: ['Hydraulics & Fluid Mechanics Lab', 'Hydrology & Climate Research Lab', 'Groundwater Modeling Lab'],
  },
  {
    id: 4,
    code: 'CE-4',
    name: 'Structural Engineering',
    shortName: 'STR',
    established: 1958,
    url: 'https://www.civil.iitb.ac.in/Home/research/4',
    description: 'Specializes in earthquake-resistant design, structural dynamics, vibration control using base isolators & tuned mass dampers, structural health monitoring, computational mechanics, and retrofitting.',
    keyLabs: ['Heavy Structures Testing Lab', 'Structural Dynamics & Shake Table Lab', 'Advanced Concrete Materials Lab'],
  },
  {
    id: 5,
    code: 'CE-5',
    name: 'Ocean Engineering',
    shortName: 'OE',
    established: 1980,
    url: 'https://www.civil.iitb.ac.in/ocean/index.html',
    description: 'Pioneering research in coastal wave hydrodynamics, offshore platforms, port & harbour engineering, tsunami wave mitigation, marine sediment dynamics, and underwater structures.',
    keyLabs: ['Wave Flume & Coastal Engg Lab', 'Offshore Structures Simulation Lab'],
  },
  {
    id: 6,
    code: 'CE-6',
    name: 'Remote Sensing',
    shortName: 'RS',
    established: 1980,
    url: 'https://www.civil.iitb.ac.in/Home/research/6',
    description: 'Applies satellite geodesy, GIS, radar remote sensing (SAR), LiDAR, photogrammetry, and spatial analytics for disaster mitigation, urban infrastructure planning, and natural resource mapping.',
    keyLabs: ['Geodesy & Geoinformatics Lab', 'Radar Remote Sensing & Photogrammetry Lab'],
  },
  {
    id: 7,
    code: 'CE-7',
    name: 'Construction Technology and Management',
    shortName: 'CTM',
    established: 2016,
    url: 'https://www.civil.iitb.ac.in/~ctam/',
    description: 'Focuses on Building Information Modeling (BIM), lean construction, infrastructure lifecycle assessment, automated construction systems, construction contract management, and sustainable materials.',
    keyLabs: ['BIM & Smart Construction Lab', 'Construction Project Management Simulation Lab'],
  },
];

import {
  courseReviews as realCourseReviews,
  allProjects as realAllProjects,
  btpReviews as realBtpReviews,
  idpReviews as realIdpReviews,
  realAcademicResources
} from './dampReviewsData';

// ===================== COURSE REVIEWS =====================
export const courseReviews = realCourseReviews;
export const btpReviews = realBtpReviews;
export const idpReviews = realIdpReviews;


// ===================== MINOR REVIEWS =====================
export const minorReviews = [];

// ===================== BTP / IDP PROJECTS =====================
export const projects = realAllProjects;


// ===================== RESEARCH BOOKLET / FACULTY DIRECTORY =====================
export const professors = [
  {
    id: 1,
    isDemo: true,
    name: "[DEMO] Prof. Tom V Mathew",
    designation: "Head of Department & Professor (HAG)",
    department: "Transportation Systems Engineering",
    areas: ["Traffic Flow Modeling & Simulation", "Transportation Network Optimization", "Traffic Control & Management"],
    email: "tvm@civil.iitb.ac.in",
    phone: "+91-22-2576-7349",
    website: "https://www.civil.iitb.ac.in/~vmtom",
    note: "[DEMO ENTRY] Faculty research directory preview. Full faculty research profiles are maintained on the official departmental portal."
  },
];

export const departmentAwards = [];

export const internships = [
  {
    id: 1,
    isDemo: true,
    title: "[DEMO] Structural Design Intern — Larsen & Toubro",
    company: "Larsen & Toubro (Sample Entry)",
    category: "Core",
    subtag: null,
    location: "Mumbai / Hyderabad",
    duration: "2 months (Sample)",
    author: "Senior Batch (Sample)",
    batch: "B.Tech (Demo)",
    date: "Summer 2024 (Sample)",
    excerpt: "[DEMO DATA] Sample internship experience chronicle. Demonstrates how structural engineering design, ETABS modeling, and IS code checks apply in real high-rise construction. Authentic student internship reviews will appear here once compiled by the DAMP team.",
  },
];

export const scholarships = [];

export const competitions = [
  {
    id: 1,
    isDemo: true,
    name: "[DEMO] AAKAAR Annual Civil Festival Competitions",
    organizer: "Department of Civil Engineering, IIT Bombay",
    category: "Departmental Flagship (Demo)",
    description: "[DEMO DATA] Sample competition entry. AAKAAR is the annual technical festival of the Department of Civil Engineering at IIT Bombay, featuring BridgeIT, Seismic Design, Smart City challenges, and CiviQ quiz.",
    highlights: ["BridgeIT (Truss load testing)", "Seismic Design Competition", "Smart City Planning Challenge"],
  },
];

export const international = [];

export const blogs = [
  {
    id: 1,
    isDemo: true,
    title: "[DEMO] Student Experience Chronicle: Navigating Civil Engineering at IIT Bombay",
    author: "Senior Batch (Sample)",
    batch: "B.Tech (Demo)",
    date: "Demo Record",
    category: "Internships",
    excerpt: "[DEMO DATA] Sample student narrative. Preparation strategies, balancing coursework with lab work, and finding mentorship in the civil department. Real chronicles from the Civil DAMP Media team will be published here.",
    bannerColor: "#173F35",
  },
];

// ===================== TEAM =====================
export const subgroupHeads = [
  { id: 1, name: "Parv Seth", subgroup: "Web", year: "3rd/4th Year", rollNo: "23B0652", email: "comingsoon@iitb.ac.in", linkedin: "#", description: "Details coming soon...", photo: "" },
  { id: 2, name: "Mrunal Pachpande", subgroup: "Blog & Media", year: "3rd/4th Year", rollNo: "23B0723", email: "comingsoon@iitb.ac.in", linkedin: "#", description: "Details coming soon...", photo: "/team-photos/mrunal_pachpande.jpg" },
  { id: 3, name: "Aryan Kashyap", subgroup: "Events", year: "3rd/4th Year", rollNo: "23B0741", email: "comingsoon@iitb.ac.in", linkedin: "#", description: "Details coming soon...", photo: "" },
  { id: 4, name: "Puranjay Bansal", subgroup: "Core & Research", year: "3rd/4th Year", rollNo: "23B0731", email: "comingsoon@iitb.ac.in", linkedin: "#", description: "Details coming soon...", photo: "" },
  { id: 5, name: "Prateek Jadhao", subgroup: "Resources", year: "3rd/4th Year", rollNo: "23B0719", email: "comingsoon@iitb.ac.in", linkedin: "#", description: "Details coming soon...", photo: "" },
];

export const mentors = [
  { id: 1, name: "Kunal Gandvane", year: "2nd/3rd Year", subgroup: "Web", rollNo: "24B0705", email: "24B0705", intro: "Curiosity has been my favorite hobby for as long as I can remember. One day I'm reading about black holes, the next I'm exploring a new city, building something, or going down a history rabbit hole at 2 AM By the end of my second year, I had co-authored two research papers.  Fun fact: I forget names surprisingly fast.", photo: "/team-photos/kunal_gandvane.jpg" },
  { id: 2, name: "Naitik Agarwal", year: "2nd/3rd Year", subgroup: "Web", rollNo: "24B0665", email: "24b0665@iitb.ac.in", intro: "Hi, I'm Naitik Agarwal, a third-year Civil Engineering student at IIT Bombay from Kishangarh, Rajasthan. I’m interested in AI/ML, enjoy organizing student initiatives, and love creating realistic pencil portraits in my free time. I enjoy learning new things and connecting with people from diverse backgrounds.. ", photo: "/team-photos/naitik_agarwal.jpg" },
  { id: 3, name: "Atharva Lele", year: "2nd/3rd Year", subgroup: "Web", rollNo: "23B0658", email: "23b0658", intro: "Hello! I am Atharva from Pune, a 4th year undergrad student. Love to play Table Tennis and read fiction books. I am pursuing a minor degree in CSE and interned at Adobe this summer. ", photo: "/team-photos/atharva_lele.jpg" },
  { id: 4, name: "Rishabh Agarwal", year: "2nd/3rd Year", subgroup: "Web", rollNo: "23B0758", email: "23b0758@iitb.ac.in", intro: "I am a B.Tech student at IIT Bombay with experience in software development and machine learning. Currently interning at Microsoft, I enjoy building AI-driven solutions and solving complex problems through technology. Passionate about innovation, I continuously seek opportunities to learn, lead, and create impactful products.", photo: "/team-photos/rishabh_agarwal.jpg" },
  { id: 5, name: "Mrunal Pachpande", year: "2nd/3rd Year", subgroup: "Web", rollNo: "23B0723", email: "23B0723", intro: "I'm passionate about creating products and experiences that make a meaningful impact. I enjoy bringing together people, ideas, and technology to solve problems and drive outcomes. Having led teams and worked across diverse stakeholders, I thrive in fast-paced environments where curiosity, ownership, and execution matter. Outside work, I enjoy dancing, reading, playing badminton, and continuously learning from the world around me.", photo: "/team-photos/mrunal_pachpande.jpg" },
  { id: 6, name: "Arinjay Nigam", year: "2nd/3rd Year", subgroup: "Blog & Media", rollNo: "24B0608", email: "24b0608@iitb.ac.in", intro: "Hi everyone! Arinjay here, I’m a thirdie in the Civil Department, interested in almost every sport there is, along with music, cinema and pretty much everything non-academic. And also I make amazing maggi. Always up for a chat and excited to kick things off!", photo: "/team-photos/arinjay_nigam.jpg" },
  { id: 7, name: "Maanya Agrawal", year: "2nd/3rd Year", subgroup: "Blog & Media", rollNo: "23B0678", email: "23b0678@iitb.ac.in", intro: "Hi, I’m Maanya Agrawal, a fourth-year Civil Engineering student at IIT Bombay. I enjoy solving problems, leading teams, and turning ideas into impact through sustainability and student initiatives. Outside academics, you’ll find me running, playing squash, going to the gym or obsessing over good food and great conversations.", photo: "/team-photos/maanya_agrawal.jpg" },
  { id: 8, name: "Manikarnika Sharma", year: "2nd/3rd Year", subgroup: "Blog & Media", rollNo: "24B0670", email: "24b0670@iitb.ac.in", intro: "Hi Everyone! I'm Mani, a third year from Civil Engineering, I love playing basketball, Nimbooz, YouTube, soft rock music, The Office, doomscrolling pinterest, conspiracy theories, coffee and ranting about minor inconveniences. If you see me around, feel free to reach out and say hi! ", photo: "/team-photos/manikarnika_sharma.jpg" },
  { id: 10, name: "Neel Wadhwa", year: "2nd/3rd Year", subgroup: "Blog & Media", rollNo: "24B0649", email: "24b0649@iitb.ac.in", intro: "Hey i am a thirdie from indore, sleepy head, loves to explore new music, sports and places, hmu for a game if i am awake!! ", photo: "/team-photos/neel_wadhwa.jpg" },
  { id: 11, name: "Ritesh Srivastava", year: "2nd/3rd Year", subgroup: "Blog & Media", rollNo: "24B0613", email: "24b0613@iitb.ac.in", intro: "Hey everyone, I’m Ritesh Srivastava from Varanasi. I'm incapable of saying no to wildly spontaneous plans, especially if they’re about going on treks. I love chasing miles while running and lifting weights with Brazilian phonk on repeat. My daily mantra: just outdo who I was yesterday.  Hustle karo!!", photo: "/team-photos/ritesh_srivastava.jpg" },
  { id: 12, name: "Shashwat Jain", year: "2nd/3rd Year", subgroup: "Blog & Media", rollNo: "24B0640", email: "24b0640@iitb.ac.in", intro: "Hellow fellow doomscrollers and binge-watchers! I'm Shashwat Jain from Bhopal, an avid cricket fan. My music taste ranges from raps to ghazals. I am always up for impromptu plans, enjoy making stickers (beware :) and I believe sarcasm is the spice of life. Start late & clutch hard!", photo: "/team-photos/shashwat_jain.jpg" },
  { id: 13, name: "Yashika Singh", year: "2nd/3rd Year", subgroup: "Blog & Media", rollNo: "24B0677", email: "24b0677@iitb.ac.in", intro: "hi, i'm yashika. professional café hopper, impulsive shopper, and somehow always the one who knows the best spots before they blow up.", photo: "/team-photos/yashika_singh.jpg" },
  { id: 14, name: "Anviksha Vipassana", year: "2nd/3rd Year", subgroup: "Events", rollNo: "24B0728", email: "24b0728@iitb.ac.in", intro: "Hi I'm Anviksha, known for saying “I’m on my way” while still in my room. Big on random plans, long walks, and conversations that start with nonsense and somehow end at life. Just figuring things out, meeting good people, and collecting stories on the way :)", photo: "/team-photos/anviksha_vipassana.jpg" },
  { id: 15, name: "Arit Misra", year: "2nd/3rd Year", subgroup: "Events", rollNo: "23B0645", email: "arit.misra@iitb.ac.in", intro: "SIX SEVEN", photo: "/team-photos/arit_misra.jpg" },
  { id: 16, name: "Ishaan Singh Pawar", year: "2nd/3rd Year", subgroup: "Events", rollNo: "24B0696", email: "24b0696@iitb.ac.in", intro: "SUBJECT: Ishaan Singh Pawar  STATUS: At large  LAST KNOWN ACTIVITY: Winning an argument against himself in the shower.  THREAT LEVEL: Negligible ", photo: "/team-photos/ishaan_singh_pawar.jpg" },
  { id: 17, name: "Meghav Singhal", year: "2nd/3rd Year", subgroup: "Events", rollNo: "23B0740", email: "23b0740@iitb.ac.in", intro: "Hi, I'm Meghav. I enjoy solving puzzles, spotting patterns, and watching films from almost every genre. Whether it's a Sudoku, puzzle, or a movie with a clever twist, I love things that make me think. Always open to movie recommendations—my watchlist is a work in progress. ", photo: "/team-photos/meghav_singhal.jpg" },
  { id: 18, name: "Sarthak Kastiya", year: "2nd/3rd Year", subgroup: "Events", rollNo: "24B0722", email: "24b0722@iitb.ac.in", intro: "Hey I'm Sarthak and I'm from Ratlam Madhya Pradesh, a city famous for its sev and namkeen. And a fun fact about me is that you will always find sev in my bag at anytime.", photo: "/team-photos/sarthak_kastiya.jpg" },
  { id: 19, name: "Shashwat Jain", year: "2nd/3rd Year", subgroup: "Events", rollNo: "24B0640", email: "24b0640@iitb.ac.in", intro: "Hellow fellow doomscrollers and binge-watchers! I'm Shashwat Jain from Bhopal, an avid cricket fan. My music taste ranges from raps to ghazals. I am always up for impromptu plans, enjoy making stickers (beware :) and I believe sarcasm is the spice of life. Start late & clutch hard!", photo: "/team-photos/shashwat_jain.jpg" },
  { id: 20, name: "Vedant Patel", year: "2nd/3rd Year", subgroup: "Events", rollNo: "24B0661", email: "24b0661@iitb.ac.in", intro: "Hello! I'm Vedant Patel from Mumbai (dw ghar nhi jata), and I have no particular permanent interest so currently finding one! Tho I like to have random deep philosophical talks. So this is my 2nd year continuing in CEA Council so yea ig I'm a department lover", photo: "/team-photos/vedant_patel.jpg" },
  { id: 21, name: "Akshara Gupta", year: "2nd/3rd Year", subgroup: "Core & Research", rollNo: "24B0689", email: "24b0689@iitb.ac.in", intro: "Hey, Akshara here, a third year student in the civil department. Outside acads, you will probably find me reading novels, writing my heart out, watching movies or maybe listening to some old songs. I escape to nature whenever I can and yes, I believe that the best conversations happen over a long walk. I enjoy meeting new people and knowing their perspectives because everyone has a different story to tell :)", photo: "/team-photos/akshara_gupta.jpg" },
  { id: 22, name: "Anushka Bansode", year: "2nd/3rd Year", subgroup: "Core & Research", rollNo: "24B0633", email: "24b0633@iitb.ac.in", intro: "Hi everyone, I’m Anushka! Hailing from Maharashtra, I'm someone who chose Civil Engineering, not the other way around. Beyond the classroom, I'm part of EERI and a Core Team Member at NSS IIT Bombay. I know I can come across as serious at times, but believe me, I'm a fun-loving person through and through. Outside commitments, I love traveling, movies, and unwinding with family and friends.", photo: "/team-photos/anushka_bansode.jpg" },
  { id: 23, name: "Archit Kumbhre", year: "2nd/3rd Year", subgroup: "Core & Research", rollNo: "24B0628", email: "24b0628@iitb.ac.in", intro: "Hi, I'm Archit, a third-year Civil Engineering student who comes from Nagpur, Maharashtra. I love playing basketball, travelling, and hunting down good food wherever I go. This summer, I'm representing IIT Bombay as the only Indian team at the international stage of the Seismic Design Competition in the USA. Off campus, I'm just someone chasing the next adventure!", photo: "/team-photos/archit_kumbhre.jpg" },
  { id: 24, name: "Naga Ganesh", year: "2nd/3rd Year", subgroup: "Core & Research", rollNo: "24B0648", email: "24B0648", intro: "Hello! I'm a third-year undergraduate from Andhra Pradesh. I enjoy both playing and watching cricket (a proud THALA fan, of course!). Movies are another obsession of mine, especially Telugu cinema. First day first show of a Telugu film is non-negotiable. Always up for a conversation so feel free to reach out to me anytime.", photo: "/team-photos/naga_ganesh.jpg" },
  { id: 25, name: "Neeraj Wankhede", year: "2nd/3rd Year", subgroup: "Core & Research", rollNo: "24B0673", email: "24b0673@iitb.ac.in", intro: "I'm Neeraj wankhede, a third-year Civil Engineering undergraduate at IIT Bombay. I enjoy exploring new opportunities, meeting people, and trying things I've never done before. I'm always up for travelling, roaming around new places, and collecting unique experiences. Whether it's an event, a challenge, or an adventure, I'm always excited to see where it leads and what I can learn from it.", photo: "/team-photos/neeraj_wankhede.jpg" },
  { id: 26, name: "Sanvi Gupta", year: "2nd/3rd Year", subgroup: "Core & Research", rollNo: "24B0651", email: "24b0651@iitb.ac.in", intro: "Hi, I am Sanvi, a thirdie in Civil Engineering who loves to binge watch mcu on repeat. I love board games, particularly from the winner’s side of the table. On my best days, you will find me playing frisbee on gymkhana grounds. I also enjoy reading books and losing my voice shouting to taylor swift's songs. ", photo: "/team-photos/sanvi_gupta.jpg" },
  { id: 27, name: "Disha Agrawal", year: "2nd/3rd Year", subgroup: "Resources", rollNo: "24B0710", email: "24b0710@iitb.ac.in", intro: "A third year civil engineering student from Bhopal who lives for the ultimate escape. When I'm not navigating college life, you’ll find me traveling to break the routine, exploring new places, and hunting down good food. Otherwise I’m probably watching horror and thriller movies or just catching up on sleep. Always up for a good chat!", photo: "/team-photos/disha_agrawal.jpg" },
  { id: 28, name: "Disha Gugale", year: "2nd/3rd Year", subgroup: "Resources", rollNo: "24B0632", email: "24b0632@iitb.ac.in", intro: "Hi, I'm Disha from Pune. I love trying out new things, whether it's travelling somewhere new, picking up a random hobby, or saying yes to experiences that sound fun. Fun fact: I'm obsessed with watermelons and could probably survive on them. I also love good food, pretty cafés, taking pictures, and meeting new people. I'd call myself a jack of all trades who's always curious and up for an adventure", photo: "/team-photos/disha_gugale.jpg" },
  { id: 29, name: "Pratham Bagdi", year: "2nd/3rd Year", subgroup: "Resources", rollNo: "24B0700", email: "24b0700@iitb.ac.in", intro: "Hi everyone! Pratham here from Indore. Strong believer of \"accha khana khane se sab thik ho jata hai 😂\" , always in for ordering food anytime. I also like playing sports (will find me on some or other courts) , binging web series (I hate anime) and traveling. Feel free to approach me anytime always willing to have fun conversations and interact with people", photo: "/team-photos/pratham_bagdi.jpg" },
  { id: 30, name: "Raj Achliya", year: "2nd/3rd Year", subgroup: "Resources", rollNo: "24B0706", email: "24b0706@iitb.ac.in", intro: "Hey, I'm Raj Achliya. I dabble in tech and finance, and I'm slowly figuring both out. Big cricket fan , could talk about it for hours. Always curious, always up for a good chat — whether it's about the last match or just life at IITB.", photo: "/team-photos/raj_achliya.jpg" },
  { id: 31, name: "Rishabh Jain", year: "2nd/3rd Year", subgroup: "Resources", rollNo: "24B0672", email: "24b0672@iitb.ac.in", intro: "Hi I'm Rishabh from Delhi. I love people, nature, and saying yes to trips before knowing the destination. Fun fact: I once greeted a professor, and now he smiles at me every time we cross paths. No idea why, but I think that says something about the power of a good hello!", photo: "/team-photos/rishabh_jain.jpg" },
  { id: 32, name: "Vansh Chandarana", year: "2nd/3rd Year", subgroup: "Resources", rollNo: "23B0659", email: "23b0659@iitb.ac.in", intro: "Hi, I am Vansh Chandarana from Surat, Gujarat. I am passionate about finance and enjoy playing badminton and table tennis in my free time.", photo: "/team-photos/vansh_chandarana.jpg" },
];


export const dampc = [
  {
    id: 1,
    name: 'Jinay Vora',
    role: 'Overall Head, Civil DAMP',
    subgroup: 'Overall Coordinator',
    year: '4th Year, B.Tech',
    rollNo: '23B0729',
    email: '',
    ldap: '23b0729@iitb.ac.in',
    phone: '+91 77770 13480',
    linkedin: '#',
    description: 'Oversees the entire academic mentorship program, liaising with faculty coordinators, HOD office, and student representatives.',
  },
  {
    id: 2,
    name: 'Vivaan Jain',
    role: 'Overall Head, Civil DAMP',
    subgroup: 'Overall Coordinator',
    year: '4th Year, B.Tech',
    rollNo: '23B0666',
    email: '',
    ldap: '23b0666@iitb.ac.in',
    phone: '+91 85910 38625',
    linkedin: '#',
    description: 'Coordinates mentor-mentee allocations, strategic initiatives, and department-wide academic support programs.',
  },
];

export const facultyCoordinator = {
  name: 'Prof. Tom V Mathew',
  designation: 'Head of Department & Faculty Mentor',
  department: 'Department of Civil Engineering, IIT Bombay',
  specialisation: 'Transportation Systems Engineering',
  email: 'hod@civil.iitb.ac.in',
  office: 'Room 115, Civil Engineering Building, IIT Bombay',
};

// ===================== EVENTS =====================
export const events = [];
export const achievements = [];
export const alumni = [];
export const semexBlogs = [];
export const latestBlogs = blogs;
export const upcomingEvents = events;
export const clubs = [];

// ===================== IMPORTANT LINKS =====================
export const importantLinks = [
  {
    category: 'Official IITB Civil Department',
    icon: '🏛️',
    links: [
      { title: 'Civil Engineering Department Portal', url: 'https://www.civil.iitb.ac.in/', description: 'Official website of the Department of Civil Engineering, IIT Bombay' },
      { title: 'Academics & Specializations', url: 'https://www.civil.iitb.ac.in/academics', description: 'Curricula, graduate programs, and eligibility criteria' },
      { title: 'Faculty Directory & Profiles', url: 'https://www.civil.iitb.ac.in/faculty', description: 'Complete profiles, research domains, and contact details of all faculty' },
      { title: 'Research & Labs Directory', url: 'https://www.civil.iitb.ac.in/research', description: 'Specialized research centers and laboratory facilities' },
      { title: 'Civil Insights 2025 Magazine', url: 'https://www.civil.iitb.ac.in/civilinsights_2025.pdf', description: 'Official annual department publication showcasing achievements' },
      { title: 'Department Brochure (2022–23)', url: 'https://www.civil.iitb.ac.in/Final_brochure_2023.pdf', description: 'Comprehensive department overview and highlights PDF' },
      { title: 'Department at a Glimpse (Video)', url: 'https://www.youtube.com/watch?v=hVTT5Po8vzA', description: 'Official YouTube video tour of the Civil Engineering Department' },
      { title: 'Download Forms Portal', url: 'https://www.civil.iitb.ac.in/download_forms/index.html', description: 'Academic, leave, and administrative forms for students' },
      { title: 'Civil Webmail', url: 'https://www.civil.iitb.ac.in/cemail/', description: 'Departmental email portal for faculty and staff' },
      { title: 'Profile Master Login', url: 'https://www.civil.iitb.ac.in/faculty-master', description: 'Faculty and researcher internal management system' },
    ],
  },
  {
    category: 'Student Bodies & Festivals',
    icon: '🎉',
    links: [
      { title: 'CEA — Civil Engineering Association', url: 'https://www.civil.iitb.ac.in/cea/', description: 'Official student body representing CE students at IIT Bombay' },
      { title: 'AAKAAR IIT Bombay', url: 'https://aakaariitbombay.org/', description: 'Asia\'s Largest Civil Engineering Technical Festival' },
      { title: 'Civil DAMP Mentorship Program', url: '/', description: 'Peer mentorship ecosystem guiding undergraduate students' },
    ],
  },
  {
    category: 'Academic & Institute Portals',
    icon: '📚',
    links: [
      { title: 'ASC Portal (Timetable & Registration)', url: 'https://asc.iitb.ac.in/', description: 'Official IIT Bombay academic schedule, grades, and registrations' },
      { title: 'IIT Bombay Main Website', url: 'https://www.iitb.ac.in/', description: 'Indian Institute of Technology Bombay official homepage' },
      { title: 'Central Library — IIT Bombay', url: 'https://www.library.iitb.ac.in/', description: 'Access to IEEE, ASCE, Elsevier, Springer journals and e-books' },
      { title: 'Students\' Gymkhana', url: 'https://gymkhana.iitb.ac.in/', description: 'Campus cultural, sports, and technical council activities' },
    ],
  },
  {
    category: 'Placements, Internships & Exchange',
    icon: '💼',
    links: [
      { title: 'Placement Cell — IIT Bombay', url: 'https://placements.iitb.ac.in/', description: 'Official placement and internship drive portal' },
      { title: 'IRCC — International Relations Office', url: 'https://www.iitb.ac.in/ircc/', description: 'Semester exchange programs and foreign research opportunities' },
      { title: 'Student Alumni Connect (SAC)', url: 'https://sac.iitb.ac.in/', description: 'IIT Bombay alumni mentorship and networking network' },
      { title: 'DAAD Scholarships (Germany)', url: 'https://www.daad.de/en/', description: 'Funding for summer research internships in Germany' },
    ],
  },
];

// ===================== ACADEMIC RESOURCES =====================
export const academicResources = [
  ...realAcademicResources,
  {
    category: 'Standard Reference Books & Codes',
    description: 'Essential Indian Standards and core civil reference materials',
    items: [
      { title: 'IS 456:2000 - Plain and Reinforced Concrete Code', type: 'PDF', size: '2.8 MB', link: 'https://archive.org/details/gov.in.is.456.2000', isExternal: true },
      { title: 'IS 800:2007 - General Construction in Steel Code', type: 'PDF', size: '3.4 MB', link: 'https://archive.org/details/gov.in.is.800.2007', isExternal: true },
      { title: 'IRC 37:2018 - Guidelines for Design of Flexible Pavements', type: 'PDF', size: '4.1 MB', link: 'https://archive.org/details/gov.in.is.irc.37.2018', isExternal: true },
    ],
  },
];

