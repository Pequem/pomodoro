import React, { useState } from 'react'
import {
  Modal,
  Space,
  Form,
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

  }

  const handleOk = () => {
    props.onSave(formData)
  }

  return (
    <Modal visible={props.visible} title='Configuração do pomodoro' onCancel={props.onClose} onOk={handleOk}>
      <Space>
        <div>
          <Typography.Text>Ciclos</Typography.Text>
          <input name='shortBreakCycleLength' />
        </div>
        <div>
          <Typography.Text>Tempo de trabalho</Typography.Text>
          <TimerPicker name='workCycleLength' onChange={handleChange} />
        </div>
        <div>
          <Typography.Text>Tempo do intervalo longo</Typography.Text>
          <TimerPicker name='longBreakCycleLength' onChange={handleChange} />
        </div>
        <div>
          <Typography.Text>Tempo do intervalo curto</Typography.Text>
          <TimerPicker name='shortBreakCycleLength' onChange={handleChange} value={} />
        </div>
      </Space>
    </Modal>
  )
}

export default ModalSettings
