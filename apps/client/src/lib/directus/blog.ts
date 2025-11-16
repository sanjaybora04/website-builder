export type Blog = {
    id: string,
    seo:{
        title?:string,
        meta_description?:string,
        og_image?:string
    },
    content?: string,
    date_created: string,
    date_updated:string,
    slug:string,
}

export async function getBlogs(limit = 12, offset = 0): Promise<{ blogs: Blog[]; total: number }> {
  const res = await fetch(
    `https://cms.sanjaybora.in/items/blog?filter[status][_eq]=published&sort=-date_created&limit=${limit}&offset=${offset}&meta=total_count&access_token=${process.env.DIRECTUS_ACCESS_TOKEN}`,
    {
      next: { tags: ["blog"] },
    }
  );

  const data = await res.json();
  
  const blogs = data.data.map((blog: Blog) =>
    blog.seo?.og_image
      ? {
          ...blog,
          seo: {
            ...blog.seo,
            og_image: `${process.env.NEXT_PUBLIC_DIRECTUS_ASSETS_URL}/${blog.seo.og_image}`,
          },
        }
      : blog
  );

  return {
    blogs,
    total: data.meta.total_count, // Directus provides total count in meta
  };
}


export async function getBlog(slug: string): Promise<Blog> {
  const data = await (await fetch(`https://cms.sanjaybora.in/items/blog?filter[slug][_eq]=${slug}&access_token=${process.env.DIRECTUS_ACCESS_TOKEN}`,{
    next: { tags: [`blog/${slug}`]}
  })).json()
  return  data.data.map((blog: Blog) => blog.seo?.og_image ? { ...blog, seo: { ...blog.seo, og_image: `${process.env.NEXT_PUBLIC_DIRECTUS_ASSETS_URL}/${blog.seo.og_image}` } } : blog)[0];
}