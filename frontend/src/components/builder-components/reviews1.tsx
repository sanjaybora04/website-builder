'use client'
// components/testimonials.tsx

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Container, ContainerConfig, ContainerPanel } from "../ui/editor/container"
import RichTextEditor from "../ui/editor/rich-text-editor"
import RenderHtml from "../ui/editor/rich-text-editor/render-html"
import Panel from "../ui/editor/panel"
import {MediaInput, MediaComponent, MediaConfig } from "../ui/editor/media-input"
import { RepeaterEditor } from "../ui/editor/repeater"
import { PaintBucket, Type } from "lucide-react"
import ColorPicker from "../ui/editor/color-picker"
import Autoplay from 'embla-carousel-autoplay'
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"

type Testimonial = {
  name?: string
  position?: string
  image?: MediaConfig
  quote?: string
}

type ComponentType = {
  container?: ContainerConfig
  carousel?: {
    backgroundColor?: string
    color?: string
    autoplay?: boolean
  }
  content?: {
    title?: string
    paragraph?: string
    testimonials?: Testimonial[]
  }
}

export function Component({ config }: { config: ComponentType }) {
  return (
    <Container config={config.container}>
      <div>
        <div className="text-2xl sm:text-3xl font-semibold font-raleway">
          <RenderHtml html={config.content?.title} />
        </div>
        <div className="mt-2">
          <RenderHtml html={config.content?.paragraph} />
        </div>
      </div>

      <Carousel className="w-full mt-5"
        plugins={config.carousel?.autoplay ? [Autoplay({ delay: 2000 })] : []}
        opts={{ loop: true }}>
        <CarouselContent className="-ml-5">
          {config.content?.testimonials?.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-5 basis-full sm:basis-1/2 lg:basis-1/3"
            >
              <div
                className="p-6 h-full rounded shadow text-center border flex flex-col justify-between"
                style={{ backgroundColor: config.carousel?.backgroundColor, color: config.carousel?.color }}
              >
                <MediaComponent
                  config={item.image}
                  imageClassname="w-16 h-16 mx-auto rounded-full object-cover mb-4"
                />
                <div className="text-lg italic mb-2">
                  <RenderHtml html={item.quote} />
                </div>
                <div className="font-semibold">
                  <RenderHtml html={item.name} />
                </div>
                {item.position && (
                  <div className="text-sm">
                    <RenderHtml html={item.position} />
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Container>
  )
}


export function Editor({ values, handleSubmit }: { values: ComponentType, handleSubmit: (data: ComponentType) => Promise<boolean> }) {
  return (
    <>
      <ContainerPanel config={values.container} onChange={(v) => handleSubmit({ container: v })} />

      <Panel title="Carousel" defaultOpen={false}>
        <div className="flex gap-1">
          <ColorPicker icon={<Type />} color={values.carousel?.color} onChange={(v) => handleSubmit({ carousel: { color: v } })} />
          <ColorPicker icon={<PaintBucket />} color={values.carousel?.backgroundColor} onChange={(v) => handleSubmit({ carousel: { backgroundColor: v } })} />
        </div>
        <div className="flex gap-2">
          <Label>Autoplay</Label>
          <Checkbox
            id="autoplay"
            checked={values.carousel?.autoplay ?? false}
            onCheckedChange={(checked) =>
              handleSubmit({ carousel: { autoplay: checked === true } })
            }
          />
        </div>
      </Panel>

      <Panel title="Content">
        <RichTextEditor
          label="Section Title"
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
        />

        <RepeaterEditor<Testimonial>
          label="Reviews"
          itemLabel="Review"
          value={values.content?.testimonials || []}
          onChange={(testimonials) => handleSubmit({ content: { testimonials } })}
          max={10}
          createNewItem={() => ({
            name: "John Doe",
            position: "CEO, Example Inc.",
            quote: "This product has changed the way we work!",
          })}
          renderEditor={(testimonial, onChange) => (
            <>
              <RichTextEditor label="Quote" value={testimonial.quote} onChange={(v) => onChange({ quote: v })} />
              <RichTextEditor label="Name" value={testimonial.name} onChange={(v) => onChange({ name: v })} />
              <RichTextEditor label="Position" value={testimonial.position} onChange={(v) => onChange({ position: v })} />
              <MediaInput label="Avatar" value={testimonial.image} onChange={(v) => onChange({ image: v })} />
            </>
          )}
        />
      </Panel>
    </>
  )
}
