import { PaintBucket, Type } from "lucide-react"
import ColorPicker from "../ui/editor/color-picker"
import { Container, ContainerConfig, ContainerPanel } from "../ui/editor/container"
import Panel from "../ui/editor/panel"
import RenderHtml from "../ui/editor/rich-text-editor/render-html"
import RichTextEditor from "../ui/editor/rich-text-editor"
import { RepeaterEditor } from "../ui/editor/repeater"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"

// types
type FAQItem = {
  question?: string
  answer?: string
}

type ComponentType = {
  container?: ContainerConfig,
  accordion?: {
      color?: string
      backgroundColor?: string
  },
  content?: {
      title?: string,
      description?: string,
      faqs?: FAQItem[]
  }
}

// component
export function Component({ config }: { config: ComponentType }) {
  return (
      <Container config={config.container}>
          <div>
              <div className="text-2xl sm:text-3xl font-semibold font-raleway">
                  <RenderHtml html={config.content?.title} />
              </div>
              <div className="mt-2">
                  <RenderHtml html={config.content?.description} />
              </div>
          </div>
          <Accordion type="multiple" className="mt-6 w-full max-w-3xl mx-auto space-y-2">
                {config.content?.faqs?.map((faq, index) => (
                    <AccordionItem
                        key={index}
                        value={`faq-${index}`}
                        className="border rounded-md shadow"
                        style={{
                            backgroundColor: config.accordion?.backgroundColor,
                            color: config.accordion?.color,
                        }}
                    >
                        <AccordionTrigger className="text-left font-medium text-lg px-4 py-2">
                            <RenderHtml html={faq.question} />
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 pt-1">
                            <RenderHtml html={faq.answer} />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
      </Container>
  )
}

// editor
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

          <Panel title="Accordion" defaultOpen={false}>
            <div className="flex gap-1">
              <ColorPicker
                  icon={<Type />}
                  color={values.accordion?.color}
                  onChange={(v) => handleSubmit({ accordion: { color: v } })}
                  />
              <ColorPicker
                  icon={<PaintBucket />}
                  color={values.accordion?.backgroundColor}
                  onChange={(v) => handleSubmit({ accordion: { backgroundColor: v } })}
                  />
                  </div>
          </Panel>

          <Panel title="Content">
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
                  label="Description"
                  value={values.content?.description}
                  onChange={(v) => handleSubmit({ content: { description: v } })}
                  showAlignment
                  showBackgroundColor
                  showHeading
                  showLink
              />
              <RepeaterEditor<FAQItem>
                  label="FAQs"
                  itemLabel="FAQ"
                  value={values.content?.faqs || []}
                  onChange={(faqs) => handleSubmit({ content: { faqs } })}
                  max={10}
                  createNewItem={() => ({
                      question: "What is your return policy?",
                      answer: "You can return items within 30 days.",
                  })}
                  renderEditor={(faq, onChange) => (
                      <>
                          <RichTextEditor
                              label="Question"
                              value={faq.question}
                              onChange={(v) => onChange({ question: v })}
                              showAlignment
                              showBackgroundColor
                              showHeading
                              showLink
                          />
                          <RichTextEditor
                              label="Answer"
                              value={faq.answer}
                              onChange={(v) => onChange({ answer: v })}
                              showAlignment
                              showBackgroundColor
                              showHeading
                              showLink
                              showList
                          />
                      </>
                  )}
              />
          </Panel>
      </>
  )
}
