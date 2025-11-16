import Routes from "@/lib/routes";
import { getBlogs } from "@/lib/directus/blog";
import { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'Read our latest blogs and stay updated with the latest trends in the coworking industry.',
  openGraph: { url: Routes.blog },
  alternates: { canonical: Routes.blog }
};

export default async function Page({ searchParams }: { searchParams: Promise<any> }) {
  const rawPage = (await searchParams).page;
  const page = rawPage && !isNaN(Number(rawPage)) ? parseInt(rawPage, 10) : 0;

  const limit = 12
  const { blogs, total } = await getBlogs(limit, limit * page);

  return (
    <div className="bg-white text-black">
    <div className="text-center mx-auto xl:w-[1280px] p-3 pt-14">
      <h1 className="text-3xl sm:text-4xl font-medium mb-5">Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {blogs.map((blog, index) => (
          <Link
            href={Routes.blogPost(blog.slug)}
            key={index}
            className="bg-white text-start tracking-wider shadow-lg p-5"
          >
            <img src={blog.seo.og_image} className="aspect-video w-full object-cover" />
            <p className="text-amber-900 text-start my-5 text-sm">BLOG</p>
            <h2 className="text-xl font-semibold line-clamp-2 my-3">{blog.seo.title}</h2>
            <p className="text-sm font-serif my-3">{format(new Date(blog.date_created), "LLL dd, yyyy")}</p>
            <p className="text-sm line-clamp-3 text-ellipsis my-3">{blog.seo.meta_description}</p>
          </Link>
        ))}
      </div>

      <div className="flex gap-3 items-center justify-center my-5 w-full">
        <div>Page-{page + 1} of {Math.ceil(total / limit)}</div>
        <div className="flex gap-2">
          <Button size='icon' variant='outline' disabled={page <= 0} asChild>
            <Link href={Routes.blog}><ChevronsLeft /></Link>
          </Button>
          <Button size='icon' variant='outline' disabled={page <= 0} asChild>
            <Link href={Routes.blog + '?page=' + (page - 1)}>
              <ChevronLeft />
            </Link>
          </Button>
          <Button size='icon' variant='outline' disabled={page >= total / limit - 1} asChild>
            <Link href={Routes.blog + '?page=' + (page + 1)}>
              <ChevronRight />
            </Link>
          </Button>
          <Button size='icon' variant='outline' disabled={page >= total / limit - 1} asChild>
            <Link href={Routes.blog + '?page=' + (Math.ceil(total / limit - 1))}>
              <ChevronsRight />
            </Link>
          </Button>
        </div>
      </div>
    </div>
    </div>
  );
}