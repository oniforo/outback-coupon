# outback-coupon

A small Puppeteer script that automates filling out Outback Steakhouse
Brazil's post-visit satisfaction survey (`pesquisa.meuoutback.com.br`) in
order to claim the discount coupon offered on completion.

## What it does

1. Logs into the survey site with the configured email/password.
2. Fills in the receipt details (CNPJ, CCO code, date, and time) for the
   restaurant visit.
3. Answers all 13 survey questions.
4. Confirms the final screen and prints the coupon download link to stdout.

## Requirements

- Node.js 20.6+ (uses the native `--env-file` flag)
- Yarn

## Setup

Install dependencies:

```sh
yarn install
```

Create a `.env` file in the project root with your survey login:

```
OUTBACK_EMAIL=your-email@example.com
OUTBACK_PASSWORD=your-password
```

`.env` is git-ignored, so your credentials stay local.

The CNPJ, CCO (receipt code), visit date, and visit time are currently
hardcoded in `main.js` — edit those values there to match your own receipt
before running.

## Usage

```sh
yarn start
```

This runs `node --env-file=.env main.js`, which loads `.env` and launches
a headless Chromium browser via Puppeteer to complete the survey. On
success, the coupon download URL is logged to the console.

## Project structure

- `main.js` — the automation script
- `package.json` / `yarn.lock` — dependencies (Puppeteer) and the `start`
  script
- `Dockerfile` — currently empty, reserved for containerizing the script
