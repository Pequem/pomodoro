import React, { useRef, useEffect, useState, MouseEvent } from 'react'
import {
  Card,
  Button,
  Space,
  Typography
} from 'antd'
import {
  UpOutlined as IconUp,
  DownOutlined as IconDown
} from '@ant-design/icons'
import './styles.scss'

interface IProps {
  name: string,
  onChange: (name: string, value: number) => void,
  value: number
}

const TimerPicker: React.FC<IProps> = (props: IProps) => {
  const [value, setValue] = useState(props.value)
  const [pickerVisible, setPickerVisible] = useState(false)
  const input = useRef<HTMLInputElement>(null)
  const picker = useRef<HTMLDivElement>(null)

  const inputClickHandler = (e: Event) => {
    e.stopPropagation()
    setPickerVisible(true)
  }

  const documentClickHandler = () => {
    setPickerVisible(false)
  }

  const upHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setValue(value + 1)
  }

  const downHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (value === 0) return
    setValue(value - 1)
  }

  useEffect(() => {
    props.onChange(props.name, value)
  }, [value])

  useEffect(() => {
    if (input.current) {
      input.current.addEventListener('click', inputClickHandler)
      document.addEventListener('click', documentClickHandler)
    }

    return () => {
      if (input.current) {
        input.current.removeEventListener('click', inputClickHandler)
        document.removeEventListener('click', documentClickHandler)
      }
    }
  }, [])

  return (
    <>
      <input type='text' name={props.name} ref={input} value={value} />
      <div ref={picker}>
        <Card className='picker' style={{ display: pickerVisible ? 'block' : 'none' }}>
          <Space direction='vertical' align='center'>
            <Button onClick={upHandler} icon={<IconUp />} />
            <Typography.Text>{value} segundos.</Typography.Text>
            <Button onClick={downHandler} icon={<IconDown />} />
          </Space>
        </Card>
      </div>
    </>
  )
}

export default TimerPicker
