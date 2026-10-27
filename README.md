# LUXE — Premium Online Store

LUXE is a modern e-commerce storefront built with React and Vite. It showcases a premium shopping experience with a curated catalog, category browsing, product discovery, wishlist and cart management, and a polished responsive layout.

The app pulls product data from the DummyJSON API and uses Appwrite to persist cart and wishlist data per user, making it a practical foundation for a scalable online retail experience.

## Features

- Premium storefront homepage with hero banner and promotional sections
- Product catalog with category-based browsing and dynamic filtering
- Search and product detail views
- Wishlist and cart management
- User account area with order, address, payment, and security sections
- Responsive design optimized for desktop and mobile devices
- Redux-powered state management
- Appwrite integration for user-specific cart and wishlist persistence

## Tech Stack

- React 19
- Vite
- Redux Toolkit
- React Router
- Appwrite
- Lucide React
- Tailwind CSS

## Project Structure

```text
LuxeEcommerse/
├── public/
├── src/
│   ├── api/
│   ├── appwrite/
│   ├── components/
│   ├── conf/
│   ├── hooks/
│   ├── pages/
│   ├── store/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
└── README.md
```

## Prerequisites

Before running the project, make sure you have:

- Node.js 18+
- npm or yarn
- An Appwrite project (optional for local cart/wishlist persistence)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/abdulrehman7876/LUXE_Ecommrse_store.git
cd LUXE_Ecommrse_store
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your Appwrite configuration:

```env
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_CART_ID=your_cart_collection_id
VITE_APPWRITE_COLLECTION_WISHLIST_ID=your_wishlist_collection_id
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL shown in the terminal (typically `http://localhost:5173`).

## Available Scripts

```bash
npm run dev      # start Vite development server
npm run build    # production build for deployment
npm run preview  # preview the production build locally
npm run lint     # run the project linter
```

## Appwrite Setup

This project uses Appwrite for storing per-user cart and wishlist items. The configuration is loaded from environment variables defined in `src/conf/conf.js`.

To set it up:

1. Create a new Appwrite project.
2. Create a database and tables for cart and wishlist entries.
3. Store the database and collection IDs in the `.env` file.
4. Ensure the appropriate permissions are configured for user-specific access.

## Deployment

The project includes a `vercel.json` configuration, so it is ready to deploy on Vercel.

```bash
npm run build
```

Then deploy the exported project through Vercel or your preferred static hosting provider.

## Notes

- Product data is currently sourced from the public DummyJSON API.
- Cart and wishlist persistence rely on Appwrite; if those environment variables are not configured, the app may not fully persist user data.
- The storefront is designed as a polished frontend foundation and can be extended with authentication, checkout integration, or a real backend product catalog.

## License

This project does not currently include a license file. If you plan to distribute it publicly, consider adding an appropriate open-source license.

## Contributing

Contributions are welcome. If you'd like to improve the project:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request with a clear description
