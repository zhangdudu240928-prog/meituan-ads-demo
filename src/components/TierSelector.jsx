import { CLIENT_TIERS } from '../data/mockData';

export default function TierSelector({ selected, onSelect }) {
  return (
    <div className="flex gap-4">
      {Object.values(CLIENT_TIERS).map((tier) => (
        <button
          key={tier.key}
          onClick={() => onSelect(tier.key)}
          className={`flex-1 rounded-2xl border-2 p-4 text-left transition-all duration-200 ${
            selected === tier.key
              ? 'border-current shadow-md scale-[1.02]'
              : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
          }`}
          style={
            selected === tier.key
              ? { borderColor: tier.color, backgroundColor: tier.bgColor }
              : {}
          }
        >
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: tier.color }}
            >
              {tier.badge}
            </span>
            <span className="font-semibold text-gray-800">{tier.label}</span>
          </div>
          <p className="text-xs text-gray-500 mb-3">{tier.desc}</p>
          <div className="flex flex-wrap gap-1">
            {tier.features.map((f) => (
              <span
                key={f}
                className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600"
              >
                {f}
              </span>
            ))}
          </div>
        </button>
      ))}
    </div>
  );
}
