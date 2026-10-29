# UpperRoom Apparel — Quiet Luxury E-Commerce

> *"Wear the Word. Walk in the Spirit."*

A faith-inspired quiet luxury streetwear brand built with **React Native with Expo** and **react-native-web**, engineered so a single codebase runs seamlessly on Web (primary target), iOS, and Android.

---

## Brand & Design Discipline

- **Brand Signature**: **Purity White (`#FFFFFF`)**. White is the anchor of the brand, dominating the experience across all key surfaces, buttons, and negative space (approx. 70% white, 20% light gray, 10% black).
- **Contrast Elements**: High-contrast black (`#000000`) for text, icons, and 1px hairline borders, plus a monolithic dark section on Home and in the web footer for editorial depth.
- **Strict Palette**: No accent colors, no gold, no gradients.
- **Typography**: Editorial serif headings (**Cormorant Garamond**) paired with a disciplined sans-serif body font (**Inter**), loaded via `@expo-google-fonts`.
- **Architectural Silhouettes**: Sharp corners (`borderRadius: 0`), 1px hairline borders instead of drop shadows, and uppercase tracked labels (1.5–3.5px letter spacing).
- **Inversion Interaction**: Primary buttons feature white fill with 1px black border and black text, inverting on hover/pressed to black fill with white text.

---

## Project Structure

```
UpperRoom/
├── assets/
├── components/
│   ├── Button.js
│   ├── CartItem.js
│   ├── CategoryTab.js
│   ├── CheckoutModal.js
│   ├── Footer.js
│   ├── Header.js
│   ├── MobileTabBar.js
│   ├── ProductCard.js
│   ├── QuantityStepper.js
│   └── SectionHeading.js
├── context/
│   ├── CartContext.js
│   └── StoreContext.js
├── data/
│   └── products.js
├── hooks/
│   └── useBreakpoint.js
├── navigation/
│   └── RootNavigator.js
├── public/
│   └── index.html
├── screens/
│   ├── AboutScreen.js
│   ├── AdminScreen.js
│   ├── BagScreen.js
│   ├── ContactScreen.js
│   ├── HomeScreen.js
│   ├── NotFoundScreen.js
│   └── ShopScreen.js
├── theme/
│   └── index.js
├── App.js
├── app.json
└── package.json
```

---

## Features

- **Store & Product Management**:
  - Live product catalog with categories, price sorting, and instant search.
  - Detail view with responsive gallery, colorway swatches, size selectors, quantity stepper, and scripture references.
- **Admin Atelier (`/admin`)**:
  - Add new products with name, price, category, fabric, image URL, description, and scripture reference.
  - Delete products from the live catalog.
  - Review orders, filter by status (`PENDING`, `APPROVED`, `FULFILLED`, `REJECTED`).
  - Approve pending orders and mark approved orders as fulfilled.
- **Persistent State**:
  - Cart and orders persisted across sessions via `@react-native-async-storage/async-storage`.
- **Responsive Layout**:
  - Mobile (<768px): 2 columns, bottom navigation bar.
  - Tablet (768-1099px): 3 columns, sticky header.
  - Desktop (1100px+): 4 columns, two-column detail/bag layouts, 1400px centered container.

---

## Setup & Running Locally

```bash
# Install dependencies
npm install

# Start local web dev server
npx expo start --web

# Export static production web bundle
npx expo export --platform web
```
