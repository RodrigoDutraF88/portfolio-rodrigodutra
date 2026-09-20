# Style Guide

The look, the voice, and the rules that keep both consistent. The aesthetic is developer and
terminal inspired, kept restrained so it reads as intentional rather than themed.

## Principles

- Calm by default. Let the projects and the writing carry the page.
- Every animation earns its place. If it does not help the reader, it is cut.
- Monospace is an accent, not the whole page. It marks prompts, labels, and code.
- One accent color, used sparingly, on a near neutral canvas.

## Color tokens

Defined as CSS variables in `globals.css` and exposed to Tailwind through `@theme`. The roles:

| Role         | Use                                                    |
| ------------ | ------------------------------------------------------ |
| `background` | Page canvas                                            |
| `foreground` | Body text                                              |
| `muted`      | Secondary text and borders                             |
| `accent`     | One highlight color for links, focus, and prompt marks |
| `surface`    | Cards and raised areas                                 |

The accent is blue: `#58a6ff` on dark and `#0b5fd0` on light. It is the single chromatic color on
an otherwise cool neutral canvas. The one exception is the skill badges, which tint softly by
brand logo so the stack reads at a glance.

Light is the default theme. Dark is a first class alternate, not an afterthought. Both are
defined with the same tokens so nothing hardcodes a hex value in a component.

## Layout

- The home page opens with a profile photo at the top of the hero. It is a round frame that holds
  a real photo, reserved even before the image is in place.
- Cards use a neobrutalist treatment: a solid stroke and a hard offset shadow (`.brutal`), with a
  pressable variant for buttons (`.brutal-press`). Applied sparingly so the terminal calm holds.
- Projects are shown as a grid of cards, two per row on desktop and one per row on phones.
- Content sits in a single centered column with a generous gutter, never edge to edge.

## Type

- Sans for body and headings.
- Mono for prompts, labels, metadata, and code.
- A small, deliberate type scale. Prefer fewer sizes used consistently.

## Motion

- Allowed: scroll reveal on first view, hover and focus feedback, one cursor blink, the command
  palette open and close.
- Not allowed: parallax for its own sake, autoplaying loops, motion that blocks reading.
- Everything respects `prefers-reduced-motion`. When reduced motion is on, content appears with no
  transition.

## Voice and tone

- First person, plain, and warm. Write the way you would explain a project to a colleague.
- Portuguese is the primary voice. English and Italian follow the same tone.
- Avoid marketing words. No robust, seamless, cutting edge, leverage, or synergy.
- Short sentences. Concrete over clever.

## Banned patterns

These read as generic template or AI output and are not used here:

- Purple to blue hero gradients
- Glassmorphism cards
- Stock 3D blobs or floating shapes
- Emoji as section headers
- Walls of skill logos with no context

## Accessibility baseline

- Text contrast meets WCAG AA.
- Every interactive element is reachable and visible with the keyboard.
- Focus states are never removed, only styled.
- Touch targets are at least 44 by 44 pixels.
