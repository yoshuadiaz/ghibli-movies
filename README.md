# Ghibli list of movies with Next.JS

## Installation

You need to run:

```bash
yarn
// or
npm install
```

## Dev mode

You need to run:

```bash
yarn dev
// or
npm run dev
```

## Production

You need to run:

```bash
yarn build
yarn start
// or
npm run build
npm start
```

## Main trouble

Create a fast website with a fast autocomplete.

## Architecture

I chose Next.js to be the main framework to work with React because I want to create a SSG solution.

I'm using CSS modules to rehuse some styles, I'm using Semantic UI to help me with some components for the search and show rating stars.

## Trade-offs

Maybe I need to refactor the code to organize in an architecture based on Views and Containers to isolate more the views and logic. And I want to create a kind of utilities to rehuse better some parts of the code. And I want to improve the Accessibility. And I want to use TypeScript to add interfaces and Types on the props and functions.

## Proud part

I'm proud about [components/navbar](https://github.com/yoshuadiaz/ghibli-movies/blob/main/components/Navbar.js) because I isolate the logic to rehuse in main view and in detail view
