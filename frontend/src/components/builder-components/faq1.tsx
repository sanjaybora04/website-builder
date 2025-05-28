import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

type Faq = {
  question?: string;
  answer?: string;
};

type FaqConfig = {
  title?: string;
  faqs?: Faq[];
};

// ✅ RENDER COMPONENT
export function Component({ config }: { config: FaqConfig }) {
  return (
    <div className="px-4 py-10 sm:px-10 md:px-20 space-y-10">
      {config.title && <h2 className="text-2xl sm:text-3xl font-semibold font-raleway text-center">{config.title}</h2>}
      <Accordion type="single" collapsible className="space-y-2 max-w-5xl mx-auto">
        {config.faqs?.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4 py-2">
            <AccordionTrigger className="text-lg font-medium">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-gray-700">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

// ✅ EDITOR COMPONENT
export function Editor({
  values,
  handleSubmit,
}: {
  values: FaqConfig;
  handleSubmit: (data: FaqConfig) => Promise<boolean>;
}) {
  const updateFaq = (index: number, updated: Faq) => {
    const newFaqs = [...(values.faqs || [])];
    newFaqs[index] = updated;
    handleSubmit({ faqs: newFaqs });
  };

  const deleteFaq = (index: number) => {
    const newFaqs = [...(values.faqs || [])];
    newFaqs.splice(index, 1);
    handleSubmit({ faqs: newFaqs });
  };

  return (
    <div className="space-y-4">
      <Label>Title</Label>
      <Input
        value={values.title || ""}
        onChange={(e) => handleSubmit({ title: e.target.value })}
        placeholder="FAQ Section Title"
      />

      <div className="space-y-4">
        {values.faqs?.map((faq, index) => (
          <div key={index} className="border p-4 rounded relative space-y-2">
            <Label>Question</Label>
            <Input
              value={faq.question || ""}
              onChange={(e) =>
                updateFaq(index, { ...faq, question: e.target.value })
              }
            />
            <Label>Answer</Label>
            <Textarea
              value={faq.answer || ""}
              onChange={(e) =>
                updateFaq(index, { ...faq, answer: e.target.value })
              }
            />
            <Button
              size="icon"
              variant="destructive"
              className="absolute top-2 right-2"
              onClick={() => deleteFaq(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button
        onClick={() =>
          handleSubmit({
            faqs: [...(values.faqs || []), { question: "", answer: "" }],
          })
        }
      >
        Add FAQ
      </Button>
    </div>
  );
}
