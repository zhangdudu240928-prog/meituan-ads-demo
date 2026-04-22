import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      <span className="typing-dot w-2 h-2 rounded-full bg-gray-400" />
      <span className="typing-dot w-2 h-2 rounded-full bg-gray-400" />
      <span className="typing-dot w-2 h-2 rounded-full bg-gray-400" />
    </div>
  );
}

function Message({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`msg-enter flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      {!isUser && (
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0 mt-1">
          AI
        </div>
      )}
      <div
        className={`max-w-[85%] sm:max-w-[78%] rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm leading-relaxed ${
          isUser
            ? 'bg-blue-500 text-white rounded-tr-sm'
            : msg.error
            ? 'bg-red-50 text-red-700 border border-red-200 rounded-tl-sm'
            : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-sm'
        }`}
      >
        {isUser ? (
          <p>{msg.content}</p>
        ) : (
          <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 prose-headings:my-2 prose-strong:text-gray-900">
            <ReactMarkdown>{msg.content}</ReactMarkdown>
            {msg.streaming && (
              <span className="inline-block w-0.5 h-4 bg-gray-400 ml-0.5 animate-pulse" />
            )}
          </div>
        )}
      </div>
      {isUser && (
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold ml-2 flex-shrink-0 mt-1">
          我
        </div>
      )}
    </div>
  );
}

function QuickPrompts({ scenario, tier, onSelect }) {
  const prompts = {
    seasonal: ['帮我制定本周流感季投放方案', '预算 20 万，ROAS 目标 3.5', '竞品加大投放，我该怎么应对？'],
    newproduct: ['新品下月上市，预算 50 万怎么分配？', '如何快速建立新品搜索认知？', '新客获取成本控制在多少合理？'],
    competitive: ['竞品抢了我的核心词，怎么办？', '有限预算下如何防守市场份额？', '帮我分析竞品最近的投放策略'],
    channel: ['西南地区覆盖率太低，如何快速铺货？', '帮我制定成都、重庆的投放方案', '地域定向投放的预算怎么分配？'],
    repurchase: ['如何提升慢病患者的复购率？', '30 日复购率低于行业均值，怎么优化？', '帮我设计一个患者留存方案'],
    promotion: ['距离 618 还有 71 天，现在该做什么？', '去年大促 ROAS 下降，今年如何改善？', '大促期间预算怎么分配效果最好？'],
  };
  const list = prompts[scenario] || ['帮我分析当前品类的投放机会', '给我一个本季度的投放规划', '如何提升我的广告 ROAS？'];

  return (
    <div className="px-3 pb-3 flex flex-wrap gap-1.5">
      {list.map((p) => (
        <button
          key={p}
          onClick={() => onSelect(p)}
          className="text-xs px-3 py-1.5 rounded-full border border-blue-200 text-blue-600 bg-blue-50 active:bg-blue-100 hover:bg-blue-100 transition-colors"
        >
          {p}
        </button>
      ))}
    </div>
  );
}

export default function ChatWindow({ messages, isLoading, onSend, scenario, tier }) {
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  function handleKeyDown(e) {
    // 移动端不用 Enter 发送，避免影响换行
    if (e.key === 'Enter' && !e.shiftKey && window.innerWidth >= 640) {
      e.preventDefault();
      submit();
    }
  }

  function submit() {
    const text = inputRef.current?.value.trim();
    if (text && !isLoading) {
      onSend(text);
      inputRef.current.value = '';
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">
      {/* 消息区 */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 px-4">
            <div className="text-4xl sm:text-5xl mb-3">💬</div>
            <p className="text-sm font-medium text-gray-500">开始与 AI 投放顾问对话</p>
            <p className="text-xs mt-1">或点击下方快捷问题快速开始</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <Message key={i} msg={msg} />
        ))}
        {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
          <div className="flex justify-start mb-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0">
              AI
            </div>
            <div className="bg-white rounded-2xl rounded-tl-sm border border-gray-100 shadow-sm">
              <TypingIndicator />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* 快捷提问 */}
      {messages.length === 0 && (
        <QuickPrompts scenario={scenario} tier={tier} onSelect={(p) => onSend(p)} />
      )}

      {/* 输入框 */}
      <div className="flex-shrink-0 border-t border-gray-200 bg-white p-2.5 sm:p-3 flex gap-2 items-end">
        <textarea
          ref={inputRef}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder="输入问题，例如：帮我制定本周投放方案..."
          rows={2}
          className="flex-1 resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 disabled:bg-gray-50 disabled:text-gray-400"
          style={{ fontSize: '16px' /* 防止 iOS 自动缩放 */ }}
        />
        <button
          onClick={submit}
          disabled={isLoading}
          className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-300 text-white flex items-center justify-center transition-colors"
        >
          <svg className="w-4 h-4 rotate-90" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
