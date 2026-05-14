import React, { useMemo, useState } from "react";

const POWERS_8 = [128, 64, 32, 16, 8, 4, 2, 1];
const BIT_LABELS = ["2⁷", "2⁶", "2⁵", "2⁴", "2³", "2²", "2¹", "2⁰"];
const MAX_8_BIT = 255;

function sanitizeBinaryInput(value) {
  return String(value ?? "").replace(/[^01]/g, "");
}

function hasOnlyBinaryCharacters(value) {
  const text = String(value ?? "").trim();
  return text !== "" && /^[01]+$/.test(text);
}

function isValidDecimalString(value) {
  const text = String(value ?? "").trim();
  return /^\d+$/.test(text);
}

function toBinary8(value) {
  const n = Number(value);
  if (!Number.isInteger(n) || n < 0 || n > MAX_8_BIT) return "";
  return n.toString(2).padStart(8, "0");
}

function normalizeBinary8(value) {
  const clean = sanitizeBinaryInput(value);
  if (!clean) return "";
  return clean.padStart(8, "0").slice(-8);
}

function binToDec(value) {
  const clean = sanitizeBinaryInput(value);
  if (!clean) return null;
  return parseInt(clean, 2);
}

function binToOct(value) {
  const clean = sanitizeBinaryInput(value);
  if (!clean) return null;
  return parseInt(clean, 2).toString(8);
}

function binToHex(value) {
  const clean = sanitizeBinaryInput(value);
  if (!clean) return null;
  return parseInt(clean, 2).toString(16).toUpperCase();
}

function groupBits(value, size) {
  const clean = sanitizeBinaryInput(value);
  if (!clean || !Number.isInteger(size) || size <= 0) return [];
  const pad = (size - (clean.length % size)) % size;
  const padded = "0".repeat(pad) + clean;
  const groups = [];
  for (let i = 0; i < padded.length; i += size) {
    groups.push(padded.slice(i, i + size));
  }
  return groups;
}

function decimalProcedure(n) {
  const bits = toBinary8(n);
  const selected = POWERS_8.filter((power, index) => bits[index] === "1");
  if (selected.length === 0) return `${n} = 0`;
  return `${n} = ${selected.join(" + ")}`;
}

function binaryWeightedProcedure(bits) {
  const binary = normalizeBinary8(bits);
  const selected = POWERS_8.filter((power, index) => binary[index] === "1");
  if (selected.length === 0) return "0 = 0";
  return `${selected.join(" + ")} = ${binToDec(binary)}`;
}

