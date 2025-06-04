import { Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import FileUploadComponent from '@/components/storage/fileuploader';
import FileSelector from '@/components/storage/fileSelector';

interface ImageInputProps {
  value?: string;
  onChange: (url?: string) => void;
  label?: string;
}

export default function ImageInput({ value, onChange, label = "Image" }: ImageInputProps) {
  return (
    <div>
      <label className="block font-medium mb-2">{label}</label>
      {value ? (
        <div className="relative max-w-96 aspect-video">
          <img src={value} alt="uploaded" className="w-full h-full object-contain border bg-accent rounded" />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => onChange(undefined)}
          >
            <Trash2 />
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <FileUploadComponent onUpload={(url: string) => onChange(url)} />
          <FileSelector onSelect={(url: string) => onChange(url)} />
        </div>
      )}
    </div>
  );
}
