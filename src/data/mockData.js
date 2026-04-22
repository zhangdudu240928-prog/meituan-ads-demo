// ── 客户分层数据 ──────────────────────────────────────
export const CLIENT_TIERS = {
  SKA: {
    key: 'SKA',
    label: 'SKA 战略大客户',
    badge: 'SKA',
    color: '#f59e0b',
    bgColor: '#fffbeb',
    borderColor: '#fcd34d',
    desc: '年框 500万+，联合生意规划',
    features: ['品牌健康度看板', '增量测试中心', 'JBP 季度复盘', '专属 AM 服务'],
  },
  KA: {
    key: 'KA',
    label: 'KA 重点客户',
    badge: 'KA',
    color: '#3b82f6',
    bgColor: '#eff6ff',
    borderColor: '#93c5fd',
    desc: '年框 50-500万，场景化自助投放',
    features: ['场景一键启动', '预算计算器', '素材助手', '效果周报'],
  },
};

// ── 6 大投放场景 ─────────────────────────────────────
export const SCENARIOS = [
  {
    id: 'seasonal',
    icon: '🌡️',
    title: '应季用药',
    subtitle: '流感季 / 过敏季 / 夏季肠胃',
    color: '#ef4444',
    bgColor: '#fef2f2',
    desc: '基于平台搜索量预警，提前布局旺季流量',
    tiers: ['SKA', 'KA'],
  },
  {
    id: 'newproduct',
    icon: '🚀',
    title: '新品上市',
    subtitle: '冷启动 · 快速渗透 · 口碑建立',
    color: '#8b5cf6',
    bgColor: '#f5f3ff',
    desc: '三阶段冷启动方案，从0到品类认知',
    tiers: ['SKA', 'KA'],
  },
  {
    id: 'competitive',
    icon: '⚔️',
    title: '竞品应对',
    subtitle: '份额防守 · 侧翼迂回 · 反超策略',
    color: '#f97316',
    bgColor: '#fff7ed',
    desc: '实时竞品监控，智能出价策略调整',
    tiers: ['SKA', 'KA'],
  },
  {
    id: 'channel',
    icon: '🗺️',
    title: '渠道铺货优化',
    subtitle: '城市扩张 · 门店覆盖 · 区域渗透',
    color: '#10b981',
    bgColor: '#ecfdf5',
    desc: '地域定向 + 门店数据联动，精准铺货',
    tiers: ['SKA', 'KA'],
  },
  {
    id: 'repurchase',
    icon: '🔄',
    title: '慢病复购维系',
    subtitle: '患者留存 · 用药依从 · LTV 提升',
    color: '#06b6d4',
    bgColor: '#ecfeff',
    desc: '慢病患者人群包 + 复购周期预测',
    tiers: ['SKA', 'KA'],
  },
  {
    id: 'promotion',
    icon: '🎯',
    title: '大促节点冲量',
    subtitle: '618 · 双十一 · 年末 · 开门红',
    color: '#ec4899',
    bgColor: '#fdf2f8',
    desc: '全链路大促方案，GMV 增量最大化',
    tiers: ['SKA', 'KA'],
  },
];

