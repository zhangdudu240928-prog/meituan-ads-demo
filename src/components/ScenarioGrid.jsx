import { SCENARIOS } from '../data/mockData';

export default function ScenarioGrid({ selected, tier, onSelect }) {
  const available = SCENARIOS.filter((s) => s.tiers.includes(tier));

  return (
    <div className="grid grid-cols-3 gap-3">
      {available.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelect(s.id)}
          className={`rounded-xl border-2 p-3 text-left transition-all duration-200 ${
            selected === s.id
              ? 'border-current shadow-md'
              : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
          }`}
          style={
            selected === s.id
              ? { borderColor: s.color, backgroundColor: s.bgColor }
              : {}
          }
        >
          <div className="text-2xl mb-1">{s.icon}</div>
          <div className="font-semibold text-sm text-gray-800">{s.title}</div>
          <div className="text-xs text-gray-500 mt-0.5">{s.subtitle}</div>
        </button>
      ))}
    </div>
  );
}
