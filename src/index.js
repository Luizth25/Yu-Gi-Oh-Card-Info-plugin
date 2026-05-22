#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const API_BASE_URL = "https://db.ygoprodeck.com/api/v7";
const USER_AGENT = "yugioh-card-info/1.0";

const server = new McpServer({
  name: "yugioh-card-info",
  version: "1.0.0"
});

async function requestJson(path, params = {}) {
  const url = new URL(`${API_BASE_URL}/${path}`);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url, {
    headers: {
      "accept": "application/json",
      "user-agent": USER_AGENT
    }
  });

  const text = await response.text();
  let payload;

  try {
    payload = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`YGOPRODeck returned non-JSON response (${response.status}): ${text.slice(0, 300)}`);
  }

  if (!response.ok || payload.error) {
    const message = payload.error || payload.message || response.statusText;
    throw new Error(`YGOPRODeck API error (${response.status}): ${message}`);
  }

  return payload;
}

function compactCard(card) {
  return {
    id: card.id,
    name: card.name,
    type: card.type,
    frameType: card.frameType,
    desc: card.desc,
    race: card.race,
    attribute: card.attribute,
    archetype: card.archetype,
    level: card.level,
    atk: card.atk,
    def: card.def,
    linkval: card.linkval,
    scale: card.scale,
    banlist_info: card.banlist_info,
    prices: card.card_prices?.[0],
    sets: card.card_sets?.slice(0, 10).map((set) => ({
      set_name: set.set_name,
      set_code: set.set_code,
      set_rarity: set.set_rarity,
      set_price: set.set_price
    })),
    images: card.card_images?.slice(0, 3).map((image) => ({
      id: image.id,
      image_url: image.image_url,
      image_url_small: image.image_url_small,
      image_url_cropped: image.image_url_cropped
    })),
    ygoprodeck_url: card.ygoprodeck_url
  };
}

function toolResult(data) {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data, null, 2)
      }
    ]
  };
}

function toolError(error) {
  return {
    content: [
      {
        type: "text",
        text: error instanceof Error ? error.message : String(error)
      }
    ],
    isError: true
  };
}

server.tool(
  "search_cards",
  "Search Yu-Gi-Oh! cards by fuzzy name and optional filters.",
  {
    name: z.string().optional().describe("Fuzzy card name search, for example 'dark magician'."),
    archetype: z.string().optional().describe("Archetype name, for example 'Blue-Eyes'."),
    type: z.string().optional().describe("Card type, for example 'Effect Monster', 'Spell Card', or 'Trap Card'."),
    race: z.string().optional().describe("Monster race or spell/trap race, for example 'Dragon', 'Warrior', 'Quick-Play'."),
    attribute: z.string().optional().describe("Monster attribute, for example 'DARK', 'LIGHT', 'FIRE'."),
    atk: z.string().optional().describe("ATK filter. Use exact values like '2500' or comparisons: 'lt2500', 'lte2500', 'gt2500', 'gte2500'."),
    def: z.string().optional().describe("DEF filter. Use exact values like '2000' or comparisons: 'lt2000', 'lte2000', 'gt2000', 'gte2000'."),
    level: z.string().optional().describe("Monster level/rank filter. Use exact values like '4' or comparisons: 'lte4', 'gte8'."),
    link: z.string().optional().describe("Link rating filter for Link Monsters, for example '2' or 'gte3'."),
    scale: z.string().optional().describe("Pendulum scale filter, for example '8' or 'lte4'."),
    cardset: z.string().optional().describe("Card set name, for example 'Metal Raiders' or 'Soul Fusion'."),
    banlist: z.string().optional().describe("Banlist filter: 'tcg', 'ocg', or 'goat'."),
    format: z.string().optional().describe("Game format, for example 'tcg', 'ocg', 'goat', or 'master duel'."),
    sort: z.string().optional().describe("Sort order: 'atk', 'def', 'name', 'type', 'level', 'id', or 'new'."),
    language: z.string().optional().describe("Card language code for cardinfo.php: 'fr', 'de', 'it', or 'pt'. Omit for English."),
    limit: z.number().int().min(1).max(500).default(10).describe("Maximum cards to return.")
  },
  async ({ name, archetype, type, race, attribute, atk, def, level, link, scale, cardset, banlist, format, sort, language, limit }) => {
    try {
      const params = {
        fname: name,
        archetype,
        type,
        race,
        attribute,
        atk,
        def,
        level,
        link,
        scale,
        cardset,
        banlist,
        format,
        sort,
        language
      };
      const payload = await requestJson("cardinfo.php", params);
      const cards = (payload.data || []).slice(0, limit).map(compactCard);

      return toolResult({
        total_available: payload.data?.length || 0,
        returned: cards.length,
        cards
      });
    } catch (error) {
      return toolError(error);
    }
  }
);

server.tool(
  "get_card_by_name",
  "Get one exact Yu-Gi-Oh! card by name.",
  {
    name: z.string().min(1).describe("Exact card name, for example 'Dark Magician'.")
  },
  async ({ name }) => {
    try {
      const payload = await requestJson("cardinfo.php", { name });
      return toolResult(compactCard(payload.data[0]));
    } catch (error) {
      return toolError(error);
    }
  }
);

server.tool(
  "get_card_by_id",
  "Get one Yu-Gi-Oh! card by Konami/YGOPRODeck card id.",
  {
    id: z.number().int().positive().describe("Card id, for example 46986414.")
  },
  async ({ id }) => {
    try {
      const payload = await requestJson("cardinfo.php", { id });
      return toolResult(compactCard(payload.data[0]));
    } catch (error) {
      return toolError(error);
    }
  }
);

server.tool(
  "random_card",
  "Get a random Yu-Gi-Oh! card.",
  {},
  async () => {
    try {
      const card = await requestJson("randomcard.php");
      return toolResult(compactCard(card));
    } catch (error) {
      return toolError(error);
    }
  }
);

server.tool(
  "list_card_sets",
  "List official Yu-Gi-Oh! card sets from YGOPRODeck.",
  {
    limit: z.number().int().min(1).max(200).default(50).describe("Maximum sets to return.")
  },
  async ({ limit }) => {
    try {
      const sets = await requestJson("cardsets.php");
      return toolResult({
        total_available: sets.length,
        returned: Math.min(sets.length, limit),
        sets: sets.slice(0, limit)
      });
    } catch (error) {
      return toolError(error);
    }
  }
);

server.tool(
  "get_database_version",
  "Get the current YGOPRODeck card database version metadata.",
  {},
  async () => {
    try {
      const version = await requestJson("checkDBVer.php");
      return toolResult(version);
    } catch (error) {
      return toolError(error);
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
