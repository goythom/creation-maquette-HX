# InstaFrame mobile — design decisions

Scope: the `#instaframe-mobile` tab only. 390px default, 320px supported. Frame height 844 / 720.
All values come from `tokens.css`. Every rule is scoped under `body.instaframe-design-mobile`.
No new routes, no new features, no new marketing copy — existing strings only.

## Shared chrome (all pages)
- **Weak on real 390:** desktop nav wraps to 2–3 rows; EN/FR overlaps CTAs and arrows; help bubble covers primary buttons.
- **Changed:** compact sticky header (56px) with pixel logo + 44px **Menu** button; desktop nav hidden behind Menu. The Menu is injected by `enhance-mobile.mjs` as `details.mobile-nav` (or reuses the existing `details.creator-header__menu` on the generator) and only re-lists the existing nav links — no new destinations. On pages without a visible header (Inspired, Shop, FAQ, Pricing, Phone…), `enhance-mobile.mjs` injects a `.mobile-topbar` (InstaFrame word + Menu) at the top of `.local-scene`; the Menu is never appended inside the hidden `.side`. The header « Open the app » link is hidden and re-listed inside the Menu. Language toggle is a fixed bottom-left control with `--if-app-bottom-pad` reserved on `.local-scene` so it never overlaps a CTA; the generator sticky action bar reserves space for it. One `.hv-btn-fill` primary per view; ghost buttons outlined. 2px focus ring on `:focus-visible`. PageArrow unified to 16px inside a 44px hit area.
- **Strings:** existing nav labels (Get Inspired, Generator, Album Studio, Shop, FAQ…), existing EN/FR toggle, existing word « Menu ».

## Home `/`
- **Weak:** H1 52px eats the fold; Start free barely visible; « Open the app » competes with Start free; Try it cards are a horizontal desktop track.
- **Changed:** H1 at `--if-fs-28` (26 at 320) so **Start free** + **30-SECOND TOUR** fit the first screen. Start free = fill button → generator; tour = ghost. The header « Open the app » is hidden from the header and re-listed inside the Menu, so the hero « Start free » is the only fill on the page. Sticky bottom bar `.home-sticky-cta` (injected by `enhance-mobile.mjs`, shown via IntersectionObserver once `.hv-hero-actions` leaves the viewport) clones the existing Start free link. Try it cards in one column, each « Try it – … » a primary-style CTA to the matching generator type. Footer links 44px tall.
- **Strings:** « Start free », « 30-SECOND TOUR », « Try it – … », footer labels.

## Get Inspired `/get-inspired`
- **Weak:** desktop sidebar eats the fold; EN/FR overlaps « Open this notebook » and arrows.
- **Changed:** `.side` hidden; its links are re-listed in the injected Menu; shelf + story content first; PageArrow 16px inside 44px hit areas; primary « Open this notebook » unobstructed; lang toggle moved out of the content column.
- **Strings:** « Open this notebook », existing shelf labels.

## FAQ `/faq`, Aide `/aide`
- **Weak:** desktop spacing, small tap targets.
- **Changed:** compact header + Menu; readable type (`--if-fs-16` body); 44px accordion rows; no overflow.
- **Strings:** existing FAQ questions/answers, help copy.

## Generator `/generator` + all types, `/generator/pro` + types/subs, `/video/local-demo`
- **Weak:** 3-column workspace crushed; welcome modal overflows; Download / + Add to Gallery clipped; 25–34 controls under 44px; title 14px; tabs cramped.
- **Changed:** one column — preview on top, settings below, **sticky action bar** (`.creation-settings__actions`) at the bottom with the existing Download / + Add to Gallery (disabled state uses `--if-btn-disabled-*`); the bar reserves left space so the fixed lang toggle never covers it. Header title at `--if-fs-18`. Tabs 44px, wrap 3+3+2 (2-up at 320) with 4px gaps, PRO badge kept. Welcome modal fits 390/320: Skip = ghost, Show me = fill, close 44px. Zoom/Reset/fullscreen ≥44px. No new generator features.
- **Strings:** existing tab labels (Photo, Message, Audio, Music, Stamp, Sticker, Video, Combination), Download, + Add to Gallery, Skip, Show me.