// ── Mock 品类数据 ──────────────────────────────────────
export const CATEGORY_DATA = {
  // 感冒/流感品类
  cold: {
    name: '感冒/退烧',
    weeklySearchVolume: 142000,
    weeklyGrowth: 47,
    topBrands: [
      { name: '999感冒灵', share: 28.3 },
      { name: '白加黑', share: 22.1 },
      { name: '泰诺', share: 18.7 },
      { name: '其他', share: 30.9 },
    ],
    avgRoas: 3.2,
    avgCac: 18.5,
    peakMonths: [11, 12, 1, 2, 3],
  },
  // 益生菌品类
  probiotic: {
    name: '益生菌',
    weeklySearchVolume: 89000,
    weeklyGrowth: 12,
    topBrands: [
      { name: '汤臣倍健', share: 31.2 },
      { name: '合生元', share: 24.8 },
      { name: '其他', share: 44.0 },
    ],
    avgRoas: 2.8,
    avgCac: 32.0,
    peakMonths: [3, 4, 5, 9, 10],
  },
  // 降压药品类
  hypertension: {
    name: '降压药',
    weeklySearchVolume: 67000,
    weeklyGrowth: 5,
    topBrands: [
      { name: '拜新同', share: 19.4 },
      { name: '代文', share: 16.8 },
      { name: '络活喜', share: 14.2 },
      { name: '其他', share: 49.6 },
    ],
    avgRoas: 4.1,
    avgCac: 45.0,
    peakMonths: [1, 2, 3, 10, 11, 12],
  },
};

// ── 场景化 System Prompt ──────────────────────────────
export const SYSTEM_PROMPTS = {
  base: `你是"美团医药智投"的 AI 投放顾问，专门帮助药企和品牌商在美团医药平台制定广告投放策略。

你的核心能力：
1. 基于平台实时数据（搜索量、竞品动态、品类趋势）给出投放建议
2. 针对不同场景（新品上市、应季用药、竞品应对等）提供标准化方案
3. 区分 SKA（战略大客户）和 KA（重点客户）给出差异化建议
4. 所有建议必须附带数据依据和预期效果

回答原则：
- 用中文回答，语言专业但不生硬
- 每次回答都要有明确的"下一步行动"
- 数字要具体（预算金额、预期 ROAS、时间周期）
- 当效果数据不理想时，主动引导客户看"增量指标"而非只看 ROAS
- SKA 客户：提供深度分析 + 联合生意规划视角
- KA 客户：提供简洁清晰的操作步骤

美团医药平台独特优势（在回答中适时强调）：
- 即时零售：30分钟达，用户健康需求最强烈的时刻
- 闭环归因：平台内完整的搜索→点击→购买链路
- 第一方数据：真实的健康消费行为数据，非兴趣推测`,

  seasonal: `当前场景：应季用药投放
平台数据：感冒/退烧品类本周搜索量 142,000，环比上涨 47%，流感季提前到来。
品类平均 ROAS：3.2，平均新客获取成本：¥18.5/人。
竞品动态：白加黑本周投放预算上涨约 35%，主要布局"感冒药"核心词。`,

  newproduct: `当前场景：新品上市冷启动
品类参考数据（益生菌）：周搜索量 89,000，Top3 品牌占据 56% 份额。
差异化机会：儿童益生菌细分词竞争烈度低 40%，建议重点布局。
冷启动参考基准：首月新客获取成本约 ¥28-35/人，30日复购率行业均值 22%。`,

  competitive: `当前场景：竞品应对
系统检测到异常：竞品华润三九过去7天在"感冒灵"核心词出价上涨约 40%。
当前状态：您的搜索点击份额下降 8.3%，从 28.3% 降至 20.0%。
可用策略：正面防守（预算+30%）或侧翼迂回（布局长尾精准词）。`,

  channel: `当前场景：渠道铺货优化
平台数据：您的品牌当前在华东地区覆盖率 73%，华南 41%，西南 28%。
机会区域：成都、重庆、昆明近3个月该品类搜索量增长 62%，但您的门店覆盖率仅 15%。`,

  repurchase: `当前场景：慢病复购维系
数据洞察：您的降压药品类用户平均购买周期 28天，但平台数据显示 35% 的用户在第2次购买时流失。
复购提升机会：对比行业基准，您的30日复购率（31%）低于品类均值（38%）7个百分点。`,

  promotion: `当前场景：大促节点冲量
大促背景：距618还有 71天，去年同期您的大促 GMV 较日常提升 340%，但 ROAS 从 3.8 降至 2.1。
今年机会：平台预计618医药品类流量同比增长 25%，建议提前30天启动蓄水。`,
};