const ejercicios = [
  {
    seccion: "A",
    tipo: "Decimal a Binario",
    entrada: "188₁₀",
    resultado: `${toBinary8(188)}₂`,
    procedimiento: decimalProcedure(188),
    bits: toBinary8(188),
  },
  {
    seccion: "A",
    tipo: "Decimal a Binario",
    entrada: "245₁₀",
    resultado: `${toBinary8(245)}₂`,
    procedimiento: decimalProcedure(245),
    bits: toBinary8(245),
  },
  {
    seccion: "A",
    tipo: "Decimal a Binario",
    entrada: "163₁₀",
    resultado: `${toBinary8(163)}₂`,
    procedimiento: decimalProcedure(163),
    bits: toBinary8(163),
  },
  {
    seccion: "A",
    tipo: "Decimal a Binario",
    entrada: "225₁₀",
    resultado: `${toBinary8(225)}₂`,
    procedimiento: decimalProcedure(225),
    bits: toBinary8(225),
  },
  {
    seccion: "B",
    tipo: "Binario a Decimal",
    entrada: "10110101₂",
    resultado: `${binToDec("10110101")}₁₀`,
    procedimiento: binaryWeightedProcedure("10110101"),
    bits: "10110101",
  },
  {
    seccion: "B",
    tipo: "Binario a Decimal",
    entrada: "11110001₂",
    resultado: `${binToDec("11110001")}₁₀`,
    procedimiento: binaryWeightedProcedure("11110001"),
    bits: "11110001",
  },
  {
    seccion: "B",
    tipo: "Binario a Decimal",
    entrada: "10011110₂",
    resultado: `${binToDec("10011110")}₁₀`,
    procedimiento: binaryWeightedProcedure("10011110"),
    bits: "10011110",
  },
  {
    seccion: "B",
    tipo: "Binario a Decimal",
    entrada: "11001010₂",
    resultado: `${binToDec("11001010")}₁₀`,
    procedimiento: binaryWeightedProcedure("11001010"),
    bits: "11001010",
  },
  {
    seccion: "C",
    tipo: "Binario a Octal",
    entrada: "11100110₂",
    resultado: `${binToOct("11100110")}₈`,
    procedimiento: `Agrupar en ternas: ${groupBits("11100110", 3).join(
      " "
    )} → ${binToOct("11100110")}₈`,
    bits: "11100110",
  },
  {
    seccion: "C",
    tipo: "Binario a Octal",
    entrada: "10101111₂",
    resultado: `${binToOct("10101111")}₈`,
    procedimiento: `Agrupar en ternas: ${groupBits("10101111", 3).join(
      " "
    )} → ${binToOct("10101111")}₈`,
    bits: "10101111",
  },
  {
    seccion: "C",
    tipo: "Binario a Octal",
    entrada: "10011110₂",
    resultado: `${binToOct("10011110")}₈`,
    procedimiento: `Agrupar en ternas: ${groupBits("10011110", 3).join(
      " "
    )} → ${binToOct("10011110")}₈`,
    bits: "10011110",
  },
  {
    seccion: "C",
    tipo: "Binario a Octal",
    entrada: "11001010₂",
    resultado: `${binToOct("11001010")}₈`,
    procedimiento: `Agrupar en ternas: ${groupBits("11001010", 3).join(
      " "
    )} → ${binToOct("11001010")}₈`,
    bits: "11001010",
  },
  {
    seccion: "D",
    tipo: "Binario a Hexadecimal",
    entrada: "11110000₂",
    resultado: `${binToHex("11110000")}₁₆`,
    procedimiento: `Agrupar en cuartetos: ${groupBits("11110000", 4).join(
      " "
    )} → ${binToHex("11110000")}₁₆`,
    bits: "11110000",
  },
  {
    seccion: "D",
    tipo: "Binario a Hexadecimal",
    entrada: "10101011₂",
    resultado: `${binToHex("10101011")}₁₆`,
    procedimiento: `Agrupar en cuartetos: ${groupBits("10101011", 4).join(
      " "
    )} → ${binToHex("10101011")}₁₆`,
    bits: "10101011",
  },
  {
    seccion: "D",
    tipo: "Binario a Hexadecimal",
    entrada: "10011110₂",
    resultado: `${binToHex("10011110")}₁₆`,
    procedimiento: `Agrupar en cuartetos: ${groupBits("10011110", 4).join(
      " "
    )} → ${binToHex("10011110")}₁₆`,
    bits: "10011110",
  },
  {
    seccion: "D",
    tipo: "Binario a Hexadecimal",
    entrada: "11001010₂",
    resultado: `${binToHex("11001010")}₁₆`,
    procedimiento: `Agrupar en cuartetos: ${groupBits("11001010", 4).join(
      " "
    )} → ${binToHex("11001010")}₁₆`,
    bits: "11001010",
  },
];

const incisoE = [168, 255, 133, 222].map((n) => ({
  decimal: n,
  binario: toBinary8(n),
  octal: binToOct(toBinary8(n)),
  hexadecimal: binToHex(toBinary8(n)),
}));

const cuestionario = [
  [
    "¿Qué diferencia existe entre una señal analógica y una digital?",
    "La señal analógica varía de forma continua; la señal digital trabaja con valores discretos, normalmente 0 y 1.",
  ],
  [
    "¿Por qué el sistema binario es utilizado en computadoras?",
    "Porque los circuitos digitales pueden representar dos estados eléctricos estables: encendido/apagado o alto/bajo.",
  ],
  [
    "¿Cuál es la ventaja del sistema hexadecimal?",
    "Permite representar números binarios largos de forma más compacta, agrupando cada 4 bits en un dígito hexadecimal.",
  ],
  [
    "¿Qué relación existe entre el sistema binario y el octal?",
    "El octal se obtiene agrupando el binario en ternas, porque 2³ = 8.",
  ],
  [
    "¿Por qué son importantes las conversiones numéricas en sistemas digitales?",
    "Permiten interpretar, programar, analizar y representar información dentro de computadoras y circuitos digitales.",
  ],
];

