import fsPromises from 'fs/promises';
import { createWriteStream } from 'fs';
import path from 'path';
import https from 'https';
import { prisma } from '../src/lib/prisma';

const WEBFLOW_DIR = "C:\\Users\\Sharoobi\\Desktop\\boston_legend.webflow.io\\public";
const IMAGES_DIR = path.join(process.cwd(), "public", "images", "blog");

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        resolve(null);
        return;
      }
      const filePath = path.join(IMAGES_DIR, filename);
      const stream = createWriteStream(filePath);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close();
        resolve(`/images/blog/${filename}`);
      });
      stream.on('error', reject);
    }).on('error', reject);
  });
}

async function run() {
  await fsPromises.mkdir(IMAGES_DIR, { recursive: true });

  const files = await fsPromises.readdir(WEBFLOW_DIR);
  const htmlFiles = files.filter(f => f.endsWith('.html'));

  const posts = [];

  for (const file of htmlFiles) {
    const filePath = path.join(WEBFLOW_DIR, file);
    const content = await fsPromises.readFile(filePath, 'utf-8');

    // Extract Title
    const titleMatch = content.match(/<h1[^>]*blog-title[^>]*>(.*?)<\/h1>/);
    if (!titleMatch) continue; // Not a blog post

    const title = titleMatch[1].trim();

    // Extract Image URL
    const imgMatch = content.match(/<img[^>]*class="[^"]*blog-img[^"]*"[^>]*src="([^"]+)"/);
    let imageUrl = null;
    if (imgMatch) {
      imageUrl = imgMatch[1];
    } else {
      // Fallback
      const imgMatch2 = content.match(/<img[^>]*src="([^"]+)"[^>]*class="[^"]*blog-img[^"]*"/);
      if (imgMatch2) imageUrl = imgMatch2[1];
    }

    // Extract Rich Text Content
    const contentMatch = content.match(/<div class="blog-rtb w-richtext">([\s\S]*?)<\/div><\/div><\/main>/);
    let postContent = "";
    let excerpt = "";
    if (contentMatch) {
      postContent = contentMatch[1].trim();
      // Simple excerpt: remove HTML tags and truncate
      excerpt = postContent.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').substring(0, 150).trim() + "...";
    }

    // Slug from filename
    const slug = file.replace('.html', '');

    // Category
    // default to Birthday Parties for now, but we'll try to find a match
    let category = "Birthday Parties";
    if (slug.includes("wedding")) category = "Weddings";
    else if (slug.includes("corporate")) category = "Corporate Events";
    else if (slug.includes("school") || slug.includes("fundraiser")) category = "School & Fundraisers";

    posts.push({
      title,
      slug,
      content: postContent,
      excerpt,
      imageUrl,
      category,
      date: new Date() // Use today for simplicity
    });
  }

  console.log(`Found ${posts.length} blog posts in Webflow export.`);

  if (posts.length === 0) return;

  // Clear existing posts
  console.log("Clearing existing posts...");
  await prisma.post.deleteMany({});

  // Fetch categories to map IDs
  const dbCategories = await prisma.category.findMany();
  const categoryMap = {};
  for (const c of dbCategories) {
    categoryMap[c.name] = c.id;
  }

  console.log("Importing posts and downloading images...");
  for (const post of posts) {
    let localImagePath = "/images/blog/starter-event.jpg"; // Fallback
    
    if (post.imageUrl) {
      const filename = path.basename(new URL(post.imageUrl).pathname);
      console.log(`Downloading ${filename}...`);
      const downloadedPath = await downloadImage(post.imageUrl, filename);
      if (downloadedPath) localImagePath = downloadedPath;
    }

    await prisma.post.create({
      data: {
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        featuredImage: localImagePath,
        seoTitle: `${post.title} | WE Ice Cream Truck Boston`,
        seoDesc: post.excerpt,
        status: "PUBLISHED",
        categoryId: categoryMap[post.category] || dbCategories[0].id,
        publishedAt: post.date,
        createdAt: post.date,
      }
    });
    console.log(`Created post: ${post.title}`);
  }

  console.log("Migration complete.");
}

run().catch(console.error).finally(() => prisma.$disconnect());
