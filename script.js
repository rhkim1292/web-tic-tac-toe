const gameBoard = (() => {
	"use strict";
	const _gameBoardArrayLength = 9;
	var _boardArray = [];

	const initializeBoardArray = function () {
		for (var i = 0; i < _gameBoardArrayLength; i++) {
			_boardArray.push(document.querySelector(`#cell-${i}`));
		}
	};

    const printBoardArray = function () {
        console.log(_boardArray);
    };

	return { initializeBoardArray, printBoardArray };
})();

const gameLogic = (() => {
    "use strict";

})();

const displayController = (() => {
    "use strict";
    const _gameBoardGridElement = document.querySelector(".tic-tac-toe-grid");

    _gameBoardGridElement.addEventListener("click", (e) => {
        if (e.target.className !== "cell-display") {
            return;
        }

        e.target.textContent = "X";
    });
})();

const playerFactory = (name) => {
	return { name };
};

gameBoard.initializeBoardArray();
gameBoard.printBoardArray();