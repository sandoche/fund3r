# FUND3R // Web3 Grant Program for DAOs

FUND3R is a platform that provides tooling for end-to-end management of a grant lifecycle, significantly improving the barrier of entry to run your grant program.

[Read more](https://gov.near.org/t/demo-run-a-scalable-compliant-grant-program-on-top-of-your-dao/26640)

## Demo

- Demo video: https://drive.google.com/file/d/1U3bBcozcY1WxMQeIfZHANTBica4_ossl/view
- Demo website: https://fund3r-ui-demo.funding.nearweek.com/

## Development

The project is made of three services (each with its own README):

- [UI](/ui)
- [API](/api)
- [Backoffice](/backoffice)

### Set up

Each of these services has its own environment variables.
You need to run `cp .env.dist .env` in each of these 3 folders and fill in the values.

#### API Keys required

The project requires a few API keys & settings to work properly, you need to set them the `.env` file.

- Astro DAO Smart contract id
- Calendly API Key
- Calendly URL for the approval interview
- Calendly URL for the milestones interview
- Hello sign API Key
- Hello sign client ID

#### Customization

Coming soon

### Run

You can either run each of these services separately or run them all together using docker compose:

```bash
docker-compose up
```

## Authors

- [Sandoche](https://github.com/sandoche)

## License

[GNU General Public License v3.0](/LICENSE)
