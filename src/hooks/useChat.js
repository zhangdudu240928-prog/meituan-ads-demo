import { useState, useCallback } from 'react';
import { getDemoReply } from '../data/demoScripts';

// 模拟流式打字输出
async function streamText(text, onChunk) {
  // 按字符分组，每次输出 2-4 个字符，模拟真实打字节奏
  let i = 0;
  while (i < text.length) {
    const chunkSize = Math.floor(Math.random() * 3) + 2;
    onChunk(text.slice(0, i + chunkSize));
    i += chunkSize;
    await new Promise((r) => setTimeout(r, 18 + Math.random() * 20));
  }
  onChunk(text); // 确保最终输出完整
}

export function useChat({ tier, scenario }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (userText) => {
    const userMsg = { role: 'user', content: userText };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setIsLoading(true);

    // 获取预设回复
    const reply = getDemoReply(scenario, tier, messages.length);

    // 模拟思考延迟
    await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));

    // 开始流式输出
    setMessages((prev) => [...prev, { role: 'assistant', content: '', streaming: true }]);

    await streamText(reply, (partial) => {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'assistant', content: partial, streaming: true };
        return updated;
      });
    });

    setMessages((prev) => {
      const updated = [...prev];
      updated[updated.length - 1] = { role: 'assistant', content: reply, streaming: false };
      return updated;
    });

    setIsLoading(false);
  }, [messages, tier, scenario]);

  const reset = useCallback(() => setMessages([]), []);

  return { messages, isLoading, sendMessage, reset };
}
