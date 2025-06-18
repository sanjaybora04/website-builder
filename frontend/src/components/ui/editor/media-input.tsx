import { Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import FileSelector from '@/components/storage/fileSelector';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type MediaType = 'image' | 'youtube';

export interface MediaConfig {
  type?: MediaType;
  url?: string;
  alt?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

interface MediaInputProps {
  value?: MediaConfig;
  onChange: (val?: MediaConfig) => void;
  label?: string;
  allowYouTube?: boolean;
}

export function MediaInput({
  value,
  onChange,
  label = "Media",
  allowYouTube = false
}: MediaInputProps) {
  const handleUpdate = (updates: Partial<MediaConfig>) => {
    onChange({ ...value, ...updates });
  };

  const type = value?.type || 'image';

  return (
    <div>
      <label className="block font-medium mb-2">{label}</label>

      {allowYouTube&&(
        <div className="mb-2">
          <Select
            value={type}
            onValueChange={(val) => onChange({ type: val as MediaType })}
          >
            <SelectTrigger className='bg-background'>
              <SelectValue placeholder="Select media type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="image">Image</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Media UI */}
      {type === 'image' ? (
        value?.url ? (
          <div className="relative max-w-96 aspect-video">
            <img
              src={value.url}
              alt={value.alt || ""}
              className="w-full h-full border bg-accent rounded"
              style={{ objectFit: value.objectFit }}
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
                onValueChange={(val) => handleUpdate({ objectFit: val as MediaConfig["objectFit"] })}
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
          <FileSelector onSelect={(url: string) => onChange({ type: 'image', url })} />
        )
      ) : (
        <div className="flex flex-col gap-2">
          <Input
            placeholder="Paste YouTube video URL"
            value={value?.url || ''}
            onChange={(e) => handleUpdate({ url: e.target.value })}
          />
          {value?.url && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onChange(undefined)}
              className="self-start"
            >
              Remove
            </Button>
          )}
        </div>
      )}
    </div>
  );
}


export function MediaComponent({ config, imageClassname, youtubeClassname }: { config?: MediaConfig; imageClassname?: string, youtubeClassname?: string }) {
  if (!config?.url) return null;

  switch (config.type) {
    case 'image':
      return (
        <img
          src={config.url}
          alt={config.alt}
          style={{ objectFit: config.objectFit }}
          className={imageClassname}
        />
      );
    case 'youtube': {
      const videoId = config.url.match(/(?:v=|youtu\.be\/)([\w-]{11})/)?.[1];
      return videoId ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          className={youtubeClassname}
          title="YouTube Video"
          allowFullScreen
        />
      ) : null;
    }
    default:
      return (
        <img
          src={config.url}
          alt={config.alt}
          style={{ objectFit: config.objectFit }}
          className={imageClassname}
        />
      );
  }
}
