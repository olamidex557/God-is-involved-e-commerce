# Payments And Maps Setup

## Maps

The storefront uses OpenStreetMap tiles through React Leaflet. No map API key,
billing account, or frontend environment variable is required.

## Backend Environment

Add these to `backend/.env`:

```bash
PAYSTACK_SECRET_KEY=sk_live_or_test_key
PAYSTACK_PUBLIC_KEY=pk_live_or_test_key
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
FRONTEND_URL=https://your-frontend-domain.com
```

The backend validates required production variables at startup.

## Paystack Callback

The app initializes Paystack with:

```text
{FRONTEND_URL}/order-success
```

Paystack redirects users back with a `reference` query parameter. The frontend then calls the backend verify endpoint.

## Paystack Webhook

Configure this webhook URL in Paystack:

```text
https://your-api-domain.com/api/payments/webhook
```

The webhook verifies `x-paystack-signature`, logs processed events, ignores duplicates, and updates successful payments to:

```text
paymentStatus = paid
status = processing
```
