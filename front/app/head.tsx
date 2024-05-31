export default function Head() {
  return (
    <>
      <title>試合決めるくん</title>
      <meta name="description" content="バドミントンの試合を組むアプリ" />
      <link rel="icon" href="/favicon.ico" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content="試合決めるくん" />
      <meta property="og:description" content="バドミントンの試合を組むアプリ" />
      <meta property="og:image" content="https://badminton-app-six.vercel.app/og-image.jpg" />
      <meta property="og:url" content="https://badminton-app-six.vercel.app" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="試合決めるくん" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="試合決めるくん" />
      <meta name="twitter:description" content="バドミントンの試合を組むアプリ" />
      <meta name="twitter:image" content="https://badminton-app-six.vercel.app/og-image.jpg" />
    </>
  )
}
