import Link from "next/link";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

type FooterType = {
    title?: string;
    description?: string;
    links?: {
        label?: string;
        href?: string;
    }[];
};

export function Component({ config }: { config: FooterType }) {
    return (
        <footer className="bg-gray-900 text-white px-6 py-10">
            <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
                {config.title && <h2 className="text-2xl font-bold">{config.title}</h2>}
                {config.description && <p className="text-center text-gray-400 max-w-xl">{config.description}</p>}
                {config.links && config.links.length > 0 && (
                    <div className="flex flex-wrap gap-4 justify-center mt-4">
                        {config.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href || "#"}
                                className="text-blue-400 hover:underline"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </footer>
    );
}

export function Editor({
    values,
    handleSubmit,
}: {
    values: FooterType;
    handleSubmit: (data: FooterType) => Promise<boolean>;
}) {
    const updateLink = (index: number, key: "label" | "href", value: string) => {
        const updatedLinks = [...(values.links || [])];
        updatedLinks[index] = {
            ...updatedLinks[index],
            [key]: value,
        };
        handleSubmit({ links: updatedLinks });
    };

    const addLink = () => {
        handleSubmit({ links: [...(values.links || []), { label: "", href: "" }] });
    };

    const removeLink = (index: number) => {
        const updatedLinks = [...(values.links || [])];
        updatedLinks.splice(index, 1);
        handleSubmit({ links: updatedLinks });
    };

    return (
        <div className="space-y-2">
            <Label>Title</Label>
            <Input value={values.title} onChange={(e) => handleSubmit({ title: e.target.value })} />

            <Label>Description</Label>
            <Textarea
                value={values.description}
                onChange={(e) => handleSubmit({ description: e.target.value })}
            />

            <Label>Links</Label>
            <div className="space-y-2">
                {(values.links || []).map((link, index) => (
                    <div key={index} className="flex gap-2 items-center">
                        <Input
                            placeholder="Label"
                            value={link.label}
                            onChange={(e) => updateLink(index, "label", e.target.value)}
                        />
                        <Input
                            placeholder="Href"
                            value={link.href}
                            onChange={(e) => updateLink(index, "href", e.target.value)}
                        />
                        <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => removeLink(index)}
                        >
                            <Trash2 />
                        </Button>
                    </div>
                ))}
                <Button onClick={addLink}>+ Add Link</Button>
            </div>
        </div>
    );
}
