# Urwah Siddiqui — interactive portfolio

## Run locally

Use Node.js 22 or newer and pnpm. In this folder:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the address printed by Next.js. This project was updated from the supplied
ZIP; it has not been deployed or pushed to a remote.

## Validation

```sh
pnpm typecheck
pnpm test
pnpm build
```

## Phase 2 changes

1. **Ambient canvas:** deterministic floating nodes, orthogonal connections,
   layered orbital geometry, scroll energy pulses, and a bounded fading cursor
   trail. Uses the existing Canvas 2D path, not a new WebGL shader. Original
   React Three Fiber components remain available but are not mounted by the page.
2. **Scroll choreography:** existing GSAP/ScrollTrigger drives visible section
   entrances, border illumination, and event-based progress. No polling timer
   is needed for the rail. Reduced-motion changes are handled live.
3. **Sound:** explicit header opt-in, quiet synthesized interaction tones,
   mute, unsupported-browser handling, cleanup, and auto-mute on tab hiding.
   No sound files, microphone, autoplay, or persisted consent.
4. **Demonstrations:** offline queue, stable packet IDs, reconciliation and
   duplicate retries in a pure reducer; role-based allowed/denied actions with
   native keyboard-operable radio controls and polite status messages.
5. **Polish:** hidden mobile menu is inert; focus styles, touch sizes, wrapping,
   scroll offsets, responsive particle counts, capped pixel density. The final
   banner gains its completion state at 98% scroll but contact is never gated.
6. **Build:** TypeScript errors are no longer ignored. Geist and Fraunces are
   bundled through Fontsource rather than fetched from Google during a build.

## Important boundaries

- Both demos are local teaching simulations, not connections to the actual
  project backend. Browser memory clears on reload. No real payments occur.
- The RBAC matrix is illustrative, not a claim about the exact source project.
- A real approved résumé was not supplied: résumé links request it by email.
- Full case studies remain pending; project actions now go to the demo section.
- Existing Vercel Analytics integration remains unchanged; review consent/privacy
  needs before public deployment.
- Browser/device visual inspection, screen-reader verification and actual audio
  playback checks remain manual acceptance tasks. Do not infer those passed
  from TypeScript or build success.

## Quick acceptance walkthrough

- Desktop: scroll from top to bottom; verify the rail reaches 100%, final
  banner highlights, content remains readable, and cards respond to focus/hover.
- Mouse: move across the hero and stop; trail fades. On touch, no trail runs.
- Payment: sever → queue twice → reconnect → retry. Expect 0 queued,
  2 settled, 2 duplicates ignored. Reset restores the initial online state.
- Store: select Cashier using arrow keys; test Manage users (denied) and
  Take payment (allowed). Select Auditor and test report permissions.
- Sound: initially silent; enable, click a control, mute. Switching away
  from the tab should mute without automatically resuming on return.
- Change OS reduced-motion while the page is open: canvas becomes static,
  entrance/hover motion and pulses stop, content and controls remain available.
- Check 320px, 390px, 768px, desktop, and 200% zoom. Navigate by keyboard
  through the closed/open menu; closed menu links must not receive focus.
