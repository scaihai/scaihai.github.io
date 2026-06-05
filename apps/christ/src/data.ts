import { Prophecy, TombTheory, Eyewitness, ForensicPillar } from "./types";

export const propheciesData: Prophecy[] = [
  {
    id: "bethlehem-birth",
    title: "Born in Bethlehem",
    scriptureRef: "Micah 5:2",
    scriptureText: "But you, Bethlehem Ephrathah, though you are small among the clans of Judah, out of you will come for me one who will be ruler over Israel, whose origins are from of old, from ancient times.",
    fulfillmentRef: "Matthew 2:1-6",
    fulfillmentText: "After Jesus was born in Bethlehem in Judea, during the time of King Herod, Magi from the east came to Jerusalem... 'In Bethlehem in Judea,' they replied, 'for this is what the prophet has written...'",
    context: "Micah prophesied around 700 BC. Bethlehem was an insignificant agricultural hamlet, making this highly specific geographic pinpoint highly risky for any generic pretender.",
    qumranEvidence: "Micah fragments containing various verses were recovered at Qumran (Dead Sea Scrolls) dating between 150 BC and 50 BC, verifying the text was set in stone centuries prior to Jesus.",
    stonerProbability: 280000,
    stonerLabel: "1 in 2.8 × 10^5"
  },
  {
    id: "virgin-birth",
    title: "Born of a Virgin",
    scriptureRef: "Isaiah 7:14",
    scriptureText: "Therefore the Lord himself will give you a sign: The virgin will conceive and give birth to a son, and will call him Immanuel.",
    fulfillmentRef: "Matthew 1:22-23",
    fulfillmentText: "All this took place to fulfill what the Lord had said through the prophet: 'The virgin will conceive and give birth to a son, and they will call him Immanuel' (which means 'God with us').",
    context: "Written around 735 BC, Isaiah delivered this prophecy to King Ahaz. The Hebrew term 'Almah' specifically refers to a young, unmarried woman of marriageable age, historically translated in the Greek Septuagint (LXX, 250 BC) as 'parthenos' (virgin).",
    qumranEvidence: "The Great Isaiah Scroll (1QIsa-a), carbon dated to circa 125 BC, preserves 100% of Isaiah's text, including Chapter 7, proving this translation and prophecy preceded Jesus's birth.",
    stonerProbability: 1000,
    stonerLabel: "1 in 1.0 × 10^3"
  },
  {
    id: "preceding-messenger",
    title: "Preceded by a Messenger",
    scriptureRef: "Isaiah 40:3 / Malachi 3:1",
    scriptureText: "A voice of one calling: 'In the wilderness prepare the way for the Lord; make straight in the desert a highway for our God.' ... 'I will send my messenger, who will prepare the way before me.'",
    fulfillmentRef: "Matthew 3:1-3",
    fulfillmentText: "In those days John the Baptist came, preaching in the wilderness of Judea and saying, 'Repent, for the kingdom of heaven has come near.' This is he who was spoken of through the prophet Isaiah...",
    context: "Isaiah (700 BC) and Malachi (430 BC) both predict that the Messiah would not appear out of thin air, but would be heralded by a distinct desert prophet crying out repentance.",
    qumranEvidence: "The community at Qumran specifically withdrew to the Judaean desert citing Isaiah 40:3 as their charter, verifying the antiquity of this prophetic mandate.",
    stonerProbability: 8000,
    stonerLabel: "1 in 8.0 × 10^3"
  },
  {
    id: "entering-jerusalem",
    title: "Entering Jerusalem on a Donkey",
    scriptureRef: "Zechariah 9:9",
    scriptureText: "Rejoice greatly, Daughter Zion! Shout, Daughter Jerusalem! See, your king comes to you, righteous and victorious, lowly and riding on a donkey, on a colt, the foal of a donkey.",
    fulfillmentRef: "Matthew 21:1-11",
    fulfillmentText: "The disciples went and did as Jesus had instructed them. They brought the donkey and the colt... Jesus entered Jerusalem and the whole city was stirred...",
    context: "Zechariah (520 BC) foretold a king coming not in military power (on a stallion), but on a beast of burden (representing absolute humility and peace), directly verified by the events of Palm Sunday.",
    qumranEvidence: "Zechariah scrolls discovered in Qumran (Murabba'at Minor Prophets) are archaeologically confirmed prior to the Roman era.",
    stonerProbability: 100,
    stonerLabel: "1 in 1.0 × 10^2"
  },
  {
    id: "thirty-silver-pieces",
    title: "Betrayed for 30 Silver Pieces",
    scriptureRef: "Zechariah 11:12",
    scriptureText: "I told them, 'If you think it best, give me my pay; but if not, keep it.' So they paid me thirty pieces of silver.",
    fulfillmentRef: "Matthew 26:15",
    fulfillmentText: "And asked, 'What are you willing to give me if I deliver him over to you?' So they counted out for him thirty pieces of silver.",
    context: "30 pieces of silver was the ancient Levitical price of a common slave (Exodus 21:32). Zechariah predicted that Israel's Shepherd would be valued and sold at this insulting baseline price.",
    qumranEvidence: "Found in several Hebrew manuscripts at the Dead Sea caves, securing this text's absolute antiquity.",
    stonerProbability: 1000,
    stonerLabel: "1 in 1.0 × 10^3"
  },
  {
    id: "money-to-potter",
    title: "Betrayal Price Cast to the Potter",
    scriptureRef: "Zechariah 11:13",
    scriptureText: "And the Lord said to me, 'Throw it to the potter'—the handsome price at which they valued me! So I took the thirty pieces of silver and threw them into the house of the Lord to the potter.",
    fulfillmentRef: "Matthew 27:3-10",
    fulfillmentText: "So Judas threw the money into the temple and left... The chief priests picked up the coins... So they decided to use the money to buy the potter’s field as a burial place for foreigners.",
    context: "A bizarrely specific compound prophecy: (1) exact amount (30 silver), (2) returned to the Temple, (3) thrown down on the floor, (4) used specifically to purchase land from a potter. Fulfilling this required a coordinated sequence of decisions by multiple hostile parties.",
    qumranEvidence: "Prophets scrolls from Nahal Hever and Qumran authenticate the intact sequence of Zechariah 11.",
    stonerProbability: 100000,
    stonerLabel: "1 in 1.0 × 10^5"
  },
  {
    id: "crucifixion-pierced",
    title: "Pierced Hands and Feet",
    scriptureRef: "Psalm 22:16",
    scriptureText: "Dogs surround me, a pack of villains encircles me; they pierce my hands and my feet.",
    fulfillmentRef: "John 19:18 / John 20:25",
    fulfillmentText: "There they crucified him, and with him two others... 'Unless I see the nail marks in his hands and put my finger where the nails were, I will not believe.'",
    context: "Written by King David around 1000 BC. This is extremely significant because crucifixion was entirely unknown to the Jews in 1000 BC (their standard execution method was stoning). Crucifixion was invented by the Persians and later institutionalized by Rome centuries later.",
    qumranEvidence: "The Dead Sea Scroll Psalm fragments (such as 5/6HevPs) contain the Hebrew word 'ka'aru' or 'karu' ('they pierced') rather than the later Masoretic alteration 'ka'ari' ('like a lion'), confirming the authentic ancient piercing reading.",
    stonerProbability: 10000,
    stonerLabel: "1 in 1.0 × 10^4"
  },
  {
    id: "silent-accusers",
    title: "Silent Before His Accusers",
    scriptureRef: "Isaiah 53:7",
    scriptureText: "He was oppressed and afflicted, yet he did not open his mouth; he was led like a lamb to the slaughter, and as a sheep before its shearers is silent, so he did not open his mouth.",
    fulfillmentRef: "Matthew 27:12",
    fulfillmentText: "When he was accused by the chief priests and the elders, he gave no answer.",
    context: "Written ~700 BC. Standard human psychology dictates that a man facing capital charges will defend himself passionately. Jesus's deliberate absolute silence before the High Priest and Pilate is a historical rarity.",
    qumranEvidence: "The intact Isaiah scroll reveals Isaiah 53's Suffering Servant passage existed exactly in this format in 125 BC.",
    stonerProbability: 1000,
    stonerLabel: "1 in 1.0 × 10^3"
  },
  {
    id: "rich-man-tomb",
    title: "Buried in a Rich Man's Tomb",
    scriptureRef: "Isaiah 53:9",
    scriptureText: "He was assigned a grave with the wicked, and with the rich in his death, though he had done no violence, nor was any deceit in his mouth.",
    fulfillmentRef: "Matthew 27:57-60",
    fulfillmentText: "As evening approached, there came a rich man from Arimathea, named Joseph... Joseph took the body, wrapped it in a clean linen cloth, and placed it in his own new tomb...",
    context: "A condemned heretic executed by public crucifixion was legally destined for a mass grave of common criminals (the wicked). Fulfilling this required a wealthy political figure (Joseph of Arimathea) to step forward and risk his reputation to request the body.",
    qumranEvidence: "Completely verified by the Great Qumran Isaiah scroll dating, which contains every verse of chapter 53.",
    stonerProbability: 1000,
    stonerLabel: "1 in 1.0 × 10^3"
  }
];

