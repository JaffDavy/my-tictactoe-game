let gameBoard = ['', '', '', '', '', '', '', '', '']
let currentPlayer = 'X'
let gameActive = true

// Winning conditions
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const statusDisplay = document.getElementById('game-status')
const cells = document.querySelectorAll('.cell')
const restartButton = document.getElementById('restart-button')

statusDisplay.innerText = 'Player Xs turn'

cells.forEach((cell) => cell.addEventListener('click', handleCellClick))
restartButton.addEventListener('click', restartGame)

function handleCellClick (e) {
  const clickedCell = e.target
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute('data-cell-index')
  )

  // Ignore click if the csll has already been clicked
  if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
    return
  }

  // Update the board state and the UI
  gameBoard[clickedCellIndex] = currentPlayer
  clickedCell.innerText = currentPlayer
  clickedCell.classList.add(currentPlayer.toLowerCase())
  clickedCell.classList.add('filled')

  checkResult()
}

// Check for a winner or draw
function checkResult () {
  let roundWon = false
  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i]
    const pos1 = gameBoard[winCondition[0]]
    const pos2 = gameBoard[winCondition[1]]
    const pos3 = gameBoard[winCondition[2]]

    if (pos1 === '' || pos2 === '' || pos3 === '') {
      continue
    }
    if (pos1 === pos2 && pos2 === pos3) {
      roundWon = true
      break
    }
  }

  if (roundWon) {
    statusDisplay.innerText = `Player ${currentPlayer} has won!`
    gameActive = false
    return
  }

  const roundDraw = !gameBoard.includes('')
  if (roundDraw) {
    statusDisplay.innerText = 'Game ended in a draw!'
    gameActive = false
    return
  }

  // If no win or draw, change player
  changePlayer()
}

// Switch the player
function changePlayer () {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
  statusDisplay.innerText = `Player ${currentPlayer}'s turn`
}

// Reset the game board
function restartGame () {
  gameBoard = ['', '', '', '', '', '', '', '', '']
  gameActive = true
  currentPlayer = 'X'
  statusDisplay.innerText = `Player ${currentPlayer}'s turn`
  cells.forEach((cell) => {
    cell.innerText = ''
    cell.classList.remove('x', 'o', 'filled')
  })
}
