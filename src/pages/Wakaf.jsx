import { useState, useEffect } from "react";
import { useLang } from "../contexts/LanguageContext";
import { useSEO } from "../hooks/useSEO";
import WhatsAppLink from "../components/WhatsAppLink";
import { CONTACT } from "../config/contact";

const TOTAL = 300;
const PRICE = 12000;
const TARGET = TOTAL * PRICE;
const API_KEY = "E2Ko8rQAMB@hdtHE*ttiRQUZKKWnD3&M";
const DASHBOARD_URL =
  "https://autonode.hasanmn.com/webhook/mosque-donation/dashboard";
const GRID_URL = "https://autonode.hasanmn.com/webhook/mosque-donation/grid";

function Skeleton({ className }) {
  return <div className={`bg-gray-200 rounded animate-pulse ${className}`} />;
}

export default function Wakaf() {
  const { t } = useLang();
  useSEO(t("wakaf.pageTitle"), t("wakaf.pageDesc"));

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dashboard, setDashboard] = useState(null);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    const headers = { "X-API-Key": API_KEY };
    Promise.all([
      fetch(DASHBOARD_URL, { headers }).then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      }),
      fetch(GRID_URL, { headers }).then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      }),
    ])
      .then(([dash, grid]) => {
        setDashboard(dash);
        setStatuses(grid.statuses || []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const paid = dashboard?.paid ?? 0;
  const reserved = dashboard?.reserved ?? 0;
  const available = dashboard?.available ?? TOTAL;
  const pct = Math.round((paid / TOTAL) * 100);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
            {t("wakaf.pageTitle")}
          </h1>
          <p className="text-primary-200 text-base">{t("wakaf.subtitle")}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        {/* About this project */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {t("wakaf.aboutTitle")}
          </h2>
          <p
            className="text-gray-600 leading-relaxed mb-3"
            dangerouslySetInnerHTML={{ __html: t("wakaf.about1") }}
          />
          <p
            className="text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t("wakaf.about2") }}
          />
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: "🗺️", val: "300", label: t("wakaf.infoPortions") },
            { icon: "📐", val: "~1 m²", label: t("wakaf.infoSize") },
            { icon: "💴", val: "¥12,000", label: t("wakaf.infoPrice") },
          ].map(({ icon, val, label }) => (
            <div key={label} className="card text-center py-5">
              <div className="text-3xl mb-2">{icon}</div>
              <div className="text-lg font-bold text-primary-600">{val}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide mt-1">
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Hadith */}
        <div className="bg-primary-50 border border-primary-200 rounded-xl px-6 py-5 text-center">
          <p className="text-gray-500 italic leading-relaxed">
            {t("wakaf.hadithText")}{" "}
            <span className="text-primary-700 font-semibold not-italic">
              {t("wakaf.hadithSource")}
            </span>
          </p>
        </div>

        {/* How to Donate */}
        <div className="bg-gradient-to-br from-primary-700 to-primary-900 rounded-xl p-6 text-white">
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary-200 mb-4">
            {t("wakaf.howToDonate")}
          </h2>
          <div className="mb-5 space-y-2 text-sm">
            <p className="font-semibold text-white">
              Bank Transfer (Japan Post Bank / ゆうちょ銀行)
            </p>
            <div className="text-white/80 space-y-1">
              <p>
                <span className="text-white/60">Branch</span>{" "}
                <span className="font-mono">三八八 (318)</span>
                <span className="mx-2 text-white/40">|</span>
                <span className="text-white/60">Branch code</span>{" "}
                <span className="font-mono">13160-2</span>
              </p>
              <p>
                <span className="text-white/60">Account type</span>{" "}
                <span className="font-mono">Ordinary (普通)</span>
                <span className="mx-2 text-white/40">|</span>
                <span className="text-white/60">Account no</span>{" "}
                <span className="font-mono">0835916</span>
              </p>
              <p>
                <span className="text-white/60">Account name</span>{" "}
                <span className="font-mono">
                  カナザワ マスジッド フランド ライ ダイ アスク
                </span>
              </p>
            </div>
          </div>
          <p className="text-sm text-white/70 mb-4">
            {t("wakaf.ctaText").replace("{contact}", CONTACT.imam.name)}
          </p>
          <WhatsAppLink
            href={CONTACT.imam.whatsapp}
            className="inline-flex items-center gap-2 bg-white text-primary-700 font-semibold px-5 py-2.5 rounded-lg hover:bg-primary-50 transition-colors text-sm"
          >
            <svg
              className="h-5 w-5 shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t("wakaf.step2")}
          </WhatsAppLink>
        </div>

        {/* Donation Progress heading */}
        <div>
          <h2 className="section-title">{t("wakaf.donationProgress")}</h2>
        </div>

        {/* Loading */}
        {loading && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 rounded-xl" />
              ))}
            </div>
            <Skeleton className="h-12 rounded-xl" />
            <div
              className="grid gap-[2px]"
              style={{ gridTemplateColumns: "repeat(15, 1fr)" }}
            >
              {Array.from({ length: 300 }, (_, i) => (
                <Skeleton key={i} className="aspect-square rounded-sm" />
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="card bg-red-50 text-red-700 text-center py-10">
            {t("wakaf.errorMsg")}
          </div>
        )}

        {/* Stats + grid */}
        {!loading && !error && dashboard && (
          <>
            {/* Stats bar — 2 cols on mobile, 4 on sm+ */}
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 divide-x-0 sm:divide-x divide-gray-200 border border-gray-200 rounded-xl overflow-hidden">
              {[
                {
                  label: t("wakaf.totalPortions"),
                  val: TOTAL,
                  cls: "text-gray-900",
                },
                {
                  label: t("wakaf.portionsTaken"),
                  val: paid,
                  cls: "text-primary-600",
                },
                {
                  label: t("wakaf.portionsReserved"),
                  val: reserved,
                  cls: "text-orange-500",
                },
                {
                  label: t("wakaf.portionsAvailable"),
                  val: available,
                  cls: "text-gray-500",
                },
              ].map(({ label, val, cls }, i) => (
                <div
                  key={label}
                  className={`py-5 text-center bg-white ${i % 2 === 1 ? "border-l border-gray-200" : ""} sm:border-l-0`}
                >
                  <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-1">
                    {label}
                  </div>
                  <div className={`text-3xl font-bold ${cls}`}>{val}</div>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="bg-primary-50 border border-primary-200 rounded-xl px-5 py-4">
              <div className="flex flex-wrap justify-between gap-1 text-sm font-semibold text-gray-700 mb-3">
                <span>
                  {pct}% {t("wakaf.funded")}
                </span>
                <span className="text-gray-500">
                  ¥{(paid * PRICE).toLocaleString()} / ¥
                  {TARGET.toLocaleString()}
                </span>
              </div>
              <div className="h-3 bg-primary-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-600 rounded-full transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-5 text-sm text-gray-600 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-sm bg-primary-600 inline-block" />
                {t("wakaf.paid")}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-sm bg-orange-500 inline-block" />
                {t("wakaf.reserved")}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-sm bg-primary-50 border border-primary-300 inline-block" />
                {t("wakaf.available")}
              </div>
            </div>

            {/* Portion grid */}
            <div>
              <p className="text-sm text-gray-500 mb-3">
                {t("wakaf.portionMapDesc")}
              </p>
              <div className="overflow-x-auto -mx-4 px-4">
                <div
                  className="grid gap-[3px] min-w-[280px]"
                  style={{ gridTemplateColumns: "repeat(15, minmax(0, 1fr))" }}
                >
                  {Array.from({ length: TOTAL }, (_, i) => {
                    const status = statuses[i] || "available";
                    const cls =
                      status === "paid"
                        ? "bg-primary-600 text-white"
                        : status === "reserved"
                          ? "bg-orange-500 text-white"
                          : "bg-primary-50 text-primary-300 border border-primary-200";
                    return (
                      <div
                        key={i}
                        className={`aspect-square flex items-center justify-center text-[10px] font-semibold rounded-sm transition-transform active:scale-110 sm:hover:scale-125 sm:hover:z-10 relative cursor-default ${cls}`}
                        title={`#${i + 1} — ${status}`}
                      >
                        {i + 1}
                      </div>
                    );
                  })}
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                {t("wakaf.dataNote")}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
