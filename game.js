const TRIGRAMS = {
  "111": {
    name: "乾",
    symbol: "☰",
    meaning: "天",
    score: 120,
    description: "刚健、创造、主动",
    pattern: "阳 / 阳 / 阳",
    playstyle: "阳爻爆发，适合高倍率和主动进攻。",
  },
  "000": {
    name: "坤",
    symbol: "☷",
    meaning: "地",
    score: 100,
    description: "承载、稳定、包容",
    pattern: "阴 / 阴 / 阴",
    playstyle: "阴爻积累，适合稳定加分和防守路线。",
  },
  "100": {
    name: "震",
    symbol: "☳",
    meaning: "雷",
    score: 110,
    description: "启动、震动、突破",
    pattern: "阳 / 阴 / 阴",
    playstyle: "下爻启动，适合第一张牌相关加成。",
  },
  "011": {
    name: "巽",
    symbol: "☴",
    meaning: "风",
    score: 110,
    description: "渗透、传播、柔入",
    pattern: "阴 / 阳 / 阳",
    playstyle: "细水长流，适合连续小加成。",
  },
  "010": {
    name: "坎",
    symbol: "☵",
    meaning: "水",
    score: 130,
    description: "危险、流动、隐藏",
    pattern: "阴 / 阳 / 阴",
    playstyle: "风险高分，适合险中求胜。",
  },
  "101": {
    name: "离",
    symbol: "☲",
    meaning: "火",
    score: 130,
    description: "光明、显现、爆发",
    pattern: "阳 / 阴 / 阳",
    playstyle: "显现爆发，适合倍率和变爻连锁。",
  },
  "001": {
    name: "艮",
    symbol: "☶",
    meaning: "山",
    score: 100,
    description: "停止、防守、积累",
    pattern: "阴 / 阴 / 阳",
    playstyle: "停止守成，适合不变爻直接结算。",
  },
  "110": {
    name: "兑",
    symbol: "☱",
    meaning: "泽",
    score: 100,
    description: "交流、喜悦、交换",
    pattern: "阳 / 阳 / 阴",
    playstyle: "交换奖励，适合灵活改线和奖励流。",
  },
};

const TRIGRAM_ORDER = ["111", "110", "101", "100", "011", "010", "001", "000"];
const HEXAGRAM_NAMES = [
  "乾",
  "坤",
  "屯",
  "蒙",
  "需",
  "讼",
  "师",
  "比",
  "小畜",
  "履",
  "泰",
  "否",
  "同人",
  "大有",
  "谦",
  "豫",
  "随",
  "蛊",
  "临",
  "观",
  "噬嗑",
  "贲",
  "剥",
  "复",
  "无妄",
  "大畜",
  "颐",
  "大过",
  "坎",
  "离",
  "咸",
  "恒",
  "遯",
  "大壮",
  "晋",
  "明夷",
  "家人",
  "睽",
  "蹇",
  "解",
  "损",
  "益",
  "夬",
  "姤",
  "萃",
  "升",
  "困",
  "井",
  "革",
  "鼎",
  "震",
  "艮",
  "渐",
  "归妹",
  "丰",
  "旅",
  "巽",
  "兑",
  "涣",
  "节",
  "中孚",
  "小过",
  "既济",
  "未济",
];
const HEXAGRAM_VALUES = [
  63, 0, 17, 34, 23, 58, 2, 16, 55, 59, 7, 56, 61, 47, 4, 8, 25, 38, 3, 48, 41, 37, 32, 1, 57, 39, 33, 30, 18, 45, 28, 14,
  60, 15, 40, 5, 53, 43, 10, 20, 35, 49, 31, 62, 24, 6, 26, 22, 29, 46, 9, 36, 52, 11, 13, 44, 54, 27, 50, 19, 51, 12, 21, 42,
];
const HEXAGRAM_GUIDANCE = {
  屯: { theme: "初生有难", advice: "先立根基，寻找同行者，不宜急于求成", action: "守" },
  家人: { theme: "正内而后行外", advice: "先明确角色与边界，让内部秩序稳定下来", action: "守" },
  革: { theme: "顺时而变", advice: "旧法已经失效，条件成熟时应果断更新", action: "变" },
  大有: { theme: "盛大所有", advice: "资源与时机汇聚，应主动承担并善用所得", action: "进" },
};
const HEXAGRAMS = Object.fromEntries(
  HEXAGRAM_NAMES.map((name, index) => {
    const topToBottom = HEXAGRAM_VALUES[index].toString(2).padStart(6, "0");
    const bottomToTop = [...topToBottom].reverse().join("");
    const innerPattern = bottomToTop.slice(0, 3);
    const outerPattern = bottomToTop.slice(3);
    return [
      bottomToTop,
      {
        id: index + 1,
        name,
        symbol: String.fromCodePoint(0x4dc0 + index),
        lines: bottomToTop,
        inner: TRIGRAMS[innerPattern],
        outer: TRIGRAMS[outerPattern],
        guidance: HEXAGRAM_GUIDANCE[name] || null,
      },
    ];
  }),
);
const REALM_TWO_SCENARIOS = [
  {
    id: "new_venture",
    title: "新局初启",
    story: "你与几位朋友准备共同开启一项新计划。想法刚刚萌芽，前方却有许多未知，资源与分工都还不稳定",
    clue: "下有雷动，象征事情开始萌发；上有水险，提醒前路仍多艰难",
    inner: "100",
    outer: "010",
    action: "守",
  },
  {
    id: "home_order",
    title: "内部分歧",
    story: "一个长期合作的团队开始出现争执。每个人都很努力，但职责模糊、沟通越界，让小问题不断累积",
    clue: "下有火明，使内情得以显现；上有风入，让秩序与影响逐渐深入",
    inner: "101",
    outer: "011",
    action: "守",
  },
  {
    id: "old_rules",
    title: "旧制难行",
    story: "沿用多年的办法已经无法解决新问题。继续维持最省力，但每拖延一天，积累的矛盾就更深",
    clue: "下有火明，照见问题；上有泽悦，众人已有共同改变的意愿",
    inner: "101",
    outer: "110",
    action: "变",
  },
  {
    id: "great_harvest",
    title: "时机汇聚",
    story: "经过长期准备，你终于获得资源、伙伴与信任。机会已经来到，但更大的收获也意味着更大的责任",
    clue: "下有天健，持续创造；上有火明，使成果被看见",
    inner: "111",
    outer: "101",
    action: "进",
  },
];

