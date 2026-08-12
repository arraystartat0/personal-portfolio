# assets/

Two font binaries, here because the OG card renderer cannot reach the ones the
sites use.

`next/font/google` hands its downloads to the browser. satori, which draws the
`opengraph-image.tsx` routes, runs at build time and needs the file itself, so
these are read off disk by `app/lib/og.tsx`. They are vendored rather than
fetched from Google during the build on purpose: a network blip would not fail
the build, it would ship cards silently set in a fallback face.

| File | Face | Used by |
| --- | --- | --- |
| `Archivo-ExtraBold.ttf` | Archivo 800 | the `/design` card, the site's heading face |
| `Inter-Bold.ttf` | Inter 700 | the hub and both placeholder cards |

One weight each. The cards are read at thumbnail size in a feed, where hierarchy
comes from size and colour, and a second weight is a third of a megabyte to
soften type that should not be soft.

Both are static instances (no `fvar` table), because satori renders variable
fonts poorly. Both are SIL Open Font License 1.1: Archivo by Omnibus-Type, Inter
by Rasmus Andersson.
