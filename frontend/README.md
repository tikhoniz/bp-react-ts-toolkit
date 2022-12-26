# react-helmet-async

используется для SEO

## PAYPAL

# sandbox

_business account_
`sb-fm5je13571173@business.example.com` pass:@d3i0n0a4r8A4 country: PL
_personal account_
`sb-quiel13575308@personal.example.com` pass:12345678 country: PL
`americanBoy@personal.example.com` pass:12345678 country: US
`kazakh@personal.example.com` pass:12345678 country: KZ

## STRIPE

# dev mode

VISA 4242424242424242
Master Card 5555555555554444

# создать проверку оплаты в режиме dev

https://dashboard.stripe.com/test/webhooks/create?endpoint_location=local

- в терминале:
  stripe login
  stripe listen --forward-to localhost:8080/api/webhooks/stripe
  stripe trigger payment_intent.succeeded
