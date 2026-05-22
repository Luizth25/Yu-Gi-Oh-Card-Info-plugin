---
name: yugioh-monster-filters
description: Search Yu-Gi-Oh! monster cards through the local yugioh MCP by ATK, DEF, Level/Rank, Attribute, Race/Type, monster type, Link value, Pendulum scale, format, or stat comparisons. Use when the user asks for monsters with specific attack points, defense points, level, rank, attribute, race, or phrases like ATK maior/menor/igual, DEF acima/abaixo, Dragon, Warrior, DARK, LIGHT.
---

# Yugioh Monster Filters

## Quick Start

Use `search_cards` on the `yugioh` MCP server. Combine filters when useful.

## Stat Filters

YGOPRODeck accepts exact values and comparison prefixes for `atk`, `def`, `level`, `link`, and `scale`:

- exact: `atk: "2500"`, `def: "2000"`, `level: "4"`
- less than: `atk: "lt2500"`
- less than or equal: `def: "lte2000"`
- greater than: `atk: "gt3000"`
- greater than or equal: `level: "gte8"`

Translate Portuguese comparisons:

- "ATK maior que 2500": `atk: "gt2500"`
- "ATK pelo menos 2500": `atk: "gte2500"`
- "DEF menor que 1000": `def: "lt1000"`
- "nivel 4 ou menor": `level: "lte4"`

## Common Filters

- Attribute values: `DARK`, `LIGHT`, `EARTH`, `WATER`, `FIRE`, `WIND`, `DIVINE`.
- Race examples: `Dragon`, `Warrior`, `Spellcaster`, `Machine`, `Cyberse`, `Zombie`, `Fiend`, `Fairy`.
- Monster type examples: `Normal Monster`, `Effect Monster`, `Fusion Monster`, `Synchro Monster`, `XYZ Monster`, `Link Monster`, `Ritual Monster`, `Pendulum Effect Monster`.

## Examples

- "dragons DARK com ATK acima de 2500": `search_cards` with `race: "Dragon"`, `attribute: "DARK"`, `atk: "gt2500"`.
- "monstros nivel 4 com 1800 de ataque": `search_cards` with `level: "4"`, `atk: "1800"`.
- "link monsters cyberse": `search_cards` with `type: "Link Monster"`, `race: "Cyberse"`.
- "pendulum escala 8": `search_cards` with `scale: "8"`.

Return a compact list first. If many cards match, say how many were available and show the strongest matches according to the user's requested sort.
