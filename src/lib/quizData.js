export const categories = {
  en: { food: '🍔 Food', transport: '🚗 Transport', energy: '⚡ Energy', consumption: '🛍️ Consumption', nature: '🌳 Nature' },
  zh: { food: '🍔 饮食', transport: '🚗 交通', energy: '⚡ 能源', consumption: '🛍️ 消费', nature: '🌳 自然' }
}

export const quizQuestions = {
  en: [
    {
      question: "Which food has the highest carbon footprint?",
      options: ["Rice", "Beef", "Chicken", "Potatoes"],
      correct: 1,
      explanation: "Beef produces ~60 kg CO₂ per kg. One cow burps 200 litres of methane daily.",
      difficulty: 1,
      category: 'food',
      image: './images/cow.jpg',
      citation: "Poore, J., & Nemecek, T. (2018). Reducing food's environmental impacts. Science, 360(6392), 987-992."
    },
    {
      question: "Going vegan cuts food emissions by about:",
      options: ["10%", "30%", "50%", "75%"],
      correct: 3,
      explanation: "A fully plant-based diet produces roughly 75% fewer greenhouse-gas emissions than a meat-rich diet.",
      difficulty: 1,
      category: 'food',
      image: './images/vegan.jpg',
      citation: "Poore, J., & Nemecek, T. (2018). Science, 360(6392), 987-992."
    },
    {
      question: "Coffee or tea — which has a bigger footprint?",
      options: ["Coffee", "Tea", "Same", "Depends"],
      correct: 0,
      explanation: "Coffee's footprint is roughly 3× that of tea, due to processing and long-distance transport.",
      difficulty: 2,
      category: 'food',
      image: './images/coffeebeans.jpg',
      citation: "Ritchie, H., et al. Our World in Data: CO₂ and Greenhouse Gas Emissions."
    },
    {
      question: "Which plant milk is the greenest?",
      options: ["Almond", "Oat", "Soy", "Rice"],
      correct: 1,
      explanation: "Oat milk has the lowest combined land use, water use and emissions. Almonds are water-intensive.",
      difficulty: 1,
      category: 'food',
      image: './images/food.jpg',
      citation: "Poore, J., & Nemecek, T. (2018). Science, 360(6392), 987-992."
    },
    {
      question: "How much water to grow 1 kg of avocados?",
      options: ["~200 L", "~1,000 L", "~2,000 L", "~5,000 L"],
      correct: 2,
      explanation: "About 2,000 litres per kg — more drinking water than most people consume in six months.",
      difficulty: 3,
      category: 'food',
      image: './images/avocado.jpg',
      citation: "Mekonnen, M. M., & Hoekstra, A. Y. (2010). Water Footprint Network."
    },
    {
      question: "Which transport emits the least CO₂ per passenger km?",
      options: ["Plane", "Car", "Train", "Bus"],
      correct: 2,
      explanation: "Rail emits only ~6 g CO₂ per passenger km. A full bus is a close second.",
      difficulty: 1,
      category: 'transport',
      image: './images/train.jpg',
      citation: "IEA. (2023). World Energy Outlook 2023."
    },
    {
      question: "One round-trip flight NYC → London emits about:",
      options: ["0.5 tonne", "1 tonne", "2 tonnes", "5 tonnes"],
      correct: 1,
      explanation: "~1 tonne per passenger. That is roughly one-fifth of a sustainable annual carbon budget.",
      difficulty: 2,
      category: 'transport',
      image: './images/airplane.jpg',
      citation: "ICAO Carbon Emissions Calculator."
    },
    {
      question: "Where do most EV lifecycle emissions come from?",
      options: ["Tailpipe", "Tires", "Power grid", "Batteries"],
      correct: 2,
      explanation: "EVs have no tailpipe, but the carbon intensity of the electricity grid dominates their footprint.",
      difficulty: 2,
      category: 'transport',
      image: './images/ev.jpg',
      citation: "IEA. (2023). World Energy Outlook 2023."
    },
    {
      question: "What % of all plastic ever made has been recycled?",
      options: ["~9%", "~25%", "~45%", "~60%"],
      correct: 0,
      explanation: "Only ~9%. Roughly 79% has accumulated in landfills or the natural environment.",
      difficulty: 2,
      category: 'consumption',
      image: './images/plastic.jpg',
      citation: "OECD. (2022). Global Plastics Outlook: Policy Scenarios to 2060."
    },
    {
      question: "Fashion produces what % of global emissions?",
      options: ["~2%", "~5%", "~10%", "~15%"],
      correct: 2,
      explanation: "~10%. A single cotton T-shirt can require 2,700 litres of water to produce.",
      difficulty: 1,
      category: 'consumption',
      image: './images/fashion.jpg',
      citation: "UNFCCC. (2018). Fashion Industry Charter for Climate Action."
    },
    {
      question: "Which energy has the lowest lifecycle emissions?",
      options: ["Solar", "Wind", "Hydro", "Nuclear"],
      correct: 1,
      explanation: "Wind averages ~11 g CO₂ per kWh across its full lifecycle, far below coal (~820 g).",
      difficulty: 2,
      category: 'energy',
      image: './images/wind.jpg',
      citation: "IPCC. (2023). AR6 Synthesis Report."
    },
    {
      question: "Standby power wastes what % of home electricity?",
      options: ["~1%", "~5–10%", "~15%", "~30%"],
      correct: 1,
      explanation: "~5–10%. Unplugging chargers and using smart power strips cuts this waste.",
      difficulty: 2,
      category: 'energy',
      image: './images/laptop.jpg',
      citation: "IEA. (2023). World Energy Outlook 2023."
    },
    {
      question: "How many trees to offset ~1 tonne of CO₂ per year?",
      options: ["~5", "~15", "~50", "~100"],
      correct: 2,
      explanation: "~50 mature trees. Each absorbs roughly 22 kg of CO₂ per year through photosynthesis.",
      difficulty: 2,
      category: 'nature',
      image: './images/forest.jpg',
      citation: "One Tree Planted; U.S. EPA. Greenhouse Gas Equivalencies Calculator."
    },
    {
      question: "Global sea level has risen ~__ since 1900:",
      options: ["5 cm", "15 cm", "21–24 cm", "40 cm"],
      correct: 2,
      explanation: "~21–24 cm and accelerating. By 2100: 30 cm to 1 m+ under high-emission scenarios.",
      difficulty: 2,
      category: 'nature',
      image: './images/sealevel.jpg',
      citation: "NASA; NOAA. (2023). Global Climate Report."
    },
    {
      question: "What is the main cause of coral bleaching?",
      options: ["Acidification", "Warmer water", "Plastic", "Overfishing"],
      correct: 1,
      explanation: "Warmer water. Even 1°C rise stresses corals. The Great Barrier Reef has lost half since 1995.",
      difficulty: 3,
      category: 'nature',
      image: './images/coral.jpg',
      citation: "IPCC. (2023). AR6 Synthesis Report."
    }
  ],

  zh: [
    {
      question: "哪种食物碳足迹最高？",
      options: ["大米", "牛肉", "鸡肉", "土豆"],
      correct: 1,
      explanation: "牛肉每公斤约60公斤CO₂。一头牛每天打约200升甲烷嗝。",
      difficulty: 1,
      category: 'food',
      image: './images/cow.jpg',
      citation: "Poore, J., & Nemecek, T. (2018). Science, 360(6392), 987-992."
    },
    {
      question: "纯素饮食减排约多少？",
      options: ["10%", "30%", "50%", "75%"],
      correct: 3,
      explanation: "完全植物性饮食产生的温室气体排放量比肉食饮食大约低75%。",
      difficulty: 1,
      category: 'food',
      image: './images/vegan.jpg',
      citation: "Poore, J., & Nemecek, T. (2018). Science, 360(6392), 987-992."
    },
    {
      question: "咖啡和茶哪个碳足迹更大？",
      options: ["咖啡", "茶", "一样", "看情况"],
      correct: 0,
      explanation: "咖啡碳足迹约为茶的3倍，主要因加工和长途运输。",
      difficulty: 2,
      category: 'food',
      image: './images/coffeebeans.jpg',
      citation: "Ritchie, H., et al. Our World in Data: CO₂ and Greenhouse Gas Emissions."
    },
    {
      question: "哪种植物奶最环保？",
      options: ["杏仁奶", "燕麦奶", "豆奶", "米奶"],
      correct: 1,
      explanation: "燕麦奶综合土地、用水和排放最低。杏仁耗水量大。",
      difficulty: 1,
      category: 'food',
      image: './images/food.jpg',
      citation: "Poore, J., & Nemecek, T. (2018). Science, 360(6392), 987-992."
    },
    {
      question: "种植1公斤牛油果需多少水？",
      options: ["约200升", "约1000升", "约2000升", "约5000升"],
      correct: 2,
      explanation: "约2000升，比普通人半年饮水量还多。",
      difficulty: 3,
      category: 'food',
      image: './images/avocado.jpg',
      citation: "Mekonnen, M. M., & Hoekstra, A. Y. (2010). Water Footprint Network."
    },
    {
      question: "哪种交通人均碳排放最低？",
      options: ["飞机", "汽车", "火车", "公交"],
      correct: 2,
      explanation: "铁路仅约6克CO₂/人·公里，满载公交紧随其后。",
      difficulty: 1,
      category: 'transport',
      image: './images/train.jpg',
      citation: "IEA. (2023). World Energy Outlook 2023."
    },
    {
      question: "纽约往返伦敦一趟人均排放约？",
      options: ["0.5吨", "1吨", "2吨", "5吨"],
      correct: 1,
      explanation: "约1吨，相当于可持续年碳预算的五分之一。",
      difficulty: 2,
      category: 'transport',
      image: './images/airplane.jpg',
      citation: "ICAO Carbon Emissions Calculator."
    },
    {
      question: "电动车排放主要来自哪里？",
      options: ["排气管", "轮胎", "电网", "电池"],
      correct: 2,
      explanation: "电动车无排气管排放，但电网碳强度主导其全生命周期碳足迹。",
      difficulty: 2,
      category: 'transport',
      image: './images/ev.jpg',
      citation: "IEA. (2023). World Energy Outlook 2023."
    },
    {
      question: "有史以来塑料约多少被回收？",
      options: ["约9%", "约25%", "约45%", "约60%"],
      correct: 0,
      explanation: "仅约9%。约79%堆积在垃圾填埋场或自然环境中。",
      difficulty: 2,
      category: 'consumption',
      image: './images/plastic.jpg',
      citation: "OECD. (2022). Global Plastics Outlook."
    },
    {
      question: "时尚产业占全球排放约多少？",
      options: ["约2%", "约5%", "约10%", "约15%"],
      correct: 2,
      explanation: "约10%。一件棉T恤生产可能耗水2700升。",
      difficulty: 1,
      category: 'consumption',
      image: './images/fashion.jpg',
      citation: "UNFCCC. (2018). Fashion Industry Charter for Climate Action."
    },
    {
      question: "哪种能源全生命周期排放最低？",
      options: ["太阳能", "风能", "水电", "核能"],
      correct: 1,
      explanation: "风能全生命周期平均约11克CO₂/千瓦时，远低于煤炭约820克。",
      difficulty: 2,
      category: 'energy',
      image: './images/wind.jpg',
      citation: "IPCC. (2023). AR6 Synthesis Report."
    },
    {
      question: "待机功耗占家庭用电约多少？",
      options: ["约1%", "约5–10%", "约15%", "约30%"],
      correct: 1,
      explanation: "约5–10%。拔掉充电器、使用智能插排可减少浪费。",
      difficulty: 2,
      category: 'energy',
      image: './images/laptop.jpg',
      citation: "IEA. (2023). World Energy Outlook 2023."
    },
    {
      question: "抵消1吨CO₂每年需多少棵树？",
      options: ["约5棵", "约15棵", "约50棵", "约100棵"],
      correct: 2,
      explanation: "约50棵成年树木。每棵每年通过光合作用吸收约22公斤CO₂。",
      difficulty: 2,
      category: 'nature',
      image: './images/forest.jpg',
      citation: "One Tree Planted; U.S. EPA. Greenhouse Gas Equivalencies Calculator."
    },
    {
      question: "自1900年海平面上升约？",
      options: ["5厘米", "15厘米", "21–24厘米", "40厘米"],
      correct: 2,
      explanation: "约21–24厘米且加速。2100年预计30厘米至1米以上。",
      difficulty: 2,
      category: 'nature',
      image: './images/sealevel.jpg',
      citation: "NASA; NOAA. (2023). Global Climate Report."
    },
    {
      question: "珊瑚白化的主要原因是？",
      options: ["海洋酸化", "水温升高", "塑料污染", "过度捕捞"],
      correct: 1,
      explanation: "水温升高。即使升温1°C也会让珊瑚受压，大堡礁自1995年失去一半珊瑚。",
      difficulty: 3,
      category: 'nature',
      image: './images/coral.jpg',
      citation: "IPCC. (2023). AR6 Synthesis Report."
    }
  ]
}

