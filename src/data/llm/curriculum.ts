import { VIDEOS, toSeconds } from "./videos";

// ─────────────────────────────────────────────────────────────
// Build an LLM from Scratch — Modular Curriculum (12 modules)
// Source: "Build an LLM from Scratch — Modular Curriculum" doc (2026-11-04)
// ─────────────────────────────────────────────────────────────

export type LlmPhase = "Foundations" | "Core" | "Scale" | "Applied" | "Capstone";
export type ResourceType = "video" | "playlist" | "code" | "book" | "course" | "article" | "paper" | "tool" | "dataset";
export type ResourceRole = "main" | "extra";

export interface LlmVideoPart {
  videoKey: string;
  youtubeId: string;
  /** Seconds into the full video */
  start: number;
  end: number;
  /** 1-based part number and how many parts the whole video has */
  part: number;
  partCount: number;
  partTitle: string;
  videoTitle: string;
}

export interface LlmResource {
  id: string;
  type: ResourceType;
  role: ResourceRole;
  title: string;
  url: string;
  /** Who made it, e.g. "Karpathy" */
  author?: string;
  /** Approximate length in minutes (videos only) */
  minutes?: number;
  note?: string;
  /** Set when this resource is one part of a split YouTube video */
  video?: LlmVideoPart;
}

export interface LlmModule {
  id: number;
  slug: string;
  title: string;
  phase: LlmPhase;
  /** Duration range in weeks, e.g. [2, 4] */
  durationWeeks: [number, number];
  durationLabel: string;
  goal: string;
  resources: LlmResource[];
  build: string;
  doneWhen: string;
  prerequisites: number[];
  hardware?: string;
}

export interface PhaseInfo {
  phase: LlmPhase;
  color: string;
  blurb: string;
}

export const LLM_TRACK = {
  id: "llm",
  title: "Build an LLM from Scratch",
  tagline: "From basic Python to training your own small ChatGPT-style model.",
  summary:
    "12 modules that take you from basic Python to training your own small ChatGPT-style model. At about 8–10 hours a week it takes roughly 6–9 months. Every resource listed is free.",
  weeklyHours: "8–10 h/week",
  totalDuration: "6–9 months",
  color: "#8b5cf6",
} as const;

export const LLM_PHASES: PhaseInfo[] = [
  { phase: "Foundations", color: "#3b82f6", blurb: "Mental map, Python, PyTorch and the math." },
  { phase: "Core", color: "#8b5cf6", blurb: "Karpathy's Zero to Hero: from micrograd to GPT and tokenizers." },
  { phase: "Scale", color: "#f59e0b", blurb: "Pretrain GPT-2 (124M), then turn it into a chatbot." },
  { phase: "Applied", color: "#06b6d4", blurb: "Fine-tune open-weight models with LoRA." },
  { phase: "Capstone", color: "#10b981", blurb: "Run the full pipeline end to end with nanochat." },
];

export const LLM_HOW_TO_USE: { label: string; text: string }[] = [
  {
    label: "The core",
    text: "Andrej Karpathy's Neural Networks: Zero to Hero series runs through Modules 3–8, one or two lectures per module. Everything else supports it.",
  },
  {
    label: "Every module has the same parts",
    text: "Goal, Main videos, Extra material, Build, and Done when. Watch a main video with the notebook open, pause, and type the code yourself. Don't copy-paste.",
  },
  {
    label: "Pacing",
    text: "Finish each module's Build before moving on. That small project is where the learning sticks. Module 2 (math) can run alongside Modules 1 and 3.",
  },
  {
    label: "Hardware",
    text: "Modules 0–7 run on any laptop or on free Google Colab / Kaggle GPUs. Module 8 and the capstone need rented cloud GPUs (roughly tens to ~100 dollars in total). Module 10 needs one GPU; free Colab is usually enough for small models.",
  },
  {
    label: "Durations",
    text: "Estimates for a working adult. Video lengths are approximate.",
  },
];

