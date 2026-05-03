# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the **trackle** Expo app. The following changes were made:

- **`app.config.js`** — Created to expose `POSTHOG_PROJECT_TOKEN` and `POSTHOG_HOST` from `.env` via `expo-constants` extras.
- **`src/config/posthog.ts`** — Created a shared PostHog client instance configured from `expo-constants`.
- **`app/_layout.tsx`** — Wrapped the app with `PostHogProvider`, enabled autocapture for touch events, and added manual screen tracking with `usePathname`/`useGlobalSearchParams`.
- **`app/(auth)/signin.tsx`** — Added sign-in attempt, success, and failure events. Identifies the user with `posthog.identify()` on successful sign-in.
- **`app/(auth)/signup.tsx`** — Added sign-up attempt, failure, verification sent, and verification success events. Identifies the user on email verification completion.
- **`app/(tabs)/index.tsx`** — Added `subscription_expanded` (with subscription properties) and `add_subscription_tapped` events.
- **`app/(tabs)/settings.tsx`** — Added `sign_out_tapped` event and `posthog.reset()` to clear the identity on sign-out.
- **`app/onboarding.tsx`** — Added `onboarding_sign_in_tapped` and `onboarding_sign_up_tapped` events.

## Events

| Event | Description | File |
|-------|-------------|------|
| `sign_in_attempted` | User tapped the Sign In button with credentials | `app/(auth)/signin.tsx` |
| `sign_in_succeeded` | User successfully signed in | `app/(auth)/signin.tsx` |
| `sign_in_failed` | Sign in attempt failed with an error | `app/(auth)/signin.tsx` |
| `sign_up_attempted` | User tapped the Sign Up button with credentials | `app/(auth)/signup.tsx` |
| `sign_up_email_verification_sent` | Verification email was sent during sign up flow | `app/(auth)/signup.tsx` |
| `sign_up_email_verified` | User successfully verified email and completed sign up | `app/(auth)/signup.tsx` |
| `sign_up_failed` | Sign up attempt failed with an error | `app/(auth)/signup.tsx` |
| `sign_out_tapped` | User tapped the sign out button in settings | `app/(tabs)/settings.tsx` |
| `subscription_expanded` | User expanded a subscription card to see details | `app/(tabs)/index.tsx` |
| `add_subscription_tapped` | User tapped the add subscription button on the home screen | `app/(tabs)/index.tsx` |
| `onboarding_sign_in_tapped` | User tapped Sign In from the onboarding screen | `app/onboarding.tsx` |
| `onboarding_sign_up_tapped` | User tapped Sign Up from the onboarding screen | `app/onboarding.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/407880/dashboard/1538899
- **Sign-up conversion funnel**: https://us.posthog.com/project/407880/insights/DZ6vwVhn
- **Sign-in conversion funnel**: https://us.posthog.com/project/407880/insights/4sldwbyK
- **Daily active users (sign-ins)**: https://us.posthog.com/project/407880/insights/LLjFWq3u
- **User churn — sign-out trend**: https://us.posthog.com/project/407880/insights/T060qPxV
- **Subscription engagement**: https://us.posthog.com/project/407880/insights/79bWSXRF

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
