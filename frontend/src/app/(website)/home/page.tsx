import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import useAuth from "@/hooks/use-auth"
import Routes from "@/lib/routes"
import { CheckCircle, MousePointerClick, UploadCloud, Rocket } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <main className="">
      {/* HERO SECTION */}
      <section className="text-center py-24 px-6">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Create Beautiful Websites — Visually</h1>
        <p className="text-lg max-w-xl mx-auto mb-6">
          Our drag-and-drop builder lets you design, customize, and launch stunning websites in minutes. No code required.
        </p>
        <Button size="lg" asChild>
          <Link href={Routes.addWebsite}>View Templates</Link>
        </Button>
      </section>

      <iframe src="https://www.youtube.com/embed/LkuLQJiSj9E" className="px-6 mx-auto max-w-4xl w-full aspect-video" allowFullScreen />

      {/* HOW IT WORKS */}
      <section className="py-20 px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardContent className="p-6 text-center">
              <MousePointerClick size={40} className="mx-auto text-blue-600 mb-4" />
              <h3 className="font-semibold text-xl">Drag Components</h3>
              <p className="text-muted-foreground mt-2">Choose from a wide library of sections like heroes, testimonials, FAQs, and more.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <UploadCloud size={40} className="mx-auto text-green-600 mb-4" />
              <h3 className="font-semibold text-xl">Customize Easily</h3>
              <p className="text-muted-foreground mt-2">Edit content, update colors, manage metadata — all visually in real-time.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Rocket size={40} className="mx-auto text-purple-600 mb-4" />
              <h3 className="font-semibold text-xl">Publish Instantly</h3>
              <p className="text-muted-foreground mt-2">Deploy your site on a custom or free subdomain with one click.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">Why Developers & Creators Love It</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            "SEO-optimized pages with custom metadata",
            "Reusable components for fast workflows",
            "Live preview while editing content",
            "Global styles and theme manager",
            "Free & paid templates",
            "Built-in image optimization",
          ].map((feature, i) => (
            <div key={i} className="flex items-start gap-3 p-4">
              <CheckCircle className="text-green-600 mt-1" />
              <p className="">{feature}</p>
            </div>
          ))}
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-20 px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">Perfect For</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          {[
            { title: "Freelancers", desc: "Quickly launch client websites and landing pages." },
            { title: "Small Businesses", desc: "Promote services and collect leads without hiring a dev." },
            { title: "Agencies", desc: "Streamline your design-to-deploy workflow with reusable sections." },
          ].map((item, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className=" py-20 px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">What Users Are Saying</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {[
            {
              name: "Aarav S.",
              quote: "This builder helped me deliver 5 client sites in under a week. Game changer!",
            },
            {
              name: "Emily R.",
              quote: "The UI is super intuitive. I made my business site in 2 hours without touching code.",
            },
          ].map((t, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <p className="italic text-muted-foreground">“{t.quote}”</p>
                <p className="text-sm mt-2 text-right">— {t.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-20 px-6 bg-muted/50">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Partnered with the Best</h2>
        <p className="text-lg text-muted-foreground text-center max-w-xl mx-auto mb-12">
          Built alongside trusted platforms used by top creators and teams.
        </p>
        <div className="flex flex-wrap gap-5 items-center justify-center max-w-6xl mx-auto">
          {[
            { name: "Vume Ai", logo: "/images/partners/vume.png", url: 'https://vume.ai?ref=SiteCraft' },
            { name: "Shadfinity", logo: "/images/partners/shadfinity.png", url: 'https://shadfinity.sanjaybora.in?ref=SiteCraft' },
          ].map((partner, i) => (
            <a href={partner.url} target="_blank" key={i} className="flex items-center justify-center grayscale hover:grayscale-0 transition">
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-12 max-w-[150px] object-contain shadow-lg border"
                title={partner.name}
              />
            </a>
          ))}
        </div>
      </section>


      {/* CTA */}
      <section className="text-center py-24 px-6">
        <h2 className="text-4xl font-bold mb-4">Launch Your Website Today</h2>
        <p className="text-lg mb-6">Join 1,000+ creators building online with zero code.</p>
        <Button size="lg" asChild>
          <Link href={Routes.addWebsite}>Get Started for Free</Link>
        </Button>
      </section>

      {/* COMMUNITY INVITE */}
      <section className="py-20 px-6 bg-muted/50">
        <h2 className="text-3xl font-semibold text-center mb-8">Join Our Community</h2>
        <p className="text-lg text-center max-w-2xl mx-auto mb-10 text-muted-foreground">
          Get tips, share ideas, and stay updated with other creators using SiteCraft.
        </p>
        <div className="flex justify-center flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <a
            href="https://reddit.com/r/SiteCraft" // replace with your actual subreddit link
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-red-500 rounded-xl text-red-600 font-semibold hover:bg-red-100 transition"
          >
            <img src="/images/reddit.png" className="w-5 h-5" />
            Join Reddit
          </a>
          <a
            href="https://chat.whatsapp.com/Kge9YOIGdmz1k0BjAofvpP" // replace with your WhatsApp group invite
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-green-600 rounded-xl text-green-700 font-semibold hover:bg-green-100 transition"
          >
            <img src="/images/whatsapp.png" className="w-5 h-5" />
            Join WhatsApp
          </a>
        </div>
      </section>


      {/* FOOTER */}
      <footer className=" text-center text-sm py-6 border-t mt-12">
        © {new Date().getFullYear()} SiteCraft. All rights reserved.
      </footer>
    </main>
  )
}
