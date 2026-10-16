/*
  SynWeb site data. Edit this file to update dates, links, schedule, committee and papers.
  Every page reads from here, so each change is made once.

  Dates use ISO format "YYYY-MM-DD". Use null for "to be announced".
  Paper deadlines are treated as 23:59 Anywhere on Earth (UTC-12).
*/
window.SYNWEB = {
  contactEmail: "sabdaljalil@tamu.edu",

  // OpenReview (or other) submission link. Leave "" until the portal is open.
  submissionUrl: "",

  conferenceUrl: "https://www2027.thewebconf.org/",
  acmTemplateUrl: "https://www.acm.org/publications/proceedings-template",

  // Short announcement shown at the top of the home page. Use "" to hide.
  announcement: "SynWeb has been accepted as a workshop at TheWebConf 2027. The call for papers is open.",

  dates: [
    { label: "Paper submission deadline", date: null },
    { label: "Author notification",       date: null },
    { label: "Camera-ready deadline",     date: null },
    { label: "Workshop day",              date: null, event: true,
      note: "Half-day session at TheWebConf 2027, Dublin, Ireland" }
  ],

  // Local time in Dublin during the conference is Irish Standard Time (UTC+1).
  workshopTimezone: "IST, UTC+1",

  // Tentative half-day program. Edit times and titles once slots are assigned.
  program: [
    { time: "10:00 to 10:10", title: "Welcome, motivation, and workshop goals" },
    { time: "10:10 to 11:00", title: "Research Session I: Synthetic web data generation, quality, and reliability" },
    { time: "11:00 to 11:30", title: "Research Session II: Short research presentations and emerging directions" },
    { time: "11:30 to 11:45", title: "Coffee break", isBreak: true },
    { time: "11:45 to 12:15", title: "Lightning talks: datasets, tools, and demonstrations" },
    { time: "12:15 to 12:55", title: "Interactive benchmark and evaluation design session" },
    { time: "12:55 to 13:20", title: "Open discussion: provenance, risks, and research priorities for synthetic web data" },
    { time: "13:20 to 13:30", title: "Synthesis, community roadmap, and closing" }
  ],

  // Accepted papers. Example entry:
  // { title: "Paper title", authors: "A. Author, B. Author", type: "Research paper",
  //   session: "Research Session I", pdf: "https://openreview.net/forum?id=..." }
  papers: [],

  // Program committee. Only entries with confirmed: true are shown on the site.
  pc: [
    { name: "Can Polat", affiliation: "Texas A&M University, USA", confirmed: true },
    { name: "Parichit Sharma", affiliation: "University of Maryland, USA", confirmed: true },
    { name: "Mert Onur Cakiroglu", affiliation: "Indiana University Bloomington, USA", confirmed: true },
    { name: "Rasul Khanbayov", affiliation: "Hamad Bin Khalifa University, Qatar", confirmed: true },
    { name: "Idil Bilge Altun", affiliation: "Indiana University Bloomington, USA", confirmed: true },
    { name: "Mustafa Kurban", affiliation: "Ankara University, Türkiye", confirmed: true },
    { name: "Firoj Alam", affiliation: "Qatar Computing Research Institute, Qatar", confirmed: true },
    { name: "Mustafa Jarrar", affiliation: "Qatar Computing Research Institute, Qatar", confirmed: false },
    { name: "Huiping Chen", affiliation: "University of Birmingham, UK", confirmed: false },
    { name: "Benjamin Jacobsen", affiliation: "University of York, UK", confirmed: false },
    { name: "Manel Slokom", affiliation: "CWI, Netherlands", confirmed: false },
    { name: "Mehmet Tuncel", affiliation: "Istanbul Technical University, Türkiye", confirmed: false },
    { name: "Jian Jin", affiliation: "Hamad Bin Khalifa University, Qatar", confirmed: false },
    { name: "Anisa Rula", affiliation: "University of Brescia, Italy", confirmed: false },
    { name: "Sikha Pentyala", affiliation: "University of Washington Tacoma, USA", confirmed: false }
  ]
};
