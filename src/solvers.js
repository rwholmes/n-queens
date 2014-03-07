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

// Function to populate conflict checkers
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

window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  var solution;
  var rowChecker = [];
  var colChecker = [];
  populateCheckers(n, {}, {}, rowChecker, colChecker);

  var place = function(row, board) {
    for (var i=0; i<n; i++) {
      if (!rowChecker[row] && !colChecker[i]) {
        board.togglePiece(row, i);
        rowChecker[row] = colChecker[i] = true;
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
        rowChecker[row] = colChecker[i] = false;
      }
    }
  };
  place(0, $.extend({},board));

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
        rowChecker[row] = colChecker[i] = true;
        if (row < n - 1) {
          row++;
          place(row, $.extend({}, board));
          row--;
        }
        if (row === n - 1) {
          solutionCount++;
        }
        board.togglePiece(row, i);
        rowChecker[row] = colChecker[i] = false;
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
  var majorDiags = {};
  var minorDiags = {};
  var rowChecker = [];
  var colChecker = [];
  populateCheckers(n, majorDiags, minorDiags, rowChecker, colChecker);

  var place = function(row, board) {
    for (var i=0; i<n; i++) {
      if (!rowChecker[row] && !colChecker[i] && !minorDiags[i + row] && !majorDiags[i - row]) {
        board.togglePiece(row, i);
        rowChecker[row] = colChecker[i] = majorDiags[i - row] = minorDiags[i + row] = true;
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
        rowChecker[row] = colChecker[i] = majorDiags[i - row] = minorDiags[i + row] = false;
      }
    }
  };
  place(0, $.extend({},board));
  return solution || board.rows();
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
        rowChecker[row] = colChecker[i] = majorDiags[i - row] = minorDiags[i + row] = true;
        if (row < n - 1) {
          row++;
          place(row, $.extend({}, board));
          row--;
        }
        if (row === n - 1) {
          solutionCount++;
        }
        board.togglePiece(row, i);
        rowChecker[row] = colChecker[i] = majorDiags[i - row] = minorDiags[i + row] = false;
      }
    }
  };
  place(0, $.extend({},board));

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