export function getQuizQuestions(lang) {
  return quizQuestions[lang] || quizQuestions['en']
}

export const gradeInfo = {
  en: [
    { min: 0, max: 29, grade: 'D', title: 'Climate Novice', color: 'text-rose-400', bg: 'from-rose-500/20 to-orange-500/20', desc: 'Every expert was once a beginner. Try again!' },
    { min: 30, max: 49, grade: 'C', title: 'Green Sprout', color: 'text-amber-400', bg: 'from-amber-500/20 to-yellow-500/20', desc: 'Good start! Keep learning about our planet.' },
    { min: 50, max: 69, grade: 'B', title: 'Eco Warrior', color: 'text-emerald-400', bg: 'from-emerald-500/20 to-teal-500/20', desc: 'Solid knowledge! You care about the environment.' },
    { min: 70, max: 89, grade: 'A', title: 'Carbon Master', color: 'text-cyan-400', bg: 'from-cyan-500/20 to-blue-500/20', desc: 'Impressive! You really know your carbon facts.' },
    { min: 90, max: 100, grade: 'S', title: 'Planet Guardian', color: 'text-purple-400', bg: 'from-purple-500/20 to-pink-500/20', desc: 'Legendary! You are a true climate champion!' }
  ],
  zh: [
    { min: 0, max: 29, grade: 'D', title: '气候新手', color: 'text-rose-400', bg: 'from-rose-500/20 to-orange-500/20', desc: '每个专家都曾是初学者，再试一次吧！' },
    { min: 30, max: 49, grade: 'C', title: '绿色嫩芽', color: 'text-amber-400', bg: 'from-amber-500/20 to-yellow-500/20', desc: '不错的开始！继续学习关于我们星球的知识。' },
    { min: 50, max: 69, grade: 'B', title: '环保战士', color: 'text-emerald-400', bg: 'from-emerald-500/20 to-teal-500/20', desc: '扎实的知识！你真的很关心环境。' },
    { min: 70, max: 89, grade: 'A', title: '碳排放大师', color: 'text-cyan-400', bg: 'from-cyan-500/20 to-blue-500/20', desc: '令人印象深刻！你真的了解碳排放知识。' },
    { min: 90, max: 100, grade: 'S', title: '地球守护者', color: 'text-purple-400', bg: 'from-purple-500/20 to-pink-500/20', desc: '传奇级别！你是真正的气候冠军！' }
  ]
}

