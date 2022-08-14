const playerFactory = (name, wins) => {
	return { name, wins };
};

const gameBoard = (() => {
	"use strict";
	const _arrayLength = 9;
	var _array = [];
    const gridElement = document.querySelector(".tic-tac-toe-grid");

	const initializeBoardArray = function () {
		for (var i = 0; i < _arrayLength; i++) {
			_array.push(document.querySelector(`#cell-${i}`));
		}
	};

    const printBoardArray = function () {
        console.log(_array);
    };

	return { initializeBoardArray, printBoardArray, gridElement };
})();

const gameLogic = (() => {
    "use strict";

    var _p1Turn = true;
    var _gameEnd = false;
    var _lastActionErrored = false;
    const _player1 = playerFactory(prompt("Player 1, Enter your name"), 0);
    const _player2 = playerFactory(prompt("Player 2, Enter your name"), 0);

    const _switchPlayerTurn = function () {
        _p1Turn = !_p1Turn;
    };

    const _cellIsOccupied = function (selectedCell) {
        if (selectedCell.className !== "cell-display") {
            throw "Parameter is not a cell display element!";
        }

        if (selectedCell.textContent === "X" || selectedCell.textContent === "O") {
            return true;
        } else if (selectedCell.textContent === "") {
            return false;
        } else {
            throw "Unrecognized text content within cell display!";
        }
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

    const lastActionErrored = function () {
        return _lastActionErrored;
    }

    gameBoard.gridElement.addEventListener("click", (e) => {
        if (e.target.className !== "cell-display") {
            return;
        }

        if (_cellIsOccupied(e.target)) {
            _lastActionErrored = true;
            alert("That cell is taken! Pick an empty cell!");
            return;
        }

        _switchPlayerTurn();
        _lastActionErrored = false;
    });

    return { isP1Turn, getP1Name, getP2Name, lastActionErrored };
})();

const displayController = (() => {
    "use strict";
    const _playerTurnDisplay = document.querySelector(".player-turn-display");

    _playerTurnDisplay.textContent = `${gameLogic.getP1Name()}'s Turn!`;

    gameBoard.gridElement.addEventListener("click", (e) => {
        if (e.target.className !== "cell-display") {
            return;
        }

        if (!gameLogic.isP1Turn() && !gameLogic.lastActionErrored()) {
            // Display player 2 since  player 1 just clicked on a cell.
            _playerTurnDisplay.textContent = `${gameLogic.getP2Name()}'s Turn!`;
            e.target.textContent = "O";
        } else if (gameLogic.isP1Turn() && !gameLogic.lastActionErrored()){
            // Display player 1 since player 2 just clicked on a cell.
            _playerTurnDisplay.textContent = `${gameLogic.getP1Name()}'s Turn!`;
            e.target.textContent = "X";
        }
    });
})();

gameBoard.initializeBoardArray();
gameBoard.printBoardArray();