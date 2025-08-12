from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import random, os
import cohere
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("COHERE_API_KEY")
co = cohere.Client(api_key)

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

secret_number = random.randint(1, 10)

@app.get("/new-game")
def new_game():
    global secret_number
    secret_number = random.randint(1, 10)

    prompt = f"""
Write a clever, slightly tricky poetic riddle for the number {secret_number}, 
between 1 and 10. Do not mention the number directly. Make it fun and indirect.Give in one line
"""

    try:
        response = co.generate(
            model="command-r-plus",  # You can use "command-r", "command-r-plus", or "command-light"
            prompt=prompt,
            max_tokens=100,
            temperature=0.8,
        )
        clue = response.generations[0].text.strip()
    except Exception as e:
        print("Cohere ERROR:", e)
        clue = "🤖 Oops! Couldn’t fetch the riddle. Just guess bravely!"

    return {"clue": clue}


@app.get("/guess")
def make_guess(number: int = Query(...)):
    if number == secret_number:
        return {"result": "Correct!"}
    elif number < secret_number:
        return {"result": "Too low!"}
    else:
        return {"result": "Too high!"}
