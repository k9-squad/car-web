import { createContext, useContext, useState, type ReactNode } from 'react'

export type Lang = 'zh' | 'en'

const dict = {
  zh: {
    newCars: '新车目录',
    usedCars: '二手车目录',
    contact: '联系我们',
    heroNewTitle: '新车目录',
    heroNewSub: '精选热销新车，支持全球出口，点击车型查看详情与视频',
    heroUsedTitle: '二手车目录',
    heroUsedSub: '2022 - 2025 年优质二手车源，车况透明，支持视频验车',
    searchPlaceholder: '搜索品牌或车型…',
    allBrands: '全部品牌',
    allEnergy: '全部能源',
    ev: '纯电',
    hybrid: '混动',
    gasoline: '燃油',
    results: '款车型',
    noResults: '未找到匹配车型，请调整筛选条件',
    viewDetail: '查看详情',
    mileage: '里程',
    inquireWhatsApp: 'WhatsApp 询价',
    inquireEmail: '邮件询价',
    specs: '车辆参数',
    exterior: '外观图片',
    interior: '内饰图片',
    video: '车辆视频',
    videoPlaceholder: '视频占位 · 点击播放（演示）',
    brand: '品牌',
    model: '车型',
    year: '年份',
    price: '价格 (FOB)',
    energy: '能源类型',
    bodyType: '车身形式',
    seats: '座位数',
    transmission: '变速箱',
    rangeOrFuel: '续航 / 油耗',
    power: '最大功率',
    drivetrain: '驱动形式',
    color: '颜色',
    condition: '车况评级',
    backToList: '返回目录',
    notFound: '未找到该车型',
    contactTitle: '联系我们',
    contactSub: '欢迎通过 WhatsApp 或邮箱与我们的销售团队联系，获取报价与车辆视频',
    whatsappCard: 'WhatsApp 在线咨询',
    whatsappDesc: '点击即可发起会话，工作时间内秒回',
    emailCard: '邮箱询盘',
    emailDesc: '发送您的需求，24 小时内回复',
    companyCard: '公司信息',
    address: '地址',
    workingHours: '工作时间',
    followUs: '关注我们',
    qrTip: '扫码访问本网站',
    chatNow: '立即咨询',
    sendEmail: '发送邮件',
    footerRights: '版权所有',
    watermarkNote: '示例图片 · 实际车辆图片将自动添加公司LOGO水印',
    usedBadge: '二手',
    newBadge: '新车',
    photoExterior: '外观',
    photoInterior: '内饰',
  },
  en: {
    newCars: 'New Cars',
    usedCars: 'Used Cars',
    contact: 'Contact Us',
    heroNewTitle: 'New Car Catalog',
    heroNewSub: 'Hand-picked new vehicles for worldwide export. Tap any car for details & video.',
    heroUsedTitle: 'Used Car Catalog',
    heroUsedSub: 'Quality used cars from 2022 - 2025, transparent condition, video inspection available.',
    searchPlaceholder: 'Search brand or model…',
    allBrands: 'All Brands',
    allEnergy: 'All Energy',
    ev: 'EV',
    hybrid: 'Hybrid',
    gasoline: 'Gasoline',
    results: 'vehicles',
    noResults: 'No vehicles match your filters.',
    viewDetail: 'View Details',
    mileage: 'Mileage',
    inquireWhatsApp: 'WhatsApp Inquiry',
    inquireEmail: 'Email Inquiry',
    specs: 'Specifications',
    exterior: 'Exterior',
    interior: 'Interior',
    video: 'Vehicle Video',
    videoPlaceholder: 'Video placeholder · Click to play (demo)',
    brand: 'Brand',
    model: 'Model',
    year: 'Year',
    price: 'Price (FOB)',
    energy: 'Energy',
    bodyType: 'Body Type',
    seats: 'Seats',
    transmission: 'Transmission',
    rangeOrFuel: 'Range / Fuel',
    power: 'Max Power',
    drivetrain: 'Drivetrain',
    color: 'Color',
    condition: 'Condition',
    backToList: 'Back to Catalog',
    notFound: 'Vehicle not found',
    contactTitle: 'Contact Us',
    contactSub: 'Reach our sales team via WhatsApp or email for quotations and vehicle videos.',
    whatsappCard: 'WhatsApp Chat',
    whatsappDesc: 'Tap to start a chat — instant reply during working hours',
    emailCard: 'Email Inquiry',
    emailDesc: 'Send us your requirements, reply within 24 hours',
    companyCard: 'Company Info',
    address: 'Address',
    workingHours: 'Working Hours',
    followUs: 'Follow Us',
    qrTip: 'Scan to visit this site',
    chatNow: 'Chat Now',
    sendEmail: 'Send Email',
    footerRights: 'All rights reserved.',
    watermarkNote: 'Sample images · Real photos will carry the company logo watermark automatically',
    usedBadge: 'USED',
    newBadge: 'NEW',
    photoExterior: 'Exterior',
    photoInterior: 'Interior',
  },
} as const

export type TKey = keyof typeof dict.zh

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: TKey) => string
}

const LangContext = createContext<LangContextValue | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('zh')
  const t = (key: TKey) => dict[lang][key]
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}
