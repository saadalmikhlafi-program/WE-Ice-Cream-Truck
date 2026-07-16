import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & News | WE Ice Cream Truck",
  description: "Read the latest news, tips, and updates from WE Ice Cream Truck.",
};

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED", deletedAt: null },
    orderBy: { publishedAt: "desc" },
    include: { category: true, author: true }
  });

  return (
    <div className="bg-gray-50 min-h-screen py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-navy mb-4">Our Blog</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Tips, updates, and stories from the WE Ice Cream Truck team.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 text-gray-500 font-medium">
            No posts available yet. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                  {post.featuredImage ? (
                    <img 
                      src={post.featuredImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-coral/10">
                      <span className="text-coral font-black text-xl opacity-50">WE</span>
                    </div>
                  )}
                  {post.category && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-navy shadow-sm">
                        {post.category.name}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}
                  </div>
                  <h2 className="text-xl font-black text-navy mb-3 group-hover:text-coral transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-gray-500 line-clamp-3 text-sm leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center text-coral font-bold text-sm">
                    Read Article <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
