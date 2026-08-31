import type { WritingTask } from '@/types';

const T1_INSTRUCTION =
  'You should spend about 20 minutes on this task. Write at least 150 words.';
const T2_INSTRUCTION =
  'You should spend about 40 minutes on this task. Write at least 250 words. Give reasons for your answer and include any relevant examples from your own knowledge or experience.';

/** Original prompts — not Cambridge. Academic charts + GT letters + Task 2 types. */
export const mockWritingTasks: WritingTask[] = [
  {
    id: 't1-line',
    title: 'Cycle trips in two cities',
    kind: 'task1',
    testType: 'academic',
    minutes: 20,
    minWords: 150,
    chart: 'lineGraph',
    recommended: true,
    instruction: T1_INSTRUCTION,
    prompt:
      'The graph shows the number of cycle trips (thousands) in Harbour and Ridgeway between 2016 and 2022. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    visual: {
      kind: 'line',
      title: 'Cycle trips (thousands)',
      xLabels: ['2016', '2018', '2020', '2022'],
      series: [
        { label: 'Harbour', points: [12, 18, 21, 34] },
        { label: 'Ridgeway', points: [20, 19, 17, 16] },
      ],
    },
    ocrSample:
      'The graph compares cycle trips in Harbour and Ridgeway from 2016 to 2022. Harbour rose steadily from 12 thousand to 34 thousand, with the steepest gain after 2020. Ridgeway started higher at 20 thousand but fell slowly to 16 thousand. By 2022 Harbour had overtaken Ridgeway. Overall, cycling grew in the coastal city and declined inland.',
  },
  {
    id: 't1-bar',
    title: 'Library visits by age',
    kind: 'task1',
    testType: 'academic',
    minutes: 20,
    minWords: 150,
    chart: 'barChart',
    instruction: T1_INSTRUCTION,
    prompt:
      'The chart shows average library visits per year by age group in one city. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    visual: {
      kind: 'bar',
      title: 'Visits per year',
      items: [
        { label: '12–17', value: 14 },
        { label: '18–24', value: 6 },
        { label: '25–44', value: 8 },
        { label: '45–64', value: 11 },
        { label: '65+', value: 16 },
      ],
    },
    ocrSample:
      'The bar chart shows yearly library visits by age. The oldest group visits most, at 16 times a year, followed by 12–17 at 14. Adults aged 18–24 visit least, only 6 times. The 45–64 group sits in the middle at 11. Overall, the library is used most by teenagers and retirees, not by young adults.',
  },
  {
    id: 't1-pie',
    title: 'Household water use',
    kind: 'task1',
    testType: 'academic',
    minutes: 20,
    minWords: 150,
    chart: 'pieChart',
    instruction: T1_INSTRUCTION,
    prompt:
      'The chart shows how a typical household used water in 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    visual: {
      kind: 'pie',
      title: 'Share of household water',
      slices: [
        { label: 'Bathroom', percent: 42 },
        { label: 'Kitchen', percent: 21 },
        { label: 'Laundry', percent: 19 },
        { label: 'Garden', percent: 12 },
        { label: 'Other', percent: 6 },
      ],
    },
    ocrSample:
      'The pie chart divides household water in 2023. The bathroom takes the largest share at 42 percent. The kitchen and laundry are close, at 21 and 19 percent. The garden uses 12 percent, and other uses 6 percent. Together, indoor washing accounts for most of the water; outdoor use is a small slice.',
  },
  {
    id: 't1-table',
    title: 'Train punctuality',
    kind: 'task1',
    testType: 'academic',
    minutes: 20,
    minWords: 150,
    chart: 'table',
    instruction: T1_INSTRUCTION,
    prompt:
      'The table shows the percentage of on-time arrivals for four rail lines in 2019 and 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    visual: {
      kind: 'table',
      title: 'On-time arrivals (%)',
      headers: ['Line', '2019', '2023'],
      rows: [
        ['North', '81', '88'],
        ['Coast', '76', '74'],
        ['Central', '90', '91'],
        ['Valley', '68', '79'],
      ],
    },
    ocrSample:
      'The table compares on-time arrivals on four lines. Central stayed the most punctual, moving only from 90 to 91 percent. North and Valley improved, Valley by 11 points. The Coast line fell slightly from 76 to 74 percent and was the only decline. Overall, punctuality rose on three lines and slipped on one.',
  },
  {
    id: 't1-process',
    title: 'Making recycled paper',
    kind: 'task1',
    testType: 'academic',
    minutes: 20,
    minWords: 150,
    chart: 'process',
    instruction: T1_INSTRUCTION,
    prompt:
      'The diagram shows how used office paper is turned into new sheets. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    visual: {
      kind: 'process',
      title: 'From bin to sheet',
      steps: ['Collect', 'Sort & soak', 'Pulp', 'Press', 'Dry', 'Cut'],
    },
    ocrSample:
      'The diagram shows six stages from used paper to new sheets. Paper is collected, then sorted and soaked. It is pulped, pressed to remove water, dried, and finally cut. The process is linear: each stage depends on the one before it, and there is no loop back to collection.',
  },
  {
    id: 't1-map',
    title: 'Campus bike store',
    kind: 'task1',
    testType: 'academic',
    minutes: 20,
    minWords: 150,
    chart: 'map',
    instruction: T1_INSTRUCTION,
    prompt:
      'The maps show a college campus in 2015 and the same campus after a bike store was added. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    visual: {
      kind: 'map',
      title: 'Campus after the store',
      pins: [
        { letter: 'A', label: 'Library' },
        { letter: 'B', label: 'Bike store (new)' },
        { letter: 'C', label: 'Car park (reduced)' },
        { letter: 'D', label: 'Gate' },
      ],
    },
    ocrSample:
      'The maps compare the campus before and after a bike store. In 2015 the area east of the library was car park. After the change, a bike store sits there and the car park is smaller. The gate and library do not move. The plan trades parking for cycle storage next to the main building.',
  },
  {
    id: 't1-mixed',
    title: 'Energy and cost',
    kind: 'task1',
    testType: 'academic',
    minutes: 20,
    minWords: 150,
    chart: 'mixed',
    instruction: T1_INSTRUCTION,
    prompt:
      'The chart shows electricity generated (TWh) from four sources in one country, and a note gives the average unit cost. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    visual: {
      kind: 'mixed',
      title: 'Generation (TWh)',
      bars: [
        { label: 'Gas', value: 48 },
        { label: 'Wind', value: 22 },
        { label: 'Solar', value: 11 },
        { label: 'Coal', value: 9 },
      ],
      note: 'Average unit cost: gas 7, wind 5, solar 6, coal 11 (index).',
    },
    ocrSample:
      'The chart shows generation and a cost index. Gas produces the most electricity at 48 TWh, then wind at 22, solar at 11, and coal at 9. Coal is the most expensive per unit; wind is the cheapest. Gas dominates output even though it is not the cheapest. Coal is both small and dear.',
  },
  {
    id: 't1-formal',
    title: 'Complaint to the council',
    kind: 'task1',
    testType: 'general',
    minutes: 20,
    minWords: 150,
    letterTone: 'formal',
    instruction: T1_INSTRUCTION,
    prompt:
      'The street light outside your house has been broken for three weeks. Write a letter to the local council. In your letter: say when the light stopped working, explain the problems this has caused, and say what you would like the council to do.',
    ocrSample:
      'Dear Sir or Madam, I am writing about the street light outside 14 Quay Lane, which failed on 2 March and has not been repaired. The pavement is dark, and two neighbours have already tripped. I would like the light replaced this week and a note of when an engineer will come. Yours faithfully, A. Rahman',
  },
  {
    id: 't1-semi',
    title: 'Note to a landlord',
    kind: 'task1',
    testType: 'general',
    minutes: 20,
    minWords: 150,
    letterTone: 'semiFormal',
    instruction: T1_INSTRUCTION,
    prompt:
      'You are renting a flat. You need to leave a week earlier than the contract end date. Write a letter to your landlord. In your letter: explain why you must leave early, say what you have already done about the flat, and ask what you should do about the rent.',
    ocrSample:
      'Dear Mr Cole, I need to leave the flat on 21 June, a week before the contract ends, because my new job in Leeds starts on the 22nd. I have cleaned the rooms and found a colleague who can view it on Saturday. Could you tell me whether I still pay the last week of rent, and where to leave the keys? Kind regards, Samira',
  },
  {
    id: 't1-informal',
    title: 'Invite a friend',
    kind: 'task1',
    testType: 'general',
    minutes: 20,
    minWords: 150,
    letterTone: 'informal',
    instruction: T1_INSTRUCTION,
    prompt:
      'You are moving to a new city for work. Write a letter to a friend who lives there. In your letter: tell your friend about the job, ask about neighbourhoods to live in, and suggest a time to meet.',
    ocrSample:
      'Hi Maya, I got the archive job in town and I start in September. I do not know the neighbourhoods yet — is Harbour still noisy at night, or should I look at Ridgeway? I will be there on the 3rd. Want to eat at the place by the quay that weekend? Write back when you can. Love, Jo',
  },
  {
    id: 't2-opinion',
    title: 'Public libraries',
    kind: 'task2',
    testType: 'academic',
    minutes: 40,
    minWords: 250,
    essayType: 'opinion',
    recommended: true,
    instruction: T2_INSTRUCTION,
    prompt:
      'Some people say public libraries are no longer necessary because information is available online. Others say libraries still matter. Discuss both views and give your own opinion.',
    ocrSample:
      'Some people argue that libraries are finished because a phone can fetch any fact. Others say a library is still a room with quiet, help, and books that are not behind a paywall. I agree they still matter. Search is fast, but it is not the same as a trained person and a place that does not ask you to buy a coffee to sit down. Cities that keep libraries keep a public good, not a nostalgic shop. Online tools should sit inside that room, not replace it.',
  },
  {
    id: 't2-discussion',
    title: 'Working from home',
    kind: 'task2',
    testType: 'academic',
    minutes: 40,
    minWords: 250,
    essayType: 'discussion',
    instruction: T2_INSTRUCTION,
    prompt:
      'More companies are asking staff to work from home. What are the advantages and disadvantages of this for workers and for companies?',
    ocrSample:
      'Working from home saves a commute and can help people with care duties. Companies spend less on desks. The other side is isolation, weaker training for juniors, and a home that is not always a workplace. Firms also find it harder to spot who is struggling. A mixed week is more honest than a total shift: two office days for the work that needs a room, and the rest at home.',
  },
  {
    id: 't2-advantages',
    title: 'Tourism in small towns',
    kind: 'task2',
    testType: 'academic',
    minutes: 40,
    minWords: 250,
    essayType: 'advantages',
    instruction: T2_INSTRUCTION,
    prompt:
      'Tourism is growing in many small towns. Do the advantages of this development outweigh the disadvantages?',
    ocrSample:
      'Tourism brings money and some jobs to small towns, and it can keep a high street open. It also raises rents, clogs lanes, and turns houses into short lets. I think the disadvantages outweigh the advantages unless the town caps beds and spends the tax on residents first. Visitors should not be the only plan the place has.',
  },
  {
    id: 't2-problem',
    title: 'Food waste',
    kind: 'task2',
    testType: 'academic',
    minutes: 40,
    minWords: 250,
    essayType: 'problemSolution',
    instruction: T2_INSTRUCTION,
    prompt:
      'A large amount of food is wasted by shops and households. Why is this happening, and what can be done to reduce it?',
    ocrSample:
      'Food is wasted because shops overstock to look full, and households buy for a perfect week they do not live. Date labels confuse people, so good food is thrown away. Solutions are dull and they work: sell misshapen produce, teach the difference between “best before” and “use by”, and make it easy to freeze leftovers. Fines for bins full of bread will not teach a habit. Clearer labels will.',
  },
  {
    id: 't2-two-part',
    title: 'Young people and news',
    kind: 'task2',
    testType: 'academic',
    minutes: 40,
    minWords: 250,
    essayType: 'twoPart',
    instruction: T2_INSTRUCTION,
    prompt:
      'Many young people get their news from social media rather than newspapers or television. Why is this the case? Is this a positive or a negative development?',
    ocrSample:
      'Young people use social media for news because it is already open on the phone, and because a feed feels faster than a bulletin. That is convenient, and it can surface voices a nightly programme would skip. It is still a negative development if the feed is the only source: there is no editor, and outrage travels better than a correction. Schools should teach how to check a claim, not ban the app.',
  },
  {
    id: 't2-agree',
    title: 'University subjects',
    kind: 'task2',
    testType: 'academic',
    minutes: 40,
    minWords: 250,
    essayType: 'agreeDisagree',
    instruction: T2_INSTRUCTION,
    prompt:
      'Some people believe that university students should only study subjects that will be useful in a future career. To what extent do you agree or disagree?',
    ocrSample:
      'I disagree that university should only teach what a job advert names. Career subjects matter, and many students need them. A narrow degree, though, leaves people unable to change field when the job disappears. History and languages are not ornaments; they train judgement. A mix — a professional core plus room for a subject chosen for interest — is more honest than pretending every module is a salary.',
  },
];
