import { Link } from "react-router-dom";
import { useLang } from "../../contexts/LanguageContext";

const CONTENT = {
  en: {
    label: "Land Acquisition · Ishikawa, Japan",
    title: "Mosque Extension",
    desc: "Let's contribute to acquiring land for the extension of the Kanazawa Umar bin Al-Khattab Mosque. Each portion of donations represents 1 m² of land.",
    cta: "Wakaf Now",
  },
  id: {
    label: "Pengadaan Tanah · Ishikawa, Jepang",
    title: "Perluasan Masjid",
    desc: "Mari berkontribusi untuk pengadaan tanah perluasan Masjid Umar bin Al-Khattab Kanazawa. Setiap bagian donasi mewakili 1 m² tanah.",
    cta: "Wakaf Sekarang",
  },
  ja: {
    label: "土地取得プロジェクト · 石川県",
    title: "モスク拡張プロジェクト",
    desc: "カナザワ・ウマル・ビン・アル＝ハッタブ・モスクの拡張のための土地取得にご協力ください。寄付の各口は1m²の土地を表します。",
    cta: "ワカフを贈る",
  },
};

export default function WakafBanner() {
  const { lang } = useLang();
  const c = CONTENT[lang] ?? CONTENT.en;

  return (
    <section className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="text-4xl select-none">🕌</div>
        <div className="flex-1 text-center sm:text-left">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-100 mb-1">
            {c.label}
          </p>
          <h2 className="text-xl md:text-2xl font-bold mb-1">{c.title}</h2>
          <p className="text-amber-100 text-sm">{c.desc}</p>
        </div>
        <Link
          to="/wakaf"
          className="shrink-0 bg-white text-orange-600 font-bold px-7 py-3 rounded-xl shadow-md hover:bg-amber-50 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 flex items-center gap-2 text-base"
        >
          {c.cta}
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
