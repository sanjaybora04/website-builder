export default function FileCard({file}:{file:any}){
    return (
        <div className="w-40 h-48 rounded overflow-hidden relative flex gap-2 flex-col justify-between border p-1">
            <img src={process.env.NEXT_PUBLIC_S3_URL + '/' + file.key} className="w-full h-32 object-contain" />
            <div className="line-clamp-1" title={file.fileName}>
                {file.fileName}
            </div>
            <div className="flex gap-3">
                <div className="text-xs text-muted-foreground uppercase">
                    {file.contentType?.split('/')[1]}
                </div>
                <div className="text-xs text-muted-foreground">
                    {file.size > 1024 * 1024 ? (file.size / (1024 * 1024)).toFixed(2) + ' MB' : (file.size / 1024).toFixed(2) + ' KB'}
                </div>
            </div>
        </div>
    )
}