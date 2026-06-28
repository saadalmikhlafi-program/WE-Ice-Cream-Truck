import { Metadata } from "next";
import { BUSINESS_CONFIG } from "./config";

type SEOProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  noIndex?: boolean;
};

export function constructMetadata({
  title,
  description,
  image = "/images/og-default.jpg",
  url = "",
  noIndex = false,
}: SEOProps = {}): Metadata {
  const fullTitle = title
    ? `${title} | ${BUSINESS_CONFIG.name}`
    : `${BUSINESS_CONFIG.name} | ${BUSINESS_CONFIG.tagline}`;
    
  const fullDescription = description || BUSINESS_CONFIG.description;
  const fullUrl = `${BUSINESS_CONFIG.domain}${url}`;

  return {
    title: fullTitle,
    description: fullDescription,
    authors: [{ name: BUSINESS_CONFIG.name }],
    keywords: [...BUSINESS_CONFIG.keywords],
    metadataBase: new URL(BUSINESS_CONFIG.domain),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: fullUrl,
      siteName: BUSINESS_CONFIG.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [image],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
  };
}
