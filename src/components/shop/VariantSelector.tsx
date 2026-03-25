"use client";

interface Option {
  name: string;
  values: string[];
}

interface Variant {
  id: string;
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
}

export default function VariantSelector({
  options,
  variants,
  selectedOptions,
  onOptionChange,
}: {
  options: Option[];
  variants: Variant[];
  selectedOptions: Record<string, string>;
  onOptionChange: (name: string, value: string) => void;
}) {
  // Check if a specific option combo is available
  function isAvailable(optionName: string, optionValue: string): boolean {
    // Build the selection with this option changed
    const testSelection = { ...selectedOptions, [optionName]: optionValue };

    // Find a variant matching all selected options
    return variants.some(
      (v) =>
        v.availableForSale &&
        v.selectedOptions.every(
          (so) => testSelection[so.name] === so.value
        )
    );
  }

  return (
    <div className="space-y-5">
      {options.map((option) => (
        <div key={option.name}>
          <label className="text-[11px] font-body font-semibold text-white/50 tracking-[0.15em] uppercase mb-2 block">
            {option.name}
            <span className="text-white/30 ml-2 normal-case tracking-normal font-normal">
              {selectedOptions[option.name]}
            </span>
          </label>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const selected = selectedOptions[option.name] === value;
              const available = isAvailable(option.name, value);

              return (
                <button
                  key={value}
                  onClick={() => onOptionChange(option.name, value)}
                  disabled={!available}
                  className={`px-4 py-2 text-xs font-body tracking-wide border transition-colors ${
                    selected
                      ? "border-gold text-white bg-gold/10"
                      : available
                        ? "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
                        : "border-white/5 text-white/20 line-through opacity-30 cursor-not-allowed"
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
