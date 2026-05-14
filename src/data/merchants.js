// 商家账号数据
// tier: 'SKA' | 'KA'
export const MERCHANTS = [
  // SKA 战略大客户
  { name: '拜耳医药', password: 'bayer2024',   tier: 'SKA', brand: '拜耳' },
  { name: '辉瑞中国', password: 'pfizer2024',  tier: 'SKA', brand: '辉瑞' },
  { name: '强生医疗', password: 'jnj2024',     tier: 'SKA', brand: '强生' },
  { name: '华润三九', password: 'cr999',        tier: 'SKA', brand: '999' },
  { name: '云南白药', password: 'yunnan2024',  tier: 'SKA', brand: '云南白药' },
  { name: '扬子江药业', password: 'yzj2024',   tier: 'SKA', brand: '扬子江' },
  { name: '步长制药', password: 'buchan2024',  tier: 'SKA', brand: '步长' },
  { name: '天士力集团', password: 'tsl2024',   tier: 'SKA', brand: '天士力' },

  // KA 重点客户
  { name: '白加黑官方', password: 'bjh2024',   tier: 'KA',  brand: '白加黑' },
  { name: '泰诺旗舰店', password: 'tylenol24', tier: 'KA',  brand: '泰诺' },
  { name: '汤臣倍健', password: 'by_health',   tier: 'KA',  brand: '汤臣倍健' },
  { name: '合生元官方', password: 'biostime',  tier: 'KA',  brand: '合生元' },
  { name: '仁和药业', password: 'renhe2024',   tier: 'KA',  brand: '仁和' },
  { name: '同仁堂网店', password: 'trt2024',   tier: 'KA',  brand: '同仁堂' },
  { name: '广药白云山', password: 'bys2024',   tier: 'KA',  brand: '白云山' },
  { name: '科伦药业', password: 'klpharma',    tier: 'KA',  brand: '科伦' },

  // 演示账号（方便展示）
  { name: 'SKA演示账号', password: 'demo',     tier: 'SKA', brand: '演示品牌' },
  { name: 'KA演示账号',  password: 'demo',     tier: 'KA',  brand: '演示品牌' },
];

export function authenticate(name, password) {
  const trimName = name.trim();
  const trimPwd = password.trim();
  if (!trimName || !trimPwd) return null;
  return MERCHANTS.find(
    (m) => m.name === trimName && m.password === trimPwd
  ) || null;
}
