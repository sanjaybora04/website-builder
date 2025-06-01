import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ButtonAction } from '../button';

export function LinkActionEditor({
  action,
  onChange,
}: {
  action: Extract<ButtonAction, { type: "link" }>;
  onChange: (a: ButtonAction) => void;
}) {
  return (
    <div>
      <Label>URL</Label>
      <Input
        value={action?.href}
        onChange={(e) =>
          onChange({
            ...action,
            href: e.target.value,
          })
        }
        placeholder="https://example.com"
        className="mt-2"
      />
    </div>
  );
}
