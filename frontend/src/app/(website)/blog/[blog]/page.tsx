import { getBlog, getBlogs } from "@/lib/directus/blog"
import {format} from 'date-fns'
import Link from "next/link"
import Routes from "@/lib/routes"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import './blog.css'

export async function generateMetadata({ params }: { params: { blog: string } }): Promise<Metadata> {
    const { blog } = params
    const blogPost = await getBlog(blog)
    if(!blogPost) return notFound()
    return {
        title: blogPost.seo.title,
        description: blogPost.seo.meta_description,
        openGraph: {
            url: `${Routes.blogPost(blog)}`,
            images: {
                url: blogPost.seo?.og_image||"",
                alt: blogPost.seo?.title||""
            }
        },
        twitter: {
            images: {
                url: blogPost.seo?.og_image||"",
                alt: blogPost.seo?.title||""
            }
        },
        alternates: {
            canonical: `${Routes.blogPost(blog)}`
        }
    }
}

export default async function Page({ params }: { params: { blog: string } }) {
    const { blog } = params
    const blogPost = await getBlog(blog)
    const blogs = (await getBlogs()).blogs
    if (!blogPost) return notFound()
    return (
        <div className=" pt-5 bg-stone-100 text-black">
            <div className="lg:flex justify-center gap-5 p-5">
                <div id='content' className="p-4 md:w-[768px] word tracking-wide leading-7 bg-white mx-auto sm:mx-0">
                    <img src={blogPost.seo.og_image} alt={blogPost.seo.title} className="w-full aspect-video object-cover mx-auto sm:mx-0" />
                    <div className="flex justify-between items-center my-3 font-serif">
                        <div>
                            <div className="whitespace-nowrap inline">
                                {format(blogPost.date_created, 'LLL dd, yyyy ')}|
                            </div>
                            <div className=" whitespace-nowrap inline">
                                {`${blogPost.content&&Math.ceil(blogPost.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').split(' ').length / 200)} min read`}
                            </div>
                        </div>
                        {/* <PageReader /> */}
                    </div>
                    <div dangerouslySetInnerHTML={{__html:blogPost.content||""}} className="blog-content w-full"/>
                </div>
                <div>
                    <div className="lg:sticky lg:top-24 flex flex-col items-center gap-3">
                        {/* <Link href={Routes.explore('')}>
                            <img src="/images/cta.png" alt="book a session" className="w-80 bg-white" />
                        </Link> */}
                        <h2 className="text-2xl font-semibold">Related Posts</h2>

                        {blogs.filter(b=>b.slug!=blogPost.slug).slice(0,5).map((blog, index) => (
                            <Link href={Routes.blogPost(blog.slug)} key={index} className="w-80 text-center bg-white">
                                <img src={blog.seo.og_image} alt={`Related blog ${index}`} className="w-full aspect-video object-cover" />
                                <div className="p-3">
                                    <h3 className="font-semibold line-clamp-2 text-ellipsis">{blog.seo.title}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}