# Payments And Maps Setup

## Google Maps

Add this to the frontend environment file:

```bash
VITE_GOOGLE_MAPS_API_KEY=your_browser_google_maps_key
```

Enable the Maps JavaScript API in Google Cloud and restrict the key to the production domain.

## Backend Environment

Add these to `backend/.env`:

```bash
PAYSTACK_SECRET_KEY=sk_live_or_test_key
PAYSTACK_PUBLIC_KEY=pk_live_or_test_key
GOOGLE_MAPS_API_KEY=your_server_reference_key
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
