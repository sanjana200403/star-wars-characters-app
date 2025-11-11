# Star Wars Character App

A responsive React web application that lists Star Wars characters using the SWAPI API.

This project demonstrates skills in React, TypeScript, state management, API integration, and UI development.

## Tech Stack

- React with functional components & hooks
- TypeScript
- Tailwind CSS

##  Project Overview

The app fetches Star Wars characters and displays them in a responsive UI.  
Users can:

- View character cards with a random image and species-based accent color.
- Open a modal with detailed character information.
- Search characters by name.
- Filter characters by species, homeworld, and films.
- Navigate pages using pagination.
- Login/logout using mock credentials with a fake JWT token.
- Experience loading, empty, and error states gracefully.

##  Features Implemented

- **Fetch & Display Characters**
  - Uses the `/people` endpoint from SWAPI
  - Handles loading and error states

- **Pagination**
  - Navigate through multiple pages of characters
  - Smooth UX with loading indicators

- **Character Cards**
  - Displays character name and a random image
  - Accent color based on species
  - Click on a card to open a modal with full character details

- **Character Details Modal**
  - Opens on click of a character card
  - Displays:
    - Name
    - Height (in meters)
    - Mass (in kg)
    - Birth year
    - Number of films
    - Homeworld details (name, terrain, climate, population)

- **Search & Filters**
  - Search by character name (partial match)
  - Filter by species, homeworld, films
  - Combined search + filter functionality
  - Filters show applied state with removable buttons

- **Mock Authentication**
  - Simple login/logout functionality
  - Uses fake credentials and a mocked JWT token
  - Credentials:
    ```
    Username: admin
    Password: Admin@123
    ```

- **Responsive UI**
  - Works across mobile, tablet, and desktop screens

##  Bonus Features (Optional but Implemented)

- **Search**: Allows searching characters by name (partial match).  
- **Filters**: Filter characters by species, homeworld, or films.  
- **Combined Search + Filter**: Supports filtering and searching together.  
- **Mock Authentication**:  
  - Simple login/logout functionality  
  - Uses fake credentials and a mocked JWT token  
  - Credentials:  
    ```
    Username: admin
    Password: Admin@123
    ```  
  - Supports silent token refresh logic (mocked, no real backend)  
- **Testing**: Integration test added to verify that the modal opens with the correct character details.

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
