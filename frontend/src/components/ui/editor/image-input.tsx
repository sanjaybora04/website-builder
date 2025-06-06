import { Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import FileUploadComponent from '@/components/storage/fileuploader';
import FileSelector from '@/components/storage/fileSelector';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface ImageInputValue {
  url?: string;
  alt?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

interface ImageInputProps {
  value?: ImageInputValue;
  onChange: (val?: ImageInputValue) => void;
  label?: string;
}

export default function ImageInput({ value, onChange, label = "Image" }: ImageInputProps) {
  const handleUpdate = (updates: Partial<ImageInputValue>) => {
    onChange({ ...value, ...updates });
  };

  return (
    <div>
      <label className="block font-medium mb-2">{label}</label>
      {value?.url ? (
        <div className="relative max-w-96 aspect-video">
          <img
            src={value.url}
            alt={value.alt || ""}
            className={`w-full h-full border bg-accent rounded object-contain`}
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => onChange(undefined)}
          >
            <Trash2 />
          </Button>

          <div className="mt-2 flex gap-2">
            <Input
              placeholder="Alt text"
              value={value.alt || ''}
              onChange={(e) => handleUpdate({ alt: e.target.value })}
              className='w-1/2'
            />
            <Select
              value={value.objectFit || 'none'}
              onValueChange={(val) => handleUpdate({ objectFit: val as ImageInputValue["objectFit"] })}
            >
              <SelectTrigger className='w-1/2 bg-background'>
                <SelectValue placeholder="Select object fit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cover">Cover</SelectItem>
                <SelectItem value="contain">Contain</SelectItem>
                <SelectItem value="fill">Fill</SelectItem>
                <SelectItem value="scale-down">Scale Down</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <FileUploadComponent onUpload={(url: string) => onChange({ url })} />
          <FileSelector onSelect={(url: string) => onChange({ url })} />
        </div>
      )}
    </div>
  );
}


export function ImageComponent({config,className}:{config?:ImageInputValue,className?:string}){
  if(config?.url)return <img src={config?.url} alt={config?.alt} style={{objectFit:config?.objectFit}} className={className}/>
  return <></>
}