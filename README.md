# Babylon Finality Explorer

A simple web application to allow users of OP Stack L2 chains to view the finality status of transactions.

## Develop

To set up a development environment, first specify the required environment
variables in the `.env.example` file in the root directory:

```
cp .env.example .env.local
```

where,

- `NEXT_PUBLIC_FINALITY_GADGET_API_URL` specifies the back-end API for the finality gadget
- `NEXT_PUBLIC_DISPLAY_TESTING_MESSAGES` boolean value to indicate whether display 
testing network related message. Default to true

Then, to start a development server:

```bash
npm run dev
```