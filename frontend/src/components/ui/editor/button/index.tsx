export type ButtonAction =
  | { type: "none" }
  | { type: "link"; href?: string }

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
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function ButtonEditor({
  label,
  value,
  onChange,
}: {
  label?: string;
  value?: ButtonConfig;
  onChange: (val: ButtonConfig) => void;
}) {
  const update = (partial: Partial<ButtonConfig>) =>
    onChange({ ...value, ...partial });

  const actionType = value?.action?.type || "none";

  return (
    <div>
      {label&&<Label>{label}</Label>}
      <div className="space-y-3 border p-2 rounded-md mt-2">
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
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select variant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
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
              <SelectTrigger className="bg-background">
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
            <div className="flex items-center">
              <Input
                value={value?.bgColor ?? ""}
                onChange={(e) => update({ bgColor: e.target.value })}
                placeholder="#000000"
                type="color"
                className="w-12"
              />
              {
                value?.bgColor &&
                <button
                  className='w-4 h-5 cursor-pointer'
                  title='Remove Text Color'
                  onClick={() => update({ bgColor: undefined })}
                ><X className='w-full h-full' /></button>
              }
            </div>
          </div>
        </div>


        <div className="space-y-2">
          <Label>Action Type</Label>
          <Select
            value={actionType}
            onValueChange={(type: ButtonAction["type"]) => {
              if (type === "link") {
                update({ action: { type, href: "" } });
              }
              // else if (type === "function") {
              //   update({ action: { type } });
              // } 
              else {
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
              {/* <SelectItem value="function">Function</SelectItem> */}
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
    </div>
  );
}

export function ButtonComponent({ config,className }: { config?: ButtonConfig, className?:string }) {
  const labelHTML = { __html: config?.label || "" };

  const renderButton = () => {
    const action = config?.action;

    if (action?.type === "link") {
      return (
        <Button
          variant={config?.variant}
          size={config?.size || "default"}
          style={{ backgroundColor: config?.bgColor }}
          className={cn("rounded-md",className)}
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
        className={cn("rounded-md",className)}

      >
        <div dangerouslySetInnerHTML={labelHTML} className="inline-flex" />
      </Button>
    );
  };

  return <div>{renderButton()}</div>;
}