export function getGradeInfo(score, lang = 'en') {
  const infos = gradeInfo[lang] || gradeInfo['en']
  return infos.find(g => score >= g.min && score <= g.max) || infos[infos.length - 1]
}

export const funFacts = {
  en: [
    "If everyone lived like Americans, we'd need 5 Earths!",
    "Cows have best friends and get stressed when separated.",
    "A single Google search emits ~0.2g of CO₂.",
    "The Great Pacific Garbage Patch is 3× the size of France.",
    "Your phone charge uses about the same energy as a kettle boil... over a whole year!",
    "Termites produce more methane than all livestock combined.",
    "The color of your roof affects cooling costs. White roofs reflect heat!",
    "Bamboo can grow 91cm in a single day.",
  ],
  zh: [
    "如果每个人都像美国人一样生活，我们需要5个地球！",
    "奶牛有最好的朋友，分开时会感到压力。",
    "一次谷歌搜索排放约0.2克CO₂。",
    "大太平洋垃圾带是法国面积的3倍。",
    "你的手机一整年的充电量，约等于烧一壶水！",
    "白蚁产生的甲烷超过所有牲畜的总和。",
    "屋顶颜色影响制冷成本。白色屋顶反射热量！",
    "竹子一天可以长91厘米。",
  ]
}

