import { connectDb } from "./db.mjs";

const PORTFOLIO = [
  { src: "/images/DISTINGUISHED%20PERSONALITIES/773183475_18003584951976647_9000418675402898133_n.jpg", category: "distinguished" },
  { src: "/images/DISTINGUISHED%20PERSONALITIES/731058990_17996813630976647_2500874218625038499_n.jpg", category: "distinguished" },
  { src: "/images/DISTINGUISHED%20PERSONALITIES/728226015_17995881590976647_6915420324737538279_n.jpg", category: "distinguished" },
  { src: "/images/DISTINGUISHED%20PERSONALITIES/700927965_17990456933976647_9085498740804261657_n.jpg", category: "distinguished" },
  { src: "/images/DISTINGUISHED%20PERSONALITIES/701480525_17990314994976647_6702508317479498259_n.jpg", category: "distinguished" },
  { src: "/images/DISTINGUISHED%20PERSONALITIES/658912534_17983357403976647_1311052607922962432_n.jpg", category: "distinguished" },
  { src: "/images/DISTINGUISHED%20PERSONALITIES/657294593_17983300424976647_8897700467822790328_n.jpg", category: "distinguished" },
  { src: "/images/DISTINGUISHED%20PERSONALITIES/657933458_17983644296976647_1808061565692815084_n.jpg", category: "distinguished" },
  { src: "/images/DISTINGUISHED%20PERSONALITIES/656749797_17983579529976647_4448415742232967921_n.jpg", category: "distinguished" },
  { src: "/images/DISTINGUISHED%20PERSONALITIES/656697006_17983589126976647_6224741079110277700_n.jpg", category: "distinguished" },
  { src: "/images/DISTINGUISHED%20PERSONALITIES/656779240_17983577960976647_803851025512828360_n.jpg", category: "distinguished" },
  { src: "/images/DISTINGUISHED%20PERSONALITIES/656605038_17983530602976647_5635407978525059783_n.jpg", category: "distinguished" },
  { src: "/images/DISTINGUISHED%20PERSONALITIES/656179648_17983530044976647_7276940643609626946_n.jpg", category: "distinguished" },
  { src: "/images/DISTINGUISHED%20PERSONALITIES/656788932_17983337492976647_4588445852736754145_n.jpg", category: "distinguished" },
  { src: "/images/DISTINGUISHED%20PERSONALITIES/658146080_17983579106976647_6339761768212488224_n.jpg", category: "distinguished" },
  { src: "/images/DISTINGUISHED%20PERSONALITIES/657331030_17983422320976647_6312776095443602490_n.jpg", category: "distinguished" },
  { src: "/images/TRAVEL%20%26%20ADVENTURE/726758649_17994978683976647_1782722879211471899_n.jpg", category: "travel" },
  { src: "/images/TRAVEL%20%26%20ADVENTURE/725838338_17994978656976647_5797025979349924269_n.jpg", category: "travel" },
  { src: "/images/TRAVEL%20%26%20ADVENTURE/708715268_17992101821976647_2336239473878652875_n.jpg", category: "travel" },
  { src: "/images/TRAVEL%20%26%20ADVENTURE/706733975_17991807932976647_5877853629483037639_n.jpg", category: "travel" },
  { src: "/images/TRAVEL%20%26%20ADVENTURE/698324910_17989675469976647_2645207370473847840_n.jpg", category: "travel" },
  { src: "/images/TRAVEL%20%26%20ADVENTURE/694150529_17989803188976647_162402531827969174_n.jpg", category: "travel" },
  { src: "/images/TRAVEL%20%26%20ADVENTURE/688606602_17989668950976647_7735390923436642496_n.jpg", category: "travel" },
  { src: "/images/TRAVEL%20%26%20ADVENTURE/657737655_17983588667976647_2202782058881974177_n.jpg", category: "travel" },
  { src: "/images/TEAM/706473987_17991709445976647_2222518291370409520_n.jpg", category: "team" },
  { src: "/images/TEAM/689523869_17989670198976647_4277370298526968262_n.jpg", category: "team" },
  { src: "/images/TEAM/657607747_17983645895976647_2536671168045853121_n.jpg", category: "team" },
  { src: "/images/Sports/657625661_17983639586976647_305302031067389097_n.jpg", category: "sports" },
  { src: "/images/Sports/657612357_17983294712976647_4061871797618123626_n.jpg", category: "sports" },
  { src: "/images/Sports/655852397_17983382774976647_1141915102822669881_n.jpg", category: "sports" },
  { src: "/images/Personal/659092962_17983647128976647_7095962795408633559_n.jpg", category: "personal" },
  { src: "/images/Personal/658981703_17983644395976647_8178421621265785308_n.jpg", category: "personal" },
  { src: "/images/Personal/657053358_17983647377976647_3991154338766336487_n.jpg", category: "personal" },
  { src: "/images/Personal/785943831_18005975300976647_6582758928697910577_n.jpg", category: "personal" },
  { src: "/images/Personal/751335776_17999794772976647_4326556236583399934_n.jpg", category: "personal" },
  { src: "/images/Personal/731808330_17997273098976647_7602967968953208447_n.jpg", category: "personal" },
  { src: "/images/Personal/725518652_17994963812976647_6375784195393731370_n.jpg", category: "personal" },
  { src: "/images/Personal/711209762_17992103555976647_5960367477054404864_n.jpg", category: "personal" },
  { src: "/images/Personal/707561420_17991708050976647_8384580629681742274_n.jpg", category: "personal" },
  { src: "/images/Personal/707378177_17992103564976647_7793417630605698761_n.jpg", category: "personal" },
];

