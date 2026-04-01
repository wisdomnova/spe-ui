/* ------------------------------------------------------------------ */
/*  Career Compass - Role & Salary Data                                */
/*  All salary figures in Nigerian Naira (annual, estimated ranges)     */
/*  Sources: Glassdoor Nigeria, Jobberman, industry reports 2024-2025  */
/*  Update this file as better data becomes available.                  */
/* ------------------------------------------------------------------ */

export interface CareerRole {
  id: string;
  title: string;
  sector: Sector;
  description: string;
  dayToDay: string[];
  salary: { entry: [number, number]; mid: [number, number]; senior: [number, number] };
  skills: string[];
  certifications: string[];
  uiCourses: string[];
  growthPath: string;
}

export type Sector =
  | "Upstream"
  | "Midstream"
  | "Downstream"
  | "Energy Transition"
  | "Consulting"
  | "Academia";

export const SECTORS: { id: Sector; color: string; bgColor: string; description: string }[] = [
  { id: "Upstream", color: "text-blue-600", bgColor: "bg-blue-50 border-blue-100", description: "Exploration and production of crude oil and natural gas" },
  { id: "Midstream", color: "text-amber-600", bgColor: "bg-amber-50 border-amber-100", description: "Transportation, storage, and wholesale marketing of petroleum" },
  { id: "Downstream", color: "text-green-600", bgColor: "bg-green-50 border-green-100", description: "Refining, distribution, and retail of petroleum products" },
  { id: "Energy Transition", color: "text-purple-600", bgColor: "bg-purple-50 border-purple-100", description: "Renewable energy, carbon capture, and sustainable solutions" },
  { id: "Consulting", color: "text-rose-600", bgColor: "bg-rose-50 border-rose-100", description: "Technical advisory, strategy, and specialized engineering services" },
  { id: "Academia", color: "text-teal-600", bgColor: "bg-teal-50 border-teal-100", description: "Research, teaching, and knowledge advancement" },
];

