import { HS_VIDEOS } from "./videos";
import type { PhaseInfo, Track, TrackModule, TrackResource } from "@/data/tracks/types";
import { findModule, videoPartsOf } from "@/data/tracks/helpers";

// ─────────────────────────────────────────────────────────────
// Longevity & Healthspan: the science of ageing better (11 modules)
// Built 2026-11-07 as a free alternative to a paid 4-hour workshop on the
// same topics (science of ageing, key markers and tests, supplements, a
// 90-day plan). Free expert videos only, split along their own chapters.
// Education, not medical advice: every Practice that touches labs, drugs
// or supplements says to check with a doctor.
// ─────────────────────────────────────────────────────────────

const parts = (key: keyof typeof HS_VIDEOS, idPrefix: string, which?: number[], note?: string): TrackResource[] =>
  videoPartsOf(HS_VIDEOS, key, idPrefix, which, note);

const yt = (id: string) => `https://www.youtube.com/watch?v=${id}`;

export const HS_PHASES: PhaseInfo[] = [
  { phase: "Foundations", color: "#0d9488", blurb: "Lifespan vs healthspan, and why we age." },
  { phase: "Measure", color: "#3b82f6", blurb: "The blood markers and fitness tests that predict how you'll age." },
  { phase: "Train", color: "#f59e0b", blurb: "Cardio, strength and stability: the strongest longevity tools we have." },
  { phase: "Fuel & recover", color: "#8b5cf6", blurb: "Protein for muscle at every age, and sleep." },
  { phase: "Supplements", color: "#ef4444", blurb: "What has real evidence, and what's hype." },
  { phase: "Capstone", color: "#10b981", blurb: "Your healthspan scorecard and 90-day plan." },
];

