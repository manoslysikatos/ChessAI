minimaxDepth = 1;




function bestMove(){
    var possibleMoves = game.moves();
    //initial infinite value
    var bestMove = -9999;
    var bestMoveFound;
    //for each possible move check which is better with minmax and aplha beta pruning
    for( var i=0; i< possibleMoves.length; i++){
        var possibleNext = possibleMoves[i];
        game.move(possibleNext);
        var value = minmax(minimaxDepth, -10000, 10000, false);
        game.undo();
        if(value >= bestMove){
            bestMove = value;
            bestMoveFound = possibleNext;
        }
    }
    return bestMoveFound;
}

function minmax(depth, alpha, beta, isMaximizing){
    //stops when it reaches the maximum depth
    //change minmaxDepth variable to alternate the depth
    if(depth === 0 ){
        return -evaluateBoard(game.board());
    }
    var nextMoves = game.moves();
    
    if(isMaximizing){
        var bestMove=-9999;
       
        for(var i=0; i < nextMoves.length; i++){
            game.move(nextMoves[i]);
            bestMove = Math.max(bestMove, minmax(depth-1, alpha, beta, !isMaximizing));
            game.undo();
            alpha = Math.max(alpha, bestMove);
            if(beta <= alpha){
                return bestMove;
            }
        }
    }else{
        var bestMove=9999;
        for(var i=0; i < nextMoves.length; i++){
            game.move(nextMoves[i]);
            bestMove = Math.min(bestMove, minmax(depth-1, alpha, beta, !isMaximizing));
            game.undo();
            beta = Math.min(beta, bestMove);
            if(beta <= alpha){
                return bestMove;
            }
        }
    }
    

    return bestMove;

    function evaluateBoard(board){
        var totalEvaluation = 0;
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i, j);
            }
        }
        
        return totalEvaluation;
        
        function getPieceValue(piece, x, y) {
            if (piece === null) {
                return 0;
            }
        
            var absoluteValue = getAbsoluteValue(piece, piece.color === 'w', x ,y);
        
            if(piece.color === 'w'){
                return absoluteValue;
            } else {
                return -absoluteValue;
            }
        };
    };
}






// the evaluation function for minimax

var reverseArray = function(array) {
    return array.slice().reverse();
};

var whitePawnEval =
	    [
	        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
	        [5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
	        [1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
	        [0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
	        [0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
	        [0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
	        [0.5,  1.0,  1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
	        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
	    ];

	var blackPawnEval = reverseArray(whitePawnEval);

	var knightEval =
	    [
	        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
	        [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
	        [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
	        [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
	        [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
	        [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
	        [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
	        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
        ];
    var blackKnightEval = reverseArray(knightEval);

	var whiteBishopEval = [
	    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
	    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
	    [ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
	    [ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
	    [ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
	    [ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
	    [ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
	    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
	];

	var blackBishopEval = reverseArray(whiteBishopEval);

	var whiteRookEval = [
	    [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
	    [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
	    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
	    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
	    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
	    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
	    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
	    [  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
	];

	var blackRookEval = reverseArray(whiteRookEval);

	var evalQueen = [
	    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
	    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
	    [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
	    [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
	    [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
	    [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
	    [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
	    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
    ];
    var blackEvalQueen = reverseArray(evalQueen);

	var whiteKingEval = [

	    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
	    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
	    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
	    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
	    [ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
	    [ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
	    [  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0 ],
	    [  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0 ]
    ];
    var blackKingEval = reverseArray(whiteKingEval);

	


	var getAbsoluteValue = function (piece, isWhite, x ,y) {
        if (piece.type === 'p') {
            return 10 + ( isWhite ? whitePawnEval[y][x] : blackPawnEval[y][x] );
        } else if (piece.type === 'r') {
            return 50 + ( isWhite ? whiteRookEval[y][x] : blackRookEval[y][x] );
        } else if (piece.type === 'n') {
            return 30 + knightEval[y][x];
        } else if (piece.type === 'b') {
            return 30 + ( isWhite ? whiteBishopEval[y][x] : blackBishopEval[y][x] );
        } else if (piece.type === 'q') {
            return 90 + evalQueen[y][x];
        } else if (piece.type === 'k') {
            return 900 + ( isWhite ? whiteKingEval[y][x] : blackKingEval[y][x] );
        }
	};