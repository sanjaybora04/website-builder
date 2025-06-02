'use client'

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ButtonAction } from '../button';
import { useState } from "react";

export function LinkActionEditor({
  action,
  onChange,
}: {
  action: Extract<ButtonAction, { type: "link" }>;
  onChange: (a: ButtonAction) => void;
}) {
  const [text, setText] = useState(action?.href)
  return (
    <div>
      <Label>URL</Label>
      <Input
        value={text}
        onChange={(e) => {

          setText(e.target.value)
          onChange({
            ...action,
            href: e.target.value,
          })
        }
        }
        placeholder="Ex. /contact, /about, https://example.com"
        className="mt-2"
      />
    </div>
  );
}
