import { useState } from 'react';
import { authenticate } from '../data/merchants';
import { CLIENT_TIERS } from '../data/mockData';

export default function MerchantLogin({ onLogin }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [identified, setIdentified] = useState(null); // 识别结果，认证成功后短暂展示

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!name.trim() || !password.trim()) {
      setError('请输入商家名称和密码');
      return;
    }

    setLoading(true);
    // 模拟网络请求延迟（演示感）
    setTimeout(() => {
      const merchant = authenticate(name, password);
      setLoading(false);
      if (!merchant) {
        setError('商家名称或密码错误，请重试');
        return;
      }
      // 先展示识别结果卡片，1.2s 后进入主界面
      setIdentified(merchant);
      setTimeout(() => onLogin(merchant), 1400);
    }, 800);
  }

  const tierMeta = identified ? CLIENT_TIERS[identified.tier] : null;

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-white to-amber-50 px-4">

      {/* Logo 区域 */}
      <div className="mb-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-3 shadow-lg">
          <span className="text-white text-2xl font-bold">美</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900">美团医药智投</h1>
        <p className="text-sm text-gray-400 mt-1">AI 驱动的投放策略系统</p>
      </div>

      {/* 登录卡片 */}
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

        {/* 识别结果覆盖层 */}
        {identified && (
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl gap-3 transition-all"
            style={{ backgroundColor: tierMeta.bgColor }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md"
              style={{ backgroundColor: tierMeta.color }}
            >
              {identified.tier}
            </div>
            <p className="text-base font-semibold text-gray-800">
              欢迎，{identified.brand}
            </p>
            <span
              className="text-sm font-bold px-4 py-1.5 rounded-full text-white"
              style={{ backgroundColor: tierMeta.color }}
            >
              已识别为 {tierMeta.label}
            </span>
            <p className="text-xs text-gray-400">正在进入系统…</p>
          </div>
        )}

        <div className="px-6 py-7">
          <h2 className="text-base font-semibold text-gray-800 mb-1">商家登录</h2>
          <p className="text-xs text-gray-400 mb-6">
            系统将根据您的账号自动识别客户层级（KA / SKA）
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 商家名称 */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                商家名称
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(''); }}
                placeholder="请输入您的商家名称"
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all placeholder-gray-300"
                autoComplete="username"
                autoFocus
              />
            </div>

            {/* 密码 */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                密码
              </label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="请输入密码"
                  className="w-full px-3.5 py-2.5 pr-10 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all placeholder-gray-300"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors text-sm"
                  tabIndex={-1}
                >
                  {showPwd ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* 错误提示 */}
            {error && (
              <div className="flex items-center gap-1.5 text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* 提交按钮 */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all
                bg-gradient-to-r from-amber-400 to-orange-500
                hover:from-amber-500 hover:to-orange-600
                active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed
                shadow-md shadow-orange-200"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  正在识别客户层级…
                </span>
              ) : '登录'}
            </button>
          </form>
        </div>

        {/* 演示账号提示 */}
        <div className="px-6 pb-5">
          <div className="bg-gray-50 rounded-xl px-4 py-3 text-xs text-gray-400 space-y-1">
            <p className="font-medium text-gray-500">演示账号</p>
            <p>SKA：<span className="text-gray-600 font-mono">SKA演示账号</span> / 密码 <span className="text-gray-600 font-mono">demo</span></p>
            <p>KA：<span className="text-gray-600 font-mono">KA演示账号</span> / 密码 <span className="text-gray-600 font-mono">demo</span></p>
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-300">演示模式 · 数据仅供参考</p>
    </div>
  );
}
