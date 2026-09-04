'use client'

import Script from 'next/script'
import { analyticsConfig } from '@/lib/analytics.config'

// Google Tag Manager ID
const GTM_ID = analyticsConfig.gtmId

/**
 * Serialises the container id for embedding in the inline script body.
 *
 * `JSON.stringify` supplies the quotes and escapes quotes and newlines, but
 * NOT `<` — a value containing `</script>` would close the element early and
 * let the rest parse as markup. U+2028/U+2029 are escaped too: legal in JSON,
 * illegal in a JS string literal before ES2019.
 *
 * Defence in depth, not a live hole: the id is a build-time constant set by a
 * maintainer, never by a visitor. It matters because `isConfigured()` only
 * rejects placeholders — nothing validates the SHAPE of what lands here.
 *
 * Deliberately local rather than imported from the cookie-consent component,
 * which exports the same helper — but NOT for a boundary reason in this file.
 * This component is `'use client'`, so importing from another client module
 * here would be fine, and an earlier revision of this comment claimed
 * otherwise.
 *
 * It is local because the fleet is not uniform. Measured across the 34 FFC-EX
 * forks that carry this component: one renders it on the server (no
 * `'use client'`), where importing from the `'use client'` cookie-consent
 * module IS a boundary call and fails the build — which is how this was
 * found; two have no cookie-consent component at all, so there is nothing to
 * import from; and one does not export the helper. So the import could never
 * have been uniform, while these six self-contained lines are identical in
 * every fork and carry no boundary semantics.
 */
function scriptString(value: string): string {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

export default function GoogleTagManager() {
  return (
    <>
      {/* Google Tag Manager Script - loaded with lazyOnload for better performance */}
      <Script
        id="gtm-script"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer',${scriptString(GTM_ID)});
          `,
        }}
      />
    </>
  )
}

// Export a component for the noscript iframe that goes in the body
export function GoogleTagManagerNoScript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  )
}
