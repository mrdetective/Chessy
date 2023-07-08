from stockfish import Stockfish
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:5500"}})


def stockfishfetch(fen):
    stockfish = Stockfish(
        path="C:\\Users\\gupta\\Stockfish\\stockfish\\stockfish-windows-2022-x86-64-avx2.exe")
    stockfish.set_fen_position(fen)
    print(fen)
    print(stockfish.get_top_moves(3))


@app.route('/', methods=['GET', 'POST'])
def hello():
    stockfishfetch(request.json)
    return 'Hello, Flask!'


if __name__ == '__main__':
    app.run()
