import React from 'react'
import Pomodoro from '../../Components/Pomodoro'
import imgPomodoro from '../../Assets/Images/pomodoro.png'
import './styles.scss'

const Home: React.FC = () => {
  return (
    <div className='content'>
      <div className='align-center'>
        <Pomodoro />
      </div>
      <div className='background'>
        <img src={imgPomodoro} />
      </div>
    </div>
  )
}

export default Home
