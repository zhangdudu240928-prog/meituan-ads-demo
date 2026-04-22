import { useState } from 'react';
import TierSelector from './components/TierSelector';
import ScenarioGrid from './components/ScenarioGrid';
import ChatWindow from './components/ChatWindow';
import DataPanel from './components/DataPanel';
import { useChat } from './hooks/useChat';
import { CLIENT_TIERS, SCENARIOS } from './data/mockData';

export default function App() {
  const [tier, setTier] = useState('KA');
  const [scenario, setScenario] = useState(null);
  const [step, setStep] = useState(1); // 1=选层级 2=选场景 3=对话

  const { messages, isLoading, sendMessage, reset } = useChat({ tier, scenario });

  function handleTierSelect(t) {
    setTier(t);
    if (step < 2) setStep(2);
  }

  function handleScenarioSelect(s) {
    setScenario(s);
    reset();
    setStep(3);
  }

  function handleReset() {
    reset();
    setScenario(null);
    setStep(2);
  }

  const tierMeta = CLIENT_TIERS[tier];
  const scenarioMeta = SCENARIOS.find((s) => s.id === scenario);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* ── 顶部导航栏 ── */}
      <header className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">美</span>
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900">美团医药智投</h1>
            <p className="text-xs text-gray-400">AI 驱动的投放策略系统</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {tier && (
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
              style={{ backgroundColor: tierMeta.color }}
            >
              {tierMeta.badge}
            </span>
          )}
          {scenarioMeta && (
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <span>{scenarioMeta.icon}</span>
              <span>{scenarioMeta.title}</span>
            </span>
          )}
          {step === 3 && (
            <button
              onClick={handleReset}
              className="text-xs text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg px-3 py-1 hover:bg-gray-50 transition-colors"
            >
              ← 重新选择场景
            </button>
          )}
        </div>
      </header>

      {/* ── 主体内容 ── */}
      <main className="flex-1 overflow-hidden">
        {/* Step 1 & 2：选层级 + 选场景 */}
        {step < 3 && (
          <div className="h-full overflow-y-auto">
            <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">
              {/* Step 1: 选客户层级 */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold">1</div>
                  <h2 className="text-base font-semibold text-gray-800">选择您的客户层级</h2>
                </div>
                <TierSelector selected={tier} onSelect={handleTierSelect} />
              </section>

              {/* Step 2: 选投放场景 */}
              {step >= 2 && (
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold">2</div>
                    <h2 className="text-base font-semibold text-gray-800">选择投放场景</h2>
                    <span className="text-xs text-gray-400">选择后进入 AI 策略对话</span>
                  </div>
                  <ScenarioGrid selected={scenario} tier={tier} onSelect={handleScenarioSelect} />
                </section>
              )}
            </div>
          </div>
        )}

        {/* Step 3：对话 + 数据面板 */}
        {step === 3 && (
          <div className="h-full flex">
            {/* 左侧：场景导航 */}
            <div className="w-48 flex-shrink-0 bg-white border-r border-gray-200 overflow-y-auto">
              <div className="p-3">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 px-1">
                  切换场景
                </p>
                <div className="space-y-1">
                  {SCENARIOS.filter((s) => s.tiers.includes(tier)).map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleScenarioSelect(s.id)}
                      className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-left text-xs transition-colors ${
                        scenario === s.id
                          ? 'font-semibold text-white'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      style={scenario === s.id ? { backgroundColor: s.color } : {}}
                    >
                      <span>{s.icon}</span>
                      <span className="truncate">{s.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 中间：对话窗口 */}
            <div className="flex-1 min-w-0 p-4">
              <ChatWindow
                messages={messages}
                isLoading={isLoading}
                onSend={sendMessage}
                scenario={scenario}
                tier={tier}
              />
            </div>

            {/* 右侧：数据面板 */}
            <div className="w-64 flex-shrink-0 bg-white border-l border-gray-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  数据洞察
                </p>
              </div>
              <DataPanel scenario={scenario} />
            </div>
          </div>
        )}
      </main>

      {/* ── 底部提示 ── */}
      <div className="flex-shrink-0 bg-blue-50 border-t border-blue-100 px-6 py-1.5 flex items-center justify-center gap-2">
        <span className="text-blue-400 text-xs">演示模式 · 数据仅供参考</span>
      </div>
    </div>
  );
}
