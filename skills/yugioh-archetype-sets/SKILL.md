---
name: yugioh-archetype-sets
description: Find Yu-Gi-Oh! cards through the local yugioh MCP by archetype, card set, banlist, game format, release-style sorting, or set listing. Use when the user asks for cartas de um arquétipo, cards from a set, Blue-Eyes/HERO/Dark Magician archetype lists, TCG/OCG/Goat/Master Duel availability, banlist filters, or available card sets.
---

# Yugioh Archetype Sets

## Quick Start

Use the local `yugioh` MCP server:

- `search_cards` for archetype, card set, banlist, format, and sorted lists.
- `list_card_sets` when the user asks what sets exist.
- `get_database_version` when the user asks how current the YGOPRODeck database is.

## Query Mapping

- "cartas Blue-Eyes": `search_cards` with `archetype: "Blue-Eyes"`.
- "Elemental HERO no TCG": `search_cards` with `archetype: "Elemental HERO"`, `format: "tcg"`.
- "cartas do set Metal Raiders": `search_cards` with `cardset: "Metal Raiders"`.
- "cartas limitadas no goat": `search_cards` with `banlist: "goat"`.
- "sets disponiveis": call `list_card_sets`.
- "cartas mais novas desse arquétipo": include `sort: "new"`.

## Format Values

Useful `format` values include `tcg`, `ocg`, `goat`, `master duel`, `speed duel`, `rush duel`, and `duel links`.

Useful `banlist` values are `tcg`, `ocg`, and `goat`.

## Output Style

When returning archetype results, group by monster/spell/trap when useful. For set results, include set name, code, rarity, and price metadata if present.
