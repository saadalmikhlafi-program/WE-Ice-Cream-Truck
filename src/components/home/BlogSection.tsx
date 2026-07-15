"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";

const BLOG_POSTS = [
  {
    id: 1,
    title: "Bringing Joy to Emily's 7th Birthday",
    excerpt: "See how our premium ice cream truck made this sunny backyard birthday party an unforgettable experience for kids and parents alike.",
    image: "/images/blog_birthday_1784095098976.png",
    category: "Birthday Parties",
    date: "Aug 12, 2026",
    author: "Sarah M."
  },
  {
    id: 2,
    title: "A Sweet Touch at the Tech Summit",
    excerpt: "Corporate events don't have to be boring. We served over 500 gourmet cones to executives, bringing a refreshing break to the Boston Tech Summit.",
    image: "/images/blog_corporate_1784095218449.png",
    category: "Corporate Events",
    date: "Sep 05, 2026",
    author: "David L."
  },
  {
    id: 3,
    title: "Love and Ice Cream: A Perfect Match",
    excerpt: "Why settle for a traditional cake when you can have a vintage-modern ice cream truck at your wedding reception? A beautiful evening in Massachusetts.",
    image: "/images/blog_wedding_1784095331467.png",
    category: "Weddings",
    date: "Sep 18, 2026",
    author: "Jessica T."
  }
];

export default function BlogSection() {
  return (
    <section className="relative py-24 bg-transparent overflow-hidden" id="blog">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-coral/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-mint/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-coral font-bold tracking-wider uppercase text-sm mb-3">Our Stories</h2>
            <h3 className="font-display font-black text-4xl md:text-5xl text-navy mb-6">
              Real Events. <span className="text-coral italic font-light">Real Smiles.</span>
            </h3>
            <p className="text-lg text-gray-500">
              Don't just take our word for it. Explore our recent events and see the joy we bring to celebrations across Massachusetts.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="group bg-white/60 backdrop-blur-md rounded-3xl border border-gray-100 shadow-xl shadow-navy/5 overflow-hidden hover:shadow-2xl hover:shadow-coral/10 hover:border-coral/20 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-navy shadow-sm">
                  {post.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 mb-3">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {post.author}</span>
                </div>
                <h4 className="text-xl font-bold text-navy mb-3 line-clamp-2 group-hover:text-coral transition-colors">
                  {post.title}
                </h4>
                <p className="text-gray-500 text-sm mb-6 flex-grow line-clamp-3">
                  {post.excerpt}
                </p>
                <Link href="/gallery" className="inline-flex items-center gap-2 text-sm font-bold text-navy group-hover:text-coral transition-colors mt-auto">
                  Read Full Story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
