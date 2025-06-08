# Guayabot

A Telegram bot for the Agile Canarias community, built with [grammY](https://grammy.dev/) and Deno. The bot helps manage group rules, suggestions, session proposals, and more.

## Features

- **/rules**: Shows the group rules.
- **/suggestion [your suggestion]**: Send constructive feedback or improvement proposals to the organization.
- **/session**: Propose a session, talk, kata, workshop, etc.
- **/help**: Shows available commands and help.
- Welcomes new members to the group with a custom message.
- Receives and summarizes form responses (e.g., from Tally) and sends them to the organization chat.

## Getting Started

### Prerequisites
- [Deno](https://deno.com/) installed locally (for development)
- A Telegram bot token ([create one here](https://t.me/BotFather))
- (Optional) Tally webhook secret for session proposals

### Environment Variables
Set the following environment variables in your Deno Deploy project settings:
- `TELEGRAM_TOKEN`: Your Telegram bot token
- `TELEGRAM_WEBHOOK_SECRET`: Secret for Telegram webhook
- `TALLY_WEBHOOK_SECRET`: Secret for Tally webhook

### Running Locally

```sh
deno task dev
```

This will start the bot and listen for incoming webhooks locally.

## Deployment

This bot is deployed on [Deno Deploy](https://deno.com/deploy). To deploy:

1. Push your code to a GitHub repository.
2. Create a new project in Deno Deploy and link your repository.
3. Set the environment variables (`TELEGRAM_TOKEN`, `TELEGRAM_WEBHOOK_SECRET`, `TALLY_WEBHOOK_SECRET`) in the Deno Deploy dashboard.
4. Set the entrypoint to `main.ts`.
5. Deploy!

## File Structure

- `bot.ts`: Main bot logic and command handlers
- `main.ts`: HTTP server and webhook handling
- `summarySession.ts`: Utilities for summarizing and extracting data from form responses
- `formatNamesList.ts`: Helper for formatting user names in welcome messages

## License

MIT
