# Osteria Sera

A standalone, responsive restaurant landing page for a fictional Italian neighborhood bistro. The menu, restaurant, location, and hours are sample content. Reservation and ordering links stay on this page and do not submit a booking or an order.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`.
The build pre-renders the page into `dist/`; use `npm run preview` to inspect that production output.

## Design references

- [Cozy Restaurant — Figma Community](https://www.figma.com/community/file/1487477198942379086/cozy-restaurant)
- [Responsive website design — Figma Resource Library](https://www.figma.com/resource-library/responsive-website-design/)

The page follows the restaurant information hierarchy in those references: make the visit and reservation path easy to find, then lead into the menu and dining story. Community file pages can restrict automated previews; these links are supplied as the references, and the implementation follows their published page descriptions.

## Photography credits

Photographs are from Unsplash and are licensed under the [Unsplash License](https://unsplash.com/license). Each displayed photo is credited in the page.
Responsive AVIF image sizes are served where supported, with JPEG fallbacks.

- Hero dining table: [Liubov Ilchuk — “Four filled wine glasses and foods on table”](https://unsplash.com/photos/four-filled-wine-glasses-and-foods-on-table-_qZOwG2oaj4)
- Dining room: [Gerrie van der Walt — restaurant interior](https://unsplash.com/photos/restaurant-interior-design-yM4GL3REtsU)
- Pasta: [Youjeen Cho — pasta on plate](https://unsplash.com/photos/pasta-on-plate-jL3X9oeQ3Ps)
- Ravioli: [Charles Deluvio — ravioli on marble](https://unsplash.com/photos/plate-of-ravioli-on-a-marble-table-hQckRlItq4c)

## Interactions

- Main navigation links scroll to page sections.
- The mobile Menu button opens and closes the navigation; Escape closes it and returns focus to the button.
- Reserve a table and ordering demo links lead to explanatory in-page prototype details. No booking or order is submitted.
