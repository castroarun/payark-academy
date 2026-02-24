import { QuizQuestion } from "@/lib/types";

// ─────────────────────────────────────────────────────────────
// M01 — How Payments Work: Quiz Bank (50 questions)
//
// Topic distribution:
//   Payment lifecycle       (8)   q01-q08
//   Clearing vs settlement  (8)   q09-q16
//   RTGS vs DNS             (8)   q17-q24
//   Correspondent banking   (8)   q25-q32
//   SWIFT messaging         (8)   q33-q40
//   General concepts        (10)  q41-q50
//
// Difficulty spread: 15 easy, 25 medium, 10 hard
// ─────────────────────────────────────────────────────────────

export const m01Questions: QuizQuestion[] = [
  // ═══════════════════════════════════════════════════════════
  // Payment Lifecycle (8 questions)
  // ═══════════════════════════════════════════════════════════

  {
    id: "m01-q01",
    question: "What is the primary difference between RTGS and DNS settlement systems?",
    options: [
      "RTGS processes transactions in real-time individually, DNS batches and nets them",
      "DNS is faster than RTGS",
      "RTGS only works for international payments",
      "DNS requires correspondent banking",
    ],
    correctIndex: 0,
    explanation:
      "RTGS (Real-Time Gross Settlement) processes each transaction individually in real-time, while DNS (Deferred Net Settlement) accumulates transactions and settles the net amount at designated times.",
    difficulty: "easy",
    topic: "payment-lifecycle",
  },
  {
    id: "m01-q02",
    question: "In a typical payment lifecycle, which step occurs immediately after payment initiation?",
    options: [
      "Settlement",
      "Reconciliation",
      "Validation and authorization",
      "Clearing",
    ],
    correctIndex: 2,
    explanation:
      "After a payment is initiated by the payer, the system validates the instruction (format, funds, limits) and authorizes it before it enters the clearing stage.",
    difficulty: "easy",
    topic: "payment-lifecycle",
  },
  {
    id: "m01-q03",
    question: "What is the correct order of a payment's lifecycle from start to finish?",
    options: [
      "Initiation -> Clearing -> Settlement -> Authorization -> Reconciliation",
      "Initiation -> Authorization -> Clearing -> Settlement -> Reconciliation",
      "Authorization -> Initiation -> Settlement -> Clearing -> Reconciliation",
      "Initiation -> Settlement -> Clearing -> Authorization -> Reconciliation",
    ],
    correctIndex: 1,
    explanation:
      "The standard payment lifecycle flows: Initiation (payer submits), Authorization (validated/approved), Clearing (instructions exchanged between banks), Settlement (funds transferred), Reconciliation (books matched).",
    difficulty: "medium",
    topic: "payment-lifecycle",
  },
  {
    id: "m01-q04",
    question: "During the reconciliation phase of a payment, what is the bank primarily verifying?",
    options: [
      "That the sender has sufficient funds",
      "That the SWIFT message format is correct",
      "That its internal records match the settlement confirmations from the clearing system",
      "That the beneficiary's account number exists",
    ],
    correctIndex: 2,
    explanation:
      "Reconciliation is the process where a bank compares its own transaction records against the settlement confirmations received from the clearing house or correspondent bank to ensure everything balances.",
    difficulty: "medium",
    topic: "payment-lifecycle",
  },
  {
    id: "m01-q05",
    question:
      "A bank discovers during end-of-day processing that a payment was authorized but never cleared. What lifecycle stage failed?",
    options: [
      "Initiation",
      "Authorization",
      "Clearing",
      "Reconciliation",
    ],
    correctIndex: 2,
    explanation:
      "Since the payment was authorized successfully, the failure occurred at the clearing stage, where payment instructions are exchanged between financial institutions.",
    difficulty: "medium",
    topic: "payment-lifecycle",
  },
  {
    id: "m01-q06",
    question: "What does 'finality of payment' mean in the context of settlement?",
    options: [
      "The payment message has been sent to SWIFT",
      "The beneficiary has been notified",
      "The transfer of funds is irrevocable and unconditional",
      "The compliance screening has passed",
    ],
    correctIndex: 2,
    explanation:
      "Finality of payment means the settlement is complete, irrevocable, and unconditional. Once finality is achieved, the payment cannot be reversed even if the sending bank becomes insolvent.",
    difficulty: "hard",
    topic: "payment-lifecycle",
  },
  {
    id: "m01-q07",
    question: "Why is the authorization step critical before clearing in high-value payment systems?",
    options: [
      "It ensures the message is in ISO 20022 format",
      "It prevents unauthorized or fraudulent payments from entering the clearing network",
      "It speeds up the settlement process",
      "It is only required for international payments",
    ],
    correctIndex: 1,
    explanation:
      "Authorization acts as a gatekeeper ensuring only valid, approved payments enter the clearing network. This prevents unauthorized transactions and reduces systemic risk, which is especially important for high-value payment systems.",
    difficulty: "medium",
    topic: "payment-lifecycle",
  },
  {
    id: "m01-q08",
    question:
      "In a payment system where clearing and settlement happen simultaneously (e.g., RTGS), what is a key operational implication?",
    options: [
      "Banks need less liquidity since transactions are netted",
      "Banks need sufficient real-time liquidity for each individual transaction",
      "Reconciliation is not needed",
      "Transactions can be reversed within the same business day",
    ],
    correctIndex: 1,
    explanation:
      "In RTGS systems where clearing and settlement are simultaneous, each transaction settles individually in real-time. This requires banks to maintain sufficient liquidity at all times, unlike DNS where netting reduces the required liquidity.",
    difficulty: "hard",
    topic: "payment-lifecycle",
  },

  // ═══════════════════════════════════════════════════════════
  // Clearing vs Settlement (8 questions)
  // ═══════════════════════════════════════════════════════════

  {
    id: "m01-q09",
    question: "What is the fundamental purpose of the clearing process in payments?",
    options: [
      "To transfer funds between banks",
      "To exchange and validate payment instructions between parties before settlement",
      "To screen transactions for sanctions",
      "To generate SWIFT messages",
    ],
    correctIndex: 1,
    explanation:
      "Clearing is the process of exchanging payment instructions between the sending and receiving institutions and computing what is owed. Settlement is the separate step where funds are actually transferred.",
    difficulty: "easy",
    topic: "clearing-settlement",
  },
  {
    id: "m01-q10",
    question: "Which statement best describes settlement in the payments context?",
    options: [
      "The exchange of payment instructions between banks",
      "The actual transfer of funds to discharge the obligation between parties",
      "The process of checking for duplicate payments",
      "The generation of transaction reference numbers",
    ],
    correctIndex: 1,
    explanation:
      "Settlement is the actual transfer of value (funds) between the payer's bank and the payee's bank, discharging the payment obligation created during clearing.",
    difficulty: "easy",
    topic: "clearing-settlement",
  },
  {
    id: "m01-q11",
    question:
      "In a net settlement system, Bank A owes Bank B $5M and Bank B owes Bank A $3M. What is the net settlement amount?",
    options: [
      "Bank A pays Bank B $8M",
      "Bank A pays Bank B $5M and Bank B pays Bank A $3M",
      "Bank A pays Bank B $2M",
      "Bank B pays Bank A $2M",
    ],
    correctIndex: 2,
    explanation:
      "In net settlement, bilateral obligations are netted. Bank A owes $5M and is owed $3M, so the net position is Bank A pays Bank B $2M ($5M - $3M).",
    difficulty: "medium",
    topic: "clearing-settlement",
  },
  {
    id: "m01-q12",
    question: "What is counterparty risk in the context of clearing and settlement?",
    options: [
      "The risk that a message will be corrupted during transmission",
      "The risk that one party fails to meet its settlement obligation after clearing",
      "The risk of sending a payment to the wrong beneficiary",
      "The risk of regulatory non-compliance",
    ],
    correctIndex: 1,
    explanation:
      "Counterparty risk (also called settlement risk) is the risk that one party will fail to deliver on its end of the settlement after the payment has been cleared. This is particularly acute in DNS systems where there is a time gap between clearing and settlement.",
    difficulty: "medium",
    topic: "clearing-settlement",
  },
  {
    id: "m01-q13",
    question: "Why does deferred net settlement introduce more counterparty risk than real-time gross settlement?",
    options: [
      "Because DNS uses older technology",
      "Because the time gap between clearing and settlement means a bank could become insolvent before settling",
      "Because DNS does not validate payment instructions",
      "Because DNS does not use central bank money",
    ],
    correctIndex: 1,
    explanation:
      "In DNS, payments are cleared throughout the day but settled at designated times (e.g., end of day). During this gap, a bank could become insolvent, creating risk for all its clearing counterparties. RTGS eliminates this by settling each transaction immediately.",
    difficulty: "hard",
    topic: "clearing-settlement",
  },
  {
    id: "m01-q14",
    question: "A clearing house performs multilateral netting across 5 banks at end of day. What is the primary benefit?",
    options: [
      "It increases the number of SWIFT messages sent",
      "It dramatically reduces the total liquidity needed for settlement",
      "It eliminates the need for reconciliation",
      "It ensures all payments are processed in real-time",
    ],
    correctIndex: 1,
    explanation:
      "Multilateral netting calculates each bank's single net position against all other banks, significantly reducing the total amount of funds that need to change hands compared to gross settlement of every individual transaction.",
    difficulty: "medium",
    topic: "clearing-settlement",
  },
  {
    id: "m01-q15",
    question: "In which scenario does clearing happen but settlement does NOT occur?",
    options: [
      "When using an RTGS system",
      "When the payment is domestic",
      "When the sending bank fails before the settlement window",
      "When the payment amount is below a threshold",
    ],
    correctIndex: 2,
    explanation:
      "If a sending bank becomes insolvent or is unable to fund its settlement position after clearing has occurred, settlement will not happen. This is the core manifestation of settlement risk in DNS systems.",
    difficulty: "hard",
    topic: "clearing-settlement",
  },
  {
    id: "m01-q16",
    question: "What role does a central counterparty (CCP) play in the clearing process?",
    options: [
      "It provides foreign exchange rates",
      "It stands between buyer and seller, guaranteeing settlement even if one party defaults",
      "It generates SWIFT messages on behalf of banks",
      "It sets interest rates for overnight lending",
    ],
    correctIndex: 1,
    explanation:
      "A CCP interposes itself between the two parties in a transaction, becoming the buyer to every seller and the seller to every buyer. This eliminates bilateral counterparty risk because the CCP guarantees settlement.",
    difficulty: "medium",
    topic: "clearing-settlement",
  },

  // ═══════════════════════════════════════════════════════════
  // RTGS vs DNS (8 questions)
  // ═══════════════════════════════════════════════════════════

  {
    id: "m01-q17",
    question: "Which of the following is an example of an RTGS system?",
    options: [
      "BACS (UK)",
      "ACH (US)",
      "MEPS+ (Singapore)",
      "STEP2 (EU)",
    ],
    correctIndex: 2,
    explanation:
      "MEPS+ (MAS Electronic Payment System) is Singapore's RTGS system operated by the Monetary Authority of Singapore for high-value SGD payments. BACS, ACH, and STEP2 are all batch/DNS systems.",
    difficulty: "medium",
    topic: "rtgs-dns",
  },
  {
    id: "m01-q18",
    question: "What is a key disadvantage of RTGS compared to DNS?",
    options: [
      "Higher counterparty risk",
      "Higher liquidity requirements for participating banks",
      "Slower processing speed",
      "Less secure settlement",
    ],
    correctIndex: 1,
    explanation:
      "RTGS requires banks to have sufficient liquidity for each individual payment as it settles in real-time. DNS reduces liquidity needs through netting, but at the cost of increased counterparty risk.",
    difficulty: "easy",
    topic: "rtgs-dns",
  },
  {
    id: "m01-q19",
    question: "Singapore's FAST payment system processes transactions in real-time. Is FAST an RTGS system?",
    options: [
      "Yes, because it processes in real-time",
      "No, it is a real-time retail payment system with deferred settlement",
      "Yes, because it uses central bank money",
      "No, it is a batch processing system",
    ],
    correctIndex: 1,
    explanation:
      "FAST (Fast And Secure Transfers) processes payment instructions in real-time, but it is not an RTGS system. FAST settles through MEPS+ (the actual RTGS). Real-time message processing does not equal real-time gross settlement.",
    difficulty: "hard",
    topic: "rtgs-dns",
  },
  {
    id: "m01-q20",
    question: "In an RTGS system, what happens if the sending bank has insufficient funds at the moment of settlement?",
    options: [
      "The payment is netted with other payments",
      "The payment is queued or rejected until funds are available",
      "The central bank automatically provides credit",
      "The payment is settled the next business day",
    ],
    correctIndex: 1,
    explanation:
      "In RTGS, each transaction requires immediate funding. If the sending bank lacks sufficient balance in its central bank account, the payment will be queued (in systems with queuing mechanisms) or rejected outright.",
    difficulty: "medium",
    topic: "rtgs-dns",
  },
  {
    id: "m01-q21",
    question: "Why do most countries operate RTGS systems for high-value payments rather than DNS?",
    options: [
      "RTGS is cheaper to operate",
      "RTGS eliminates settlement risk by providing immediate finality",
      "RTGS can handle higher volumes",
      "DNS systems cannot process high-value payments",
    ],
    correctIndex: 1,
    explanation:
      "For high-value payments, the systemic risk of a bank defaulting on its net settlement position is too great. RTGS provides immediate, irrevocable finality for each transaction, eliminating the settlement risk inherent in DNS.",
    difficulty: "medium",
    topic: "rtgs-dns",
  },
  {
    id: "m01-q22",
    question:
      "A hybrid settlement system combines features of both RTGS and DNS. Which feature is typically borrowed from DNS?",
    options: [
      "Immediate finality",
      "Central bank money settlement",
      "Offsetting or netting of queued payments to reduce liquidity needs",
      "Individual transaction processing",
    ],
    correctIndex: 2,
    explanation:
      "Hybrid systems process payments frequently (like RTGS) but use offsetting or bilateral/multilateral netting of queued payments (borrowed from DNS) to reduce the liquidity required. This gives near-real-time finality with better liquidity efficiency.",
    difficulty: "hard",
    topic: "rtgs-dns",
  },
  {
    id: "m01-q23",
    question: "Which settlement type typically operates with specific cutoff times during the business day?",
    options: [
      "RTGS — it has strict session windows",
      "DNS — it has designated settlement cycles",
      "Both operate 24/7 with no cutoffs",
      "Neither has cutoff times",
    ],
    correctIndex: 1,
    explanation:
      "DNS systems have designated settlement cycles (e.g., 3 times per day or end-of-day) with cutoff times for submitting transactions into each cycle. RTGS also has operating hours, but transactions settle continuously during those hours.",
    difficulty: "medium",
    topic: "rtgs-dns",
  },
  {
    id: "m01-q24",
    question: "If Bank X processes 10,000 low-value retail payments per day, which settlement approach is more appropriate?",
    options: [
      "RTGS, because each payment needs individual finality",
      "DNS, because netting high volumes reduces liquidity costs and is operationally efficient",
      "Neither — retail payments do not require settlement",
      "RTGS, because it is faster",
    ],
    correctIndex: 1,
    explanation:
      "For high-volume, low-value retail payments, DNS is more practical. Netting thousands of transactions reduces the total settlement amount dramatically, lowering liquidity needs. The counterparty risk per transaction is small given the low values.",
    difficulty: "easy",
    topic: "rtgs-dns",
  },

  // ═══════════════════════════════════════════════════════════
  // Correspondent Banking (8 questions)
  // ═══════════════════════════════════════════════════════════

  {
    id: "m01-q25",
    question: "What is a nostro account?",
    options: [
      "An account a bank holds at another bank, denominated in the foreign bank's currency",
      "An account held by a foreign bank at the domestic bank",
      "A central bank reserve account",
      "A suspense account for unmatched transactions",
    ],
    correctIndex: 0,
    explanation:
      "A nostro account ('our account with you') is an account that a bank holds at a foreign correspondent bank, denominated in the correspondent bank's local currency. It is used to facilitate cross-border payments in that currency.",
    difficulty: "easy",
    topic: "correspondent-banking",
  },
  {
    id: "m01-q26",
    question: "How does a vostro account differ from a nostro account?",
    options: [
      "Vostro accounts are only used for domestic payments",
      "They are the same account viewed from different perspectives — nostro is 'our account with you,' vostro is 'your account with us'",
      "Vostro accounts can only be denominated in USD",
      "Vostro accounts are managed by the central bank",
    ],
    correctIndex: 1,
    explanation:
      "Nostro and vostro describe the same account from opposite perspectives. Bank A's nostro at Bank B is Bank B's vostro for Bank A. Nostro = 'our money at your bank,' Vostro = 'your money at our bank.'",
    difficulty: "easy",
    topic: "correspondent-banking",
  },
  {
    id: "m01-q27",
    question:
      "Bank A in India wants to send USD to Bank B in the UK, but they have no direct relationship. What is the most common solution?",
    options: [
      "Bank A opens a new branch in the UK",
      "Bank A uses an intermediary correspondent bank that has relationships with both",
      "Bank A converts USD to GBP and sends domestically",
      "Bank A uses the Indian RTGS system to send USD directly",
    ],
    correctIndex: 1,
    explanation:
      "When two banks lack a direct correspondent relationship, they use one or more intermediary banks that have existing relationships with both parties. This chain of correspondent banks enables cross-border payments across the SWIFT network.",
    difficulty: "medium",
    topic: "correspondent-banking",
  },
  {
    id: "m01-q28",
    question: "Why is correspondent banking becoming more concentrated among fewer large banks?",
    options: [
      "Smaller banks prefer direct connections",
      "Regulatory compliance costs (KYC, AML) make maintaining many correspondent relationships expensive",
      "SWIFT limits the number of banks that can participate",
      "Central banks are replacing correspondent banking",
    ],
    correctIndex: 1,
    explanation:
      "The increasing cost of regulatory compliance — KYC due diligence on correspondents, AML monitoring, sanctions screening — has led to 'de-risking,' where banks reduce their correspondent relationships. This concentrates cross-border payments through fewer large global banks.",
    difficulty: "medium",
    topic: "correspondent-banking",
  },
  {
    id: "m01-q29",
    question:
      "A payment from Singapore to Brazil passes through 3 intermediary banks. What risk increases with each additional hop?",
    options: [
      "The payment amount decreases due to FX spreads only",
      "Delay, cost, and opacity increase — each intermediary adds processing time, fees, and reduces end-to-end visibility",
      "The payment becomes more secure with each hop",
      "The clearing house rejects payments with more than 2 hops",
    ],
    correctIndex: 1,
    explanation:
      "Each intermediary bank in a correspondent chain adds processing time (potential cutoff misses), deducts fees, and reduces transparency for the end parties. This is a key problem SWIFT gpi was designed to address.",
    difficulty: "medium",
    topic: "correspondent-banking",
  },
  {
    id: "m01-q30",
    question: "What is the role of SWIFT in correspondent banking?",
    options: [
      "SWIFT settles payments between banks",
      "SWIFT provides a standardized messaging network for banks to send payment instructions to each other",
      "SWIFT holds nostro accounts on behalf of banks",
      "SWIFT provides foreign exchange services",
    ],
    correctIndex: 1,
    explanation:
      "SWIFT (Society for Worldwide Interbank Financial Telecommunication) is a messaging network, not a payment system. It does not hold funds or settle payments. It provides the standardized message formats and secure network for banks to communicate payment instructions.",
    difficulty: "easy",
    topic: "correspondent-banking",
  },
  {
    id: "m01-q31",
    question:
      "Bank A maintains a USD nostro account at JPMorgan in New York. If Bank A's nostro balance is insufficient for an outgoing USD payment, what happens?",
    options: [
      "JPMorgan automatically provides an overdraft",
      "The payment is queued or rejected, and Bank A must fund the nostro before the payment can proceed",
      "The payment is converted to Bank A's local currency",
      "SWIFT cancels the message automatically",
    ],
    correctIndex: 1,
    explanation:
      "The correspondent bank (JPMorgan) will not process a debit exceeding the nostro balance unless a credit facility is in place. Bank A must pre-fund the nostro account or arrange intraday credit to cover the payment.",
    difficulty: "hard",
    topic: "correspondent-banking",
  },
  {
    id: "m01-q32",
    question: "What is 'de-risking' in the context of correspondent banking?",
    options: [
      "Implementing better encryption for SWIFT messages",
      "Banks terminating correspondent relationships in regions perceived as high-risk for AML/sanctions",
      "Moving from DNS to RTGS settlement",
      "Reducing the number of payment messages sent per day",
    ],
    correctIndex: 1,
    explanation:
      "De-risking refers to banks withdrawing from correspondent relationships — particularly with banks in developing countries or high-risk jurisdictions — to reduce their exposure to regulatory penalties for AML/sanctions failures. This has significant financial inclusion implications.",
    difficulty: "hard",
    topic: "correspondent-banking",
  },

  // ═══════════════════════════════════════════════════════════
  // SWIFT Messaging (8 questions)
  // ═══════════════════════════════════════════════════════════

  {
    id: "m01-q33",
    question: "What type of payment does a SWIFT MT103 message represent?",
    options: [
      "A bank-to-bank transfer (cover payment)",
      "A single customer credit transfer",
      "A securities settlement instruction",
      "A statement of account",
    ],
    correctIndex: 1,
    explanation:
      "The MT103 is used for single customer credit transfers — the most common SWIFT message for cross-border payments from one customer to another through the banking system.",
    difficulty: "easy",
    topic: "swift-messaging",
  },
  {
    id: "m01-q34",
    question: "What is the purpose of a SWIFT MT202 message?",
    options: [
      "Customer credit transfer",
      "Financial institution transfer (bank-to-bank, often a cover payment)",
      "Account statement",
      "Payment status inquiry",
    ],
    correctIndex: 1,
    explanation:
      "The MT202 is a financial institution transfer used for bank-to-bank payments. MT202COV is the variant used as a cover payment to move funds between correspondent banks in support of a customer payment (MT103).",
    difficulty: "medium",
    topic: "swift-messaging",
  },
  {
    id: "m01-q35",
    question: "In a SWIFT MT103 message, what does Field 32A contain?",
    options: [
      "The sender's BIC code",
      "The value date, currency, and interbank settled amount",
      "The beneficiary's account number",
      "The remittance information",
    ],
    correctIndex: 1,
    explanation:
      "Field 32A in an MT103 contains three sub-fields: the value date (YYMMDD), the currency code (e.g., USD), and the interbank settled amount. It is one of the most critical fields in the payment instruction.",
    difficulty: "medium",
    topic: "swift-messaging",
  },
  {
    id: "m01-q36",
    question: "What does the SWIFT BIC (Bank Identifier Code) uniquely identify?",
    options: [
      "An individual payment transaction",
      "A specific bank branch or financial institution on the SWIFT network",
      "A customer's account number",
      "The clearing system used for settlement",
    ],
    correctIndex: 1,
    explanation:
      "A BIC (also called SWIFT code) is an 8 or 11 character code that uniquely identifies a financial institution on the SWIFT network. The 8-character version identifies the institution, while 11 characters identify a specific branch.",
    difficulty: "easy",
    topic: "swift-messaging",
  },
  {
    id: "m01-q37",
    question: "What is the difference between the MT (Message Type) and MX message categories in SWIFT?",
    options: [
      "MT messages are for domestic payments, MX for international",
      "MT uses proprietary FIN format, MX uses ISO 20022 XML format",
      "MT messages are encrypted, MX messages are not",
      "There is no difference — they are interchangeable",
    ],
    correctIndex: 1,
    explanation:
      "MT messages use SWIFT's proprietary FIN (Financial Information Network) format with fixed fields, while MX messages use the ISO 20022 XML-based standard with richer, structured data. The industry is migrating from MT to MX.",
    difficulty: "medium",
    topic: "swift-messaging",
  },
  {
    id: "m01-q38",
    question: "In an MT103, Field 50K identifies the 'Ordering Customer.' Why is this field critical for compliance?",
    options: [
      "It contains the exchange rate",
      "It identifies who originated the payment, which is essential for sanctions screening and AML checks",
      "It specifies the clearing system to use",
      "It contains the payment reference number",
    ],
    correctIndex: 1,
    explanation:
      "Field 50K contains the ordering customer's name and address. This information is essential for sanctions screening (checking against OFAC, EU, UN lists) and AML obligations. Incomplete originator information can cause payment delays or rejections.",
    difficulty: "medium",
    topic: "swift-messaging",
  },
  {
    id: "m01-q39",
    question: "What challenge does the industry face during the SWIFT MT to MX migration?",
    options: [
      "MX messages are slower to transmit",
      "Banks must support both formats simultaneously during the coexistence period, requiring translation and mapping",
      "MX messages cannot carry compliance data",
      "Only European banks need to migrate",
    ],
    correctIndex: 1,
    explanation:
      "During migration, some banks will send MT while others expect MX. This coexistence period requires banks to implement translation services between MT and MX formats, handle data truncation (MT has shorter fields), and manage format-dependent routing logic.",
    difficulty: "hard",
    topic: "swift-messaging",
  },
  {
    id: "m01-q40",
    question:
      "A SWIFT MT103 has Field 71A set to 'SHA.' What does this indicate about the payment charges?",
    options: [
      "All charges are paid by the sender (OUR)",
      "All charges are paid by the receiver (BEN)",
      "Charges are shared — sender pays their bank's charges, receiver pays their bank's charges",
      "No charges apply to this payment",
    ],
    correctIndex: 2,
    explanation:
      "SHA (Shared) means the originator pays the charges of the sending bank, and the beneficiary pays the charges of the receiving bank. OUR means originator pays all, BEN means beneficiary pays all.",
    difficulty: "easy",
    topic: "swift-messaging",
  },

  // ═══════════════════════════════════════════════════════════
  // General Payment Concepts (10 questions)
  // ═══════════════════════════════════════════════════════════

  {
    id: "m01-q41",
    question: "What is a 'payment rail'?",
    options: [
      "A physical cable connecting bank data centers",
      "The underlying infrastructure and network through which payments are processed and settled",
      "A type of SWIFT message",
      "A security protocol for encrypting payment data",
    ],
    correctIndex: 1,
    explanation:
      "A payment rail is the infrastructure, rules, and network that enable the movement of money from one party to another. Examples include SWIFT, ACH, Fedwire, SEPA, and card networks like Visa/Mastercard.",
    difficulty: "easy",
    topic: "general",
  },
  {
    id: "m01-q42",
    question: "What makes a cross-border payment more complex than a domestic payment?",
    options: [
      "Cross-border payments always use RTGS",
      "They involve multiple jurisdictions, currencies, regulatory regimes, and often require correspondent banking chains",
      "Domestic payments do not require clearing",
      "Cross-border payments are always more expensive because of SWIFT fees only",
    ],
    correctIndex: 1,
    explanation:
      "Cross-border payments add complexity through: multiple currencies (FX), different regulatory requirements per jurisdiction, correspondent banking chains, different clearing systems and cutoff times, and varying message format requirements.",
    difficulty: "easy",
    topic: "general",
  },
  {
    id: "m01-q43",
    question: "What is the value date in a payment instruction?",
    options: [
      "The date the payment message was created",
      "The date on which the funds should be available to the beneficiary (settlement date)",
      "The date the compliance check was completed",
      "The date the payment was initiated by the customer",
    ],
    correctIndex: 1,
    explanation:
      "The value date is the date on which the settlement is expected to occur and funds become available to the beneficiary. It may differ from the instruction date, especially for forward-dated payments or payments crossing time zones.",
    difficulty: "medium",
    topic: "general",
  },
  {
    id: "m01-q44",
    question:
      "In a payment system, what does 'STP' (Straight-Through Processing) mean?",
    options: [
      "Payments that are processed manually by operations staff",
      "Payments that flow from initiation to settlement without manual intervention",
      "Payments that skip compliance screening",
      "Payments that are sent using a dedicated fiber line",
    ],
    correctIndex: 1,
    explanation:
      "STP means a payment is processed automatically from end to end without any manual intervention. High STP rates indicate efficient processing. Manual repairs (caused by missing data, screening hits, etc.) reduce STP rates and increase costs.",
    difficulty: "medium",
    topic: "general",
  },
  {
    id: "m01-q45",
    question: "What is the difference between a credit transfer and a direct debit?",
    options: [
      "Credit transfers are for large amounts, direct debits for small",
      "In a credit transfer the payer pushes funds; in a direct debit the payee pulls funds with the payer's authorization",
      "Credit transfers use SWIFT, direct debits use card networks",
      "There is no functional difference",
    ],
    correctIndex: 1,
    explanation:
      "A credit transfer is payer-initiated (push): the payer instructs their bank to send money. A direct debit is payee-initiated (pull): the payee instructs collection from the payer's account based on prior authorization (mandate).",
    difficulty: "easy",
    topic: "general",
  },
  {
    id: "m01-q46",
    question: "Why do payment systems typically require idempotency in their design?",
    options: [
      "To ensure payments are processed faster",
      "To prevent duplicate processing — the same payment instruction processed multiple times should only result in one settlement",
      "To comply with SWIFT message format requirements",
      "To enable payments to be reversed easily",
    ],
    correctIndex: 1,
    explanation:
      "Idempotency ensures that if a payment instruction is received multiple times (due to retries, network issues, etc.), it is only processed once. This is critical in financial systems where duplicate processing means double-spending.",
    difficulty: "medium",
    topic: "general",
  },
  {
    id: "m01-q47",
    question: "What is an FX (foreign exchange) component in a cross-border payment?",
    options: [
      "A fee charged by SWIFT for message transmission",
      "The conversion of the payment amount from the sender's currency to the beneficiary's currency at an agreed rate",
      "A type of compliance screening",
      "The routing of a payment through multiple clearing systems",
    ],
    correctIndex: 1,
    explanation:
      "When a cross-border payment involves different currencies (e.g., SGD to USD), an FX conversion must occur. The exchange rate, the party performing the conversion, and the timing of the rate lock all affect the final amount the beneficiary receives.",
    difficulty: "medium",
    topic: "general",
  },
  {
    id: "m01-q48",
    question:
      "A large multinational company sends 500 payments to different beneficiaries in a single file. What type of payment is this?",
    options: [
      "A single high-value transfer",
      "A batch or bulk payment file",
      "A direct debit collection",
      "A securities settlement",
    ],
    correctIndex: 1,
    explanation:
      "Batch or bulk payments allow corporates to submit many payment instructions in a single file (e.g., payroll, supplier payments). The bank processes each instruction individually but receives them as one submission, often using formats like pain.001 (ISO 20022).",
    difficulty: "medium",
    topic: "general",
  },
  {
    id: "m01-q49",
    question:
      "What is the primary purpose of a payment status message (e.g., pacs.002 in ISO 20022)?",
    options: [
      "To initiate a new payment",
      "To provide the originator with feedback on the processing status of their payment instruction",
      "To settle the payment at the central bank",
      "To screen the payment for sanctions",
    ],
    correctIndex: 1,
    explanation:
      "Status messages like pacs.002 inform the originating bank whether a payment was accepted, rejected, or is pending. They provide transparency throughout the payment lifecycle and are essential for STP monitoring and exception handling.",
    difficulty: "medium",
    topic: "general",
  },
  {
    id: "m01-q50",
    question:
      "A payment fails sanctions screening and is held for investigation. In the payment lifecycle, at what stage does this typically occur?",
    options: [
      "After settlement, during reconciliation",
      "Before or during clearing, as part of authorization and compliance checks",
      "Only at the beneficiary bank",
      "Sanctions screening happens outside the payment lifecycle",
    ],
    correctIndex: 1,
    explanation:
      "Sanctions screening typically occurs during the authorization/compliance phase — after initiation but before the payment enters the clearing system. Both the originating bank and intermediary banks may perform screening, potentially at multiple points in the chain.",
    difficulty: "hard",
    topic: "general",
  },
];

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

/**
 * Returns a randomized quiz with balanced difficulty distribution.
 * Default: 15 questions (~30% easy, ~50% medium, ~20% hard).
 */
export function getRandomQuiz(count: number = 15): QuizQuestion[] {
  const shuffled = [...m01Questions].sort(() => Math.random() - 0.5);

  const easy = shuffled.filter((q) => q.difficulty === "easy");
  const medium = shuffled.filter((q) => q.difficulty === "medium");
  const hard = shuffled.filter((q) => q.difficulty === "hard");

  const selected = [
    ...easy.slice(0, Math.ceil(count * 0.3)),
    ...medium.slice(0, Math.ceil(count * 0.5)),
    ...hard.slice(0, Math.ceil(count * 0.2)),
  ].slice(0, count);

  return selected.sort(() => Math.random() - 0.5);
}
