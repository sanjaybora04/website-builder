'use client'

import RichTextEditor from "../ui/editor/rich-text-editor"
import RenderHtml from "../ui/editor/rich-text-editor/render-html"
import Panel from "../ui/editor/panel"
import ColorPicker from "../ui/editor/color-picker"
import { RepeaterEditor } from "../ui/editor/repeater"
import { Container, ContainerConfig, ContainerPanel } from "../ui/editor/container"
import { cn } from "@/lib/utils"
import { PaintBucket, Type } from "lucide-react"
import DebouncedInput from "../ui/editor/input"
import { ButtonComponent, ButtonConfig, ButtonEditor } from "../ui/editor/button"
import { Label } from "../ui/label"
import { useState } from "react"

type FormField = {
  label?: string
  name?: string
  type?: "text" | "email" | "textarea"
  placeholder?: string
}

type FormComponentType = {
  container?: ContainerConfig
  styles?: {
    textColor?: string
    backgroundColor?: string
  }
  content?: {
    title?: string
    description?: string
    fields?: FormField[]
    submitButton?: ButtonConfig
  }
}

export function Component({ config }: { config: FormComponentType }) {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});

  const handleChange = (name: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const variables =
    config.content?.fields?.map((f) => ({
      label: f.name,
      value: formValues[f.name||''] || "",
    })) || [];
  return (
    <Container config={config.container}>
      <div style={{ color: config.styles?.textColor }}>
        <div className="text-2xl font-semibold font-raleway">
          <RenderHtml html={config.content?.title} />
        </div>
        <div className="mt-2 mb-4">
          <RenderHtml html={config.content?.description} />
        </div>
      </div>
      <form
        className={cn("w-full max-w-3xl space-y-4 mx-auto", `p-4 rounded`)}
        style={{ backgroundColor: config.styles?.backgroundColor }}
      >
        {config.content?.fields?.map((field, i) => (
          <div key={i}>
            {field.label && (
              <Label className="mb-1"><RenderHtml html={field.label}/></Label>
            )}
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                placeholder={field.placeholder}
                className="w-full border rounded p-2"
                value={formValues[field.name||''] || ""}
                onChange={(e) => handleChange(field.name||'', e.target.value)}
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                className="w-full border rounded p-2"
                value={formValues[field.name||''] || ""}
                onChange={(e) => handleChange(field.name||'', e.target.value)}
              />
            )}
          </div>
        ))}
        <ButtonComponent
          config={config.content?.submitButton}
          variables={variables}
        />
      </form>
    </Container>
  );
}

export function Editor({
    values,
    handleSubmit
  }: {
    values: FormComponentType,
    handleSubmit: (data: FormComponentType) => Promise<boolean>
  }) {
    return (
      <>
        <ContainerPanel config={values.container} onChange={(v) => handleSubmit({ container: v })} />
  
        <Panel title="Styles" defaultOpen={false}>
          <div className="flex gap-1">
            <ColorPicker icon={<Type />} color={values.styles?.textColor} onChange={(v) => handleSubmit({ styles: { ...values.styles, textColor: v } })} />
            <ColorPicker icon={<PaintBucket />} color={values.styles?.backgroundColor} onChange={(v) => handleSubmit({ styles: { ...values.styles, backgroundColor: v } })} />
          </div>
        </Panel>
  
        <Panel title="Content">
          <RichTextEditor
            label="Title"
            value={values.content?.title}
            onChange={(v) => handleSubmit({ content: { ...values.content, title: v } })}
            showAlignment
            showHeading
            showLink
          />
          <RichTextEditor
            label="Description"
            value={values.content?.description}
            onChange={(v) => handleSubmit({ content: { ...values.content, description: v } })}
            showAlignment
            showList
            showBackgroundColor
          />
  
          <RepeaterEditor<FormField>
            label="Form Fields"
            itemLabel="Field"
            value={values.content?.fields || []}
            onChange={(fields) => handleSubmit({ content: { fields } })}
            max={10}
            createNewItem={() => ({
              label: "Name",
              name: "name",
              type: "text",
              placeholder: "Enter your name"
            })}
            renderEditor={(field, onChange) => (
              <>
                <RichTextEditor
                  label="Label"
                  value={field.label}
                  onChange={(v) => onChange({ label: v })}
                />

                <Label className="mb-2">Name (Input name attribute)</Label>
                <DebouncedInput
                  value={field.name}
                  onChange={(e) => onChange({ name: e.target.value })}
                />

                <Label className="mb-2">Placeholder</Label>
                <DebouncedInput
                  value={field.placeholder}
                  onChange={(e) => onChange({ placeholder: e.target.value })}
                />

                <select
                  className="w-full border p-2 rounded mt-2"
                  value={field.type}
                  onChange={(e) => onChange({ ...field, type: e.target.value as FormField["type"] })}
                >
                  <option value="text">Text</option>
                  <option value="email">Email</option>
                  <option value="textarea">Textarea</option>
                </select>
              </>
            )}
          />

          <ButtonEditor
            label="Submit Button"
            value={values.content?.submitButton}
            onChange={(v) => handleSubmit({ content: { submitButton: v } })}
            variables={values.content?.fields?.map(field => field.name) || []} // Use field names as variables
          />
        </Panel>
      </>
    )
  }
  