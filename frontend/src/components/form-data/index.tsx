'use client'

import { useEffect, useState } from 'react'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { Pagination } from "@/components/ui/pagination"
import { format } from 'date-fns'
import api from '@/lib/api'

type Submission = {
  id: string
  page: string
  createdAt: string
  data: Record<string, any>
}

export default function FormSubmissionsTable() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [limit] = useState('10')
  const [pathFilter, setPathFilter] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchSubmissions = async () => {
    setLoading(true)
    try {
      const res = await api.form.get(
        undefined, // websiteId (optional)
        pathFilter,
        limit,
        page
      )
      setSubmissions(res.data?.data || [])
      setTotal(res.data?.total || 0)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubmissions()
  }, [page, pathFilter])

  const pageCount = Math.ceil(total / parseInt(limit))

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Filter by path (e.g., /contact)"
          value={pathFilter}
          onChange={(e) => {
            setPage(1)
            setPathFilter(e.target.value)
          }}
        />
      </div>

      <div className="border rounded-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Page</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Preview</TableHead>
              <TableHead>Full Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission) => {
              const entries = Object.entries(submission.data || {})
              const preview = entries.slice(0, 2)

              return (
                <TableRow key={submission.id}>
                  <TableCell>{submission.id.slice(0, 8)}</TableCell>
                  <TableCell>{submission.page}</TableCell>
                  <TableCell>{format(new Date(submission.createdAt), 'yyyy-MM-dd HH:mm')}</TableCell>
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
                        <pre className="bg-muted p-4 rounded text-sm overflow-auto">
                          {JSON.stringify(submission.data, null, 2)}
                        </pre>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              )
            })}
            {submissions.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No submissions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* {pageCount > 1 && (
        <Pagination
          total={total}
          pageSize={parseInt(limit)}
          currentPage={page}
          onPageChange={setPage}
        />
      )} */}
    </div>
  )
}
