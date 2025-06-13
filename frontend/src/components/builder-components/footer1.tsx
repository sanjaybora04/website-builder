import { Container, ContainerConfig, ContainerPanel } from "../ui/editor/container"
import Panel from "../ui/editor/panel"
import RenderHtml from "../ui/editor/rich-text-editor/render-html"
import RichTextEditor from "../ui/editor/rich-text-editor"
import { RepeaterEditor } from "../ui/editor/repeater"
import { Button } from "../ui/button"
import { X } from "lucide-react"
import { Input } from "../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

type FooterLink = {
    label?: string
    href?: string
}

type FooterGroup = {
    title?: string
    links?: FooterLink[]
}

type ComponentType = {
    container?: ContainerConfig,
    content?: {
        brand?: string
        groups?: FooterGroup[]
        copyright?: string
    }
}


export function Component({ config }: { config: ComponentType }) {
    return (
        <Container config={config.container}>
            <footer className="w-full py-8">
                <div className="max-w-7xl mx-auto px-4">
                    {config.content?.brand && (
                        <div className="text-xl font-semibold mb-4">
                            <RenderHtml html={config.content.brand} />
                        </div>
                    )}

                    <div className="flex flex-wrap gap-10 sm:gap-20">
                        {config.content?.groups?.map((group, index) => (
                            <div key={index}>
                                <div className="font-bold mb-2">
                                    <RenderHtml html={group.title} />
                                </div>
                                <ul className="space-y-1 text-sm">
                                    {group.links?.map((link, idx) => (
                                        <li key={idx}>
                                            <a href={link.href} className="hover:underline" target="_blank" rel="noopener noreferrer">
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {config.content?.copyright && (
                        <div className="mt-8 text-xs text-muted-foreground text-center">
                            <RenderHtml html={config.content?.copyright} />
                        </div>
                    )}
                </div>
            </footer>
        </Container>
    )
}

export function Editor({
    values,
    handleSubmit,
  }: {
    values: ComponentType
    handleSubmit: (data: ComponentType) => Promise<boolean>
  }) {
    return (
      <>
        <ContainerPanel config={values.container} onChange={(v) => handleSubmit({ container: v })} />
  
        <Panel title="Content">
          <RichTextEditor
            label="Brand / Description"
            value={values.content?.brand}
            onChange={(v) => handleSubmit({ content: { brand: v } })}
            showAlignment
            showBackgroundColor
            showHeading
            showLink
          />
  
  <RepeaterEditor<FooterGroup>
  label="Link Groups"
  itemLabel="Group"
  value={values.content?.groups || []}
  onChange={(groups) => handleSubmit({ content: { groups } })}
  max={4}
  createNewItem={() => ({ title: "Links", links: [] })}
  renderEditor={(group, onChange) => (
    <div className="space-y-2">
      <Input
        placeholder="Group Title"
        value={group.title || ""}
        onChange={(e) => onChange({ title: e.target.value })}
      />

      <Popover>
        <PopoverTrigger asChild>
          <Button className="w-full">
            Links ({group.links?.length || 0})
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-96 max-w-full p-4 space-y-4">
          <div className="text-sm font-medium">Links</div>

          {(group.links || []).map((link, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <Input
                placeholder="Label"
                value={link.label || ""}
                onChange={(e) => {
                  const updated = [...(group.links || [])]
                  updated[idx] = { ...link, label: e.target.value }
                  onChange({ links: updated })
                }}
              />
              <Input
                placeholder="URL"
                value={link.href || ""}
                onChange={(e) => {
                  const updated = [...(group.links || [])]
                  updated[idx] = { ...link, href: e.target.value }
                  onChange({ links: updated })
                }}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const updated = (group.links || []).filter((_, i) => i !== idx)
                  onChange({ links: updated })
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}

          {(!group.links || group.links.length < 6) && (
            <Button
              onClick={() => {
                onChange({
                  links: [...(group.links || []), { label: "", href: "" }],
                })
              }}
              variant="outline"
              size="sm"
              className="w-full"
            >
              + Add Link
            </Button>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )}
/>
  
          <RichTextEditor
            label="Copyright"
            value={values.content?.copyright}
            onChange={(v) => handleSubmit({ content: { copyright: v } })}
            showAlignment
            showLink
          />
        </Panel>
      </>
    )
  }