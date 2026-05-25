export const categories = {
  en: { food: '🍔 Food', transport: '🚗 Transport', energy: '⚡ Energy', consumption: '🛍️ Consumption', nature: '🌳 Nature' },
  zh: { food: '🍔 饮食', transport: '🚗 交通', energy: '⚡ 能源', consumption: '🛍️ 消费', nature: '🌳 自然' }
}

export const quizQuestions = {
  en: [
    // FOOD
    { question: "Which food has the highest carbon footprint per kilogram?", options: ["Rice", "Beef", "Chicken", "Potatoes"], correct: 1, explanation: "Beef produces ~60 kg CO₂ per kg. A single cow burps 200L of methane daily!", difficulty: 1, category: 'food' },
    { question: "How much lower is a vegan diet's footprint compared to a meat-heavy diet?", options: ["~10% lower", "~30% lower", "~50% lower", "~75% lower"], correct: 3, explanation: "A vegan diet produces ~75% less emissions. Going vegan for a year saves more CO₂ than giving up your car!", difficulty: 2, category: 'food' },
    { question: "Which has a bigger footprint: a cup of coffee or a cup of tea?", options: ["Coffee", "Tea", "Same", "Depends on brand"], correct: 0, explanation: "Coffee's footprint is ~3x tea's. Those imported beans travel far, and growing requires lots of water!", difficulty: 2, category: 'food' },
    { question: "What percentage of global emissions come from food systems?", options: ["~15%", "~26%", "~35%", "~45%"], correct: 1, explanation: "Food systems produce ~26% of global emissions. If food waste were a country, it'd be #3 emitter!", difficulty: 2, category: 'food' },
    { question: "Avocados are delicious, but how much water to grow 1 kg?", options: ["~200L", "~1,000L", "~2,000L", "~5,000L"], correct: 2, explanation: "~2,000L per kg! California's drought + avocado toast craze = serious water stress.", difficulty: 3, category: 'food' },
    { question: "Which milk alternative has the lowest footprint?", options: ["Almond", "Oat", "Soy", "Rice"], correct: 1, explanation: "Oat milk wins! Almonds need lots of water, rice paddies emit methane. Oats are humble but green.", difficulty: 2, category: 'food' },

    // TRANSPORT
    { question: "Which transport mode emits the least CO₂ per passenger km?", options: ["Short-haul flight", "Petrol car", "High-speed train", "Bus"], correct: 2, explanation: "Trains emit ~6g CO₂/pkm. A full bus is close, but trains are electric magic on rails!", difficulty: 1, category: 'transport' },
    { question: "A single round-trip flight NYC→London emits roughly how much CO₂ per passenger?", options: ["~0.5t", "~1t", "~2t", "~5t"], correct: 1, explanation: "~1 tonne! That's 1/5 of an average person's annual budget. Fly less, explore locally!", difficulty: 2, category: 'transport' },
    { question: "What's the main emission from EVs?", options: ["Tailpipe", "Tire wear", "Electricity generation", "Battery production"], correct: 2, explanation: "EVs have no tailpipe, but the electricity powering them matters. In coal-heavy grids, EVs are less clean.", difficulty: 2, category: 'transport' },
    { question: "Cruise ships emit how much CO₂ per passenger per day?", options: ["~5kg", "~25kg", "~80kg", "~200kg"], correct: 2, explanation: "~80kg/day! A week cruise = driving 3,000km. Plus they dump waste straight into oceans. Yikes!", difficulty: 3, category: 'transport' },
    { question: "Cycling 10km emits how much CO₂?", options: ["0g", "~50g", "~200g", "~500g"], correct: 1, explanation: "~50g from extra food calories! But the food you'd eat anyway makes it effectively zero. Win-win!", difficulty: 2, category: 'transport' },

    // ENERGY
    { question: "What percentage of global energy still comes from fossil fuels?", options: ["~40%", "~55%", "~70%", "~82%"], correct: 3, explanation: "~82%! Despite renewables booming, fossils still dominate. The transition needs to speed up!", difficulty: 2, category: 'energy' },
    { question: "Which renewable has the lowest lifecycle emissions?", options: ["Solar PV", "Wind", "Hydro", "Nuclear"], correct: 1, explanation: "Wind at ~11g CO₂/kWh! Nuclear is close (~12g). Both beat coal (~820g) by a landslide.", difficulty: 3, category: 'energy' },
    { question: "How much of home energy use goes to heating/cooling?", options: ["~20%", "~40%", "~60%", "~80%"], correct: 1, explanation: "~40-50%! Insulating your home is one of the highest-impact things you can do.", difficulty: 2, category: 'energy' },
    { question: "Standby power (vampire power) accounts for what % of home electricity?", options: ["~1-2%", "~5-10%", "~15-20%", "~30%"], correct: 1, explanation: "~5-10%! Unplugging chargers and using smart strips adds up. Your TV is sneakily sipping power all night.", difficulty: 2, category: 'energy' },
    { question: "Bitcoin mining uses more electricity than which country?", options: ["Switzerland", "Argentina", "Australia", "All of the above"], correct: 3, explanation: "All of them! Bitcoin uses ~150 TWh/year. That's a lot of coal-burning for digital coins.", difficulty: 3, category: 'energy' },

    // CONSUMPTION
    { question: "Roughly what % of plastic ever produced has been recycled?", options: ["~9%", "~25%", "~45%", "~60%"], correct: 0, explanation: "Only ~9%! 79% is in landfills/oceans. Your 'recyclable' bottle probably isn't getting recycled.", difficulty: 2, category: 'consumption' },
    { question: "The fashion industry produces what % of global emissions?", options: ["~2%", "~5%", "~10%", "~15%"], correct: 2, explanation: "~10%! A cotton t-shirt uses 2,700L water. Fast fashion = fast emissions. Thrift shop power!", difficulty: 2, category: 'consumption' },
    { question: "How many trees are needed to offset 1 tonne of CO₂ per year?", options: ["~5", "~15", "~50", "~100"], correct: 2, explanation: "~50 mature trees! Each absorbs ~22kg/year. Planting is good, but reducing emissions is better.", difficulty: 2, category: 'consumption' },
    { question: "Streaming 1 hour of HD video emits about how much CO₂?", options: ["~1g", "~36g", "~200g", "~1kg"], correct: 1, explanation: "~36g! Binge-watching a season = driving 10km. The internet runs on coal-powered data centers!", difficulty: 3, category: 'consumption' },
    { question: "A single Amazon delivery's average footprint is closest to:", options: ["Driving 1km", "Driving 5km", "Driving 20km", "Driving 100km"], correct: 0, explanation: "~1km of driving! But Prime's 'free' shipping encourages overconsumption. The real cost is hidden.", difficulty: 3, category: 'consumption' },

    // NATURE
    { question: "Which ocean absorbs the most CO₂?", options: ["Atlantic", "Indian", "Southern (Antarctic)", "Pacific"], correct: 2, explanation: "The Southern Ocean! Cold water dissolves more CO₂. It's saved us from even worse warming.", difficulty: 3, category: 'nature' },
    { question: "How much has the global sea level risen since 1900?", options: ["~5cm", "~15cm", "~25cm", "~40cm"], correct: 2, explanation: "~21-24cm and accelerating! By 2100, projections range 30cm to 1m+. Coastal cities are nervous.", difficulty: 2, category: 'nature' },
    { question: "The Amazon rainforest absorbs roughly how much CO₂ yearly?", options: ["100M tonnes", "500M tonnes", "1B tonnes", "2B tonnes"], correct: 3, explanation: "~2 billion tonnes! But deforestation is turning it into a carbon source. Save the lungs of Earth!", difficulty: 3, category: 'nature' },
    { question: "Permafrost thawing could release which dangerous gas?", options: ["CO₂ only", "Methane", "Nitrous oxide", "All of the above"], correct: 3, explanation: "All three! Ancient microbes wake up and party. This feedback loop could be catastrophic.", difficulty: 3, category: 'nature' },
    { question: "Coral bleaching is primarily caused by:", options: ["Ocean acidification", "Warmer water", "Plastic pollution", "Overfishing"], correct: 1, explanation: "Warmer water! Even 1°C rise stresses corals. The Great Barrier Reef has lost half its corals since 1995.", difficulty: 2, category: 'nature' },

    // MIXED
    { question: "By what year does IPCC recommend net-zero for 1.5°C?", options: ["2030", "2040", "2050", "2070"], correct: 2, explanation: "2050 globally! But developed nations should hit 2045. The clock is ticking LOUDLY.", difficulty: 2, category: 'energy' },
    { question: "Which country has the highest per-capita carbon footprint?", options: ["China", "USA", "India", "Germany"], correct: 1, explanation: "USA at ~15t/year! Qatar and Kuwait are higher, but USA's 330M people × 15t = massive total.", difficulty: 1, category: 'consumption' },
    { question: "Methane is how many times more potent than CO₂ over 20 years?", options: ["~10x", "~28x", "~80x", "~100x"], correct: 2, explanation: "~80x over 20 years! But it breaks down in ~12 years. Cutting methane NOW buys us time.", difficulty: 3, category: 'nature' },
    { question: "A person's annual carbon footprint to stay under 1.5°C should be under:", options: ["10 tonnes", "5 tonnes", "2.5 tonnes", "1 tonne"], correct: 2, explanation: "~2.3 tonnes! Global average is 4.7t. Americans average 15t. We ALL need to shrink fast.", difficulty: 2, category: 'consumption' },
    { question: "The main greenhouse gas from livestock is:", options: ["CO₂ from breathing", "Methane from burps", "Nitrous oxide from manure", "All equal"], correct: 1, explanation: "Methane from enteric fermentation (fancy word for cow burps)! One cow = burning 235L gasoline/year.", difficulty: 1, category: 'food' },
  ],

  zh: [
    // 饮食
    { question: "哪种食物每公斤碳足迹最高？", options: ["大米", "牛肉", "鸡肉", "土豆"], correct: 1, explanation: "牛肉每公斤约产生60公斤CO₂！一头牛每天打200升甲烷嗝！", difficulty: 1, category: 'food' },
    { question: "纯素饮食比高肉食饮食的碳足迹低多少？", options: ["约10%", "约30%", "约50%", "约75%"], correct: 3, explanation: "纯素饮食排放量减少约75%！一年不吃肉比放弃开车减排更多！", difficulty: 2, category: 'food' },
    { question: "一杯咖啡和一杯茶，哪个碳足迹更大？", options: ["咖啡", "茶", "一样", "看品牌"], correct: 0, explanation: "咖啡的碳足迹是茶的约3倍！进口咖啡豆长途运输，种植还耗大量水！", difficulty: 2, category: 'food' },
    { question: "全球排放中食物系统占多少比例？", options: ["约15%", "约26%", "约35%", "约45%"], correct: 1, explanation: "食物系统产生约26%的全球排放！如果食物浪费是一个国家，它将是第三大排放国！", difficulty: 2, category: 'food' },
    { question: "牛油果很好吃，但种植1公斤需要多少水？", options: ["约200升", "约1000升", "约2000升", "约5000升"], correct: 2, explanation: "约2000升！加州干旱+牛油果吐司热潮=严重水资源压力。", difficulty: 3, category: 'food' },
    { question: "哪种植物奶碳足迹最低？", options: ["杏仁奶", "燕麦奶", "豆奶", "米奶"], correct: 1, explanation: "燕麦奶胜出！杏仁耗水多，水稻田释放甲烷。燕麦 humble 但环保。", difficulty: 2, category: 'food' },

    // 交通
    { question: "哪种交通方式每位乘客每公里CO₂排放最低？", options: ["短途航班", "汽油车", "高铁", "公交车"], correct: 2, explanation: "高铁仅约6克CO₂/公里！满载公交车也很低，但火车是铁轨上的电动魔法！", difficulty: 1, category: 'transport' },
    { question: "纽约往返伦敦一次航班，每位乘客约产生多少CO₂？", options: ["约0.5吨", "约1吨", "约2吨", "约5吨"], correct: 1, explanation: "约1吨！这相当于普通人年排放量的1/5。少飞行，多探索本地！", difficulty: 2, category: 'transport' },
    { question: "电动汽车的主要排放来自哪里？", options: ["排气管", "轮胎磨损", "发电", "电池生产"], correct: 2, explanation: "电动车没有排气管，但驱动它的电力来源很关键。煤电为主的地区，电动车没那么清洁。", difficulty: 2, category: 'transport' },
    { question: "游轮每位乘客每天排放多少CO₂？", options: ["约5公斤", "约25公斤", "约80公斤", "约200公斤"], correct: 2, explanation: "约80公斤/天！一周游轮=开车3000公里。而且它们直接把垃圾倒入大海。", difficulty: 3, category: 'transport' },
    { question: "骑行10公里排放多少CO₂？", options: ["0克", "约50克", "约200克", "约500克"], correct: 1, explanation: "约50克来自额外食物热量！但你本来就要吃饭，所以实际上接近零。双赢！", difficulty: 2, category: 'transport' },

    // 能源
    { question: "全球能源中仍有多少比例来自化石燃料？", options: ["约40%", "约55%", "约70%", "约82%"], correct: 3, explanation: "约82%！尽管可再生能源在增长，化石燃料仍占主导。转型需要加速！", difficulty: 2, category: 'energy' },
    { question: "哪种可再生能源全生命周期排放最低？", options: ["太阳能", "风能", "水电", "核能"], correct: 1, explanation: "风能约11克CO₂/千瓦时！核能也很接近（约12克）。都远胜煤炭（约820克）。", difficulty: 3, category: 'energy' },
    { question: "家庭能源消耗中，供暖/制冷占多少？", options: ["约20%", "约40%", "约60%", "约80%"], correct: 1, explanation: "约40-50%！给房屋隔热是你能做的最高影响力的事情之一。", difficulty: 2, category: 'energy' },
    { question: "待机功耗（吸血鬼功耗）占家庭用电多少？", options: ["约1-2%", "约5-10%", "约15-20%", "约30%"], correct: 1, explanation: "约5-10%！拔掉充电器、使用智能插排可以积少成多。你的电视整晚都在偷偷耗电。", difficulty: 2, category: 'energy' },
    { question: "比特币挖矿用电量超过哪个国家？", options: ["瑞士", "阿根廷", "澳大利亚", "以上全部"], correct: 3, explanation: "超过以上全部！比特币年耗电约150太瓦时。烧煤挖数字币，值吗？", difficulty: 3, category: 'energy' },

    // 消费
    { question: "有史以来生产的塑料中，约多少被回收？", options: ["约9%", "约25%", "约45%", "约60%"], correct: 0, explanation: "仅约9%！79%进入垃圾填埋场或海洋。你那个'可回收'瓶子很可能没被回收。", difficulty: 2, category: 'consumption' },
    { question: "时尚产业产生全球排放的多少？", options: ["约2%", "约5%", "约10%", "约15%"], correct: 2, explanation: "约10%！一件棉T恤耗水2700升。快时尚=快排放。二手店才是时尚！", difficulty: 2, category: 'consumption' },
    { question: "每年抵消1吨CO₂大约需要多少棵树？", options: ["约5棵", "约15棵", "约50棵", "约100棵"], correct: 2, explanation: "约50棵成熟树木！每棵每年吸收约22公斤。种树好，但减排更好。", difficulty: 2, category: 'consumption' },
    { question: "流媒体1小时高清视频排放多少CO₂？", options: ["约1克", "约36克", "约200克", "约1公斤"], correct: 1, explanation: "约36克！刷完一季=开车10公里。互联网靠煤电数据中心运转！", difficulty: 3, category: 'consumption' },
    { question: "一次亚马逊配送的平均碳足迹最接近：", options: ["开车1公里", "开车5公里", "开车20公里", "开车100公里"], correct: 0, explanation: "约开车1公里！但Prime'免费'送货助长了过度消费。真正的成本是隐藏的。", difficulty: 3, category: 'consumption' },

    // 自然
    { question: "哪个大洋吸收最多CO₂？", options: ["大西洋", "印度洋", "南大洋（南极）", "太平洋"], correct: 2, explanation: "南大洋！冷水溶解更多CO₂。它帮我们避免了更严重的变暖。", difficulty: 3, category: 'nature' },
    { question: "自1900年以来全球海平面上升了多少？", options: ["约5厘米", "约15厘米", "约25厘米", "约40厘米"], correct: 2, explanation: "约21-24厘米，而且正在加速！到2100年，预测范围30厘米到1米以上。沿海城市很紧张。", difficulty: 2, category: 'nature' },
    { question: "亚马逊雨林每年大约吸收多少CO₂？", options: ["1亿吨", "5亿吨", "10亿吨", "20亿吨"], correct: 3, explanation: "约20亿吨！但森林砍伐正在把它变成碳排放源。拯救地球之肺！", difficulty: 3, category: 'nature' },
    { question: "永久冻土融化会释放哪种危险气体？", options: ["只有CO₂", "甲烷", "氧化亚氮", "以上全部"], correct: 3, explanation: "三种都有！远古微生物苏醒后开始'派对'。这个反馈循环可能是灾难性的。", difficulty: 3, category: 'nature' },
    { question: "珊瑚白化的主要原因是：", options: ["海洋酸化", "水温升高", "塑料污染", "过度捕捞"], correct: 1, explanation: "水温升高！即使升温1°C也会让珊瑚受压。大堡礁自1995年以来失去了一半珊瑚。", difficulty: 2, category: 'nature' },

    // 综合
    { question: "IPCC建议哪年前实现净零排放以限制1.5°C升温？", options: ["2030年", "2040年", "2050年", "2070年"], correct: 2, explanation: "全球2050年！但发达国家应2045年前达标。时钟正在大声滴答。", difficulty: 2, category: 'energy' },
    { question: "哪个国家人均碳足迹最高？", options: ["中国", "美国", "印度", "德国"], correct: 1, explanation: "美国约15吨/年！卡塔尔和科威特更高，但美国3.3亿人×15吨=总量巨大。", difficulty: 1, category: 'consumption' },
    { question: "甲烷在20年内的升温潜力是CO₂的多少倍？", options: ["约10倍", "约28倍", "约80倍", "约100倍"], correct: 2, explanation: "约80倍！但它约12年就分解。现在削减甲烷可以为我们争取时间。", difficulty: 3, category: 'nature' },
    { question: "为控制在1.5°C以内，人均年碳足迹应低于：", options: ["10吨", "5吨", "2.5吨", "1吨"], correct: 2, explanation: "约2.3吨！全球平均4.7吨，美国人平均15吨。我们都需要快速减排。", difficulty: 2, category: 'consumption' },
    { question: "牲畜排放的主要温室气体是什么？", options: ["呼吸产生的CO₂", "打嗝产生的甲烷", "粪便产生的一氧化二氮", "三者一样"], correct: 1, explanation: "肠道发酵产生的甲烷（就是牛打嗝）！一头牛=每年烧235升汽油。", difficulty: 1, category: 'food' },
  ]
}

