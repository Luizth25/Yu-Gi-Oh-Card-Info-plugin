# Yu-Gi-Oh! Card Info

Codex plugin for searching Yu-Gi-Oh! card data through a local MCP server powered by the public YGOPRODeck API v7.

Use it to look up cards, inspect monster stats, search archetypes and sets, check banlist data, and fetch YGOPRODeck database metadata directly from Codex.

## Features

- Search cards by fuzzy name, exact name, card id, type, format, language, and sort order.
- Filter monsters by ATK, DEF, Level/Rank, Attribute, Race, Link value, and Pendulum Scale.
- Find cards by archetype, card set, banlist, and game format.
- List current banlist cards and filter them by status or card type.
- Fetch random cards, available card sets, and YGOPRODeck database version metadata.
- Includes Codex skills for natural-language Yu-Gi-Oh! workflows in English and Portuguese.

## Example Prompts

- Find Dragon monsters with ATK above 2500.
- Search cards from the Blue-Eyes archetype.
- Show cards currently forbidden in the TCG banlist.
- List cards from Metal Raiders.
- Find DARK Warrior monsters with Level 4.
- Search Yu-Gi-Oh! cards in Portuguese by partial name.

## MCP Tools

- `search_cards`: fuzzy card search with optional filters.
- `get_card_by_name`: exact card lookup by name.
- `get_card_by_id`: card lookup by id.
- `random_card`: random card lookup.
- `list_card_sets`: list Yu-Gi-Oh! card sets.
- `get_database_version`: YGOPRODeck database version metadata.

## Skills

This project includes local Codex skills under `skills/`:

- `yugioh-card-search`: search cards by name, id, type, language, and sort order.
- `yugioh-monster-filters`: search monsters by ATK, DEF, Level/Rank, Attribute, Race, Link, and Pendulum Scale.
- `yugioh-archetype-sets`: search by archetype, card set, banlist, format, and available sets.
- `yugioh-banlist`: list current banlist cards, filter by status or type, and explain limits for historical duration.

## Install

```bash
npm install
```

## Usage

```bash
npm start
```

## MCP config

Use this server command from an MCP client:

```json
{
  "mcpServers": {
    "yugioh": {
      "command": "node",
      "args": [
        "./src/index.js"
      ]
    }
  }
}
```

## Notes

- API documentation: https://ygoprodeck.com/api-guide/
- This plugin returns image URLs as metadata but does not download or cache card images.
- YGOPRODeck asks API consumers to avoid repeatedly hotlinking card images and to store pulled data locally when heavy usage is expected.

## License

MIT
