import { useEffect, useState } from "react";
import { useLang } from "../contexts/LanguageContext";
import { CONTACT } from "../config/contact";
import WhatsAppLink from "./WhatsAppLink";

const PRAYER_KEYS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

export default function PrayerTimes() {
  const { t } = useLang();
  const [times, setTimes] = useState(null);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchTimes() {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${CONTACT.lat}&longitude=${CONTACT.lon}&method=2`,
        );
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        setTimes(data.data.timings);
        setDate(data.data.date.readable);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchTimes();
  }, []);

  return (
    <>
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {t("prayer.title")}
          </h2>
          {date && <span className="text-sm text-gray-500">{date}</span>}
        </div>

        {loading && (
          <p className="text-gray-500 text-sm py-4 text-center">
            {t("prayer.loading")}
          </p>
        )}

        {error && (
          <p className="text-red-500 text-sm py-4 text-center">
            {t("prayer.error")}
          </p>
        )}

        {times && (
          <ul className="divide-y divide-gray-100">
            {PRAYER_KEYS.map((key) => (
              <li key={key} className="flex justify-between items-center py-3">
                <span className="font-medium text-gray-700">
                  {t(`prayer.names.${key}`)}
                </span>
                <span className="text-primary-700 font-semibold tabular-nums">
                  {times[key]}
                </span>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-4 text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          ⚠️ The times above are approximate. Exact jamaat times are confirmed
          daily by Imam in the WhatsApp group.
        </p>

        <WhatsAppLink
          href={CONTACT.whatsappGroup}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-lg transition-colors"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          {t("prayer.whatsapp")}
        </WhatsAppLink>
      </div>
    </>
  );
}
