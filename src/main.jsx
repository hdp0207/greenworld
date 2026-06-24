import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Globe2,
  Languages,
  Mail,
  MapPin,
  Menu,
  PackageCheck,
  Phone,
  Plane,
  ShieldCheck,
  Ship,
  Sparkles,
  X,
} from "lucide-react";
import "./styles.css";

const FORM_EMBED_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeX3jSIfxiYY-MOmoVE8hwLxi6AKkvq5bSYYmpRJ6YT1lgHdw/viewform?embedded=true";

const copy = {
  ja: {
    nav: { home: "Home", message: "Message", about: "About" },
    meta: { lang: "JP", company: "Greenworld 株式会社" },
    home: {
      title: "日本と中国をつなぐ\n貿易・物流パートナー",
      lead:
        "国際貿易と航空・海上物流をワンストップで提供。日本・中国・香港を結び、越境ECセラーの事業成長を支えます。",
      cta: "お問い合わせ",
      secondary: "会社概要",
      news: "2024.05.01　Greenworld 株式会社を設立しました。",
      serviceTitle: "SERVICE",
      serviceSub: "事業内容",
      tradeTitle: "国際貿易事業",
      tradeText:
        "日本の食品・保健品などを中国・香港へ。中国の食品・老舗ブランド・食品添加物を日本市場へ届けます。",
      logisticsTitle: "国際物流事業",
      logisticsText:
        "航空便・船便を組み合わせ、中国から日本、日本から中国への越境輸送を安定して支援します。",
      strengthsTitle: "GREENWORLDの強み",
      strengths: [
        ["日中・香港ネットワーク", "販売先と仕入先の両面をつなぎ、実務に近い調整を行います。"],
        ["EC販売に対応", "Amazon、楽天、TikTok、京東、天猫、小紅書、拼多多などに対応します。"],
        ["自社拠点の安心感", "オフィス・倉庫を自社で保有し、継続的な業務体制を整えています。"],
        ["食品領域に強い", "食品、保健品、火鍋・麻辣湯関連商品、添加物などを扱います。"],
      ],
    },
    message: {
      title: "Message",
      sub: "お問い合わせ",
      lead:
        "貿易・物流・越境ECに関するご相談、お見積り、業務提携など、お気軽にお問い合わせください。",
      formTitle: "お問い合わせフォーム",
      formNote:
        "Google Formsを利用したお問い合わせフォームです。入力内容はGoogle Forms側で管理され、このサイトのデータベースには保存されません。",
      noDb: "入力内容はこのサイトのデータベースには保存されません。",
      company: "会社名",
      name: "ご担当者名",
      email: "メールアドレス",
      phone: "電話番号",
      type: "お問い合わせ種別",
      typeOptions: ["国際貿易", "国際物流", "越境EC", "業務提携", "その他"],
      detail: "お問い合わせ内容",
      submit: "メールを作成",
      recommendationsTitle: "無料で使いやすい外部フォーム候補",
      recommendations: [
        ["Tally", "無料枠が広く、埋め込みとGoogle Sheets連携に向いています。"],
        ["Google Forms", "Googleアカウントだけで運用しやすく、回答をSheetsで管理できます。"],
        ["FormSubmit", "登録不要でHTMLフォームをメール受信に接続できます。"],
      ],
    },
    about: {
      title: "About",
      sub: "会社概要",
      lead:
        "日本と中国・香港をつなぐ架け橋として、貿易と物流の可能性を広げ、お客様のビジネスの持続的な成長に貢献します。",
      tableTitle: "会社概要",
      rows: [
        ["会社名", "Greenworld 株式会社"],
        ["設立", "2024年"],
        ["所在地", "〒505-0046 岐阜県美濃加茂市西町1丁目238番地"],
        ["電話番号", "0574-58-6761"],
        ["メールアドレス", "info@greenworld.love"],
        ["事業内容", "国際貿易事業 / 国際物流事業（航空・海上） / 越境ECサポート"],
        ["拠点・設備", "自社オフィス・自社倉庫"],
      ],
      accessTitle: "アクセス",
      mapButton: "Google Mapで見る",
      principlesTitle: "私たちの姿勢",
      principles: [
        ["正確", "食品・物流に関わる実務を丁寧に確認します。"],
        ["迅速", "販売計画に合わせた輸送と調整を支援します。"],
        ["継続", "単発の取引だけでなく、長く続く流通体制を目指します。"],
      ],
    },
    footer: "© 2024 Greenworld Co., Ltd. All Rights Reserved.",
  },
  zh: {
    nav: { home: "首页", message: "留言板", about: "关于我们" },
    meta: { lang: "中", company: "Greenworld 株式会社" },
    home: {
      title: "连接日本与中国的\n贸易・物流伙伴",
      lead:
        "提供国际贸易、空运与海运物流服务，连接日本、中国与香港，支持跨境电商卖家的长期增长。",
      cta: "联系我们",
      secondary: "公司概要",
      news: "2024.05.01　Greenworld 株式会社成立。",
      serviceTitle: "SERVICE",
      serviceSub: "业务内容",
      tradeTitle: "国际贸易业务",
      tradeText:
        "将日本食品、保健品等销往中国与香港，也将中国食品、老字号品牌与食品添加剂导入日本市场。",
      logisticsTitle: "国际物流业务",
      logisticsText:
        "通过空运与海运，稳定支持中国到日本、日本到中国的跨境运输。",
      strengthsTitle: "GREENWORLD 的优势",
      strengths: [
        ["日中港网络", "连接供应端与销售端，贴近实际业务做协调。"],
        ["支持电商平台", "服务 Amazon、乐天、TikTok、京东、天猫、小红书、拼多多等平台商家。"],
        ["自有据点", "公司自持办公场所与仓库，业务体制更稳定。"],
        ["食品领域经验", "覆盖食品、保健品、火锅底料、麻辣烫配料、食品添加剂等。"],
      ],
    },
    message: {
      title: "Message",
      sub: "留言板",
      lead: "欢迎咨询贸易、物流、跨境电商、报价与业务合作等事宜。",
      formTitle: "咨询表单",
      formNote:
        "这里使用 Google Forms 作为留言表单。提交内容由 Google Forms 管理，本网站不使用数据库保存留言。",
      noDb: "本网站不使用数据库保存留言内容。",
      company: "公司名称",
      name: "联系人",
      email: "邮箱",
      phone: "电话",
      type: "咨询类型",
      typeOptions: ["国际贸易", "国际物流", "跨境电商", "业务合作", "其他"],
      detail: "咨询内容",
      submit: "生成邮件",
      recommendationsTitle: "推荐的免费第三方表单",
      recommendations: [
        ["Tally", "免费额度宽松，适合嵌入官网，也可连接 Google Sheets。"],
        ["Google Forms", "稳定、容易维护，可直接把回复保存到 Google Sheets。"],
        ["FormSubmit", "无需注册，可把 HTML 表单直接连接到邮箱收信。"],
      ],
    },
    about: {
      title: "About",
      sub: "关于我们",
      lead:
        "我们以日本与中国、香港之间的贸易和物流为核心，帮助客户拓展商品流通与跨境销售机会。",
      tableTitle: "公司概要",
      rows: [
        ["公司名称", "Greenworld 株式会社"],
        ["成立", "2024年"],
        ["所在地", "〒505-0046 岐阜県美濃加茂市西町1丁目238番地"],
        ["电话", "0574-58-6761"],
        ["邮箱", "info@greenworld.love"],
        ["业务内容", "国际贸易 / 国际物流（空运・海运） / 跨境电商支持"],
        ["据点・设备", "自有办公场所・自有仓库"],
      ],
      accessTitle: "交通位置",
      mapButton: "查看 Google Map",
      principlesTitle: "我们的工作原则",
      principles: [
        ["准确", "认真确认食品与物流相关的实际业务细节。"],
        ["迅速", "配合销售计划，支持运输与协调。"],
        ["持续", "不只做单次交易，更重视长期流通体系。"],
      ],
    },
    footer: "© 2024 Greenworld Co., Ltd. All Rights Reserved.",
  },
  en: {
    nav: { home: "Home", message: "Message", about: "About" },
    meta: { lang: "EN", company: "Greenworld 株式会社" },
    home: {
      title: "Trade and logistics\nbetween Japan and China",
      lead:
        "Greenworld provides international trade, air freight and sea freight support for Japan, China, Hong Kong and cross-border commerce.",
      cta: "Contact us",
      secondary: "Company profile",
      news: "2024.05.01　Greenworld 株式会社 was established.",
      serviceTitle: "SERVICE",
      serviceSub: "Business",
      tradeTitle: "International Trade",
      tradeText:
        "We export Japanese food and wellness products to China and Hong Kong, and introduce Chinese food brands and ingredients to Japan.",
      logisticsTitle: "International Logistics",
      logisticsText:
        "We support cross-border air and sea transportation from China to Japan and from Japan to China.",
      strengthsTitle: "Why Greenworld",
      strengths: [
        ["Japan-China-Hong Kong network", "We coordinate sourcing and sales channels close to daily operations."],
        ["E-commerce support", "We serve sellers on Amazon, Rakuten, TikTok, JD, Tmall, Xiaohongshu and Pinduoduo."],
        ["Owned base", "The company owns its office and warehouse for steady operations."],
        ["Food category focus", "Food, wellness goods, hot pot products, malatang ingredients and food additives."],
      ],
    },
    message: {
      title: "Message",
      sub: "Inquiry",
      lead: "Contact us for trade, logistics, cross-border commerce, quotations or partnership discussions.",
      formTitle: "Inquiry form",
      formNote:
        "This inquiry form is powered by Google Forms. Submissions are handled by Google Forms and are not stored in this website database.",
      noDb: "This website does not store submissions in a database.",
      company: "Company",
      name: "Name",
      email: "Email",
      phone: "Phone",
      type: "Inquiry type",
      typeOptions: ["International trade", "International logistics", "Cross-border commerce", "Partnership", "Other"],
      detail: "Message",
      submit: "Create email",
      recommendationsTitle: "Free third-party form options",
      recommendations: [
        ["Tally", "Generous free plan, embed-friendly, and suitable for Google Sheets workflows."],
        ["Google Forms", "Stable and easy to operate with responses saved to Google Sheets."],
        ["FormSubmit", "No registration is required, and HTML forms can send submissions to email."],
      ],
    },
    about: {
      title: "About",
      sub: "Company profile",
      lead:
        "Greenworld connects Japan, China and Hong Kong through practical trade and logistics support for sustainable business growth.",
      tableTitle: "Company profile",
      rows: [
        ["Company", "Greenworld 株式会社"],
        ["Established", "2024"],
        ["Address", "1-238 Nishi-machi, Minokamo-shi, Gifu 505-0046, Japan"],
        ["Phone", "0574-58-6761"],
        ["Email", "info@greenworld.love"],
        ["Business", "International trade / International logistics by air and sea / Cross-border commerce support"],
        ["Facilities", "Owned office and warehouse"],
      ],
      accessTitle: "Access",
      mapButton: "Open Google Map",
      principlesTitle: "Our principles",
      principles: [
        ["Accurate", "We verify practical details around food products and logistics."],
        ["Responsive", "We support transportation plans aligned with sales schedules."],
        ["Long-term", "We aim for durable distribution systems, not one-off transactions."],
      ],
    },
    footer: "© 2024 Greenworld Co., Ltd. All Rights Reserved.",
  },
};

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem("gw-lang") || "ja");
  const [page, setPage] = useState(() => location.hash.replace("#", "") || "home");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[lang];

  useEffect(() => {
    localStorage.setItem("gw-lang", lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
  }, [lang]);

  useEffect(() => {
    const onHash = () => setPage(location.hash.replace("#", "") || "home");
    addEventListener("hashchange", onHash);
    return () => removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.18 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [page, lang]);

  const go = (next) => {
    location.hash = next === "home" ? "" : next;
    setPage(next);
    setMenuOpen(false);
    scrollTo({ top: 0, behavior: "smooth" });
  };

  const Page = useMemo(() => {
    if (page === "message") return <MessagePage t={t.message} lang={lang} />;
    if (page === "about") return <AboutPage t={t.about} lang={lang} />;
    return <HomePage t={t.home} lang={lang} go={go} />;
  }, [page, lang]);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#" onClick={(e) => (e.preventDefault(), go("home"))}>
          <LogoMark />
          <span>Greenworld</span>
          <small>株式会社</small>
        </a>
        <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={menuOpen ? "nav is-open" : "nav"}>
          {Object.entries(t.nav).map(([key, label]) => (
            <button className={page === key ? "active" : ""} key={key} type="button" onClick={() => go(key)}>
              {label}
            </button>
          ))}
          <div className="language" aria-label="Language">
            <Languages size={15} />
            {["ja", "zh", "en"].map((item) => (
              <button className={lang === item ? "active" : ""} key={item} type="button" onClick={() => setLang(item)}>
                {copy[item].meta.lang}
              </button>
            ))}
          </div>
        </nav>
      </header>
      <main>{Page}</main>
      <Footer t={t} page={page} go={go} lang={lang} setLang={setLang} />
    </>
  );
}

