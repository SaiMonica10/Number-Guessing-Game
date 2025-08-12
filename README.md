# Number Guessing Game with Poetic Riddles

This is a simple but fun number guessing game built with **FastAPI** backend and **React + Vite** frontend. The backend uses the [Cohere](https://cohere.ai/) API to generate clever, poetic riddles as clues to a secret number between 1 and 10. Players make guesses and receive feedback whether their guess is too low, too high, or correct.

## Features

- FastAPI backend with two endpoints:
  - `/new-game`: Starts a new game, generates a secret number and returns a poetic riddle clue using Cohere's text generation.
  - `/guess`: Accepts a player's guess and returns if it is too low, too high, or correct.
- Uses Cohere’s NLP model (`command-r-plus`) to create fun, indirect poetic riddles.
- CORS enabled for frontend-backend communication.
- React + Vite frontend (code not included here) to interact with the backend in a user-friendly way.

## Setup

### Backend

1. Clone the repository.

2. Create a `.env` file in the backend directory and add your Cohere API key:

