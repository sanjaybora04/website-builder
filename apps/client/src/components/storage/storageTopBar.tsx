import { ArrowBigLeft, ChevronRight, Home } from "lucide-react"
import { Button } from "../ui/button"
import AddFolder from "./addFolder"
import FileUploader from "./fileuploader"

export default function StorageTopBar(
    {
        folderPath,
        setFolderPath,
        reload,
        enableAddFolder=true,
        enableUploadFile=true
    }:
        {
            folderPath: any,
            setFolderPath: any,
            reload: any,
            enableAddFolder?: boolean,
            enableUploadFile?: boolean
        }) {
    return (
        <div className="flex justify-between gap-2">
            {folderPath.length > 0 &&
                <Button onClick={() => {
                    setFolderPath((prev: any) => (prev.slice(0, -1)))
                }}
                    size='icon'
                    variant='secondary'
                >
                    <ArrowBigLeft className="fill-current" />
                </Button>
            }

            <div className="flex items-center gap-2 w-full h-9 border px-2 whitespace-nowrap">
                <span className="text-sm text-muted-foreground cursor-pointer hover:text-primary"
                    onClick={() => {
                        setFolderPath([])
                    }
                    }
                ><Home /></span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                {folderPath.map((folder: any, index: number) => (
                    <>
                        <span key={index} className="text-sm text-muted-foreground cursor-pointer hover:text-primary"
                            onClick={() => {
                                setFolderPath((prev: any) => (prev.slice(0, index + 1)))
                            }
                            }
                        >
                            {folder.name}
                        </span>
                        {index < folderPath.length - 1 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                    </>
                ))}
            </div>
            {enableAddFolder && <AddFolder parentId={folderPath.length > 0 ? folderPath[folderPath.length - 1]?.id : ''} onFolderAdd={() => reload()} />}
            {enableUploadFile && <FileUploader onUpload={() => reload()} parentId={folderPath.length > 0 ? folderPath[folderPath.length - 1]?.id : ''} />}
        </div>
    )
}