export const tombTheoriesData: TombTheory[] = [
  {
    id: "stolen-body",
    name: "The Stolen Body Theory",
    tagline: "The oldest explanation: Did the disciples carry out a stealth commando heist?",
    description: "First stated by the guards in Matthew 28, this theory claims the cowering, grief-stricken disciples sneaked past Roman legionaries in the dark, broke the imperial seal, rolled a multi-ton stone, and smuggled Jesus out.",
    keyPoints: [
      "Secured Guard: Pilate dispatched a Roman 'koustodia' (4 to 16 elite soldiers) to protect the site against theft.",
      "The Imperial Seal: Ropes stretched across the rock and anchored with a clay mark. Breaking it was considered high treason against Rome, carrying upside-down crucifixion.",
      "Cowering Apostles: The disciples fled at Jesus's arrest, locked themselves in an upper room, and feared for their lives.",
      "No Wealth or Power: Fishermen with zero military experience would have had to execute a silent black-ops raid in the middle of Passover week."
    ],
    scores: {
      logicalCoherence: 2,
      textualAdherence: 3,
      militaryFeasibility: 1
    },
    refutations: [
      "The Martyrdom Factor: Eleven apostles died brutal, agonizing deaths (stoning, flaying, crucifying) specifically for the claim of seeing the resurrected Christ. Psychological science proves that while many die for a lie they *think* is true, NO ONE willingly undergoes torture for a hoax they *personally invented*.",
      "The Sleep Contradiction: The official historical defense of the guards was 'We were sleeping.' If they were asleep, they couldn't identify the disciples. Furthermore, sleeping on duty in Roman combat was instantly punishable by capital execution under military law."
    ]
  },
  {
    id: "swoon-theory",
    name: "The Swoon / Fainting Theory",
    tagline: "Did He survive capital crucifixion and walk out of the tomb manually?",
    description: "Suggests that Jesus did not actually die on the cross, but fainted from shock and blood loss, was mistakenly entombed, was revived by the damp tomb tomb atmosphere, and emerged to claim victory over death.",
    keyPoints: [
      "Execution Experts: Roman centurions were highly professional killers. Letting a capital prisoner live of their own accord was a death-penalty failure.",
      "Severity of Crucifixion: Flogging shredded skin; suspended hanging produced asphyxiation. Jesus's side was pierced with a spear, releasing 'blood and water' (pleural effusion), confirming medical cardiac rupture.",
      "The Logistics: A severely wounded, dehydrated, and bound Jesus would have had to push a 1.5-ton stone from the inside out of a declining slot, bypass Roman soldiers, and recruit disciples."
    ],
    scores: {
      logicalCoherence: 1,
      textualAdherence: 2,
      militaryFeasibility: 1
    },
    refutations: [
      "The David Strauss Refutation: German rationalist David Strauss crushed this: 'It is impossible that a being who had just stolen half-dead out of the sepulchre, who crept about weak and ill, wanting medical treatment, could have given... the impression that he was a Conqueror over graves and death... This condition could only have weakened their faith and turned their enthusiasm into sorrow.'"
    ]
  },
  {
    id: "hallucination-theory",
    name: "The Grief Hallucination Theory",
    tagline: "Was the resurrection a mass neurological anomaly?",
    description: "Claims the trauma of crucifixion induced vivid grief hallucinations in the disciples, driving them to sincerely believe they were seeing, speaking with, and touching a resurrected Jesus.",
    keyPoints: [
      "Isolated vs. Collective: Hallucinations are fundamentally subjective, individual neurological phenomena, like dreams. They do not duplicate in shared spaces.",
      "Multiple Sightings: The data shows appearances to individuals (Peter, Mary), small groups (Emmaus, John), large groups (the Twelve), and over 500 people simultaneously.",
      "Hostile Skeptics: Convincing friends is one thing; but hallucinations cannot account for the dramatic conversion of hostile skeptics who were not grieving (such as James, and Saul of Tarsus)."
    ],
    scores: {
      logicalCoherence: 3,
      textualAdherence: 4,
      militaryFeasibility: 9
    },
    refutations: [
      "The Empty Tomb Silence: If the disciples were merely experiencing visions or auditory hallucinations, the physical corpse would still be in the tomb. The Jewish authorities needed only to display the body in Jerusalem to instantly choke and destroy Christianity on Day 1.",
      "Sensory Overlap: The testimonies claim physical interactions: eating broiled fish, long walks, touching the side and nail marks. These are incompatible with typical visual phantoms."
    ]
  },
  {
    id: "resurrection",
    name: "The Physical Resurrection",
    tagline: "The central core Christian claim: Sensus plenior & historic validity",
    description: "Proponents state that Jesus of Nazareth rose physically from the dead on the third day, providing joint, clean compatibility with all three undeniable historical facts agreed upon by secular and christian critics.",
    keyPoints: [
      "Fact A: The tomb was physically empty on Sunday morning (otherwise modern Christianity would have died in its cradle in Jerusalem).",
      "Fact B: Dozens of unique, hostile, and cowering observers suddenly claimed to interact with a physical resurrected Jesus.",
      "Fact C: Panicked, fleeing disciples transformed instantly into unstoppable, fearless zealots ready to face execution to preach this fact."
    ],
    scores: {
      logicalCoherence: 9,
      textualAdherence: 9,
      militaryFeasibility: 10
    },
    refutations: [
      "The Supernatural Objection: By definition, this requires a suspension of strict Newtonian natural laws, which is impossible to replicate in a laboratory setting. It can only be evaluated through standard historical adductive reasoning (best explanation of historical effects)."
    ]
  }
];

