# Little Lemon – Food Ordering App (React Native / Expo)

Capstone project for the Meta React Native course.

## Run it
```bash
npm install
npx expo start
```
Scan the QR code with Expo Go (iOS/Android), or press `a` / `i` for an emulator.

## What's in the app
| Screen | Details |
|---|---|
| **Onboarding** | Shown on first launch. Asks for first name + email. **Next** is disabled until both are valid. |
| **Home** | Header (logo + profile avatar) · Hero (description + search) · Menu breakdown (selectable category chips) · Food menu list (name, short description, price, image). |
| **Profile** | Pre-filled from onboarding. Edit name/email/phone/avatar/notifications, **Save changes** (persisted with AsyncStorage), **Discard changes**, **Log out** (clears all stored data and returns to Onboarding). Back button returns to Home. |

Navigation is a native stack (`@react-navigation/native-stack`). The menu is fetched from the course API, with a local fallback if offline.

## Wireframe
See `wireframe.jpg`.

## Ideas for improvement
- Cache the menu in SQLite so it loads instantly offline
- Debounced search that combines with category filters
- Shopping cart + checkout flow
- Dark mode and larger-text accessibility support
- Unit tests for validation and storage helpers
