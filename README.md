## Project Name

Zinc Assignment - [DEMO](https://zinc-assignment.vercel.app/)

### Overview

The Zinc Assignment project is a web application built to showcase products fetched from the Fake Store API. Users can view a list of products, filter them based on category, price range, and rating, add products to their cart, and proceed to checkout. The project utilizes React for the frontend, MobX for state management, and Ant Design for UI components.

### Folder Structure

The project follows a typical React project structure:

```
project-root/
│
├── src/
│   ├── components/
│   │   ├── header.tsx
│   │   ├── card.tsx
│   │   ├── modal.tsx
│   │   └── filter.tsx
│   │
│   ├── store/
│   │   └── products.ts
│   │
│   └── views/
│       └── home.tsx
│
├── public/
│   ├── index.html
│   └── ...
│
├── ...
└── README.md
```

### Key Components

#### Card Component

The ProductCard component is responsible for rendering individual product items in a visually appealing and informative way.

#### Filter Component

The Filter Component provides users with the ability to filter products based on category, price range, and rating. It interacts with the MobX store to apply filters and update the displayed product list accordingly.

### Deployment

The project is deployed using GitHub Actions and Vercel. A GitHub Actions workflow is defined in the `.yml` file to automate the deployment process. The workflow triggers on push events to the main branch, builds the project, and deploys it to Vercel using the Vercel token and project ID stored as secrets.

### Usage

To run the project locally, clone the repository and install dependencies using `npm install`. Then, start the development server with `npm start`. Access the application at `http://localhost:3000`.
