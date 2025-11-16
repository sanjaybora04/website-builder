'use client'
import { Label } from "@/components/ui/label";
import { ButtonAction } from '.';
import DebouncedInput from "../input";
import { useRef, useState, useEffect } from "react";

export function LinkActionEditor({
  action,
  onChange,
  variables
}: {
  action: Extract<ButtonAction, { type: "link" }>;
  onChange: (a: ButtonAction) => void;
  variables?: string[]
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showVariables, setShowVariables] = useState(false);
  const [cursorPos, setCursorPos] = useState<number | null>(null);

  // Keep cursorPos updated on every key interaction
  const updateCursor = () => {
    if (inputRef.current) {
      setCursorPos(inputRef.current.selectionStart ?? null);
    }
  };

  // Detect clicks outside to hide variable pills
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowVariables(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleVariableClick = (variable: string) => {
    if (!inputRef.current || cursorPos === null) return;

    const input = inputRef.current;
    const currentValue = input.value;
    const variableString = `{{${variable}}}`;
    const newValue =
      currentValue.slice(0, cursorPos) +
      variableString +
      currentValue.slice(cursorPos);

    const newCursorPos = cursorPos + variableString.length;

    onChange({
      ...action,
      href: newValue
    });

    setTimeout(() => {
      input.focus();
      input.setSelectionRange(newCursorPos, newCursorPos);
      setCursorPos(newCursorPos);
    }, 0);
  };

  return (
    <div ref={containerRef}>
      <Label>URL</Label>
      <DebouncedInput
        value={action?.href}
        ref={inputRef}
        onFocus={() => {
          setShowVariables(true);
          updateCursor();
        }}
        onClick={updateCursor}
        onKeyUp={updateCursor}
        onInput={updateCursor}
        onChange={(e) => {
          onChange({
            ...action,
            href: e.target.value,
          });
        }}
        placeholder="Ex. /contact, /about, https://example.com"
        className="mt-2"
      />
      {showVariables && variables && (
        <div className="flex flex-wrap gap-2 mt-2">
          {variables?.map((variable) => (
            <button
              key={variable}
              onClick={() => handleVariableClick(variable)}
              className="text-xs bg-muted-foreground text-background cursor-pointer px-2 py-1 rounded hover:bg-muted-foreground/90 transition"
              type="button"
            >
              {`{{${variable}}}`}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
