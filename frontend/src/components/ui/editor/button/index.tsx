'use client'

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
import { Brush, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ColorPicker from "../color-picker";
import { useAtom, useAtomValue } from "jotai";
import { websiteEditorAtom } from "@/lib/atoms";

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
      {label && <Label>{label}</Label>}
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
            <div className="h-9 flex justify-center items-center">
              <ColorPicker icon={<Brush />} color={value?.bgColor} onChange={(v) => update({ bgColor: v })} />
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

export function ButtonComponent({ config, className }: { config?: ButtonConfig, className?: string }) {
  const labelHTML = { __html: config?.label || "" };
  const [websiteEditor,setWebsiteEditor] = useAtom(websiteEditorAtom)

  const renderButton = () => {
    const action = config?.action;

    if (action?.type === "link") {
      return (
        <Link href={action.href || "#"}
        onClick={(e) => {
          const href = action?.href || "#";
          const isInternalLink = href.startsWith("/") || (!href.startsWith("http://") && !href.startsWith("https://"));
          if (websiteEditor && isInternalLink) {
            e.preventDefault();
            setWebsiteEditor((prev: any) => ({
              ...prev,
              activePage: href,
              activeComponent: undefined
            }));
          }
        }}
        
          style={{ backgroundColor: config?.bgColor }}
          className={cn(
            "inline-flex items-center text-center rounded bg-transparent text-black",
            className,
            config?.variant == 'link' && "hover:underline",
            config?.size == 'sm' ? "h-8 px-3" :
              config?.size == 'lg' ? "h-10 px-6" : "h-9 px-4"
          )}
        >
          <div dangerouslySetInnerHTML={labelHTML} className="inline-flex" />
        </Link>
      );
    }

    return (
      <button
          style={{ backgroundColor: config?.bgColor }}
          className={cn(
            "inline-flex items-center text-center rounded bg-transparent text-black cursor-pointer",
            className,
            config?.variant == 'link' && "hover:underline",
            config?.size == 'sm' ? "h-8 px-3" :
              config?.size == 'lg' ? "h-10 px-6" : "h-9 px-4"
          )}
        >
          <div dangerouslySetInnerHTML={labelHTML} className="inline-flex" />
        </button>
    );
  };

  return <div>{renderButton()}</div>;
}