export const hsModules: TrackModule[] = [
  {
    id: 0,
    slug: "orientation",
    title: "Lifespan vs healthspan",
    phase: "Foundations",
    durationWeeks: [1, 1],
    durationLabel: "1 week",
    goal: "Understand the goal: not just living longer, but staying strong, sharp and independent in your last decade. Learn why prevention (\"Medicine 3.0\") is different from treating disease once it appears.",
    resources: [
      ...parts("medicine3", "hs0-med3"),
      ...parts("marginalDecade", "hs0-marg"),
      { id: "hs0-x1", type: "video", role: "extra", title: "Toward Medicine 3.0 (Outlive audiobook reading)", author: "Peter Attia", url: yt("G24uOGsG1gc") },
      { id: "hs0-x2", type: "video", role: "extra", title: "What is the marginal decade and the centenarian decathlon?", author: "Peter Attia", url: yt("qzDLvkE0cCw") },
      { id: "hs0-x3", type: "article", role: "extra", title: "WHO: physical activity fact sheet", url: "https://www.who.int/news-room/fact-sheets/detail/physical-activity", note: "The baseline guidelines everything else builds on." },
    ],
    build: "Write your \"marginal decade\" list: 5–10 physical things you want to still be able to do at 85 (carry grocery bags up stairs, get up off the floor, lift a grandchild…). Keep it; the capstone plan trains backwards from it.",
    doneWhen: "You can explain lifespan vs healthspan, and Medicine 2.0 vs 3.0, in two sentences each.",
    prerequisites: [],
  },
  {
    id: 1,
    slug: "science-of-ageing",
    title: "The science behind ageing",
    phase: "Foundations",
    durationWeeks: [1, 1],
    durationLabel: "1 week",
    goal: "Know what ageing is at the level of cells, why it is the biggest risk factor for heart disease, cancer, dementia and diabetes, and which anti-ageing ideas are actually being tested in people.",
    resources: [
      ...parts("steele", "hs1-steele", undefined, "A Royal Institution lecture by a biologist, the clearest one-hour overview there is."),
      { id: "hs1-x1", type: "video", role: "extra", title: "Beyond the hallmarks: what are we missing in ageing research?", author: "Matt Kaeberlein", url: yt("hySlWn0f9m8"), note: "A sceptic's view, including why \"biological age\" clocks aren't ready yet." },
      { id: "hs1-x2", type: "paper", role: "extra", title: "Hallmarks of aging: an expanding universe (Cell, 2023)", author: "López-Otín et al.", url: "https://doi.org/10.1016/j.cell.2022.11.001", note: "The reference paper behind the \"12 hallmarks\". Read the summary figure." },
      { id: "hs1-x3", type: "book", role: "extra", title: "Ageless: The New Science of Getting Older Without Getting Old", author: "Andrew Steele", url: "https://andrewsteele.co.uk/ageless/", note: "The book behind the lecture. Not free; try a library." },
    ],
    build: "On one page, list four hallmarks of ageing and, for each, one thing that speeds it up and one thing that slows it down.",
    doneWhen: "You can explain why ageing itself, not just individual diseases, is a target, and say what the TAME trial is testing.",
    prerequisites: [0],
  },
  {
    id: 2,
    slug: "blood-markers",
    title: "Key blood markers and tests",
    phase: "Measure",
    durationWeeks: [1, 1],
    durationLabel: "1 week",
    goal: "Know which blood tests matter most for long-term heart and metabolic health (apoB, LDL-C, Lp(a), HbA1c, fasting glucose and insulin, triglycerides) and what moves them.",
    resources: [
      ...parts("apoB", "hs2-apob"),
      ...parts("lowerApoB", "hs2-lower"),
      { id: "hs2-x1", type: "video", role: "extra", title: "Understanding heart disease risk, cholesterol and apoB (Drive #229)", author: "Peter Attia", url: yt("UWQsbBZHHUU"), note: "The full-length version, for going deeper." },
      { id: "hs2-x2", type: "article", role: "extra", title: "MedlinePlus: Hemoglobin A1C (HbA1c) test", url: "https://medlineplus.gov/lab-tests/hemoglobin-a1c-hba1c-test/" },
      { id: "hs2-x3", type: "article", role: "extra", title: "MedlinePlus: Cholesterol levels", url: "https://medlineplus.gov/lab-tests/cholesterol-levels/" },
    ],
    build: "Make a marker table from your most recent blood report: apoB (or LDL-C if apoB wasn't tested), Lp(a), HbA1c, fasting glucose, fasting insulin, triglycerides, HDL and blood pressure. For each, write your value, the lab's range, and whether to retest. Note which ones you've never had tested.",
    doneWhen: "You can explain why apoB is a better measure of heart risk than total cholesterol, and why Lp(a) only needs testing once.",
    prerequisites: [1],
    hardware: "Education, not medical advice. Discuss your numbers, and any medicine such as statins, with your doctor.",
  },
  {
    id: 3,
    slug: "fitness-markers",
    title: "Fitness markers: VO2 max, muscle and grip",
    phase: "Measure",
    durationWeeks: [1, 1],
    durationLabel: "1 week",
    goal: "Understand why cardio fitness (VO2 max), muscle mass and strength predict lifespan better than most blood tests, and how to measure them simply.",
    resources: [
      ...parts("vo2Predictor", "hs3-vo2"),
      ...parts("vo2Muscle", "hs3-muscle"),
      ...parts("grip", "hs3-grip"),
      ...parts("agingExercise", "hs3-aging", [1], "Part 1 of a long episode; later modules use the rest."),
      { id: "hs3-x1", type: "video", role: "extra", title: "Breaking down VO2 max: what it is and why it plateaus", author: "Peter Attia", url: yt("1nM1iADTcYU") },
    ],
    build: "Record your baseline Healthspan Scorecard: resting heart rate, estimated VO2 max (Rockport 1-mile walk test), grip strength (or a dead hang time), 30-second chair stand, single-leg balance (eyes open, up to 30 s per leg), and waist-to-height ratio. Date it; you'll retest in the capstone.",
    doneWhen: "You have your baseline numbers and know which one is your weakest.",
    prerequisites: [1],
    hardware: "Stop any test if you feel chest pain, dizziness or unusual breathlessness. If you have heart disease or several risk factors, get a doctor's clearance before fitness tests.",
  },
  {
    id: 4,
    slug: "cardio",
    title: "Cardio: zone 2 and VO2 max",
    phase: "Train",
    durationWeeks: [1, 2],
    durationLabel: "1–2 weeks",
    goal: "Know how to build an aerobic base with zone 2, how to find zone 2 without a lab, and how to add VO2 max intervals safely, including for older or deconditioned people.",
    resources: [
      ...parts("cardio", "hs4-cardio"),
      ...parts("zone2Dose", "hs4-z2dose"),
      ...parts("zone2Metrics", "hs4-z2metrics"),
      ...parts("agingExercise", "hs4-aging", [2, 3]),
      { id: "hs4-x1", type: "video", role: "extra", title: "Training for the Centenarian Decathlon: zone 2, VO2 max, stability, strength (Drive #261)", author: "Peter Attia", url: yt("NivjpZ0VBro") },
      { id: "hs4-x2", type: "video", role: "extra", title: "Deep dive back into zone 2 training (Drive #201)", author: "Iñigo San-Millán & Peter Attia", url: yt("-6PDBVRkCKc"), note: "Over 3 hours. Only if you want the physiology." },
    ],
    build: "Do three zone 2 sessions this week (30–45 min, a pace where you can talk but would rather not) and one easy interval session (e.g. 4 × 2 min hard, 2 min easy). Log heart rate and how the \"talk test\" felt.",
    doneWhen: "You can find your own zone 2 using the talk test and heart rate, and explain why most cardio should be easy.",
    prerequisites: [3],
    hardware: "Build up gradually. If you're on beta blockers, heart-rate zones won't work; use the talk test and effort instead.",
  },
  {
    id: 5,
    slug: "strength-stability",
    title: "Strength, stability and falls",
    phase: "Train",
    durationWeeks: [1, 2],
    durationLabel: "1–2 weeks",
    goal: "Understand why muscle and bone loss and falls are among the biggest threats in later life, and how strength and balance training prevent them at any age.",
    resources: [
      ...parts("decathlon", "hs5-decathlon"),
      ...parts("agingExercise", "hs5-aging", [4, 5]),
      { id: "hs5-x1", type: "video", role: "extra", title: "Building strength and muscle mass for longevity (AMA #71)", author: "Peter Attia", url: yt("CqNqfb37gig") },
      { id: "hs5-x2", type: "article", role: "extra", title: "CDC STEADI: older adult fall prevention", url: "https://www.cdc.gov/steadi/", note: "Includes the 4-stage balance test." },
    ],
    build: "Pick three events from your Module 0 list and write the exercises that train each (e.g. \"get up off the floor\" → goblet squat, lunge, Turkish get-up). Then do two full-body strength sessions this week with one balance drill each.",
    doneWhen: "You can explain why strength and balance matter more after 50, and you have a weekly strength routine you can actually keep.",
    prerequisites: [3],
    hardware: "Learn new lifts with light weights first. Anyone with osteoporosis, joint problems or a past fall should get professional guidance.",
  },
  {
    id: 6,
    slug: "protein",
    title: "Protein and muscle at every age",
    phase: "Fuel & recover",
    durationWeeks: [1, 1],
    durationLabel: "1 week",
    goal: "Know how much protein you actually need, why needs rise with age, and which popular protein claims (timing, per-meal limits, plant vs animal) don't hold up.",
    resources: [
      ...parts("protein", "hs6-protein", undefined, "Stuart Phillips is one of the most-cited protein researchers in the world."),
      { id: "hs6-x1", type: "video", role: "extra", title: "Building muscle with resistance exercise, and protein intake", author: "Stuart Phillips · FoundMyFitness", url: yt("r8DSpOd0NZc") },
      { id: "hs6-x2", type: "video", role: "extra", title: "Protein timing for athletes and older adults", author: "Stuart Phillips", url: yt("B_aftzukE2U") },
      { id: "hs6-x3", type: "article", role: "extra", title: "Stronger By Science", url: "https://www.strongerbyscience.com/", note: "Free, careful articles on training and nutrition research." },
    ],
    build: "Log your protein for three normal days. Compare the average with your target (start around 1.2–1.6 g per kg of body weight a day, more if you're older or in a fat-loss phase). Write two easy swaps that close the gap.",
    doneWhen: "You know your daily protein target and how close you usually get to it.",
    prerequisites: [5],
    hardware: "People with kidney disease should agree a protein target with their doctor.",
  },
  {
    id: 7,
    slug: "sleep",
    title: "Sleep and recovery",
    phase: "Fuel & recover",
    durationWeeks: [1, 1],
    durationLabel: "1 week",
    goal: "Understand what poor sleep does to memory, immunity, metabolism and ageing, and the few habits with the best evidence for sleeping better.",
    resources: [
      ...parts("sleepTed", "hs7-ted"),
      ...parts("sleepAttia", "hs7-attia"),
      { id: "hs7-x1", type: "video", role: "extra", title: "Why we sleep: science of sleep and dreams (Talks at Google)", author: "Matt Walker", url: yt("aXflBZXAucQ") },
    ],
    build: "Keep a one-week sleep log: bedtime, wake time, caffeine cut-off and how rested you felt (1–5). Pick one change (a fixed wake time, no caffeine after noon, or a cooler, darker room) and keep it for the rest of the course.",
    doneWhen: "You can name the three sleep habits with the best evidence, and you've chosen yours.",
    prerequisites: [0],
    hardware: "Loud snoring, gasping at night or heavy daytime sleepiness can be sleep apnoea: see a doctor.",
  },
  {
    id: 8,
    slug: "supplements-evidence",
    title: "Supplements that have real evidence",
    phase: "Supplements",
    durationWeeks: [1, 2],
    durationLabel: "1–2 weeks",
    goal: "Learn how to grade supplement evidence, and which few (creatine, protein powder, caffeine, omega-3, vitamin D when low) have strong support, from two scientists who don't sell their own pills.",
    resources: [
      ...parts("layneTier1", "hs8-layne", undefined, "Layne Norton is a nutrition scientist; his sponsor reads are skipped in the chapter list."),
      ...parts("supplementRanking", "hs8-rank", undefined, "Matt Kaeberlein is an ageing researcher and an open sceptic of longevity hype."),
      { id: "hs8-x1", type: "video", role: "extra", title: "Longevity doctors rank the most hyped supplements (Optispan AMA)", author: "Matt Kaeberlein · Optispan", url: yt("yM-vL5J3BIA"), note: "CoQ10 with statins, creatine and kidneys, vitamin D ranges, K2 caution." },
      { id: "hs8-x2", type: "tool", role: "extra", title: "Examine.com: supplement summaries", url: "https://examine.com/supplements/", note: "Free summary pages grade the evidence for each outcome. The detailed database is paid." },
      { id: "hs8-x3", type: "tool", role: "extra", title: "NIH Office of Dietary Supplements: fact sheets", url: "https://ods.od.nih.gov/factsheets/list-all/", note: "Free, government-run. Each fact sheet lists doses, safety and interactions with medicines." },
    ],
    build: "For three supplements you (or someone you know) take, look each up on Examine and the NIH fact sheets. Write: what it's for, the evidence grade, the dose studied, when to take it, and any medicine interactions.",
    doneWhen: "You can tell a well-supported supplement from a hyped one, and name what you'd check before taking one.",
    prerequisites: [6],
    hardware: "Supplements can interact with medicines (e.g. blood thinners, thyroid and diabetes drugs). Check with a doctor or pharmacist before starting one.",
  },
  {
    id: 9,
    slug: "longevity-drugs-hype",
    title: "Longevity drugs and hyped pills",
    phase: "Supplements",
    durationWeeks: [1, 1],
    durationLabel: "1 week",
    goal: "Know what the evidence actually says about metformin, rapamycin, NAD+ boosters (NMN, NR) and other \"anti-ageing\" pills, and how to read longevity claims sceptically.",
    resources: [
      ...parts("antiAgingMeds", "hs9-meds", undefined, "Gil Carvalho is a neuroscientist who reads the studies on camera."),
      { id: "hs9-x1", type: "video", role: "extra", title: "Longevity cage match: science takes on hype", author: "Matt Kaeberlein", url: yt("A5t46Od2F8c") },
    ],
    build: "Find one longevity claim online (an ad, a reel or a podcast). Check it: was it tested in humans? How many people, for how long? Who paid for it? Did it measure a real outcome or just a marker? Write a three-line verdict.",
    doneWhen: "You can explain why most \"anti-ageing\" pills aren't proven in humans, and the four questions to ask about any new claim.",
    prerequisites: [8],
    hardware: "Metformin and rapamycin are prescription drugs with real side effects. Never start one for longevity without a doctor.",
  },
  {
    id: 10,
    slug: "capstone",
    title: "Capstone: your 90-day healthspan plan",
    phase: "Capstone",
    durationWeeks: [1, 1],
    durationLabel: "1 week + 90 days",
    goal: "Turn everything into one plan: pick the three scorecard numbers that matter most for you, and train, eat and sleep to move them over 90 days.",
    resources: [
      { id: "hs10-x1", type: "video", role: "extra", title: "Re-watch: how to train your cardiovascular fitness", author: "Peter Attia", url: yt("qLf_1rFrlRs") },
      { id: "hs10-x2", type: "video", role: "extra", title: "Re-watch: training for the Centenarian Decathlon", author: "Peter Attia", url: yt("pxmyE59AyZA") },
    ],
    build: "Write your 90-day plan: (1) your three target numbers from the Module 3 scorecard and Module 2 markers; (2) a weekly schedule: 2–3 strength sessions, about 3 hours of zone 2, one interval session, and balance work; (3) your protein target and sleep habit; (4) any supplements, with their evidence grade; (5) a retest date at day 90. If you coach, write the same plan for one client.",
    doneWhen: "You have a written plan with a retest date, and can justify every item with evidence from earlier modules.",
    prerequisites: [2, 4, 5, 7, 9],
  },
];

export const HEALTHSPAN: Track = {
  id: "healthspan",
  title: "Longevity & Healthspan",
  tagline: "The science of ageing better: what to measure, and what actually helps.",
  summary:
    "11 modules on why we age, which tests matter, and the habits with real evidence: cardio, strength, protein, sleep and supplements. About 3–4 hours a week for roughly 3 months. Every resource is free.",
  weeklyHours: "3–4 h/week",
  totalDuration: "~3 months",
  color: "#0d9488",
  basePath: "/healthspan",
  storageKey: "payark-healthspan-progress-v1",
  buildLabel: "Practice",
  hardwareLabel: "Safety",
  navLabel: "Healthspan",
  category: "health",
  phases: HS_PHASES,
  modules: hsModules,
  videos: HS_VIDEOS,
};

export function getHsModule(slugOrId: string): TrackModule | undefined {
  return findModule(hsModules, slugOrId);
}
