const playerFactory = (name, wins) => {
	return { name, wins };
};

const gameBoard = (() => {
	"use strict";
	const _gameBoardArrayLength = 9;
	var _boardArray = [];
    const gameBoardGridElement = document.querySelector(".tic-tac-toe-grid");

	const initializeBoardArray = function () {
		for (var i = 0; i < _gameBoardArrayLength; i++) {
			_boardArray.push(document.querySelector(`#cell-${i}`));
		}
	};

    const printBoardArray = function () {
        console.log(_boardArray);
    };

	return { initializeBoardArray, printBoardArray, gameBoardGridElement };
})();

const gameLogic = (() => {
    "use strict";

    var _p1Turn = true;
    const _player1 = playerFactory(prompt("Player 1, Enter your name"), 0);
    const _player2 = playerFactory(prompt("Player 2, Enter your name"), 0);

    const _switchPlayerTurn = function () {
        _p1Turn = !_p1Turn;
    };

    const isP1Turn = function () {
        return _p1Turn;
    };

    const getP1Name = function () {
        return _player1.name;
    };

    const getP2Name = function () {
        return _player2.name;
    };

    gameBoard.gameBoardGridElement.addEventListener("click", (e) => {
        if (e.target.className !== "cell-display") {
            return;
        }

        _switchPlayerTurn();
    });

    return { isP1Turn, getP1Name, getP2Name };
})();

const displayController = (() => {
    "use strict";
    const _playerTurnDisplay = document.querySelector(".player-turn-display");

    _playerTurnDisplay.textContent = `${gameLogic.getP1Name()}'s Turn!`;

    gameBoard.gameBoardGridElement.addEventListener("click", (e) => {
        if (e.target.className !== "cell-display") {
            return;
        }

        if (!gameLogic.isP1Turn()) {
            // Display player 2 since  player 1 just clicked on a cell.
            _playerTurnDisplay.textContent = `${gameLogic.getP2Name()}'s Turn!`;
            e.target.textContent = "O";
        } else {
            // Display player 1 since player 2 just clicked on a cell.
            _playerTurnDisplay.textContent = `${gameLogic.getP1Name()}'s Turn!`;
            e.target.textContent = "X";
        }
    });
})();

gameBoard.initializeBoardArray();
gameBoard.printBoardArray();