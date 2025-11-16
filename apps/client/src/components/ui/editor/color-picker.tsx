'use client'
import { X } from "lucide-react";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";
import { rgbToHex } from "@/lib/utils";

type ColorPickerProps = {
  label?: string;
  icon?: React.ReactNode;
  color?: string;
  onChange: (color?: string) => void;
  delay?: number;
};

export default function ColorPicker({
  label = "Color",
  icon,
  color,
  onChange,
}: ColorPickerProps) {
  const [localColor, setLocalColor] = useState(color);
  const [debouncedColor] = useDebounce(rgbToHex(localColor), Number(process.env.NEXT_PUBLIC_DEBOUNCE_DELAY));

  useEffect(() => {
    // Only call onChange if it's actually different
    if (color !== debouncedColor) {
      onChange(debouncedColor);
    }
  }, [debouncedColor]);

  useEffect(() => {
    if (color !== localColor) {
      setLocalColor(color);
    }
  }, [color]);

  return (
    <div className="flex items-center gap-2">
      <label
        className="cursor-pointer w-5 h-5 rounded relative flex flex-col items-center gap-1"
        title={label}
      >
        {icon}
        <div className="w-full h-1" style={{ backgroundColor: localColor||'#ff0000' }} />
        <input
          type="color"
          value={localColor}
          onChange={(e) => setLocalColor(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </label>

      {color && (
        <button
          className="w-4 h-5 cursor-pointer"
          title={`Remove ${label}`}
          onClick={() => {
            onChange(undefined);
          }}
        >
          <X className="w-full h-full" />
        </button>
      )}
    </div>
  );
}
