import { Link } from "react-router-dom";
import { useLang } from "../../contexts/LanguageContext";

const CONTENT = {
  en: {
    label: "Eid ul-Adha 1447H · Wednesday, 27 May 2026",
    title: "Register for Eid ul-Adha Prayer",
    desc: "Eid ul-Adha has been confirmed! Secure your spot in one of three sessions (6:30, 7:30, or 8:30 AM). Registration is quick and helps us prepare the space for everyone.",
    cta: "Register Now",
  },
  id: {
    label: "Idul Adha 1447H · Rabu, 27 Mei 2026",
    title: "Daftar Shalat Idul Adha",
    desc: "Idul Adha telah dikonfirmasi! Amankan tempat Anda di salah satu dari tiga sesi (6:30, 7:30, atau 8:30 pagi). Pendaftaran cepat dan membantu kami mempersiapkan tempat untuk semua.",
    cta: "Daftar Sekarang",
  },
  ja: {
    label: "イード・アル・アドハー 1447H · 2026年5月27日（水）",
    title: "イード・アル・アドハーの礼拝に登録",
    desc: "イード・アル・アドハーが確定しました！3つのセション（6:30、7:30、または8:30）のいずれかで場所を確保してください。登録は簡単で、皆様のためのスペース準備に役立ちます。",
    cta: "今すぐ登録",
  },
};

export default function EidAdhaBanner() {
  const { lang } = useLang();
  const c = CONTENT[lang] ?? CONTENT.en;

  return (
    <section className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="text-4xl select-none">🌙</div>
        <div className="flex-1 text-center sm:text-left">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-100 mb-1">
            {c.label}
          </p>
          <h2 className="text-xl md:text-2xl font-bold mb-1">{c.title}</h2>
          <p className="text-amber-100 text-sm">{c.desc}</p>
        </div>
        <Link
          to="/register/eid-adha-1447"
          className="shrink-0 bg-white text-orange-600 font-bold px-7 py-3 rounded-xl shadow-md hover:bg-amber-50 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 flex items-center gap-2 text-base"
        >
          {c.cta}
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
