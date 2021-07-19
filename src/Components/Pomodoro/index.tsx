import React, { useState, useEffect } from 'react'
import {
  Progress,
  Card,
  Typography,
  Button,
  Space
} from 'antd'
import {
  PlayCircleOutlined as IconPlay,
  PauseCircleOutlined as IconPause,
  RedoOutlined as IconReset,
  SettingOutlined as IconSettings
} from '@ant-design/icons'
import rest from '../../Assets/Images/relax.png'
import work from '../../Assets/Images/working.png'
import ModalSettings from './ModalSettings'
import './styles.scss'

interface IPomodoroParameters {
  cycles: number, // number of cycles of work
  workCycleLength: number, // In time
  longBreakCycleLength: number, // short break
  shortBreakCycleLength: number // long break
}

const Pomodoro: React.FC = () => {
  const [parameters, setParameters] = useState<IPomodoroParameters>(
    {
      cycles: 4,
      workCycleLength: 25,
      longBreakCycleLength: 15,
      shortBreakCycleLength: 5
    }
  )
  const [currentCycle, setCurrentCycle] = useState(0)
  const [isRest, setIsRest] = useState(false)
  const [initialTime, setInitialTime] = useState(new Date())
  const [currentTimeSpent, setCurrentTimeSpent] = useState(0)
  const [tick, setTick] = useState(false)
  const [timer, setTimer] = useState<any>(null)
  const [openModal, setOpenModal] = useState(false)

  const resetTimer = () => {
    setInitialTime(new Date())
    setCurrentTimeSpent(0)
  }

  const reset = () => {
    resetTimer()
    setCurrentCycle(0)
    setIsRest(false)
  }

  const isLastCycle = () => {
    return currentCycle === (parameters.cycles - 1)
  }

  const getRestTime = () => {
    if (isLastCycle()) {
      return parameters.longBreakCycleLength
    } else {
      return parameters.shortBreakCycleLength
    }
  }

  const adjustInitialTimer = () => {
    if (currentTimeSpent > 0) {
      const initial = new Date()
      initial.setTime(initial.getTime() - (currentTimeSpent * 1000))
      setInitialTime(initial)
    }
  }

  const play = () => {
    adjustInitialTimer()

    const interval = setInterval(
      () => {
        setTick(tick => {
          return !tick
        })
      },
      1000
    )
    setTimer(interval)
  }

  const pause = () => {
    clearInterval(timer)
    setTimer(null)
  }

  const playPause = () => {
    if (timer === null) {
      play()
    } else {
      pause()
    }
  }

  const buttonSettingsHandler = () => {
    setOpenModal(true)
  }

  const handlerSettingsChange = (data:any) => {
    setParameters(data)
    reset()
    setOpenModal(false)
  }

  useEffect(() => {
    if (isRest) {
      if (currentTimeSpent >= getRestTime()) {
        setIsRest(false)
        if (isLastCycle()) {
          setCurrentCycle(0)
        } else {
          setCurrentCycle(currentCycle + 1)
        }
        resetTimer()
      }
    } else {
      if (currentTimeSpent >= parameters.workCycleLength) {
        setIsRest(true)
        resetTimer()
      }
    }
  }, [currentTimeSpent])

  useEffect(() => {
    setCurrentTimeSpent(() => {
      return Math.floor(((new Date()).getTime() - initialTime.getTime()) / 1000)
    })
  }, [tick])

  useEffect(() => {
    reset()

    // start the clock
    play()

    return () => {
      pause()
    }
  }, [])

  return (
    <>
      <ModalSettings
        onSave={handlerSettingsChange}
        onClose={() => setOpenModal(false)}
        {...parameters}
        visible={openModal}
      />
      <Card className='card-pomodoro'>
        <Typography.Title level={2}>Pomodoro</Typography.Title>
        <div className='pomodoro-icon'>
          <img src={isRest ? rest : work} />
        </div>
        <Typography.Title level={4}>
          {isRest ? 'Relaxe' : 'Trabalhe'}
        </Typography.Title>
        <div className='pomodoro-progress'>
          {
            Array(parameters.cycles * 2).fill(0).map((_, index) => {
              if (index % 2 === 0) {
                if (Math.floor(index / 2) < currentCycle || (Math.floor(index / 2) === currentCycle && isRest)) {
                  return <Progress percent={100} showInfo={false} />
                } else if (Math.floor(index / 2) === currentCycle && !isRest) {
                  return <Progress percent={(currentTimeSpent / parameters.workCycleLength) * 100} showInfo={false} />
                } else {
                  return <Progress percent={0} showInfo={false} />
                }
              } else {
                if (Math.floor(index / 2) < currentCycle) {
                  return <Progress percent={100} showInfo={false} />
                } else if (Math.floor(index / 2) === currentCycle && isRest) {
                  return <Progress percent={(currentTimeSpent / getRestTime()) * 100} showInfo={false} />
                } else {
                  return <Progress percent={0} showInfo={false} />
                }
              }
            })
          }
        </div>
        <div className='pomodoro-commands'>
          <Space>
            <Button onClick={playPause} icon={timer !== null ? <IconPause /> : <IconPlay />}>
              {timer !== null ? 'Pausar' : 'Iniciar'}
            </Button>
            <Button onClick={reset} icon={<IconReset />}>
              Reiniciar
            </Button>
            <Button onClick={buttonSettingsHandler} icon={<IconSettings />}>
              Configurar
            </Button>
          </Space>
        </div>
      </Card>
    </>
  )
}

export default Pomodoro
