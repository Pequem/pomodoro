import React, { ChangeEvent, useState } from 'react'
import {
  Modal,
  Space,
  Typography
} from 'antd'
import TimerPicker from '../TimerPicker'

interface IPomodoroSettings {
  cycles: number, // number of cycles of work
  workCycleLength: number, // In time
  longBreakCycleLength: number, // short break
  shortBreakCycleLength: number, // long break
}

interface IProps extends IPomodoroSettings {
  cycles: number, // number of cycles of work
  workCycleLength: number, // In time
  longBreakCycleLength: number, // short break
  shortBreakCycleLength: number, // long break
  visible: boolean,
  onSave: (data: IPomodoroSettings) => void,
  onClose: () => void
}

const ModalSettings: React.FC<IProps> = (props: IProps) => {
  const [formData, setFormData] = useState({
    cycles: props.cycles,
    workCycleLength: props.workCycleLength,
    longBreakCycleLength: props.longBreakCycleLength,
    shortBreakCycleLength: props.shortBreakCycleLength
  })

  const handleChange = (name: string, value: number) => {
    setFormData((data:any) => {
      data[name] = value

      return { ...data }
    })
  }

  const handleOk = () => {
    props.onSave(formData)
  }

  const cyclesHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.replace(/\D/, '')
    setFormData((data:any) => {
      data.cycles = value

      return { ...data }
    })
  }

  return (
    <Modal visible={props.visible} title='Configuração do pomodoro' onCancel={props.onClose} onOk={handleOk}>
      <Space direction='vertical'>
        <Space direction='vertical'>
          <Typography.Text>Ciclos</Typography.Text>
          <input type='text' pattern="[0-9]*" name='shortBreakCycleLength' onChange={(val) => cyclesHandler(val)} value={formData.cycles} />
        </Space>
        <Space direction='vertical'>
          <Typography.Text>Tempo de trabalho</Typography.Text>
          <TimerPicker name='workCycleLength' onChange={handleChange} value={formData.workCycleLength} />
        </Space>
        <Space direction='vertical'>
          <Typography.Text>Tempo do intervalo longo</Typography.Text>
          <TimerPicker name='longBreakCycleLength' onChange={handleChange} value={formData.longBreakCycleLength} />
        </Space>
        <Space direction='vertical'>
          <Typography.Text>Tempo do intervalo curto</Typography.Text>
          <TimerPicker name='shortBreakCycleLength' onChange={handleChange} value={formData.shortBreakCycleLength} />
        </Space>
      </Space>
    </Modal>
  )
}

export default ModalSettings