const tests = [
  {
    name: "Decimal 245 a binario",
    expected: "11110101",
    actual: toBinary8(245),
  },
  { name: "Decimal 0 a binario", expected: "00000000", actual: toBinary8(0) },
  {
    name: "Decimal 255 a binario",
    expected: "11111111",
    actual: toBinary8(255),
  },
  { name: "Decimal 256 inválido", expected: "", actual: toBinary8(256) },
  { name: "Decimal texto inválido", expected: "", actual: toBinary8("abc") },
  {
    name: "Binario 10110101 a decimal",
    expected: "181",
    actual: String(binToDec("10110101")),
  },
  {
    name: "Binario 10101111 a octal",
    expected: "257",
    actual: String(binToOct("10101111")),
  },
  {
    name: "Binario 11001010 a hexadecimal",
    expected: "CA",
    actual: String(binToHex("11001010")),
  },
  {
    name: "Entrada inválida decimal vacía",
    expected: "",
    actual: toBinary8(""),
  },
  {
    name: "Normalizar binario corto",
    expected: "00000101",
    actual: normalizeBinary8("101"),
  },
  {
    name: "Agrupar para octal",
    expected: "010 101 111",
    actual: groupBits("10101111", 3).join(" "),
  },
  {
    name: "Agrupar para hexadecimal",
    expected: "1100 1010",
    actual: groupBits("11001010", 4).join(" "),
  },
];

