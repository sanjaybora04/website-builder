export type ButtonAction =
  | { type: "none" }
  | { type: "link"; href?: string }
  | { type: "function" };

export type ButtonConfig = {
  label?: string;
  variant?: "default" | "link";
  size?: "sm" | "default" | "lg";
  bgColor?: string;
  action?: ButtonAction;
};


import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import RichTextEditor from "@/components/ui/editor/rich-text-editor";
import { LinkActionEditor } from "./link-action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../../button";
import Link from "next/link";

export function ButtonEditor({
  value,
  onChange,
}: {
  value?: ButtonConfig;
  onChange: (val: ButtonConfig) => void;
}) {
  const update = (partial: Partial<ButtonConfig>) =>
    onChange({ ...value, ...partial });

  const actionType = value?.action?.type || "none";

  return (
    <div className="space-y-3 border p-2 rounded-md">
      <RichTextEditor
        label="Label"
        value={value?.label ?? ""}
        onChange={(label) => update({ label })}
      />

      <div className="flex flex-wrap gap-2">
        <div className="space-y-2">
          <Label>Variant</Label>
          <Select
            value={value?.variant || "default"}
            onValueChange={(val) => update({ variant: val as any })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select variant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="outline">Outline</SelectItem>
              <SelectItem value="ghost">Ghost</SelectItem>
              <SelectItem value="link">Link</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Size</Label>
          <Select
            value={value?.size || "default"}
            onValueChange={(val) => update({ size: val as any })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sm">Small</SelectItem>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="lg">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Bg Color</Label>
          <Input
            value={value?.bgColor ?? ""}
            onChange={(e) => update({ bgColor: e.target.value })}
            placeholder="#000000"
            type="color"
            className="w-12"
          />
        </div>
      </div>


      <div className="space-y-2">
        <Label>Action Type</Label>
        <Select
          value={actionType}
          onValueChange={(type: ButtonAction["type"]) => {
            if (type === "link") {
              update({ action: { type, href: "" } });
            } else if (type === "function") {
              update({ action: { type } });
            } else {
              update({ action: { type: "none" } });
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select action type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="link">Link</SelectItem>
            <SelectItem value="function">Function</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {actionType === "link" && (
        <LinkActionEditor
          action={value?.action as Extract<ButtonAction, { type: "link" }>}
          onChange={(action) => update({ action })}
        />
      )}
    </div>
  );
}

export function ButtonComponent({ config }: { config?: ButtonConfig }) {
  const labelHTML = { __html: config?.label || "" };

  const renderButton = () => {
    const action = config?.action;

    if (action?.type === "link") {
      return (
        <Button
          variant={config?.variant}
          size={config?.size || "default"}
          style={{ backgroundColor: config?.bgColor }}
          className="rounded-md"
          asChild
        >
          <Link href={action.href || "#"}>
            <div dangerouslySetInnerHTML={labelHTML} className="inline-flex" />
          </Link>
        </Button>
      );
    }

    return (
      <Button
        variant={config?.variant}
        size={config?.size || "default"}
        style={{ backgroundColor: config?.bgColor }}
        className="rounded-md"
      >
        <div dangerouslySetInnerHTML={labelHTML} className="inline-flex" />
      </Button>
    );
  };

  return <div>{renderButton()}</div>;
}