export const eyewitnessesData: Eyewitness[] = [
  {
    id: "peter",
    name: "Simon Peter",
    subtitle: "The Fearful Denier Turned Unshakeable Anchor",
    preConversion: "Peter was a rash, illiterate Galilean fisherman. During Jesus's arrest, he panicked, fled, and denied even knowing Jesus three times to low-status servant girls to save his own skin.",
    encounter: "Jesus appeared specifically to Peter individually first (1 Cor 15:5, Luke 24:34), then subsequently led active dialogues with him on the Sea of Galilee, eating breakfast on the shore.",
    postEncounter: "He stepped forward into the very center of Jerusalem—where public execution took place—preaching the resurrection to the Sanhedrin, refusing to be silenced by arrests or beatings.",
    martyrdom: "Crucified upside down by Nero in Rome around 64 AD, refusing to retract his physical claim of interacting with the risen Jesus.",
    uniqueness: "Represents absolute transition from terrified psychological self-preservation to self-sacrificing execution under Rome."
  },
  {
    id: "james",
    name: "James (The Brother of Jesus)",
    subtitle: "The Family Skeptic Who Became a Column Leader",
    preConversion: "The Gospels record that Jesus's own siblings did not believe in him during his ministry and actually thought he was out of his mind (Mk 3:21, Jn 7:5). James was a devout, skeptical legalist.",
    encounter: "As recorded in the ultra-early creed (1 Cor 15:7): 'Then he appeared to James...'.",
    postEncounter: "James converted immediately, joining the disciples. He rose to become the senior leader of the mother church in Jerusalem, renowned for his intense adherence to holiness.",
    martyrdom: "He was thrown from the temple heights by the Sanhedrin and subsequently clubbed to death around 62 AD, refusing to deny that his brother was the resurrected Son of God.",
    uniqueness: "Brotherly skepticism is famous; siblings are historically the hardest to deceive about a claiming divinity."
  },
  {
    id: "paul",
    name: "Saul of Tarsus (Apostle Paul)",
    subtitle: "The Elite Rabbinic Inquisitor and Persecutor",
    preConversion: "Saul was an elite Pharisee under Gamaliel who possessed immense social power, Roman citizenship, and authority. He active hunted, dragged, imprisoned, and consented to the execution of early Christians.",
    encounter: "Experienced an intense daytime bright vision of the risen Christ on the road to Damascus (circa 33-34 AD), striking him physically blind and revealing Jesus directly to him.",
    postEncounter: "Immediately forfeited his elite Jewish honors, Roman prestige, and theological career. He launched three global missionary journeys, writing most of the New Testament documents.",
    martyrdom: "Beheaded under Rome in Nero's persecutions, leaving a rich epistolary register documenting the historical reality of his encounter.",
    uniqueness: "The supreme hostile witness. No standard psychological grief, guilt, or positive bias can explain his massive career forfeit."
  },
  {
    id: "five-hundred",
    name: "The 500 Plus Witnesses",
    subtitle: "The Massive Collective Verification",
    preConversion: "A vast cohort of Galilean and Judean citizens who witnessed the brutal, public, Roman execution of Jesus, leaving them absolutely certain of his definitive death.",
    encounter: "Jesus appeared physically to over 500 disciples at a single simultaneous gathering (1 Cor 15:6).",
    postEncounter: "This collective encounter was documented in a creed written just 1-5 years after the crucifix. Paul noted to his readers in 54 AD that 'most of whom are still living, though some have fallen asleep.'",
    martyrdom: "Many faced continuous Roman expulsion and persecution, yet they acted as an living directory of eye-witness verification in the ancient world.",
    uniqueness: "Eliminates the psychological escape-hatch of individual madness or isolated hallucination. Demonstrates wide empirical corroboration."
  }
];

