import { useState, useEffect } from "react";
import { useLang } from "../contexts/LanguageContext";
import { useSEO } from "../hooks/useSEO";
import { DONATION_CONFIG } from "../config/donation";

function generateChallenge() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  const ops = [
    { question: `${a} + ${b}`, answer: a + b },
    { question: `${a} × ${b}`, answer: a * b },
  ];
  return ops[Math.floor(Math.random() * ops.length)];
}

function currentMonthKey() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

export default function Donation() {
  const { t } = useLang();
  useSEO(t("donation.title"), t("donation.subtitle"));

  const [progress, setProgress] = useState(null); // { total, count }
  const [form, setForm] = useState({ name: "", amount: "", transferDate: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [challenge] = useState(generateChallenge);
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState(false);

  useEffect(() => {
    const month = currentMonthKey();
    fetch(`/api/donate?month=${month}`)
      .then((r) => r.json())
      .then((data) => setProgress({ total: data.total ?? 0, count: data.count ?? 0 }))
      .catch(() => setProgress({ total: 0, count: 0 }));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.amount || !form.transferDate) return;

    if (Number(captchaInput) !== challenge.answer) {
      setCaptchaError(true);
      return;
    }
    setCaptchaError(false);
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          amount: Number(form.amount),
          transferDate: form.transferDate,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        // Refresh progress
        fetch(`/api/donate?month=${currentMonthKey()}`)
          .then((r) => r.json())
          .then((d) => setProgress({ total: d.total ?? 0, count: d.count ?? 0 }))
          .catch(() => {});
      } else {
        const msg = data.error === "duplicate"
          ? t("donation.duplicate")
          : t("donation.error");
        setErrorMsg(msg);
        setStatus("error");
      }
    } catch {
      setErrorMsg(t("donation.error"));
      setStatus("error");
    }
  }

  const { bank, monthlyTarget } = DONATION_CONFIG;
  const progressPct = progress
    ? Math.min(100, Math.round((progress.total / monthlyTarget) * 100))
    : 0;

  if (status === "success") {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="card">
          <div className="text-5xl mb-4">💚</div>
          <h1 className="text-2xl font-bold text-primary-700 mb-2">
            {t("donation.successTitle")}
          </h1>
          <p className="text-gray-600">{t("donation.successBody")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      <div>
        <h1 className="section-title">{t("donation.title")}</h1>
        <p className="text-gray-600">{t("donation.subtitle")}</p>
      </div>

      {/* Bank details card */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{t("donation.bankCardTitle")}</h2>
        <dl className="space-y-3 text-sm">
          <div className="flex gap-2">
            <dt className="w-44 shrink-0 text-gray-500">{t("donation.bankName")}</dt>
            <dd className="font-medium text-gray-800">{bank.name}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-44 shrink-0 text-gray-500">{t("donation.accountName")}</dt>
            <dd className="font-medium text-gray-800">{bank.accountName}</dd>
          </div>
          <div className="border-t border-gray-100 pt-3">
            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">{t("donation.symbolNumber")}</p>
            <div className="flex gap-2">
              <dt className="w-44 shrink-0 text-gray-500">記号 / Symbol</dt>
              <dd className="font-mono font-medium text-gray-800">{bank.symbol}</dd>
            </div>
            <div className="flex gap-2 mt-1">
              <dt className="w-44 shrink-0 text-gray-500">番号 / Number</dt>
              <dd className="font-mono font-medium text-gray-800">{bank.number}</dd>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-3">
            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">{t("donation.otherBankBranch")}</p>
            <div className="flex gap-2">
              <dt className="w-44 shrink-0 text-gray-500">支店 / Branch</dt>
              <dd className="font-medium text-gray-800">{bank.branchName}</dd>
            </div>
            <div className="flex gap-2 mt-1">
              <dt className="w-44 shrink-0 text-gray-500">{t("donation.accountType")}</dt>
              <dd className="font-medium text-gray-800">{bank.accountType}</dd>
            </div>
            <div className="flex gap-2 mt-1">
              <dt className="w-44 shrink-0 text-gray-500">{t("donation.accountNumber")}</dt>
              <dd className="font-mono font-medium text-gray-800">{bank.accountNumber}</dd>
            </div>
          </div>
        </dl>
      </div>

      {/* Progress bar */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">{t("donation.progressTitle")}</h2>
        {progress === null ? (
          <p className="text-sm text-gray-500">{t("donation.progressLoading")}</p>
        ) : (
          <>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span className="font-semibold text-primary-700">
                ¥{progress.total.toLocaleString()}
              </span>
              <span className="text-gray-400">{t("donation.progressTarget")}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
              <div
                className="bg-primary-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{progressPct}%</span>
              <span>{progress.count} {t("donation.progressDonors")}</span>
            </div>
          </>
        )}
      </div>

      {/* Confirmation form */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{t("donation.formTitle")}</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("donation.nameLabel")}
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={t("donation.namePlaceholder")}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("donation.amountLabel")}
            </label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder={t("donation.amountPlaceholder")}
              min={1}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Transfer date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("donation.dateLabel")}
            </label>
            <input
              type="date"
              name="transferDate"
              value={form.transferDate}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("donation.messageLabel")}
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder={t("donation.messagePlaceholder")}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            />
          </div>

          {/* Captcha */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <p className="text-sm font-medium text-gray-700 mb-1">
              {t("prayer.captchaTitle")}
            </p>
            <p className="text-sm text-gray-500 mb-3">{t("prayer.captchaPrompt")}</p>
            <p className="text-2xl font-bold text-center text-primary-700 mb-3 py-2 bg-primary-50 rounded-lg">
              {challenge.question} = ?
            </p>
            <input
              type="number"
              value={captchaInput}
              onChange={(e) => { setCaptchaInput(e.target.value); setCaptchaError(false); }}
              placeholder={t("prayer.captchaPlaceholder")}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {captchaError && (
              <p className="text-red-500 text-sm text-center mt-1">{t("prayer.captchaError")}</p>
            )}
          </div>

          {status === "error" && (
            <p className="text-sm text-red-600">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full py-4 px-6 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-primary-600 to-primary-700 shadow-lg hover:from-primary-500 hover:to-primary-600 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg flex items-center justify-center gap-2"
          >
            {status === "submitting" ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                {t("donation.submitting")}
              </>
            ) : (
              <>
                {t("donation.submit")}
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
