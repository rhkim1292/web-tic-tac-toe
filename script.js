const playerFactory = (name, wins) => {
	return { name, wins };
};

const gameBoard = (() => {
	"use strict";
	const _arrayLength = 9;
	var _array = [];
	const gridElement = document.querySelector(".tic-tac-toe-grid");

	const initializeArray = function () {
		for (var i = 0; i < _arrayLength; i++) {
			_array.push(document.querySelector(`#cell-${i}`));
		}
	};

	const getCurrArray = function () {
		return _array;
	};

	const getArrayLength = function () {
		return _arrayLength;
	};

	return { initializeArray, getCurrArray, getArrayLength, gridElement };
})();

const gameLogic = (() => {
	"use strict";

	var _p1Turn = true;
	var _gameEnd = false;
	var _gameTied = false;
	var _lastActionErrored = false;
	var _turnsPlayed = 0;
	const _winCases = new Set([
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	]);
	const _createWinCaseSetArray = function () {
		var res = [];

		for (var i = 0; i < gameBoard.getArrayLength(); i++) {
			res.push(new Set());
		}

		for (const currWinCase of _winCases) {
			currWinCase.forEach((val) => {
				res[val].add(currWinCase);
			});
		}

		return res;
	};
	const _winCaseSetArray = _createWinCaseSetArray();
    const _newGameBtn = document.querySelector("#new-game-btn");

	const _player1 = playerFactory(prompt("Player 1, Enter your name"), 0);
	const _player2 = playerFactory(prompt("Player 2, Enter your name"), 0);

	const _switchPlayerTurn = function () {
		_p1Turn = !_p1Turn;
	};

	const _cellIsOccupied = function (selectedCell) {
		if (selectedCell.className !== "cell-display") {
			throw "Parameter is not a cell display element!";
		}

		if (
			selectedCell.textContent === "X" ||
			selectedCell.textContent === "O"
		) {
			return true;
		} else if (selectedCell.textContent === "") {
			return false;
		} else {
			throw "Unrecognized text content within cell display!";
		}
	};

	const _checkIfGameEnded = function (lastClickedCell) {
		const currArr = gameBoard.getCurrArray();
		const setOfWinCases =
			_winCaseSetArray[currArr.indexOf(lastClickedCell)];
		var currSymbolToCheck = _p1Turn ? "O" : "X";
		var passes = 0;

		for (const winCase of setOfWinCases) {
			for (const idxOfBoardArrayCell of winCase) {
				if (
					currArr.indexOf(lastClickedCell) === idxOfBoardArrayCell ||
					currArr[idxOfBoardArrayCell].children[0].textContent ===
						currSymbolToCheck
				) {
					passes++;
					if (passes === 3) {
						_gameEnd = true;
						passes = 0;
                        if (currSymbolToCheck === "O") {
                            _player1.wins++;
                        } else if (currSymbolToCheck === "X") {
                            _player2.wins++;
                        }
						break;
					}
					continue;
				} else if (
					currArr[idxOfBoardArrayCell].children[0].textContent !==
					currSymbolToCheck
				) {
					passes = 0;
					break;
				}
			}
		}

		if (_turnsPlayed === 9 && !_gameEnd) {
			_gameEnd = true;
			_gameTied = true;
		}
	};

	const isP1Turn = function () {
		return _p1Turn;
	};

	const getP1Name = function () {
		return _player1.name;
	};

    const getP1Wins = function () {
        return _player1.wins;
    };

	const getP2Name = function () {
		return _player2.name;
	};

    const getP2Wins = function () {
        return _player2.wins;
    };

	const lastActionErrored = function () {
		return _lastActionErrored;
	};

	const gameIsTied = function () {
		return _gameTied;
	};

	const gameHasEnded = function () {
		return _gameEnd;
	};

	gameBoard.gridElement.addEventListener("click", (e) => {
		if (e.target.className !== "cell-display" || _gameEnd) {
			return;
		}

		if (_cellIsOccupied(e.target)) {
			_lastActionErrored = true;
			alert("That cell is taken! Pick an empty cell!");
			return;
		}

		_turnsPlayed++;
		_checkIfGameEnded(e.target.parentElement);
		_switchPlayerTurn();
		_lastActionErrored = false;
	});

    _newGameBtn.addEventListener("click", (e) => {
        _turnsPlayed = 0;
        _gameEnd = false;
        _p1Turn = true;
        _gameTied = false;
    });

	return {
		isP1Turn,
		getP1Name,
        getP1Wins,
		getP2Name,
        getP2Wins,
		lastActionErrored,
		gameIsTied,
		gameHasEnded,
	};
})();

const displayController = (() => {
	"use strict";
	const _playerTurnDisplay = document.querySelector(".player-turn-display");
    const _newGameBtn = document.querySelector("#new-game-btn");
	var _gameEnd = false;

	_playerTurnDisplay.textContent = `${gameLogic.getP1Name()}'s Turn!`;

	gameBoard.gridElement.addEventListener("click", (e) => {
		if (e.target.className !== "cell-display" || _gameEnd) {
			return;
		}

		if (!gameLogic.isP1Turn() && !gameLogic.lastActionErrored()) {
			// Display player 2 since  player 1 just clicked on a cell
			_playerTurnDisplay.textContent = `${gameLogic.getP2Name()}'s Turn!`;
			e.target.textContent = "O";
		} else if (gameLogic.isP1Turn() && !gameLogic.lastActionErrored()) {
			// Display player 1 since player 2 just clicked on a cell
			_playerTurnDisplay.textContent = `${gameLogic.getP1Name()}'s Turn!`;
			e.target.textContent = "X";
		}

		if (gameLogic.gameHasEnded()) {
			if (gameLogic.gameIsTied()) {
				_playerTurnDisplay.textContent = "Game ends in a tie!";
				_gameEnd = true;
				return;
			}
			_playerTurnDisplay.textContent = gameLogic.isP1Turn()
				? `${gameLogic.getP2Name()} Wins!`
				: `${gameLogic.getP1Name()} Wins!`;
            _newGameBtn.style.display = "block"; // Show the New Game button
			_gameEnd = true;
		}

        _newGameBtn.addEventListener("click", (e) => {
            // Clear the text content in every cell
            const gridChildren = Array.from(gameBoard.gridElement.children);
            gridChildren.forEach((currCell) => {
                currCell.children[0].textContent = "";
            });
            _playerTurnDisplay.textContent = `${gameLogic.getP1Name()}'s Turn!`;
            _newGameBtn.style.display = "none";
            _gameEnd = false;
        });
	});
})();

gameBoard.initializeArray();