export const pillarsData: ForensicPillar[] = [
  {
    id: "bibliographical",
    title: "The Bibliographical Test",
    subtitle: "Manuscript Reliability",
    tagline: "Comparing New Testament documents against accepted classical ancient histories.",
    narrative: "When investigating ancient claims, historians evaluate validity by looking at two crucial elements: the number of surviving manuscript copies and the length of the time gap between the original writing and our earliest surviving copy. Skeptics often argue that the Bible is a game of 'telephone,' but comparative metrics reveal that the New Testament is, by an astronomical margin, the best-preserved document in the ancient world.",
    evidencePoints: [
      {
        label: "The Cross-Checking Safeguard",
        details: "Because thousands of manuscripts were distributed across separate, far-flung geographic regions (Egypt, Syria, Rome), copyist errors are immediately isolated. If a scribe in Alexandria made an alteration in 200 AD, it stands out clearly when compared against copies from Antioch or Rome. This allows textual critics to reconstruct the original texts with over 99% accuracy."
      },
      {
        label: "The Scope of Translations",
        details: "Beyond the Greek manuscripts, there are over 18,000 ancient translations in Latin, Syriac, Coptic, and Armenian, creating an unbreakable chain of textual stability dating back to the earliest centuries of the Church."
      }
    ],
    comparisons: [
      {
        subject: "Caesar's Gallic Wars",
        manuscripts: 10,
        manuscriptsLabel: "10 copies",
        timeGapYears: 1000,
        timeGapLabel: "1,000 Years"
      },
      {
        subject: "Homer's Iliad",
        manuscripts: 1750,
        manuscriptsLabel: "~1,750 copies",
        timeGapYears: 400,
        timeGapLabel: "400 Years"
      },
      {
        subject: "The New Testament",
        manuscripts: 5800,
        manuscriptsLabel: "5,800+ Greek (24,000+ Total)",
        timeGapYears: 50,
        timeGapLabel: "50–70 Years"
      }
    ]
  },
  {
    id: "archaeological",
    title: "The Archaeological Record",
    subtitle: "Secular & Physical Corroboration",
    tagline: "Uncovering first-century physical proof that brings biblical events and titles out of myth.",
    narrative: "Critics historically claimed that the biblical authors invented figures, titles, and locations to fabricate a narrative. However, modern archaeology consistently digs up physical evidence that vindicates the precise historical reliability of the Gospel accounts.",
    evidencePoints: [
      {
        label: "Confronting Historical Minimalism",
        details: "Every decade, major excavations uncover precise structures, titles, and public notices validating Gospel narratives. This forces secular historians to treat Luke and John as meticulous observers rather than late myth-makers."
      }
    ],
    discoveries: [
      {
        name: "The Pilate Stone",
        year: "1961",
        location: "Caesarea Maritima",
        details: "An excavated limestone building block bearing a Latin dedication to Emperor Tiberius by 'Pontius Pilate, Prefect of Judea.' Prior to this find, there was no physical, extra-biblical record of Pilate's existence, with critics claiming he was entirely fictional."
      },
      {
        name: "The Pool of Bethesda",
        year: "1888",
        location: "Jerusalem's Muslim Quarter",
        details: "Critics claimed John's description of a pool with 'five porticoes' (John 5:2) was historically absurd. Excavators found exactly such a structure, matching John's detail precisely, buried under centuries of rubble."
      },
      {
        name: "The Bone Box of Caiaphas",
        year: "1990",
        location: "Peace Forest, Jerusalem",
        details: "Archaeologists stumbled upon an ornate, family ossuary (bone box) inscribed with the name of 'Yehosef bar Qayafa' (Joseph, son of Caiaphas), the high priest who orchestrated Jesus's trial and condemnation."
      }
    ]
  },
  {
    id: "medical",
    title: "Certainty of Physical Death",
    subtitle: "Refuting the Swoon Theory",
    tagline: "The medical impossibility of surviving Roman crucifixion and a cardiac-piercing spear.",
    narrative: "The Swoon Theory proposes that Jesus didn't actually die on the cross, but merely passed out, revived in the cool of the tomb, and convinced everyone he conquered death. Modern medical science makes this assertion completely impossible.",
    evidencePoints: [
      {
        label: "Professional Roman Executioners",
        details: "Romans were clinical executioners who faced the death penalty themselves if a condemned prisoner survived. They checked for death by breaking legs to trigger rapid asphyxiation, but bypassed Jesus because his death was already visible."
      },
      {
        label: "The Physical Impossibility of Inner Escape",
        details: "An individual who was scourged, hung by spikes, pierced in the side, wrapped in a 100-pound encasing of sticky resinous linens, and laid in a freezing tomb could not physically wake up, slide off a stone slab, roll a 2-ton stone uphill, bypass heavily armed guards, and inspire a global movement as a 'glorious conqueror of death.'"
      }
    ],
    medicalAnatomy: [
      {
        symptom: "Scourging & Hypovolemic Shock",
        clinicalEffect: "The Roman 'flagrum' ripped muscles, exposed bones, and caused extreme blood loss, leaving Jesus in a state of terminal circulatory collapse before even reaching the cross.",
        evidenceText: "Mark 15:15 records Jesus was flogged so heavily he was unable to carry his crossbeam, consistent with rapid onset hypovolemic shock."
      },
      {
        symptom: "The Spear Thrust: Blood and Water",
        clinicalEffect: "A soldier thrust a spear directly through the ribs. The immediate release of distinct 'blood and water' is a clinical description of pericardial effusion (fluid around the heart) or pleural effusion (fluid around the lungs)—conclusive signs of cardiac rupture and clinical death.",
        evidenceText: "John 19:34 records: 'one of the soldiers pierced Jesus’ side with a spear, bringing a sudden flow of blood and water.' John possessed no knowledge of modern cardiology, proving he was merely documenting a real, eyewitness medical fact."
      }
    ]
  },
  {
    id: "sociological",
    title: "The Jerusalem Factor",
    subtitle: "Sociological Proof",
    tagline: "Why launching a resurrection lie in the city of the public execution is a historical impossibility.",
    narrative: "If you want to orchestrate a massive hoax about a resurrected leader, the absolute worst place to start is the exact city where he was publicly executed just weeks prior. Yet, Jerusalem was the very epicenter where Christianity exploded.",
    evidencePoints: [
      {
        label: "The Ten-Minute Walk Refutation",
        details: "The tomb of Jesus was empty, and both secular and religious authorities knew its location. If the resurrection was a manufactured lie in those early weeks, the hostile Sanhedrin or Roman rulers would have walked 10 minutes to the tomb, extracted the corpse, paraded it down the streets of Jerusalem on a cart, and crushed the movement in its infancy. Their inability to produce a body proves the tomb's vacancy was absolute."
      },
      {
        label: "Explosion Under Extreme Hostility",
        details: "The Christian movement did not start in some far-off, gullible province. It burst forth in Judea's religious capital under the noses of Pontius Pilate and the Jewish High Priest, who possessed every legal authority, military resource, and strong motive to expose a fraud. Thousands of locals converted on the spot because they could cross-check the claims using the empty tomb and eyewitness testimonies."
      }
    ],
    sociologicalTakeaways: [
      "The tomb was public, known, and physically vacant.",
      "Religious and state authorities had maximum motive and power to expose a fraud, but failed.",
      "The early church was born directly on the scene of the crime, not hidden in distance or time."
    ]
  }
];