function Pill({ children, color = "slate" }) {
  const colors = {
    slate: "bg-slate-900 text-white",
    yellow: "bg-yellow-400 text-slate-950",
    blue: "bg-blue-700 text-white",
    green: "bg-emerald-600 text-white",
    red: "bg-red-600 text-white",
    purple: "bg-purple-700 text-white",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
        colors[color] || colors.slate
      }`}
    >
      {children}
    </span>
  );
}

function SectionTitle({ badge, title, subtitle }) {
  return (
    <div className="mb-5">
      {badge && <Pill color="blue">{badge}</Pill>}
      <h2 className="mt-3 text-2xl font-black text-slate-900 md:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm leading-6 text-slate-500 md:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Light({ on, compact = false }) {
  return (
    <div className="flex min-w-[3rem] flex-col items-center gap-1">
      <div
        aria-label={
          on ? "LED encendido, voltaje alto" : "LED apagado, voltaje bajo"
        }
        title={
          on ? "LED encendido / voltaje alto" : "LED apagado / voltaje bajo"
        }
        className={`flex ${
          compact ? "h-10 w-10 text-lg" : "h-12 w-12 text-xl"
        } items-center justify-center rounded-full border-2 transition-all ${
          on
            ? "border-yellow-400 bg-yellow-200 text-yellow-700 shadow-[0_0_22px_rgba(250,204,21,0.9)]"
            : "border-slate-300 bg-slate-100 text-slate-400"
        }`}
      >
        💡
      </div>
      <span
        className={`text-[11px] font-black ${
          on ? "text-yellow-700" : "text-slate-500"
        }`}
      >
        {on ? "ON" : "OFF"}
      </span>
    </div>
  );
}

function BitTable({ bits }) {
  const binary = normalizeBinary8(bits);
  if (!binary) {
    return (
      <div className="rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">
        No hay bits válidos para mostrar.
      </div>
    );
  }
  const bitArray = binary.split("");

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[720px] border-collapse text-center text-sm">
        <tbody>
          <tr className="bg-slate-900 text-white">
            <th className="sticky left-0 z-10 border border-slate-700 bg-slate-900 p-3 text-left">
              Exponente
            </th>
            {BIT_LABELS.map((label) => (
              <td
                key={`exp-${label}`}
                className="border border-slate-700 p-3 font-semibold"
              >
                {label}
              </td>
            ))}
          </tr>
          <tr className="bg-orange-50 text-orange-700">
            <th className="sticky left-0 z-10 border border-orange-200 bg-orange-50 p-3 text-left">
              Valor del bit
            </th>
            {POWERS_8.map((p) => (
              <td
                key={`pow-${p}`}
                className="border border-orange-200 p-3 text-lg font-black"
              >
                {p}
              </td>
            ))}
          </tr>
          <tr className="bg-blue-50 text-blue-800">
            <th className="sticky left-0 z-10 border border-blue-200 bg-blue-50 p-3 text-left">
              Dirección binaria
            </th>
            {bitArray.map((b, i) => (
              <td
                key={`bit-${i}`}
                className={`border border-blue-200 p-3 text-xl font-black ${
                  b === "1" ? "bg-blue-100" : "bg-white"
                }`}
              >
                {b}
              </td>
            ))}
          </tr>
          <tr>
            <th className="sticky left-0 z-10 border border-slate-200 bg-white p-3 text-left">
              LED / Voltaje
            </th>
            {bitArray.map((b, i) => (
              <td key={`led-${i}`} className="border border-slate-200 p-3">
                <Light on={b === "1"} compact />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function ProcedureCard({ item }) {
  const isOctal = item.tipo.includes("Octal");
  const isHex = item.tipo.includes("Hexadecimal");
  const groups = isOctal
    ? groupBits(item.bits, 3)
    : isHex
    ? groupBits(item.bits, 4)
    : [];

  return (
    <article className="rounded-3xl bg-white p-5 shadow-lg ring-1 ring-slate-200/70 transition hover:-translate-y-0.5 hover:shadow-xl md:p-6">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <Pill>Inciso {item.seccion}</Pill>
          <h3 className="mt-3 text-2xl font-black text-slate-900">
            {item.entrada} → {item.resultado}
          </h3>
          <p className="text-sm font-medium text-slate-500">{item.tipo}</p>
        </div>
        <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-center text-emerald-700 ring-1 ring-emerald-100">
          <p className="text-xl">✓</p>
          <p className="text-xs font-bold">Resultado verificado</p>
        </div>
      </div>

      <div className="mb-5 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
        <p className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-500">
          Procedimiento
        </p>
        <p className="text-lg font-semibold leading-8 text-slate-800">
          {item.procedimiento}
        </p>
      </div>

      {(isOctal || isHex) && (
        <div className="mb-5 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl bg-indigo-50 p-4 ring-1 ring-indigo-100">
            <p className="text-sm font-bold text-indigo-600">Agrupación</p>
            <p className="mt-2 break-words font-mono text-2xl font-black text-indigo-900">
              {groups.join("   ")}
            </p>
          </div>
          <div className="rounded-2xl bg-purple-50 p-4 ring-1 ring-purple-100">
            <p className="text-sm font-bold text-purple-600">
              Conversión final
            </p>
            <p className="mt-2 text-2xl font-black text-purple-900">
              {item.resultado}
            </p>
          </div>
        </div>
      )}

      <BitTable bits={item.bits} />
    </article>
  );
}

function CustomConverter() {
  const [mode, setMode] = useState("dec-bin");
  const [value, setValue] = useState("168");

  const result = useMemo(() => {
    if (mode === "dec-bin") {
      if (!isValidDecimalString(value)) {
        return {
          ok: false,
          message: "Ingresa un número decimal entero entre 0 y 255.",
        };
      }
      const n = Number(String(value).trim());
      if (!Number.isInteger(n) || n < 0 || n > MAX_8_BIT) {
        return {
          ok: false,
          message:
            "El valor decimal debe estar dentro del rango de 8 bits: 0 a 255.",
        };
      }
      const bits = toBinary8(n);
      return {
        ok: true,
        main: `${bits}₂`,
        bits,
        detail: `${n}₁₀ convertido a binario de 8 bits.`,
        procedure: decimalProcedure(n),
      };
    }

    const rawValue = String(value ?? "").trim();
    if (!hasOnlyBinaryCharacters(rawValue)) {
      return {
        ok: false,
        message:
          "Ingresa un valor binario usando solamente 0 y 1. Ejemplo: 10101011.",
      };
    }

    const bits = normalizeBinary8(rawValue);
    if (mode === "bin-dec")
      return {
        ok: true,
        main: `${binToDec(bits)}₁₀`,
        bits,
        detail: `${bits}₂ convertido a decimal.`,
        procedure: binaryWeightedProcedure(bits),
      };
    if (mode === "bin-oct")
      return {
        ok: true,
        main: `${binToOct(bits)}₈`,
        bits,
        detail: `Ternas: ${groupBits(bits, 3).join(" ")}.`,
        procedure: `Agrupar de derecha a izquierda: ${groupBits(bits, 3).join(
          " "
        )} → ${binToOct(bits)}₈`,
      };
    if (mode === "bin-hex")
      return {
        ok: true,
        main: `${binToHex(bits)}₁₆`,
        bits,
        detail: `Cuartetos: ${groupBits(bits, 4).join(" ")}.`,
        procedure: `Agrupar de derecha a izquierda: ${groupBits(bits, 4).join(
          " "
        )} → ${binToHex(bits)}₁₆`,
      };

    return { ok: false, message: "Modo de conversión no válido." };
  }, [mode, value]);

  return (
    <section className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-700 p-5 text-white shadow-xl md:p-6">
      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <Pill color="yellow">Herramienta en vivo</Pill>
          <h2 className="mt-3 text-2xl font-black">Convertidor interactivo</h2>
          <p className="text-sm text-slate-300">
            Prueba valores propios y visualiza los LEDs en tiempo real.
          </p>
        </div>
        <p className="rounded-2xl bg-white/10 px-4 py-2 text-xs font-semibold text-slate-200">
          Rango de trabajo: 8 bits, 0 a 255
        </p>
      </div>

      <div className="mb-5 grid gap-3 md:grid-cols-3">
        <select
          value={mode}
          onChange={(event) => {
            const nextMode = event.target.value;
            setMode(nextMode);
            setValue(nextMode === "dec-bin" ? "168" : "10101011");
          }}
          className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-yellow-300"
        >
          <option className="text-slate-900" value="dec-bin">
            Decimal a Binario
          </option>
          <option className="text-slate-900" value="bin-dec">
            Binario a Decimal
          </option>
          <option className="text-slate-900" value="bin-oct">
            Binario a Octal
          </option>
          <option className="text-slate-900" value="bin-hex">
            Binario a Hexadecimal
          </option>
        </select>

        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={
            mode === "dec-bin" ? "Ejemplo: 168" : "Ejemplo: 10101011"
          }
          inputMode={mode === "dec-bin" ? "numeric" : "text"}
          className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-slate-300 focus:ring-2 focus:ring-yellow-300 md:col-span-2"
        />
      </div>

      {result.ok ? (
        <div className="rounded-3xl bg-white p-5 text-slate-900 shadow-inner">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-slate-500">Resultado</p>
              <p className="break-all text-4xl font-black">{result.main}</p>
              <p className="mt-1 text-sm text-slate-600">{result.detail}</p>
            </div>
            <Pill color="green">Correcto</Pill>
          </div>
          <div className="mb-4 rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-700 ring-1 ring-slate-100">
            {result.procedure}
          </div>
          <BitTable bits={result.bits} />
        </div>
      ) : (
        <div className="rounded-2xl bg-red-500/20 p-4 text-sm font-bold text-red-100 ring-1 ring-red-300/30">
          {result.message}
        </div>
      )}
    </section>
  );
}

function TestsPanel() {
  const failedCount = tests.filter(
    (test) => test.expected !== test.actual
  ).length;

  return (
    <section className="rounded-3xl bg-white p-5 shadow-lg ring-1 ring-slate-200/70 md:p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <SectionTitle
            badge="Control de calidad"
            title="Pruebas rápidas"
            subtitle="Validación interna de conversiones para evitar errores lógicos durante la exposición."
          />
        </div>
        <Pill color={failedCount === 0 ? "green" : "red"}>
          {failedCount === 0 ? "Todas correctas" : `${failedCount} con error`}
        </Pill>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {tests.map((test) => {
          const passed = test.expected === test.actual;
          return (
            <div
              key={test.name}
              className={`rounded-2xl border p-4 ${
                passed
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-red-200 bg-red-50"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-slate-900">{test.name}</p>
                  <p className="text-sm text-slate-600">
                    Esperado: <strong>{test.expected}</strong> | Obtenido:{" "}
                    <strong>{test.actual}</strong>
                  </p>
                </div>
                <Pill color={passed ? "green" : "red"}>
                  {passed ? "PASS" : "FAIL"}
                </Pill>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function SummaryCards() {
  const cards = [
    {
      label: "Ejercicios resueltos",
      value: ejercicios.length,
      note: "Incisos A, B, C y D",
    },
    { label: "Casos con LEDs", value: incisoE.length, note: "Inciso E" },
    {
      label: "Sistemas",
      value: 4,
      note: "Decimal, binario, octal y hexadecimal",
    },
    { label: "Bits por tabla", value: 8, note: "Representación por octeto" },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-3xl bg-white p-5 shadow ring-1 ring-slate-200/70"
        >
          <p className="text-sm font-bold text-slate-500">{card.label}</p>
          <p className="mt-2 text-4xl font-black text-slate-900">
            {card.value}
          </p>
          <p className="mt-1 text-xs font-medium text-slate-500">{card.note}</p>
        </div>
      ))}
    </section>
  );
}

