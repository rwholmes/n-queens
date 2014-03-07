/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = [];
  var row = [];
  var rowChecker = [];
  var colChecker = [];
  for (var j=0; j<n; j++) {
    rowChecker.push(false);
    colChecker.push(false);
    row = [];
    for(var i = 0; i < n; i++) {
      row.push(0);
    }
    solution.push(row);
  }
  var loopThroughBoard = function(startR, startC) {
    solution[startR][startC] = 1;
    rowChecker[startR] = true;
    colChecker[startC] = true;
     //row loop
    for (var i = 0; i < n; i++){
      // col loop
      for (var k = 0; k < n; k++){
        if (rowChecker[i] === false && colChecker[k] === false){
          solution[i][k] = 1;
          colChecker[k] = true;
          rowChecker[i] = true;
        }
      }
    }

  };

  loopThroughBoard(0,0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({n: n});
  var solutionCount = 0;
  var rowChecker = [];
  var colChecker = [];

  populateCheckers(n, {}, {}, rowChecker, colChecker);

  var place = function(row, board) {
    for (var i=0; i<n; i++) {
      if (!rowChecker[row] && !colChecker[i]) {
        board.togglePiece(row, i);
        rowChecker[row] = true;
        colChecker[i] = true;
        if (row < n - 1) {
          row++;
          place(row, $.extend({}, board));
          row--;
        }
        if (row === n - 1) {
          solutionCount++;
        }
        board.togglePiece(row, i);
        rowChecker[row] = false;
        colChecker[i] = false;
      }
    }
  };
  place(0, $.extend({},board));

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var solution;

  var place = function(row, board) {
    for (var i=0; i<n; i++) {
      board.togglePiece(row, i);
      if (board.hasRowConflictAt(row) || board.hasColConflictAt(i) || board.hasMajorDiagonalConflictAtIndices(row, i) || board.hasMinorDiagonalConflictAtIndices(row, i)) {
        board.togglePiece(row, i);
      } else {
        if (row < n - 1) {
          row++;
          place(row, $.extend({}, board));
          row--;
        }
        if (row === n - 1) {
          solution = board.rows();
          return;
        }
        board.togglePiece(row, i);
      }
    }
  };
  place(0, $.extend({},board));
  return solution || board.rows();
};

var populateCheckers = function(n, majorDiags, minorDiags, rowChecker, colChecker) {
  for (var i = (-n + 1); i < n; i++) {
    majorDiags[i] = false;
  }
  for (var j=0; j<=(n-1)*2; j++) {
    minorDiags[j] = false;
  }
  for (var k = 0; k < n; k++) {
    rowChecker.push(false);
    colChecker.push(false);
  }
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board({n: n});
  var solutionCount = 0;
  var majorDiags = {};
  var minorDiags = {};
  var rowChecker = [];
  var colChecker = [];

  populateCheckers(n, majorDiags, minorDiags, rowChecker, colChecker);

  if (n === 0 || n === 1) {
    return 1;
  }

  var place = function(row, board) {
    for (var i=0; i<n; i++) {
      if (!rowChecker[row] && !colChecker[i] && !minorDiags[i + row] && !majorDiags[i - row]) {
        board.togglePiece(row, i);
        rowChecker[row] = true;
        colChecker[i] = true;
        majorDiags[i - row] = true;
        minorDiags[i + row] = true;
        if (row < n - 1) {
          row++;
          place(row, $.extend({}, board));
          row--;
        }
        if (row === n - 1) {
          solutionCount++;
        }
        board.togglePiece(row, i);
        rowChecker[row] = false;
        colChecker[i] = false;
        majorDiags[i - row] = false;
        minorDiags[i + row] = false;
      }
    }
  };
  place(0, $.extend({},board));

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
