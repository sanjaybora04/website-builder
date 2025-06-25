'use client'

import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/ui/editor/rich-text-editor";
import { LinkActionEditor } from "./link-action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { PaintBucket } from "lucide-react";
import { cn } from "@/lib/utils";
import ColorPicker from "../color-picker";
import { useAtom } from "jotai";
import { websiteEditorAtom } from "@/lib/atoms";

export type ButtonAction =
  | { type: "none" }
  | { type: "link"; href?: string };

export type ButtonConfig = {
  label?: string;
  variant?: "default" | "link";
  size?: "sm" | "default" | "lg";
  color?: string;
  action?: ButtonAction;
};

export function ButtonEditor({
  label,
  value,
  onChange,
  variables
}: {
  label?: string;
  value?: ButtonConfig;
  onChange: (val: ButtonConfig) => void;
  variables?: any[];
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
              <ColorPicker icon={<PaintBucket />} color={value?.color} onChange={(v) => update({ color: v })} />
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
              } else {
                update({ action: { type: "none" } });
              }
            }}
          >
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select action type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="link">Link</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {actionType === "link" && (
          <LinkActionEditor
            action={value?.action as Extract<ButtonAction, { type: "link" }>}
            onChange={(action) => update({ action })}
            variables={variables}
          />
        )}
      </div>
    </div>
  );
}

export function ButtonComponent({ config, className, variables }: { config?: ButtonConfig; className?: string; variables?: { label?: string, value?: string }[] }) {
  const labelHTML = { __html: config?.label || "" };
  const [websiteEditor, setWebsiteEditor] = useAtom(websiteEditorAtom);

  const variant = config?.variant || "default";
  const size = config?.size || "default";
  const color = config?.color;
  const action = config?.action;

  // Determine font size classes based on size
  const fontSizeClass =
    size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base";

  // Shared classes
  const baseClasses = "inline-flex items-center text-center rounded cursor-pointer";

  // For default variant, include height and padding
  const defaultSizeClasses =
    size === "sm"
      ? "h-8 px-3"
      : size === "lg"
        ? "h-10 px-6"
        : "h-9 px-4";

  const renderButton = () => {
    if (action?.type === "link") {
      // Replace variables in the href if provided
      let href = action.href || "#";
      if (variables) {
        href = href.replace(/{{(.*?)}}/g, (_, key) => {
          const found = variables.find((v) => v.label === key.trim());
          return found?.value || "";
        });
      }

      const isInternalLink = href.startsWith("/")

      return (
        <Link
          href={href}
          onClick={(e) => {
            if (websiteEditor && isInternalLink) {
              e.preventDefault();
              setWebsiteEditor((prev: any) => ({
                ...prev,
                activePage: href,
                activeComponent: undefined,
              }));
            }
          }}
          style={{
            backgroundColor: variant !== "link" ? color : undefined,
            color: variant === "link" ? color : undefined,
          }}
          className={cn(
            baseClasses,
            fontSizeClass,
            variant !== "link" && defaultSizeClasses,
            variant === "link" && "hover:underline",
            className
          )}
        >
          <div dangerouslySetInnerHTML={labelHTML} className="inline-flex" />
        </Link>
      );
    }

    return (
      <button
        style={{
          backgroundColor: variant !== "link" ? color : undefined,
          color: variant === "link" ? color : undefined,
        }}
        className={cn(
          baseClasses,
          fontSizeClass,
          variant !== "link" && defaultSizeClasses,
          variant === "link" && "hover:underline",
          className
        )}
      >
        <div dangerouslySetInnerHTML={labelHTML} className="inline-flex" />
      </button>
    );
  };

  return <div>{renderButton()}</div>;
}