export default function DashboardSistemasDigitales() {
  const [tab, setTab] = useState("resueltos");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todos");

  const tipos = [
    "Todos",
    ...Array.from(new Set(ejercicios.map((item) => item.tipo))),
  ];

  const filtered = ejercicios.filter((item) => {
    const matchesFilter = filter === "Todos" || item.tipo === filter;
    const q = search.toLowerCase().trim();
    const searchable =
      `${item.entrada} ${item.resultado} ${item.tipo} inciso ${item.seccion}`.toLowerCase();
    return matchesFilter && (q === "" || searchable.includes(q));
  });

  return (
    <main className="min-h-screen bg-slate-100 p-4 text-slate-900 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-blue-950 via-blue-800 to-cyan-700 p-6 text-white shadow-2xl md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <Pill color="yellow">Guía de Práctica N.° 01</Pill>
              <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
                Dashboard interactivo de Sistemas Digitales
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-blue-100">
                Conversión entre decimal, binario, octal y hexadecimal con
                procedimiento, tabla de bits, LEDs y voltaje lógico.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-3xl bg-white/10 p-5 text-center backdrop-blur ring-1 ring-white/20">
                <p className="text-3xl font-black">16</p>
                <p className="text-xs">ejercicios</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-5 text-center backdrop-blur ring-1 ring-white/20">
                <p className="text-3xl font-black">4</p>
                <p className="text-xs">casos LED</p>
              </div>
            </div>
          </div>
        </header>

        <SummaryCards />
        <CustomConverter />

        <nav className="sticky top-3 z-20 rounded-3xl bg-white/95 p-2 shadow-lg ring-1 ring-slate-200/80 backdrop-blur">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
            <button
              type="button"
              onClick={() => setTab("resueltos")}
              className={`rounded-2xl px-4 py-3 font-bold transition ${
                tab === "resueltos"
                  ? "bg-slate-900 text-white shadow"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Ejercicios resueltos
            </button>
            <button
              type="button"
              onClick={() => setTab("incisoE")}
              className={`rounded-2xl px-4 py-3 font-bold transition ${
                tab === "incisoE"
                  ? "bg-slate-900 text-white shadow"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Inciso E: LEDs
            </button>
            <button
              type="button"
              onClick={() => setTab("cuestionario")}
              className={`rounded-2xl px-4 py-3 font-bold transition ${
                tab === "cuestionario"
                  ? "bg-slate-900 text-white shadow"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Cuestionario
            </button>
            <button
              type="button"
              onClick={() => setTab("pruebas")}
              className={`rounded-2xl px-4 py-3 font-bold transition ${
                tab === "pruebas"
                  ? "bg-slate-900 text-white shadow"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Pruebas
            </button>
          </div>
        </nav>

        {tab === "resueltos" && (
          <section className="space-y-5">
            <div className="rounded-3xl bg-white p-5 shadow ring-1 ring-slate-200/70">
              <SectionTitle
                badge="Incisos A-D"
                title="Ejercicios resueltos paso a paso"
                subtitle="Usa el buscador y el filtro para explicar cada conversión durante tu presentación."
              />
              <div className="grid gap-3 md:grid-cols-3">
                <input
                  className="rounded-2xl bg-slate-50 px-4 py-3 shadow-inner outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-400 md:col-span-2"
                  placeholder="Buscar por entrada, resultado, tipo o inciso..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
                <select
                  className="rounded-2xl bg-slate-50 px-4 py-3 shadow-inner outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-400"
                  value={filter}
                  onChange={(event) => setFilter(event.target.value)}
                >
                  {tipos.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-500">
                Mostrando {filtered.length} de {ejercicios.length} ejercicios.
              </p>
            </div>
            <div className="grid gap-6">
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <ProcedureCard
                    key={`${item.seccion}-${item.entrada}`}
                    item={item}
                  />
                ))
              ) : (
                <div className="rounded-3xl bg-white p-8 text-center shadow ring-1 ring-slate-200/70">
                  <p className="text-xl font-black text-slate-900">
                    No se encontraron ejercicios
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Cambia el texto de búsqueda o el filtro seleccionado.
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {tab === "incisoE" && (
          <section className="space-y-6">
            <div className="rounded-3xl bg-white p-5 shadow-xl ring-1 ring-slate-200/70 md:p-6">
              <SectionTitle
                badge="Inciso E"
                title="Representación de señales de voltaje con LEDs"
                subtitle="1 = LED prendido / voltaje alto. 0 = LED apagado / voltaje bajo. También se muestra la conversión del mismo binario a octal y hexadecimal."
              />

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full min-w-[900px] text-left text-sm">
                  <thead className="bg-slate-900 text-white">
                    <tr>
                      <th className="p-4">Decimal</th>
                      <th className="p-4">Binario</th>
                      <th className="p-4">Octal</th>
                      <th className="p-4">Hexadecimal</th>
                      <th className="p-4">Estado de LEDs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {incisoE.map((row) => (
                      <tr
                        key={row.decimal}
                        className="border-t border-slate-200 bg-white align-top"
                      >
                        <td className="p-4 text-xl font-black">
                          {row.decimal}₁₀
                        </td>
                        <td className="p-4 font-mono text-lg font-bold">
                          {row.binario}₂
                        </td>
                        <td className="p-4 text-lg font-bold">{row.octal}₈</td>
                        <td className="p-4 text-lg font-bold">
                          {row.hexadecimal}₁₆
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-2">
                            {row.binario.split("").map((bit, index) => (
                              <Light
                                key={`${row.decimal}-${index}`}
                                on={bit === "1"}
                                compact
                              />
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {incisoE.map((row) => (
              <ProcedureCard
                key={`proc-${row.decimal}`}
                item={{
                  seccion: "E",
                  tipo: "Decimal a Binario + LED",
                  entrada: `${row.decimal}₁₀`,
                  resultado: `${row.binario}₂ | ${row.octal}₈ | ${row.hexadecimal}₁₆`,
                  procedimiento: `${
                    row.decimal
                  }₁₀ se representa en binario como ${
                    row.binario
                  }₂. Cada bit 1 enciende el LED y cada bit 0 lo mantiene apagado. Para octal se agrupa en ternas: ${groupBits(
                    row.binario,
                    3
                  ).join(" ")} → ${
                    row.octal
                  }₈. Para hexadecimal se agrupa en cuartetos: ${groupBits(
                    row.binario,
                    4
                  ).join(" ")} → ${row.hexadecimal}₁₆.`,
                  bits: row.binario,
                }}
              />
            ))}
          </section>
        )}

        {tab === "cuestionario" && (
          <section className="grid gap-4">
            <div className="rounded-3xl bg-white p-5 shadow ring-1 ring-slate-200/70 md:p-6">
              <SectionTitle
                badge="Cuestionario"
                title="Preguntas teóricas"
                subtitle="Respuestas breves y claras para sustentar la práctica de laboratorio."
              />
            </div>
            {cuestionario.map(([pregunta, respuesta], index) => (
              <div
                key={pregunta}
                className="rounded-3xl bg-white p-6 shadow ring-1 ring-slate-200/70"
              >
                <Pill color="blue">Pregunta {index + 1}</Pill>
                <h3 className="mt-3 text-xl font-black">{pregunta}</h3>
                <p className="mt-3 rounded-2xl bg-slate-50 p-4 leading-7 text-slate-700 ring-1 ring-slate-100">
                  {respuesta}
                </p>
              </div>
            ))}
          </section>
        )}

        {tab === "pruebas" && <TestsPanel />}

        <footer className="rounded-3xl bg-slate-900 p-5 text-center text-sm font-semibold text-slate-300 shadow">
          Dashboard preparado para exposición: conversiones, procedimientos,
          LEDs, cuestionario y validación interna.
        </footer>
      </div>
    </main>
  );
}
