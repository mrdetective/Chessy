from stockfish import Stockfish

stockfish = Stockfish(
    path="C:\\Users\\gupta\\Stockfish\\stockfish\\stockfish-windows-2022-x86-64-avx2.exe")

stockfish.set_fen_position(
    "rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2")
print(stockfish.get_top_moves(3))