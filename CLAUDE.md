# Rokhnama Project Guidelines

## Ignored Directories
- **`trash/`**: This directory is an archive/backup folder for deprecated and superseded etudes. Do NOT inspect, read, import, edit, or reference anything inside `trash/`. It must be completely ignored.

## General Design & Code Guidelines
- Follow tokens in `globals.css` and font `var(--font-abar)` with `tracking-[-0.02em]`.
- Sharp geometry: `rounded-none` / 0px radius.
- Exclusive icon package: `@tabler/icons-react`.
- Work directly on approved landing page components in `src/ui/`.
- **No Screenshot Inspection:** Do not run headless browser commands to capture screenshots and do not read/view screenshot images. Always evaluate and refine UI directly through code, DOM, and CSS tokens.
- **No Component Style Overrides:** Never override a shared component's built-in styles at the usage site (e.g., adding `font-black`, `className` weight/size overrides) — components must be consumed with their own props/variants only. If a different look is needed, change the component or its variants, not the consumer.