// Carbon Seedling Growth Stages — reward system replacing achievements
export const treeStages = {
  en: [
    { min: 0, max: 300, icon: '🌱', name: 'Carbon Seed', desc: 'Your seed is planted. Every correct answer waters it!' },
    { min: 301, max: 700, icon: '🌿', name: 'Green Sprout', desc: 'Breaking through the soil! Keep the knowledge flowing.' },
    { min: 701, max: 1200, icon: '🌳', name: 'Mighty Sapling', desc: 'Growing stronger. Your choices are making a difference.' },
    { min: 1201, max: 1800, icon: '🌲', name: 'Carbon Tree', desc: 'A full carbon sink! Your knowledge is truly impressive.' },
    { min: 1801, max: 99999, icon: '🌳✨', name: 'Ancient Guardian', desc: 'Legendary! Your forest cleans the air for generations.' },
  ],
  zh: [
    { min: 0, max: 300, icon: '🌱', name: '碳之种子', desc: '种子已种下，每答对一题都在浇灌它！' },
    { min: 301, max: 700, icon: '🌿', name: '绿色嫩芽', desc: '破土而出！让知识继续流动。' },
    { min: 701, max: 1200, icon: '🌳', name: '茁壮树苗', desc: '越来越强。你的选择正在改变世界。' },
    { min: 1201, max: 1800, icon: '🌲', name: '碳汇之树', desc: '完整的碳汇！你的知识令人钦佩。' },
    { min: 1801, max: 99999, icon: '🌳✨', name: '古树守护者', desc: '传奇！你的森林为后代净化空气。' },
  ]
}