export const ZERO_TO_HERO = {
  site: "https://karpathy.ai/zero-to-hero.html",
  playlist: "https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ",
  code: "https://github.com/karpathy/nn-zero-to-hero",
};

/**
 * One "main" resource per part of a video, so each part is its own step.
 * `parts` picks which parts (1-based) belong to this module — the Deep Dive is
 * shared: parts 1–2 in Module 0, parts 3–6 in Module 9.
 */
function videoParts(key: keyof typeof VIDEOS, idPrefix: string, parts?: number[], note?: string): LlmResource[] {
  const v = VIDEOS[key];
  const chosen = parts ?? v.parts.map((_, i) => i + 1);
  return chosen.map((n, i) => {
    const def = v.parts[n - 1];
    const start = toSeconds(def.start);
    const end = toSeconds(def.end);
    return {
      id: `${idPrefix}-p${n}`,
      type: "video",
      role: "main",
      title: `${v.title} · Part ${n}: ${def.title}`,
      author: v.author,
      url: `https://www.youtube.com/watch?v=${v.youtubeId}&t=${start}s`,
      minutes: Math.round((end - start) / 60),
      note: i === 0 ? note : undefined,
      video: {
        videoKey: key,
        youtubeId: v.youtubeId,
        start,
        end,
        part: n,
        partCount: v.parts.length,
        partTitle: def.title,
        videoTitle: v.title,
      },
    };
  });
}

const CS336_PLAYLIST = "https://www.youtube.com/playlist?list=PLoROMvodv4rOY23Y0BoGoBGgQ1zmU_MT_";
const NN_3B1B = "https://www.3blue1brown.com/topics/neural-networks";
const COLAB = "https://colab.research.google.com";

