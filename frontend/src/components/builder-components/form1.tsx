import RichTextEditor from "../ui/editor/rich-text-editor"
import RenderHtml from "../ui/editor/rich-text-editor/render-html"
import Panel from "../ui/editor/panel"
import ColorPicker from "../ui/editor/color-picker"
import { RepeaterEditor } from "../ui/editor/repeater"
import { Container, ContainerConfig, ContainerPanel } from "../ui/editor/container"
import { cn } from "@/lib/utils"
import { PaintBucket, Type } from "lucide-react"

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
  }
}

export function Component({ config }: { config: FormComponentType }) {
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
      <form className={cn("w-full max-w-xl space-y-4", ` p-4 rounded`)}
        style={{backgroundColor:config.styles?.backgroundColor}}
      >
        {config.content?.fields?.map((field, i) => (
          <div key={i}>
            <label className="block mb-1 font-medium">{field.label}</label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                placeholder={field.placeholder}
                className="w-full border rounded p-2"
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                className="w-full border rounded p-2"
              />
            )}
          </div>
        ))}
        <button type="submit" className="px-4 py-2 bg-black text-white rounded">Submit</button>
      </form>
    </Container>
  )
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
            onChange={(fields) => handleSubmit({ content: { ...values.content, fields } })}
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
                  onChange={(v) => onChange({ ...field, label: v })}
                />
                <RichTextEditor
                  label="Name (Input name attribute)"
                  value={field.name}
                  onChange={(v) => onChange({ ...field, name: v })}
                />
                <RichTextEditor
                  label="Placeholder"
                  value={field.placeholder}
                  onChange={(v) => onChange({ ...field, placeholder: v })}
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
        </Panel>
      </>
    )
  }
  