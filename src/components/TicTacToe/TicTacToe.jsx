import React, {useState, useRef} from 'react'
import './TicTacToe.css'
import o from '../assets/o.png'
import x from '../assets/x.png'
import Modal from './Modal'

/** Board
 * 0  1  2
 * 3  4  5
 * 6  7  8
 */
let board = ["","","","","","","","",""]

export const TicTacToe = () => {
  
  let [count, setCount] = useState(0)
  let [lock, setLock] = useState(false)
  let titleRef = useRef(null)
  let [winner, setWinner] = useState(null)
  let [modalVisible, setModalVisible] = useState(false)
  
  //define box ref array for reset
  let box0 = useRef(null)
  let box1 = useRef(null)
  let box2 = useRef(null)
  let box3 = useRef(null)
  let box4 = useRef(null)
  let box5 = useRef(null)
  let box6 = useRef(null)
  let box7 = useRef(null)
  let box8 = useRef(null)
  let boxes = [box0, box1, box2, box3, box4, box5, box6, box7, box8]

  //handle each action
  const toggle = (e, num) => {
    if (board[num] !== "") return 0
    if (lock) return 0
    if (count === 8) handleTie()

    if (count % 2 === 0){
      e.target.innerHTML = `<img src='${x}'>`
      board[num] = "x"
      setCount(++count)
    }
    else{
      e.target.innerHTML = `<img src='${o}'>`
      board[num] = "o"
      setCount(++count)
    }
    checkWin()
  }
  
  const checkWin = () => {
    //horizontal
    if (board[0] === board[1] && board[1] === board[2] && board[2] !== ""){
      handleWin(board[0])
    } else if (board[3] === board[4] && board[4] === board[5] && board[5] !== ""){
      handleWin(board[3])
    } else if (board[6] === board[7] && board[7] === board[8] && board[8] !== ""){
      handleWin(board[6])
    
    //vertical
    } else if (board[0] === board[3] && board[3] === board[6] && board[6] !== ""){
      handleWin(board[0])
    } else if (board[1] === board[4] && board[4] === board[7] && board[7] !== ""){
      handleWin(board[1])
    } else if (board[2] === board[5] && board[5] === board[8] && board[8] !== ""){
      handleWin(board[2])

    //diagonal
    } else if (board[0] === board[4] && board[4] === board[8] && board[8] !== ""){
      handleWin(board[0])
    } else if (board[2] === board[4] && board[4] === board[6] && board[6] !== ""){
      handleWin(board[2])
    }
  }

  const handleWin = (winner) => {
    setLock(true)
    if (winner === "x") setWinner("X")
    else if (winner === "o") setWinner("O")
    setModalVisible(true)
  }

  const handleTie = () => {
    setLock(true)
    setWinner("Nobody")
    setModalVisible(true)
  }

  const reset = () => {
    setLock(false)
    for(let i=0; i<board.length; i++){
      board[i] = ""
    }
    boxes.map((e)=>{
      e.current.innerHTML = ""
    })
    setCount(0)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  return (
    <div className='container'>
      <h1 className='title' ref={titleRef}>
        Tic Tac Toe  
      </h1>
      <div className='board'>
        <div className="row1">
          <div className="boxes" ref={box0} onClick={(e)=>{toggle(e,0)}}/>
          <div className="boxes" ref={box1} onClick={(e)=>{toggle(e,1)}}/>
          <div className="boxes" ref={box2} onClick={(e)=>{toggle(e,2)}}/>
        </div>
        <div className="row2">
          <div className="boxes" ref={box3} onClick={(e)=>{toggle(e,3)}}/>
          <div className="boxes" ref={box4} onClick={(e)=>{toggle(e,4)}}/>
          <div className="boxes" ref={box5} onClick={(e)=>{toggle(e,5)}}/>
        </div>
        <div className="row3">
          <div className="boxes" ref={box6} onClick={(e)=>{toggle(e,6)}}/>
          <div className="boxes" ref={box7} onClick={(e)=>{toggle(e,7)}}/>
          <div className="boxes" ref={box8} onClick={(e)=>{toggle(e,8)}}/>
        </div>
      </div>
      <button className="reset" onClick={reset}>Reset</button>
      {modalVisible && <Modal winner={winner} onClose={closeModal}/>}
    </div>
  )
}