export function getQuizQuestions(lang, difficulty = 'all', category = 'all') {
  let qs = quizQuestions[lang] || quizQuestions['en']
  if (difficulty !== 'all') {
    qs = qs.filter(q => q.difficulty === difficulty)
  }
  if (category !== 'all') {
    qs = qs.filter(q => q.category === category)
  }
  return qs
}

export const difficultySettings = {
  easy: { name: 'Easy', questions: 8, time: 20, label: { en: 'Easy', zh: '简单' } },
  medium: { name: 'Medium', questions: 10, time: 15, label: { en: 'Medium', zh: '中等' } },
  hard: { name: 'Hard', questions: 15, time: 10, label: { en: 'Hard', zh: '困难' } },
}

export const difficultyNames = {
  en: ['Easy', 'Medium', 'Hard'],
  zh: ['简单', '中等', '困难']
}

export function getDifficultyName(level, lang = 'en') {
  const names = difficultyNames[lang] || difficultyNames['en']
  return names[level - 1] || names[0]
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
    "The Great Pacific Garbage Patch is 3x the size of France.",
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

export const achievements = {
  en: [
    { id: 'first_game', icon: '🌱', name: 'First Steps', desc: 'Complete your first quiz' },
    { id: 'combo_5', icon: '🔥', name: 'Combo Master', desc: 'Reach a 5x combo' },
    { id: 'speed_demon', icon: '⚡', name: 'Speed Demon', desc: 'Answer correctly in under 3 seconds' },
    { id: 'perfect', icon: '🎯', name: 'Perfectionist', desc: 'Get every question right' },
    { id: 's_rank', icon: '🏆', name: 'Planet Guardian', desc: 'Achieve S rank' },
    { id: 'hard_mode', icon: '💀', name: 'Survivor', desc: 'Complete Hard mode' },
  ],
  zh: [
    { id: 'first_game', icon: '🌱', name: '初次觉醒', desc: '完成第一次测验' },
    { id: 'combo_5', icon: '🔥', name: '连击大师', desc: '达成5连击' },
    { id: 'speed_demon', icon: '⚡', name: '闪电思维', desc: '3秒内答对一题' },
    { id: 'perfect', icon: '🎯', name: '完美主义', desc: '全部答对' },
    { id: 's_rank', icon: '🏆', name: '地球守护者', desc: '获得S评级' },
    { id: 'hard_mode', icon: '💀', name: '幸存者', desc: '完成困难模式' },
  ]
}
