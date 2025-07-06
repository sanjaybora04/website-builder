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
  CalendarIcon,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Copy, Download, Loader
} from 'lucide-react'
import { toast } from 'sonner'
import { useQuery } from '@tanstack/react-query'
import { addDays } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { cn } from '@/lib/utils'
import { Calendar } from '../ui/calendar'
import useWebsites from '@/hooks/use-websites'
export function downloadAsCSV(rows: Record<string, string>[], filename: string) {
  if (!rows.length) return

  const headers = Object.keys(rows[0])
  const csv = [
    headers.join(','),
    ...rows.map(row => headers.map(h => `"${(row[h] ?? '').replace(/"/g, '""')}"`).join(','))
  ].join('\n')

  const blob = new Blob([csv], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  window.URL.revokeObjectURL(url)
}


type Submission = {
  id: string
  website: any
  page: string
  createdAt: string
  data: Record<string, any>
}

export default function FormSubmissionsTable() {
  const { websites } = useWebsites()
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState('10')
  const [pageFilter, setPageFilter] = useState('')
  const [websiteFilter, setWebsiteFilter] = useState('')
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  })

  const { data, isFetching } = useQuery({
    queryKey: ['submissions', { page, dateRange, limit, pageFilter, websiteFilter }],
    queryFn: async () => {
      const res = await api.form.get(
        websiteFilter,
        pageFilter,
        dateRange?.from?.toISOString(),
        dateRange?.to?.toISOString(),
        limit,
        page
      )
      return res.data
    },
    staleTime: 60 * 1000
  })

  const submissions: Submission[] = data?.data || []
  const total: number = data?.total || 0

  const [isDownloading, setIsDownloading] = useState(false)

  async function handleDownload() {
    setIsDownloading(true)
    try {
      const res = await api.form.get(websiteFilter, pageFilter,
        dateRange?.from?.toISOString(),
        dateRange?.to?.toISOString(),
        limit,
        page
      )

      const allSubmissions: Submission[] = res.data.data || []

      // 1. Collect all dynamic keys
      const allKeys = new Set<string>()
      allSubmissions.forEach(sub => {
        Object.keys(sub.data || {}).forEach(key => allKeys.add(key))
      })

      // 2. Build rows with flattened data
      const rows = allSubmissions.map(sub => {
        const flat: Record<string, string> = {
          id: sub.id,
          website: sub.website?.name || '',
          page: sub.page,
          createdAt: format(new Date(sub.createdAt), 'yyyy-MM-dd HH:mm:ss'),
        }
        allKeys.forEach(key => {
          flat[key] = String(sub.data?.[key] ?? '')
        })
        return flat
      })

      // 3. Convert to CSV and download
      downloadAsCSV(rows, 'submissions.csv')
      toast.success('Download started')
    } catch (e) {
      console.error(e)
      toast.error('Failed to download')
    } finally {
      setIsDownloading(false)
    }
  }


  return (
    <div className="p-6 space-y-4">

      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className='flex flex-wrap gap-3'>
          <Select value={websiteFilter} onValueChange={setWebsiteFilter}>
            <SelectTrigger>
              <SelectValue placeholder='Select Website' />
            </SelectTrigger>
            <SelectContent>
              {websites.data.map(w =>
                <SelectItem key={w.id} value={w.id || ''}>{w.name}</SelectItem>
              )}
            </SelectContent>
          </Select>
          {websiteFilter &&
            <Select value={pageFilter} onValueChange={setPageFilter}>
              <SelectTrigger>
                <SelectValue placeholder='Select Page' />
              </SelectTrigger>
              <SelectContent>
                {websites.data.find(w=>w.id==websiteFilter)?.pages.map(p=>(
                  <SelectItem key={p.path} value={p.path}>{p.path}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          }
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[260px] justify-start text-left font-normal",
                  !dateRange && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                showOutsideDays={false}
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button onClick={handleDownload} disabled={isDownloading} title='Download CSV'>
          {isDownloading ? (
            <Loader className="animate-spin" />
          ) : (
            <>
              <Download />
            </>
          )}
        </Button>
      </div>


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