const DESTINIES = [
  {
    id: "qian_bonus",
    name: "潜龙命",
    description: "技能：打出乾卦时，分数 ×2。提示：乾卦是极阳之卦，三爻皆阳；阳为实线，阴为断线。",
    tags: ["阳爻", "卦象"],
    effects: [{ type: "trigram_multiplier", target: "乾", value: 2 }],
  },
  {
    id: "li_bonus",
    name: "朱雀命",
    description: "技能：打出离卦时，分数 ×2。提示：离卦是阳 / 阴 / 阳。",
    tags: ["爆发", "卦象"],
    effects: [{ type: "trigram_multiplier", target: "离", value: 2 }],
  },
  {
    id: "kan_bonus",
    name: "玄武命",
    description: "技能：打出坎卦时，分数 ×2。提示：坎卦分高，但常被劫象克制。",
    tags: ["风险", "卦象"],
    effects: [{ type: "trigram_multiplier", target: "坎", value: 2 }],
  },
  {
    id: "extra_change",
    name: "白虎命",
    description: "技能：每劫额外获得 1 次变爻机会。",
    tags: ["变爻", "操作"],
    effects: [{ type: "extra_change", value: 1 }],
  },
  {
    id: "all_bonus",
    name: "麒麟命",
    description: "技能：所有卦象分数 ×1.2。",
    tags: ["通用", "倍率"],
    effects: [{ type: "global_multiplier", value: 1.2 }],
  },
  {
    id: "lower_yang",
    name: "初阳",
    description: "技能：下爻是阳时，基础分 +35。提示：第一张牌会填下爻。",
    tags: ["阳爻", "爻位"],
    effects: [{ type: "line_bonus", index: 0, line: 1, value: 35 }],
  },
  {
    id: "lower_yin",
    name: "厚土",
    description: "技能：下爻是阴时，基础分 +35。",
    tags: ["阴爻", "爻位"],
    effects: [{ type: "line_bonus", index: 0, line: 0, value: 35 }],
  },
  {
    id: "middle_fire",
    name: "观火",
    description: "技能：中爻是阴时，基础分 +30；如果打出离卦，再 ×1.5。",
    tags: ["爆发", "爻位"],
    effects: [
      { type: "line_bonus", index: 1, line: 0, value: 30 },
      { type: "trigram_multiplier", target: "离", value: 1.5 },
    ],
  },
  {
    id: "middle_water",
    name: "临渊",
    description: "技能：中爻是阳时，基础分 +30；如果打出坎卦，再 ×1.5。",
    tags: ["风险", "爻位"],
    effects: [
      { type: "line_bonus", index: 1, line: 1, value: 30 },
      { type: "trigram_multiplier", target: "坎", value: 1.5 },
    ],
  },
  {
    id: "yang_count",
    name: "三阳开泰",
    description: "技能：每有 1 条阳爻，基础分 +18。",
    tags: ["阳爻", "稳定"],
    effects: [{ type: "count_line_bonus", line: 1, value: 18 }],
  },
  {
    id: "yin_count",
    name: "群阴归藏",
    description: "技能：每有 1 条阴爻，基础分 +18。",
    tags: ["阴爻", "稳定"],
    effects: [{ type: "count_line_bonus", line: 0, value: 18 }],
  },
  {
    id: "no_change",
    name: "无妄",
    description: "技能：不使用变爻直接结算时，基础分 +55。",
    tags: ["守成", "变爻"],
    effects: [{ type: "no_change_bonus", value: 55 }],
  },
  {
    id: "after_change",
    name: "改命",
    description: "技能：本劫使用过变爻时，分数 ×1.35。",
    tags: ["变爻", "倍率"],
    effects: [{ type: "changed_multiplier", value: 1.35 }],
  },
  {
    id: "change_bonus",
    name: "一念",
    description: "技能：本劫使用过变爻时，基础分 +45。",
    tags: ["变爻", "爆发"],
    effects: [{ type: "changed_bonus", value: 45 }],
  },
  {
    id: "first_seen",
    name: "开卷",
    description: "技能：本局第一次打出某个卦时，基础分 +60。",
    tags: ["探索", "图鉴"],
    effects: [{ type: "first_trigram_bonus", value: 60 }],
  },
  {
    id: "mixed_lines",
    name: "既济",
    description: "技能：阴阳都出现时，分数 ×1.25。",
    tags: ["平衡", "倍率"],
    effects: [{ type: "mixed_multiplier", value: 1.25 }],
  },
  {
    id: "pure_lines",
    name: "纯象",
    description: "技能：三爻全阴或全阳时，分数 ×1.5。",
    tags: ["极端", "倍率"],
    effects: [{ type: "pure_multiplier", value: 1.5 }],
  },
  {
    id: "boss_hunter",
    name: "破局",
    description: "技能：终劫分数 ×1.35。",
    tags: ["劫", "终局"],
    effects: [{ type: "boss_stage_multiplier", value: 1.35 }],
  },
];

const BOSSES = [
  {
    id: "heaven_block",
    name: "天地否劫",
    description: "乾卦得分减半",
    effect: { type: "trigram_multiplier", target: "乾", value: 0.5 },
  },
  {
    id: "double_danger",
    name: "重坎劫",
    description: "坎卦不得分",
    effect: { type: "trigram_multiplier", target: "坎", value: 0 },
  },
  {
    id: "unfinished",
    name: "未济劫",
    description: "结算前随机变动一爻",
    effect: { type: "random_change_before_score" },
  },
];

const STAGES = [
  { name: "初卦", target: 100, note: "起卦入局", trial: null },
  { name: "演卦", target: 190, note: "观察卦势", trial: null },
  { name: "小劫", target: 290, note: "天地否", trial: "heaven_block" },
  { name: "化卦", target: 420, note: "流派成形", trial: null },
  { name: "大劫", target: 560, note: "重坎", trial: "double_danger" },
  { name: "终劫", target: 700, note: "未济", trial: "unfinished" },
];
const STAGE_TARGETS = STAGES.map((stage) => stage.target);
const BOSS_STAGE = STAGE_TARGETS.length - 1;
const MAX_DESTINIES = 5;
const COLLECTION_KEY = "yishijie.collection.v1";
const COIN_KEY = "yishijie.coins.v1";
const REALM_TWO_BEST_KEY = "yishijie.realm-two-best.v1";
const DESTINY_AFFINITY = {
  qian_bonus: ["乾"],
  li_bonus: ["离"],
  kan_bonus: ["坎"],
  extra_change: ["离", "坎", "兑"],
  all_bonus: ["乾", "坤"],
  lower_yang: ["乾", "震", "离", "兑"],
  lower_yin: ["坤", "巽", "坎", "艮"],
  middle_fire: ["离"],
  middle_water: ["坎"],
  yang_count: ["乾", "震", "离", "兑"],
  yin_count: ["坤", "巽", "坎", "艮"],
  no_change: ["坤", "艮"],
  after_change: ["坎", "离", "兑"],
  change_bonus: ["离", "兑"],
  first_seen: ["震", "巽", "兑"],
  mixed_lines: ["离", "坎", "震", "巽"],
  pure_lines: ["乾", "坤"],
  boss_hunter: ["坎", "乾"],
};
const SYNERGIES = [
  {
    id: "flying_dragon",
    name: "飞龙在天",
    requires: ["qian_bonus", "yang_count"],
    description: "潜龙命与三阳开泰同时在场。打出乾卦时，额外倍率 ×1.35",
    tags: ["乾", "联动"],
    effects: [{ type: "trigram_multiplier", target: "乾", value: 1.35 }],
  },
  {
    id: "bright_fire",
    name: "明两作离",
    requires: ["li_bonus", "middle_fire"],
    description: "朱雀命与观火同时在场。打出离卦时，额外倍率 ×1.25",
    tags: ["离", "联动"],
    effects: [{ type: "trigram_multiplier", target: "离", value: 1.25 }],
  },
  {
    id: "walk_danger",
    name: "履险如夷",
    requires: ["kan_bonus", "middle_water"],
    description: "玄武命与临渊同时在场。使用过变爻后，额外倍率 ×1.2",
    tags: ["坎", "联动"],
    effects: [{ type: "changed_multiplier", value: 1.2 }],
  },
  {
    id: "holding_true",
    name: "守正",
    requires: ["no_change", "pure_lines"],
    description: "无妄与纯象同时在场。不变爻直接结算时，额外基础分 +45",
    tags: ["守成", "联动"],
    effects: [{ type: "no_change_bonus", value: 45 }],
  },
];
const GUIDE_STEPS = [
  {
    focus: "hand",
    title: "先看手牌",
    copy: "每一轮会抽 5 张阴阳牌。阳爻是实线，阴爻是断线。你要从里面选 3 张",
  },
  {
    focus: "selected",
    title: "从下往上成卦",
    copy: "第一张牌填下爻，第二张填中爻，第三张填上爻。先把三个位置填满",
  },
  {
    focus: "selected",
    title: "点击爻位可以变爻",
    copy: "选满三爻后，点任意一爻会反转阴阳。一次变爻常常能把普通卦变成高分卦",
  },
  {
    focus: "score",
    title: "看预计结算",
    copy: "这里会显示当前卦象、基础分、命格倍率和最终得分。达到目标就能进入下一劫",
  },
  {
    focus: "side",
    title: "命格决定流派",
    copy: "左侧是本局命格。命格不是单纯加分，它们会互相联动，逐渐形成离火流、坎水流、守成流",
  },
  {
    focus: "trial",
    title: "留意劫象",
    copy: "小劫、大劫、终劫会改变某些卦的命运。不是所有高分路线都能一路走到底",
  },
  {
    focus: "settle",
    title: "结算本劫",
    copy: "准备好后点结算。通过后选择奖励，奖励会更倾向于你本局常用的卦象",
  },
];
const TUTORIAL_STEPS = [
  {
    title: "先选下爻",
    copy: "每劫抽 5 张阴阳牌。选第一张会填到最下面的下爻，再填中爻，最后填上爻。",
    demo: "lines",
  },
  {
    title: "三爻成卦",
    copy: "三张牌排好后会组成一个八卦。不同卦象有不同基础分，达到目标就能过关。",
    demo: "trigram",
  },
  {
    title: "变一爻改局",
    copy: "选满三爻后，可以点击任意一爻反转阴阳。用它凑高分，或者避开劫象克制。",
    demo: "change",
  },
  {
    title: "结算赚铜钱",
    copy: "每过一关选择奖励来构筑流派；一局结束后按表现获得铜钱，用于之后的符咒、替命与问卦。",
    demo: "destiny",
  },
];
const app = document.getElementById("app");

let state = freshState();

