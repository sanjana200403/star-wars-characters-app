# Star Wars Character App

A responsive React web application that lists Star Wars characters using the SWAPI API.
 
This project demonstrates skills in React, TypeScript, state management, API integration, and UI development.

## Tech Stack

- React with functional components & hooks
- TypeScript
- Tailwind CSS
- React Testing Library

## 🧑‍💻 Project Overview

The app fetches Star Wars characters and displays them in a responsive UI.
Users can:

- View character cards with a random image and species-based accent color.
- Open a modal with detailed character information.
- Search characters by name.
- Filter characters by species, homeworld, and films.
- Navigate pages using pagination.
- Experience loading, empty, and error states gracefully.

## 🎯 Features Implemented

### Fetch & Display Characters
- Uses /people endpoint from SWAPI
- Pagination implemented
- Handles loading and error states

### Character Cards
- Displays name and random image
- Species-based accent color
- Click to open modal for detailed info

### Character Details Modal
- Name, height (meters), mass (kg)
- Date added (formatted as dd-MM-yyyy)
- Number of films
- Birth year
- Homeworld details (name, terrain, climate, population)

### Search & Filters
- Search by name (partial match)
- Filter by species, homeworld, films
- Combined search + filter functionality
- Filters include predefined options + dynamic options from current page

### Responsiveness
- Works across mobile, tablet, and desktop screens

## Bonus / Optional
- Simple mock authentication implemented
- Filter logic and UI fully functional

## How to Run the Project

Clone the repository:

```
git clone <your-repo-url>
cd starwars-app

```

Install dependencies:

```
npm install
```

Start the development server:
```
npm run dev
```

Open in browser: http://localhost:5173
