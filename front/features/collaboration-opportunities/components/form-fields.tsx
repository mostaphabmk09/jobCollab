"use client";

type FieldProps = {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
};

export function Field({ label, hint, value, onChange }: FieldProps) {
  return (
    <label className="block">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-semibold text-slate-900">{label}</span>
        {hint && <span className="text-xs text-slate-500">{hint}</span>}
      </div>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-3 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
      />
    </label>
  );
}

export function TextareaField({ label, hint, value, onChange }: FieldProps) {
  return (
    <label className="block">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-semibold text-slate-900">{label}</span>
        {hint && <span className="text-xs text-slate-500">{hint}</span>}
      </div>
      <textarea
        rows={5}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-3 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
      />
    </label>
  );
}

type SelectFieldProps = {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
};

export function SelectField({
  label,
  value,
  options,
  onChange,
}: SelectFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-900">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-3 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
      >
        {options.map((option) => (
          <option key={option.value || "empty"} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