## Album Studio `/album`
- **Weak:** only a sign-in dialog; both « Sign in with Google » and « Cancel » are orange primaries; no view/share path; no mention that composing is for a big screen.
- **Changed:** mobile album screen (not the editor). Title « Album Studio »; explains with existing strings; **Back to the generator** as the single fill CTA → `/generator`. Sign in with Google stays available as a way to view saved notebooks, as a ghost button. Cancel/close is ghost, never a second fill.
- **Strings:** « Creating a notebook takes room. Open InstaFrame on your computer or tablet to bring your memories to life. », « Shared notebooks stay accessible on your phone by link », « Send your photos to InstaFrame, then keep creating on your computer. », « Back to the generator », « Sign in with Google to use Album Studio. Your notebook saves automatically to your account. », « Sign in with Google », « Cancel ». FR uses the official PhoneNotice / `/phone` wording: « Composer un carnet demande de la place. Retrouvez InstaFrame sur votre ordinateur ou votre tablette pour donner vie à vos souvenirs. », « Les carnets partagés restent accessibles par lien, et le QR code permet d'envoyer vos photos et vidéos vers InstaFrame. », « Envoyez vos photos dans InstaFrame, puis continuez sur votre ordinateur. », « Vous pouvez continuer sur votre ordinateur. », « Retour au générateur ».

## Album local demo `/album/local-demo`
- **Weak:** mounted the full text/shape/drag editor as the main mobile view.
- **Changed:** read-only cover + open-notebook preview (CSS-only, reusing the local studio cover palette) and the continue-on-tablet/desktop wording. No editor mounted. The « Share » button was removed: there is no real share URL in this local demo, so it would have been a no-op. The single fill CTA remains « Back to the generator ».
- **Strings:** same as `/album` plus « You can keep creating on your computer. ».

## Saved elements `/saved/elements`, Saved notebooks `/saved/notebooks`
- **Weak:** desktop layout, small targets.
- **Changed:** compact app header + Menu; view-oriented list; 44px rows; generator reachable via Menu.
- **Strings:** existing saved-page labels.

## Compte `/compte`, Paramètres `/compte/parametres`
- **Weak:** desktop layout, small targets.
- **Changed:** compact app header + Menu; readable type; 44px controls; generator reachable via Menu.
- **Strings:** existing account/settings labels.

## Login `/login`
- **Weak:** Google button not clearly the single primary.
- **Changed:** Google button is the single `.hv-btn-fill` primary; the header « Open app » (`a.hx-primary`) is demoted to a ghost/outline so it is not a second fill; other actions ghost; 44px.
- **Strings:** existing login copy.

## Shop `/shop`, `/shop/notebook`, `/shop/track`, `/shop/checkout`
- **Weak:** desktop sidebar eats the fold; EN/FR overlaps « See the preview ».
- **Changed:** `.side` hidden; its links are re-listed in the injected Menu; content first; 44px CTAs; one primary; no overflow; typography from tokens. « In preparation » content kept.
- **Strings:** « See the preview », existing shop labels, « In preparation ».

## Pricing `/pricing`
- **Weak:** desktop layout, small targets.
- **Changed:** compact header + Menu; readable type; 44px CTAs; one primary.
- **Strings:** existing pricing labels.

## Privacy `/privacy`, Mentions légales `/mentions-legales`
- **Weak:** desktop spacing, small tap targets.
- **Changed:** compact public header + Menu; readable type; 44px links; no overflow.
- **Strings:** existing legal copy.

## Phone `/phone`
- **Weak:** already mobile-oriented but spacing/targets inconsistent.
- **Changed:** tightened spacing/tokens; 44px primary; no overlap; status pill readable.
- **Strings:** existing phone copy.

## Transfer `/t/demo`
- **Weak:** already mobile-oriented but spacing/targets inconsistent.
- **Changed:** tightened spacing/tokens; 44px primary; no overlap.
- **Strings:** existing transfer copy.

## Share `/s/demo`
- **Weak:** raw red sentence « This album link is not valid. Back to home ».
- **Changed:** same message presented as a proper mobile empty/error state (`.reader-error`, readable type, full-width 44px « Back to home » button using the primary fill style). No new error story.
- **Strings:** « This album link is not valid. », « Back to home ».

## 404 `/404`
- **Weak:** desktop spacing, small targets.
- **Changed:** compact public header + Menu; readable type; 44px link back.
- **Strings:** existing 404 copy.

## Implementation notes
- `design-mobile.css` targets the real classes emitted by the copy renderers (`home-v2`, `hv-nav`, `hv-hero`, `hv-show-track`, `creator-header`, `creation-workspace`, `creation-settings__actions`, `side`, `library`, `shop-window`, `hx-public__nav`, `hx-public__content`, `login`, `gbtn--login`, `pricingpage`, `pcard`, `saved-page`, `account-hub`, `phone`, `reader-error`, `album-mobile`…). No invented selectors as main rules.
- `enhance-mobile.mjs` is called at the end of `renderLocalScene` (after `frenchTree`) and only injects `details.mobile-nav` (existing links) and the home `.home-sticky-cta` (clone of the existing Start free link). No new destinations, no new copy.
- `instaframe-pages.js`: `mobileTab` toggles `.on` for the mobile edition; `history.replaceState` uses `#instaframe-mobile`; tool buttons with `data-only` are hidden when they don't match the edition; `#instaframe-mobile` is not in the auto-open hash list (chooseEdition opens it, like copy).