export const CAREER_ROLES: CareerRole[] = [
  // ── Upstream ──────────────────────────────────────────
  {
    id: "reservoir-engineer",
    title: "Reservoir Engineer",
    sector: "Upstream",
    description: "Optimizes hydrocarbon recovery by analyzing reservoir behavior, building simulation models, and recommending depletion strategies.",
    dayToDay: [
      "Build and update reservoir simulation models",
      "Analyze PVT data and well test results",
      "Forecast production and estimate reserves",
      "Recommend enhanced oil recovery (EOR) strategies",
    ],
    salary: { entry: [6_000_000, 12_000_000], mid: [15_000_000, 35_000_000], senior: [40_000_000, 80_000_000] },
    skills: ["Reservoir simulation (Eclipse, CMG)", "Well test analysis", "PVT analysis", "Material balance", "Decline curve analysis", "Python/MATLAB"],
    certifications: ["SPE Membership", "PetroSkills Reservoir Engineering"],
    uiCourses: ["PET 301 - Reservoir Engineering I", "PET 401 - Reservoir Engineering II", "PET 501 - Advanced Reservoir Simulation"],
    growthPath: "Reservoir Engineer -> Senior Reservoir Engineer -> Subsurface Team Lead -> Asset Manager -> VP Subsurface",
  },
  {
    id: "drilling-engineer",
    title: "Drilling Engineer",
    sector: "Upstream",
    description: "Plans and supervises drilling operations to safely and efficiently reach target formations while minimizing costs.",
    dayToDay: [
      "Design well trajectories and casing programs",
      "Select drilling fluids and bits",
      "Monitor real-time drilling parameters",
      "Troubleshoot downhole problems (stuck pipe, kicks)",
    ],
    salary: { entry: [7_000_000, 14_000_000], mid: [18_000_000, 40_000_000], senior: [45_000_000, 90_000_000] },
    skills: ["Well planning software (Landmark, Petrel)", "Drilling fluid engineering", "Torque & drag modeling", "Casing design", "Well control"],
    certifications: ["IWCF Well Control", "SPE Drilling Engineer"],
    uiCourses: ["PET 302 - Drilling Engineering I", "PET 402 - Drilling Engineering II", "PET 304 - Drilling Fluids"],
    growthPath: "Drilling Engineer -> Senior Drilling Engineer -> Drilling Superintendent -> Wells Manager -> VP Wells",
  },
  {
    id: "production-engineer",
    title: "Production Engineer",
    sector: "Upstream",
    description: "Maximizes well productivity through completion design, artificial lift optimization, and production surveillance.",
    dayToDay: [
      "Design completions and stimulation programs",
      "Optimize artificial lift systems (ESP, gas lift, rod pump)",
      "Analyze production data and identify issues",
      "Coordinate workovers and well interventions",
    ],
    salary: { entry: [6_000_000, 11_000_000], mid: [14_000_000, 30_000_000], senior: [35_000_000, 70_000_000] },
    skills: ["NODAL analysis", "Artificial lift design", "Production logging", "Sand control", "Completion design"],
    certifications: ["SPE Production & Operations", "API Certifications"],
    uiCourses: ["PET 303 - Production Engineering I", "PET 403 - Production Engineering II", "PET 305 - Well Completions"],
    growthPath: "Production Engineer -> Senior Production Engineer -> Production Team Lead -> Field Manager -> VP Operations",
  },
  {
    id: "petrophysicist",
    title: "Petrophysicist",
    sector: "Upstream",
    description: "Interprets well logs and core data to evaluate rock and fluid properties for reservoir characterization.",
    dayToDay: [
      "Interpret wireline and LWD logs",
      "Calculate porosity, permeability, and water saturation",
      "Integrate log data with seismic and core data",
      "Build petrophysical models for reservoir simulation",
    ],
    salary: { entry: [6_000_000, 12_000_000], mid: [15_000_000, 35_000_000], senior: [40_000_000, 75_000_000] },
    skills: ["Log interpretation (Techlog, IP)", "Core analysis", "Formation evaluation", "Rock physics", "Statistical analysis"],
    certifications: ["SPWLA Membership", "Schlumberger Petrel Certification"],
    uiCourses: ["PET 306 - Formation Evaluation", "PET 406 - Advanced Petrophysics", "GEO 301 - Geology for Engineers"],
    growthPath: "Petrophysicist -> Senior Petrophysicist -> Subsurface Team Lead -> Chief Petrophysicist",
  },
  {
    id: "geoscientist",
    title: "Exploration Geoscientist",
    sector: "Upstream",
    description: "Uses seismic data, geological mapping, and basin analysis to identify and evaluate potential hydrocarbon prospects.",
    dayToDay: [
      "Interpret 2D/3D seismic data",
      "Map geological structures and stratigraphic features",
      "Estimate prospect volumes and risk",
      "Present recommendations to management for drilling decisions",
    ],
    salary: { entry: [5_000_000, 10_000_000], mid: [13_000_000, 28_000_000], senior: [35_000_000, 65_000_000] },
    skills: ["Seismic interpretation (Petrel, Kingdom)", "Structural geology", "Basin modeling", "AVO analysis", "Prospect evaluation"],
    certifications: ["AAPG Membership", "SEG Certifications"],
    uiCourses: ["GEO 301 - Geology for Engineers", "GEO 401 - Petroleum Geology", "PET 502 - Integrated Reservoir Studies"],
    growthPath: "Geoscientist -> Senior Geoscientist -> Exploration Manager -> VP Exploration",
  },
  // ── Midstream ──────────────────────────────────────────
  {
    id: "pipeline-engineer",
    title: "Pipeline Engineer",
    sector: "Midstream",
    description: "Designs, constructs, and maintains pipeline systems for transporting oil, gas, and refined products.",
    dayToDay: [
      "Design pipeline routes and specifications",
      "Perform hydraulic and stress analysis",
      "Ensure pipeline integrity and compliance",
      "Coordinate construction and commissioning activities",
    ],
    salary: { entry: [5_000_000, 10_000_000], mid: [12_000_000, 25_000_000], senior: [30_000_000, 55_000_000] },
    skills: ["Pipeline hydraulics (PIPESIM, OLGA)", "Structural analysis", "Cathodic protection", "ASME/API codes", "GIS mapping"],
    certifications: ["API 1169 Pipeline Inspector", "ASME B31.4/B31.8"],
    uiCourses: ["PET 404 - Natural Gas Engineering", "CHE 301 - Fluid Mechanics", "PET 307 - Petroleum Processing"],
    growthPath: "Pipeline Engineer -> Senior Pipeline Engineer -> Pipeline Integrity Manager -> Midstream Director",
  },
  {
    id: "gas-processing-engineer",
    title: "Gas Processing Engineer",
    sector: "Midstream",
    description: "Operates and optimizes natural gas processing plants that remove impurities and separate NGLs from raw gas.",
    dayToDay: [
      "Monitor and optimize plant operations",
      "Conduct process simulations (HYSYS, Aspen)",
      "Manage dehydration and sweetening units",
      "Troubleshoot process upsets",
    ],
    salary: { entry: [5_000_000, 9_000_000], mid: [11_000_000, 22_000_000], senior: [28_000_000, 50_000_000] },
    skills: ["Process simulation (HYSYS)", "Gas dehydration", "Amine sweetening", "NGL fractionation", "Process safety"],
    certifications: ["GPSA Engineering Data Book Certified", "Process Safety Management"],
    uiCourses: ["PET 404 - Natural Gas Engineering", "CHE 302 - Chemical Engineering Thermodynamics", "PET 307 - Petroleum Processing"],
    growthPath: "Process Engineer -> Senior Process Engineer -> Plant Manager -> Operations Director",
  },
  // ── Downstream ──────────────────────────────────────────
  {
    id: "refinery-process-engineer",
    title: "Refinery Process Engineer",
    sector: "Downstream",
    description: "Optimizes refinery unit operations to maximize product yield, quality, and energy efficiency.",
    dayToDay: [
      "Monitor distillation, cracking, and reforming units",
      "Optimize throughput and product quality",
      "Conduct heat and mass balance calculations",
      "Lead turnaround planning and process improvement projects",
    ],
    salary: { entry: [5_000_000, 9_000_000], mid: [11_000_000, 22_000_000], senior: [28_000_000, 48_000_000] },
    skills: ["Refinery process simulation", "Distillation optimization", "Heat exchanger design", "Catalyst management", "Process P&ID reading"],
    certifications: ["API Process Safety", "Six Sigma Green/Black Belt"],
    uiCourses: ["PET 307 - Petroleum Processing", "CHE 302 - Chemical Engineering Thermodynamics", "CHE 401 - Process Design"],
    growthPath: "Process Engineer -> Senior Process Engineer -> Unit Manager -> Refinery Manager",
  },
  {
    id: "petroleum-economist",
    title: "Petroleum Economist",
    sector: "Downstream",
    description: "Evaluates the economic viability of oil and gas projects through financial modeling and risk assessment.",
    dayToDay: [
      "Build discounted cash flow (DCF) models for E&P projects",
      "Assess project economics (NPV, IRR, payback period)",
      "Analyze oil price scenarios and their impact on profitability",
      "Support investment decisions with data-driven recommendations",
    ],
    salary: { entry: [5_000_000, 10_000_000], mid: [12_000_000, 28_000_000], senior: [32_000_000, 60_000_000] },
    skills: ["Financial modeling (Excel, @Risk)", "Petroleum fiscal regimes", "Risk analysis (Monte Carlo)", "Production forecasting", "Economics software (ARIES, PHDWin)"],
    certifications: ["SPE Petroleum Economics", "CFA (advantageous)"],
    uiCourses: ["PET 405 - Petroleum Economics & Evaluation", "PET 503 - Risk Analysis in Petroleum Projects"],
    growthPath: "Economist -> Senior Economist -> Commercial Manager -> VP Commercial",
  },
  {
    id: "hse-engineer",
    title: "HSE Engineer",
    sector: "Downstream",
    description: "Ensures health, safety, and environmental compliance across oil and gas operations.",
    dayToDay: [
      "Conduct risk assessments and incident investigations",
      "Develop and implement safety management systems",
      "Monitor environmental compliance and emissions",
      "Lead safety drills and training programs",
    ],
    salary: { entry: [4_000_000, 8_000_000], mid: [10_000_000, 20_000_000], senior: [25_000_000, 45_000_000] },
    skills: ["HAZOP/HAZID facilitation", "Risk assessment (bow-tie, LOPA)", "ISO 14001/45001", "Incident investigation", "Emergency response planning"],
    certifications: ["NEBOSH International", "IOSH Managing Safely", "ISO 45001 Lead Auditor"],
    uiCourses: ["PET 308 - Health, Safety & Environment", "CHE 403 - Process Safety Engineering"],
    growthPath: "HSE Engineer -> Senior HSE Advisor -> HSE Manager -> VP HSSE",
  },
  // ── Energy Transition ──────────────────────────────────
  {
    id: "ccus-engineer",
    title: "CCUS Engineer",
    sector: "Energy Transition",
    description: "Designs and operates carbon capture, utilization, and storage (CCUS) systems to reduce industrial CO2 emissions.",
    dayToDay: [
      "Design CO2 capture systems for industrial facilities",
      "Model CO2 injection and storage in geological formations",
      "Assess storage site integrity and monitoring strategies",
      "Evaluate CCUS project economics and carbon credit potential",
    ],
    salary: { entry: [6_000_000, 12_000_000], mid: [15_000_000, 30_000_000], senior: [35_000_000, 65_000_000] },
    skills: ["Reservoir simulation for CO2 storage", "Process engineering", "Geomechanics", "Carbon accounting", "Project economics"],
    certifications: ["GCCSI CCUS Certification", "SPE Carbon Management"],
    uiCourses: ["PET 301 - Reservoir Engineering I", "PET 504 - Enhanced Oil Recovery", "CHE 302 - Thermodynamics"],
    growthPath: "CCUS Engineer -> Senior CCUS Engineer -> CCS Project Manager -> Head of Low Carbon Solutions",
  },
  {
    id: "renewable-energy-engineer",
    title: "Renewable Energy Engineer",
    sector: "Energy Transition",
    description: "Designs and implements renewable energy systems including solar, wind, and hybrid solutions for the energy sector.",
    dayToDay: [
      "Design solar PV and wind power systems",
      "Conduct site assessments and feasibility studies",
      "Model energy generation and storage solutions",
      "Integrate renewables with existing power infrastructure",
    ],
    salary: { entry: [4_000_000, 8_000_000], mid: [10_000_000, 22_000_000], senior: [28_000_000, 50_000_000] },
    skills: ["Solar PV design (PVsyst)", "Wind resource assessment", "Energy storage systems", "Power systems modeling", "Project management"],
    certifications: ["NABCEP Solar PV Installer", "Global Wind Organization (GWO)"],
    uiCourses: ["EEE 301 - Power Systems", "PET 505 - Energy Systems & Sustainability"],
    growthPath: "Renewable Engineer -> Project Lead -> Renewables Manager -> Head of New Energy",
  },
  {
    id: "energy-data-analyst",
    title: "Energy Data Analyst",
    sector: "Energy Transition",
    description: "Uses data science techniques to optimize energy operations, predict production, and drive digital transformation in the energy sector.",
    dayToDay: [
      "Build machine learning models for production optimization",
      "Analyze large datasets from SCADA and IoT sensors",
      "Develop dashboards for operational intelligence",
      "Automate reporting and data pipelines",
    ],
    salary: { entry: [5_000_000, 10_000_000], mid: [12_000_000, 25_000_000], senior: [30_000_000, 55_000_000] },
    skills: ["Python (pandas, scikit-learn)", "SQL & databases", "Power BI / Tableau", "Machine learning", "Cloud platforms (AWS, Azure)"],
    certifications: ["Google Data Analytics Certificate", "AWS Cloud Practitioner"],
    uiCourses: ["CSC 301 - Data Structures", "PET 506 - Digital Oilfield Technologies", "STA 301 - Statistics"],
    growthPath: "Data Analyst -> Senior Data Scientist -> Digital Transformation Lead -> CDO",
  },
  // ── Consulting ──────────────────────────────────────────
  {
    id: "reservoir-consultant",
    title: "Reservoir Consultant",
    sector: "Consulting",
    description: "Provides independent technical expertise on reservoir management, reserves estimation, and field development planning.",
    dayToDay: [
      "Conduct independent reserves audits (SEC/PRMS compliant)",
      "Review client field development plans",
      "Build integrated asset models for multiple clients",
      "Present findings and recommendations to boards and regulators",
    ],
    salary: { entry: [8_000_000, 15_000_000], mid: [20_000_000, 40_000_000], senior: [50_000_000, 100_000_000] },
    skills: ["Reserves estimation (PRMS)", "Integrated modeling", "Client management", "Technical writing", "Regulatory frameworks (DPR/NUPRC)"],
    certifications: ["SPE Petroleum Reserves & Resources", "Chartered Engineer (CEng)"],
    uiCourses: ["PET 401 - Reservoir Engineering II", "PET 405 - Petroleum Economics", "PET 502 - Integrated Reservoir Studies"],
    growthPath: "Junior Consultant -> Senior Consultant -> Principal Consultant -> Managing Director",
  },
  {
    id: "technical-sales-engineer",
    title: "Technical Sales Engineer",
    sector: "Consulting",
    description: "Bridges the gap between oilfield service companies and operators by selling technical solutions tailored to client needs.",
    dayToDay: [
      "Present technical solutions to E&P companies",
      "Prepare proposals and commercial bids",
      "Coordinate with product lines to deliver solutions",
      "Build and maintain client relationships",
    ],
    salary: { entry: [5_000_000, 10_000_000], mid: [12_000_000, 25_000_000], senior: [30_000_000, 60_000_000] },
    skills: ["Technical presentation", "Oilfield product knowledge", "Commercial negotiation", "CRM software", "Relationship management"],
    certifications: ["Schlumberger/Halliburton/Baker Hughes product certifications"],
    uiCourses: ["PET 302 - Drilling Engineering I", "PET 303 - Production Engineering I", "MGT 301 - Business Management"],
    growthPath: "Field Engineer -> Technical Sales -> Regional Sales Manager -> Commercial Director",
  },
  {
    id: "project-management-engineer",
    title: "Project Management Engineer",
    sector: "Consulting",
    description: "Manages large-scale E&P projects from concept to commissioning, controlling scope, cost, schedule, and quality.",
    dayToDay: [
      "Develop project execution plans and budgets",
      "Coordinate multidisciplinary teams (engineering, procurement, construction)",
      "Track project milestones and manage risks",
      "Report to stakeholders and manage change orders",
    ],
    salary: { entry: [5_000_000, 10_000_000], mid: [13_000_000, 28_000_000], senior: [35_000_000, 65_000_000] },
    skills: ["Project planning (Primavera, MS Project)", "Cost estimation", "Risk management", "Contract management", "Stakeholder communication"],
    certifications: ["PMP (Project Management Professional)", "PRINCE2"],
    uiCourses: ["PET 405 - Petroleum Economics", "MGT 301 - Business Management", "PET 308 - HSE"],
    growthPath: "Project Engineer -> Project Manager -> Senior PM -> Director of Projects -> VP Projects",
  },
  // ── Academia ──────────────────────────────────────────
  {
    id: "petroleum-lecturer",
    title: "Petroleum Engineering Lecturer",
    sector: "Academia",
    description: "Teaches petroleum engineering courses, supervises student research, and contributes to knowledge advancement through publications.",
    dayToDay: [
      "Deliver lectures and design course materials",
      "Supervise undergraduate and postgraduate research",
      "Publish in peer-reviewed journals (SPE, JPT)",
      "Secure research grants and lead projects",
    ],
    salary: { entry: [3_500_000, 6_000_000], mid: [7_000_000, 14_000_000], senior: [15_000_000, 25_000_000] },
    skills: ["Deep technical expertise in specialization", "Research methodology", "Academic writing and publishing", "Grant writing", "Student mentorship"],
    certifications: ["PhD in Petroleum/Chemical Engineering", "COREN Registration"],
    uiCourses: ["All core PET courses as foundation", "Graduate-level research electives"],
    growthPath: "Graduate Assistant -> Lecturer II -> Lecturer I -> Senior Lecturer -> Reader -> Professor",
  },
  {
    id: "research-scientist",
    title: "Research Scientist (Energy)",
    sector: "Academia",
    description: "Conducts cutting-edge research in petroleum engineering, materials science, or energy systems at universities or research institutes.",
    dayToDay: [
      "Design and execute laboratory experiments",
      "Develop computational models and simulations",
      "Collaborate with industry on applied research projects",
      "Present findings at conferences (SPE ATCE, NAICE)",
    ],
    salary: { entry: [3_000_000, 5_000_000], mid: [6_000_000, 12_000_000], senior: [14_000_000, 22_000_000] },
    skills: ["Experimental design", "Data analysis (R, Python, MATLAB)", "Technical writing", "Laboratory techniques", "Simulation software"],
    certifications: ["MSc/PhD in relevant field", "Journal publications track record"],
    uiCourses: ["PET 501 - Advanced Reservoir Simulation", "PET 502 - Integrated Reservoir Studies", "Research Methods"],
    growthPath: "Research Assistant -> Research Fellow -> Senior Research Fellow -> Principal Scientist -> Research Director",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
export function formatNaira(amount: number): string {
  if (amount >= 1_000_000) {
    return "N" + (amount / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  return "N" + amount.toLocaleString();
}

export function getSectorColor(sector: Sector): string {
  return SECTORS.find(s => s.id === sector)?.color || "text-gray-600";
}

export function getSectorBg(sector: Sector): string {
  return SECTORS.find(s => s.id === sector)?.bgColor || "bg-gray-50 border-gray-100";
}
