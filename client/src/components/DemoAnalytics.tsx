import { Activity, FileText } from "lucide-react";

const chartPoints = [
  [26, 142],
  [128, 116],
  [230, 126],
  [332, 76],
  [434, 91],
  [536, 48],
  [638, 64],
] as const;

const linePath = chartPoints
  .map(([x, y], index) => `${index === 0 ? "M" : "L"}${x} ${y}`)
  .join(" ");
const areaPath = `${linePath} L638 180 L26 180 Z`;

export default function DemoAnalytics({ period }: { period: string }) {
  return (
    <div className="mt-5 grid gap-4 xl:grid-cols-[1.65fr_1fr]">
      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_2px_8px_rgba(19,49,66,0.045)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3.5 sm:px-5">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-[#eaf4fb] text-[#126aa7]">
              <Activity size={15} />
            </span>
            <div>
              <h2 className="m-0 text-[12px] font-bold text-[#263f50]">
                Évolution des traitements
              </h2>
              <p className="mb-0 mt-0.5 text-[10px] text-slate-400">
                Pages traitées · {period} · simulation
              </p>
            </div>
          </div>
          <span className="rounded-full bg-[#eaf4fb] px-2.5 py-1 text-[9px] font-bold text-[#105f96]">
            + 12,4 %
          </span>
        </div>
        <div className="px-3 pb-2 pt-4 sm:px-5">
          <svg
            viewBox="0 0 680 220"
            className="h-[190px] w-full"
            role="img"
            aria-label="Graphique simulé de l’évolution des traitements sur les six derniers mois"
          >
            <defs>
              <linearGradient
                id="numeris-chart-fill"
                x1="0"
                x2="0"
                y1="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#0067bb" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#0067bb" stopOpacity="0.015" />
              </linearGradient>
            </defs>
            {[35, 72, 109, 146, 183].map(y => (
              <line
                key={y}
                x1="25"
                x2="650"
                y1={y}
                y2={y}
                stroke="#e8edf0"
                strokeDasharray="3 4"
              />
            ))}
            {["0", "400", "800", "1 200", "1 600"].map((label, index) => (
              <text
                key={label}
                x="0"
                y={187 - index * 37}
                fill="#9aa8b0"
                fontSize="9"
              >
                {label}
              </text>
            ))}
            <path d={areaPath} fill="url(#numeris-chart-fill)" />
            <path
              d={linePath}
              fill="none"
              stroke="#0067bb"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {chartPoints.map(([x, y], index) => (
              <circle
                key={x}
                cx={x}
                cy={y}
                r="4"
                fill="#fff"
                stroke="#0067bb"
                strokeWidth="2.5"
                aria-label={`Point ${index + 1}`}
              />
            ))}
            {["Mai", "Juin", "Juil.", "Août", "Sept.", "Oct.", "Nov."].map(
              (label, index) => (
                <text
                  key={label}
                  x={chartPoints[index][0]}
                  y="207"
                  fill="#8b9aa3"
                  fontSize="9"
                  textAnchor="middle"
                >
                  {label}
                </text>
              )
            )}
          </svg>
          <p className="mb-2 mt-1 text-center text-[9px] text-slate-400">
            Volumes illustratifs — aucune donnée de production
          </p>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white shadow-[0_2px_8px_rgba(19,49,66,0.045)]">
        <div className="flex items-center gap-2.5 border-b border-slate-100 px-4 py-3.5 sm:px-5">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-[#eaf4fb] text-[#126aa7]">
            <FileText size={15} />
          </span>
          <div>
            <h2 className="m-0 text-[12px] font-bold text-[#263f50]">
              Répartition par type
            </h2>
            <p className="mb-0 mt-0.5 text-[10px] text-slate-400">
              Corpus documentaire · démo
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 px-4 py-5 sm:flex-row sm:justify-center sm:gap-6 xl:flex-col xl:gap-3">
          <div
            className="relative grid h-36 w-36 shrink-0 place-items-center rounded-full"
            style={{
              background:
                "conic-gradient(#0067bb 0deg 132deg, #6184a5 132deg 223deg, #ed9b61 223deg 276deg, #7b8ea0 276deg 327deg, #d9e2e7 327deg 360deg)",
            }}
            role="img"
            aria-label="Graphique circulaire simulé des types de documents"
          >
            <div className="grid h-[82px] w-[82px] place-items-center rounded-full bg-white text-center shadow-inner">
              <span>
                <strong className="block text-[19px] font-extrabold tracking-tight text-[#263f50]">
                  1 284
                </strong>
                <small className="text-[8px] font-bold uppercase tracking-wide text-slate-400">
                  documents
                </small>
              </span>
            </div>
          </div>
          <ul className="m-0 grid w-full max-w-[210px] list-none gap-2 p-0 text-[10px] text-slate-600">
            {[
              ["#0067bb", "Contrats", "38 %"],
              ["#6184a5", "Factures", "25 %"],
              ["#ed9b61", "Dossiers", "15 %"],
              ["#7b8ea0", "Procédures", "14 %"],
              ["#d9e2e7", "Autres", "8 %"],
            ].map(([color, label, value]) => (
              <li key={label} className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-sm"
                  style={{ backgroundColor: color }}
                />
                <span className="flex-1">{label}</span>
                <strong className="font-semibold text-slate-700">
                  {value}
                </strong>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
