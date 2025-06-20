export default function Head() {
    return (
        <>
        <title>SiteCraft - Build Your Website in 30 Minutes</title>
        <meta name="description" content="Create beautiful websites visually with SiteCraft's drag-and-drop builder. No code required." />
        <link rel="icon" href="/images/logo.png" />
        <meta property="og:title" content="SiteCraft - Build Your Website in 30 Minutes" />
        <meta property="og:description" content="Create beautiful websites visually with SiteCraft's drag-and-drop builder. No code required." />
        <meta property="og:image" content="/images/og-image.png" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />
        </>
    );
    }