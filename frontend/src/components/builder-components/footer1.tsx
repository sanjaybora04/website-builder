import { Container, ContainerConfig, ContainerPanel } from "../ui/editor/container"
import Panel from "../ui/editor/panel"
import RenderHtml from "../ui/editor/rich-text-editor/render-html"
import RichTextEditor from "../ui/editor/rich-text-editor"
import { RepeaterEditor } from "../ui/editor/repeater"
import { Button } from "../ui/button"
import { Facebook, Github, Instagram, Linkedin, MessageCircle, PaintBucket, Slack, Twitter, X, Youtube } from "lucide-react"
import { Input } from "../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import {MediaInput, MediaComponent, MediaConfig } from "../ui/editor/media-input"
import DebouncedInput from "../ui/editor/input"
import { Label } from "../ui/label"
import ColorPicker from "../ui/editor/color-picker"

type FooterLink = {
  label?: string
  href?: string
}

type FooterGroup = {
  title?: string
  links?: FooterLink[]
}

type socials = {
  color?: string,
  instagram?: string,
  facebook?: string,
  twitter?: string,
  linkedin?: string,
  youtube?: string,
  github?: string,
  whatsapp?: string,
  slack?: string,
}

type ComponentType = {
  container?: ContainerConfig,
  content?: {
    logo?: MediaConfig
    title?: string
    paragraph?: string
    groups?: FooterGroup[]
    socials?: socials
    copyright?: string
  }
}

const socialIcons = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
  github: Github,
  whatsapp: MessageCircle,
  slack: Slack,
}

export function Component({ config }: { config: ComponentType }) {
  return (
    <Container config={config.container}>
      <footer className="w-full">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row flex-wrap gap-10 sm:gap-20">
            <div>
              <div className="flex gap-3 items-center mb-4">
                {config.content?.logo && (
                  <MediaComponent config={config.content.logo} imageClassname="w-10 h-10" />
                )}
                {config.content?.title && (
                  <div className="text-xl sm:text-2xl font-semibold font-raleway">
                    <RenderHtml html={config.content.title} />
                  </div>
                )}
              </div>
              {config.content?.paragraph && (
                <div className="text-sm">
                  <RenderHtml html={config.content.paragraph} />
                </div>
              )}
            </div>
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

          <div className="mt-8 flex justify-center space-x-4" style={{ color: config.content?.socials?.color }}>
            {config.content?.socials && Object.entries(config.content.socials).map(([key, url]) => {
              const Icon = socialIcons[key as keyof typeof socialIcons]
              if (!Icon || !url) return null
              return (
                <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="hover:scale-105">
                  <Icon className="w-6 h-6" />
                </a>
              )
            })}
          </div>

          {config.content?.copyright && (
            <div className="mt-5 text-xs text-center">
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
        <MediaInput
          label="Logo"
          value={values.content?.logo}
          onChange={(v) => handleSubmit({ content: { logo: v } })}
        />

        <RichTextEditor
          label="Title"
          value={values.content?.title}
          onChange={(v) => handleSubmit({ content: { title: v } })}
          showAlignment
          showBackgroundColor
          showHeading
          showLink
        />

        <RichTextEditor
          label="Paragraph"
          value={values.content?.paragraph}
          onChange={(v) => handleSubmit({ content: { paragraph: v } })}
          showAlignment
          showBackgroundColor
          showHeading
          showLink
          showList
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

      <Panel title="Socials" defaultOpen={false}>
        <ColorPicker
          label="Socials Icon Color"
          icon={<PaintBucket />}
          color={values.content?.socials?.color}
          onChange={(color) => handleSubmit({ content: { socials: { ...values.content?.socials, color } } })}
        />

        <div>
          <Label className="mb-2">Instagram</Label>
          <DebouncedInput
            value={values.content?.socials?.instagram || ""}
            onChange={(e) => handleSubmit({ content: { socials: { instagram: e.target.value } } })}
            placeholder="Instagram URL"
          />
        </div>

        <div>
          <Label className="mb-2">Facebook</Label>
          <DebouncedInput
            value={values.content?.socials?.facebook || ""}
            onChange={(e) => handleSubmit({ content: { socials: { facebook: e.target.value } } })}
            placeholder="Facebook URL"
          />
        </div>

        <div>
          <Label className="mb-2">Twitter</Label>
          <DebouncedInput
            value={values.content?.socials?.twitter || ""}
            onChange={(e) => handleSubmit({ content: { socials: { twitter: e.target.value } } })}
            placeholder="Twitter URL"
          />
        </div>

        <div>
          <Label className="mb-2">LinkedIn</Label>
          <DebouncedInput
            value={values.content?.socials?.linkedin || ""}
            onChange={(e) => handleSubmit({ content: { socials: { linkedin: e.target.value } } })}
            placeholder="LinkedIn URL"
          />
        </div>

        <div>
          <Label className="mb-2">YouTube</Label>
          <DebouncedInput
            value={values.content?.socials?.youtube || ""}
            onChange={(e) => handleSubmit({ content: { socials: { youtube: e.target.value } } })}
            placeholder="YouTube URL"
          />
        </div>

        <div>
          <Label className="mb-2">GitHub</Label>
          <DebouncedInput
            value={values.content?.socials?.github || ""}
            onChange={(e) => handleSubmit({ content: { socials: { github: e.target.value } } })}
            placeholder="GitHub URL"
          />
        </div>

        <div>
          <Label className="mb-2">WhatsApp</Label>
          <DebouncedInput
            value={values.content?.socials?.whatsapp || ""}
            onChange={(e) => handleSubmit({ content: { socials: { whatsapp: e.target.value } } })}
            placeholder="WhatsApp URL"
          />
        </div>

        <div>
          <Label className="mb-2">Slack</Label>
          <DebouncedInput
            value={values.content?.socials?.slack || ""}
            onChange={(e) => handleSubmit({ content: { socials: { slack: e.target.value } } })}
            placeholder="Slack URL"
          />
        </div>

      </Panel>
    </>
  )
}