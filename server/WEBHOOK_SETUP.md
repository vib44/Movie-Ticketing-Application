# Stripe Webhook Setup Guide

This guide explains how to set up Stripe webhooks to automatically update booking status when payments are completed.

## Overview

The webhook endpoint automatically updates booking status from "pending" to "completed" when Stripe confirms a successful payment. This ensures bookings are updated even if the user doesn't complete the redirect flow.

## Environment Variables

Add the following to your `.env` file:

```env
STRIPE_SECRET_KEY=sk_test_...  # Your Stripe secret key
STRIPE_WEBHOOK_SECRET=whsec_...  # Your webhook signing secret (see below)
```

## Local Development Setup (using Stripe CLI)

### 1. Install Stripe CLI

**macOS (using Homebrew):**
```bash
brew install stripe/stripe-cli/stripe
```

**Windows/Linux:**
Download from https://stripe.com/docs/stripe-cli

### 2. Login to Stripe CLI

```bash
stripe login
```

This will open your browser to authenticate with your Stripe account.

### 3. Forward Webhooks to Local Server

Run this command to forward Stripe webhooks to your local server:

```bash
stripe listen --forward-to localhost:8001/api/booking/webhook
```

This will:
- Start listening for webhook events
- Forward them to your local server
- Display a webhook signing secret (starts with `whsec_`)

### 4. Copy the Webhook Secret

When you run `stripe listen`, you'll see output like:

```
> Ready! Your webhook signing secret is whsec_xxxxxxxxxxxxx
```

Copy this secret and add it to your `.env` file:

```env
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

### 5. Restart Your Server

After adding the webhook secret, restart your server to load the new environment variable.

### 6. Test the Webhook

1. Make a test payment through your app
2. Check the `stripe listen` terminal - you should see webhook events being received
3. Check your server logs - you should see "Booking confirmed via webhook"
4. Verify the booking status is updated to "completed" in your database

## Production Setup

### 1. Create Webhook Endpoint in Stripe Dashboard

1. Go to https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Enter your production webhook URL: `https://yourdomain.com/api/booking/webhook`
4. Select events to listen for: `checkout.session.completed`
5. Click "Add endpoint"

### 2. Get Webhook Signing Secret

1. After creating the endpoint, click on it
2. Find the "Signing secret" section
3. Click "Reveal" and copy the secret (starts with `whsec_`)
4. Add it to your production environment variables:

```env
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

### 3. Deploy and Test

1. Deploy your server with the webhook secret configured
2. Make a test payment
3. Check the webhook logs in Stripe Dashboard to verify events are being received
4. Verify bookings are being updated automatically

## Webhook Endpoint Details

- **URL:** `/api/booking/webhook`
- **Method:** POST
- **Authentication:** None (verified via Stripe signature)
- **Events Handled:** `checkout.session.completed`

## Troubleshooting

### Webhook not receiving events

1. Check that `stripe listen` is running (for local development)
2. Verify the webhook URL is correct
3. Check server logs for errors
4. Verify `STRIPE_WEBHOOK_SECRET` is set correctly

### Signature verification failed

- Ensure `STRIPE_WEBHOOK_SECRET` matches the secret from Stripe
- For local development, use the secret from `stripe listen` output
- For production, use the secret from Stripe Dashboard

### Bookings still showing as pending

- Check server logs for webhook processing errors
- Verify the booking ID exists in the session metadata
- Check if seats are already booked (webhook will mark booking as failed)
- Verify the webhook is actually being called (check Stripe Dashboard logs)

## Testing Webhooks Locally

You can trigger test webhook events using Stripe CLI:

```bash
# Trigger a checkout.session.completed event
stripe trigger checkout.session.completed
```

Make sure your local server is running and `stripe listen` is forwarding events.