function freshState() {
  return {
    screen: "start",
    stage: 0,
    hand: [],
    selected: [],
    baseChanges: 1,
    changesUsed: 0,
    destinies: [],
    rewards: [],
    notice: "",
    bestScore: 0,
    lastScore: 0,
    lastBreakdown: null,
    playedTrigrams: [],
    discoveredThisRun: [],
    treasury: loadCoins(),
    runCoinsEarned: 0,
    openHintKey: null,
    guideActive: false,
    guideStep: 0,
    realmTwo: {
      scenarioIndex: 0,
      phase: "compose",
      inner: null,
      outer: null,
      score: 0,
      lastResult: null,
    },
    realmTwoBest: loadRealmTwoBest(),
    result: null,
    collection: loadCollection(),
    returnScreen: "start",
  };
}

function loadCollection() {
  try {
    return JSON.parse(localStorage.getItem(COLLECTION_KEY)) || {};
  } catch {
    return {};
  }
}

function saveCollection(collection) {
  localStorage.setItem(COLLECTION_KEY, JSON.stringify(collection));
}

function loadCoins() {
  try {
    return Number(localStorage.getItem(COIN_KEY)) || 0;
  } catch {
    return 0;
  }
}

function saveCoins(value) {
  localStorage.setItem(COIN_KEY, String(value));
}