const EXPERIENCE = [
  {
    icon: "fa-graduation-cap",
    title: "Accessible Digital Education",
    description:
      "Make technology and digital education accessible to everyone, regardless of their financial or social background.",
    date: "Access for All",
    color: "cyan",
    image: "/images/TEAM/08f9c883-6082-4aa0-aa15-a4b78a2d3f4a.JPG",
  },
  {
    icon: "fa-handshake",
    title: "Training & Partnerships",
    description:
      "Free and affordable IT training, partnerships with educational institutions and organizations, and practical skill-development programs.",
    date: "Hands-On Learning",
    color: "yellow",
    image: "/images/TEAM/05c76aef-211a-4fe1-b120-a4e055f0b54c.JPG",
  },
  {
    icon: "fa-people-group",
    title: "Community Empowerment",
    description:
      "Equip students, youth, women, workers, and underserved communities with skills that lead to real opportunities.",
    date: "Impact for All",
    color: "green",
    image: "/images/Personal/01c1f46d-c28f-416d-9d52-a3aae4265ef4.JPG",
  },
  {
    icon: "fa-chart-line",
    title: "Sustainable Livelihoods",
    description:
      "Turn digital skills into employment, freelancing, entrepreneurship, and sustainable income opportunities.",
    date: "Build the Future",
    color: "blue",
    image: "/images/Personal/5c911710-9cc6-48dd-8c4c-b2165f9c9753.JPG",
  },
];

const SKILLS = [
  { icon: "fa-html5", name: "HTML5", target: 84 },
  { icon: "fa-css3-alt", name: "CSS3", target: 95 },
  { icon: "fa-code", name: "JQuery", target: 65 },
  { icon: "fa-php", name: "PHP", target: 89 },
];

const AWARDS = [
  { date: "2025 - 2026", title: "Empowering 10,000 Youth", description: "Bring industry-relevant digital skills and freelancing opportunities to 10,000 students and youth, helping them start sustainable careers in the digital economy.", image: "/images/TEAM/706473987_17991709445976647_2222518291370409520_n.jpg" },
  { date: "2026 - 2028", title: "Women in Digital Leadership", description: "Scale women empowerment programs with dedicated training, mentorship, and funding access so women can lead their own online businesses and careers.", image: "/images/Personal/725518652_17994963812976647_6375784195393731370_n.jpg" },
  { date: "2028 - 2030", title: "National Digital Inclusion", description: "Take digital literacy and employment generation to every community — bridging the digital divide and creating equal opportunity for workers everywhere.", image: "/images/TRAVEL%20%26%20ADVENTURE/706733975_17991807932976647_5877853629483037639_n.jpg" },
  { date: "2030 - Beyond", title: "A Sustainable Digital Economy", description: "Build a self-sustaining ecosystem where entrepreneurship, innovation, and technology create lasting livelihoods for the next generation.", image: "/images/Sports/657625661_17983639586976647_305302031067389097_n.jpg" },
];

