# Hisaab Khata — Ironing Ledger 🧺

A simple, offline-first ledger app for an ironing/laundry service
(istriwala), built to solve three real problems:

1. **Remembering who hasn't paid yet** — every entry tracks payment
   status and an optional ₹ amount, instead of relying on memory for
   who said "baad mein de dunga."
2. **Not mixing up clothes between customers** — every entry has an
   item-count breakdown and an optional free-text note (e.g. "neeli
   patti wali safed shirt") specifically for telling similar items apart.
3. **Keeping a paper-trail of completed work** — once a job is both
   delivered *and* paid, it's automatically archived into a downloadable
   Excel file and cleared from the active list, so the working screen
   only ever shows what's still in progress.

Built as a single self-contained website — no server, no account, no
internet required after the first load.

## ⚠️ Before you open it — read this

**You must extract the `.zip` file before opening `index.html`.**
Double-clicking the `.zip` itself (without extracting) opens a virtual
folder view on Windows that *looks* like it works but silently breaks
every button — the page shows up styled correctly, but taps/clicks do
nothing, because the JavaScript file never actually loads from inside
an unextracted zip.

**Fix:** right-click the `.zip` → **Extract All** → open `index.html`
from the new extracted folder (not from inside the zip viewer).

If you ever do open it incorrectly, the app now detects this itself and
shows a clear on-screen message telling you exactly what to do, instead
of failing silently.

## Features

| Feature | How it works |
|---|---|
| **Hindi/English toggle** | One tap switches every label. Customer data you've typed stays exactly as typed — only the UI language changes. |
| **Item breakdown** | Quick +/− counters for shirt/pant/saree/kurta/other, so "5 कपड़े" is never ambiguous. |
| **Identifying notes** | A free-text field for "blue-striped white shirt" — the actual fix for mixing up similar clothes. |
| **Payment tracking** | Each entry is Paid or Pending, with an optional ₹ amount for pending ones. |
| **PIN-protected privacy** | Phone numbers and amounts blur until a 4-digit PIN is entered. Names and item counts stay visible for fast scanning. |
| **Auto-archive to Excel** | The moment a job is both delivered and paid, it's logged to a downloadable `.xlsx` file and removed from the active list. |
| **Manual export** | A "Download record" button pulls the full accumulated record any time, without waiting for the next completion. |
| **Works offline** | A service worker caches the app shell — after the first load, no internet is needed for daily use. |
| **Installable** | Can be added to a phone's home screen and opens full-screen like a native app. |

## Animations

Motion in this app is small and purposeful — it's meant to make actions
feel tactile and confirmed, the way a physical ledger or a rubber stamp
gives you feedback, not to be flashy. Every animation maps to a real
moment, nothing moves just for decoration.

| Animation | Where it happens | What it feels like |
|---|---|---|
| **Stamp landing** | Tapping "Mark ready/delivered" or "Mark paid" | The button briefly squashes and springs back (`stamp-land`, 0.32s) — like an ink stamp hitting paper. A small, satisfying "this registered" moment for the action that matters most in the whole app. |
| **Card settle** | Right after a ticket moves between Pending ↔ Done | The card lifts slightly, fades in, and settles back into place (`card-settle`, 0.4s) instead of just snapping into the new list — so a status change reads as something that *happened*, not a glitchy re-render. |
| **PIN error shake** | Entering a wrong PIN | The PIN dots shake side to side (`pin-shake`, 0.4s) — an immediate, unambiguous "no, try again" without needing to read an error message. |
| **Bottom sheet slide-up** | Opening Add Entry, ticket details, or PIN screens | Sheets slide up from the bottom edge rather than appearing instantly, so the interface feels anchored to where you tapped. |
| **Toast fade-in** | Every save/delete/lock/export confirmation | A small message rises gently from the bottom and fades — confirms the action without blocking anything underneath. |
| **Button press feedback** | Every button, the floating **+**, and the keypad | A quick scale-down on press (`:active` states) so tapping always feels registered immediately, even before the action completes. |

All animations respect `prefers-reduced-motion` — if that's turned on
at the OS level, every animation above is instantly disabled and the
app becomes purely instant-state-change, no motion at all.

## Security

This is a static, no-backend app, so "security" here means something
specific — read this section so expectations are accurate.

### What's actually protected

- **Casual glance protection**: phone numbers and money amounts are
  blurred by default and require a 4-digit PIN to reveal. This stops
  someone who picks up an unlocked phone from casually scrolling through
  customer phone numbers or how much each person owes.
- **PIN storage**: the PIN itself is never stored anywhere, in any form.
  Only a **salted SHA-256 hash** of it lives in `localStorage` (via the
  browser's built-in Web Crypto API) — so even someone with access to
  the device's storage can't read the PIN back out.
- **Auto re-lock**: after 2 minutes of inactivity, sensitive fields
  re-blur automatically, so an unlocked phone left on a counter doesn't
  stay unlocked indefinitely.
- **Brute-force slowdown**: 5 wrong PIN attempts trigger a 30-second
  lockout before another guess is allowed.
- **XSS protection**: every piece of user-entered text (names, notes,
  phone numbers) is HTML-escaped before being displayed, so a customer
  name like `<script>` typed into the name field is rendered as harmless
  text, not executed as code.
- **Content Security Policy**: the app only allows scripts and styles
  from itself (and fonts from Google Fonts) — it cannot be tricked into
  loading or running code from an untrusted external source.

### What this does *not* protect against (read honestly)

- **Deep device access**: anyone with browser developer tools or root
  access to the phone can technically read `localStorage` directly,
  bypassing the PIN screen entirely. No client-side-only app — including
  this one — can prevent that; real protection requires your **phone's
  own lock screen / disk encryption**, which is a stronger and more
  important layer than this app's PIN. Use this PIN as a second, lighter
  layer on top of that — not a replacement for it.
- **Multi-device/cloud sync**: there is no account system and no server,
  so there's nothing to hack remotely — but it also means data lives on
  exactly one device. Use the "Download record" button periodically as
  a backup if this matters to you.
- **Network attacks**: not applicable — the app makes no network
  requests of its own once loaded. Everything happens entirely on-device.

## How to use it day to day

1. **First time only**: set a 4-digit PIN when prompted (or skip — the
   app works fully without one, just without the blur protection)
2. Tap **+** when clothes come in
3. Type the customer's name (and phone if useful)
4. Tap **+/−** next to each clothing type to count items
5. Add a quick note if something needs identifying
6. Mark payment as pending (with an optional ₹ amount) or already paid
7. Save — it appears under **Pending**

When delivering: open the entry → **Mark ready/delivered**.
When payment comes in: open the entry → **Mark paid**.
The moment **both** are true, the entry is archived to an Excel file
automatically and disappears from the active list — that file is your
permanent record of completed jobs.

Use the search bar any time to instantly find a customer by name or
phone number.

## Running it

1. **Extract the .zip first** (see the warning at the top — this is the
   #1 cause of "nothing happens when I tap")
2. Open the extracted folder
3. Double-click `index.html` — it opens directly in your browser and
   works immediately, including the PIN lock and Excel export

Everything (data storage, PIN security, Excel generation) runs entirely
in the browser. No installation, no setup, no internet needed.

## Deploying later (optional, for installing to a phone's home screen)

A phone needs to load this over `http://` or `https://` (not a raw
local file) for "Add to Home Screen" and full offline-caching to work.
Two free, beginner-friendly options when you get to this step:

**GitHub Pages:**
1. Push this folder to a public GitHub repo
2. Repo Settings → Pages → set source to the `main` branch
3. Visit the generated `https://yourusername.github.io/reponame/` URL on
   the phone, then use the browser menu → "Add to Home Screen"

**Netlify Drop** (no account needed, fastest):
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the whole **extracted** folder onto the page
3. It gives you a live URL instantly

## Files in this package

```
istri_app/
├── index.html      — the app itself (structure + styling + security headers)
├── app.js          — all the logic (data, PIN security, export, search, language)
├── manifest.json   — makes it installable as a home-screen app
├── sw.js           — service worker, makes it work offline
├── icon-192.png    — app icon (small)
├── icon-512.png    — app icon (large)
├── vendor/
│   └── xlsx.full.min.js  — Excel export library (vendored locally, no CDN dependency)
└── README.md       — this file
```

## Troubleshooting

| Problem | Cause | Fix |
|---|---|---|
| Page shows but buttons do nothing | Opened from inside an unextracted `.zip` | Extract the zip first, then open `index.html` from the real folder. The app also now shows an on-screen warning if this happens. |
| "PIN भूल गए?" doesn't bring back old data | It's not supposed to — resetting the PIN removes the lock only, never deletes your ticket data | Your entries are untouched; only the PIN protection is removed |
| Excel file looks empty | No entries have been marked **both** done and paid yet | Only fully-completed jobs get archived — partially done entries stay on the main screen on purpose |
| Phone numbers look blurry | PIN protection is active and currently locked | Tap the blurred field, enter your PIN |

## Known limitations

- Single device only — no cloud sync (see Security section above)
- The PIN protects against casual glances, not determined technical
  access — your phone's own lock screen is the real first line of
  defense
- Excel export downloads a fresh file each time rather than silently
  appending to a previous one — this is an intentional browser security
  restriction (no website can silently write to files already on your
  disk), not a bug