function loadRealmTwoBest() {
  try {
    return Number(localStorage.getItem(REALM_TWO_BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}

function saveRealmTwoBest(value) {
  localStorage.setItem(REALM_TWO_BEST_KEY, String(value));
}

function sample(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function weightedSample(items, count, getWeight) {
  const pool = [...items];
  const picks = [];
  while (pool.length && picks.length < count) {
    const weighted = pool.map((item) => Math.max(1, getWeight(item)));
    const total = weighted.reduce((sum, weight) => sum + weight, 0);
    let roll = Math.random() * total;
    const index = weighted.findIndex((weight) => {
      roll -= weight;
      return roll <= 0;
    });
    picks.push(...pool.splice(index === -1 ? pool.length - 1 : index, 1));
  }
  return picks;
}

function drawYinYangCards(count) {
  return Array.from({ length: count }, (_, index) => ({
    id: `${Date.now()}-${index}-${Math.random().toString(16).slice(2)}`,
    line: Math.random() > 0.5 ? 1 : 0,
  }));
}

function getTrigramFromLines(lines) {
  if (lines.length !== 3) return null;
  return TRIGRAMS[lines.join("")];
}

function getHexagramFromTrigrams(innerPattern, outerPattern) {
  if (!innerPattern || !outerPattern) return null;
  return HEXAGRAMS[`${innerPattern}${outerPattern}`] || null;
}

function getCurrentRealmTwoScenario() {
  return REALM_TWO_SCENARIOS[state.realmTwo.scenarioIndex] || null;
}

function startRealmTwo() {
  state = {
    ...freshState(),
    screen: "realm-two",
  };
  render();
}

function selectRealmTwoTrigram(position, pattern) {
  if (state.realmTwo.phase !== "compose" || !TRIGRAMS[pattern]) return;
  state.realmTwo[position] = pattern;
  render();
}

function confirmRealmTwoHexagram() {
  if (state.realmTwo.phase !== "compose") return;
  const hexagram = getHexagramFromTrigrams(state.realmTwo.inner, state.realmTwo.outer);
  if (!hexagram) return;
  discoverHexagram(hexagram);
  state.realmTwo.phase = "judge";
  render();
}

function judgeRealmTwo(action) {
  if (state.realmTwo.phase !== "judge") return;
  const scenario = getCurrentRealmTwoScenario();
  const selected = getHexagramFromTrigrams(state.realmTwo.inner, state.realmTwo.outer);
  const expected = getHexagramFromTrigrams(scenario.inner, scenario.outer);
  const hexagramPoints = selected?.name === expected?.name ? 60 : 0;
  const actionPoints = action === scenario.action ? 40 : 0;
  state.realmTwo.score += hexagramPoints + actionPoints;
  state.realmTwo.lastResult = {
    action,
    selected,
    expected,
    hexagramPoints,
    actionPoints,
  };
  state.realmTwo.phase = "feedback";
  render();
}

function advanceRealmTwo() {
  if (state.realmTwo.phase !== "feedback") return;
  if (state.realmTwo.scenarioIndex >= REALM_TWO_SCENARIOS.length - 1) {
    state.realmTwo.phase = "complete";
    state.realmTwoBest = Math.max(state.realmTwoBest, state.realmTwo.score);
    saveRealmTwoBest(state.realmTwoBest);
    render();
    return;
  }
  state.realmTwo.scenarioIndex += 1;
  state.realmTwo.phase = "compose";
  state.realmTwo.inner = null;
  state.realmTwo.outer = null;
  state.realmTwo.lastResult = null;
  render();
}

function getStageInfo(index = state.stage) {
  return STAGES[index] || STAGES[STAGES.length - 1];
}

function getStageTrial(index = state.stage) {
  const trial = getStageInfo(index).trial;
  return trial ? BOSSES.find((item) => item.id === trial) : null;
}

function getNextStageTrial(index = state.stage) {
  return STAGES.slice(index + 1).map((stage) => (stage.trial ? BOSSES.find((item) => item.id === stage.trial) : null)).find(Boolean);
}

function getStageProgress(index = state.stage) {
  return `${index + 1} / ${STAGES.length}`;
}

function flipLine(lines, index) {
  return lines.map((line, lineIndex) => (lineIndex === index ? 1 - line : line));
}

function getTotalChanges() {
  const destinyChanges = state.destinies.reduce((total, destiny) => {
    return getDestinyEffects(destiny).reduce((sum, effect) => {
      return effect.type === "extra_change" ? sum + effect.value : sum;
    }, total);
  }, 0);
  return state.baseChanges + destinyChanges;
}

function getDestinyEffects(destiny) {
  if (Array.isArray(destiny.effects)) return destiny.effects;
  if (destiny.effect) return [destiny.effect];
  return [];
}

function getActiveSynergies(destinies = state.destinies) {
  const ids = new Set(destinies.map((destiny) => destiny.id));
  return SYNERGIES.filter((synergy) => synergy.requires.every((id) => ids.has(id)));
}

function formatMultiplier(value) {
  return `×${Number(value).toFixed(2).replace(/\.?0+$/, "")}`;
}

function lineName(line) {
  return line ? "阳" : "阴";
}

function linePositionName(index) {
  return ["下爻", "中爻", "上爻"][index];
}

function applyScoreEffect(effect, context, detailName) {
  const { trigram, lines, changesUsed, bossEnabled, playedTrigrams } = context;
  const count = lines.filter((line) => line === effect.line).length;
  if (effect.type === "trigram_multiplier" && effect.target === trigram.name) {
    return { add: 0, multiply: effect.value, text: `${detailName}：${trigram.name}卦 ${formatMultiplier(effect.value)}` };
  }
  if (effect.type === "global_multiplier") {
    return { add: 0, multiply: effect.value, text: `${detailName}：全局 ${formatMultiplier(effect.value)}` };
  }
  if (effect.type === "line_bonus" && lines[effect.index] === effect.line) {
    return { add: effect.value, multiply: 1, text: `${detailName}：${linePositionName(effect.index)}为${lineName(effect.line)} +${effect.value}` };
  }
  if (effect.type === "count_line_bonus" && count > 0) {
    return { add: count * effect.value, multiply: 1, text: `${detailName}：${lineName(effect.line)}爻 ${count} 条 +${count * effect.value}` };
  }
  if (effect.type === "no_change_bonus" && changesUsed === 0) {
    return { add: effect.value, multiply: 1, text: `${detailName}：未变爻 +${effect.value}` };
  }
  if (effect.type === "changed_bonus" && changesUsed > 0) {
    return { add: effect.value, multiply: 1, text: `${detailName}：已变爻 +${effect.value}` };
  }
  if (effect.type === "changed_multiplier" && changesUsed > 0) {
    return { add: 0, multiply: effect.value, text: `${detailName}：已变爻 ${formatMultiplier(effect.value)}` };
  }
  if (effect.type === "first_trigram_bonus" && !playedTrigrams.includes(trigram.name)) {
    return { add: effect.value, multiply: 1, text: `${detailName}：本局首次打出${trigram.name} +${effect.value}` };
  }
  if (effect.type === "mixed_multiplier" && lines.includes(0) && lines.includes(1)) {
    return { add: 0, multiply: effect.value, text: `${detailName}：阴阳并见 ${formatMultiplier(effect.value)}` };
  }
  if (effect.type === "pure_multiplier" && lines.every((line) => line === lines[0])) {
    return { add: 0, multiply: effect.value, text: `${detailName}：三爻同象 ${formatMultiplier(effect.value)}` };
  }
  if (effect.type === "boss_stage_multiplier" && bossEnabled) {
    return { add: 0, multiply: effect.value, text: `${detailName}：终劫 ${formatMultiplier(effect.value)}` };
  }
  return null;
}

function calculateScore(trigram, options = {}) {
  if (!trigram) return { score: 0, base: 0, additive: 0, multiplier: 1, details: [] };
  const trial = options.boss || getStageTrial(state.stage);
  const context = {
    trigram,
    lines: options.lines || state.selected,
    changesUsed: options.changesUsed ?? state.changesUsed,
    boss: trial,
    bossEnabled: options.bossEnabled ?? Boolean(trial),
    playedTrigrams: options.playedTrigrams || state.playedTrigrams,
  };
  let additive = 0;
  let multiplier = 1;
  const details = [];

  state.destinies.forEach((destiny) => {
    getDestinyEffects(destiny).forEach((effect) => {
      const applied = applyScoreEffect(effect, context, destiny.name);
      if (!applied) return;
      additive += applied.add;
      multiplier *= applied.multiply;
      details.push(applied.text);
    });
  });

  getActiveSynergies().forEach((synergy) => {
    getDestinyEffects(synergy).forEach((effect) => {
      const applied = applyScoreEffect(effect, context, synergy.name);
      if (!applied) return;
      additive += applied.add;
      multiplier *= applied.multiply;
      details.push(applied.text);
    });
  });

  const boss = context.boss;
  if (context.bossEnabled && boss?.effect.type === "trigram_multiplier" && boss.effect.target === trigram.name) {
    multiplier *= boss.effect.value;
    details.push(`${boss.name}：${trigram.name}卦 ${formatMultiplier(boss.effect.value)}`);
  }

  const score = Math.round((trigram.score + additive) * multiplier);
  return { score, base: trigram.score, additive, multiplier, details };
}

function getCurrentTrigram() {
  return getTrigramFromLines(state.selected);
}

function startGame() {
  const startingDestinies = shuffle(DESTINIES).slice(0, 2);
  state = {
    ...freshState(),
    screen: "game",
    stage: 0,
    destinies: startingDestinies,
    notice: `开局命格：${startingDestinies.map((destiny) => destiny.name).join("、")}`,
  };
  discoverDestinies(startingDestinies);
  beginStage();
}

function startGuideRun() {
  startGame();
  state.guideActive = true;
  state.guideStep = 0;
  state.notice = "引导试玩已开始。跟着提示点一轮，就能理解基本操作";
  render();
}

function beginStage() {
  state.hand = drawYinYangCards(5);
  state.selected = [];
  state.changesUsed = 0;
  if (!state.notice) state.notice = `${getStageInfo().name}开始，选三爻成卦`;
  render();
}

function selectCard(cardId) {
  if (state.selected.length >= 3) return;
  const card = state.hand.find((item) => item.id === cardId);
  if (!card) return;
  state.selected.push(card.line);
  state.hand = state.hand.filter((item) => item.id !== cardId);
  state.notice = state.selected.length === 3 ? "可点击已选爻位进行变爻，或直接结算。" : "继续选择下一爻。";
  if (state.guideActive && state.guideStep < 2 && state.selected.length === 3) state.guideStep = 2;
  render();
}

function removeSelected(index) {
  const [line] = state.selected.splice(index, 1);
  state.hand.push({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    line,
  });
  state.notice = "已撤回一爻，可以重新选择。";
  render();
}

function changeLine(index) {
  if (state.selected.length !== 3) return;
  if (state.changesUsed >= getTotalChanges()) {
    state.notice = "本劫变爻次数已经用完";
    render();
    return;
  }
  state.selected = flipLine(state.selected, index);
  state.changesUsed += 1;
  const trigram = getCurrentTrigram();
  state.notice = `${["下爻", "中爻", "上爻"][index]}已变，现在是${trigram.name}卦。`;
  if (state.guideActive && state.guideStep < 3) state.guideStep = 3;
  render();
}

function settleStage() {
  if (state.selected.length !== 3) {
    state.notice = "需要先选满三爻。";
    render();
    return;
  }

  let finalLines = [...state.selected];
  let bossNote = "";
  const trial = getStageTrial();
  if (trial?.effect.type === "random_change_before_score") {
    const index = Math.floor(Math.random() * 3);
    finalLines = flipLine(finalLines, index);
    bossNote = ` ${trial.name}扰动了${["下爻", "中爻", "上爻"][index]}`;
  }

  const trigram = getTrigramFromLines(finalLines);
  const scoreResult = calculateScore(trigram, {
    lines: finalLines,
    boss: trial,
    bossEnabled: Boolean(trial),
    changesUsed: state.changesUsed,
  });
  const { score } = scoreResult;
  state.lastScore = score;
  state.lastBreakdown = scoreResult;
  state.bestScore = Math.max(state.bestScore, score);
  state.playedTrigrams.push(trigram.name);
  discoverTrigram(trigram, score);

  if (score >= STAGE_TARGETS[state.stage]) {
    if (state.stage === BOSS_STAGE) {
      state.guideActive = false;
      finishRun(true, `终劫达成 ${score} 分${bossNote}`);
      return;
    }
    state.notice = `${trigram.name}卦结算 ${score} 分，通过${getStageInfo().name}${bossNote}`;
    state.rewards = generateRewards();
    state.screen = "reward";
    state.guideActive = false;
    render();
    return;
  }

  state.guideActive = false;
  finishRun(false, `${trigram.name}卦结算 ${score} 分，未达到${getStageInfo().name}目标 ${STAGE_TARGETS[state.stage]}${bossNote}`);
}

function discoverTrigram(trigram, score) {
  const current = state.collection[trigram.name];
  if (!current && !state.discoveredThisRun.includes(trigram.name)) {
    state.discoveredThisRun.push(trigram.name);
  }
  state.collection[trigram.name] = {
    highestScore: Math.max(current?.highestScore || 0, score),
  };
  saveCollection(state.collection);
}

function discoverDestiny(destiny) {
  state.collection.destinies = state.collection.destinies || {};
  state.collection.destinies[destiny.id] = {
    name: destiny.name,
    firstSeenAt: state.collection.destinies[destiny.id]?.firstSeenAt || Date.now(),
  };
  saveCollection(state.collection);
}

function discoverDestinies(destinies) {
  destinies.forEach(discoverDestiny);
}

function discoverHexagram(hexagram) {
  state.collection.hexagrams = state.collection.hexagrams || {};
  state.collection.hexagrams[hexagram.name] = {
    id: hexagram.id,
    firstSeenAt: state.collection.hexagrams[hexagram.name]?.firstSeenAt || Date.now(),
  };
  saveCollection(state.collection);
}

function getDestinyWeight(destiny) {
  const affinity = DESTINY_AFFINITY[destiny.id] || [];
  if (!affinity.length || !state.playedTrigrams.length) return 1;
  const countBonus = state.playedTrigrams.reduce((total, name) => total + (affinity.includes(name) ? 2 : 0), 0);
  const lastBonus = affinity.includes(state.playedTrigrams.at(-1)) ? 3 : 0;
  return 1 + countBonus + lastBonus;
}

function getRewardKind(destiny) {
  return getDestinyWeight(destiny) > 1 ? "顺势命格" : "新命格";
}

function generateRewards() {
  const missingDestinies = DESTINIES.filter((destiny) => {
    return !state.destinies.some((owned) => owned.id === destiny.id);
  });
  const destinyOptions = weightedSample(missingDestinies, Math.min(2, missingDestinies.length), getDestinyWeight)
    .slice(0, Math.min(2, missingDestinies.length))
    .map((destiny) => ({
      type: "destiny",
      kind: getRewardKind(destiny),
      name: destiny.name,
      description: destiny.description,
      tags: getDestinyWeight(destiny) > 1 ? ["顺势", ...destiny.tags.filter((tag) => tag !== "顺势")] : destiny.tags,
      destiny,
    }));

  const rewards = [
    ...destinyOptions,
    {
      type: "change",
      kind: "变爻",
      name: "多一念",
      description: "本局每劫永久增加 1 次变爻机会",
      tags: ["变爻", "操作"],
    },
  ];

  while (rewards.length < 3) {
    rewards.push({
      type: "change",
      kind: "变爻",
      name: `再起一念 ${rewards.length}`,
      description: "本局每劫永久增加 1 次变爻机会",
      tags: ["变爻", "操作"],
    });
  }

  return shuffle(rewards).slice(0, 3);
}

function chooseReward(index) {
  const reward = state.rewards[index];
  if (!reward) return;
  if (reward.type === "destiny" && state.destinies.length < MAX_DESTINIES) {
    const before = getActiveSynergies(state.destinies).map((synergy) => synergy.id);
    state.destinies.push(reward.destiny);
    discoverDestiny(reward.destiny);
    const unlocked = getActiveSynergies(state.destinies).find((synergy) => !before.includes(synergy.id));
    state.notice = unlocked ? `获得命格：${reward.destiny.name}，联动觉醒：${unlocked.name}` : `获得命格：${reward.destiny.name}`;
  } else if (reward.type === "destiny") {
    state.baseChanges += 1;
    state.notice = "命格已满，转化为额外变爻次数";
  } else {
    state.baseChanges += 1;
    state.notice = "变爻次数 +1";
  }
  state.stage += 1;
  state.screen = "game";
  beginStage();
}

function calculateCoinReward(victory) {
  const reached = state.stage + 1;
  const stageCoins = reached * 2;
  const scoreCoins = Math.floor(state.bestScore / 100);
  const discoveryCoins = state.discoveredThisRun.length * 3;
  const victoryCoins = victory ? 8 : 0;
  return {
    stageCoins,
    scoreCoins,
    discoveryCoins,
    victoryCoins,
    total: stageCoins + scoreCoins + discoveryCoins + victoryCoins,
  };
}

function finishRun(victory, message) {
  const coinReward = calculateCoinReward(victory);
  state.runCoinsEarned = coinReward.total;
  state.treasury += coinReward.total;
  saveCoins(state.treasury);
  state.result = { victory, message, coinReward };
  state.screen = "result";
  render();
}

function showScreen(screen) {
  if (screen === "collection" && state.screen !== "collection") {
    state.returnScreen = state.screen;
  }
  state.screen = screen;
  render();
}

function showTutorial() {
  state.returnScreen = state.screen === "game" ? "game" : "start";
  state.screen = "tutorial";
  render();
}

function leaveTemporaryScreen() {
  state.screen = state.returnScreen === "game" ? "game" : "start";
  render();
}

function resetCollection() {
  localStorage.removeItem(COLLECTION_KEY);
  state.collection = {};
  render();
}

function nextGuideStep() {
  if (!state.guideActive) return;
  if (state.guideStep >= GUIDE_STEPS.length - 1) {
    state.guideActive = false;
  } else {
    state.guideStep += 1;
  }
  render();
}

function closeGuide() {
  state.guideActive = false;
  render();
}

function lineMarkup(line) {
  return `<span class="${line ? "yang-line" : "yin-line"}"></span>`;
}

function renderLineGlyph(line) {
  return `<span class="line-glyph">${lineMarkup(line)}</span>`;
}

function trimEndingPunctuation(text) {
  return text.trim().replace(/[。.]$/u, "");
}

function renderDescription(text, className = "mini-copy", hintKey = "") {
  const [main, hint] = text.split("提示：");
  const isOpen = hintKey && state.openHintKey === hintKey;
  const cleanHint = hint ? trimEndingPunctuation(hint) : "";
  return `
    <p class="${className}">${trimEndingPunctuation(main)}</p>
    ${
      hint
        ? `<span class="oracle-toggle ${isOpen ? "active" : ""}" data-action="toggle-oracle" data-hint-key="${hintKey}" aria-label="问卦" title="问卦">
            <span class="hint-bulb" aria-hidden="true"></span>
          </span>
          ${
            isOpen
              ? `<div class="oracle-hint" data-action="toggle-oracle" data-hint-key="${hintKey}">
                  <strong>问卦</strong>
                  <span>${cleanHint}</span>
                </div>`
              : ""
          }`
        : ""
    }
  `;
}

function renderTopbar() {
  return `
    <header class="topbar">
      <div class="brand">
        <div class="brand-mark">易</div>
        <div class="brand-text">
          <h1 class="brand-name">易世界</h1>
          <p class="brand-subtitle">抽取阴阳，组成卦象，改变一爻，改写命运。</p>
        </div>
      </div>
      <div class="top-actions">
        <span class="coin-chip">铜钱 ${state.treasury}</span>
        <button class="btn icon-btn" data-action="tutorial" aria-label="新手教程" title="新手教程">?</button>
        <button class="btn" data-action="realm-two">第二境</button>
        <button class="btn" data-action="collection">图鉴</button>
        <button class="btn primary" data-action="new-game">新局</button>
      </div>
    </header>
  `;
}

function renderStart() {
  return `
    <main class="screen active">
      <div class="start-layout">
        <section class="ink-board" aria-label="易世界开始">
          <div class="board-content">
            <div class="hero-gua">
              <div class="big-symbol">☲</div>
              <h2 class="hero-title">在阴阳流转中，构筑你的卦象体系。</h2>
              <p class="hero-copy">从最基础的阴阳爻开始，通过抽取、组合与变爻，创造属于这一局的变化路线。</p>
            </div>
            <div class="action-row">
              <button class="btn gold" data-action="new-game">开始一局</button>
              <button class="btn primary" data-action="realm-two">进入第二境</button>
              <button class="btn subtle" data-action="tutorial">新手教程</button>
              <button class="btn" data-action="collection">查看图鉴</button>
            </div>
          </div>
        </section>
        <aside class="start-panel">
          <div class="intro-kicker">阴阳生八卦，变化衍万象</div>
          <h2 class="screen-title">易世界</h2>
          <div class="intro-copy">
            <p>在《易世界》中，万物都由阴与阳构成。从天地运行到四季更替，世间的一切变化，都源于最初的两种力量。</p>
            <p>它们彼此交融，彼此转化，演化出八卦，衍生出万象。而你，将成为变化的掌控者。</p>
            <p>看似简单的一次变化，可能让平凡的卦象蜕变为强大的组合；一次关键的变爻，也可能彻底改变整局游戏的走向。</p>
          </div>
          <div class="start-divider"></div>
          <h3 class="intro-heading">游戏玩法</h3>
          <div class="feature-grid">
            <article class="feature-card">
              <span>01</span>
              <h4>阴阳生八卦</h4>
              <p>阳爻与阴爻是最基础的资源。按下、中、上三爻排列，形成乾、坤、震、巽、坎、离、艮、兑八种基础卦象。</p>
            </article>
            <article class="feature-card">
              <span>02</span>
              <h4>变爻系统</h4>
              <p>你可以在关键时刻改变卦中的某一爻。同样的起点，可能因为一次变爻演化出完全不同的结果。</p>
            </article>
            <article class="feature-card">
              <span>03</span>
              <h4>命格构筑</h4>
              <p>冒险中获得的命格会永久改变规则：强化卦象、增加变爻、改变得分方式，并产生联动流派。</p>
            </article>
            <article class="feature-card">
              <span>04</span>
              <h4>发现与轮回</h4>
              <p>从八卦开始，逐渐发现隐藏组合、特殊变化与神秘路线。有些秘密，需要多次轮回才能揭开。</p>
            </article>
            <article class="feature-card feature-card-wide">
              <span>第二境 · 已开放</span>
              <h4>六十四卦</h4>
              <p>熟悉八卦之后，游戏会进入上下卦组合的阶段。两个八卦相叠，形成六十四卦，并引出更具体的事态、转机与故事判断。</p>
            </article>
          </div>
          <p class="intro-closing">在这里，没有固定的套路。因为每一个卦，都能够变化；每一次变化，都可能诞生新的可能。</p>
        </aside>
      </div>
    </main>
  `;
}

function renderTutorialDemo(type) {
  if (type === "lines") {
    return `
      <div class="tutorial-stack">
        <div class="tutorial-line empty">上爻</div>
        <div class="tutorial-line empty">中爻</div>
        <div class="tutorial-line active">${renderLineGlyph(1)}<span>第 1 张填这里</span></div>
      </div>
    `;
  }
  if (type === "trigram") {
    return `
      <div class="tutorial-gua">
        <p class="tutorial-symbol">☲</p>
        <strong>离卦</strong>
        <span>火 · 130 分</span>
      </div>
    `;
  }
  if (type === "change") {
    return `
      <div class="tutorial-change">
        <div>${renderLineGlyph(1)}<span>阳</span></div>
        <strong>变</strong>
        <div>${renderLineGlyph(0)}<span>阴</span></div>
      </div>
    `;
  }
  return `
    <div class="tutorial-reward">
      <span class="reward-kind">命格</span>
      <strong>朱雀命</strong>
      <p>离卦得分 ×2</p>
    </div>
  `;
}

function renderTutorial() {
  return `
    <main class="screen active">
      <section class="tutorial-panel">
        <div class="tutorial-head">
          <div>
            <h2 class="screen-title">新手教程</h2>
            <p class="screen-copy">初入易世界，只需记住一件事：先从最下面的下爻开始选，凑出卦象后再决定要不要变爻。</p>
          </div>
          <div class="action-row">
            <button class="btn" data-action="back-temp">返回</button>
            <button class="btn gold" data-action="tutorial-guide">引导试玩</button>
            <button class="btn primary" data-action="new-game">开始一局</button>
          </div>
        </div>
        <section class="guided-preview">
          <div>
            <span class="reward-kind">推荐第一次游玩</span>
            <h3>跟着一局走完</h3>
            <p>进入引导试玩后，页面会压暗，只高亮当前要看的区域。你会依次认识手牌、三爻、变爻、命格、劫象和结算按钮</p>
          </div>
          <button class="btn primary" data-action="tutorial-guide">开始引导</button>
        </section>
        <div class="tutorial-grid">
          ${TUTORIAL_STEPS.map(
            (step, index) => `
              <article class="tutorial-step">
                <div class="tutorial-demo">${renderTutorialDemo(step.demo)}</div>
                <span class="tutorial-index">${index + 1}</span>
                <h3>${step.title}</h3>
                <p>${step.copy}</p>
              </article>
            `,
          ).join("")}
        </div>
      </section>
    </main>
  `;
}

function renderGuideLayer() {
  if (!state.guideActive) return "";
  const step = GUIDE_STEPS[state.guideStep] || GUIDE_STEPS[GUIDE_STEPS.length - 1];
  return `
    <div class="guide-card">
      <span class="reward-kind">引导 ${state.guideStep + 1} / ${GUIDE_STEPS.length}</span>
      <h3>${step.title}</h3>
      <p>${step.copy}</p>
      <div class="action-row">
        <button class="btn subtle" data-action="guide-close">退出引导</button>
        <button class="btn primary" data-action="guide-next">${state.guideStep >= GUIDE_STEPS.length - 1 ? "知道了" : "下一步"}</button>
      </div>
    </div>
  `;
}

function renderGame() {
  const trigram = getCurrentTrigram();
  const score = calculateScore(trigram);
  const stageInfo = getStageInfo();
  const target = stageInfo.target;
  const trial = getStageTrial();
  const nextTrial = getNextStageTrial();
  const activeSynergies = getActiveSynergies();
  const guideStep = GUIDE_STEPS[state.guideStep] || GUIDE_STEPS[GUIDE_STEPS.length - 1];
  const guideFocus = state.guideActive ? guideStep.focus : "";
  const focusClass = (name) => (guideFocus === name ? "guided-focus" : "");
  const selectedSlots = [2, 1, 0]
    .map((lineIndex) => {
      const line = state.selected[lineIndex];
      const labels = ["下爻", "中爻", "上爻"];
      if (line === undefined) return `<button class="selected-line empty" disabled>${labels[lineIndex]}</button>`;
      return `
        <button class="selected-line ${line ? "yang" : "yin"}" data-action="change-line" data-index="${lineIndex}" title="点击变爻">
          ${renderLineGlyph(line)}
          <span class="card-caption">${labels[lineIndex]} · 点击变爻</span>
        </button>
      `;
    })
    .join("");

  return `
    <main class="screen active ${state.guideActive ? "guided-screen" : ""}">
      <div class="game-grid">
        <aside class="side-panel ${focusClass("side")}">
          <section>
            <h2 class="section-title">本局命格 <span class="pill">${state.destinies.length} / ${MAX_DESTINIES}</span></h2>
            <div class="destiny-list">
              ${state.destinies.map(renderMiniCard).join("")}
            </div>
          </section>
          <section>
            <h2 class="section-title">命格联动 <span class="pill">${activeSynergies.length}</span></h2>
            <div class="destiny-list">
              ${
                activeSynergies.length
                  ? activeSynergies.map(renderMiniCard).join("")
                  : `<div class="mini-card"><p class="mini-title">尚未觉醒</p><p class="mini-copy">某些命格同时出现，会触发隐藏联动</p></div>`
              }
            </div>
          </section>
          <section>
            <h2 class="section-title">劫</h2>
            <div class="boss-box ${focusClass("trial")}">
              ${
                trial
                  ? renderMiniCard(trial)
                  : `<div class="mini-card"><p class="mini-title">${stageInfo.name}</p><p class="mini-copy">当前无劫象。下一次劫象：${nextTrial ? `${nextTrial.name}，${nextTrial.description}` : "暂无"}</p></div>`
              }
            </div>
          </section>
          <section>
            <h2 class="section-title">本局记录</h2>
            <div class="mini-card">
              <p class="mini-title">最高单次 ${state.bestScore}</p>
              <p class="mini-copy">新发现：${state.discoveredThisRun.length ? state.discoveredThisRun.join("、") : "暂无"}</p>
            </div>
          </section>
        </aside>
        <section class="play-area">
          <div class="stat-row ${focusClass("stage")}">
            <div class="stat"><span class="label">劫程</span><strong class="value">${stageInfo.name}</strong></div>
            <div class="stat"><span class="label">目标</span><strong class="value">${target}</strong></div>
            <div class="stat"><span class="label">变爻</span><strong class="value">${getTotalChanges() - state.changesUsed} / ${getTotalChanges()}</strong></div>
          </div>
          <section class="${focusClass("hand")}">
            <h2 class="section-title">手牌 <span class="pill">按下中上顺序选</span></h2>
            <div class="cards-row">
              ${state.hand
                .map(
                  (card) => `
                  <button class="card-button ${card.line ? "yang" : "yin"}" data-action="select-card" data-id="${card.id}" ${state.selected.length >= 3 ? "disabled" : ""}>
                    ${renderLineGlyph(card.line)}
                    <span class="card-caption">${card.line ? "阳爻" : "阴爻"}</span>
                  </button>
                `,
                )
                .join("")}
            </div>
          </section>
          <section class="${focusClass("selected")}">
            <h2 class="section-title">当前三爻 <span class="pill">下爻 → 上爻</span></h2>
            <div class="selected-row">${selectedSlots}</div>
          </section>
          <section class="trigram-zone ${focusClass("score")}">
            <div class="trigram-display">
              ${
                trigram
                  ? `<div><p class="trigram-symbol">${trigram.symbol}</p><p class="trigram-name">${trigram.name}</p><p class="trigram-meaning">${trigram.meaning} · ${trigram.description}</p></div>`
                  : `<div><p class="trigram-symbol">☷</p><p class="trigram-name">待成卦</p><p class="trigram-meaning">选满三爻后显示</p></div>`
              }
            </div>
            <div class="score-box ${focusClass("settle")}">
              <div>
                <span class="label">预计结算</span>
                <p class="score-number">${score.score}</p>
                <p class="score-detail">${
                  trigram
                    ? `${score.base} 基础分${score.additive ? ` + ${score.additive}` : ""}，最终倍率 ${formatMultiplier(score.multiplier)}`
                    : "命格与劫象会改变最终倍率。"
                }</p>
                ${
                  trigram && score.details.length
                    ? `<div class="breakdown-list">${score.details.map((detail) => `<span>${detail}</span>`).join("")}</div>`
                    : `<div class="breakdown-list muted"><span>${trigram ? "暂无命格触发。" : "选满三爻后显示触发明细。"}</span></div>`
                }
              </div>
              <div class="action-row">
                <button class="btn primary" data-action="settle" ${state.selected.length !== 3 ? "disabled" : ""}>结算本劫</button>
                <button class="btn" data-action="redraw">重开本局</button>
              </div>
            </div>
          </section>
          <p class="notice ${state.notice.includes("未达到") ? "fail" : ""}">${state.notice}</p>
        </section>
      </div>
      ${renderGuideLayer()}
    </main>
  `;
}

function renderMiniCard(item) {
  const hintKey = `mini-${item.id || item.name}`;
  return `
    <div class="mini-card">
      <p class="mini-title">${item.name}</p>
      ${item.tags ? `<div class="tag-row">${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>` : ""}
      ${renderDescription(item.description, "mini-copy", hintKey)}
    </div>
  `;
}

function renderReward() {
  const nextStage = getStageInfo(state.stage + 1);
  return `
    <main class="screen active">
      <section class="collection-panel">
        <div class="collection-head">
          <div>
            <h2 class="screen-title">选择奖励</h2>
            <p class="screen-copy">${state.notice}</p>
          </div>
          <span class="pill">下一劫：${nextStage.name} · ${getStageProgress(state.stage + 1)}</span>
        </div>
        <div class="reward-grid">
          ${state.rewards
            .map(
              (reward, index) => `
                <button class="reward-option" data-action="choose-reward" data-index="${index}">
                  <span class="reward-kind">${reward.kind}</span>
                  <h3 class="reward-name">${reward.name}</h3>
                  ${reward.tags ? `<div class="tag-row">${reward.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>` : ""}
                  ${renderDescription(reward.description, "reward-copy", `reward-${index}-${reward.name}`)}
                </button>
              `,
            )
            .join("")}
        </div>
      </section>
    </main>
  `;
}

function getHexagramFullName(hexagram) {
  if (!hexagram) return "待成卦";
  return `${hexagram.outer.meaning}${hexagram.inner.meaning}${hexagram.name}`;
}

function renderHexagramLines(hexagram) {
  if (!hexagram) {
    return Array.from({ length: 6 }, () => `<span class="hexagram-line empty"></span>`).join("");
  }
  return [...hexagram.lines]
    .reverse()
    .map((line, index) => `<span class="hexagram-line ${index === 3 ? "inner-boundary" : ""}">${lineMarkup(Number(line))}</span>`)
    .join("");
}

function renderTrigramPicker(position, selectedPattern, disabled = false) {
  const label = position === "inner" ? "内卦 · 在下" : "外卦 · 在上";
  return `
    <section class="trigram-picker ${disabled ? "disabled" : ""}">
      <div class="picker-title">
        <strong>${label}</strong>
        <span>${position === "inner" ? "事情的根基" : "外部的形势"}</span>
      </div>
      <div class="trigram-choice-grid">
        ${TRIGRAM_ORDER.map((pattern) => {
          const trigram = TRIGRAMS[pattern];
          return `
            <button
              class="trigram-choice ${selectedPattern === pattern ? "selected" : ""}"
              data-action="select-realm-two-trigram"
              data-position="${position}"
              data-pattern="${pattern}"
              ${disabled ? "disabled" : ""}
              aria-pressed="${selectedPattern === pattern}"
            >
              <span class="choice-symbol">${trigram.symbol}</span>
              <span class="choice-name">${trigram.name}</span>
              <span class="choice-meaning">${trigram.meaning}</span>
            </button>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function renderRealmTwoFeedback(scenario, result) {
  const hexagramCorrect = result.hexagramPoints > 0;
  const actionCorrect = result.actionPoints > 0;
  const guidance = result.expected.guidance;
  return `
    <section class="realm-feedback" aria-live="polite">
      <div class="feedback-verdict ${hexagramCorrect && actionCorrect ? "success" : "partial"}">
        <span>${result.hexagramPoints + result.actionPoints} / 100</span>
        <strong>${hexagramCorrect && actionCorrect ? "得其象，也得其时" : "卦象已经显现，再看其中的时势"}</strong>
      </div>
      <div class="feedback-grid">
        <div>
          <span class="feedback-label">你得到</span>
          <strong>${getHexagramFullName(result.selected)}</strong>
          <p>${hexagramCorrect ? "上下卦判断正确" : `此题应为${getHexagramFullName(result.expected)}`}</p>
        </div>
        <div>
          <span class="feedback-label">你的选择</span>
          <strong>宜${result.action}</strong>
          <p>${actionCorrect ? "行动顺应此卦之时" : `此时更适合宜${scenario.action}`}</p>
        </div>
      </div>
      <div class="meaning-note">
        <span>${guidance.theme}</span>
        <p>${guidance.advice}</p>
      </div>
      <button class="btn primary" data-action="realm-two-next">${state.realmTwo.scenarioIndex === REALM_TWO_SCENARIOS.length - 1 ? "查看本境结果" : "进入下一象"}</button>
    </section>
  `;
}

function renderRealmTwo() {
  const realm = state.realmTwo;
  const scenario = getCurrentRealmTwoScenario();
  if (realm.phase === "complete") {
    return `
      <main class="screen active">
        <section class="realm-complete">
          <span class="realm-seal">䷿</span>
          <p class="intro-kicker">第二境 · 重卦</p>
          <h2 class="screen-title">上下相叠，万象初成</h2>
          <p class="screen-copy">你已走过四种情境，也开始看见卦象不是答案，而是判断变化的方法</p>
          <div class="result-stats">
            <div class="stat"><span class="label">本次得分</span><strong class="value">${realm.score}</strong></div>
            <div class="stat"><span class="label">最高记录</span><strong class="value">${state.realmTwoBest}</strong></div>
            <div class="stat"><span class="label">已识情境</span><strong class="value">4 / 4</strong></div>
          </div>
          <div class="action-row">
            <button class="btn primary" data-action="realm-two">再演一遍</button>
            <button class="btn" data-action="collection">查看六十四卦</button>
            <button class="btn subtle" data-action="back-home">返回</button>
          </div>
        </section>
      </main>
    `;
  }

  const selected = getHexagramFromTrigrams(realm.inner, realm.outer);
  const stepNumber = realm.scenarioIndex + 1;
  return `
    <main class="screen active">
      <section class="realm-two-shell">
        <header class="realm-two-head">
          <div>
            <p class="intro-kicker">第二境 · 重卦</p>
            <h2 class="screen-title">由八卦，见六十四象</h2>
            <p class="screen-copy">先取内卦为根，再取外卦为势。上下相叠之后，判断此时宜进、宜守，还是宜变</p>
          </div>
          <div class="realm-two-status">
            <span>第 ${stepNumber} / ${REALM_TWO_SCENARIOS.length} 象</span>
            <strong>${realm.score}</strong>
            <small>本境得分</small>
          </div>
        </header>

        <div class="realm-two-grid">
          <aside class="scenario-panel">
            <span class="scenario-index">情境 ${stepNumber}</span>
            <h3>${scenario.title}</h3>
            <p>${scenario.story}</p>
            <div class="oracle-clue">
              <span class="hint-bulb" aria-hidden="true"></span>
              <div><strong>观象</strong><p>${scenario.clue}</p></div>
            </div>
          </aside>

          <section class="compose-board">
            ${renderTrigramPicker("inner", realm.inner, realm.phase !== "compose")}
            ${renderTrigramPicker("outer", realm.outer, realm.phase !== "compose" || !realm.inner)}

            <section class="hexagram-forge ${selected ? "formed" : ""}">
              <div class="forge-label top">外卦 ${realm.outer ? `${TRIGRAMS[realm.outer].name} · ${TRIGRAMS[realm.outer].meaning}` : "未定"}</div>
              <div class="hexagram-lines" aria-label="六爻卦象">${renderHexagramLines(selected)}</div>
              <div class="forge-label bottom">内卦 ${realm.inner ? `${TRIGRAMS[realm.inner].name} · ${TRIGRAMS[realm.inner].meaning}` : "未定"}</div>
              <div class="formed-name">
                <span>${selected ? selected.symbol : "卦"}</span>
                <strong>${getHexagramFullName(selected)}</strong>
                <small>${selected ? `第 ${selected.id} 卦` : "选择内外两卦后成象"}</small>
              </div>
            </section>

            ${
              realm.phase === "compose"
                ? `<button class="btn primary realm-confirm" data-action="realm-two-confirm" ${!selected ? "disabled" : ""}>合卦观象</button>`
                : ""
            }
            ${
              realm.phase === "judge"
                ? `<section class="judgment-panel">
                    <div><span class="reward-kind">最后一问</span><h3>面对这个情境，此时应当如何？</h3></div>
                    <div class="judgment-actions">
                      <button data-action="realm-two-judge" data-choice="进"><span>进</span><strong>宜进</strong><small>把握时机，主动承担</small></button>
                      <button data-action="realm-two-judge" data-choice="守"><span>守</span><strong>宜守</strong><small>稳定根基，暂缓行动</small></button>
                      <button data-action="realm-two-judge" data-choice="变"><span>变</span><strong>宜变</strong><small>旧法不通，顺时更新</small></button>
                    </div>
                  </section>`
                : ""
            }
            ${realm.phase === "feedback" ? renderRealmTwoFeedback(scenario, realm.lastResult) : ""}
          </section>
        </div>
      </section>
    </main>
  `;
}

function renderCollection() {
  const entries = Object.values(TRIGRAMS);
  const discoveredCount = entries.filter((trigram) => state.collection[trigram.name]).length;
  const discoveredDestinies = state.collection.destinies || {};
  const destinyCount = DESTINIES.filter((destiny) => discoveredDestinies[destiny.id]).length;
  const discoveredHexagrams = state.collection.hexagrams || {};
  const hexagramCount = HEXAGRAM_NAMES.filter((name) => discoveredHexagrams[name]).length;
  return `
    <main class="screen active">
      <section class="collection-panel">
        <div class="collection-head">
          <div>
            <h2 class="screen-title">图鉴</h2>
            <p class="screen-copy">八卦 ${discoveredCount} / 8　六十四卦 ${hexagramCount} / 64　命格 ${destinyCount} / ${DESTINIES.length}</p>
          </div>
          <div class="action-row">
            <button class="btn" data-action="back-home">返回</button>
            <button class="btn danger" data-action="reset-collection">清空图鉴</button>
          </div>
        </div>
        <section>
          <h3 class="section-title">八卦图鉴 <span class="pill">${discoveredCount} / 8</span></h3>
          <div class="collection-grid">
            ${entries
              .map((trigram) => {
                const found = state.collection[trigram.name];
                return `
                  <article class="gua-card ${found ? "discovered" : "locked"}">
                    <p class="gua-symbol">${found ? trigram.symbol : "□"}</p>
                    <h3 class="gua-name">${found ? trigram.name : "未发现"}</h3>
                    <p class="gua-copy">${found ? `${trigram.meaning} · ${trigram.description}` : "在对局中结算此卦后解锁"}</p>
                    ${
                      found
                        ? `<div class="gua-knowledge">
                            <p><strong>组成</strong>${trigram.pattern}</p>
                            <p><strong>玩法</strong>${trimEndingPunctuation(trigram.playstyle)}</p>
                            <p><strong>象意</strong>${trigram.description}</p>
                          </div>`
                        : ""
                    }
                    <p class="gua-copy">${found ? `最高得分：${found.highestScore}` : ""}</p>
                  </article>
                `;
              })
              .join("")}
          </div>
        </section>
        <section>
          <h3 class="section-title">六十四卦图鉴 <span class="pill">${hexagramCount} / 64</span></h3>
          <p class="section-note">横向为内卦，纵向为外卦。第二境中合成一次，即可点亮对应卦象</p>
          <div class="hexagram-matrix-wrap">
            <div class="hexagram-matrix">
              <div class="matrix-corner">外 \ 内</div>
              ${TRIGRAM_ORDER.map((pattern) => `<div class="matrix-head">${TRIGRAMS[pattern].symbol}<span>${TRIGRAMS[pattern].name}</span></div>`).join("")}
              ${TRIGRAM_ORDER.map((outerPattern) => {
                const outer = TRIGRAMS[outerPattern];
                return `
                  <div class="matrix-head row-head">${outer.symbol}<span>${outer.name}</span></div>
                  ${TRIGRAM_ORDER.map((innerPattern) => {
                    const hexagram = getHexagramFromTrigrams(innerPattern, outerPattern);
                    const found = discoveredHexagrams[hexagram.name];
                    return `<div class="hexagram-cell ${found ? "discovered" : "locked"}" title="${found ? getHexagramFullName(hexagram) : "尚未发现"}">
                      <span>${found ? hexagram.symbol : "·"}</span>
                      <strong>${found ? hexagram.name : "未识"}</strong>
                    </div>`;
                  }).join("")}
                `;
              }).join("")}
            </div>
          </div>
        </section>
        <section>
          <h3 class="section-title">命格图鉴 <span class="pill">${destinyCount} / ${DESTINIES.length}</span></h3>
          <div class="destiny-collection-grid">
            ${DESTINIES.map((destiny) => {
              const found = discoveredDestinies[destiny.id];
              return `
                <article class="destiny-collection-card ${found ? "discovered" : "locked"}">
                  <div class="destiny-mark">${found ? destiny.name.slice(0, 1) : "?"}</div>
                  <h3>${found ? destiny.name : "未探索"}</h3>
                  ${found && destiny.tags ? `<div class="tag-row">${destiny.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>` : ""}
                  ${found ? renderDescription(destiny.description, "gua-copy", `collection-${destiny.id}`) : `<p class="gua-copy">在对局中获得此命格后解锁</p>`}
                </article>
              `;
            }).join("")}
          </div>
        </section>
      </section>
    </main>
  `;
}

function renderResult() {
  const result = state.result || { victory: false, message: "" };
  return `
    <main class="screen active">
      <section class="result-panel">
        <div class="result-head">
          <div>
            <h2 class="screen-title">${result.victory ? "本局胜利" : "本局失败"}</h2>
            <p class="screen-copy">${result.message}</p>
          </div>
          <div class="action-row">
            <button class="btn primary" data-action="new-game">再来一局</button>
            <button class="btn" data-action="collection">图鉴</button>
          </div>
        </div>
        <div class="result-stats">
          <div class="stat"><span class="label">抵达劫程</span><strong class="value">${getStageProgress()}</strong></div>
          <div class="stat"><span class="label">最高单次</span><strong class="value">${state.bestScore}</strong></div>
          <div class="stat"><span class="label">最后得分</span><strong class="value">${state.lastScore}</strong></div>
        </div>
        <section class="coin-result">
          <div>
            <span class="label">本局获得</span>
            <strong>铜钱 +${result.coinReward?.total || 0}</strong>
          </div>
          <div class="coin-lines">
            <span>抵达劫程 +${result.coinReward?.stageCoins || 0}</span>
            <span>最高分 +${result.coinReward?.scoreCoins || 0}</span>
            <span>新发现 +${result.coinReward?.discoveryCoins || 0}</span>
            <span>胜利 +${result.coinReward?.victoryCoins || 0}</span>
          </div>
          <p>当前铜钱：${state.treasury}。后续可用于购买符咒、替命与问卦。</p>
        </section>
        <section>
          <h3 class="section-title">本局新发现</h3>
          <div class="new-finds">
            ${
              state.discoveredThisRun.length
                ? state.discoveredThisRun.map((name) => `<span class="pill">${name}</span>`).join("")
                : `<span class="pill">暂无</span>`
            }
          </div>
        </section>
        <section>
          <h3 class="section-title">最后结算</h3>
          <div class="breakdown-list result-breakdown">
            ${
              state.lastBreakdown?.details?.length
                ? state.lastBreakdown.details.map((detail) => `<span>${detail}</span>`).join("")
                : "<span>没有触发额外命格。</span>"
            }
          </div>
        </section>
      </section>
    </main>
  `;
}

function render() {
  app.innerHTML = `
    <div class="app-shell">
      ${renderTopbar()}
      ${state.screen === "start" ? renderStart() : ""}
      ${state.screen === "game" ? renderGame() : ""}
      ${state.screen === "reward" ? renderReward() : ""}
      ${state.screen === "tutorial" ? renderTutorial() : ""}
      ${state.screen === "realm-two" ? renderRealmTwo() : ""}
      ${state.screen === "collection" ? renderCollection() : ""}
      ${state.screen === "result" ? renderResult() : ""}
      <footer class="site-footer">
        <span>© 2026 4AMD4N. All rights reserved.</span>
        <span>未经授权，不得复制、修改、再发布或用于商业用途</span>
      </footer>
    </div>
  `;
}

app.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;
  if (action === "new-game" || action === "redraw") startGame();
  if (action === "tutorial") showTutorial();
  if (action === "tutorial-guide") startGuideRun();
  if (action === "realm-two") startRealmTwo();
  if (action === "collection") showScreen("collection");
  if (action === "back-home" || action === "back-temp") leaveTemporaryScreen();
  if (action === "select-card") selectCard(target.dataset.id);
  if (action === "change-line") {
    if (state.selected.length < 3) removeSelected(Number(target.dataset.index));
    else changeLine(Number(target.dataset.index));
  }
  if (action === "settle") settleStage();
  if (action === "choose-reward") chooseReward(Number(target.dataset.index));
  if (action === "toggle-oracle") {
    state.openHintKey = state.openHintKey === target.dataset.hintKey ? null : target.dataset.hintKey;
    render();
  }
  if (action === "guide-next") nextGuideStep();
  if (action === "guide-close") closeGuide();
  if (action === "reset-collection") resetCollection();
  if (action === "select-realm-two-trigram") selectRealmTwoTrigram(target.dataset.position, target.dataset.pattern);
  if (action === "realm-two-confirm") confirmRealmTwoHexagram();
  if (action === "realm-two-judge") judgeRealmTwo(target.dataset.choice);
  if (action === "realm-two-next") advanceRealmTwo();
});

render();
