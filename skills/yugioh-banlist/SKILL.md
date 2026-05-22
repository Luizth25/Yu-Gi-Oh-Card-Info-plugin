---
name: yugioh-banlist
description: List and filter current Yu-Gi-Oh! banlist cards through the local yugioh MCP. Use when the user asks for cartas na banlist/lista de banidas, forbidden/limited/semi-limited cards, TCG/OCG/GOAT banlist status, filtering banlist cards by card type, or identifying whether "longest on the banlist" can be answered from available data.
---

# Yugioh Banlist

## Quick Start

Use `search_cards` on the local `yugioh` MCP server with `banlist`.

- Default to `banlist: "tcg"` when the user says only "banlist" or "lista de banidas".
- Use `banlist: "ocg"` or `banlist: "goat"` when the user asks for those formats.
- Return all current banlist entries by requesting a high enough `limit`, such as `limit: 500`.
- If `total_available` is greater than `returned`, say the MCP response was capped and offer to narrow by status or type.

## Status Filtering

YGOPRODeck returns current banlist status in `banlist_info`:

- TCG: `banlist_info.ban_tcg`
- OCG: `banlist_info.ban_ocg`
- GOAT: `banlist_info.ban_goat`

Post-filter returned cards by these values:

- `Banned` for banidas/forbidden.
- `Limited` for limitadas.
- `Semi-Limited` for semi-limitadas.

When the user asks for "todas as cartas na banlist", include all three statuses unless they specifically ask only for banned/forbidden cards.

## Type Filtering

Combine `banlist` with `type` when the requested type maps cleanly to YGOPRODeck:

- "magias" or "spell cards": `type: "Spell Card"`.
- "armadilhas" or "trap cards": `type: "Trap Card"`.
- Specific monster types: `type: "Effect Monster"`, `type: "Fusion Monster"`, `type: "Synchro Monster"`, `type: "XYZ Monster"`, `type: "Link Monster"`, `type: "Ritual Monster"`.

For broad "monstros", first call `search_cards` with only `banlist`, then post-filter cards where `type` contains `Monster`. This avoids missing Extra Deck, Ritual, Pendulum, Normal, and Effect variants.

Use `race` for Spell/Trap subtypes when helpful:

- Quick-Play Spell: `type: "Spell Card"`, `race: "Quick-Play"`.
- Continuous Trap: `type: "Trap Card"`, `race: "Continuous"`.

## Longest On Banlist

Do not claim which cards have been on the banlist the longest from the MCP alone. The current `search_cards` payload includes current status but does not include the date a card entered the banlist or historical status changes.

If the user asks "as que estao ha mais tempo na banlist":

- Explain that the local MCP can list current status, but cannot compute duration by itself.
- Use a historical banlist source only if current browsing or another provided data source is available.
- Prefer official Konami pages for current legality, but verify whether they expose historical effective dates.
- When using external history, cite the source and sort by the earliest effective date for the same status and format.

## Examples

- "cartas banidas no TCG": `search_cards` with `banlist: "tcg"`, then keep `banlist_info.ban_tcg == "Banned"`.
- "todas as magias na banlist": `search_cards` with `banlist: "tcg"`, `type: "Spell Card"`.
- "armadilhas limitadas no OCG": `search_cards` with `banlist: "ocg"`, `type: "Trap Card"`, then keep `banlist_info.ban_ocg == "Limited"`.
- "monstros na banlist GOAT": `search_cards` with `banlist: "goat"`, then keep cards whose `type` contains `Monster`.

## Output Style

Answer in Portuguese unless the user asks otherwise. Group by status first, then by type. Include card name, type, and the relevant `banlist_info` status. Keep effect text out unless the user asks for card details.