export function getTreeStage(score, lang = 'en') {
  const stages = treeStages[lang] || treeStages['en']
  return stages.find(s => score >= s.min && score <= s.max) || stages[stages.length - 1]
}

// CO₂ savings per correct answer (fictional but fun metric)
export const CO2_PER_CORRECT = 12 // kg

// Knowledge level system (persistent across games)
export const knowledgeLevels = {
  en: [
    { min: 0, name: 'Seedling', desc: 'Just getting started' },
    { min: 10, name: 'Sprout', desc: 'Growing curiosity' },
    { min: 30, name: 'Sapling', desc: 'Building knowledge' },
    { min: 60, name: 'Tree', desc: 'Well-rooted understanding' },
    { min: 100, name: 'Guardian', desc: 'Climate champion' },
  ],
  zh: [
    { min: 0, name: '幼苗', desc: '刚刚开始' },
    { min: 10, name: '嫩芽', desc: '好奇心在萌发' },
    { min: 30, name: '树苗', desc: '知识在积累' },
    { min: 60, name: '大树', desc: '根基扎实' },
    { min: 100, name: '守护者', desc: '气候冠军' },
  ]
}

export function getKnowledgeLevel(totalCorrect, lang = 'en') {
  const levels = knowledgeLevels[lang] || knowledgeLevels['en']
  // Find the highest level the user has reached
  let current = levels[0]
  for (const lvl of levels) {
    if (totalCorrect >= lvl.min) current = lvl
  }
  // Find next level
  const currentIdx = levels.indexOf(current)
  const next = levels[currentIdx + 1] || null
  const progressToNext = next ? Math.min(100, Math.round(((totalCorrect - current.min) / (next.min - current.min)) * 100)) : 100
  return { current, next, progressToNext, totalCorrect }
}

export const failMemes = {
  en: [
    { top: "FAILURE", bottom: "is the mother of success", bg: "./images/cow.jpg", mascot: "sad" },
    { top: "EVERY EXPERT", bottom: "was once a beginner", bg: "./images/bike.jpg", mascot: "think" },
    { top: "IT'S OKAY", bottom: "the planet still loves you", bg: "./images/earth.jpg", mascot: "wave" },
    { top: "OOPS", bottom: "even corals get stressed", bg: "./images/coral.jpg", mascot: "sad" },
    { top: "KEEP GOING", bottom: "you're saving watts of knowledge", bg: "./images/energy.jpg", mascot: "think" },
    { top: "NICE TRY", bottom: "trees grow through storms", bg: "./images/forest.jpg", mascot: "wave" },
    { top: "NOT QUITE", bottom: "but every answer teaches", bg: "./images/wind.jpg", mascot: "think" },
  ],
  zh: [
    { top: "失败", bottom: "是成功之母", bg: "./images/cow.jpg", mascot: "sad" },
    { top: "每个专家", bottom: "都曾是初学者", bg: "./images/bike.jpg", mascot: "think" },
    { top: "没关系", bottom: "地球依然爱你", bg: "./images/earth.jpg", mascot: "wave" },
    { top: "哎呀", bottom: "珊瑚也会有压力", bg: "./images/coral.jpg", mascot: "sad" },
    { top: "继续加油", bottom: "你在积累碳知识", bg: "./images/energy.jpg", mascot: "think" },
    { top: "不错哦", bottom: "树木在风雨中成长", bg: "./images/forest.jpg", mascot: "wave" },
    { top: "差一点", bottom: "但每个答案都在教你", bg: "./images/wind.jpg", mascot: "think" },
  ]
}

export const worksCited = [
  "IPCC. (2023). AR6 Synthesis Report. Intergovernmental Panel on Climate Change.",
  "Poore, J., & Nemecek, T. (2018). Reducing food's environmental impacts through producers and consumers. Science, 360(6392), 987-992.",
  "Friedlingstein, P., et al. (2023). Global Carbon Budget 2023. Earth System Science Data, 15(12), 5301-5365.",
  "Ritchie, H., Roser, M., & Ortiz-Ospina, E. Our World in Data: CO₂ and Greenhouse Gas Emissions. https://ourworldindata.org/co2-and-greenhouse-gas-emissions",
  "IEA. (2023). World Energy Outlook 2023. International Energy Agency."
]
