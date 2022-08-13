const gameBoard = (() => {
	"use strict";
	const _gameBoardArrayLength = 9;
	var _boardArray = [];

	const initializeBoardArray = function () {
		for (var i = 0; i < _gameBoardArrayLength; i++) {
			_boardArray.push(document.querySelector(`#cell-${i}`));
		}
	};

	const getBoardArray = () => {
		return _boardArray;
	};

	return { getBoardArray, initializeBoardArray };
})();

const playerFactory = (name) => {
	return { name };
};

gameBoard.initializeBoardArray();
const player1 = playerFactory("Randy");
const player2 = playerFactory("Jimmy");