export const llmModules: LlmModule[] = [
  {
    id: 0,
    slug: "orientation",
    title: "Orientation: what an LLM is",
    phase: "Foundations",
    durationWeeks: [1, 1],
    durationLabel: "1 week",
    goal: "Get a mental map of the whole pipeline (data, tokens, pretraining, fine-tuning, RLHF, inference) before writing any code.",
    resources: [
      ...videoParts("intro", "m0-intro"),
      ...videoParts("deepDive", "m0-deep", [1, 2], "The pretraining half of the Deep Dive. Module 9 comes back for the rest."),
      { id: "m0-r3", type: "video", role: "extra", title: "3Blue1Brown: Neural networks series", url: NN_3B1B, note: "Start with \"Large Language Models explained briefly\"." },
    ],
    build: "None. Write a one-page summary, in your own words, of how ChatGPT is made.",
    doneWhen: "You can explain \"base model vs assistant model\" and \"what a token is\" to a friend.",
    prerequisites: [],
  },
  {
    id: 1,
    slug: "python-pytorch",
    title: "Python and PyTorch",
    phase: "Foundations",
    durationWeeks: [2, 4],
    durationLabel: "2–4 weeks",
    goal: "Write Python comfortably and work with PyTorch tensors, which is what every later lecture assumes.",
    resources: [
      { id: "m1-r1", type: "course", role: "main", title: "Harvard CS50P: Introduction to Programming with Python", url: "https://cs50.harvard.edu/python/", note: "Skip it if you already code in Python." },
      { id: "m1-r2", type: "course", role: "main", title: "PyTorch: Learn the Basics", url: "https://pytorch.org/tutorials/beginner/basics/intro.html", note: "Tensors, datasets, autograd, the training loop." },
      { id: "m1-r3", type: "book", role: "extra", title: "The official Python tutorial", url: "https://docs.python.org/3/tutorial/" },
      { id: "m1-r4", type: "article", role: "extra", title: "NumPy: the absolute basics", url: "https://numpy.org/doc/stable/user/absolute_beginners.html" },
      { id: "m1-r5", type: "tool", role: "extra", title: "Set up: VS Code + Python, or a Google Colab notebook", url: COLAB },
    ],
    build: "Train a tiny PyTorch model that classifies handwritten digits (MNIST), following the PyTorch tutorial.",
    doneWhen: "You can create tensors, reshape them, index them and multiply them without looking things up.",
    prerequisites: [0],
  },
  {
    id: 2,
    slug: "math",
    title: "Math for deep learning",
    phase: "Foundations",
    durationWeeks: [3, 4],
    durationLabel: "3–4 weeks (runs alongside)",
    goal: "Understand the math behind neural networks well enough to follow the code: vectors and matrices, derivatives and the chain rule, and probability.",
    resources: [
      { id: "m2-r1", type: "playlist", role: "main", title: "3Blue1Brown: Essence of Linear Algebra", url: "https://www.3blue1brown.com/topics/linear-algebra" },
      { id: "m2-r2", type: "playlist", role: "main", title: "3Blue1Brown: Essence of Calculus", url: "https://www.3blue1brown.com/topics/calculus", note: "The chain rule matters most." },
      { id: "m2-r3", type: "book", role: "extra", title: "Mathematics for Machine Learning", url: "https://mml-book.github.io/", note: "Free textbook; use chapters 2, 5 and 6 as reference." },
      { id: "m2-r4", type: "course", role: "extra", title: "Khan Academy", url: "https://www.khanacademy.org/math", note: "Probability, statistics and multivariable calculus refreshers." },
    ],
    build: "Using NumPy, multiply two matrices by hand-written loops, then check the result with @. Take a derivative numerically and compare it to the formula.",
    doneWhen: "You can explain what a matrix multiply does to a vector and why the chain rule lets you backpropagate.",
    prerequisites: [0],
  },
  {
    id: 3,
    slug: "neural-networks-backprop",
    title: "Neural networks and backprop",
    phase: "Core",
    durationWeeks: [1, 2],
    durationLabel: "1–2 weeks",
    goal: "Build a neural network library from scratch and understand exactly how a network learns.",
    resources: [
      ...videoParts("micrograd", "m3-micrograd"),
      { id: "m3-r2", type: "code", role: "main", title: "micrograd code", url: "https://github.com/karpathy/micrograd" },
      { id: "m3-r3", type: "video", role: "extra", title: "3Blue1Brown: Neural networks", url: NN_3B1B, note: "Chapters 1–4 (gradient descent, backpropagation)." },
      { id: "m3-r4", type: "book", role: "extra", title: "Dive into Deep Learning", url: "https://d2l.ai/", note: "Free interactive book; the chapters on linear neural networks and multilayer perceptrons." },
    ],
    build: "Rewrite micrograd from memory, then train it on a small 2D classification dataset.",
    doneWhen: "You can hand-calculate the gradients on a small expression graph, and they match your code.",
    prerequisites: [1],
  },
  {
    id: 4,
    slug: "language-modeling",
    title: "Language modeling basics",
    phase: "Core",
    durationWeeks: [2, 2],
    durationLabel: "2 weeks",
    goal: "Understand what \"predict the next token\" means. Start with simple counting, then move to a small neural network.",
    resources: [
      ...videoParts("makemore1", "m4-makemore1"),
      ...videoParts("makemore2", "m4-makemore2"),
      { id: "m4-r3", type: "code", role: "extra", title: "makemore code", url: "https://github.com/karpathy/makemore" },
      { id: "m4-r4", type: "paper", role: "extra", title: "Bengio et al. 2003, A Neural Probabilistic Language Model", url: "https://www.jmlr.org/papers/volume3/bengio03a/bengio03a.pdf", note: "The paper Part 2 implements." },
    ],
    build: "A character-level name generator trained on your own list. Try Indian names, city names or Pokémon names.",
    doneWhen: "You can explain what the loss (negative log-likelihood) means, and why train/val/test splits matter.",
    prerequisites: [2, 3],
  },
  {
    id: 5,
    slug: "training-deep-networks",
    title: "Training deep networks well",
    phase: "Core",
    durationWeeks: [3, 3],
    durationLabel: "3 weeks",
    goal: "Learn why deep networks fail to train and how to fix them: initialization, activations, BatchNorm, and writing backprop by hand.",
    resources: [
      ...videoParts("makemore3", "m5-makemore3"),
      ...videoParts("makemore4", "m5-makemore4", undefined, "The hardest lecture, and the one that pays off most."),
      ...videoParts("wavenet", "m5-wavenet"),
      { id: "m5-r4", type: "article", role: "extra", title: "A Recipe for Training Neural Networks", author: "Karpathy", url: "https://karpathy.github.io/2019/04/25/recipe/", note: "Karpathy's blog post on debugging training." },
      { id: "m5-r5", type: "paper", role: "extra", title: "Batch Normalization paper", url: "https://arxiv.org/abs/1502.03167", note: "Skim it, don't study it." },
      { id: "m5-r6", type: "paper", role: "extra", title: "WaveNet paper", url: "https://arxiv.org/abs/1609.03499", note: "Skim it, don't study it." },
    ],
    build: "Do the backprop-ninja exercises without looking at the answers. Plot activation and gradient histograms for your own model.",
    doneWhen: "You can look at a training curve and name the likely problem (learning rate too high, dead neurons, overfitting).",
    prerequisites: [4],
  },
  {
    id: 6,
    slug: "transformers-gpt",
    title: "Transformers and GPT",
    phase: "Core",
    durationWeeks: [2, 2],
    durationLabel: "2 weeks",
    goal: "Build a GPT, the architecture behind ChatGPT and Claude, line by line.",
    resources: [
      ...videoParts("gpt", "m6-gpt"),
      { id: "m6-r2", type: "code", role: "main", title: "nanoGPT code", url: "https://github.com/karpathy/nanoGPT" },
      { id: "m6-r3", type: "video", role: "extra", title: "3Blue1Brown: Neural networks", url: NN_3B1B, note: "The transformer, attention and \"how LLMs store facts\" chapters. The best visuals available anywhere." },
      { id: "m6-r4", type: "article", role: "extra", title: "The Illustrated Transformer", author: "Jay Alammar", url: "https://jalammar.github.io/illustrated-transformer/" },
      { id: "m6-r5", type: "paper", role: "extra", title: "Attention Is All You Need", url: "https://arxiv.org/abs/1706.03762", note: "The original 2017 paper; read it after the video." },
      { id: "m6-r6", type: "code", role: "extra", title: "rasbt/LLMs-from-scratch", author: "Sebastian Raschka", url: "https://github.com/rasbt/LLMs-from-scratch", note: "Free code notebooks (chapters 3–4 build attention and GPT). The book is paid; the code is free." },
    ],
    build: "Train your GPT on a text you choose, such as Tamil/Hindi song lyrics, Tagore's works or your own chats, on free Colab.",
    doneWhen: "You can draw a transformer block from memory and explain what self-attention computes.",
    prerequisites: [5],
  },
  {
    id: 7,
    slug: "tokenization",
    title: "Tokenization",
    phase: "Core",
    durationWeeks: [1, 1],
    durationLabel: "1 week",
    goal: "Understand how text becomes tokens with Byte Pair Encoding (BPE), and why tokenization causes so many odd LLM behaviors.",
    resources: [
      ...videoParts("tokenizer", "m7-tokenizer"),
      { id: "m7-r2", type: "code", role: "main", title: "minbpe code", url: "https://github.com/karpathy/minbpe" },
      { id: "m7-r3", type: "tool", role: "extra", title: "Tiktokenizer", url: "https://tiktokenizer.vercel.app/", note: "Type text and see how real models split it into tokens." },
      { id: "m7-r4", type: "playlist", role: "extra", title: "Stanford CS336 Lecture 1: Overview and Tokenization", url: CS336_PLAYLIST },
      { id: "m7-r5", type: "course", role: "extra", title: "Hugging Face LLM Course, Tokenizers chapter", url: "https://huggingface.co/learn/llm-course/chapter6/1" },
    ],
    build: "Train your own BPE tokenizer. Compare how many tokens the same sentence takes in English vs Hindi or Tamil. Non-Latin scripts usually take many more, which is a real problem for Indian-language AI.",
    doneWhen: "You can explain why LLMs struggle to count the letters in \"strawberry\".",
    prerequisites: [6],
  },
  {
    id: 8,
    slug: "pretraining",
    title: "Pretraining at scale",
    phase: "Scale",
    durationWeeks: [3, 4],
    durationLabel: "3–4 weeks",
    goal: "Train a real GPT-2-sized model (124M parameters) on internet text, and learn the engineering that makes training fast: mixed precision, Flash Attention, multiple GPUs, learning-rate schedules and evals.",
    resources: [
      ...videoParts("gpt2", "m8-gpt2"),
      { id: "m8-r2", type: "code", role: "main", title: "build-nanogpt code", url: "https://github.com/karpathy/build-nanogpt" },
      { id: "m8-r3", type: "code", role: "main", title: "llm.c", url: "https://github.com/karpathy/llm.c" },
      { id: "m8-r4", type: "playlist", role: "extra", title: "Stanford CS336", url: CS336_PLAYLIST, note: "The lectures on GPUs, parallelism, scaling laws and data." },
      { id: "m8-r5", type: "dataset", role: "extra", title: "FineWeb-Edu dataset", url: "https://huggingface.co/datasets/HuggingFaceFW/fineweb-edu", note: "The training data used in the video." },
      { id: "m8-r6", type: "book", role: "extra", title: "The Ultra-Scale Playbook", url: "https://huggingface.co/spaces/nanotron/ultrascale-playbook", note: "Hugging Face's free guide to training on many GPUs." },
    ],
    build: "Run the GPT-2 (124M) reproduction on a rented GPU (RunPod, Lambda, Vast.ai or similar). Expect roughly tens of dollars. Before paying, do a smaller run on free Colab.",
    doneWhen: "Your model's validation loss and HellaSwag score come close to the original GPT-2's.",
    prerequisites: [6, 7],
    hardware: "Rented cloud GPU (roughly tens of dollars).",
  },
  {
    id: 9,
    slug: "post-training",
    title: "Post-training: making a chatbot",
    phase: "Scale",
    durationWeeks: [2, 3],
    durationLabel: "2–3 weeks",
    goal: "Learn how a base model that only continues text becomes an assistant: supervised fine-tuning (SFT), reward models, RLHF, DPO and reasoning RL.",
    resources: [
      ...videoParts("deepDive", "m9-deep", [3, 4, 5, 6], "The second half of the Deep Dive: post-training, hallucinations, RL."),
      { id: "m9-r2", type: "course", role: "main", title: "RLHF Book course", author: "Nathan Lambert", url: "https://rlhfbook.com/course", note: "Free lectures." },
      { id: "m9-r3", type: "book", role: "extra", title: "The RLHF Book", url: "https://rlhfbook.com/", note: "Read the training overview, instruction tuning, reward modeling and direct alignment (DPO) chapters." },
      { id: "m9-r4", type: "playlist", role: "extra", title: "Stanford CS336", url: CS336_PLAYLIST, note: "The alignment and RL lectures." },
    ],
    build: "Instruction-tune your Module 8 model on a small conversation dataset. Compare its answers before and after.",
    doneWhen: "You can explain the difference between SFT, RLHF and DPO, and why each step exists.",
    prerequisites: [8],
  },
  {
    id: 10,
    slug: "fine-tuning",
    title: "Fine-tuning open models",
    phase: "Applied",
    durationWeeks: [2, 2],
    durationLabel: "2 weeks",
    goal: "Take a capable open-weight model (Qwen, Llama, Gemma or Mistral) and adapt it to your own task with LoRA. Most real-world custom AI is built this way.",
    resources: [
      { id: "m10-r1", type: "course", role: "main", title: "Hugging Face LLM Course", url: "https://huggingface.co/learn/llm-course/chapter1/1", note: "Free, with a certificate; covers the Transformers library, fine-tuning and sharing models." },
      { id: "m10-r2", type: "tool", role: "extra", title: "Unsloth docs", url: "https://docs.unsloth.ai/", note: "Free Colab notebooks that run LoRA/QLoRA fine-tuning on a single free GPU." },
      { id: "m10-r3", type: "paper", role: "extra", title: "LoRA paper", url: "https://arxiv.org/abs/2106.09685" },
      { id: "m10-r4", type: "paper", role: "extra", title: "QLoRA paper", url: "https://arxiv.org/abs/2305.14314" },
      { id: "m10-r5", type: "tool", role: "extra", title: "Ollama", url: "https://ollama.com/", note: "Run your fine-tuned model locally on your PC." },
    ],
    build: "Fine-tune a small open model (about 1–8B parameters) on your own data, for example your writing style, support FAQs, or a domain like Indian tax rules. Then run it locally with Ollama.",
    doneWhen: "Your fine-tuned model clearly beats the base model on 20 test prompts you wrote yourself.",
    prerequisites: [9],
    hardware: "One GPU; free Colab is usually enough for small models.",
  },
  {
    id: 11,
    slug: "capstone",
    title: "Capstone: your own ChatGPT",
    phase: "Capstone",
    durationWeeks: [3, 4],
    durationLabel: "3–4 weeks + ongoing",
    goal: "Run the full pipeline end to end yourself: tokenizer, pretraining, mid-training, SFT, RL, then chatting with your model in a web UI.",
    resources: [
      { id: "m11-r1", type: "code", role: "main", title: "nanochat", author: "Karpathy", url: "https://github.com/karpathy/nanochat", note: "\"The best ChatGPT that $100 can buy\". About 8,000 lines of readable code; a single script trains a small chat model in about 4 hours on one 8×H100 node, for roughly $100." },
      { id: "m11-r2", type: "article", role: "main", title: "nanochat walkthrough", url: "https://github.com/karpathy/nanochat/discussions/1", note: "Read this first." },
      { id: "m11-r3", type: "course", role: "extra", title: "Stanford CS336: Language Modeling from Scratch", url: "https://cs336.stanford.edu/", note: "The full university course, free. Expect 150–200 hours plus some GPU cost." },
      { id: "m11-r4", type: "playlist", role: "extra", title: "CS336 2025 lectures", url: CS336_PLAYLIST },
      { id: "m11-r5", type: "code", role: "extra", title: "CS336 assignments", url: "https://github.com/stanford-cs336" },
    ],
    build: "Run nanochat. Then change one thing (the data, the tokenizer or the model depth) and measure the effect. Going further: read the Qwen, DeepSeek and OLMo technical reports.",
    doneWhen: "You have chatted with a model you trained from scratch and can explain every stage that produced it.",
    prerequisites: [8, 9],
    hardware: "One 8×H100 cloud node for ~4 hours (roughly $100).",
  },
];

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

export function getLlmModule(slugOrId: string): LlmModule | undefined {
  return llmModules.find((m) => m.slug === slugOrId || String(m.id) === slugOrId);
}

export function getPhaseInfo(phase: LlmPhase): PhaseInfo {
  return LLM_PHASES.find((p) => p.phase === phase) ?? LLM_PHASES[0];
}

export function getYoutubeId(url: string): string | null {
  const match = url.match(/youtube\.com\/watch\?v=([\w-]{11})/);
  return match ? match[1] : null;
}

export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = minutes / 60;
  return `~${Number.isInteger(hours) ? hours : hours.toFixed(1)} h`;
}
