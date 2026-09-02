import type { SpeakingCoaching, SpeakingScript, SpeakingTopic } from '@/types';

const FILLERS: SpeakingCoaching = {
  live: 'Name the thing first. Then one reason. Do not start with “I think”.',
  short: 'That was under twenty seconds. Answer, then add one concrete detail.',
  held: 'You held the time. Drop “actually” and “basically” — they stall the start.',
};

const PART2: SpeakingCoaching = {
  live: 'Keep going. The last minute is where people stall. Use the bullets in order.',
  short: 'Part 2 needs the two minutes. You left early. Use every bullet, then a last line.',
  held: 'You used the clock. The last twenty seconds still drifted into “I think”.',
};

const PART3: SpeakingCoaching = {
  live: 'Take a position. Then one example. Do not list both sides and stop.',
  short: 'Part 3 wants a view. One sentence of opinion, then why.',
  held: 'You took a view. Swap “good for society” for the actual effect.',
};

function script(you: string, better: string, why: string): SpeakingScript {
  return { you, better, why };
}

export const mockSpeakingTopics: readonly SpeakingTopic[] = [
  {
    id: 'hometown',
    title: 'The street you know',
    theme: 'Home',
    minutes: 11,
    recommended: true,
    intro:
      'Part 1 on where you live, a Part 2 cue about a place you would show a visitor, then Part 3 on cities and staying put.',
    part1: [
      {
        id: 'hometown-p1-1',
        part: 1,
        prompt: 'Where do you live — a city, a town, or a village?',
        targetMs: 35_000,
        coaching: FILLERS,
        script: script(
          'I think I live in a small city, actually near the river. Basically it’s quiet.',
          'I live in a small city on the river. It stays quiet in the evenings.',
          '“I think” delays the answer. Name the place, then one fact.',
        ),
      },
      {
        id: 'hometown-p1-2',
        part: 1,
        prompt: 'How long have you lived there?',
        targetMs: 30_000,
        coaching: FILLERS,
        script: script(
          'I think maybe around eight years, actually. Basically since I started work.',
          'I have lived there for eight years, since I started work.',
          '“Maybe around” is a hedge. Give the number.',
        ),
      },
      {
        id: 'hometown-p1-3',
        part: 1,
        prompt: 'What do you like most about the area?',
        targetMs: 40_000,
        coaching: FILLERS,
        script: script(
          'I think the shops are very good, actually. Basically I can walk everywhere.',
          'I can walk to the shops. That is what I like — I do not need a bus for daily things.',
          '“Very good” does not name the benefit. Walking is the point.',
        ),
      },
    ],
    part2: {
      id: 'hometown-p2',
      part: 2,
      title: 'Describe a place in your neighbourhood you would take a visitor.',
      bullets: [
        'Where it is',
        'How you get there',
        'What you would do there',
        'And explain why you would take a visitor there',
      ],
      prepMs: 60_000,
      speakMs: 120_000,
      coaching: PART2,
      script: script(
        'I think I would take them to the old market, actually. Basically it is near my house. I think it is very interesting because there are a lot of things.',
        'I would take them to the old market, ten minutes on foot from my street. We would walk the stall row, then sit by the river. I would take them there because it is how the neighbourhood still feeds itself — not a museum, a morning.',
        'The cue asked for where, how, what, and why. Fillers ate the why.',
      ),
    },
    part3: [
      {
        id: 'hometown-p3-1',
        part: 3,
        prompt: 'Why do some people stay in the same town for their whole life?',
        targetMs: 50_000,
        coaching: PART3,
        script: script(
          'I think it is because family is there, actually. Basically it is more comfortable.',
          'Family is the usual reason — work, school, and care sit in the same streets. Comfort is real, but it is also cheaper than starting again.',
          'Comfort is vague. Name the cost of leaving.',
        ),
      },
      {
        id: 'hometown-p3-2',
        part: 3,
        prompt: 'Do cities lose their character when they grow quickly?',
        targetMs: 55_000,
        coaching: PART3,
        script: script(
          'I think yes, actually. Basically new buildings look the same. I think it is not good.',
          'Yes, if growth replaces the street pattern. Towers can sit next to a market and still keep the market. The loss is when the ground floor becomes a chain and nobody knows the owner.',
          '“Not good” is a shrug. Name what disappears.',
        ),
      },
    ],
    challengePart3: [
      {
        id: 'hometown-c3-1',
        part: 3,
        prompt: 'Should local governments limit how many short-term rentals a street can hold?',
        targetMs: 60_000,
        coaching: PART3,
        script: script(
          'I think maybe yes, actually. Basically tourists make it noisy.',
          'Yes — a cap keeps the street residential. Noise is one effect; the sharper one is that workers cannot rent near the jobs the tourists use.',
          'Noise is the easy answer. Housing is the argument.',
        ),
      },
      {
        id: 'hometown-c3-2',
        part: 3,
        prompt: 'Who should decide what a neighbourhood looks like — residents, or the people who pay for the buildings?',
        targetMs: 65_000,
        coaching: PART3,
        script: script(
          'I think both, actually. Basically it is complicated.',
          'Residents should set the rules for height and use. Money can choose the architect inside those rules. If the payer decides the use, the neighbourhood is a product, not a place.',
          '“Both / complicated” is a stall. Pick a rule, then a limit.',
        ),
      },
    ],
  },
  {
    id: 'work',
    title: 'How the week actually goes',
    theme: 'Work',
    minutes: 11,
    intro:
      'Part 1 on work or study, a Part 2 cue about a skill you had to learn, then Part 3 on training and remote work.',
    part1: [
      {
        id: 'work-p1-1',
        part: 1,
        prompt: 'Do you work or are you a student?',
        targetMs: 30_000,
        coaching: FILLERS,
        script: script(
          'I think I work, actually. Basically in an office.',
          'I work in an office. I handle bookings for a small logistics firm.',
          '“An office” is a building. Name the job.',
        ),
      },
      {
        id: 'work-p1-2',
        part: 1,
        prompt: 'What is the first thing you do when you start the day?',
        targetMs: 35_000,
        coaching: FILLERS,
        script: script(
          'I think I check my phone, actually. Basically emails.',
          'I read the overnight messages, then I write the three things that have to move that morning.',
          'Checking a phone is not a task. Name the first piece of work.',
        ),
      },
      {
        id: 'work-p1-3',
        part: 1,
        prompt: 'Is your workplace quiet, or is there a lot of noise?',
        targetMs: 35_000,
        coaching: FILLERS,
        script: script(
          'I think it is noisy, actually. Basically people talk a lot.',
          'It is noisy between ten and twelve — desks share a room, and the warehouse radio carries through the wall.',
          '“People talk” is true of every office. Give the hours and the source.',
        ),
      },
    ],
    part2: {
      id: 'work-p2',
      part: 2,
      title: 'Describe a skill you learned for work or study.',
      bullets: [
        'What the skill is',
        'How you learned it',
        'How you use it now',
        'And explain whether it was worth the time',
      ],
      prepMs: 60_000,
      speakMs: 120_000,
      coaching: PART2,
      script: script(
        'I think I learned Excel, actually. Basically my manager told me. I think it is very useful.',
        'I learned to build a weekly stock sheet in Excel. A colleague sat with me for three Friday afternoons. I still use it to see what will run out before the weekend. It was worth the time because I stopped guessing from memory.',
        '“Very useful” skips the last bullet. Say whether the hours paid back.',
      ),
    },
    part3: [
      {
        id: 'work-p3-1',
        part: 3,
        prompt: 'Should employers pay for training, or should workers pay for their own skills?',
        targetMs: 55_000,
        coaching: PART3,
        script: script(
          'I think the company should pay, actually. Basically it is their job.',
          'The employer should pay when the skill is for that role. Workers can pay for a career they might take elsewhere. If the firm wants the spreadsheet tomorrow, the firm buys the course.',
          '“Their job” is a slogan. Split role-specific from portable.',
        ),
      },
      {
        id: 'work-p3-2',
        part: 3,
        prompt: 'Is working from home changing the places people choose to live?',
        targetMs: 50_000,
        coaching: PART3,
        script: script(
          'I think yes, actually. Basically they can live anywhere.',
          'Yes, for people whose work is a laptop. They move toward cheaper rent or family, not toward the office. It does not move a warehouse shift.',
          '“Anywhere” is too wide. Name who can move, and who cannot.',
        ),
      },
    ],
    challengePart3: [
      {
        id: 'work-c3-1',
        part: 3,
        prompt: 'If a machine can do a task cheaper, does a company still have a duty to keep the person who used to do it?',
        targetMs: 65_000,
        coaching: PART3,
        script: script(
          'I think it is difficult, actually. Basically both sides.',
          'The duty is to retrain before the cut, not to freeze the task forever. A company that pockets the saving and leaves the person has treated labour as a cost, not a contract.',
          '“Both sides” is not a view. Name the duty, then the limit.',
        ),
      },
      {
        id: 'work-c3-2',
        part: 3,
        prompt: 'Should professional qualifications expire unless people retrain?',
        targetMs: 60_000,
        coaching: PART3,
        script: script(
          'I think maybe, actually. Basically things change.',
          'Yes in fields where a mistake harms someone — medicine, wiring, aircraft. A history teacher does not need the same clock. Expiry only where the knowledge goes stale in a way that injures.',
          '“Things change” is filler. Split dangerous work from the rest.',
        ),
      },
    ],
  },
  {
    id: 'travel',
    title: 'A journey that stuck',
    theme: 'Travel',
    minutes: 11,
    intro:
      'Part 1 on how you travel, a Part 2 cue about a trip you still talk about, then Part 3 on tourism and movement.',
    part1: [
      {
        id: 'travel-p1-1',
        part: 1,
        prompt: 'Do you like travelling?',
        targetMs: 30_000,
        coaching: FILLERS,
        script: script(
          'I think yes, actually. Basically I like new places.',
          'Yes. I like slow trips more than airports — a night train, then a town I can walk.',
          '“New places” is a poster. Name the kind of trip.',
        ),
      },
      {
        id: 'travel-p1-2',
        part: 1,
        prompt: 'When did you last go somewhere new?',
        targetMs: 35_000,
        coaching: FILLERS,
        script: script(
          'I think last year, actually. Basically to the coast.',
          'Last October. I took a bus to the coast for three days.',
          'Give the month and the how. “The coast” is a direction, not a trip.',
        ),
      },
      {
        id: 'travel-p1-3',
        part: 1,
        prompt: 'Do you prefer travelling by train or by plane?',
        targetMs: 40_000,
        coaching: FILLERS,
        script: script(
          'I think train is better, actually. Basically I can see things.',
          'Train, when the distance allows it. I can read, and I arrive in the middle of the city. A plane wins only when the trip would eat two days on the rails.',
          '“See things” is thin. Compare time and where you land.',
        ),
      },
    ],
    part2: {
      id: 'travel-p2',
      part: 2,
      title: 'Describe a memorable trip you have taken.',
      bullets: [
        'Where you went',
        'Who you went with',
        'What you did',
        'And explain why it has stayed with you',
      ],
      prepMs: 60_000,
      speakMs: 120_000,
      coaching: PART2,
      script: script(
        'I think I went to the mountains, actually. Basically with my family. I think it was very good because we had fun.',
        'I went to Ridgeway in late spring with my sister. We walked the ridge path and missed the last bus, so we ate at a stall until the next one. It has stayed with me because we stopped performing the holiday and just waited.',
        '“Had fun” is not a reason it stayed. Name the moment.',
      ),
    },
    part3: [
      {
        id: 'travel-p3-1',
        part: 3,
        prompt: 'Why do people travel for work more than they used to?',
        targetMs: 50_000,
        coaching: PART3,
        script: script(
          'I think because of globalisation, actually. Basically companies are international.',
          'Firms run across cities now, and a meeting still often means a body in a room. Video cut some of it; it did not cut the work that needs a warehouse walk or a handshake.',
          '“Globalisation” is a headline. Name the leftover reason for the trip.',
        ),
      },
      {
        id: 'travel-p3-2',
        part: 3,
        prompt: 'Does tourism help small towns, or does it hollow them out?',
        targetMs: 55_000,
        coaching: PART3,
        script: script(
          'I think both, actually. Basically it depends.',
          'It helps if visitors buy what the town already makes. It hollows the place when every shop becomes a souvenir and rents push out the people who ran the bakery.',
          '“It depends” is a pause. Give the if.',
        ),
      },
    ],
    challengePart3: [
      {
        id: 'travel-c3-1',
        part: 3,
        prompt: 'Should cheap flights be taxed until people choose slower travel?',
        targetMs: 60_000,
        coaching: PART3,
        script: script(
          'I think maybe yes, actually. Basically for the environment.',
          'A tax on short hops can push people onto trains where the rails exist. It should not punish someone whose family is an ocean away. Tax the convenience flight, not the one with no alternative.',
          '“For the environment” is a banner. Split the hop you can replace from the one you cannot.',
        ),
      },
      {
        id: 'travel-c3-2',
        part: 3,
        prompt: 'Who owns a view — the people who live under it, or the people who pay to see it for a weekend?',
        targetMs: 65_000,
        coaching: PART3,
        script: script(
          'I think the local people, actually. Basically it is their home.',
          'The people who live there. A weekend ticket is access, not ownership. If the view becomes a product, the residents become staff in their own street.',
          '“Their home” is true and thin. Contrast access with ownership.',
        ),
      },
    ],
  },
  {
    id: 'screens',
    title: 'When everything is on a screen',
    theme: 'Technology',
    minutes: 12,
    intro:
      'Part 1 on devices, a Part 2 cue about using technology to solve a problem, then Part 3 on attention, teaching, and data.',
    part1: [
      {
        id: 'screens-p1-1',
        part: 1,
        prompt: 'How much time do you spend on a phone in a normal day?',
        targetMs: 35_000,
        coaching: FILLERS,
        script: script(
          'I think a lot, actually. Basically I don’t count.',
          'More than I like to admit — probably three hours, mostly messages and the news list. I do not count the minutes until the battery drops.',
          '“A lot” is not an answer. Give a number, even a rough one.',
        ),
      },
      {
        id: 'screens-p1-2',
        part: 1,
        prompt: 'Do you read the news on a screen or on paper?',
        targetMs: 30_000,
        coaching: FILLERS,
        script: script(
          'I think on my phone, actually. Basically it is easier.',
          'On my phone, in the morning. Paper is a weekend thing if I find a copy.',
          '“Easier” is empty. Say when, and whether paper still happens.',
        ),
      },
      {
        id: 'screens-p1-3',
        part: 1,
        prompt: 'Can you spend an evening without looking at a screen?',
        targetMs: 35_000,
        coaching: FILLERS,
        script: script(
          'I think it is difficult, actually. Basically I get bored.',
          'I can, if someone else is in the room. Alone, I pick the phone up without deciding to.',
          'Boredom is the symptom. Say the condition that makes you put it down.',
        ),
      },
    ],
    part2: {
      id: 'screens-p2',
      part: 2,
      title: 'Describe a time you used technology to solve a problem.',
      bullets: [
        'What the problem was',
        'What you used',
        'How it helped',
        'And explain what you would do if the device had failed',
      ],
      prepMs: 60_000,
      speakMs: 120_000,
      coaching: PART2,
      script: script(
        'I think my train was cancelled, actually. Basically I used an app. I think it was very helpful.',
        'My last train was cancelled. I used the operator’s app to find a bus that still ran, and I messaged the person waiting. If the phone had died I would have gone to the desk — the app is a shortcut, not the only map.',
        'The last bullet asks what you would do without the device. “Helpful” skips it.',
      ),
    },
    part3: [
      {
        id: 'screens-p3-1',
        part: 3,
        prompt: 'Do people pay less attention in conversation because of phones?',
        targetMs: 50_000,
        coaching: PART3,
        script: script(
          'I think yes, actually. Basically they check messages.',
          'Yes, when the phone sits on the table. Even a dark screen is a door out of the room. Attention splits before anyone picks it up.',
          'Checking messages is the obvious move. The object on the table is the habit.',
        ),
      },
      {
        id: 'screens-p3-2',
        part: 3,
        prompt: 'Should schools teach children how to use AI tools, or how to work without them?',
        targetMs: 55_000,
        coaching: PART3,
        script: script(
          'I think both, actually. Basically they need skills.',
          'Teach the tool after they can do the task without it. If they never write a paragraph alone, they cannot tell when the tool is wrong.',
          '“Both / skills” is a stall. Sequence the two.',
        ),
      },
    ],
    challengePart3: [
      {
        id: 'screens-c3-1',
        part: 3,
        prompt: 'Will AI replace teachers, or only the parts of teaching that were already mechanical?',
        targetMs: 65_000,
        coaching: PART3,
        script: script(
          'I think it will replace some parts, actually. Basically not the human part.',
          'It will take the drill — marking a gap-fill, pacing a quiz. It will not sit with a student who has stopped trying. If a school calls that sitting “inefficient”, it has already decided to replace the teacher.',
          '“The human part” is a fog. Name the work that is not a drill.',
        ),
      },
      {
        id: 'screens-c3-2',
        part: 3,
        prompt: 'Who should own the data from a camera on a public street — the city, the company that fitted it, or the people walking past?',
        targetMs: 70_000,
        coaching: PART3,
        script: script(
          'I think the city, actually. Basically it is public.',
          'The city, under a rule the walkers can read: how long the file lives, who can ask for it, and when it is deleted. The company is a contractor. The people walking past are not a dataset they volunteered.',
          '“It is public” cuts the walkers out. Public space is not the same as public property in a file.',
        ),
      },
    ],
  },
];
