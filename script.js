const gameBoard = (() => {
    'use strict';

    var _boardArray = [];
})();

const playerFactory = (name) => {
    return {name};
};

const player1 = playerFactory("Randy");
const player2 = playerFactory("Jimmy");

console.log(player1);
console.log(player2);