function HomePage({ t, go }) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy reveal">
          <h1>{lineBreak(t.title)}</h1>
          <p>{t.lead}</p>
          <div className="hero-actions">
            <button className="primary" type="button" onClick={() => go("message")}>
              {t.cta}
              <ArrowRight size={17} />
            </button>
            <button className="ghost" type="button" onClick={() => go("about")}>
              {t.secondary}
            </button>
          </div>
        </div>
        <RouteMap />
        <div className="scroll-note">SCROLL</div>
      </section>

      <section className="news-band reveal">
        <strong>NEWS</strong>
        <span>{t.news}</span>
      </section>

      <section className="section services">
        <SectionHeading title={t.serviceTitle} sub={t.serviceSub} />
        <div className="service-grid">
          <article className="service-card reveal">
            <Globe2 />
            <h3>{t.tradeTitle}</h3>
            <p>{t.tradeText}</p>
          </article>
          <article className="service-card reveal delay-1">
            <div className="dual-icons">
              <Ship />
              <Plane />
            </div>
            <h3>{t.logisticsTitle}</h3>
            <p>{t.logisticsText}</p>
          </article>
        </div>
      </section>

      <section className="section strengths reveal">
        <h2>{t.strengthsTitle}</h2>
        <div className="strength-grid">
          {t.strengths.map(([title, text], index) => (
            <article key={title}>
              {[PackageCheck, Sparkles, Building2, ShieldCheck][index] &&
                React.createElement([PackageCheck, Sparkles, Building2, ShieldCheck][index], { size: 26 })}
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function MessagePage({ t }) {
  const [form, setForm] = useState({ company: "", name: "", email: "", phone: "", type: t.typeOptions[0], detail: "" });

  useEffect(() => {
    setForm((prev) => ({ ...prev, type: t.typeOptions[0] }));
  }, [t]);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const submit = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(`[Greenworld] ${form.type} inquiry`);
    const body = encodeURIComponent(
      [
        `${t.company}: ${form.company}`,
        `${t.name}: ${form.name}`,
        `${t.email}: ${form.email}`,
        `${t.phone}: ${form.phone}`,
        `${t.type}: ${form.type}`,
        "",
        `${t.detail}:`,
        form.detail,
      ].join("\n")
    );
    location.href = `mailto:info@greenworld.love?subject=${subject}&body=${body}`;
  };

  return (
    <section className="page-shell">
      <PageIntro title={t.title} sub={t.sub} lead={t.lead} />
      <div className="message-layout">
        <div className="form-panel reveal">
          <h2>{t.formTitle}</h2>
          <p>{t.formNote}</p>
          {FORM_EMBED_URL ? (
            <iframe className="external-form" title={t.formTitle} src={FORM_EMBED_URL} />
          ) : (
            <form className="inquiry-form" onSubmit={submit}>
              <Field label={t.company} value={form.company} onChange={(value) => update("company", value)} />
              <Field label={t.name} value={form.name} required onChange={(value) => update("name", value)} />
              <Field label={t.email} type="email" value={form.email} required onChange={(value) => update("email", value)} />
              <Field label={t.phone} value={form.phone} onChange={(value) => update("phone", value)} />
              <label>
                <span>{t.type}</span>
                <select value={form.type} onChange={(event) => update("type", event.target.value)}>
                  {t.typeOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>{t.detail}</span>
                <textarea required value={form.detail} onChange={(event) => update("detail", event.target.value)} />
              </label>
              <button className="primary form-submit" type="submit">
                {t.submit}
                <Mail size={17} />
              </button>
            </form>
          )}
        </div>
        <aside className="side-note reveal delay-1">
          <div className="privacy-note">
            <CheckCircle2 size={20} />
            <span>{t.noDb}</span>
          </div>
          <h3>{t.recommendationsTitle}</h3>
          {t.recommendations.map(([title, text]) => (
            <div className="recommendation" key={title}>
              <strong>{title}</strong>
              <p>{text}</p>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}

function AboutPage({ t }) {
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=%E5%B2%90%E9%98%9C%E7%9C%8C%E7%BE%8E%E6%BF%83%E5%8A%A0%E8%8C%82%E5%B8%82%E8%A5%BF%E7%94%BA1%E4%B8%81%E7%9B%AE238%E7%95%AA%E5%9C%B0";
  return (
    <section className="page-shell">
      <PageIntro title={t.title} sub={t.sub} lead={t.lead} />
      <div className="about-layout">
        <div className="profile reveal">
          <h2>{t.tableTitle}</h2>
          <div className="profile-table">
            {t.rows.map(([label, value]) => (
              <div className="profile-row" key={label}>
                <strong>{label}</strong>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="principles reveal delay-1">
          <h2>{t.principlesTitle}</h2>
          {t.principles.map(([title, text]) => (
            <article key={title}>
              <CheckCircle2 size={20} />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <section className="access reveal">
        <div>
          <h2>{t.accessTitle}</h2>
          <p>〒505-0046 岐阜県美濃加茂市西町1丁目238番地</p>
          <a className="primary map-link" href={mapUrl} target="_blank" rel="noreferrer">
            <MapPin size={17} />
            {t.mapButton}
          </a>
        </div>
        <WarehouseLine />
      </section>
    </section>
  );
}

function RouteMap() {
  return (
    <div className="route-map reveal delay-1" aria-hidden="true">
      <svg viewBox="0 0 640 520" role="img">
        <defs>
          <radialGradient id="pinGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e5d990" />
            <stop offset="100%" stopColor="#004a32" />
          </radialGradient>
        </defs>
        <path className="coast" d="M423 86c47 25 70 67 64 126-4 43-30 80-75 110-41 28-62 65-64 113M311 120c-50 19-82 53-96 102-16 56-1 110 46 161M154 166c-43 43-61 95-54 156 7 59 36 103 89 132" />
        <path className="route r1" d="M433 190 C340 198, 270 254, 200 372" />
        <path className="route r2" d="M433 190 C354 295, 293 344, 200 372" />
        <path className="route r3" d="M200 372 C295 314, 377 255, 500 234" />
        <g className="pin japan">
          <circle cx="433" cy="190" r="17" />
          <circle cx="433" cy="190" r="6" />
          <text x="458" y="188">JAPAN</text>
        </g>
        <g className="pin china">
          <circle cx="192" cy="372" r="17" />
          <circle cx="192" cy="372" r="6" />
          <text x="217" y="376">CHINA</text>
        </g>
        <g className="pin hongkong">
          <circle cx="500" cy="234" r="14" />
          <circle cx="500" cy="234" r="5" />
          <text x="384" y="266">HONG KONG</text>
        </g>
      </svg>
      <div className="route-caption">
        <span></span>
        <p>Route line animation</p>
      </div>
    </div>
  );
}

function WarehouseLine() {
  return (
    <svg className="warehouse" viewBox="0 0 320 180" aria-hidden="true">
      <path d="M40 145V73l94-40 104 40v72" />
      <path d="M134 33v112M74 145V96h42v49M166 145v-41h58v41M185 113h20M185 128h20" />
      <path d="M238 73h38v72h-38" />
    </svg>
  );
}

function Field({ label, type = "text", value, onChange, required }) {
  return (
    <label>
      <span>{label}</span>
      <input type={type} value={value} required={required} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function PageIntro({ title, sub, lead }) {
  return (
    <div className="page-intro reveal">
      <h1>{title}</h1>
      <p className="sub">{sub}</p>
      <p>{lead}</p>
    </div>
  );
}

function SectionHeading({ title, sub }) {
  return (
    <div className="section-heading reveal">
      <h2>{title}</h2>
      <p>{sub}</p>
    </div>
  );
}

function Footer({ t, page, go, lang, setLang }) {
  return (
    <footer>
      <div className="footer-inner">
        <a className="brand footer-brand" href="#" onClick={(e) => (e.preventDefault(), go("home"))}>
          <LogoMark />
          <span>Greenworld</span>
          <small>株式会社</small>
        </a>
        <nav>
          {Object.entries(t.nav).map(([key, label]) => (
            <button className={page === key ? "active" : ""} key={key} type="button" onClick={() => go(key)}>
              {label}
            </button>
          ))}
        </nav>
        <div className="footer-lang">
          {["ja", "zh", "en"].map((item) => (
            <button className={lang === item ? "active" : ""} key={item} type="button" onClick={() => setLang(item)}>
              {copy[item].meta.lang}
            </button>
          ))}
        </div>
      </div>
      <p>{t.footer}</p>
    </footer>
  );
}

function lineBreak(text) {
  return text.split("\n").map((part, index) => (
    <React.Fragment key={part}>
      {index > 0 && <br />}
      {part}
    </React.Fragment>
  ));
}

function LogoMark() {
  return (
    <svg className="logo-mark" viewBox="0 0 48 48" aria-hidden="true">
      <circle className="logo-ring" cx="24" cy="24" r="20" />
      <path className="logo-g" d="M31.8 17.6A11 11 0 1 0 33.7 27H25" />
      <path className="logo-route" d="M14.8 30.8C20.2 22.4 26.8 18.3 36 17.2" />
      <path className="logo-leaf" d="M30.5 32.2c5.5-.9 8.6-4.1 9.1-9.4-5.4.6-8.5 3.7-9.1 9.4Z" />
      <path className="logo-accent-line" d="M33.2 29.7l4-4.3" />
      <circle className="logo-dot" cx="14.8" cy="30.8" r="2.1" />
      <circle className="logo-accent" cx="36" cy="17.2" r="2.3" />
    </svg>
  );
}

createRoot(document.getElementById("root")).render(<App />);