const COMMUNITY = [
  { icon: "fa-graduation-cap", title: "Digital Skills Training", description: "Hands-on programs helping students and youth gain industry-relevant digital skills for the modern economy." },
  { icon: "fa-users", title: "Youth & Women Empowerment", description: "Mentorship and resources that equip youth and women with the confidence and tools to build sustainable careers." },
  { icon: "fa-laptop-code", title: "Freelancing Opportunities", description: "Pathways into online work and freelancing, creating employment generation and digital inclusion for all." },
];

const TESTIMONIALS = [
  { text: "Binary Hub gave me the digital skills and confidence to start freelancing. The mentorship changed my career path completely.", name: "Amina Khan", role: "Freelance Designer", avatar: "/images/Personal/657053358_17983647377976647_3991154338766336487_n.jpg" },
  { text: "Thanks to the training programs, I found a sustainable remote job. The community support here is truly unmatched.", name: "Usman Ali", role: "Remote Developer", avatar: "/images/Personal/785943831_18005975300976647_6582758928697910577_n.jpg" },
  { text: "As a woman entrepreneur, the empowerment programs gave me the tools to build my own online business from home.", name: "Fatima Noor", role: "Entrepreneur", avatar: "/images/Personal/731808330_17997273098976647_7602967968953208447_n.jpg" },
];

export { AWARDS, EXPERIENCE, COMMUNITY, TESTIMONIALS };

const SETTINGS = {
  heroName: "TAHSEEN ABBAS",
  heroNameAccent: "ABBAS",
  heroSubtitle: "The next big idea is waiting for its next big changer with",
  heroSubtitleLink: "Themsbit",
  heroSubtitleUrl: "#",
  heroDesc: "I am experienced in leveraging agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.",
  contactText: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here.",
  address: "25, Dist town Street, Logn\nCalifornia, US",
  phone: "+92 317 0885816",
  email: "Fax: 800 123 3456\nEmail: info@themsbit.com",
  social: JSON.stringify({ instagram: "https://www.instagram.com/tashfeen460/?hl=en", linkedin: "https://www.linkedin.com/in/tashfeen-riaz-39b1a2396/", github: "https://github.com/tashfeen635-cmyk" }),
  profileImage: "/logo/tehseen-abbas.jpg",
  logoImage: "/logo/logo.png",
  brandText: "BINARY-HUB",
};

export async function seedDb() {
  await connectDb();
  const {
    PortfolioItem,
    Experience,
    Skill,
    Award,
    SiteSetting,
    Community,
    Testimonial,
  } = await import("./models.mjs");

  await PortfolioItem.deleteMany({});
  await Experience.deleteMany({});
  await Skill.deleteMany({});
  await Award.deleteMany({});
  await Community.deleteMany({});
  await Testimonial.deleteMany({});
  await SiteSetting.deleteMany({});

  const items = PORTFOLIO.map((item, i) => ({ ...item, sortOrder: i }));
  await PortfolioItem.insertMany(items);
  await Experience.insertMany(EXPERIENCE);
  await Skill.insertMany(SKILLS);
  await Award.insertMany(AWARDS);
  await Community.insertMany(COMMUNITY.map((c, i) => ({ ...c, sortOrder: i })));
  await Testimonial.insertMany(TESTIMONIALS.map((t, i) => ({ ...t, sortOrder: i })));
  await SiteSetting.insertMany(
    Object.entries(SETTINGS).map(([key, value]) => ({ key, value }))
  );
}
