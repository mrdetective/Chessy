from stockfish import Stockfish
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:5500"}})


def stockfishfetch(fen, difficulty):
    stockfish = Stockfish(
        path="C:\\Users\\gupta\\Stockfish\\stockfish\\stockfish-windows-2022-x86-64-avx2.exe")
    stockfish.set_fen_position(fen)
    if (difficulty == "easy"):
        stockfish.set_elo_rating(500)
    elif (difficulty == "medium"):
        stockfish.set_elo_rating(1500)
    else:
        stockfish.set_elo_rating(2500)
    return stockfish.get_top_moves(1)[0]["Move"]


@app.route('/', methods=['GET', 'POST'])
def hello():
    return stockfishfetch(request.json["fen"], request.json["difficulty"])


if __name__ == '__main__':
    app.run()
