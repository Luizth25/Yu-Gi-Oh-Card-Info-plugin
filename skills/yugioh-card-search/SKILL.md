---
name: yugioh-card-search
description: Find Yu-Gi-Oh! cards through the local yugioh MCP by fuzzy name, exact name, card id, card type, format, language, or sort order. Use when the user asks to procurar/buscar/encontrar/listar cartas by name, partial name, id/passcode, card category, Portuguese language data, or general card details.
---

# Yugioh Card Search

## Quick Start

Use the local `yugioh` MCP server. Prefer these tools:

- `get_card_by_name` for an exact known card name.
- `get_card_by_id` for an id/passcode.
- `search_cards` for partial names, categories, format, language, or sorted lists.
- `random_card` when the user asks for a random card.

## Query Mapping

- "procure Dark Magician" with an exact card name: call `get_card_by_name` with `name: "Dark Magician"`.
- "cartas com magician no nome": call `search_cards` with `name: "magician"`.
- "carta id 46986414": call `get_card_by_id` with `id: 46986414`.
- "spell cards", "cartas magia", "trap cards", "armadilhas": call `search_cards` with `type: "Spell Card"` or `type: "Trap Card"`.
- "cartas em portugues": include `language: "pt"` on `search_cards`.
- "mais novas": include `sort: "new"`.

## Output Style

Summarize cards in Portuguese unless the user asks otherwise. Include the card name, type, ATK/DEF/Level when present, race/attribute when present, and a short effect summary.

Keep API calls focused. Do not request all cards unless the user explicitly asks for broad browsing.
