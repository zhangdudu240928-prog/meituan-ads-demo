import { CATEGORY_DATA, SCENARIOS } from '../data/mockData';

// 迷你条形图
function MiniBar({ value, max, color }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs text-gray-500 w-10 text-right">{value}%</span>
    </div>
  );
}

// 搜索量趋势（简单折线 SVG）
function TrendSparkline({ growth }) {
  const isUp = growth > 0;
  const points = isUp
    ? '0,40 20,35 40,28 60,20 80,10 100,5'
    : '0,10 20,15 40,22 60,28 80,35 100,40';
  return (
    <svg viewBox="0 0 100 50" className="w-20 h-8">
      <polyline
        points={points}
        fill="none"
        stroke={isUp ? '#10b981' : '#ef4444'}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function DataPanel({ scenario }) {
  const scenarioMeta = SCENARIOS.find((s) => s.id === scenario);

  // 根据场景选择对应品类数据
  const categoryMap = {
    seasonal: 'cold',
    newproduct: 'probiotic',
    competitive: 'cold',
    channel: 'probiotic',
    repurchase: 'hypertension',
    promotion: 'cold',
  };
  const catKey = categoryMap[scenario] || 'cold';
  const cat = CATEGORY_DATA[catKey];

  if (!scenario) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-300 p-6">
        <div className="text-4xl mb-3">📊</div>
        <p className="text-sm text-center">选择投放场景后<br />查看实时数据洞察</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      {/* 场景标题 */}
      <div
        className="rounded-xl p-3 border"
        style={{ backgroundColor: scenarioMeta?.bgColor, borderColor: scenarioMeta?.color + '40' }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">{scenarioMeta?.icon}</span>
          <div>
            <div className="font-semibold text-sm text-gray-800">{scenarioMeta?.title}</div>
            <div className="text-xs text-gray-500">{scenarioMeta?.desc}</div>
          </div>
        </div>
      </div>

      {/* 搜索量趋势 */}
      <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          品类搜索趋势
        </div>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xl font-bold text-gray-800">
              {(cat.weeklySearchVolume / 10000).toFixed(1)}万
            </div>
            <div className="text-xs text-gray-400">本周搜索量</div>
          </div>
          <div className="text-right">
            <TrendSparkline growth={cat.weeklyGrowth} />
            <div
              className={`text-sm font-bold ${cat.weeklyGrowth > 0 ? 'text-green-500' : 'text-red-500'}`}
            >
              {cat.weeklyGrowth > 0 ? '+' : ''}{cat.weeklyGrowth}%
            </div>
          </div>
        </div>
      </div>

      {/* 品类竞争格局 */}
      <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          品类竞争格局
        </div>
        <div className="space-y-2">
          {cat.topBrands.map((b, i) => (
            <div key={b.name}>
              <div className="flex justify-between text-xs mb-0.5">
                <span className={`${i === 0 ? 'font-semibold text-gray-700' : 'text-gray-500'}`}>
                  {b.name}
                </span>
              </div>
              <MiniBar
                value={b.share}
                max={100}
                color={i === 0 ? '#3b82f6' : i === 1 ? '#f97316' : '#d1d5db'}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 关键指标 */}
      <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          品类基准指标
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">{cat.avgRoas}x</div>
            <div className="text-xs text-gray-500">品类均值 ROAS</div>
          </div>
          <div className="text-center p-2 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">¥{cat.avgCac}</div>
            <div className="text-xs text-gray-500">平均新客成本</div>
          </div>
        </div>
      </div>

      {/* 投放时机 */}
      <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          品类旺季月份
        </div>
        <div className="flex gap-1 flex-wrap">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => {
            const isPeak = cat.peakMonths.includes(m);
            const isCurrent = m === new Date().getMonth() + 1;
            return (
              <div
                key={m}
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-medium ${
                  isPeak
                    ? 'bg-amber-400 text-white'
                    : 'bg-gray-100 text-gray-400'
                } ${isCurrent ? 'ring-2 ring-blue-400' : ''}`}
              >
                {m}
              </div>
            );
          })}
        </div>
        <p className="text-xs text-gray-400 mt-2">蓝框=当前月，橙色=旺季</p>
      </div>
    </div>
  );
}
