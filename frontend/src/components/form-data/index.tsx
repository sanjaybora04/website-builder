'use client'

import { useState } from 'react'
import {
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { format } from 'date-fns'
import api from '@/lib/api'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '../ui/select'
import {
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Copy, Loader
} from 'lucide-react'
import { toast } from 'sonner'
import { useQuery } from '@tanstack/react-query'

type Submission = {
  id: string
  website: any
  page: string
  createdAt: string
  data: Record<string, any>
}

export default function FormSubmissionsTable() {
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState('10')
  const [pathFilter, setPathFilter] = useState('')

  const { data, isFetching } = useQuery({
    queryKey: ['submissions', { page, limit, pathFilter }],
    queryFn: async () => {
      const res = await api.form.get(
        undefined, // websiteId (optional)
        pathFilter,
        limit,
        page
      )
      return res.data
    },
    staleTime: 60*1000
  })

  const submissions: Submission[] = data?.data || []
  const total: number = data?.total || 0

  return (
    <div className="p-6 space-y-4">

      <div className="border rounded-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Website</TableHead>
              <TableHead>Page</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Preview</TableHead>
              <TableHead>Full Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isFetching ? (
              <TableRow>
                <TableCell colSpan={10} className="p-5">
                  <Loader className="mx-auto animate-spin" />
                </TableCell>
              </TableRow>
            ) : (
              submissions.map((submission) => {
                const entries = Object.entries(submission.data || {})
                const preview = entries.slice(0, 2)

                return (
                  <TableRow key={submission.id}>
                    <TableCell>{submission.website.name}</TableCell>
                    <TableCell>{submission.page}</TableCell>
                    <TableCell>{format(new Date(submission.createdAt), 'dd LLL,yyyy hh:mm aa')}</TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        {preview.map(([key, value]) => (
                          <div key={key}>
                            <strong>{key}</strong>: {String(value)}
                          </div>
                        ))}
                        {entries.length > 2 && (
                          <span className="text-xs text-muted-foreground">
                            +{entries.length - 2} more
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">View</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto">
                          <h2 className="text-lg font-semibold mb-2">Full Submission</h2>
                          <pre className="bg-muted p-4 rounded text-sm overflow-auto relative">
                            <Button
                              size='icon'
                              variant='outline'
                              className='absolute top-2 right-2'
                              onClick={async () => {
                                await navigator.clipboard.writeText(JSON.stringify(submission.data, null, 2))
                                toast.success('Copied')
                              }}
                            >
                              <Copy />
                            </Button>
                            {JSON.stringify(submission.data, null, 2)}
                          </pre>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
            {!isFetching && submissions.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No submissions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-5 mb-10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="font-medium">Rows:</div>
          <Select value={limit} onValueChange={(value) => {
            setPage(0)
            setLimit(value)
          }}>
            <SelectTrigger className="w-20">
              <SelectValue placeholder="Select number of rows" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='10'>10</SelectItem>
              <SelectItem value='20'>20</SelectItem>
              <SelectItem value='30'>30</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-3 items-center">
          <div>Page-{page + 1} of {Math.ceil(total / Number(limit))}</div>
          <div className="flex gap-2">
            <Button size='icon' variant='outline' disabled={page <= 0} onClick={() => setPage(0)}><ChevronsLeft /></Button>
            <Button size='icon' variant='outline' disabled={page <= 0} onClick={() => setPage(prev => prev - 1)}><ChevronLeft /></Button>
            <Button size='icon' variant='outline' disabled={page >= total / Number(limit) - 1} onClick={() => setPage(prev => prev + 1)}><ChevronRight /></Button>
            <Button size='icon' variant='outline' disabled={page >= total / Number(limit) - 1} onClick={() => setPage(Math.ceil(total / Number(limit) - 1))}><ChevronsRight /></Button>
          </div>
        </div>
      </div>
    </div>
  )
}
