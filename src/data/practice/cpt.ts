import type { PracticeModule, PracticeSet } from "./types";

// ─────────────────────────────────────────────────────────────
// INFS Certified Personal Trainer — exam practice bank.
// Written from Arun's course notes (Claude project "Infs Course", cpt-exam/ docs).
// Question ids are topicId-index: add new questions at the END of a topic
// so saved progress keeps pointing at the same questions.
// Generated from the CPT Coach artifact bank; edit here from now on.
// ─────────────────────────────────────────────────────────────

const MODULES: PracticeModule[] = [
 {
  "id": "E103",
  "name": "Anatomy & Physiology",
  "kind": "mcq",
  "color": "#e11d48",
  "blurb": "The science spine: planes, muscles, sliding filaments, bones, heart, hormones, exercise physiology.",
  "topics": [
   {
    "id": "e103-planes",
    "title": "Planes of Motion & Body Terms",
    "fact": "Most gym routines live in one plane. Squats, curls, lunges, push-ups and running are all sagittal (forward and back). Lateral raises and woodchops are the rare exceptions.",
    "primer": [
     "Anatomical position: standing erect, eyes and toes forward, arms at the sides, palms facing FORWARD.",
     "Sagittal splits left/right (flexion, extension). Frontal (coronal) splits front/back (abduction, adduction). Transverse splits top/bottom (rotation).",
     "Proximal/distal apply only to the limbs. Flexion closes a joint's angle; extension opens it."
    ],
    "qs": [
     {
      "q": "Which plane divides the body into left and right halves?",
      "o": [
       "Frontal",
       "Sagittal",
       "Transverse",
       "Coronal"
      ],
      "a": 1,
      "w": [
       "Frontal splits the body into FRONT and BACK.",
       "Correct. The sagittal plane runs front to back and splits left from right; flexion and extension happen in it.",
       "Transverse splits TOP from BOTTOM; rotations happen in it.",
       "Coronal is another name for the frontal plane, which splits front from back."
      ],
      "h": "Sagittal Splits Sides, Frontal Fronts-and-backs, Transverse Takes Top-from-bottom."
     },
     {
      "q": "A lateral (side) raise mainly moves in which plane?",
      "o": [
       "Sagittal",
       "Transverse",
       "Frontal",
       "Parasagittal"
      ],
      "a": 2,
      "w": [
       "Sagittal moves are forward and back, like a front raise or a curl.",
       "Transverse moves are rotations, like a woodchop or Russian twist.",
       "Correct. Raising the arm out to the side is abduction, a frontal-plane movement.",
       "Parasagittal is any plane parallel to the sagittal plane, so it is still forward and back."
      ],
      "h": "Frontal = Away & Add (abduction and adduction)."
     },
     {
      "q": "In the anatomical position, the palms face:",
      "o": [
       "Toward the thighs",
       "Backward",
       "Forward",
       "Upward, as if holding a tray"
      ],
      "a": 2,
      "w": [
       "This is how most people stand naturally, but it is not the anatomical position.",
       "Backward would be pronated, which is not the reference position.",
       "Correct. The palms face forward (supinated) and the thumbs point away from the body.",
       "Upward is a supinated forearm with the elbow bent, which is not the standing reference position."
      ],
      "h": "Anatomical position = a waiter showing you both open palms."
     },
     {
      "q": "'The wrist is distal to the elbow.' Distal means:",
      "o": [
       "Closer to the midline",
       "Further from the point where the limb attaches to the trunk",
       "Above",
       "Toward the back"
      ],
      "a": 1,
      "w": [
       "Closer to the midline is MEDIAL.",
       "Correct. Distal means further from the limb's attachment point; proximal means closer to it.",
       "Above is SUPERIOR.",
       "Toward the back is POSTERIOR."
      ],
      "h": "DIStal = DIStant, PROXimal = APPROXimate (near)."
     },
     {
      "q": "Flexion is best defined as:",
      "o": [
       "Increasing the angle at a joint",
       "Moving a limb away from the midline",
       "Decreasing the angle between the bones at a joint",
       "Rotating a limb around its long axis"
      ],
      "a": 2,
      "w": [
       "Increasing the angle is EXTENSION.",
       "Moving away from the midline is ABDUCTION.",
       "Correct. Flexion closes the joint, like the elbow in a curl or the hip and knee in a squat.",
       "Rotation around the long axis is medial or lateral rotation, in the transverse plane."
      ],
      "h": "Flex = Fold, Extend = Straighten."
     },
     {
      "q": "A cable woodchop or Russian twist is a classic example of movement in which plane?",
      "o": [
       "Transverse",
       "Frontal",
       "Sagittal",
       "None, because it is multi-planar only"
      ],
      "a": 0,
      "w": [
       "Correct. Twisting around the spine is rotation, the transverse plane's movement.",
       "Frontal plane moves are side-to-side (abduction, adduction, lateral flexion).",
       "Sagittal moves are forward and back (flexion, extension).",
       "Real moves can blend planes, but an exercise is classified by its DOMINANT plane, and rotation is transverse."
      ],
      "h": "Transverse = Twist."
     },
     {
      "q": "Circumduction (an arm circle) is classed by the course as:",
      "o": [
       "Transverse plane only",
       "Sagittal and frontal combined",
       "Frontal plane only",
       "Not a movement in any plane"
      ],
      "a": 1,
      "w": [
       "It is not a rotation around the long axis, so it is not transverse.",
       "Correct. The distal end draws a circle while the proximal end stays fixed, which combines flexion, extension, abduction and adduction.",
       "It includes forward and back movement too, so frontal alone is incomplete.",
       "It is a recognised movement; it simply spans two planes."
      ],
      "h": "Circum-duction = drawing a circle (circus ring)."
     },
     {
      "q": "Proximal and distal are terms used only for:",
      "o": [
       "The spine",
       "The skull",
       "The limbs (appendicular skeleton)",
       "Internal organs"
      ],
      "a": 2,
      "w": [
       "The spine is axial; we use superior and inferior there.",
       "The skull is axial.",
       "Correct. They describe position along a limb relative to its attachment to the trunk.",
       "Organs are described with terms like superior, medial and lateral."
      ],
      "h": "You can only be near or far along an ARM or a LEG."
     }
    ]
   },
   {
    "id": "e103-muscle",
    "title": "The Muscular System",
    "fact": "'Muscle' comes from the Latin musculus, 'little mouse'. Romans thought a flexing biceps looked like a mouse moving under the skin.",
    "primer": [
     "Three tissue types: skeletal (voluntary, striated), cardiac (involuntary, striated, heart only), smooth (involuntary, not striated).",
     "Wrappers outside to in: epimysium (muscle), perimysium (fascicle), endomysium (fibre).",
     "Henneman: small motor units first, big ones last. All-or-none applies to a motor unit, not the whole muscle."
    ],
    "qs": [
     {
      "q": "Which muscle tissue is BOTH striated and involuntary?",
      "o": [
       "Skeletal",
       "Smooth",
       "Cardiac",
       "Visceral smooth"
      ],
      "a": 2,
      "w": [
       "Skeletal is striated but VOLUNTARY.",
       "Smooth is involuntary but NOT striated.",
       "Correct. Cardiac muscle is striped like skeletal muscle but beats on its own. It is the odd one out.",
       "Visceral muscle is smooth muscle: involuntary and not striated."
      ],
      "h": "Cardiac = the striped one you can't control."
     },
     {
      "q": "The connective tissue that wraps a whole muscle is the:",
      "o": [
       "Endomysium",
       "Perimysium",
       "Epimysium",
       "Sarcolemma"
      ],
      "a": 2,
      "w": [
       "Endomysium wraps each individual FIBRE.",
       "Perimysium wraps each FASCICLE (bundle of fibres).",
       "Correct. Epi = upon, the outer layer around the whole muscle.",
       "The sarcolemma is the cell membrane of a single fibre, not a connective-tissue wrapper."
      ],
      "h": "Epi = upon (outside), Peri = around (bundle), Endo = within (fibre)."
     },
     {
      "q": "'Elasticity' as a property of muscle means it can:",
      "o": [
       "Be stretched",
       "Respond to a stimulus",
       "Shorten forcefully",
       "Return to its original length after being stretched"
      ],
      "a": 3,
      "w": [
       "Being stretched is EXTENSIBILITY.",
       "Responding to a stimulus is EXCITABILITY.",
       "Shortening is CONTRACTILITY.",
       "Correct. Like a rubber band snapping back. Chewing gum is extensible but not elastic."
      ],
      "h": "Extensible = can stretch; Elastic = snaps back."
     },
     {
      "q": "In a biceps curl, the triceps acts as the:",
      "o": [
       "Agonist",
       "Synergist",
       "Antagonist",
       "Stabiliser of the wrist"
      ],
      "a": 2,
      "w": [
       "The agonist (prime mover) is the biceps brachii.",
       "The synergist that assists is the brachioradialis (and brachialis).",
       "Correct. The antagonist opposes the movement and must relax while the biceps flexes the elbow.",
       "The triceps does not stabilise the wrist."
      ],
      "h": "Agonist acts, Antagonist Against."
     },
     {
      "q": "Besides elbow flexion, the biceps brachii's other main action is:",
      "o": [
       "Forearm pronation",
       "Forearm supination",
       "Wrist extension",
       "Shoulder abduction"
      ],
      "a": 1,
      "w": [
       "Pronation is done by pronator teres and quadratus. The lecture slipped here; the biceps supinates only.",
       "Correct. Turning the palm up is supination. The biceps flexes and supinates, like turning a doorknob and then drinking.",
       "Wrist extensors in the forearm extend the wrist.",
       "Abduction is mainly the lateral deltoid's job."
      ],
      "h": "Biceps = turn the key and drink."
     },
     {
      "q": "Which quadriceps muscle also crosses the hip and flexes it?",
      "o": [
       "Vastus lateralis",
       "Vastus medialis",
       "Vastus intermedius",
       "Rectus femoris"
      ],
      "a": 3,
      "w": [
       "The vasti start on the femur and cross only the knee.",
       "Same: the vastus medialis crosses only the knee.",
       "Same: the vastus intermedius crosses only the knee.",
       "Correct. The rectus femoris starts on the pelvis (AIIS), so it is biarticulate: it extends the knee and flexes the hip."
      ],
      "h": "Rectus Reaches the hip."
     },
     {
      "q": "Henneman's size principle states that motor units are recruited:",
      "o": [
       "Largest first, for maximum force",
       "Smallest (low-threshold) first, then larger ones as force demand rises",
       "All at once in every contraction",
       "Randomly"
      ],
      "a": 1,
      "w": [
       "Big units come LAST, only when force demand is high.",
       "Correct. Type I (small) units are recruited first, then IIa, then IIx as the load or effort increases.",
       "That is a misreading of the all-or-none principle, which applies to a single motor unit.",
       "Recruitment follows an orderly size pattern."
      ],
      "h": "Henneman = Small first, Big last (a queue by size)."
     },
     {
      "q": "Hypertrophy is:",
      "o": [
       "An increase in the NUMBER of muscle fibres",
       "A decrease in muscle fibre size",
       "An increase in the SIZE of existing fibres",
       "Age-related muscle loss"
      ],
      "a": 2,
      "w": [
       "An increase in number is HYPERPLASIA, which is minor in human muscle.",
       "A decrease in size is ATROPHY.",
       "Correct. Existing fibres get bigger, through myofibrillar and sarcoplasmic growth.",
       "Age-related loss is SARCOPENIA."
      ],
      "h": "Hyper-TROPHY = the trophy gets BIGGER; hyper-PLASIA = PLUS more pieces."
     },
     {
      "q": "Which fibre type is fatigue-resistant, has a small motor neuron and burns mainly fat?",
      "o": [
       "Type IIx",
       "Type IIa",
       "Type I (slow-twitch)",
       "Type IIb hybrid"
      ],
      "a": 2,
      "w": [
       "IIx is the fastest and most powerful, uses glycogen and creatine phosphate, and tires quickly.",
       "IIa is intermediate: moderately fast and fairly fatigue-resistant.",
       "Correct. Slow-twitch fibres are red, rich in mitochondria and capillaries, and built for hours of aerobic work.",
       "Not a course category. Stick to I, IIa and IIx."
      ],
      "h": "Type I = Infinite (endurance); Type IIx = eXplosive."
     },
     {
      "q": "A tendon connects:",
      "o": [
       "Bone to bone",
       "Muscle to bone",
       "Muscle to muscle",
       "Cartilage to bone"
      ],
      "a": 1,
      "w": [
       "Bone to bone is a LIGAMENT.",
       "Correct. A tendon is dense connective tissue that transmits the muscle belly's pull to the bone (e.g. the Achilles to the heel).",
       "Muscles are not joined directly to each other by tendons in this sense.",
       "Cartilage covers bone ends; it is not connected by tendons."
      ],
      "h": "TENDons TEND to muscles; LIGAments LInk bones."
     }
    ]
   },
   {
    "id": "e103-sft",
    "title": "Sliding Filament Theory",
    "fact": "Rigor mortis is the sliding filament theory in reverse. After death there is no ATP to let myosin release actin, so muscles lock stiff.",
    "primer": [
     "Myosin = thick filament (the rowers). Actin = thin filament (the rope). Sarcomere = Z-line to Z-line.",
     "Calcium from the sarcoplasmic reticulum binds TROPONIN, which pulls tropomyosin off actin's binding sites.",
     "On contraction the H zone and I band shorten; the A band and the filaments stay the same length."
    ],
    "qs": [
     {
      "q": "The THICK filament in a sarcomere is:",
      "o": [
       "Actin",
       "Troponin",
       "Myosin",
       "Tropomyosin"
      ],
      "a": 2,
      "w": [
       "Actin is the THIN filament.",
       "Troponin is a small regulatory protein on the thin filament.",
       "Correct. Myosin has two heads with ATP- and actin-binding sites and is anchored at the M-line.",
       "Tropomyosin is a strand lying along actin that covers its binding sites."
      ],
      "h": "THICK MYOsin is MIGHTY; THIN ACTin gets ACTed upon."
     },
     {
      "q": "During contraction, which band stays the SAME length?",
      "o": [
       "H zone",
       "I band",
       "A band",
       "The whole sarcomere"
      ],
      "a": 2,
      "w": [
       "The H zone shortens and can disappear.",
       "The I band shortens.",
       "Correct. The A band is the length of the thick filament, and filaments never shorten; they slide.",
       "The sarcomere shortens because the Z-lines are pulled closer together."
      ],
      "h": "H and I hide; A stays."
     },
     {
      "q": "Calcium triggers contraction by binding to:",
      "o": [
       "Tropomyosin",
       "Myosin heads",
       "Troponin",
       "Actin directly"
      ],
      "a": 2,
      "w": [
       "Tropomyosin is the chain that gets moved; calcium doesn't bind it.",
       "Myosin binds ATP and actin, not calcium.",
       "Correct. Ca²⁺ binds troponin (the lock), which shifts tropomyosin (the chain) off actin's binding sites.",
       "Calcium doesn't bind actin directly; it unlocks access through troponin."
      ],
      "h": "Calcium = Key, Troponin = Lock, Tropomyosin = Chain."
     },
     {
      "q": "Where is calcium stored inside the muscle fibre?",
      "o": [
       "T-tubules",
       "Sarcoplasmic reticulum",
       "Mitochondria",
       "Z-line"
      ],
      "a": 1,
      "w": [
       "T-tubules carry the electrical signal deep into the fibre; they don't store calcium.",
       "Correct. The sarcoplasmic reticulum is the calcium cupboard. The action potential triggers its release.",
       "Mitochondria make ATP; they are not the contraction calcium store.",
       "The Z-line is the boundary of the sarcomere."
      ],
      "h": "SR = Storage Room for calcium."
     },
     {
      "q": "What makes the myosin head DETACH from actin after a power stroke?",
      "o": [
       "Release of calcium",
       "A new ATP binding to myosin",
       "Tropomyosin covering the site",
       "ADP binding"
      ],
      "a": 1,
      "w": [
       "Calcium removal is what ends contraction overall, not the detachment of each cross-bridge.",
       "Correct. Myosin stays attached until a fresh ATP binds. No ATP, no let-go, which is why rigor mortis happens.",
       "Tropomyosin re-covers the sites only when calcium is pumped away during relaxation.",
       "ADP and Pi are RELEASED during the power stroke; they don't cause detachment."
      ],
      "h": "Cock (ATP split), Grab, Pull, Let go (new ATP)."
     },
     {
      "q": "The sarcomere is defined as the segment:",
      "o": [
       "M-line to M-line",
       "Z-line to Z-line",
       "From one H zone to the next",
       "Along one A band"
      ],
      "a": 1,
      "w": [
       "The M-line is the MIDDLE of a sarcomere.",
       "Correct. Z = the end border; the sarcomere runs Z to Z and is the basic contractile unit.",
       "The H zone sits inside the A band at the centre.",
       "The A band is only the thick-filament region."
      ],
      "h": "Z = the end, M = the middle."
     },
     {
      "q": "'Excitation-contraction coupling' refers to:",
      "o": [
       "How ATP is made",
       "Converting the nerve's action potential into a mechanical contraction",
       "Recruiting motor units by size",
       "Muscle growth after training"
      ],
      "a": 1,
      "w": [
       "ATP production is bioenergetics.",
       "Correct. Like a switch turning electric current into the turning of a fan's blades: signal, then calcium release, then cross-bridges.",
       "That is Henneman's size principle.",
       "That is hypertrophy."
      ],
      "h": "Excitation (electric) is coupled to contraction (mechanical)."
     },
     {
      "q": "During the power stroke, actin is pulled toward the:",
      "o": [
       "Z-line",
       "M-line (centre of the sarcomere)",
       "Sarcoplasmic reticulum",
       "Tendon"
      ],
      "a": 1,
      "w": [
       "Actin is anchored AT the Z-line; it is pulled away from it toward the centre.",
       "Correct. Myosin heads pivot and pull the thin filaments toward the M-line, shortening the sarcomere.",
       "The SR stores calcium; it is not a target of movement.",
       "The tendon is outside the sarcomere."
      ],
      "h": "Rowers pull the rope to the Middle."
     }
    ]
   },
   {
    "id": "e103-skeletal",
    "title": "Skeletal System & Joints",
    "fact": "The patella is a sesamoid bone that forms inside the quadriceps tendon. Babies' kneecaps are mostly cartilage, which turns to bone over the first years of life.",
    "primer": [
     "Axial = skull, spine, ribs, sternum. Appendicular = girdles and limbs.",
     "Osteoblasts build bone; osteoclasts break it down. Wolff's law: bone adapts to the load placed on it.",
     "Six synovial joints: plane, hinge, pivot, condyloid, saddle, ball and socket. Shoulder = most mobile; hip = most stable."
    ],
    "qs": [
     {
      "q": "Which bone cells BUILD new bone?",
      "o": [
       "Osteoclasts",
       "Osteoblasts",
       "Chondrocytes",
       "Osteocytes in marrow only"
      ],
      "a": 1,
      "w": [
       "Osteoclasts break down (resorb) bone.",
       "Correct. Osteoblasts lay down new bone. Loading the skeleton shifts the balance toward them.",
       "Chondrocytes are cartilage cells.",
       "Osteocytes are mature bone cells; the course pair to know is blasts versus clasts."
      ],
      "h": "Blasts Build, Clasts Crush."
     },
     {
      "q": "Wolff's law states that:",
      "o": [
       "Bone adapts to the loads placed on it",
       "Bones stop growing at age 12",
       "Ligaments connect muscle to bone",
       "Bone density is purely genetic"
      ],
      "a": 0,
      "w": [
       "Correct. Compressive loading (squats, presses) builds denser bone, which is the basis of strength training for bone health.",
       "Growth plates close around 18 to 21 years.",
       "Ligaments connect bone to bone.",
       "Density is strongly affected by loading, minerals, vitamin D and hormones."
      ],
      "h": "Wolff = Work it, it Wises up."
     },
     {
      "q": "The patella is an example of which bone type?",
      "o": [
       "Long",
       "Flat",
       "Irregular",
       "Sesamoid"
      ],
      "a": 3,
      "w": [
       "Long bones are longer than wide: femur, humerus.",
       "Flat bones protect: skull, sternum, scapula.",
       "Irregular bones include the vertebrae and sacrum.",
       "Correct. Sesamoid bones form inside a tendon crossing a joint; the patella sits in the quadriceps tendon."
      ],
      "h": "Little Students Find It Silly: Long, Short, Flat, Irregular, Sesamoid."
     },
     {
      "q": "Which joint is the most mobile but structurally the least stable?",
      "o": [
       "Hip",
       "Knee",
       "Shoulder",
       "Elbow"
      ],
      "a": 2,
      "w": [
       "The hip is ball and socket but has a deep acetabulum, making it the most stable.",
       "The knee is a modified hinge.",
       "Correct. The shallow glenoid gives huge range, so the rotator cuff must supply stability.",
       "The elbow is a hinge: one plane only."
      ],
      "h": "The shoulder trades stability for mobility; the hip trades mobility for stability."
     },
     {
      "q": "The atlas–axis joint (turning your head 'no') is a:",
      "o": [
       "Hinge joint",
       "Pivot joint",
       "Saddle joint",
       "Condyloid joint"
      ],
      "a": 1,
      "w": [
       "Hinge joints flex and extend, like the elbow.",
       "Correct. Pivot joints rotate around an axis, like C1 on C2 or the radioulnar joint.",
       "The saddle joint is at the thumb.",
       "Condyloid joints include the knuckles and wrist."
      ],
      "h": "People Hate Pickles, Cats Steal Burgers: Plane, Hinge, Pivot, Condyloid, Saddle, Ball."
     },
     {
      "q": "Does supervised resistance training in children stunt their growth?",
      "o": [
       "Yes, it damages the growth plates",
       "Only after age 10",
       "No. With good technique and sensible volume it strengthens bones and height is unaffected",
       "Yes, for girls only"
      ],
      "a": 2,
      "w": [
       "This is the myth the lecture busts.",
       "There is no such age cut-off in the course.",
       "Correct. Properly coached training makes bones stronger and denser.",
       "There is no sex difference in this myth either."
      ],
      "h": "Lifting builds bones; it doesn't shrink kids."
     },
     {
      "q": "Where does growth in bone length happen?",
      "o": [
       "Periosteum",
       "Diaphysis",
       "Epiphyseal (growth) plate",
       "Articular cartilage"
      ],
      "a": 2,
      "w": [
       "The periosteum is the fibrous membrane covering the bone.",
       "The diaphysis is the shaft.",
       "Correct. The cartilage plate between the epiphysis and diaphysis drives height growth and closes around 18 to 21 years.",
       "Articular cartilage covers joint surfaces for frictionless movement."
      ],
      "h": "Growth plate = the growing place."
     },
     {
      "q": "Who is at greatest risk of osteoporosis?",
      "o": [
       "Young men who lift",
       "Post-menopausal women",
       "Teenage athletes",
       "Swimmers in their 20s"
      ],
      "a": 1,
      "w": [
       "Lifting protects bone.",
       "Correct. Oestrogen protects bone, and it falls after menopause. Age and family history also add risk.",
       "Teenagers are building peak bone mass.",
       "Not the high-risk group named in the course."
      ],
      "h": "Osteo-POROSIS = porous bone; oestrogen is the shield."
     },
     {
      "q": "Which statement about the wrist is exam-correct?",
      "o": [
       "The wrist is a pivot joint",
       "The wrist is a condyloid joint; palm turning happens at the radioulnar pivot joint",
       "The wrist is a hinge joint",
       "The wrist is a saddle joint"
      ],
      "a": 1,
      "w": [
       "The lecture slipped here. Turning the palm is the radioulnar joint, not the wrist.",
       "Correct. The wrist (radiocarpal) is condyloid: flexion, extension and side-to-side deviation.",
       "A hinge allows only one plane; the wrist moves in two.",
       "The saddle joint is at the base of the thumb."
      ],
      "h": "Wrist = condyloid; palm flip = radioulnar pivot."
     }
    ]
   },
   {
    "id": "e103-cvns",
    "title": "Cardiovascular & Nervous System",
    "fact": "Your heart beats roughly 100,000 times a day. The left ventricle wall is the thickest because it pushes blood around the whole body.",
    "primer": [
     "Arteries carry blood AWAY from the heart; veins carry it back. The pulmonary artery carries deoxygenated blood.",
     "BP is the pressure against artery walls. Systolic (contraction) under 120; diastolic (relaxation) under 80 mmHg.",
     "Nervous system: CNS (brain and spinal cord) and PNS. The PNS splits into somatic (voluntary) and autonomic (sympathetic: fight or flight; parasympathetic: rest and digest)."
    ],
    "qs": [
     {
      "q": "Arteries are defined as vessels that:",
      "o": [
       "Always carry oxygenated blood",
       "Carry blood away from the heart",
       "Carry blood toward the heart",
       "Exchange gases with tissues"
      ],
      "a": 1,
      "w": [
       "The pulmonary artery carries DEOXYGENATED blood, so oxygen is not the rule.",
       "Correct. The definition is about direction: Away from the heart.",
       "Toward the heart is a VEIN.",
       "Gas exchange happens in capillaries."
      ],
      "h": "A for Away."
     },
     {
      "q": "Systolic blood pressure is the pressure when:",
      "o": [
       "The heart relaxes between beats",
       "The left ventricle contracts and pushes blood out",
       "The atria fill",
       "Blood returns to the right atrium"
      ],
      "a": 1,
      "w": [
       "That is DIASTOLIC, the lower number.",
       "Correct. Systole means squeeze. It is the higher number, normally under 120 mmHg.",
       "Atrial filling is part of diastole.",
       "That describes venous return, not systolic pressure."
      ],
      "h": "S for Squeeze, D for Down-time."
     },
     {
      "q": "Which route is the pulmonary circulation?",
      "o": [
       "Left ventricle, aorta, body",
       "Right ventricle, pulmonary artery, lungs, pulmonary veins, left atrium",
       "Right atrium, body, left atrium",
       "Left atrium, lungs, right ventricle"
      ],
      "a": 1,
      "w": [
       "That is the start of the SYSTEMIC circulation.",
       "Correct. Deoxygenated blood goes to the lungs, CO₂ goes out and O₂ comes in, and the blood returns to the left side.",
       "Not a real route.",
       "The direction is reversed."
      ],
      "h": "Pulmonary = Puff (lungs); Systemic = the whole System."
     },
     {
      "q": "The 'fight or flight' branch of the nervous system is the:",
      "o": [
       "Somatic",
       "Parasympathetic",
       "Sympathetic",
       "Central"
      ],
      "a": 2,
      "w": [
       "Somatic is voluntary control of skeletal muscle.",
       "Parasympathetic is rest and digest: calming and conserving energy.",
       "Correct. The sympathetic branch of the autonomic system prepares the body for action and stress.",
       "The central nervous system is the brain and spinal cord."
      ],
      "h": "SYMpathetic = Stress and Sprint; PARAsympathetic = PARAchute down."
     },
     {
      "q": "Which part of the brain coordinates balance, timing and precision?",
      "o": [
       "Cerebrum",
       "Cerebellum",
       "Brain stem",
       "Spinal cord"
      ],
      "a": 1,
      "w": [
       "The cerebrum handles thinking, memory and voluntary movement.",
       "Correct. Cerebellum is Latin for 'little brain'; it handles coordination and posture.",
       "The brain stem regulates heart rate, breathing and sleep.",
       "The spinal cord is the message pathway."
      ],
      "h": "CereBELLum = BALance; CereBRUM = BRAINy."
     },
     {
      "q": "Sensory neurons carry signals:",
      "o": [
       "From the CNS to the muscles",
       "From the body to the CNS",
       "Only within the brain",
       "Between muscles directly"
      ],
      "a": 1,
      "w": [
       "That is the MOTOR neuron's job.",
       "Correct. Feeling the heat of a kettle travels IN to the CNS. Motor neurons then send the 'pull away' command OUT.",
       "Interneurons work inside the CNS; the course pair is sensory versus motor.",
       "Muscles don't signal each other through sensory neurons."
      ],
      "h": "Sensory = Signals to the Spine (in); Motor = Moves the Muscle (out)."
     },
     {
      "q": "Which is NOT a function of the cardiovascular system listed in the course?",
      "o": [
       "Transporting hormones",
       "Regulating body temperature",
       "Producing red blood cells in the heart",
       "Clotting to stop bleeding"
      ],
      "a": 2,
      "w": [
       "Transporting hormones is listed.",
       "Temperature regulation and homeostasis are listed.",
       "Correct, this is the odd one out. Red blood cells are made in RED BONE MARROW, not the heart.",
       "Clotting is listed."
      ],
      "h": "O-N-W-I-T-H-C: Oxygen, Nutrients, Waste, Immunity, Temperature, Hormones, Clotting."
     }
    ]
   },
   {
    "id": "e103-endo",
    "title": "The Endocrine System",
    "fact": "Growth hormone is released in pulses. The biggest pulse usually comes in deep sleep, which is one reason sleep matters for recovery.",
    "primer": [
     "A hormone is a chemical messenger carried in the BLOOD to a target organ. Nervous signals are fast and short-lived; hormones are slow and long-lasting.",
     "Pancreas: beta cells make insulin (lowers sugar); alpha cells make glucagon (raises sugar).",
     "Leptin (from fat cells) = full. Ghrelin (from the stomach) = hungry. T4 converts to the active T3."
    ],
    "qs": [
     {
      "q": "Growth hormone's alternative name is:",
      "o": [
       "Somatostatin",
       "Somatotropin",
       "Thyroxine",
       "Cortisol"
      ],
      "a": 1,
      "w": [
       "Somatostatin INHIBITS growth hormone release. It is a classic distractor.",
       "Correct. Soma = body, tropin = grower. GH comes from the pituitary.",
       "Thyroxine is T4, from the thyroid.",
       "Cortisol is a stress hormone from the adrenal cortex."
      ],
      "h": "Somato-TROPIN = body-grower."
     },
     {
      "q": "Insulin is produced by which cells of the pancreas?",
      "o": [
       "Alpha cells",
       "Beta cells",
       "Delta cells",
       "Islet macrophages"
      ],
      "a": 1,
      "w": [
       "Alpha cells make GLUCAGON, which raises blood sugar.",
       "Correct. Beta cells release insulin when blood sugar rises, moving glucose into liver, muscle and fat cells.",
       "Delta cells are not part of the course pair.",
       "Not hormone-producing cells."
      ],
      "h": "Beta brings sugar down; Alpha adds sugar."
     },
     {
      "q": "Glucagon raises blood sugar mainly through:",
      "o": [
       "Lipogenesis",
       "Glycogenolysis and gluconeogenesis",
       "Protein synthesis",
       "Insulin release"
      ],
      "a": 1,
      "w": [
       "Lipogenesis is fat storage.",
       "Correct. Glycogen is split into glucose in the liver, and new glucose is made from non-carbohydrate sources.",
       "Glucagon doesn't build protein; it releases and makes glucose.",
       "Glucagon opposes insulin's effect."
      ],
      "h": "Glyco-geno-LYSIS = split glycogen; gluco-NEO-genesis = new glucose."
     },
     {
      "q": "Which hormone signals SATIETY ('I'm full')?",
      "o": [
       "Ghrelin",
       "Leptin",
       "Glucagon",
       "Adrenaline"
      ],
      "a": 1,
      "w": [
       "Ghrelin, from the stomach, signals HUNGER.",
       "Correct. Leptin is made by fat cells. In obesity the brain can become leptin resistant.",
       "Glucagon raises blood sugar.",
       "Adrenaline is a fight-or-flight hormone."
      ],
      "h": "LEPtin = LEave the table; GHRELIN = the GRRR of a growling stomach."
     },
     {
      "q": "Testosterone and oestrogen belong to which hormone class?",
      "o": [
       "Peptide",
       "Amino-acid derivative",
       "Steroid (made from cholesterol)",
       "Protein"
      ],
      "a": 2,
      "w": [
       "Peptide hormones include insulin and GH.",
       "Amino-acid derivatives include adrenaline and thyroid hormones.",
       "Correct. Sex hormones are steroids built from cholesterol.",
       "Protein hormones are chains of amino acids, like insulin."
      ],
      "h": "Sex hormones are Steroids, made from Cholesterol."
     },
     {
      "q": "Which thyroid hormone is the ACTIVE form?",
      "o": [
       "T4 (thyroxine)",
       "T3 (triiodothyronine)",
       "TSH",
       "Calcitonin"
      ],
      "a": 1,
      "w": [
       "T4 is the main hormone released and is longer-lived, but it is converted into T3.",
       "Correct. T4 is converted into T3 inside cells. The thyroid needs iodine to make them.",
       "TSH is a pituitary hormone that stimulates the thyroid.",
       "Calcitonin regulates calcium."
      ],
      "h": "T4 = the Store; T3 = the Tool."
     },
     {
      "q": "Over 24 hours, what decides whether someone gains or loses fat?",
      "o": [
       "Whether they eat carbs at night",
       "Insulin levels alone",
       "Energy balance (calorie surplus or deficit)",
       "The number of meals"
      ],
      "a": 2,
      "w": [
       "Meal timing is not the deciding factor.",
       "This is the lecture's insulin myth. Insulin rises after meals, but fat breakdown rises during fasting and sleep.",
       "Correct. Fat storage and fat breakdown both happen through the day; the net comes down to energy balance.",
       "Meal frequency doesn't override energy balance."
      ],
      "h": "Insulin is a bookkeeper; energy balance is the bank balance."
     },
     {
      "q": "Testosterone levels typically peak:",
      "o": [
       "In the late evening",
       "In the morning",
       "After lunch",
       "Only after training"
      ],
      "a": 1,
      "w": [
       "Levels fall through the day.",
       "Correct. Testosterone follows a circadian rhythm regulated by sleep and is highest in the morning.",
       "After lunch levels are already falling; the peak is in the morning.",
       "Training can raise it briefly, but the daily peak is in the morning."
      ],
      "h": "T for Top of the morning."
     }
    ]
   },
   {
    "id": "e103-exphys",
    "title": "Exercise Physiology",
    "fact": "Elite endurance athletes can have a VO₂max above 80 ml/kg/min, roughly double an average untrained adult.",
    "primer": [
     "Acute = an immediate response in a session; chronic = long-term adaptation over months.",
     "The 4 acute responses: more blood supply (vasodilation), higher muscle temperature, more pliability, micro-tears.",
     "Cardiac output = HR × SV. Stroke volume plateaus at about 40–60% of VO₂max. Systolic BP climbs; diastolic stays about the same."
    ],
    "qs": [
     {
      "q": "Cardiac output is calculated as:",
      "o": [
       "HR + SV",
       "HR × SV",
       "SV ÷ HR",
       "HR × BP"
      ],
      "a": 1,
      "w": [
       "It is a product, not a sum.",
       "Correct. Heart rate times stroke volume: how often times how much.",
       "Dividing gives nothing meaningful here.",
       "Blood pressure isn't part of the formula."
      ],
      "h": "Q = how Often × how Much."
     },
     {
      "q": "As exercise intensity rises, diastolic blood pressure:",
      "o": [
       "Rises in a straight line",
       "Falls sharply",
       "Stays roughly constant",
       "Doubles"
      ],
      "a": 2,
      "w": [
       "That is what SYSTOLIC does.",
       "Diastolic doesn't fall sharply; it stays roughly constant.",
       "Correct. Systolic soars; diastolic doesn't change much.",
       "Diastolic doesn't double; it stays roughly constant while systolic climbs."
      ],
      "h": "Systolic Soars, Diastolic Doesn't."
     },
     {
      "q": "Stroke volume plateaus at about what intensity?",
      "o": [
       "10–20% VO₂max",
       "40–60% VO₂max",
       "80–90% VO₂max",
       "It never plateaus"
      ],
      "a": 1,
      "w": [
       "Too early. SV keeps rising until about 40–60% VO₂max.",
       "Correct. Above this point, further increases in cardiac output come from heart rate alone.",
       "Heart rate keeps climbing here, but stroke volume has already levelled off.",
       "It does plateau, at about 40–60% VO₂max. After that, HR drives cardiac output."
      ],
      "h": "SV stops at about half; HR keeps going."
     },
     {
      "q": "Which is called the only POSITIVE stressor the body faces?",
      "o": [
       "Disease",
       "Anxiety",
       "Exercise",
       "Trauma"
      ],
      "a": 2,
      "w": [
       "Disease is a negative stressor.",
       "Anxiety is a negative stressor.",
       "Correct. Exercise is applied intentionally to produce acute responses and chronic adaptations.",
       "Trauma is a negative stressor."
      ],
      "h": "Exercise = the stress you choose."
     },
     {
      "q": "Increased blood supply to working muscles happens through:",
      "o": [
       "Vasoconstriction",
       "Vasodilation",
       "Lower heart rate",
       "Holding the breath"
      ],
      "a": 1,
      "w": [
       "Vasoconstriction NARROWS vessels and reduces flow.",
       "Correct. Vessels widen to deliver more O₂ and glucose and remove CO₂ and waste.",
       "Heart rate rises during exercise.",
       "Not a mechanism for blood supply."
      ],
      "h": "Dilate = Deliver more."
     },
     {
      "q": "VO₂max is best described as:",
      "o": [
       "Maximum heart rate",
       "The maximum volume of oxygen the body can take in and use",
       "Lung volume at rest",
       "Resting oxygen use"
      ],
      "a": 1,
      "w": [
       "Max heart rate is a separate measure.",
       "Correct. It is largely genetic, trainable within limits, and measured most accurately in a lab graded test.",
       "Lung volume is a different measure.",
       "Resting use is about 1 MET (3.5 ml/kg/min)."
      ],
      "h": "VO₂max = the size of your oxygen engine."
     },
     {
      "q": "Which is a CHRONIC adaptation, not an acute response?",
      "o": [
       "Higher muscle temperature",
       "Vasodilation during a set",
       "Lower heart rate at the same workload after months of training",
       "Increased breathing rate during a run"
      ],
      "a": 2,
      "w": [
       "This happens within a session, so it is acute.",
       "This happens during a session, so it's an ACUTE response.",
       "Correct. The heart becomes more efficient over months: the same work at a lower HR.",
       "Faster breathing during a run is ACUTE; it settles after the session."
      ],
      "h": "Acute = A session; Chronic = Calendar."
     },
     {
      "q": "Which is classed as SKILL-related rather than health-related fitness?",
      "o": [
       "Flexibility",
       "Body composition",
       "Power",
       "Muscular endurance"
      ],
      "a": 2,
      "w": [
       "Flexibility is health-related.",
       "Body composition is health-related.",
       "Correct. Power (strength × speed) is skill-related. The lecture listed it in both lists, but the exam-safe answer is skill.",
       "Muscular endurance is health-related."
      ],
      "h": "Power = performance."
     }
    ]
   }
  ]
 },
 {
  "id": "E106",
  "name": "Training Variables & Techniques",
  "kind": "mcq",
  "color": "#3b82f6",
  "blurb": "FITT, progressive overload, volume, intensity, cardio zones, hypertrophy drivers and fat loss.",
  "topics": [
   {
    "id": "e106-fitt",
    "title": "FITT & Progressive Overload",
    "fact": "A powerlifter who runs 10 km a day won't squat much more. The SAID principle says you get better at exactly what you train.",
    "primer": [
     "FITT = Frequency, Intensity, Time, Type. Choose the goal first, then the type (SAID).",
     "Frequency = how often a MUSCLE or exercise is trained per week, not the number of gym days.",
     "Progressive overload = doing more work over time, through any FITT variable, but never at the cost of form or range of motion."
    ],
    "qs": [
     {
      "q": "SAID stands for:",
      "o": [
       "Speed, Agility, Intensity, Duration",
       "Specific Adaptations to Imposed Demands",
       "Sets And Intensity Determine",
       "Strength Adapts In Days"
      ],
      "a": 1,
      "w": [
       "These are fitness words, not the principle.",
       "Correct. You adapt to what you actually do: runners improve by running, lifters by lifting.",
       "Invented expansion. SAID = Specific Adaptations to Imposed Demands.",
       "Invented expansion. SAID = Specific Adaptations to Imposed Demands."
      ],
      "h": "SAID: you get what you train."
     },
     {
      "q": "On a 6-day push/pull/legs split, what is the chest training FREQUENCY?",
      "o": [
       "6",
       "3",
       "2",
       "1"
      ],
      "a": 2,
      "w": [
       "That is the number of training DAYS, not frequency.",
       "Push day only appears twice a week.",
       "Correct. Chest is trained on push days, for example Monday and Thursday, so the frequency is 2.",
       "Push happens twice in a 6-day PPL."
      ],
      "h": "Frequency counts the MUSCLE, not the gym visits."
     },
     {
      "q": "Which is a valid way to measure RESISTANCE-training intensity?",
      "o": [
       "% of VO₂max",
       "METs",
       "% of 1RM, RPE or RIR",
       "Karvonen formula"
      ],
      "a": 2,
      "w": [
       "That is a cardio measure.",
       "METs are an energy-cost unit used mainly for cardio and activity.",
       "Correct. Weights use %1RM, RPE, reps in reserve or bar velocity.",
       "Karvonen sets target heart rate for cardio."
      ],
      "h": "Cardio = Heart (HR, VO₂, METs); weights = Weight (%1RM, RPE, RIR)."
     },
     {
      "q": "On the US DHHS %VO₂max scale, 'hard' intensity is:",
      "o": [
       "25–44%",
       "45–59%",
       "60–84%",
       "≥85%"
      ],
      "a": 2,
      "w": [
       "That is light.",
       "That is moderate.",
       "Correct. Very light <25, light 25–44, moderate 45–59, hard 60–84, very hard ≥85.",
       "That is very hard."
      ],
      "h": "Moderate 45–59, Hard 60–84."
     },
     {
      "q": "Resistance-training volume (tonnage) is calculated as:",
      "o": [
       "Load × reps × sets",
       "Sets + reps",
       "Load ÷ reps",
       "Reps × rest time"
      ],
      "a": 0,
      "w": [
       "Correct. For example, 3 sets × 10 reps × 50 kg = 1,500 kg.",
       "Not multiplied, and load is missing.",
       "Dividing load by reps doesn't measure total work; volume multiplies load × reps × sets.",
       "Rest isn't part of volume."
      ],
      "h": "Volume = how heavy × how many × how often in the session."
     },
     {
      "q": "Which is NOT an acceptable form of progressive overload?",
      "o": [
       "More range of motion at the same weight",
       "Same weight, faster bar speed with good form",
       "Adding weight while cutting the squat to a quarter rep",
       "Adding a training session per week"
      ],
      "a": 2,
      "w": [
       "More ROM at the same weight IS valid overload, so it's not the answer here.",
       "Moving the same load faster with good form IS valid overload.",
       "Correct, this is the unacceptable one. Overload must never sacrifice form or ROM, so 110 kg quarter squats are not progress from 100 kg parallel squats.",
       "Adding a session raises frequency, which IS valid overload."
      ],
      "h": "Overload = More, Better, Harder, Longer, never Sloppier."
     },
     {
      "q": "For a very busy client, which session length best supports adherence?",
      "o": [
       "90 minutes, 6 days a week",
       "30–45 minutes they can always do",
       "As long as possible on weekends only",
       "10 minutes twice a month"
      ],
      "a": 1,
      "w": [
       "Unsustainable for someone working long hours.",
       "Correct. Sustainable time beats ambitious time they keep missing.",
       "Cramming everything into weekends hurts recovery.",
       "Too little to drive adaptation."
      ],
      "h": "The best plan is the one they show up for."
     }
    ]
   },
   {
    "id": "e106-rtvars",
    "title": "Resistance-Training Variables",
    "fact": "Only the last 4–5 reps of a hard set are 'effective reps'. A 20-rep set taken nowhere near failure is mostly fatigue.",
    "primer": [
     "Volume measures: TVL (sets × reps × load), repetition volume, relative volume (× %1RM), and SET VOLUME, the most practical.",
     "A set counts when taken close to failure (about RPE 7–8+). About 10–12 sets per muscle per session is the useful ceiling.",
     "Intensity and reps are inversely related. 1–5 reps = high, 6–12 = moderate, 12+ = low intensity."
    ],
    "qs": [
     {
      "q": "Which volume measure is described as the MOST practical?",
      "o": [
       "Training volume load (tonnage)",
       "Repetition volume",
       "Relative volume",
       "Set volume (hard sets per muscle per week)"
      ],
      "a": 3,
      "w": [
       "Popular in research, but it can't compare exercises like squat and leg press.",
       "Ignores load completely.",
       "Theoretical, and relies on rep-max tables.",
       "Correct. It is comparable across muscles and exercises, as long as the sets are taken close to failure."
      ],
      "h": "Count the hard sets."
     },
     {
      "q": "Why can't TVL compare a squat with a leg press?",
      "o": [
       "The leg press uses more muscle and is more stable, so its tonnage is inflated",
       "Squats are always heavier",
       "TVL ignores sets",
       "TVL only works for upper body"
      ],
      "a": 0,
      "w": [
       "Correct. You can leg press far more weight, so tonnage across different exercises is meaningless.",
       "Usually the opposite: people leg press far more than they squat, which inflates leg-press tonnage.",
       "TVL includes sets.",
       "TVL applies to any exercise; its limit is comparing DIFFERENT exercises."
      ],
      "h": "Tonnage only compares like with like."
     },
     {
      "q": "Muscle protein synthesis after training returns to baseline in roughly:",
      "o": [
       "2–4 hours",
       "18–36 hours (lecture figure)",
       "5–7 days",
       "2 weeks"
      ],
      "a": 1,
      "w": [
       "Too short. MPS stays up for about 18–36 h (lecture figure).",
       "Correct. That is the logic behind training a muscle again every 2 to 3 days.",
       "Too long. MPS returns to baseline within about 18–36 h.",
       "Far too long. MPS returns to baseline within about 18–36 h."
      ],
      "h": "MPS window is about a day and a half: hit it again."
     },
     {
      "q": "Compared with advanced lifters, beginners can get away with:",
      "o": [
       "Higher frequency",
       "LOWER frequency, because their MPS stays elevated longer",
       "No rest days",
       "Only isolation work"
      ],
      "a": 1,
      "w": [
       "The opposite. Advanced lifters reset faster and benefit from more frequency.",
       "Correct. A beginner's MPS can stay up to about 48 hours.",
       "Recovery always matters; this question is about how often to train a muscle.",
       "Exercise type isn't the point; beginners need less FREQUENCY because their MPS lasts longer."
      ],
      "h": "Beginners linger; veterans reset fast."
     },
     {
      "q": "High intensity (1–5 reps) is IDEAL for:",
      "o": [
       "Muscular endurance",
       "Maximal strength",
       "Cardio fitness",
       "Metabolic stress"
      ],
      "a": 1,
      "w": [
       "Endurance comes from lower intensity and higher reps.",
       "Correct. It gives maximum tension and force with few reps, like powerlifting.",
       "Heavy 1–5 rep sets don't train the cardio system; they build strength.",
       "Metabolic stress builds with higher reps and short rest."
      ],
      "h": "Heavy = Tension; Light = Toxins (metabolites)."
     },
     {
      "q": "The course's rep and load recommendation for HYPERTROPHY is:",
      "o": [
       "Only 1–3 reps at 95%",
       "6–30 reps at ≥50% of 1RM, close to failure",
       "50+ reps at 20%",
       "8 reps exactly, at any load"
      ],
      "a": 1,
      "w": [
       "That is strength-specific.",
       "Correct. A wide rep range works if sets are taken close to failure. Below about 50% is more of a warm-up.",
       "Below the effective load.",
       "There is no magic rep number."
      ],
      "h": "Hypertrophy is a wide road: 6–30 reps, near failure."
     },
     {
      "q": "What makes a set count as an 'effective / working set'?",
      "o": [
       "It lasts 60 seconds",
       "It is taken close to failure (about RPE 7–8 or higher)",
       "It uses a machine",
       "It has exactly 10 reps"
      ],
      "a": 1,
      "w": [
       "Time isn't the criterion.",
       "Correct. Easy sets far from failure don't count towards set volume.",
       "Any modality can count.",
       "Rep count alone doesn't decide it."
      ],
      "h": "If it wasn't hard, it doesn't count."
     }
    ]
   },
   {
    "id": "e106-cardio",
    "title": "Cardio Fitness Techniques",
    "fact": "A 20-year-old with a resting heart rate of 70 who wants 65–75% intensity should train at about 155–168 bpm (Karvonen).",
    "primer": [
     "APMHR = 220 − age. Karvonen: THR = (APMHR − HRrest) × % + HRrest.",
     "Talk test: chatting means under RPE 4; a struggle to talk means RPE 4–7; can't speak means RPE 7–10.",
     "PDF zones: Green 65–75% HRmax (LISS), Yellow 76–85% (MICT), Red 86–95% (intervals). HIIT is time-efficient but not for beginners."
    ],
    "qs": [
     {
      "q": "Using Karvonen: age 40, resting HR 60, at 70% intensity. Target HR = ?",
      "o": [
       "126 bpm",
       "144 bpm",
       "154 bpm",
       "168 bpm"
      ],
      "a": 1,
      "w": [
       "That would be 70% of 180 without adding back the resting HR.",
       "Correct. APMHR = 180. Reserve = 180 − 60 = 120. 120 × 0.7 = 84. 84 + 60 = 144 bpm.",
       "154 isn't right: reserve 120 × 0.7 = 84, plus 60 = 144.",
       "168 is too high. Reserve 120 × 0.7 = 84, plus resting 60 = 144."
      ],
      "h": "Reserve = Max − Rest; take your %, then add Rest back."
     },
     {
      "q": "Age-predicted max heart rate for a 30-year-old is:",
      "o": [
       "200",
       "190",
       "180",
       "170"
      ],
      "a": 1,
      "w": [
       "That is for a 20-year-old.",
       "Correct. 220 − 30 = 190. Treat it as a general guide only.",
       "That is for a 40-year-old.",
       "That is for a 50-year-old."
      ],
      "h": "220 minus age."
     },
     {
      "q": "A client can hold a conversation but it's a little bit of a struggle. RPE is about:",
      "o": [
       "Under 4",
       "4–7",
       "7–10",
       "10 only"
      ],
      "a": 1,
      "w": [
       "Under 4 is easy conversation.",
       "Correct. A little struggle to keep talking means RPE 4–7.",
       "7–10 means they can't speak properly.",
       "RPE 10 is maximal effort, when talking is impossible."
      ],
      "h": "Chat < 4, Choppy 4–7, Can't 7–10."
     },
     {
      "q": "In the course PDF's zone table, LISS sits in which zone?",
      "o": [
       "Green (65–75% HRmax)",
       "Yellow (76–85% HRmax)",
       "Red (86–95% HRmax)",
       "Blue (95–100%)"
      ],
      "a": 0,
      "w": [
       "Correct. Green = LISS (low-intensity steady state), RPE 4–5. Note the lecture used slightly different numbers (LISS ≤65%), so read options carefully.",
       "Yellow is MICT.",
       "Red is used in intervals.",
       "There's no blue zone. The course zones are green, yellow and red."
      ],
      "h": "Traffic light: Green go easy, Yellow steady, Red all-out bursts."
     },
     {
      "q": "Which client should NOT be given HIIT as their main cardio?",
      "o": [
       "A fit, experienced trainee short on time",
       "A deconditioned beginner",
       "A trained cyclist",
       "An intermediate lifter who enjoys intervals"
      ],
      "a": 1,
      "w": [
       "A good HIIT candidate.",
       "Correct. Beginners struggle with recovery and adherence, so start with LISS and MICT.",
       "A good candidate.",
       "Fine in moderation."
      ],
      "h": "HIIT is a spice, not the main course for beginners."
     },
     {
      "q": "Circuit training is a poor choice when the client's primary goal is:",
      "o": [
       "Saving time",
       "Muscular endurance",
       "Power",
       "Cardio fitness"
      ],
      "a": 2,
      "w": [
       "Circuits are time-efficient.",
       "Circuits suit muscular endurance.",
       "Correct. Power needs full recovery and quality reps. Also avoid circuits for people still struggling with technique.",
       "Circuits do build cardio fitness."
      ],
      "h": "Circuits: time-poor, toning, ticker ✔; power or poor form ✘."
     },
     {
      "q": "%HRR and %VO₂max are:",
      "o": [
       "Roughly the same numbers",
       "Always 20% apart",
       "Unrelated",
       "Identical to %HRmax"
      ],
      "a": 0,
      "w": [
       "Correct. %HRR tracks %VO₂max closely, while %HRmax runs higher (e.g. 50% HRR ≈ 66% HRmax).",
       "They aren't 20% apart; %HRR tracks %VO₂max almost exactly.",
       "They're closely linked.",
       "%HRmax runs a step ahead."
      ],
      "h": "HRR and VO₂ walk together; HRmax is a step ahead."
     }
    ]
   },
   {
    "id": "e106-hyper",
    "title": "Muscle-Building Considerations",
    "fact": "Soreness is not a growth meter. Thanks to the 'repeated-bout effect', soreness drops within weeks even while muscles keep growing.",
    "primer": [
     "3 drivers: mechanical tension (primary) > metabolic stress (supporting) > muscle damage (a by-product).",
     "4 variables: Frequency, Intensity, Volume, Modality. 10–20 hard sets per muscle per week.",
     "Moderate 65–85% 1RM is best for hypertrophy. Train each muscle 2–3× a week; to failure only about once a month."
    ],
    "qs": [
     {
      "q": "The PRIMARY driver of hypertrophy is:",
      "o": [
       "Muscle damage",
       "Metabolic stress",
       "Mechanical tension",
       "DOMS"
      ],
      "a": 2,
      "w": [
       "The oldest theory, now seen as a by-product of tension.",
       "Supporting, and debated.",
       "Correct. Load deforms the fibre, mechanotransduction signals mTOR, and MPS rises.",
       "Soreness is a symptom, not a driver."
      ],
      "h": "Tension triggers, Stress supports, Damage doesn't have to."
     },
     {
      "q": "Metabolic stress refers to:",
      "o": [
       "Tears in the muscle fibre",
       "A build-up of metabolites such as lactate and H⁺ during fatiguing work",
       "Heavy load on a single rep",
       "Bone loading"
      ],
      "a": 1,
      "w": [
       "That is muscle damage.",
       "Correct. It causes cell swelling (the pump). The acidity comes from H⁺, not lactate itself.",
       "That is mechanical tension.",
       "Bone loading builds bone density, not muscle metabolic stress."
      ],
      "h": "Burn, Block, Balloon, Brace."
     },
     {
      "q": "The lecture's optimal weekly volume per muscle for hypertrophy is:",
      "o": [
       "2–4 sets",
       "10–20 sets",
       "40–50 sets",
       "100 sets"
      ],
      "a": 1,
      "w": [
       "Too low for most.",
       "Correct. More sets help, with diminishing returns; too much hurts recovery.",
       "Junk-volume territory.",
       "100 sets a week is far beyond what anyone can recover from; the optimum is 10–20."
      ],
      "h": "Ten to twenty, then plenty."
     },
     {
      "q": "Which intensity band does the course call BEST for hypertrophy?",
      "o": [
       "<60% 1RM",
       "65–85% 1RM",
       "90–100% 1RM",
       "Bodyweight only"
      ],
      "a": 1,
      "w": [
       "Too little high-threshold motor-unit recruitment.",
       "Correct. It gives a wide spread of fibres plus enough volume: tension AND metabolic stress.",
       "Maximal tension but too little volume and metabolic stress.",
       "Bodyweight can work, but the course answer is a load band: 65–85% 1RM."
      ],
      "h": "Middle is the money."
     },
     {
      "q": "BFR (blood-flow restriction) training is useful because it:",
      "o": [
       "Lets you lift your 1RM more often",
       "Produces significant growth with LIGHT loads, which is useful in rehab",
       "Removes the need for protein",
       "Prevents all soreness"
      ],
      "a": 1,
      "w": [
       "The opposite: it uses light loads.",
       "Correct. Typical loads are 20–40% 1RM with partial occlusion. Screen for clot risk and hypertension.",
       "Nutrition still matters.",
       "BFR's value is growth with light loads; the course makes no claim about soreness."
      ],
      "h": "BFR = Big results, From light loads."
     },
     {
      "q": "Why does training a muscle 2–3× per week beat a once-a-week 'bro split'?",
      "o": [
       "MPS stays elevated about 48 hours, so more sessions mean more growth windows",
       "Muscles grow only on weekends",
       "It halves the volume",
       "It removes the need for rest"
      ],
      "a": 0,
      "w": [
       "Correct. A full-body routine 3× a week beat the bro split in trained lifters.",
       "Growth follows the training stimulus and MPS windows, not days of the week.",
       "It distributes volume; it doesn't cut it.",
       "Recovery still matters."
      ],
      "h": "Hit it every 48."
     },
     {
      "q": "How often does the course suggest training to failure?",
      "o": [
       "Every set",
       "Every session",
       "About once every 5–6 weeks (roughly monthly)",
       "Never"
      ],
      "a": 2,
      "w": [
       "Too fatiguing.",
       "Too fatiguing.",
       "Correct. Most sets stay close to failure without hitting it.",
       "It has a place occasionally."
      ],
      "h": "Failure is a monthly test, not a daily habit."
     }
    ]
   },
   {
    "id": "e106-fat",
    "title": "Fat-Loss Considerations",
    "fact": "In 2017 obesity caused about 4.7 million premature deaths worldwide, roughly four times the deaths from road accidents.",
    "primer": [
     "Classify with BMI plus waist: 18.5 / 25 / 30 / 35 / 40. Waist risk: men >102 cm (40 in), women >88 cm (35 in).",
     "Plan: cardio 3–5 days + full-body resistance training 2–3 days. Get medical clearance before vigorous work.",
     "Safe loss: 1–2 lb (0.5–1 kg) a week (NIH). Staying below the ventilatory threshold keeps workouts feeling positive."
    ],
    "qs": [
     {
      "q": "A BMI of 32 falls into:",
      "o": [
       "Overweight",
       "Obesity Class I",
       "Obesity Class II",
       "Extreme obesity (Class III)"
      ],
      "a": 1,
      "w": [
       "Overweight is 25.0–29.9.",
       "Correct. Class I is 30.0–34.9.",
       "Class II is 35.0–39.9.",
       "Class III is ≥40."
      ],
      "h": "18.5, 25, 30, 35, 40: every step after 18.5 is +5."
     },
     {
      "q": "The waist circumference that marks higher risk for WOMEN is:",
      "o": [
       ">80 cm",
       ">88 cm (35 in)",
       ">94 cm",
       ">102 cm (40 in)"
      ],
      "a": 1,
      "w": [
       ">80 cm isn't the course (NIH) threshold; women's is >88 cm.",
       "Correct. Above 88 cm raises risk even at a normal BMI.",
       ">94 cm isn't the course threshold; women's is >88 cm and men's >102 cm.",
       "That is the cut-off for MEN."
      ],
      "h": "Men 102, Women 88 (40/35 inches)."
     },
     {
      "q": "The course's weekly exercise recommendation for clients with obesity is:",
      "o": [
       "Daily HIIT",
       "3–5 days cardio + 2–3 days full-body resistance training",
       "Cardio only, 7 days",
       "Resistance training only, 1 day"
      ],
      "a": 1,
      "w": [
       "Too much impact and too hard to recover from.",
       "Correct. The combination gives a bigger deficit, keeps muscle and builds fitness.",
       "It neglects muscle retention.",
       "One RT day is too little; the course says 2–3 full-body days plus 3–5 cardio days."
      ],
      "h": "3–5 cardio, 2–3 lift."
     },
     {
      "q": "Ekkekakis (2008) found people felt POSITIVE after exercise when they:",
      "o": [
       "Went above the ventilatory threshold",
       "Stayed below the ventilatory threshold",
       "Trained fasted",
       "Did HIIT"
      ],
      "a": 1,
      "w": [
       "Most who crossed it felt negative.",
       "Correct. Keeping them below the panting point builds adherence.",
       "Training fasted wasn't the variable; the study looked at intensity relative to the ventilatory threshold.",
       "HIIT wasn't the variable; the key was staying BELOW the ventilatory threshold."
      ],
      "h": "Stay below the panting point."
     },
     {
      "q": "A very-low-calorie crash diet raises the risk of:",
      "o": [
       "Gallstones (15–25× higher, within 4 weeks)",
       "Stronger bones",
       "Higher leptin",
       "Better sleep"
      ],
      "a": 0,
      "w": [
       "Correct. This is why the course says not to crash-diet obese clients.",
       "Not a benefit of crash dieting.",
       "Leptin falls in a deficit.",
       "Crash diets don't improve sleep; the course's warning is gallstones."
      ],
      "h": "Crash diet = gallstone gamble."
     },
     {
      "q": "A man with high body fat (>20%) should target weekly weight loss of about:",
      "o": [
       "0.25% of body weight",
       "1–1.5% of body weight",
       "3–4% of body weight",
       "5 kg"
      ],
      "a": 1,
      "w": [
       "Too conservative for high body fat.",
       "Correct. Leaner clients go slower, at 0.5–1% a week.",
       "Too aggressive.",
       "5 kg a week is dangerous and far beyond the NIH 0.5–1 kg guideline."
      ],
      "h": "More fat, faster; less fat, slower."
     },
     {
      "q": "Short sleep affects appetite hormones by:",
      "o": [
       "Raising leptin and lowering ghrelin",
       "Lowering leptin and raising ghrelin, so hunger goes up",
       "No effect",
       "Raising both"
      ],
      "a": 1,
      "w": [
       "Reversed. Short sleep LOWERS leptin and RAISES ghrelin.",
       "Correct. Less fullness and more hunger.",
       "Sleep clearly changes appetite hormones: leptin falls, ghrelin rises.",
       "Both don't rise; leptin (fullness) falls while ghrelin (hunger) rises."
      ],
      "h": "Bad sleep = Ghrelin Grumbles, Leptin Leaves."
     },
     {
      "q": "For an obese beginner, which is the best early exercise choice?",
      "o": [
       "Box jumps",
       "Jumping jacks",
       "Machine-based and supported bodyweight exercises (e.g. box squat)",
       "Long downhill runs"
      ],
      "a": 2,
      "w": [
       "High impact on already-stressed joints.",
       "Jumping jacks land repeatedly, a lot of impact for already-loaded joints.",
       "Correct. Minimise joint stress and progress low → moderate → high impact.",
       "Downhill running loads the knees heavily, too much impact for this stage."
      ],
      "h": "Low impact first, earn the jumps."
     }
    ]
   }
  ]
 },
 {
  "id": "E101",
  "name": "Intro to Exercise Science",
  "kind": "mcq",
  "color": "#f59e0b",
  "blurb": "Why exercise matters, fitness components and tests, METs, planning a routine, lifestyle disorders.",
  "topics": [
   {
    "id": "e101-why",
    "title": "Importance of Exercise",
    "fact": "The WHO ranks physical inactivity as the 4th leading risk factor for death worldwide.",
    "primer": [
     "WHO: physical activity is any bodily movement produced by skeletal muscles that requires energy expenditure.",
     "Body composition = bone + muscle + fat mass. Type 2 diabetes is linked especially to VISCERAL fat.",
     "Evidence strength: cardiovascular and T2D benefits strong; cancer and dementia moderate; depression low."
    ],
    "qs": [
     {
      "q": "The WHO definition of physical activity hinges on:",
      "o": [
       "Sport participation",
       "Skeletal-muscle movement that requires energy expenditure",
       "Sweating for 30 minutes",
       "Gym attendance"
      ],
      "a": 1,
      "w": [
       "Sport is only one example.",
       "Correct. Any bodily movement by skeletal muscles that uses energy counts, including housework and walking.",
       "Sweat isn't part of the definition. A gentle walk counts as activity because muscles move and use energy.",
       "No gym needed. Housework, walking and dancing all count under the WHO definition."
      ],
      "h": "Move a muscle, burn a calorie = activity."
     },
     {
      "q": "Type 2 diabetes risk is linked especially to which fat?",
      "o": [
       "Essential fat",
       "Subcutaneous fat",
       "Visceral fat",
       "Brown fat"
      ],
      "a": 2,
      "w": [
       "Essential fat is needed for health.",
       "Subcutaneous is under the skin and less harmful.",
       "Correct. Fat around the organs drives metabolic risk.",
       "Brown fat burns energy to make heat; it isn't the fat the course links to T2D. Visceral fat is."
      ],
      "h": "Visceral = around the Vital organs."
     },
     {
      "q": "Which benefit has the WEAKEST evidence in the course table?",
      "o": [
       "Lower cardiovascular mortality",
       "Lower type 2 diabetes risk",
       "Depression",
       "Dementia"
      ],
      "a": 2,
      "w": [
       "This benefit has STRONG evidence, so it can't be the weakest.",
       "This benefit has STRONG evidence (better insulin sensitivity), so it can't be the weakest.",
       "Correct. There's an association, but the evidence is rated low.",
       "Dementia benefits are rated MODERATE, which is stronger than depression's LOW rating."
      ],
      "h": "Heart & sugar strong; cancer & dementia moderate; depression low."
     },
     {
      "q": "Sarcopenia is:",
      "o": [
       "Age-related loss of bone density",
       "Age-related loss of muscle mass (and function)",
       "Excess body fat",
       "A heart arrhythmia"
      ],
      "a": 1,
      "w": [
       "That is osteoporosis.",
       "Correct. Inactivity and low protein make it worse; combined aerobic and resistance training counter it.",
       "That is obesity.",
       "An arrhythmia is an irregular heartbeat, a cardiac problem. Sarcopenia is about muscle."
      ],
      "h": "Sarx = flesh, penia = poverty."
     },
     {
      "q": "Kinesiology is the study of:",
      "o": [
       "Hormones",
       "Force production and how muscles and joints move the body",
       "Diet",
       "Heart disease"
      ],
      "a": 1,
      "w": [
       "That is endocrinology.",
       "Correct. Kinesis means movement.",
       "That is nutrition.",
       "That is cardiology."
      ],
      "h": "Kinesis = movement (think cinema = moving pictures)."
     },
     {
      "q": "Chronological age vs biological age: which can lifestyle change?",
      "o": [
       "Chronological",
       "Biological",
       "Neither",
       "Both equally"
      ],
      "a": 1,
      "w": [
       "Time since birth can't change.",
       "Correct. Activity and nutrition slow biological ageing. Ageing can be slowed, not stopped.",
       "Biological age is changeable.",
       "Chronological age is fixed."
      ],
      "h": "Calendar age is fixed; body age is earned."
     }
    ]
   },
   {
    "id": "e101-components",
    "title": "Components of Fitness & Tests",
    "fact": "The Cooper test turns a 12-minute run into a VO₂max estimate: VO₂max = 22.351 × km − 11.288. A 2 km run gives about 33 ml/kg/min.",
    "primer": [
     "5 health-related: cardio endurance, muscular endurance, muscular strength, flexibility, body composition.",
     "6 skill-related (PBS-ARC): power, balance, speed, agility, reaction time, coordination.",
     "Tests: Cooper 12-min run, push-up test, 1RM, sit-and-reach, skinfolds."
    ],
    "qs": [
     {
      "q": "Which is a HEALTH-related component of fitness?",
      "o": [
       "Agility",
       "Reaction time",
       "Body composition",
       "Power"
      ],
      "a": 2,
      "w": [
       "Agility is SKILL-related (change of direction), not one of the five health components.",
       "Reaction time is SKILL-related (responding to a stimulus), not a health component.",
       "Correct. The five are cardio endurance, muscular endurance, strength, flexibility and body composition.",
       "Power is SKILL-related (strength plus speed), not a health component."
      ],
      "h": "Can Every Student Flex Comfortably?"
     },
     {
      "q": "Muscular STRENGTH is:",
      "o": [
       "Many reps against a resistance",
       "Maximum force in a single maximal effort",
       "Moving quickly from one point to another",
       "Joint range of motion"
      ],
      "a": 1,
      "w": [
       "That is muscular endurance.",
       "Correct. It is tested with a 1RM (or 5RM/10RM as safer alternatives).",
       "That is speed.",
       "That is flexibility."
      ],
      "h": "Strength = one big effort; endurance = many reps."
     },
     {
      "q": "A 35-year-old covers 2 km in the 12-minute Cooper run. Estimated VO₂max ≈",
      "o": [
       "22.4",
       "33.4",
       "44.7",
       "55.0"
      ],
      "a": 1,
      "w": [
       "22.4 doesn't come from the formula: 22.351 × 2 = 44.70, then subtract 11.288 = 33.4.",
       "Correct. 22.351 × 2 = 44.70; 44.70 − 11.288 = 33.4 ml/kg/min.",
       "You forgot to subtract 11.288.",
       "Too high. 22.351 × 2 = 44.70, minus 11.288 gives 33.4, not 55."
      ],
      "h": "Multiply km by 22.351, subtract 11.288."
     },
     {
      "q": "In the sit-and-reach test, the key technique rule is:",
      "o": [
       "Bounce to reach further",
       "Keep the knees straight; zero is at the toes",
       "Bend the knees slightly",
       "Use one hand only"
      ],
      "a": 1,
      "w": [
       "Jerking is not allowed.",
       "Correct. Reaching beyond zero scores plus; short of zero scores minus.",
       "Bent knees invalidate the test.",
       "Hands go one over the other."
      ],
      "h": "Straight knees, zero at the toes."
     },
     {
      "q": "Which four skinfold sites does the E101 lecture use?",
      "o": [
       "Triceps, biceps, subscapular, waist (suprailiac)",
       "Chest, thigh, calf, neck",
       "Abdomen, calf, forearm, cheek",
       "Hip, knee, ankle, wrist"
      ],
      "a": 0,
      "w": [
       "Correct. Add the four readings and look up the chart for age and sex.",
       "These sites don't match the E101 protocol (triceps, biceps, subscapular, waist).",
       "Cheek and forearm aren't sites in the E101 four-site protocol.",
       "Those are joints, not skinfold sites."
      ],
      "h": "Two arm sites, one back, one waist."
     },
     {
      "q": "Which skill-related component is about rapid CHANGE OF DIRECTION?",
      "o": [
       "Speed",
       "Agility",
       "Coordination",
       "Balance"
      ],
      "a": 1,
      "w": [
       "Speed is moving from point A to B quickly.",
       "Correct. Badminton and soccer are classic examples.",
       "Coordination is combining skills smoothly.",
       "Balance is controlling position, still or moving."
      ],
      "h": "Agility = Angles, quickly."
     },
     {
      "q": "Why shouldn't 1RM testing be done frequently?",
      "o": [
       "It's too easy",
       "Injury risk when form breaks under very heavy loads",
       "It requires a lab",
       "It measures endurance"
      ],
      "a": 1,
      "w": [
       "The opposite: a true max is the hardest single effort, which is why form can break and injury risk rises.",
       "Correct. Use it occasionally, or use 5RM/10RM instead.",
       "No lab is needed.",
       "It measures maximal strength."
      ],
      "h": "Max tests are rare tests."
     }
    ]
   },
   {
    "id": "e101-mets",
    "title": "Skill Components & METs",
    "fact": "A smartwatch might say a 3-hour gym visit burned 700 kcal. If only 20 minutes was real work, the truth may be nearer 200–250.",
    "primer": [
     "1 MET = resting energy use ≈ 3.5 ml O₂/kg/min.",
     "kcal per minute = MET × 3.5 × body weight (kg) ÷ 200.",
     "Light <3 METs, moderate 3–6, vigorous >6. Tracking intake is more reliable than estimating burn."
    ],
    "qs": [
     {
      "q": "1 MET equals approximately:",
      "o": [
       "1 kcal per hour",
       "3.5 ml O₂ per kg per minute",
       "10 ml O₂ per kg per minute",
       "100 kcal"
      ],
      "a": 1,
      "w": [
       "A MET is defined by oxygen use (3.5 ml/kg/min), not as a calorie figure.",
       "Correct. It is resting energy expenditure.",
       "10 ml/kg/min is roughly 3 METs of effort, not resting. 1 MET is 3.5.",
       "100 kcal is an amount of energy, not a rate of oxygen use at rest."
      ],
      "h": "Rest = 1 MET = 3.5."
     },
     {
      "q": "An 80 kg person does an 8-MET activity. kcal per minute = ?",
      "o": [
       "5.6",
       "11.2",
       "22.4",
       "672"
      ],
      "a": 1,
      "w": [
       "5.6 is half the answer. (8 × 3.5 × 80) ÷ 200 = 2,240 ÷ 200 = 11.2.",
       "Correct. (8 × 3.5 × 80) ÷ 200 = 11.2 kcal/min, about 672 kcal/hour.",
       "22.4 is double the answer. You divided by 100 instead of 200.",
       "That is per HOUR."
      ],
      "h": "MET × 3.5 × kg ÷ 200."
     },
     {
      "q": "Brisk walking at about 5 METs is classed as:",
      "o": [
       "Light",
       "Moderate",
       "Vigorous",
       "Sedentary"
      ],
      "a": 1,
      "w": [
       "Light is under 3.",
       "Correct. Moderate is 3–6 METs.",
       "Vigorous is over 6.",
       "Sedentary is below light activity (about 1–1.5 METs, e.g. sitting). Brisk walking is far above that."
      ],
      "h": "Under 3 light, 3–6 moderate, over 6 vigorous."
     },
     {
      "q": "Which sport best showcases REACTION TIME?",
      "o": [
       "Surfing",
       "Boxing (ducking a punch)",
       "Marathon running",
       "Powerlifting"
      ],
      "a": 1,
      "w": [
       "Surfing is mainly balance.",
       "Correct. Responding in a split second to a stimulus; F1 driving is another example.",
       "A marathon tests endurance over hours, not split-second responses.",
       "Powerlifting tests maximal strength; there's no stimulus to react to."
      ],
      "h": "Reaction = boxing and F1."
     },
     {
      "q": "For managing energy balance, the course says it's more reliable to:",
      "o": [
       "Trust wearable calorie burn",
       "Track calorie INTAKE",
       "Count steps only",
       "Weigh daily and ignore food"
      ],
      "a": 1,
      "w": [
       "Wearables over-count.",
       "Correct. Burn estimates are rough; intake can be measured.",
       "Steps help but aren't the main lever.",
       "Weight alone misses the cause."
      ],
      "h": "Count what you eat, not what the watch says."
     },
     {
      "q": "Power is best described as:",
      "o": [
       "Strength alone",
       "Strength plus speed, an explosive effort",
       "Long-duration effort",
       "Flexibility under load"
      ],
      "a": 1,
      "w": [
       "Strength ignores time.",
       "Correct. It is maximum force applied as quickly as possible, as in the snatch, sprint starts or a punch.",
       "That is endurance.",
       "Flexibility is range of motion; power is about producing force fast."
      ],
      "h": "Power = Punch."
     }
    ]
   },
   {
    "id": "e101-planning",
    "title": "Exercise Planning & Routine",
    "fact": "Low-carb diets cause quick 'weight loss' that is mostly water, because stored carbohydrate holds water.",
    "primer": [
     "Warm-up (dynamic) → main workout → cool-down (static). Warm-up 10–15 min; cool-down 5–10 min.",
     "Weight = water + muscle + bone + fat. Healthy loss = FAT loss: resistance training + protein in a deficit.",
     "DOMS doesn't prove a good workout. Fatigue calls for a deload, not total rest."
    ],
    "qs": [
     {
      "q": "Which stretching belongs in the WARM-UP?",
      "o": [
       "Long static holds",
       "Dynamic stretching (leg swings, arm circles)",
       "PNF with a partner",
       "None at all"
      ],
      "a": 1,
      "w": [
       "Static holds belong in the cool-down.",
       "Correct. Dynamic before, static after.",
       "PNF is mostly rehab.",
       "A warm-up includes dynamic movement."
      ],
      "h": "Dynamic before, static after."
     },
     {
      "q": "A 'specific warm-up' means:",
      "o": [
       "Jogging for 15 minutes",
       "Mimicking the day's main lifts without load",
       "Foam rolling only",
       "Stretching the hamstrings"
      ],
      "a": 1,
      "w": [
       "That is a general warm-up.",
       "Correct. For example, bodyweight squats before squat day.",
       "Foam rolling is optional.",
       "A general stretch doesn't rehearse the day's lift. Specific means practising the movement you're about to load."
      ],
      "h": "Specific = rehearse the lift."
     },
     {
      "q": "After a few days on a low-carb diet, most of the quick weight lost is:",
      "o": [
       "Fat",
       "Muscle",
       "Water",
       "Bone"
      ],
      "a": 2,
      "w": [
       "Fat loss is slower.",
       "Muscle isn't lost that quickly; the quick drop is stored-carb water.",
       "Correct. Carbohydrate stores hold water, so it returns when carbs return.",
       "Bone doesn't change."
      ],
      "h": "Fast loss = water loss."
     },
     {
      "q": "The key to healthy fat loss according to the course is:",
      "o": [
       "Cardio only",
       "Resistance training + enough protein in a calorie deficit",
       "Fasting for 3 days",
       "Sauna sessions"
      ],
      "a": 1,
      "w": [
       "Cardio alone risks muscle loss.",
       "Correct. This keeps muscle while losing fat.",
       "Fasting isn't the course method. The course pairs a deficit with lifting and protein to keep muscle.",
       "Saunas only sweat out water, which returns when you drink. That isn't fat loss."
      ],
      "h": "Lift + protein + deficit."
     },
     {
      "q": "A client is fatigued and performance is falling. Best response?",
      "o": [
       "Stop exercising for a month",
       "A deload: reduce intensity, load or sets",
       "Add more sets",
       "Train to failure"
      ],
      "a": 1,
      "w": [
       "A deload is not complete rest.",
       "Correct. A short, planned reduction in training.",
       "That worsens fatigue.",
       "That worsens fatigue."
      ],
      "h": "Tired? Deload, don't quit."
     },
     {
      "q": "The pre-workout meal ideally comes:",
      "o": [
       "Immediately before training",
       "At least about 2 hours before",
       "Only after training",
       "12 hours before"
      ],
      "a": 1,
      "w": [
       "Can cause bloating and unease.",
       "Correct. Carbs and protein are a good choice.",
       "That is post-workout.",
       "12 hours before is too early to fuel the session; aim for about 2 hours before."
      ],
      "h": "Two hours to digest."
     },
     {
      "q": "What does the course say about the post-workout 'anabolic window'?",
      "o": [
       "You must eat within 15 minutes",
       "There's no strict window; total daily protein matters more",
       "Never eat after training",
       "Only carbs matter"
      ],
      "a": 1,
      "w": [
       "Research doesn't support the rush.",
       "Correct. The exception is training fasted, when protein soon after makes sense.",
       "Eating after training is fine and helpful; the point is only that there's no strict 15-minute rush.",
       "Protein after training matters for repair. The course recommends carbs plus protein."
      ],
      "h": "The window is a barn door, not a keyhole."
     }
    ]
   },
   {
    "id": "e101-ncd",
    "title": "Exercise & Lifestyle Disorders",
    "fact": "In high-risk, pre-diabetic people, exercise is associated with a 58% reduction in developing type 2 diabetes.",
    "primer": [
     "4 exercise types: aerobic, strengthening, balance, stretching.",
     "NCDs (lifestyle disorders) aren't contagious and can't be cured, but they can be prevented and managed.",
     "Exercise improves insulin sensitivity (acute) and builds muscle with insulin receptors (chronic). Resting HR falls with endurance training."
    ],
    "qs": [
     {
      "q": "Lifestyle disorders are also called:",
      "o": [
       "Communicable diseases",
       "Non-communicable diseases (NCDs)",
       "Genetic disorders only",
       "Infections"
      ],
      "a": 1,
      "w": [
       "Communicable diseases pass from person to person.",
       "Correct. They are managed and prevented, not cured.",
       "NCDs are mostly lifestyle-driven (inactivity, diet, smoking), not purely genetic.",
       "Infections are communicable."
      ],
      "h": "NCD = Not Caught, Developed."
     },
     {
      "q": "How much does exercise reduce T2D risk in high-risk groups?",
      "o": [
       "10%",
       "30%",
       "58%",
       "90%"
      ],
      "a": 2,
      "w": [
       "10% understates it. The course figure is a 58% reduction in high-risk people.",
       "30% understates it. The course figure is 58%.",
       "Correct. This is the course figure.",
       "90% overstates it. The course figure is 58%."
      ],
      "h": "58 — remember 'five-eight, lift your weight'."
     },
     {
      "q": "The ACUTE effect of exercise on type 2 diabetes is:",
      "o": [
       "More fat cells",
       "Improved insulin sensitivity",
       "Lower red blood cell count",
       "Higher LDL"
      ],
      "a": 1,
      "w": [
       "Exercise doesn't create fat cells; it improves how cells respond to insulin.",
       "Correct. Cells take up glucose better. The chronic effect is more muscle with more insulin receptors.",
       "Red blood cells aren't the mechanism; insulin sensitivity is.",
       "Exercise lowers LDL."
      ],
      "h": "Acute = sensitive; chronic = more muscle."
     },
     {
      "q": "How should resting heart rate be measured?",
      "o": [
       "After a workout",
       "On waking, for one full minute, before getting up",
       "After coffee",
       "While walking"
      ],
      "a": 1,
      "w": [
       "It would be elevated.",
       "Correct. A falling RHR over months signals a more efficient heart.",
       "Caffeine raises it.",
       "Walking raises HR, so it isn't a resting value."
      ],
      "h": "Wake, lie still, count 60 seconds."
     },
     {
      "q": "Exercise changes cholesterol by:",
      "o": [
       "Raising LDL and lowering HDL",
       "Lowering LDL and raising HDL",
       "No effect",
       "Raising both"
      ],
      "a": 1,
      "w": [
       "The reverse. Exercise LOWERS LDL (bad) and RAISES HDL (good).",
       "Correct. Bad cholesterol down, good up.",
       "Exercise does shift cholesterol: LDL down, HDL up.",
       "Only HDL rises; LDL falls."
      ],
      "h": "LDL Low, HDL High."
     },
     {
      "q": "Which is NOT one of the 4 main exercise types?",
      "o": [
       "Aerobic",
       "Strengthening",
       "Balance",
       "Supplementation"
      ],
      "a": 3,
      "w": [
       "Aerobic IS one of the four (heart health). The odd one out is supplementation.",
       "Strengthening IS one of the four. The odd one out is supplementation.",
       "Balance IS one of the four. The odd one out is supplementation.",
       "Correct. The fourth is stretching (flexibility)."
      ],
      "h": "A Strong Body Stretches: Aerobic, Strength, Balance, Stretch."
     }
    ]
   },
   {
    "id": "e101-genpop",
    "title": "Exercise for the General Population",
    "fact": "You can build a complete home programme with a backpack, water bottles and a resistance band. Consistency beats location.",
    "primer": [
     "4 components: warm-up, cardio endurance, muscular strength and endurance, flexibility.",
     "Basic patterns: squat, push, pull, hinge. Combine resistance training and cardio.",
     "Cardio 30–60 min × 3 a week. Don't force gym joining, heavy weights or supplements."
    ],
    "qs": [
     {
      "q": "Which is one of the 4 essential components of a programme?",
      "o": [
       "Supplements",
       "Stretching & flexibility",
       "Max testing",
       "Sauna"
      ],
      "a": 1,
      "w": [
       "Supplements aren't a programme component; the lecture even says don't push them.",
       "Correct. The others are warm-up, cardio, and strength and endurance.",
       "Max testing is assessment, not one of the four programme components.",
       "A sauna isn't exercise. The four are warm-up, cardio, strength/endurance and flexibility."
      ],
      "h": "Warm Cars Make Stretch-marks."
     },
     {
      "q": "The basic functional movement patterns for the general population are:",
      "o": [
       "Squat, push, pull, hinge",
       "Snatch, clean, jerk, press",
       "Sprint, jump, throw, kick",
       "Curl, raise, fly, shrug"
      ],
      "a": 0,
      "w": [
       "Correct. These build the programme.",
       "Olympic lifts are specialist.",
       "These are athletic skills, not the basic patterns everyday clients need.",
       "These are isolation moves; the base patterns are compound: squat, push, pull, hinge."
      ],
      "h": "Sit, push, pull, pick up."
     },
     {
      "q": "An exercise-specific warm-up per this lecture is:",
      "o": [
       "1–2 sets of 10–15 reps of the exercise you're about to do",
       "20 minutes of jogging",
       "A 1RM single",
       "Static holds of 60 s"
      ],
      "a": 0,
      "w": [
       "Correct. It activates the muscles, improves performance and cuts injury risk.",
       "That's a basic warm-up and too long.",
       "Unsafe as a warm-up.",
       "That belongs in the cool-down."
      ],
      "h": "Rehearse it light, 10–15 reps."
     },
     {
      "q": "The general cardio recommendation in this lecture is:",
      "o": [
       "10 min daily",
       "30–60 min, 3 times a week",
       "2 hours on Sundays",
       "Only HIIT"
      ],
      "a": 1,
      "w": [
       "10 minutes is below the lecture's 30–60 min recommendation.",
       "Correct. HIIT or LISS both work with consistency and progression.",
       "Two hours once a week isn't the 30–60 min × 3 guideline.",
       "LISS works too."
      ],
      "h": "30–60, three times."
     },
     {
      "q": "Which is a coaching rule from this lecture?",
      "o": [
       "Push supplements early",
       "Prioritise heavy weights",
       "Don't force gym joining; consistency beats location",
       "Avoid cardio"
      ],
      "a": 2,
      "w": [
       "The lecture says DON'T push unnecessary supplements.",
       "The lecture says DON'T prioritise heavy weights for the general population; form comes first.",
       "Correct. Home, gym and park all work.",
       "Cardio is part of the plan."
      ],
      "h": "Wherever they'll keep showing up."
     }
    ]
   }
  ]
 },
 {
  "id": "E105",
  "name": "Introduction to the Gym",
  "kind": "mcq",
  "color": "#10b981",
  "blurb": "Equipment, correct technique (stance, breathing, ROM, grips), common exercises and injury prevention.",
  "topics": [
   {
    "id": "e105-equip",
    "title": "Fitness Equipment",
    "fact": "A men's Olympic barbell weighs about 20 kg empty, and its sleeves spin on bearings so the bar can rotate under you during cleans and snatches.",
    "primer": [
     "Olympic bar ≈ 20 kg with revolving sleeves. Standard bar ≈ 8–10 kg. EZ bar → curls.",
     "Swiss ball = air-filled (core, stability, rehab). Medicine ball = weighted (throws, power).",
     "TRX is NON-elastic and uses bodyweight. Bands are elastic. The elliptical is low-impact cardio."
    ],
    "qs": [
     {
      "q": "An Olympic barbell weighs about:",
      "o": [
       "8–10 kg",
       "15 kg",
       "20 kg",
       "40 kg"
      ],
      "a": 2,
      "w": [
       "That is a standard/home bar.",
       "15 kg is the women's Olympic bar; the course figure for the Olympic bar is about 20 kg.",
       "Correct. Long and heavy, with revolving sleeves for powerlifting and Olympic lifts.",
       "40 kg is double the bar's weight, so that would already be a loaded bar."
      ],
      "h": "Olympic = 20."
     },
     {
      "q": "Which is filled with AIR, not weight?",
      "o": [
       "Medicine ball",
       "Swiss ball",
       "Kettlebell",
       "Slam ball"
      ],
      "a": 1,
      "w": [
       "Medicine balls are weighted rubber balls.",
       "Correct. Used for core work, stability and rehab.",
       "Kettlebells are cast iron.",
       "Slam balls are weighted."
      ],
      "h": "Swiss = Swells with air."
     },
     {
      "q": "The TRX suspension trainer differs from resistance bands because it is:",
      "o": [
       "Elastic",
       "Non-elastic and uses bodyweight as resistance",
       "Weighted",
       "Only for legs"
      ],
      "a": 1,
      "w": [
       "Bands are elastic; TRX is not.",
       "Correct. Nylon straps with handles anchored overhead.",
       "TRX straps add no weight; your own bodyweight is the resistance.",
       "TRX trains the whole body: rows, push-ups, squats and core."
      ],
      "h": "TRX = Tied straps, your bodyweight."
     },
     {
      "q": "Where should the hooks of a squat rack be set?",
      "o": [
       "Above eye level",
       "At about chest or shoulder height",
       "At knee height",
       "On the floor"
      ],
      "a": 1,
      "w": [
       "You'd have to tiptoe the bar off, which is unsafe.",
       "Correct. Unrack onto the traps, step back, squat, step forward, re-rack. Safety bars catch failed reps.",
       "Too low to unrack safely.",
       "A rack holds the bar at height so you don't have to lift it off the floor."
      ],
      "h": "Rack at your chest, not your crown."
     },
     {
      "q": "Which cardio machine is described as LOW-IMPACT?",
      "o": [
       "Treadmill sprinting",
       "Elliptical",
       "Jump rope",
       "Stair sprints"
      ],
      "a": 1,
      "w": [
       "High impact.",
       "Correct. Arms and legs move together without foot strike.",
       "Impact on every jump.",
       "Stair sprints land hard on every step, so they're high impact."
      ],
      "h": "Elliptical = easy on joints."
     },
     {
      "q": "A leg EXTENSION machine mainly targets the:",
      "o": [
       "Hamstrings",
       "Quadriceps",
       "Glutes",
       "Calves"
      ],
      "a": 1,
      "w": [
       "The leg CURL trains the hamstrings.",
       "Correct. It extends the knee.",
       "Glutes extend the hip; a leg extension only straightens the knee.",
       "Calves plantarflex the ankle; the leg extension works the knee extensors."
      ],
      "h": "Extension = quads; Curl = hamstrings."
     },
     {
      "q": "A foam roller is mainly used for:",
      "o": [
       "Treating fractures",
       "Reducing soreness (DOMS) and myofascial release",
       "Building power",
       "Measuring body fat"
      ],
      "a": 1,
      "w": [
       "Never on injuries.",
       "Correct. It loosens tight muscles.",
       "A foam roller is for recovery and tightness, not explosive power.",
       "Body fat is measured with callipers, BIA or DEXA, not a roller."
      ],
      "h": "Roll out the knots."
     }
    ]
   },
   {
    "id": "e105-technique",
    "title": "Correct Technique & Grips",
    "fact": "Holding your breath through moderate sets gasses you out by rep 5 or 6. Exhale on the effort and the same set often reaches 8 to 10.",
    "primer": [
     "4 components: stable body/limb position, breathing, ROM and momentum, grip and grip width.",
     "Exhale on exertion (lifting), inhale on lowering. Valsalva (brace and hold) for heavy, low-rep lifts.",
     "Close-grip bench → triceps. Wide pronated pull-up → lats. Neutral grip is kind to the shoulders."
    ],
    "qs": [
     {
      "q": "For moderate loads, the breathing rule is:",
      "o": [
       "Inhale while lifting, exhale while lowering",
       "Exhale on the exertion (lifting), inhale on the return (lowering)",
       "Hold your breath every rep",
       "Breathe only between sets"
      ],
      "a": 1,
      "w": [
       "Reversed. Exhale as you lift (exertion), inhale as you lower.",
       "Correct. In a curl, breathe out as the weight comes up.",
       "That is Valsalva, for heavy low-rep lifts only.",
       "Breathing only between sets leaves you breathless mid-set; breathe every rep."
      ],
      "h": "Blow as you go (up)."
     },
     {
      "q": "The Valsalva manoeuvre should be AVOIDED for clients with:",
      "o": [
       "Tight hamstrings",
       "Hypertension or heart conditions",
       "Flat feet",
       "Good flexibility"
      ],
      "a": 1,
      "w": [
       "Tight hamstrings don't make breath-holding dangerous; high blood pressure does.",
       "Correct. Breath-holding spikes blood pressure.",
       "Flat feet don't interact with blood pressure; Valsalva's risk is the BP spike.",
       "Flexibility has nothing to do with the BP spike from breath-holding."
      ],
      "h": "Valsalva Vaults the BP."
     },
     {
      "q": "A close-grip bench press shifts the primary emphasis to the:",
      "o": [
       "Chest",
       "Triceps",
       "Lats",
       "Biceps"
      ],
      "a": 1,
      "w": [
       "Normal width is chest-primary.",
       "Correct. Shoulders work as secondary.",
       "Lats aren't the main pushers in a bench press, whatever the grip width.",
       "Biceps don't press; a narrow grip shifts work to the triceps."
      ],
      "h": "Close grip = triceps trip."
     },
     {
      "q": "Palms facing each other is the:",
      "o": [
       "Pronated grip",
       "Supinated grip",
       "Neutral (hammer) grip",
       "Hook grip"
      ],
      "a": 2,
      "w": [
       "Pronated is palms down or away.",
       "Supinated is palms up.",
       "Correct. It means less shoulder stress and suits shoulder-injury clients, but you can't use it on a straight barbell.",
       "Hook grip wraps the thumb under the fingers."
      ],
      "h": "Neutral = handshake hands."
     },
     {
      "q": "Which grip is risky because the bar can slip forward on bench or shoulder press?",
      "o": [
       "Closed grip",
       "False (thumbless) grip",
       "Neutral grip",
       "Hook grip"
      ],
      "a": 1,
      "w": [
       "The closed grip wraps the thumb around the bar, so it can't slip forward. It's the safe default.",
       "Correct. Use a normal closed grip instead. The false grip belongs to gymnastics rings.",
       "Neutral grip (palms facing) is a safe grip, not the slipping risk.",
       "Very secure, though painful."
      ],
      "h": "False grip = false sense of security."
     },
     {
      "q": "Swinging a curl up with the lower back mainly:",
      "o": [
       "Increases biceps stimulus",
       "Shifts stress off the target muscle and onto the lower back",
       "Improves ROM",
       "Is required for beginners"
      ],
      "a": 1,
      "w": [
       "The opposite: swinging moves the load off the biceps and onto the lower back.",
       "Correct. The force should come from the target muscle. Cheat reps are an advanced exception.",
       "Momentum doesn't improve range of motion; it just swings the weight through it.",
       "Never for beginners."
      ],
      "h": "Momentum moves the load to your spine."
     },
     {
      "q": "The standing stable position includes feet:",
      "o": [
       "Together, on the toes",
       "Hip-width, flat, weight even",
       "Very wide on the heels",
       "One foot raised"
      ],
      "a": 1,
      "w": [
       "Standing on the toes with the feet together is unstable; you need a hip-width, flat base.",
       "Correct. Plus a neutral spine, chest up and shoulders back.",
       "Too wide and on the heels upsets balance; the course stance is hip-width, weight even.",
       "Firm, flat ground for both feet."
      ],
      "h": "Hip-width, flat, even."
     },
     {
      "q": "Which grip suits HEAVY deadlifts?",
      "o": [
       "False grip",
       "Alternate (mixed) or hook grip",
       "Pronated thumbless",
       "Neutral on a straight bar"
      ],
      "a": 1,
      "w": [
       "A false grip on a heavy deadlift risks the bar slipping. Use a mixed or hook grip.",
       "Correct. Mixed stops the bar rolling; hook gives maximum security.",
       "Thumbless means a weak, insecure hold on heavy pulls.",
       "Not possible on a straight bar."
      ],
      "h": "Heavy pull = mix it or hook it."
     }
    ]
   },
   {
    "id": "e105-exercises",
    "title": "Common Exercises & Stretching",
    "fact": "A heavy beginner who can't do a pull-up isn't stuck. The lat pulldown trains the same muscles with an adjustable load.",
    "primer": [
     "Incline bench → upper (clavicular) chest. Decline → lower chest. Hammer curl → brachialis and brachioradialis.",
     "Chin-up → biceps + lats. Shrugs → upper traps. Prone or rear-delt fly → posterior delts.",
     "Static stretching after the workout; dynamic in the warm-up. HIIT 2–3 times a week."
    ],
    "qs": [
     {
      "q": "An incline bench press emphasises the:",
      "o": [
       "Lower chest",
       "Upper (clavicular) chest",
       "Lats",
       "Rear delts"
      ],
      "a": 1,
      "w": [
       "That's decline.",
       "Correct. Anterior delts and triceps assist.",
       "Lats are a pulling muscle; incline bench is a press.",
       "Rear delts pull the arm back; pressing works the front of the shoulder."
      ],
      "h": "Incline = Up top."
     },
     {
      "q": "A hammer curl mainly targets the:",
      "o": [
       "Long head of biceps only",
       "Brachialis and brachioradialis",
       "Triceps",
       "Front delts"
      ],
      "a": 1,
      "w": [
       "The supinated curl is more biceps-focused.",
       "Correct. The neutral grip shifts emphasis to the brachialis and brachioradialis.",
       "Curls flex the elbow; triceps extend it.",
       "Front delts raise the arm forward; a hammer curl only bends the elbow."
      ],
      "h": "Hammer hits the brachi-ALIS and -RADIALIS."
     },
     {
      "q": "Shrugs primarily train the:",
      "o": [
       "Lats",
       "Upper trapezius",
       "Rhomboids",
       "Rear delts"
      ],
      "a": 1,
      "w": [
       "Lats pull the arm down and back; shrugs lift the shoulders straight up.",
       "Correct. Lift straight up, hold 1–2 s and don't roll the shoulders. They are listed under back.",
       "Rhomboids retract the shoulder blades; shrugs elevate them (upper traps).",
       "Rear delts move the arm backward; shrugs don't move the arm."
      ],
      "h": "Shrug = traps to ears."
     },
     {
      "q": "A chin-up (supinated) emphasises:",
      "o": [
       "Lats only",
       "Biceps + lats",
       "Triceps",
       "Chest"
      ],
      "a": 1,
      "w": [
       "A pronated pull-up is lats-dominant.",
       "Correct. The underhand grip brings in more biceps.",
       "Triceps straighten the arm; a chin-up bends the elbow.",
       "Chest is for pushing; a chin-up is a vertical pull."
      ],
      "h": "CHIN-up = Curls in there too."
     },
     {
      "q": "A Roman-chair back extension primarily works the:",
      "o": [
       "Abs",
       "Erector spinae",
       "Quads",
       "Pecs"
      ],
      "a": 1,
      "w": [
       "The abs FLEX the spine; a back extension EXTENDS it.",
       "Correct. Glutes and hamstrings assist. Rise to neutral, not hyperextension.",
       "Quads extend the knee; a back extension hinges at the hip and spine.",
       "Pecs push the arms; they aren't involved in back extension."
      ],
      "h": "Back extension = spinal erectors."
     },
     {
      "q": "How often does the course suggest HIIT?",
      "o": [
       "Daily",
       "2–3 times a week",
       "Once a month",
       "Never"
      ],
      "a": 1,
      "w": [
       "Too demanding to recover from.",
       "Correct. It needs more recovery. Beginners start with steady-state cardio.",
       "Too little to matter.",
       "HIIT has a place: 2–3 sessions a week for intermediate and advanced trainees."
      ],
      "h": "HIIT hurts, so 2–3 times a week."
     },
     {
      "q": "Training cardio and resistance in the same session or day is called:",
      "o": [
       "Periodisation",
       "Concurrent training",
       "Supersetting",
       "Tapering"
      ],
      "a": 1,
      "w": [
       "Periodisation is planned training phases.",
       "Correct. It needs good nutrition; too much cardio can blunt strength goals.",
       "A superset is two exercises back to back.",
       "Tapering is reducing load before competition."
      ],
      "h": "Concurrent = at the same time."
     }
    ]
   },
   {
    "id": "e105-injury",
    "title": "Injury Prevention & Management",
    "fact": "A bursa is a tiny fluid-filled sac that stops tendons rubbing on bone. Overuse inflames it, which is bursitis.",
    "primer": [
     "Internal risks: age, gender, body composition, injury history, fitness, skill. External: poor warm-up, no gear, bad form, fatigue, ego lifting.",
     "Acute = sudden (fracture, dislocation, sprain, strain). Overuse = repeated stress (tendinitis, bursitis, blisters, DOMS).",
     "RICE: Rest, Ice, Compression, Elevation. Inflamed → cold. Stiff → heat. Never heat a swollen area."
    ],
    "qs": [
     {
      "q": "Ego lifting is classified as which risk factor?",
      "o": [
       "Internal",
       "External",
       "Genetic",
       "Not a risk factor"
      ],
      "a": 1,
      "w": [
       "Internal factors are about the person: age, history, skill and so on.",
       "Correct. Behaviour and environment are external: ego, fatigue, form, gear, warm-up.",
       "Ego lifting is behaviour, not genetics.",
       "It is a risk factor."
      ],
      "h": "External: Warm-up, Gear, Form, Fatigue, Ego."
     },
     {
      "q": "Which is an OVERUSE (chronic) injury?",
      "o": [
       "ACL tear in football",
       "Shoulder dislocation",
       "Tendinitis (e.g. tennis elbow)",
       "Fracture from a fall"
      ],
      "a": 2,
      "w": [
       "A sudden ACL tear is ACUTE, from one event.",
       "A dislocation happens suddenly, so it is ACUTE.",
       "Correct. Small repeated stresses over time.",
       "A fall fracture is a single sudden event, so it is ACUTE."
      ],
      "h": "Overuse = slow burn; Acute = sudden snap."
     },
     {
      "q": "DOMS typically appears:",
      "o": [
       "During the set",
       "24–72 hours after training",
       "A week later",
       "Only in experts"
      ],
      "a": 1,
      "w": [
       "That is the burn of metabolic stress.",
       "Correct. Delayed-onset muscle soreness.",
       "A week is too late; DOMS shows at 24–72 h and is fading by then.",
       "Beginners get it most."
      ],
      "h": "DOMS = Day-after-tomorrow soreness."
     },
     {
      "q": "RICE stands for:",
      "o": [
       "Run, Ice, Cool, Exercise",
       "Rest, Ice, Compression, Elevation",
       "Rest, Inflame, Cover, Elevate",
       "Recover, Ice, Cardio, Eat"
      ],
      "a": 1,
      "w": [
       "Running and exercise are the opposite of what an injury needs; R is Rest.",
       "Correct. For soft-tissue injuries like sprains and strains.",
       "You never want to inflame an injury; I is Ice, to reduce inflammation.",
       "Cardio and eating aren't part of first aid; it's Rest, Ice, Compression, Elevation."
      ],
      "h": "RICE: stop, chill, wrap, lift."
     },
     {
      "q": "A fresh, swollen ankle sprain needs:",
      "o": [
       "A heat pack",
       "A cold pack",
       "A sauna",
       "Massage with heat"
      ],
      "a": 1,
      "w": [
       "Heat worsens swelling.",
       "Correct. Cold causes vasoconstriction: less blood flow and less swelling.",
       "Heat is contraindicated.",
       "Heat is contraindicated."
      ],
      "h": "Inflamed → cold; stiff → hot."
     },
     {
      "q": "Heat therapy causes:",
      "o": [
       "Vasoconstriction",
       "Vasodilation (more blood flow)",
       "Numbness",
       "Swelling reduction"
      ],
      "a": 1,
      "w": [
       "That's cold.",
       "Correct. It relaxes stiff muscles. Use caution with diabetes or neuropathy.",
       "Heat doesn't numb; that's closer to what ice does.",
       "Cold reduces swelling."
      ],
      "h": "Heat = open the pipes."
     },
     {
      "q": "Periodisation phases in order are:",
      "o": [
       "Competition → preparation → pre-competition",
       "Preparation → pre-competition → competition",
       "Pre-competition → competition → preparation",
       "Random"
      ],
      "a": 1,
      "w": [
       "Competition can't come first; you build the base before you peak.",
       "Correct. Build the base and technique, then lift-specific work, then peak.",
       "Preparation (base and technique) must come first, not last.",
       "Periodisation is the opposite of random: planned phases toward a goal."
      ],
      "h": "Prep, Pre, Perform."
     },
     {
      "q": "The 'training triangle' rule says:",
      "o": [
       "Max out frequency, intensity and volume together",
       "If one of frequency, intensity or volume goes very high, bring another down",
       "Volume never matters",
       "Train every muscle daily"
      ],
      "a": 1,
      "w": [
       "A recipe for poor recovery.",
       "Correct. The lecturer's client progressed after cutting 14 weekly chest exercises.",
       "Volume is one corner of the triangle, and too much stalls progress.",
       "Daily training of every muscle leaves no room for recovery."
      ],
      "h": "Raise one corner, lower another."
     },
     {
      "q": "A client cuts their hand on a plate. First step?",
      "o": [
       "Keep training",
       "Apply pressure with a clean cloth and raise the part above the heart",
       "Pour hot water on it",
       "Bandage it tightly and leave"
      ],
      "a": 1,
      "w": [
       "Never train on with an open wound; stop the bleeding first.",
       "Correct. Stop the bleeding, then clean it with clean water and refer if needed.",
       "Hot water can scald and increases bleeding; use clean water and pressure.",
       "Clean it and check it."
      ],
      "h": "Press and raise."
     }
    ]
   }
  ]
 },
 {
  "id": "E104",
  "name": "Client Fitness Assessment",
  "kind": "viva",
  "color": "#0d9488",
  "blurb": "Health markers, fitness tests, intake and risk, SMART goals, onboarding, posture and corrective work.",
  "topics": [
   {
    "id": "e104-health",
    "title": "Fitness Components & Health Markers",
    "fact": "Gout is literally crystals. When uric acid runs too high, sharp urate crystals settle in the joints, often the big toe.",
    "primer": [
     "Flexibility = the range you CAN BE moved through. Mobility = the range you can move through actively, on your own.",
     "Know 5 blood markers: lipids, uric acid, glucose, haemoglobin, thyroid. Abnormal results mean medical clearance first.",
     "Fasting glucose 70–100 mg/dL normal. Type 1 = no insulin made; Type 2 = insulin resistance."
    ],
    "qs": [
     {
      "q": "Flexibility vs mobility: which statement is right?",
      "o": [
       "They are identical",
       "Flexibility can include outside help; mobility is range you achieve actively on your own",
       "Mobility is always bigger than flexibility",
       "Flexibility only applies to the spine"
      ],
      "a": 1,
      "w": [
       "The course separates them clearly.",
       "Correct. A partner pushing you to your toes shows flexibility; reaching them yourself shows mobility.",
       "Usually the reverse: passive range exceeds active range.",
       "It applies to all joints."
      ],
      "h": "Flexibility = how far you can BE moved; Mobility = how far you can MOVE."
     },
     {
      "q": "A client's fasting glucose is 118 mg/dL. Best action?",
      "o": [
       "Ignore it",
       "Above the 100 normal limit: refer for medical clearance before training",
       "Start HIIT immediately",
       "Put them on a no-carb diet yourself"
      ],
      "a": 1,
      "w": [
       "It is out of range.",
       "Correct. Coaches spot deviations; doctors diagnose. It is also a risk factor (>100) on the template.",
       "Clearance comes first.",
       "Diet changes need professional sign-off."
      ],
      "h": "Out of range → doctor first."
     },
     {
      "q": "Type 2 diabetes is best described as:",
      "o": [
       "The pancreas makes no insulin",
       "Insulin is made, but cells are resistant to it",
       "Too much glucagon",
       "A thyroid disorder"
      ],
      "a": 1,
      "w": [
       "That is Type 1.",
       "Correct. Insulin resistance.",
       "Glucagon raises sugar, but T2D is about cells resisting insulin, not excess glucagon.",
       "The thyroid controls metabolism; diabetes is a blood-sugar and insulin problem."
      ],
      "h": "Type 1 = no key; Type 2 = rusty lock."
     },
     {
      "q": "High uric acid can lead to:",
      "o": [
       "Anaemia",
       "Gout (crystals in the joints)",
       "Hypothyroidism",
       "Low blood pressure"
      ],
      "a": 1,
      "w": [
       "Anaemia is low haemoglobin.",
       "Correct. Purines from seafood and red meat contribute.",
       "Hypothyroidism is low thyroid hormone; uric acid causes gout.",
       "Uric acid doesn't drive blood pressure down; its classic result is gout."
      ],
      "h": "Uric acid high → joints cry."
     },
     {
      "q": "Normal haemoglobin for an adult woman (course table):",
      "o": [
       "8–10 g/dL",
       "12–16 g/dL",
       "14–18 g/dL",
       "18–22 g/dL"
      ],
      "a": 1,
      "w": [
       "8–10 g/dL would be anaemic; normal for adult women is 12–16.",
       "Correct. Adult men are 14–18.",
       "That is for adult men.",
       "18–22 g/dL is above even the men's range (14–18)."
      ],
      "h": "Women 12–16, men 14–18."
     },
     {
      "q": "Power is defined in E104 as:",
      "o": [
       "Force × velocity",
       "Mass × height",
       "Reps × sets",
       "Heart rate × age"
      ],
      "a": 0,
      "w": [
       "Correct. Maximal force in the shortest time, as in the snatch or kickboxing.",
       "Mass × height is a measure of potential energy, not power.",
       "That is a volume measure.",
       "Heart rate × age isn't a fitness formula; power = force × velocity."
      ],
      "h": "Power = Force × Speed."
     }
    ]
   },
   {
    "id": "e104-tests",
    "title": "Fitness Tests",
    "fact": "The Rockport walk formula takes body weight in POUNDS. Plugging in kilograms gives a VO₂max that looks impossibly good.",
    "primer": [
     "Cardio tests: resting HR, treadmill discomfort scale, Rockport 1-mile walk (VO₂max).",
     "Strength: grip dynamometer (static), xRM (dynamic). Reach the 1RM within 4–5 attempts; beginners use 8–15RM.",
     "Body fat: DEXA is the gold standard; BIA is quick but unreliable (food and fluid affect it)."
    ],
    "qs": [
     {
      "q": "The gold-standard body-composition method in the lecture is:",
      "o": [
       "BIA",
       "Skinfold callipers",
       "DEXA",
       "Tape measure"
      ],
      "a": 2,
      "w": [
       "The lecturer wouldn't rely on it.",
       "Good and cheap, but needs skill.",
       "Correct. Lowest error, but expensive. Hydrostatic weighing comes second.",
       "Simple but not accurate."
      ],
      "h": "DEXA = Definitely EXAct."
     },
     {
      "q": "In the Rockport 1-mile walk test, weight is entered in:",
      "o": [
       "Kilograms",
       "Pounds",
       "Stones",
       "Grams"
      ],
      "a": 1,
      "w": [
       "A classic mistake.",
       "Correct. The other inputs are age in years, time in decimal minutes and finishing HR.",
       "Stones aren't used; the Rockport formula takes POUNDS.",
       "Grams would give absurd numbers; the formula takes POUNDS."
      ],
      "h": "Rockport rocks in pounds."
     },
     {
      "q": "In a safe 1RM test, the max should be reached by about:",
      "o": [
       "The 1st attempt",
       "The 4th–5th attempt",
       "The 10th attempt",
       "After 20 warm-up reps"
      ],
      "a": 1,
      "w": [
       "Unsafe with no ramp-up.",
       "Correct. Warm up, then heavier sets of 2–3 reps with 2–3 min rest.",
       "Too many; fatigue lowers the true max.",
       "Fatigue lowers the true max."
      ],
      "h": "Max by attempt five."
     },
     {
      "q": "For a beginner, which strength test is most appropriate?",
      "o": [
       "1RM",
       "8–15RM",
       "Max deadlift single",
       "No test"
      ],
      "a": 1,
      "w": [
       "Reserved for advanced or athletic clients.",
       "Correct. Safer for beginners and intermediates.",
       "A max single is unsafe for a beginner; use 8–15RM.",
       "You always need a baseline to measure progress; just use a safer test (8–15RM)."
      ],
      "h": "Beginners test with reps, not singles."
     },
     {
      "q": "The CDC 4-stage balance test holds each position for:",
      "o": [
       "5 s",
       "10 s",
       "30 s",
       "60 s"
      ],
      "a": 1,
      "w": [
       "5 seconds is half the protocol time; each stage is held 10 seconds.",
       "Correct. Side by side, semi-tandem, tandem, then one foot.",
       "30 s isn't the CDC protocol; each stage is 10 s.",
       "60 s isn't the CDC protocol; each stage is 10 s."
      ],
      "h": "Four stages, ten seconds."
     },
     {
      "q": "How do you test endurance in a client who can't do a full push-up?",
      "o": [
       "Skip the test",
       "Knee or incline push-ups at a fixed angle",
       "Bench press 1RM",
       "Plank to failure only"
      ],
      "a": 1,
      "w": [
       "A baseline is still needed.",
       "Correct. Keep the angle the same at retest so you can compare.",
       "That tests strength.",
       "A plank to failure isn't the lecture's method; it uses push-up regressions at a fixed angle."
      ],
      "h": "Regress the angle, keep it fixed."
     }
    ]
   },
   {
    "id": "e104-risk",
    "title": "Client Intake & Risk Assessment",
    "fact": "Systolic blood pressure is read at the first clear tapping sound in the stethoscope. Diastolic is the moment the sounds disappear.",
    "primer": [
     "Pre-test rules: no food 2–3 h before, no smoking, no caffeine for about 30 min. Send the questionnaire ahead.",
     "CVD risk factors include age (men >45, women >55), family history, sedentary living, smoking, obesity, BP ≥140/90, glucose >100, LDL >130 or total cholesterol >200.",
     "Low = <2 factors. Moderate = ≥2 (clearance for vigorous work). High = symptoms or known disease (clearance before anything)."
    ],
    "qs": [
     {
      "q": "Which client is in the MODERATE risk category?",
      "o": [
       "A 30-year-old with no risk factors",
       "A man with 2 risk factors and no symptoms",
       "A client with known heart disease",
       "A symptomatic client with chest pain"
      ],
      "a": 1,
      "w": [
       "That is low risk.",
       "Correct. Two or more risk factors without symptoms or disease is moderate: medical clearance only for vigorous exercise.",
       "That is HIGH.",
       "That is HIGH."
      ],
      "h": "0–1 low, 2+ moderate, symptoms or disease high."
     },
     {
      "q": "The age risk factor applies to:",
      "o": [
       "Men >35, women >45",
       "Men >45, women >55",
       "Everyone over 60",
       "Men >55, women >65"
      ],
      "a": 1,
      "w": [
       "Too young.",
       "Correct.",
       "Not the template; the cut-offs are men >45 and women >55.",
       "Those ages belong to the family-history factor."
      ],
      "h": "Age 45/55; family history 55/65."
     },
     {
      "q": "How do you take resting HR during intake?",
      "o": [
       "Right after the warm-up",
       "After 5+ min seated rest: radial artery, two fingers, count for a full minute",
       "Count for 5 s and multiply by 12",
       "While the client is talking"
      ],
      "a": 1,
      "w": [
       "It would be elevated.",
       "Correct.",
       "The course counts for a full minute; short counts multiply any error.",
       "Talking raises HR."
      ],
      "h": "Sit five, two fingers, sixty seconds."
     },
     {
      "q": "Which is NOT a correct BP-measurement condition?",
      "o": [
       "Back supported, feet flat",
       "Arm supported",
       "Chatting with the client during the reading",
       "Correct cuff size for the arm"
      ],
      "a": 2,
      "w": [
       "This IS required; the incorrect condition is talking during the reading.",
       "This IS required; the incorrect condition is talking during the reading.",
       "Correct, this is the wrong one. No talking during the test; ask questions before.",
       "This IS required; the incorrect condition is talking during the reading."
      ],
      "h": "Silence, support, the right cuff."
     },
     {
      "q": "The sedentary risk factor means not doing:",
      "o": [
       "10,000 steps daily",
       "≥30 min of moderate activity, ≥3 days a week, for ≥3 months",
       "Any HIIT",
       "Gym training for 1 year"
      ],
      "a": 1,
      "w": [
       "Not the template wording; it's ≥30 min moderate activity, ≥3 days a week, for ≥3 months.",
       "Correct. Remember 30-3-3.",
       "HIIT isn't required; any moderate activity counts toward the 30-3-3 rule.",
       "The definition is 30-3-3 (minutes, days, months), not gym membership."
      ],
      "h": "Thirty minutes, three days, three months."
     },
     {
      "q": "For a trainer, which posture assessment is more useful?",
      "o": [
       "Static",
       "Dynamic",
       "X-ray",
       "None"
      ],
      "a": 1,
      "w": [
       "Static is more of a physiotherapist's tool.",
       "Correct. Overhead squat, push-up and row show how the client moves under a load.",
       "X-rays are medical diagnostics, outside a trainer's scope.",
       "Posture assessment is essential for finding imbalances before programming."
      ],
      "h": "Coaches watch movement."
     }
    ]
   },
   {
    "id": "e104-goals",
    "title": "Goals, Onboarding & Progress",
    "fact": "Clients rarely state their real goal first. 'I just want to be fit' turned out to mean 'I want to run a 10K' in the course's Joanna case.",
    "primer": [
     "SMART = Specific, Measurable, Achievable, Realistic/Relevant, Time-bound. Short-term goals are stepping stones to long-term ones.",
     "First call: open-ended questions and active listening (don't interrupt; rephrase back). Set expectations for calls, channels and hours.",
     "Track weekly (every 2–3 days for new clients). Re-test fitness every 4–6 weeks. Tackle non-adherence in week 1."
    ],
    "qs": [
     {
      "q": "Which goal is SMART?",
      "o": [
       "I want to look like a model",
       "I want to get fit",
       "Lose 5% of body weight in 12 weeks by training 3×/week and tracking food",
       "Lose 10 kg in a month"
      ],
      "a": 2,
      "w": [
       "Not realistic or measurable.",
       "Vague.",
       "Correct. It is specific, measurable, achievable, relevant and time-bound.",
       "Not achievable or safe."
      ],
      "h": "Dig, SMART it, then stairstep it."
     },
     {
      "q": "Which is an OPEN-ended question?",
      "o": [
       "Do you eat eggs?",
       "What kinds of food do you enjoy?",
       "Are you vegetarian?",
       "Do you train mornings?"
      ],
      "a": 1,
      "w": [
       "Yes/no.",
       "Correct. It invites detail.",
       "Yes/no.",
       "Yes/no."
      ],
      "h": "Open questions start with What, How, Tell me."
     },
     {
      "q": "How often should a NEW client be checked in during the first 2–3 weeks?",
      "o": [
       "Monthly",
       "Every 2–3 days",
       "Never",
       "Only at the 12-week mark"
      ],
      "a": 1,
      "w": [
       "Too rare early on.",
       "Correct. New clients need hand-holding; later move to weekly or fortnightly.",
       "New clients need the MOST contact; never checking in guarantees drop-off.",
       "Too late."
      ],
      "h": "New client = close contact."
     },
     {
      "q": "A formal fitness re-test should be scheduled every:",
      "o": [
       "Week",
       "4–6 weeks",
       "Year",
       "Never"
      ],
      "a": 1,
      "w": [
       "Too frequent.",
       "Correct. Coaches often forget, so put it in the calendar.",
       "Too rare.",
       "It is essential."
      ],
      "h": "Re-test monthly-ish (4–6 weeks)."
     },
     {
      "q": "A client skips the plan in week 1. Best response?",
      "o": [
       "Wait a month",
       "Call immediately, find the cause, explain the rationale, adjust intensity (RPE/RIR)",
       "Drop the client",
       "Double the workload"
      ],
      "a": 1,
      "w": [
       "Small hiccups grow.",
       "Correct. Causes include work, family, confidence and illness. Refer if it's stress or medical.",
       "Dropping the client ignores the cause; find out why and adjust.",
       "Doubling the work makes adherence worse; regulate intensity with RPE/RIR instead."
      ],
      "h": "Week-one wobble → pick up the phone."
     },
     {
      "q": "What does a nutrition template call out specifically?",
      "o": [
       "Only total calories",
       "Cooking oil/ghee amounts, raw weights, and macro totals",
       "Brand names only",
       "Nothing; just a food list"
      ],
      "a": 1,
      "w": [
       "Not enough.",
       "Correct. Plus BMR, TDEE and calories at the top, with clear headings and units.",
       "Brand names don't tell the client amounts; they need weights, units and oil specified.",
       "Too vague."
      ],
      "h": "Raw weights, oil named, totals at the bottom."
     }
    ]
   },
   {
    "id": "e104-posture",
    "title": "Posture & Corrective Exercise",
    "fact": "Hold a static stretch about 30 seconds and the Golgi tendon organ overrides the muscle spindle's stretch reflex. The muscle 'lets go'. That is autogenic inhibition.",
    "primer": [
     "Imbalance causes: occupation, sport, lack of training, posture, structural disproportion.",
     "Stretch the short (overactive) muscles; strengthen the long (underactive) ones. Spindle = stretch → contract; GTO = tension → relax.",
     "Overhead squat faults: feet turn out, knees cave in, forward lean, low-back arch or rounding, arms fall forward."
    ],
    "qs": [
     {
      "q": "Knees cave in during the overhead squat. Strengthen ___ and stretch ___.",
      "o": [
       "Quads; hamstrings",
       "Glute medius; adductors",
       "Calves; tibialis",
       "Lats; pecs"
      ],
      "a": 1,
      "w": [
       "Quads and hamstrings aren't the drivers of knee valgus; hip abductors and adductors are.",
       "Correct. Weak hip abductors and short adductors cause valgus.",
       "That's for heels rising (reversed).",
       "That's for arms falling forward (reversed)."
      ],
      "h": "Knees in → med out (glute med strong, adductors long)."
     },
     {
      "q": "Arms fall forward in the overhead squat. Which muscles need stretching?",
      "o": [
       "Calves",
       "Pec major and lats",
       "Hamstrings",
       "Glutes"
      ],
      "a": 1,
      "w": [
       "Calves relate to heels rising.",
       "Correct. Strengthen the traps and rear delts.",
       "Hamstrings relate to low-back rounding.",
       "Glutes are usually the weak side."
      ],
      "h": "Arms drop → open pecs and lats."
     },
     {
      "q": "Holding a stretch about 30 s causes:",
      "o": [
       "Reciprocal inhibition",
       "Autogenic inhibition through the GTO",
       "A stronger spindle reflex",
       "Muscle damage"
      ],
      "a": 1,
      "w": [
       "Reciprocal inhibition is the ANTAGONIST relaxing.",
       "Correct. The same muscle relaxes as the GTO overrides the spindle.",
       "The spindle is overridden.",
       "A 30 s stretch hold doesn't damage muscle; it triggers GTO-driven relaxation."
      ],
      "h": "GTO = Go-To-relax."
     },
     {
      "q": "Why does a chronically SHORTENED muscle produce less force?",
      "o": [
       "It has fewer nerves",
       "Its resting length changes, so fewer actin–myosin cross-bridges can form",
       "It has more fat",
       "It loses its tendon"
      ],
      "a": 1,
      "w": [
       "Nerve count doesn't change with length; the issue is filament overlap.",
       "Correct. This is the sliding filament theory link.",
       "Fat content isn't the issue; resting length changes the cross-bridge overlap.",
       "The tendon stays; what changes is the muscle's resting length."
      ],
      "h": "Wrong length = fewer handshakes between actin and myosin."
     },
     {
      "q": "Shoulder elevation in push or pull assessments: strengthen ___, stretch ___.",
      "o": [
       "Mid and lower traps; upper traps",
       "Upper traps; lower traps",
       "Pecs; lats",
       "Biceps; triceps"
      ],
      "a": 0,
      "w": [
       "Correct.",
       "Reversed. Upper traps are already overactive (stretch them); mid and lower traps need strengthening.",
       "Pecs and lats are the fix for arms falling forward, not shoulder elevation.",
       "Biceps and triceps don't control shoulder elevation."
      ],
      "h": "Shrugging shoulders → lower traps up, upper traps calm down."
     },
     {
      "q": "When should corrective work be programmed?",
      "o": [
       "Never",
       "Ideally the first 4 weeks, or 15–20 min after the warm-up each session",
       "Only on rest days",
       "At the end of the year"
      ],
      "a": 1,
      "w": [
       "It is a priority.",
       "Correct.",
       "Rest days are for recovery; corrective work goes into the first 4 weeks or after each warm-up.",
       "Too late."
      ],
      "h": "Fix first, then perform."
     },
     {
      "q": "A client feels sharp pain during corrective work. You:",
      "o": [
       "Push through",
       "Stop and refer to a physiotherapist",
       "Add load",
       "Ignore it"
      ],
      "a": 1,
      "w": [
       "Pushing through sharp pain risks injury; stop and refer to a physio.",
       "Correct. Coaches correct imbalances; they don't treat injuries.",
       "Adding load to a painful movement makes things worse; stop and refer.",
       "Pain is a red flag; coaches refer it to a physiotherapist."
      ],
      "h": "Pain → physio."
     }
    ]
   }
  ],
  "viva": [
   {
    "q": "A new client arrives for intake. Walk me through your health and risk assessment.",
    "p": [
     "Send the questionnaire and pre-test rules in advance (no food 2–3 h, no smoking, no caffeine ~30 min)",
     "Measure resting HR (5 min seated, radial pulse, full minute) and resting BP (supported, silent, correct cuff)",
     "Record weight and body composition under standard conditions",
     "Count CVD risk factors (age, family history, sedentary, smoking, obesity, BP, glucose, lipids)",
     "Assign low, moderate or high risk and decide on medical clearance",
     "Then lifestyle factors and posture assessment"
    ],
    "tip": "Use the order: prepare, measure, score risk, decide clearance, lifestyle, posture."
   },
   {
    "q": "Explain the three risk categories and what each means for exercise.",
    "p": [
     "Low: fewer than 2 risk factors, no symptoms; moderate and vigorous exercise OK",
     "Moderate: 2 or more risk factors; moderate exercise OK, medical clearance for vigorous (>60% HRmax)",
     "High: symptoms or known cardiac, pulmonary, renal or metabolic disease; medical clearance plus a supervised test before any exercise",
     "Testing for moderate and high risk needs a CPR/AED-certified professional or medical personnel"
    ],
    "tip": "Say the numbers: 220 − age, moderate 40–60%, vigorous >60%."
   },
   {
    "q": "How would you test a beginner's strength safely?",
    "p": [
     "General warm-up, then specific warm-up sets",
     "Use an 8–15RM rather than a 1RM for beginners or intermediates",
     "Rest 2–3 minutes between attempts and keep strict form",
     "Alternatively a grip dynamometer (static strength)",
     "Record the result and re-test in 4–6 weeks"
    ],
    "tip": "Mention why: injury risk with maximal loads and poor form."
   },
   {
    "q": "Which body-fat methods do you know, and which is most accurate?",
    "p": [
     "DEXA: gold standard, about 2–3% error, also gives bone density, expensive",
     "Hydrostatic weighing: about 2% when done perfectly, but hard to access",
     "Skinfold callipers: cheap, needs skill, about 3.5–5%",
     "Circumference (US Army formula) and BIA: quick but less accurate; BIA is affected by food and fluid"
    ],
    "tip": "Close with the coaching angle: combine numbers with photos and tape measurements."
   },
   {
    "q": "A client says 'I want to lose weight and look good.' Turn it into a SMART goal.",
    "p": [
     "Probe for the real goal, e.g. how much, by when, and why",
     "Specific: e.g. lose 5% of body weight",
     "Measurable: weekly weigh-ins and waist measurements",
     "Achievable and realistic: about 0.5–1 kg a week",
     "Time-bound: 12 weeks, with monthly short-term milestones"
    ],
    "tip": "Name every SMART letter out loud as you build the goal."
   },
   {
    "q": "How do you run the first onboarding call with a client?",
    "p": [
     "Review the pre-filled questionnaire and clear queries",
     "Ask open-ended questions",
     "Listen actively: don't interrupt, then rephrase their words back",
     "Set expectations: weekly call day and time, channels, working hours, no preferential treatment",
     "Explain the templates and the plan's lingo (reps, sets, macros)"
    ],
    "tip": "Quote the lecture: it's not what you ask, it's how you ask."
   },
   {
    "q": "Describe the overhead squat assessment and two faults with their fixes.",
    "p": [
     "Feet shoulder-width, toes forward, arms overhead beside the ears; squat until the femur is parallel",
     "Watch for feet turning out, knees caving in, forward lean, low-back arch or rounding, arms falling forward",
     "Knees in: strengthen glute medius, stretch adductors",
     "Forward lean: strengthen glutes and abs, stretch hip flexors",
     "Arms forward: strengthen traps and rear delts, stretch pecs and lats"
    ],
    "tip": "Give the rule: stretch the short, strengthen the long."
   },
   {
    "q": "Explain the muscle spindle, the GTO, and why we hold static stretches for about 30 seconds.",
    "p": [
     "The muscle spindle sits in the muscle belly, senses stretch and triggers contraction (stretch reflex)",
     "The GTO sits at the musculotendinous junction, senses tension and triggers relaxation",
     "Holding about 30 s lets the GTO override the spindle: autogenic inhibition",
     "The muscle relaxes back toward its normal resting length"
    ],
    "tip": "Contrast autogenic (same muscle) with reciprocal (antagonist) inhibition."
   },
   {
    "q": "What causes muscle imbalances and why should we correct them before performance training?",
    "p": [
     "Causes: occupation (sitting), sport (one-sided), lack of training, posture, structural disproportion",
     "Effects: asymmetry, reduced ROM, suboptimal force, injury risk",
     "Relative flexibility: the body compensates using synergists and stabilisers",
     "Shortened muscles produce less force because fewer cross-bridges are available"
    ],
    "tip": "Mention scope: coaches correct posture, physios treat injuries."
   },
   {
    "q": "A client's blood report shows abnormal values. How do you handle it?",
    "p": [
     "Know the normal ranges: glucose, lipids, uric acid, haemoglobin, thyroid",
     "Spot the deviation but don't diagnose",
     "Refer for medical clearance before training",
     "Diet changes need doctor or nutrition-professional approval",
     "Keep monitoring and work alongside their physician"
    ],
    "tip": "Use a real example, e.g. fasting glucose 118 is above the 100 limit."
   }
  ]
 },
 {
  "id": "E107",
  "name": "Exercise Plan Design",
  "kind": "viva",
  "color": "#8b5cf6",
  "blurb": "Session structure, program design by goal and level, selection and ordering, writing the plan, customising, recovery.",
  "topics": [
   {
    "id": "e107-session",
    "title": "Components of a Session",
    "fact": "Long static stretching right before lifting can temporarily reduce strength and power. That's why static holds live in the cool-down.",
    "primer": [
     "Session = warm-up (10–12 min, ≤15) → main workout → cool-down (5–10 min static, 10–30 s holds). About 60–75 min total.",
     "A late client never loses the warm-up; cut sets or exercises instead.",
     "Separate cardio and weights by 6+ hours if possible. Same session: weights first, unless endurance is the goal."
    ],
    "qs": [
     {
      "q": "A client arrives 15 minutes late. What do you cut?",
      "o": [
       "The warm-up",
       "Part of the main workout (e.g. 2 sets instead of 3, or drop an exercise)",
       "The whole session",
       "The cool-down only, and keep everything else"
      ],
      "a": 1,
      "w": [
       "Never skip the warm-up.",
       "Correct. Keep the warm-up and protect the session's quality.",
       "Not necessary.",
       "The main block is the place to trim."
      ],
      "h": "Warm-up is non-negotiable."
     },
     {
      "q": "The ideal warm-up length per the lecture is:",
      "o": [
       "2–3 min",
       "10–12 min (max ~15)",
       "30 min",
       "45 min"
      ],
      "a": 1,
      "w": [
       "Too short.",
       "Correct. General cardio, then dynamic mobility, then specific warm-up sets.",
       "Eats into the main workout.",
       "Far too long."
      ],
      "h": "Ten to twelve, then lift."
     },
     {
      "q": "If cardio and weights must share one session (goal: muscle), order them:",
      "o": [
       "Cardio first",
       "Weights first, then cardio",
       "Alternate sets",
       "It doesn't matter"
      ],
      "a": 1,
      "w": [
       "Cardio first causes fatigue and less lifting volume.",
       "Correct. Unless endurance is the priority.",
       "Alternating cardio and lifting sets isn't the course advice; lift first, then cardio.",
       "It matters for strength and size."
      ],
      "h": "Lift, then run."
     },
     {
      "q": "How far apart should separate cardio and RT sessions ideally be?",
      "o": [
       "30 min",
       "2 h",
       "6+ hours",
       "3 days"
      ],
      "a": 2,
      "w": [
       "Too close.",
       "Still close.",
       "Correct. This has a minimal effect on performance.",
       "Three days is unnecessary; 6+ hours apart already minimises the effect."
      ],
      "h": "Six hours apart."
     },
     {
      "q": "Which is a stated purpose of the warm-up?",
      "o": [
       "Max out heart rate",
       "Speed up nerve impulses and increase ROM",
       "Cause fatigue",
       "Burn the day's calories"
      ],
      "a": 1,
      "w": [
       "A warm-up raises HR gradually; maxing it out would fatigue the client.",
       "Correct. It also raises temperature and blood flow and practises the movement.",
       "Fatigue is what the warm-up must avoid; it should prepare, not tire.",
       "Calorie burn isn't a warm-up goal; preparation is."
      ],
      "h": "Warm, wire, widen (temp, nerves, ROM)."
     }
    ]
   },
   {
    "id": "e107-design",
    "title": "Program Design: Goals & Levels",
    "fact": "Ten years in the gym doesn't make someone advanced. If they still wobble with 20 kg, the course says classify them by movement quality, not years.",
    "primer": [
     "4 goals: fat loss, muscle gain, endurance, overall health.",
     "Level by motor-learning stage: cognitive (beginner) → associative (intermediate) → autonomous (advanced). If unsure, go one level lower.",
     "Interference effect: concurrent cardio + RT blunts strength and size, mostly in the lower body. Keep cardio <30 min, <3×/week; HIIT interferes less; negligible for beginners."
    ],
    "qs": [
     {
      "q": "An 'associative stage' lifter is classified as:",
      "o": [
       "Beginner",
       "Intermediate",
       "Advanced",
       "Elite only"
      ],
      "a": 1,
      "w": [
       "Beginners are in the cognitive stage.",
       "Correct. Refined movement with few major flaws; still shaky under heavy loads.",
       "Advanced is the autonomous stage.",
       "The associative stage is intermediate; elite performers are autonomous."
      ],
      "h": "C-A-A: Cognitive, Associative, Autonomous."
     },
     {
      "q": "If unsure of a client's level, the course says:",
      "o": [
       "Assume advanced",
       "Classify them a level lower",
       "Use years trained only",
       "Test their 1RM first"
      ],
      "a": 1,
      "w": [
       "Risky.",
       "Correct. It's safer to progress them up than to over-load them.",
       "The course calls this ineffective on its own.",
       "A 1RM test on an unknown client is risky; classify by movement quality first."
      ],
      "h": "When in doubt, level down."
     },
     {
      "q": "The interference effect is MOST significant for:",
      "o": [
       "Upper-body hypertrophy",
       "Lower-body strength and size",
       "Flexibility",
       "Beginners in their first month"
      ],
      "a": 1,
      "w": [
       "The effect there is insignificant.",
       "Correct. Concurrent training blunts it most.",
       "Flexibility isn't what concurrent training interferes with; strength and size are.",
       "Negligible for beginners."
      ],
      "h": "Cardio interferes most with the legs."
     },
     {
      "q": "Which cardio interferes LESS with strength gains?",
      "o": [
       "Long LISS",
       "HIIT",
       "Daily marathons",
       "Long cycling"
      ],
      "a": 1,
      "w": [
       "More interference.",
       "Correct. The course also suggests keeping cardio <30 min and <3×/week.",
       "Daily marathons would interfere massively with strength work.",
       "Long steady cycling is LISS-type work, which interferes more than HIIT."
      ],
      "h": "Short and sharp interferes less."
     },
     {
      "q": "Why shouldn't a beginner's plan change every week?",
      "o": [
       "Boredom is good",
       "They're still learning the movement (neuromuscular adaptation)",
       "Coaches are busy",
       "Changes cause DOMS only"
      ],
      "a": 1,
      "w": [
       "Boredom isn't the logic; skill learning is.",
       "Correct. Change once the skill is mastered, then add intensity.",
       "Coach convenience isn't the reason; the client is still learning the movement.",
       "Not the reason given."
      ],
      "h": "Learn it, then load it."
     },
     {
      "q": "A beginner endurance prescription from the lecture:",
      "o": [
       "90 min daily at 90%",
       "20–40 min, 40–60% intensity, 1–3 days a week, plus ≥2 RT days",
       "10 min once a week",
       "HIIT only"
      ],
      "a": 1,
      "w": [
       "Far too much.",
       "Correct.",
       "Too little.",
       "Not for beginners."
      ],
      "h": "20–40 min, 40–60%, 1–3 days."
     }
    ]
   },
   {
    "id": "e107-select",
    "title": "Exercise Selection & Ordering",
    "fact": "If grip fails before your hamstrings in a Romanian deadlift, you've chosen a grip exercise. Swap to a leg curl or use straps.",
    "primer": [
     "Selection: limiting factor (the target muscle should fail first), compound vs isolation, free weights vs machines.",
     "Ordering: technique-heavy → compound → big muscles → small. Exception: prioritise the goal or weakness.",
     "Set types: straight, group, superset (2, opposing), compound set (2, same muscle), tri-set (3), giant set (4+), circuit, pyramid."
    ],
    "qs": [
     {
      "q": "'Limiting factor' means the exercise should be limited by:",
      "o": [
       "Grip",
       "The target muscle fatiguing first",
       "Cardio fitness",
       "Boredom"
      ],
      "a": 1,
      "w": [
       "If grip fails first, that's the wrong exercise for the goal.",
       "Correct.",
       "Cardio fitness shouldn't stop a strength set; the target muscle should be what tires.",
       "Boredom isn't a training factor; the target muscle should fail first."
      ],
      "h": "The target should tap out first."
     },
     {
      "q": "A lat pulldown is classified as a:",
      "o": [
       "Unsupported compound",
       "Supported compound",
       "Isolation",
       "Plyometric"
      ],
      "a": 1,
      "w": [
       "The deadlift is unsupported.",
       "Correct. A machine or bench supports the body.",
       "The straight-arm pulldown is isolation.",
       "Plyometrics are explosive jumps; a lat pulldown is a seated machine pull."
      ],
      "h": "Seat holds you = supported."
     },
     {
      "q": "Which ordering rule is the EXCEPTION to the others?",
      "o": [
       "Compound before isolation",
       "Big muscles before small",
       "Prioritise the goal or weakness",
       "Technique-heavy first"
      ],
      "a": 2,
      "w": [
       "This is a standard rule; the exception is prioritising the goal or weakness.",
       "This is a standard rule; the exception is prioritising the goal or weakness.",
       "Correct. A powerlifter with a weak bench may bench before squats.",
       "This is a standard rule; the exception is prioritising the goal or weakness."
      ],
      "h": "The goal overrides the rules."
     },
     {
      "q": "Two exercises back-to-back for OPPOSING muscles (leg extension + leg curl) is a:",
      "o": [
       "Compound set",
       "Superset",
       "Giant set",
       "Pyramid"
      ],
      "a": 1,
      "w": [
       "A compound set targets the SAME muscle.",
       "Correct.",
       "A giant set is 4 or more exercises.",
       "A pyramid changes intensity from set to set."
      ],
      "h": "Super = opposites attract."
     },
     {
      "q": "Free weights vs machines for strength gains:",
      "o": [
       "Machines are always better",
       "No significant difference, but specificity favours free weights for powerlifters",
       "Free weights always double the gains",
       "Machines build no strength"
      ],
      "a": 1,
      "w": [
       "Studies show no significant difference; machines aren't 'always better'.",
       "Correct. Machines suit rehab and beginners; free weights recruit more stabilisers.",
       "There's no such doubling; strength gains are similar.",
       "Machines do build strength; gains are similar to free weights."
      ],
      "h": "Same strength, different skill."
     },
     {
      "q": "Is circuit training a good main method for a marathon runner?",
      "o": [
       "Yes, it's the best endurance method",
       "No; fine for untrained strength-endurance, but specificity says run",
       "Yes, if done daily",
       "Only with heavy weights"
      ],
      "a": 1,
      "w": [
       "Not per specificity.",
       "Correct.",
       "Doing circuits daily still isn't running; specificity says train the event.",
       "Heavy circuits still don't build marathon-specific endurance."
      ],
      "h": "To run far, you run."
     }
    ]
   },
   {
    "id": "e107-write",
    "title": "Writing the Plan: FITT, TUT, Tempo, Rest",
    "fact": "Tempo '3-1-1-0' on a squat means 3 s down, 1 s pause at the bottom, 1 s up and no pause at the top.",
    "primer": [
     "FITT drives the plan. 4 days a week → upper/lower; 6 days → PPL × 2; 3 days → full body or PPL.",
     "Tempo notation: Eccentric – Pause (bottom) – Concentric – Pause (top).",
     "Intensity and bar velocity are inversely related. About 3 min rest beat 1 min for strength and size in trained lifters."
    ],
    "qs": [
     {
      "q": "Read the tempo 2-1-2-1 for a biceps curl.",
      "o": [
       "2 s up, 1 s pause, 2 s down, 1 s pause",
       "2 s down (eccentric), 1 s hold at the bottom, 2 s up, 1 s hold at the top",
       "Always the concentric first",
       "2 reps, 1 set, 2 min rest, 1 drop set"
      ],
      "a": 1,
      "w": [
       "The first digit is the ECCENTRIC.",
       "Correct. E-P-C-P.",
       "The eccentric comes first in the notation.",
       "Tempo describes rep speed in seconds, not sets, reps or rest."
      ],
      "h": "E-P-C-P: Eccentric, Pause, Concentric, Pause."
     },
     {
      "q": "A client can train 4 days a week and wants each muscle trained twice. Best split?",
      "o": [
       "Bro split",
       "Upper/lower",
       "Full body once",
       "PPL once"
      ],
      "a": 1,
      "w": [
       "That's once a week per muscle.",
       "Correct. Upper, lower, upper, lower.",
       "Under-dosed.",
       "Only 3 days."
      ],
      "h": "4 days → U/L/U/L."
     },
     {
      "q": "As intensity (%1RM) goes up, bar velocity:",
      "o": [
       "Goes up",
       "Goes down (inverse relationship)",
       "Stays the same",
       "Doubles"
      ],
      "a": 1,
      "w": [
       "Heavier loads move SLOWER; intensity and velocity are inversely related.",
       "Correct. Time under tension per rep goes up.",
       "Bar speed does change with load: heavier means slower.",
       "Heavier loads slow the bar down; they don't speed it up."
      ],
      "h": "Heavier = slower."
     },
     {
      "q": "Rest between sets for hypertrophy in trained lifters, per the cited study:",
      "o": [
       "10 s",
       "1 min beats 3 min",
       "About 3 min beats 1 min",
       "No rest"
      ],
      "a": 2,
      "w": [
       "10 s is far too little recovery for quality sets.",
       "The reverse of the finding.",
       "Correct. Better recovery keeps mechanical tension high on the next set.",
       "No rest means fatigue limits tension; about 3 min worked better."
      ],
      "h": "Rest three, grow free."
     },
     {
      "q": "Why is a slow, dictated tempo useful for beginners?",
      "o": [
       "It burns more calories",
       "It helps them feel the movement and lets the coach spot errors",
       "It's required for strength",
       "It prevents DOMS"
      ],
      "a": 1,
      "w": [
       "Calorie burn isn't the reason; learning and error-spotting are.",
       "Correct. It matters less for intermediate and advanced lifters.",
       "Heavy loads matter more for strength.",
       "Tempo isn't about preventing soreness; it helps motor learning."
      ],
      "h": "Slow to learn, then go."
     }
    ]
   },
   {
    "id": "e107-custom",
    "title": "Customising the Plan",
    "fact": "Somatotypes came from Dr W. H. Sheldon in the 1940s, who also linked body shape to personality. Science dismissed it, but 'ectomorph diets' live on.",
    "primer": [
     "Can't control: fibre type and anatomy. Can influence: lifestyle, stress, sleep.",
     "High stress → keep volume low (≤2 sets per exercise) and prioritise recovery. Poor sleep → cut frequency, intensity and volume.",
     "Somatotype doesn't dictate training. Women have more Type I fibre, tolerate more volume, and may need longer recovery from power work."
    ],
    "qs": [
     {
      "q": "Which customisation factor CAN the coach influence?",
      "o": [
       "Fibre type",
       "Bone lengths",
       "Sleep",
       "Tendon insertions"
      ],
      "a": 2,
      "w": [
       "Fibre type is genetic, so you can't change it. Sleep you can.",
       "Fixed (anatomy).",
       "Correct. Lifestyle and stress can be influenced too.",
       "Tendon insertion points are anatomy, so they're fixed."
      ],
      "h": "F-A fixed | L-S-S changeable."
     },
     {
      "q": "A highly stressed client sleeping 5 hours. Volume guidance:",
      "o": [
       "Max volume to burn stress",
       "Keep it minimal, e.g. ≤2 sets per exercise and about 8–12 sets per session",
       "Train to failure daily",
       "Add HIIT every day"
      ],
      "a": 1,
      "w": [
       "Raises cortisol and recovery debt.",
       "Correct. Also lower frequency and prioritise sleep.",
       "Training to failure daily adds stress and recovery debt; do the opposite.",
       "Daily HIIT adds stress; a stressed client needs a smaller dose."
      ],
      "h": "Stressed body, smaller dose."
     },
     {
      "q": "Should an 'ectomorph' train fundamentally differently?",
      "o": [
       "Yes, cardio only",
       "No, plan by goals, preferences and body composition",
       "Yes, no weights",
       "Only eat more carbs"
      ],
      "a": 1,
      "w": [
       "Body type doesn't dictate cardio-only training; goals do.",
       "Correct. Somatotype is not destiny.",
       "Banning weights based on a somatotype label isn't supported.",
       "Diet isn't set by somatotype; goals and body composition decide."
      ],
      "h": "Somatotype ≠ destiny."
     },
     {
      "q": "Compared with men, women on average:",
      "o": [
       "Have more Type II fibre",
       "Have about 27–35% more Type I fibre and tolerate more volume",
       "Can't build muscle",
       "Recover faster from power work"
      ],
      "a": 1,
      "w": [
       "Reversed. Women have MORE Type I (slow-twitch) fibre.",
       "Correct. They have greater capillary density too.",
       "False. Women build muscle with resistance training.",
       "They may need LONGER recovery from power work."
      ],
      "h": "More Type I, more volume tolerance."
     },
     {
      "q": "A client with long femurs struggles to deadlift. A sensible option:",
      "o": [
       "Force a conventional deadlift",
       "Try a trap (hex) bar and adjust stance",
       "Ban all hinges",
       "Only do curls"
      ],
      "a": 1,
      "w": [
       "Anatomy differs; don't force a template.",
       "Correct. Respect structure.",
       "Unnecessary.",
       "Abandoning compound work isn't the answer; adapt the lift to the person."
      ],
      "h": "Fit the lift to the levers."
     },
     {
      "q": "Introducing lifestyle changes should be:",
      "o": [
       "All at once on day 1",
       "Gradual, one step at a time",
       "Avoided",
       "Only in the final month"
      ],
      "a": 1,
      "w": [
       "Overwhelming, and the client quits.",
       "Correct. For example sleep, then hydration, then training, then nutrition.",
       "They matter.",
       "Gradual means starting now, one habit at a time, not waiting."
      ],
      "h": "One habit at a time."
     }
    ]
   },
   {
    "id": "e107-recovery",
    "title": "Recovery & Relaxation",
    "fact": "Contrast water therapy works like a pump. Alternating hot and cold drives vessels to dilate and constrict, which helps clear metabolites.",
    "primer": [
     "DOMS peaks about 24–48 h (up to 72 h) after new, eccentric-heavy or sudden-intensity work. Beginners get it most.",
     "Recovery options: massage and foam rolling, compression, cold-water immersion (<11 °C, 11–15 min), contrast therapy, active recovery (15–40 min easy), meditation.",
     "Stretch types: static, dynamic, ballistic (bouncing, abandoned as unsafe), PNF (rehab, needs a partner)."
    ],
    "qs": [
     {
      "q": "Who experiences MORE DOMS?",
      "o": [
       "Advanced lifters",
       "Beginners",
       "Nobody",
       "Only runners"
      ],
      "a": 1,
      "w": [
       "Their bodies have adapted.",
       "Correct. The exercise is more novel to them.",
       "Most people get DOMS after unaccustomed work.",
       "DOMS isn't limited to runners; beginners in any training get it most."
      ],
      "h": "New lifter, new soreness."
     },
     {
      "q": "Cold-water immersion parameters from the lecture:",
      "o": [
       "20 °C for 2 min",
       "Below about 11 °C for 11–15 min",
       "0 °C for 1 hour",
       "Hot then sauna"
      ],
      "a": 1,
      "w": [
       "Not cold enough.",
       "Correct.",
       "0 °C for an hour risks hypothermia; the course says <11 °C for 11–15 min.",
       "That's not cold immersion."
      ],
      "h": "Eleven and eleven-to-fifteen."
     },
     {
      "q": "Which stretch type was largely abandoned for safety reasons?",
      "o": [
       "Static",
       "Dynamic",
       "Ballistic (bouncing)",
       "PNF"
      ],
      "a": 2,
      "w": [
       "Still used in the cool-down.",
       "Used in the warm-up.",
       "Correct.",
       "Used in rehab with a trained partner."
      ],
      "h": "Ballistic bounces you into injury."
     },
     {
      "q": "The key principle for reducing post-workout soreness is:",
      "o": [
       "Total rest",
       "Increasing blood flow to the muscles",
       "Painkillers",
       "More eccentrics"
      ],
      "a": 1,
      "w": [
       "Inactivity slows clearance.",
       "Correct. Every modality aims at this.",
       "Painkillers mask pain; the course principle is increasing blood flow.",
       "That increases DOMS."
      ],
      "h": "Blood flow fixes DOMS."
     },
     {
      "q": "Meditation and deep breathing aid recovery by increasing:",
      "o": [
       "Sympathetic activity",
       "Parasympathetic (rest and digest) activity",
       "Cortisol",
       "Heart rate"
      ],
      "a": 1,
      "w": [
       "That's fight or flight.",
       "Correct.",
       "The opposite. Relaxation LOWERS cortisol.",
       "The opposite. Deep breathing LOWERS heart rate."
      ],
      "h": "Breathe to switch to rest and digest."
     }
    ]
   }
  ],
  "viva": [
   {
    "q": "Walk me through the structure of a training session.",
    "p": [
     "Warm-up 10–12 min (max ~15): general cardio, dynamic mobility, exercise-specific warm-up sets",
     "Main workout: aerobic, anaerobic or both, based on the goal",
     "If combined: resistance training first, then cardio (unless endurance is the goal); ideally separate by 6+ h",
     "Cool-down 5–10 min of static stretching, 10–30 s holds",
     "Late client: keep the warm-up and trim the main block"
    ],
    "tip": "Give real numbers for each phase."
   },
   {
    "q": "How do you decide a client's training level?",
    "p": [
     "Years of lifting alone are unreliable",
     "Use the motor-learning stages",
     "Cognitive = beginner (learning, needs feedback)",
     "Associative = intermediate (consistent, few flaws)",
     "Autonomous = advanced (performs without thinking)",
     "If unsure, classify one level lower"
    ],
    "tip": "Use the 10-years-but-wobbly-squat example."
   },
   {
    "q": "What is the interference effect and how do you manage it?",
    "p": [
     "Concurrent cardio and RT can blunt strength, size and power",
     "Most significant for lower-body strength and size; insignificant for upper-body hypertrophy",
     "Keep cardio <30 min and <3 times a week; HIIT interferes less than LISS",
     "Negligible for beginners for the first 2–3 months",
     "For fat loss, combining them works well"
    ],
    "tip": "End with: prioritise by the end goal."
   },
   {
    "q": "Explain your exercise selection and ordering principles.",
    "p": [
     "Limiting factor: the target muscle should fail first (e.g. RDL grip problem → leg curl or straps)",
     "Mix compound and isolation; supported vs unsupported compounds",
     "Free weights vs machines: stabilisers vs fixed path; similar strength gains; specificity for competitors",
     "Order: technique-heavy → compound → big muscles → small",
     "Exception: prioritise the client's goal or weakness"
    ],
    "tip": "Use the weak-lats example: deadlift, lat pulldown, straight-arm pulldown."
   },
   {
    "q": "A client can train 4 days a week for muscle gain. Design the week.",
    "p": [
     "Upper/lower split so each muscle is trained twice a week",
     "Compound lifts first, then isolation",
     "About 10–20 hard sets per muscle per week, 65–85% 1RM, close to failure",
     "Tempo and rest set (e.g. ~2–3 min on heavy compounds)",
     "Progressive overload plan and a re-test in 4–6 weeks"
    ],
    "tip": "Name your split, then your FITT, then your progression."
   },
   {
    "q": "Explain tempo notation and time under tension with an example.",
    "p": [
     "Four digits: eccentric, pause at the bottom, concentric, pause at the top",
     "Example 3-1-1-0 = 3 s down, 1 s pause, 1 s up, no pause",
     "TUT = time the muscle is under load; it rises with heavier loads and with volume",
     "Slow tempo helps beginners learn; less critical later",
     "Strength needs heavy loads; equal-effort hypertrophy is similar at different speeds"
    ],
    "tip": "Read one tempo out loud, digit by digit."
   },
   {
    "q": "How would you adjust a plan for a client with high stress and poor sleep?",
    "p": [
     "Stress raises cortisol and needs more recovery",
     "Reduce frequency (e.g. 5–6 → 2–3 sessions)",
     "Cut volume (≤2 sets per exercise, about 8–12 sets per session) and keep intensity moderate",
     "Counsel on sleep; change one habit at a time",
     "Re-assess and build back up as sleep improves"
    ],
    "tip": "Mention the sleep study: about a 20% drop after a few nights of 6 h."
   },
   {
    "q": "What recovery strategies would you recommend for DOMS?",
    "p": [
     "DOMS: 24–48 h (up to 72) after new or eccentric-heavy work; beginners feel it most",
     "Massage or foam rolling (short-term mobility, more blood flow)",
     "Compression garments (helpful, less than massage)",
     "Cold-water (<11 °C, 11–15 min) or contrast therapy",
     "Active recovery 15–40 min, meditation and deep breathing",
     "Key principle: increase blood flow"
    ],
    "tip": "Close by saying mild soreness is normal and not a measure of success."
   }
  ]
 },
 {
  "id": "E113",
  "name": "Personal Training & Application",
  "kind": "viva",
  "color": "#06b6d4",
  "blurb": "The INFS 3 I's framework, cueing and motor learning, core and other training modalities.",
  "topics": [
   {
    "id": "e113-framework",
    "title": "The INFS 3 I's Framework",
    "fact": "In Dias et al. (2017), trained lifters chose 12–27% heavier loads when a personal trainer supervised them. Supervision alone raised intensity.",
    "primer": [
     "Inspect: risk assessment, posture analysis, fitness assessment.",
     "Interpret: precautions, muscular imbalances, performance goal (wants vs needs).",
     "Initiate: safety first → stretch the tight, strengthen the weak → FITT → cue, track, progress. Then repeat the cycle."
    ],
    "qs": [
     {
      "q": "The order of the INFS framework is:",
      "o": [
       "Initiate → Inspect → Interpret",
       "Inspect → Interpret → Initiate",
       "Interpret → Initiate → Inspect",
       "Inspect → Initiate → Interpret"
      ],
      "a": 1,
      "w": [
       "You can't start before assessing.",
       "Correct. Look, Think, Act.",
       "Inspect (assessment) must come first, not last.",
       "You interpret before initiating."
      ],
      "h": "Look, Think, Act."
     },
     {
      "q": "In which stage is FITT set?",
      "o": [
       "Inspect",
       "Interpret",
       "Initiate",
       "Not part of the framework"
      ],
      "a": 2,
      "w": [
       "Inspect is assessment.",
       "Interpret covers precautions, imbalances and goals.",
       "Correct. Safety, then stretching and strengthening, then the FITT routine.",
       "It is part of it."
      ],
      "h": "FITT goes in when you Initiate."
     },
     {
      "q": "'Wants vs needs' belongs to which stage?",
      "o": [
       "Inspect",
       "Interpret (performance goal)",
       "Initiate",
       "Cool-down"
      ],
      "a": 1,
      "w": [
       "Inspect collects data.",
       "Correct. The client's want (e.g. 'lose weight') is combined with what they need (e.g. to get stronger first).",
       "Initiate writes the plan.",
       "The cool-down is part of a session, not a stage of the framework."
      ],
      "h": "Interpret = what they want vs what they need."
     },
     {
      "q": "Posture analysis happens in which stage?",
      "o": [
       "Inspect",
       "Interpret",
       "Initiate",
       "After 6 months"
      ],
      "a": 0,
      "w": [
       "Correct. Static and dynamic. Interpreting the imbalances comes next.",
       "Interpret decides what's tight or weak.",
       "Initiate writes the correction.",
       "Posture is assessed at the start, in Inspect, not months later."
      ],
      "h": "Inspect = collect the data."
     },
     {
      "q": "How should the framework be used with a RETURNING client?",
      "o": [
       "Reuse the old plan as it was",
       "Repeat the cycle: re-assess posture and fitness, then decide again",
       "Skip assessment entirely",
       "Only change the music"
      ],
      "a": 1,
      "w": [
       "The course says repeat the cycle.",
       "Correct. The risk-assessment part shrinks for a known client, but re-testing keeps the plan current.",
       "Skipping assessment loses track of how the client has changed; re-assess.",
       "Cosmetic changes miss the point: re-assess and re-plan."
      ],
      "h": "It's a cycle, not a checklist."
     },
     {
      "q": "In the Schroeder RCT, which group lowered blood pressure?",
      "o": [
       "Aerobic only",
       "Resistance only",
       "Combined aerobic + resistance (30 + 30 min)",
       "None"
      ],
      "a": 2,
      "w": [
       "Improved fitness and fat, but not BP.",
       "Improved strength and waist.",
       "Correct. About −4 mmHg diastolic at the same total time.",
       "One group did."
      ],
      "h": "Combined beats either alone."
     }
    ]
   },
   {
    "id": "e113-cueing",
    "title": "Cueing & Motor Learning",
    "fact": "'Sit on a chair and get up while keeping your body straight' is a squat cue that needs no anatomy. Analogies beat jargon.",
    "primer": [
     "Motor behaviour stages: motor control (learning the pattern) → motor learning (adapting with experience) → motor development (automatic).",
     "3 cue types: verbal (say it), visual (show it), movement (shape it in real time).",
     "Tips: avoid jargon, use analogies, one cue at a time, combine types, record videos, stay positive."
    ],
    "qs": [
     {
      "q": "The stage where a client performs a movement automatically is:",
      "o": [
       "Motor control",
       "Motor learning",
       "Motor development",
       "Motor behaviour"
      ],
      "a": 2,
      "w": [
       "That's the first stage: learning the pattern.",
       "That's the second stage: adapting with experience.",
       "Correct. They no longer think about each part.",
       "Motor behaviour is the umbrella term for all three."
      ],
      "h": "Control → Learn → Do it automatically."
     },
     {
      "q": "Correcting a client's heels lifting DURING the squat is which cue type?",
      "o": [
       "Verbal",
       "Visual",
       "Movement (real-time correction)",
       "None"
      ],
      "a": 2,
      "w": [
       "Verbal is explaining in words beforehand.",
       "Visual is demonstrating or showing video.",
       "Correct. Learning by doing, with live correction.",
       "It is a cue."
      ],
      "h": "Say it, Show it, Shape it."
     },
     {
      "q": "Recording the CLIENT and showing them the video is a:",
      "o": [
       "Verbal cue",
       "Visual cue",
       "Movement cue",
       "Tactile cue"
      ],
      "a": 1,
      "w": [
       "Verbal means explaining in words; watching video is visual.",
       "Correct. Very useful in online coaching, with annotations.",
       "Movement cues are real-time corrections during the rep, not watching a video.",
       "Tactile means touch; a video is seen, so it's visual."
      ],
      "h": "If they watch it, it's visual."
     },
     {
      "q": "Which is a cueing tip from the lecture?",
      "o": [
       "Use detailed biomechanics terms with every client",
       "Use analogies and match words to the client's knowledge",
       "Shout corrections",
       "Give five cues per rep"
      ],
      "a": 1,
      "w": [
       "It overwhelms most clients.",
       "Correct.",
       "Stay positive.",
       "One cue at a time."
      ],
      "h": "Talk their language."
     },
     {
      "q": "Moving from scale-based to non-scale progress tracking means highlighting:",
      "o": [
       "Only body weight",
       "Improvements in strength, ROM and form",
       "Calories burned",
       "Steps only"
      ],
      "a": 1,
      "w": [
       "That's scale-based.",
       "Correct. It keeps clients motivated and the practice sustainable.",
       "Calories burned is still a number-on-a-screen metric, not form or strength.",
       "Steps aren't the course's non-scale examples (strength, ROM, form)."
      ],
      "h": "Celebrate non-scale wins."
     }
    ]
   },
   {
    "id": "e113-modalities",
    "title": "Core & Other Training Modalities",
    "fact": "The core is far more than a six-pack. It runs from the lower back and pelvic girdle to the hips, transferring force between the upper and lower body.",
    "primer": [
     "Core stages: 1 stabilisation (local, isometric, ~1 month) → 2 strength (global, dynamic) → 3 power (med-ball).",
     "Drawing in (navel to spine, lying supine) trains the local stabilisers. Bracing (360° breath) protects the spine in heavy compound lifts.",
     "Balance progressions: static → dynamic, two limbs → one, eyes open → closed, stable → unstable, supported → unsupported."
    ],
    "qs": [
     {
      "q": "Core training stage 1 focuses on:",
      "o": [
       "Med-ball slams",
       "Local stabilisers, held isometrically (plank, side plank, bridge hold)",
       "Crunches and leg raises",
       "Olympic lifts"
      ],
      "a": 1,
      "w": [
       "That's stage 3 (power).",
       "Correct. About 0–1 month.",
       "That's stage 2 (global, dynamic).",
       "Olympic lifts aren't a core-training stage at all."
      ],
      "h": "Local → Global → Go."
     },
     {
      "q": "Which are LOCAL core stabilisers?",
      "o": [
       "Rectus abdominis and obliques",
       "Transversus abdominis and multifidus",
       "Lats and glutes",
       "Pecs and delts"
      ],
      "a": 1,
      "w": [
       "Global.",
       "Correct. Deep muscles attached to the spine.",
       "Global, force-transfer muscles.",
       "Pecs and delts are chest and shoulder muscles, not core stabilisers."
      ],
      "h": "Local = deep, close to the spine."
     },
     {
      "q": "Bracing is used mainly in:",
      "o": [
       "Lying stretches",
       "Heavy compound lifts (squat, deadlift, overhead press)",
       "Meditation",
       "Walking"
      ],
      "a": 1,
      "w": [
       "Drawing in is the learning tool there.",
       "Correct. A big 360° breath into the abdomen. The tyre analogy: a pumped tyre holds the car.",
       "Meditation uses breathing to relax; bracing stiffens the trunk under load.",
       "Walking doesn't need a maximal brace; heavy compound lifts do."
      ],
      "h": "Brace = pump the tyre."
     },
     {
      "q": "In the lecture's green cardio zone, intensity is about:",
      "o": [
       "65–75% HRmax",
       "76–85% HRmax",
       "86–95% HRmax",
       "100%"
      ],
      "a": 0,
      "w": [
       "Correct. About 50–60% HRR, where most people start.",
       "That's yellow.",
       "That's red.",
       "100% is maximal, the top of red, not green."
      ],
      "h": "Green = go easy."
     },
     {
      "q": "The best kettlebell swing cue is:",
      "o": [
       "Lift the bell with your shoulders",
       "Hip hinge, then snap the hips forward; the arms are just hooks",
       "Squat as deep as possible",
       "Bend the elbows to curl it up"
      ],
      "a": 1,
      "w": [
       "The classic error.",
       "Correct. The bell travels in an arc and the power comes from the hip drive.",
       "The swing is a hinge, not a squat.",
       "Curling the bell turns a hip-driven swing into an arm exercise."
      ],
      "h": "Hips drive, arms ride."
     },
     {
      "q": "A farmer's walk becomes HARDER when you:",
      "o": [
       "Carry two kettlebells",
       "Carry only one kettlebell (uneven load)",
       "Walk slower",
       "Use lighter weights"
      ],
      "a": 1,
      "w": [
       "Balanced load is easier.",
       "Correct. The obliques must fight sideways bending.",
       "Not the main factor.",
       "Lighter weights make any carry easier, not harder."
      ],
      "h": "One-sided load, two-sided work."
     },
     {
      "q": "The INFS 6 foundational calisthenics patterns are:",
      "o": [
       "Lower body, push, pull, core, bridge, hold",
       "Run, jump, swim, throw, kick, climb",
       "Snatch, clean, jerk, squat, bench, deadlift",
       "Curl, raise, fly, shrug, crunch, twist"
      ],
      "a": 0,
      "w": [
       "Correct.",
       "Not the INFS list.",
       "Not calisthenics.",
       "Isolation moves."
      ],
      "h": "Legs Push Pull, Core Bridges Hold."
     }
    ]
   }
  ],
  "viva": [
   {
    "q": "Explain the INFS 3 I's framework with an example client.",
    "p": [
     "Inspect: risk assessment (intake, clearance), static and dynamic posture analysis, fitness assessment",
     "Interpret: precautions, muscular imbalances (tight vs weak), performance goal (wants vs needs, feasibility, equipment)",
     "Initiate: safety first, stretch the tight and strengthen the weak, then FITT",
     "Progress with feedback, cueing and tracking",
     "Repeat the cycle with returning clients"
    ],
    "tip": "Use one client, e.g. a desk worker who wants to lose weight, through all three stages."
   },
   {
    "q": "What are the types of cueing? Give an example of each.",
    "p": [
     "Verbal: explain in words, e.g. 'push your hips back and bend your knees'",
     "Visual: demonstrate or show video; record the client and annotate",
     "Movement: correct in real time during the rep, e.g. 'heels are lifting'",
     "Combine types for the best effect",
     "Tips: avoid jargon, use analogies, one cue at a time, positive tone"
    ],
    "tip": "Mention the three stages of motor behaviour too."
   },
   {
    "q": "How would you progress core training for a beginner?",
    "p": [
     "Stage 1 (about month 1): local stabilisers, isometric: plank, side plank, glute-bridge hold",
     "Stage 2: global stabilisers, dynamic: dead bugs, bird dogs, crunches, leg raises",
     "Stage 3: power, e.g. med-ball slams, throws, rotational throws",
     "Teach drawing in (supine, navel to spine) early; bracing for heavy compounds",
     "Assess first; athletes may start later in the sequence"
    ],
    "tip": "Say the timeline and two exercises per stage."
   },
   {
    "q": "Drawing in versus bracing: what's the difference and when do you use each?",
    "p": [
     "Drawing in: lying supine, pull the navel toward the spine to activate local stabilisers",
     "It is a learning tool for the mind-muscle connection",
     "Bracing: big 360° breath into the abdomen, then stiffen abs, back and glutes",
     "Used in heavy compound lifts to protect the spine",
     "Tyre analogy: a pumped tyre holds the car up"
    ],
    "tip": "Contrast them in one sentence each."
   },
   {
    "q": "How do you choose a training modality for a client?",
    "p": [
     "Ask about preferences and what they'd like to improve (wants)",
     "Check available equipment and setting",
     "Identify their needs from assessment (e.g. balance, core, strength)",
     "Combine wants and needs so they stay motivated",
     "Examples: kettlebells, bands, battle ropes, med balls, calisthenics, cardio machines"
    ],
    "tip": "Close with adherence: enjoyable plans get done."
   },
   {
    "q": "Why should someone hire a personal trainer? Use evidence.",
    "p": [
     "Dias et al. 2017: supervised trained lifters chose 12–27% heavier loads and worked harder",
     "Self-chosen loads stayed below recommended %1RM",
     "Trainers add structure (3 I's), safety, cueing and accountability",
     "Progress tracking and timely adjustments improve adherence"
    ],
    "tip": "Lead with the study, then the practical benefits."
   }
  ]
 },
 {
  "id": "E114",
  "name": "Training Execution",
  "kind": "viva",
  "color": "#f97316",
  "blurb": "Setting up online and offline sessions, logs and platforms, conducting a session, cueing and spotting.",
  "topics": [
   {
    "id": "e114-setup",
    "title": "Setting Up & Conducting a Session",
    "fact": "If your light source is behind you on a video call, you become a silhouette, and the client can't copy what they can't see.",
    "primer": [
     "Attire: colour and fit, modesty (about the client's comfort), cleanliness, professional look.",
     "Online set-up: Light (face the light), Sound (Bluetooth headset), Space, Signal (good wifi). Set up before the client joins.",
     "Delivering a great session comes down to one factor: PLANNING. Pre-enrolment screening allows a SWOT analysis."
    ],
    "qs": [
     {
      "q": "Where should the light source be for an online session?",
      "o": [
       "Behind the trainer",
       "In front of the trainer (no backlighting)",
       "Above the camera only",
       "Light doesn't matter"
      ],
      "a": 1,
      "w": [
       "You'd be a silhouette.",
       "Correct. Natural daylight is best; otherwise a ring light or three-point lighting.",
       "Overhead light alone casts shadows; the course says face the light.",
       "It matters a lot."
      ],
      "h": "Face the light."
     },
     {
      "q": "Why does the course recommend a Bluetooth headset over a wired one?",
      "o": [
       "Cheaper",
       "Freedom of movement while demonstrating",
       "Better colour",
       "No reason"
      ],
      "a": 1,
      "w": [
       "Price isn't the reason; mobility while demonstrating is.",
       "Correct. A wire restricts movement.",
       "Headsets carry sound, not colour; the benefit is freedom of movement.",
       "There is a reason: a wired headset restricts movement while you demonstrate."
      ],
      "h": "Cut the cord, keep the voice."
     },
     {
      "q": "'Modesty' in trainer attire is framed around:",
      "o": [
       "The trainer's taste",
       "The client's comfort: nothing distracting",
       "Brand logos",
       "Gym rules only"
      ],
      "a": 1,
      "w": [
       "Modesty is framed around the CLIENT's comfort, not personal style.",
       "Correct.",
       "Logos aren't the point; modesty is about what's comfortable for the client.",
       "It goes beyond gym rules; the framing is client comfort."
      ],
      "h": "Dress for their comfort."
     },
     {
      "q": "Delivering a great session boils down to which single factor?",
      "o": [
       "Expensive equipment",
       "Planning",
       "Loud music",
       "Long sessions"
      ],
      "a": 1,
      "w": [
       "The course says start basic and upgrade gradually; equipment isn't the key factor.",
       "Correct. Basics, etiquette and operational details all come from planning.",
       "Music isn't the deciding factor; planning is.",
       "Length isn't quality; planning decides the experience."
      ],
      "h": "Plan the session, then train the client."
     },
     {
      "q": "Which is a reason to keep training logs?",
      "o": [
       "Decoration",
       "Tracking progress and PRs, spotting weak movements, and motivation",
       "Legal requirement only",
       "None"
      ],
      "a": 1,
      "w": [
       "Logs aren't decorative; they track progress and motivate.",
       "Correct. Log sets, reps, load, rest, energy, soreness and anything unusual.",
       "The course reason is progress tracking and motivation, not law.",
       "There are several reasons: tracking, weak spots, PRs and motivation."
      ],
      "h": "If it isn't logged, it didn't happen."
     }
    ]
   },
   {
    "id": "e114-cuespot",
    "title": "Cueing & Spotting",
    "fact": "Don't spot a deadlift. The bar can simply be dropped, and 'spotting' it changes the exercise.",
    "primer": [
     "Cueing has no fixed rules. Internal cue = focus on the body ('squeeze your glutes'); external cue = focus on an outcome ('push the floor away').",
     "Breathing: exhale on the concentric (effort), inhale on the eccentric.",
     "Spotting has standard rules: communicate before the lift; spot dumbbell presses at the WRISTS; use an alternated grip on a barbell; spot walking lunges and step-ups at the waist."
    ],
    "qs": [
     {
      "q": "'Squeeze your glutes at the top' is a(n):",
      "o": [
       "External cue",
       "Internal cue",
       "Tactile cue only",
       "Visual cue"
      ],
      "a": 1,
      "w": [
       "External cues point outside the body.",
       "Correct. Attention is on a body part.",
       "It can be paired with touch, but it is internal.",
       "It's spoken, not shown. And it focuses on a muscle, so it's internal."
      ],
      "h": "Internal = In the body; External = Elsewhere."
     },
     {
      "q": "'Push the floor away' on a bench press is a(n):",
      "o": [
       "Internal cue",
       "External cue",
       "Verbal only",
       "Breathing cue"
      ],
      "a": 1,
      "w": [
       "It doesn't name a muscle.",
       "Correct. It is outcome-focused and great for leg drive.",
       "It is verbal, but the classification is external.",
       "It isn't about breathing; it directs the push against the floor."
      ],
      "h": "Floor, bar, wall = external."
     },
     {
      "q": "Where should you spot a dumbbell press?",
      "o": [
       "At the elbows",
       "At the wrists",
       "At the shoulders",
       "Don't spot it"
      ],
      "a": 1,
      "w": [
       "Less safe: the shoulder can still move.",
       "Correct.",
       "Too far from the weight; spot the wrists to control the dumbbells.",
       "It may need spotting near failure."
      ],
      "h": "Wrists, not elbows."
     },
     {
      "q": "Which lift does the lecture say NOT to spot?",
      "o": [
       "Bench press",
       "Deadlift",
       "Barbell squat",
       "Overhead press"
      ],
      "a": 1,
      "w": [
       "It needs a spotter when heavy.",
       "Correct. The bar can be dropped, so injury risk is low.",
       "May need spotters near max.",
       "Overhead loads need spotting."
      ],
      "h": "Deadlifts drop alone."
     },
     {
      "q": "Cueing vs spotting: which has a standard set of rules?",
      "o": [
       "Cueing",
       "Spotting",
       "Both",
       "Neither"
      ],
      "a": 1,
      "w": [
       "Cueing is an art with no set rules.",
       "Correct. Spotting is an art plus rules.",
       "Only spotting has standard rules; cueing has none.",
       "Spotting does have a standard set of rules."
      ],
      "h": "Cue is art; Spot is art + rules."
     },
     {
      "q": "Where should you spot walking lunges?",
      "o": [
       "At the bar",
       "At the waist or torso",
       "At the ankles",
       "Not at all"
      ],
      "a": 1,
      "w": [
       "You can't follow the bar on a moving exercise.",
       "Correct. The same goes for step-ups.",
       "The ankles don't control the torso's balance; spot the waist.",
       "Support may be needed, especially with load; spot at the waist."
      ],
      "h": "Waist for walkers."
     }
    ]
   }
   ,
   {
    "id": "e114-conduct",
    "title": "Conducting Cardio, Weights, Functional & Core",
    "fact": "The Student Handbook lists E114's units as conducting cardiovascular, weight, and functional & core training, so expect the viva to ask you to run a session, not just set one up.",
    "primer": [
     "Cardio: pick the zone from the goal and fitness level. Green 65–75% HRmax (50–60% HRR), yellow 76–85%, red 86–95%. Beginners start green; check with Karvonen, RPE or the talk test.",
     "Weights: warm-up, then main lifts first (compound before isolation), demonstrate, cue one thing at a time, spot where needed, log sets, reps, load and rest.",
     "Functional & core: functional means real-life carry-over, not fancy. Core runs stabilisation (isometric, ~1 month) → strength (dynamic) → power (med ball). Brace on compound lifts.",
     "Every session: warm-up → main block → cool-down, and adjust on the day from how the client looks and feels."
    ],
    "qs": [
     {
      "q": "A deconditioned beginner starts cardio with you. Which zone do you begin in?",
      "o": [
       "Green (65–75% HRmax)",
       "Yellow (76–85% HRmax)",
       "Red (86–95% HRmax)",
       "Straight into HIIT"
      ],
      "a": 0,
      "w": [
       "Correct. Green is the starting zone for beginners and anyone with low aerobic capacity.",
       "Yellow is moderate to hard; build a green base first.",
       "Red is for intervals with fitter clients.",
       "HIIT isn't for beginners: recovery and adherence suffer."
      ],
      "h": "Traffic light: start on green."
     },
     {
      "q": "No heart-rate monitor. The client can talk but is struggling to. What intensity is that?",
      "o": [
       "Low (under RPE 4)",
       "Moderate (RPE 4–7)",
       "Maximal (RPE 10)",
       "You can't tell without a monitor"
      ],
      "a": 1,
      "w": [
       "At low intensity they'd chat easily.",
       "Correct. Choppy speech means moderate, about RPE 4–7.",
       "At maximal effort they couldn't speak at all.",
       "The talk test exists for exactly this."
      ],
      "h": "Chat < 4 · Choppy 4–7 · Can't 7–10."
     },
     {
      "q": "40-year-old client, resting HR 60, target 70% by Karvonen. What's the target heart rate?",
      "o": [
       "126 bpm",
       "144 bpm",
       "154 bpm",
       "180 bpm"
      ],
      "a": 1,
      "w": [
       "That's 70% of 180 (the %HRmax method), not Karvonen.",
       "Correct. (180 − 60) × 0.7 + 60 = 144.",
       "Check the subtraction: the reserve is 180 − 60 = 120.",
       "180 is the age-predicted max, not a training target."
      ],
      "h": "Reserve = Max − Rest; take your %, add Rest back."
     },
     {
      "q": "In a weight-training session, what normally comes first after the warm-up?",
      "o": [
       "Isolation finishers",
       "The main compound lifts",
       "Core power throws",
       "Static stretching"
      ],
      "a": 1,
      "w": [
       "Isolation work goes after the big lifts, when fatigue matters less.",
       "Correct. Do compound lifts while the client is fresh, so technique and load are best.",
       "Power work needs freshness too, but in a weights session the compound lifts lead.",
       "Long static stretches belong in the cool-down."
      ],
      "h": "Big before small."
     },
     {
      "q": "Your client has never done a deadlift. How do you introduce it?",
      "o": [
       "Load it heavy to find their max",
       "Demonstrate, teach the hip hinge with light load, cue one point at a time",
       "Give a written list of ten cues at once",
       "Have them copy another gym member"
      ],
      "a": 1,
      "w": [
       "Testing a max before learning the pattern is a safety risk.",
       "Correct. Show it, groove the hinge, then progress the load.",
       "Too many cues at once overloads a beginner; give one at a time.",
       "You are the coach: demonstrate and cue it yourself."
      ],
      "h": "Show → groove → load."
     },
     {
      "q": "Which describes functional training in the INFS lecture?",
      "o": [
       "Unstable, fancy exercises",
       "Movements that carry over to the client's daily life or sport",
       "Machines only",
       "Only bodyweight work"
      ],
      "a": 1,
      "w": [
       "Functional doesn't mean fancy.",
       "Correct. A squat is sitting and standing; a deadlift is picking something up.",
       "Machines can be part of a plan but don't define functional training.",
       "Load can be anything: bodyweight, kettlebells, bands."
      ],
      "h": "Real-life carry-over."
     },
     {
      "q": "A new client's core is weak. Which progression do you run?",
      "o": [
       "Med-ball slams → crunches → planks",
       "Stabilisation (planks, holds) → strength (dead bugs, bird dogs) → power (med ball)",
       "Only crunches, every session",
       "Heavy squats replace core work"
      ],
      "a": 1,
      "w": [
       "That's back to front: power comes last.",
       "Correct. Isometric local stability first (~1 month), then dynamic, then power.",
       "Crunches alone skip stabilisation and power.",
       "Squats need a working core; they don't replace building it."
      ],
      "h": "Hold → Move → Throw."
     },
     {
      "q": "During a heavy back squat, what do you cue for the core?",
      "o": [
       "Draw in: hollow the navel",
       "Brace: a 360° breath into the abdomen",
       "Breathe into the upper chest",
       "Relax the abs to move freely"
      ],
      "a": 1,
      "w": [
       "Drawing in is for learning local activation lying supine, not heavy lifts.",
       "Correct. Bracing pumps up the 'tyre' that protects the spine.",
       "Upper-chest breathing doesn't build intra-abdominal pressure.",
       "A relaxed core shifts load to the lower back."
      ],
      "h": "Pump the tyre."
     }
    ]
   }
  ],
  "viva": [
   {
    "q": "How do you set up an online training session?",
    "p": [
     "Lighting: face the light, natural daylight or a ring light; avoid backlighting",
     "Sound: an external mic; a Bluetooth headset for freedom of movement",
     "Space: enough room, uncluttered, nothing going on in the background",
     "Wifi: a stable connection",
     "Equipment placed before the client joins; look professional"
    ],
    "tip": "Use the hook: Light, Sound, Space, Signal."
   },
   {
    "q": "What do you record in a client's training log and why?",
    "p": [
     "Exercise, sets, reps and load (intensity)",
     "Rest intervals and time per set",
     "Energy level, how they felt, soreness and anything unusual",
     "Personal records and milestones",
     "Why: track progress, spot weak movements, motivate, keep goals clear"
    ],
    "tip": "Mention the tools: notebook, spreadsheet or app."
   },
   {
    "q": "Explain internal and external cues with examples.",
    "p": [
     "Cueing has no fixed rules; it is observational and creative",
     "Internal: attention on the body, e.g. 'squeeze your glutes at the top'",
     "External: attention on an outcome, e.g. 'push the floor away', 'break the bar'",
     "Use either type or both; one cue at a time; analogies; tactile cues only with consent",
     "Breathing: exhale on the effort, inhale on the eccentric"
    ],
    "tip": "Give one deadlift cue as a closer: 'your hands are hooks'."
   },
   {
    "q": "What are the principles of safe spotting?",
    "p": [
     "Communicate with the lifter before the lift",
     "The spotter must be strong enough and attentive",
     "Spot dumbbell presses at the wrists; alternated grip on barbell bench or overhead press",
     "Spot forward-moving exercises (lunges, step-ups) at the waist",
     "Don't spot the deadlift; it can be dropped",
     "Heavy max attempts may need more than one spotter; don't over-help"
    ],
    "tip": "Contrast with cueing: spotting has standard rules."
   },
   {
    "q": "Describe the attire standards for a personal trainer.",
    "p": [
     "Colour and fit: comfortable, lets the client see your form",
     "Modesty: based on the client's comfort",
     "Cleanliness: a separate set of clean work clothes",
     "Professional look: up to date",
     "Proper shoes; sports bra for female trainers"
    ],
    "tip": "Use the hook C-M-C-P."
   },
   {
    "q": "How do you prepare to conduct a session with a new client?",
    "p": [
     "Pre-enrolment screening allows a SWOT analysis",
     "Use a framework (INFS 3 I's)",
     "Plan: voice, body language, hygiene and communication",
     "Etiquette: punctuality, politeness, listening",
     "Operations: check sound, light and connectivity; review the day's cues and technique"
    ],
    "tip": "Say it all comes down to planning."
   },
   {
    "q": "Walk me through conducting a cardio session for a beginner.",
    "p": [
     "Check readiness: screening and resting HR",
     "Warm-up at an easy pace",
     "Set the target zone: green, 65–75% HRmax (50–60% HRR); show the Karvonen working",
     "Monitor with HR, RPE or the talk test, and adjust on the day",
     "Progress duration first, then intensity; HIIT only later and sparingly",
     "Cool-down and log the session"
    ],
    "tip": "Do one Karvonen sum out loud; examiners like numbers."
   },
   {
    "q": "How do you conduct a weight-training session?",
    "p": [
     "Warm-up: general, then specific ramp-up sets",
     "Compound lifts first, isolation after",
     "Demonstrate, then cue one point at a time (internal or external)",
     "Spot where needed (dumbbell press at the wrists; never the deadlift)",
     "Control the variables: sets, reps, load, tempo, rest",
     "Cool-down, stretch and log the session"
    ],
    "tip": "Tie it to the 3 I's: Inspect, Interpret, Implement."
   },
   {
    "q": "How do you conduct functional and core training for a new client?",
    "p": [
     "Functional = real-life carry-over (squat = sit-stand, deadlift = pick up)",
     "Choose from wants plus needs and the equipment available",
     "Core stages: stabilisation → strength → power",
     "Drawing in to learn; bracing on compound lifts",
     "Balance progressions: static → dynamic, two legs → one, eyes open → closed, stable → unstable",
     "Assess first; a trained client may start at a later stage"
    ],
    "tip": "Close with 'functional isn't fancy'."
   }
  ]
 }
];

export const CPT: PracticeSet = {
  id: "cpt",
  title: "INFS Certified Personal Trainer",
  tagline: "Exam practice: quiz rounds with a reason for every answer, timed mocks and viva drills.",
  passPct: 60,
  mockSize: 25,
  modules: MODULES,
  rules: "Pass needs 60% overall and 60% in every module. MCQ paper: E101, E103, E105, E106. Viva: E104, E107, E113, E114 (the handbook text also names E106 once, so be ready to talk E106 too). CPR-AED certificate needed before the viva.",
};
