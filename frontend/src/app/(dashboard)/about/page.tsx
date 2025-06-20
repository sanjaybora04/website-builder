import { Rocket, Sparkles, Users, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Routes from "@/lib/routes"

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-20">
      
      {/* Intro Section */}
      <section className="space-y-6 text-center">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          We’re building a powerful yet simple tool that helps freelancers, small businesses, and creators launch beautiful websites — fast.
        </p>
        <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md text-sm font-medium">
          <Rocket className="h-4 w-4" /> Currently in beta – your feedback is shaping our future.
        </div>
      </section>

      {/* Vision / Why */}
      <section className="space-y-4 text-center">
        <h2 className="text-3xl font-bold">Why we built this</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Most website builders are either too complex or too limiting. We wanted a solution that gives control to the user without overwhelming them. 
          A builder that’s fast, flexible, and developer-friendly — yet simple enough for anyone to use.
        </p>
      </section>

      {/* Highlights */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6 space-y-2">
            <Sparkles className="h-6 w-6 text-purple-600" />
            <h3 className="text-xl font-semibold">Component-first approach</h3>
            <p className="text-muted-foreground">Drag, drop, and configure pre-built sections to create a unique website in minutes.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 space-y-2">
            <Users className="h-6 w-6 text-blue-600" />
            <h3 className="text-xl font-semibold">For freelancers & teams</h3>
            <p className="text-muted-foreground">Built with flexibility in mind — ideal for both solo makers and growing agencies.</p>
          </CardContent>
        </Card>
      </section>

      {/* Team / Founder */}
      <section className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Built by passionate developers</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          This project was started by <a href="https://sanjaybora.in" className="hover:underline"><strong>Sanjay</strong></a> — a full-stack developer building tools to help others move fast and launch faster.
          We believe great tools should empower, not slow you down.
        </p>
      </section>

      {/* CTA */}
      <section className="bg-muted py-12 rounded-xl text-center space-y-4">
        <h2 className="text-2xl font-bold">Want to help shape the future of this tool?</h2>
        <p className="text-muted-foreground">Your feedback means the world to us. Let us know what you want to see next.</p>
        <Button size="lg" variant="outline" asChild>
          <Link href={Routes.contact}>
           <MessageCircle className="h-4 w-4 mr-2" /> Share Feedback
          </Link>
        </Button>
      </section>

    </main>
  )
}
