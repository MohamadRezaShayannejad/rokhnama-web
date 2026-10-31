# Boundaries (Boundaries) · Rokhnama

Do not violate any of the five items below. If the requested work violates these, do not proceed and say which boundary was violated.

1. **No Executable Bash in Plan Mode:** Never use executable Bash commands (like mkdir, mv) to modify files while in Plan Mode.
2. **No Absolute Claims:** Absolute and unsourced claims (e.g., 100% guaranteed, flawless, absolute) must not be written in any text.
3. **Use Design Tokens:** For styling and coloring, use ONLY the Tailwind variables defined in `globals.css`. Avoid hardcoded Hex colors.
4. **Docs Immutability:** Do not modify any documentation file in the `docs` folder without first reporting the discrepancy and obtaining direct user approval.
5. **Hide Internal Terms:** Internal system terms (like event tracking names, COPY IN, or database codes) must never be displayed to the buyer/user.
6. **Exclusive Icon Set:** All icons across the project must strictly and exclusively be imported from `@tabler/icons-react`. Using any other icon package (including lucide-react, heroicons, fontawesome, etc.) or ad-hoc SVG icons is strictly forbidden.
7. **No Screenshot Capturing or Inspection:** Do not run browser or headless commands to capture screenshots, and do not use tools to read or inspect screenshot images. Validate UI and design strictly through code, CSS tokens, and DOM structure.
8. **No Component Style Overrides:** Never override a shared component's built-in styles at the usage site (e.g., adding `font-black`, arbitrary className weight/size overrides on Button/IconButton). Consume components only through their own props and variants; if a different look is needed, change the component or its variant definitions, not the consumer.

*Important notes:*
- Do not invent numbers. Numberless, even if correct, is rejected.
- Do not place the solution before the problem. First say what is broken, then if asked say how it is solved.
- When you don't know something, say I don't know. This is acceptable output.