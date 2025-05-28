import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { Trash2 } from "lucide-react"

type Review = {
  name?: string
  role?: string
  review?: string
  avatar?: string
}

type ReviewsConfig = {
  title?: string
  reviews?: Review[]
}

// ✅ DISPLAY COMPONENT
export function Component({ config }: { config: ReviewsConfig }) {
  return (
    <div className="py-10 px-4 md:px-20 bg-gray-50">
      {config.title && <h2 className="text-2xl sm:text-3xl font-semibold font-raleway text-center">{config.title}</h2>}
      <div className="flex flex-col sm:flex-row gap-6 max-w-5xl mx-auto mt-10">
        {config.reviews?.map((r, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow space-y-4">
            <p className="text-gray-700 italic">&quot;{r.review}&quot;</p>
            <div className="flex items-center gap-4">
              {r.avatar && <img src={r.avatar} className="w-12 h-12 rounded-full object-cover" />}
              <div>
                <p className="font-semibold">{r.name}</p>
                <p className="text-sm text-gray-500">{r.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ✅ EDITOR COMPONENT
export function Editor({
  values,
  handleSubmit,
}: {
  values: ReviewsConfig
  handleSubmit: (data: ReviewsConfig) => Promise<boolean>
}) {
  const updateReview = (index: number, updated: Review) => {
    const updatedReviews = [...(values.reviews || [])]
    updatedReviews[index] = updated
    handleSubmit({ reviews: updatedReviews })
  }

  const deleteReview = (index: number) => {
    const updatedReviews = [...(values.reviews || [])]
    updatedReviews.splice(index, 1)
    handleSubmit({ reviews: updatedReviews })
  }

  return (
    <div className="space-y-4">
      <Label>Title</Label>
      <Input
        value={values.title || ""}
        onChange={(e) => handleSubmit({ title: e.target.value })}
        placeholder="Testimonials Section Title"
      />

      {values.reviews?.map((r, i) => (
        <div key={i} className="border rounded p-4 relative space-y-2">
          <Label>Name</Label>
          <Input
            value={r.name || ""}
            onChange={(e) => updateReview(i, { ...r, name: e.target.value })}
          />
          <Label>Role</Label>
          <Input
            value={r.role || ""}
            onChange={(e) => updateReview(i, { ...r, role: e.target.value })}
          />
          <Label>Review</Label>
          <Textarea
            value={r.review || ""}
            onChange={(e) => updateReview(i, { ...r, review: e.target.value })}
          />
          <Label>Avatar URL</Label>
          <Input
            value={r.avatar || ""}
            onChange={(e) => updateReview(i, { ...r, avatar: e.target.value })}
          />
          <Button
            size="icon"
            variant="destructive"
            className="absolute top-2 right-2"
            onClick={() => deleteReview(i)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}

      <Button
        onClick={() =>
          handleSubmit({
            reviews: [...(values.reviews || []), { name: "", review: "", role: "", avatar: "" }],
          })
        }
      >
        Add Review
      </Button>
    </div>
  )
}
