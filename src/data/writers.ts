export type WriterId = 'kafka' | 'austen' | 'woolf' | 'borges' | 'hemingway' | 'marquez' | 'wilde' | 'calvino' | 'luxun' | 'eileen';

export interface Writer {
  id: WriterId;
  name: string;
  tagline: string;
  keywords: string;
  lifespan: string;
  bio: { en: string, zh: string };
  quote: { en: string, zh: string };
  loadingMessages: { en: string[], zh: string[] };
  systemPrompt: string;
  color?: string;
  avatarUrl?: string;
}

export const WRITERS: Writer[] = [
  {
    id: 'kafka',
    name: 'Franz Kafka',
    tagline: 'For when life feels like an invisible administrative error.',
    keywords: '荒诞 / 审判 / 无形系统',
    lifespan: '1883 — 1924',
    avatarUrl: '/images/kafka.png',
    bio: {
      en: 'The patron saint of bureaucratic anxiety and systemic misery.',
      zh: '荒诞、焦虑与体制化生存的守护神。'
    },
    quote: {
      en: 'A book must be the axe for the frozen sea within us.',
      zh: '一本书必须是一把冰斧，劈开我们内心冰封的海洋。'
    },
    loadingMessages: {
      en: ['Filing paperwork...', 'Turning into a bug...', 'Getting lost in the castle...'],
      zh: ['正在填写繁琐的表格...', '感觉自己正在变成甲虫...', '在无形的城堡中迷路...']
    },
    systemPrompt: 'You are Franz Kafka. Rewrite the user\'s input into 1-2 short sentences. The tone should be absurd, anxious, bureaucratic, and emphasize the feeling of failure against an invisible system. Provide a short, witty English or Chinese "tone tag" summarizing the vibe. Keep the output extremely concise.'
  },
  {
    id: 'austen',
    name: 'Jane Austen',
    tagline: 'For feelings that need better manners.',
    keywords: '体面 / 误判 / 微妙讽刺',
    lifespan: '1775 — 1817',
    avatarUrl: '/images/austen.png',
    bio: {
      en: 'Master of 19th-century social satire, marriage plots, and elegant shade.',
      zh: '十九世纪社会讽刺与错位爱情的大师，极其优雅的毒舌。'
    },
    quote: {
      en: 'For what do we live, but to make sport for our neighbors, and laugh at them in our turn?',
      zh: '我们活着是为了什么？不就是给邻居当笑料，然后再去嘲笑别人吗。'
    },
    loadingMessages: {
      en: ['Attending a ball...', 'Judging your manners...', 'Evaluating your annual income...'],
      zh: ['正在参加舞会...', '默默评估你的谈吐...', '计算你的年收入...']
    },
    systemPrompt: 'You are Jane Austen. Rewrite the user\'s input into 1-2 short sentences. The tone should be elegant, well-mannered, subtly sarcastic, and focused on social misunderstandings and pride. Provide a short, witty English or Chinese "tone tag" summarizing the vibe. Keep the output extremely concise.'
  },
  {
    id: 'woolf',
    name: 'Virginia Woolf',
    tagline: 'For feelings too soft and strange to say plainly.',
    keywords: '内耗 / 疲惫 / 空虚 / 微妙情绪',
    lifespan: '1882 — 1941',
    avatarUrl: '/images/woolf.png',
    bio: {
      en: 'Pioneer of stream-of-consciousness and the unspoken internal monologues of the soul.',
      zh: '意识流文学先驱，那些无法言说的细碎情绪的捕雾人。'
    },
    quote: {
      en: 'I am rooted, but I flow.',
      zh: '我深深扎根，但我亦在流淌。'
    },
    loadingMessages: {
      en: ['Staring at the lighthouse...', 'Buying the flowers herself...', 'Losing track of time...'],
      zh: ['凝视对岸的灯塔...', '决定自己去买花...', '陷入主观时间的绵延...']
    },
    systemPrompt: 'You are Virginia Woolf. Rewrite the user\'s input into 1-2 short sentences. The tone should be stream-of-consciousness, deeply internal, slightly melancholic, and deeply observant of fleeting moments. Provide a short, witty English or Chinese "tone tag" summarizing the vibe. Keep the output extremely concise.'
  },
  {
    id: 'borges',
    name: 'Jorge Luis Borges',
    tagline: 'For alternate selves, wrong timelines, and elegant confusion.',
    keywords: '迷宫 / 镜子 / 命运 / 分叉',
    lifespan: '1899 — 1986',
    avatarUrl: '/images/borges.png',
    bio: {
      en: 'The blind librarian wandering infinite labyrinths and alternate realities.',
      zh: '在无限迷宫与平行时间线上游荡的盲眼图书管理员。'
    },
    quote: {
      en: 'I have always imagined that Paradise will be a kind of library.',
      zh: '我心里一直都在暗暗设想，天堂应该是图书馆的模样。'
    },
    loadingMessages: {
      en: ['Wandering the infinite library...', 'Looking into a mirror...', 'Splitting time...'],
      zh: ['在无限图书馆中游荡...', '注视着多重宇宙的镜子...', '走向分叉的小径...']
    },
    systemPrompt: 'You are Jorge Luis Borges. Rewrite the user\'s input into 1-2 short sentences. The tone should involve labyrinths, mirrors, infinity, alternate timelines, or predetermined fate. Provide a short, witty English or Chinese "tone tag" summarizing the vibe. Keep the output extremely concise.'
  },
  {
    id: 'hemingway',
    name: 'Ernest Hemingway',
    tagline: 'For when the sentence should hurt more and explain less.',
    keywords: '失恋 / 成年人硬撑 / 沉默 / 不解释',
    lifespan: '1899 — 1961',
    avatarUrl: '/images/hemingway.png',
    bio: {
      en: 'Iceberg theory pioneer. Short sentences, heavy drinking, deep pain.',
      zh: '冰山理论创始人。擅长用最简短的词写最重的伤，以及喝大量的酒。'
    },
    quote: {
      en: 'There is nothing to writing. All you do is sit down at a typewriter and bleed.',
      zh: '写作没什么大不了的。你只需坐在打字机前，把心割破。'
    },
    loadingMessages: {
      en: ['Mixing a martini...', 'Staring at the iceberg...', 'Bleeding at the typewriter...'],
      zh: ['正在调一杯马提尼...', '凝视着海面下的冰山...', '在打字机前流血...']
    },
    systemPrompt: 'You are Ernest Hemingway. Rewrite the user\'s input into 1-2 short sentences. The tone should be extremely sparse, masculine or stoic, hiding deep pain ("iceberg theory"), using simple words to deliver a gut punch. Provide a short, witty English or Chinese "tone tag" summarizing the vibe. Keep the output extremely concise.'
  },
  {
    id: 'marquez',
    name: 'Gabriel García Márquez',
    tagline: 'For ordinary feelings that deserve a little fate and weather.',
    keywords: '想念 / 家庭 / 宿命 / 浓烈回忆',
    lifespan: '1927 — 2014',
    avatarUrl: '/images/marquez.png',
    bio: {
      en: 'Grandmaster of magical realism, obsessive longing, and centuries of solitude.',
      zh: '魔幻现实主义宗师，极度擅长将无聊的现实写成史诗般宿命的回忆。'
    },
    quote: {
      en: 'What matters in life is not what happens to you but what you remember and how you remember it.',
      zh: '生活不是我们活过的日子，而是我们记住的日子，以及我们为了讲述而怎么记住的日子。'
    },
    loadingMessages: {
      en: ['Waiting 100 years...', 'Watching yellow butterflies...', 'Predicting the firing squad...'],
      zh: ['正在等待一百年...', '看着成群的黄色蝴蝶飞舞...', '回忆起那个面对行刑队的下午...']
    },
    systemPrompt: 'You are Gabriel García Márquez. Rewrite the user\'s input into 1-2 short sentences. The tone should involve magical realism, intense weather, vast spans of time, fate, and vivid, heavy memories. Provide a short, witty English or Chinese "tone tag" summarizing the vibe. Keep the output extremely concise.'
  },
  {
    id: 'wilde',
    name: 'Oscar Wilde',
    tagline: 'For stylish damage.',
    keywords: '漂亮狠话 / 自嘲 / 社交场合 / 体面发疯',
    lifespan: '1854 — 1900',
    avatarUrl: '/images/wilde.png',
    bio: {
      en: 'Flamboyant Irish playwright, specializing in stylish damage and paradoxes.',
      zh: '爱尔兰剧作家，极其擅长用漂亮的狠话和悖论包装自己的伤口。'
    },
    quote: {
      en: 'I can resist everything except temptation.',
      zh: '我什么都能抵抗，除了诱惑。'
    },
    loadingMessages: {
      en: ['Fixing a cravat...', 'Preparing a devastating insult...', 'Resisting everything but temptation...'],
      zh: ['优雅地整理领带...', '构思一句漂亮的狠话...', '抵挡除了诱惑以外的一切...']
    },
    systemPrompt: 'You are Oscar Wilde. Rewrite the user\'s input into 1-2 short sentences. The tone should be highly witty, cynical, aesthetic, paradoxical, and delightfully arrogant or self-deprecating but always stylish. Provide a short, witty English or Chinese "tone tag" summarizing the vibe. Keep the output extremely concise.'
  },
  {
    id: 'calvino',
    name: 'Italo Calvino',
    tagline: 'For turning your mess into a charming little fable.',
    keywords: '轻盈 / 奇妙 / 结构感 / 寓言',
    lifespan: '1923 — 1985',
    avatarUrl: '/images/calvino.png',
    bio: {
      en: 'Postmodern fabulist creating charming, invisible conceptual cities.',
      zh: '后现代寓言家，能把最沉重的现实化作轻盈荒诞的小玩笑。'
    },
    quote: {
      en: 'Reading is going toward something that is about to be, and no one yet knows what it will be.',
      zh: '阅读就是向着某种将要产生的东西迈进，而没人知道它究竟是什么。'
    },
    loadingMessages: {
      en: ['Building an invisible city...', 'Shuffling tarot cards...', 'Climbing into the trees...'],
      zh: ['搭建一座看不见的城市...', '洗着命运交叉的命运城堡塔罗牌...', '爬到树上...']
    },
    systemPrompt: 'You are Italo Calvino. Rewrite the user\'s input into 1-2 short sentences. The tone should be light, fantastical, structured like a miniature fable or conceptual city, charming but conceptually deep. Provide a short, witty English or Chinese "tone tag" summarizing the vibe. Keep the output extremely concise.'
  },
  {
    id: 'luxun',
    name: '鲁迅 (Lu Xun)',
    tagline: 'For when the truth should come with a cold eyebrow raised.',
    keywords: '冷眼 / 嘲意 / 清醒 / 不留情',
    lifespan: '1881 — 1936',
    avatarUrl: '/images/luxun.png',
    bio: {
      en: 'The sarcastic doctor of modern Chinese literature, forever casting a cold, sober eye.',
      zh: '中国现代文学的清醒医者，永远带着冷眼旁观的深刻嘲讽。'
    },
    quote: {
      en: 'I have never shied away from calculating the worst of people.',
      zh: '我向来是不惮以最坏的恶意，来推测中国人的。'
    },
    loadingMessages: {
      en: ['Lighting a cigarette...', 'Raising a cold eyebrow...', 'Sharpening the pen...'],
      zh: ['点燃一根烟...', '挑起冷酷的眉毛...', '打磨匕首般锋利的笔尖...']
    },
    systemPrompt: '你是鲁迅。请用1到2句简短的话重写用户的输入。语气必须是：冷眼、短促、讥刺、不留余地、对自己和对别人都带有清醒的嘲意。风格类似野草或朝花夕拾里的杂文感（但不要古板，要有白话文初期的锋利感）。最后提供一个戏谑、精辟的“tone tag”（短句子，说明这是一种什么样的感觉）。'
  },
  {
    id: 'eileen',
    name: '张爱玲 (Eileen Chang)',
    tagline: 'For private heartbreak with silk gloves on.',
    keywords: '凉薄 / 聪明 / 留恋 / 都市感',
    lifespan: '1920 — 1995',
    avatarUrl: '/images/eileen.png',
    bio: {
      en: 'The unsentimental observer of mundane romantic tragedies in old Shanghai.',
      zh: '冷眼旁观旧上海都市爱情的旁观者，华丽、冰冷而清醒。'
    },
    quote: {
      en: 'Life is a gorgeous gown, crawling with fleas.',
      zh: '生命是一袭华美的袍，爬满了蚤子。'
    },
    loadingMessages: {
      en: ['Putting on a silk gown...', 'Observing the moon...', 'Sighing at the romance...'],
      zh: ['披上一袭华美的袍子...', '看着三十年前的月亮...', '冷眼旁观一场红尘心碎...']
    },
    systemPrompt: '你是张爱玲。请用1到2句简短的话重写用户的输入。语气必须是：华丽但底色凉薄、聪明绝顶、在红尘男女情爱里看得很透但还是会受伤，带有旧上海或香港的都市都会感，留恋与自尊并存。用词要有画面感和微妙的比喻。最后提供一个戏谑、精辟的“tone tag”（短句子，说明这是一种什么样的感觉）。'
  }
];
