/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        // The media set is byte-for-byte stable between deploys, and the hero
        // film alone is ~2.4 MB. Without this it is served `max-age=0`, so
        // every repeat visit spends a round trip revalidating it before a
        // single frame can play.
        //
        // Not `immutable`: these filenames carry no content hash, so a long
        // browser cache would pin a stale asset if one is ever replaced. The
        // year-long `s-maxage` is safe because Vercel purges the edge cache on
        // deploy — the browser holds it for an hour, the CDN holds it until
        // the next deploy says otherwise.
        source: "/media/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=31536000, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
