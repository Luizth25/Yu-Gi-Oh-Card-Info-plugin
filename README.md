# Yu-Gi-Oh! Card Info

Yu-Gi-Oh! card information tools for Codex, powered by a local MCP server and the public YGOPRODeck API v7.

API documentation: https://ygoprodeck.com/api-guide/

## Tools

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

## Run

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

YGOPRODeck asks API consumers to avoid repeatedly hotlinking card images and to store pulled data locally when heavy usage is expected. This MCP returns image URLs as metadata but does not download or cache images.
