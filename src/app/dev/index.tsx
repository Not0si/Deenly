import {
  SecondOnlyClock,
  SecondOnlyClockRef,
} from "@/components/elements/global/second-only-clock"
import { Section } from "@/components/elements/global/section"
import {
  ButtonDestructive,
  ButtonIcon,
  ButtonPrimary,
  ButtonSecondary,
} from "@/components/ui/button"
import { Div } from "@/components/ui/div"
import InputDate from "@/components/ui/input-date"
import InputDateTime from "@/components/ui/input-datetime"
import InputNumber from "@/components/ui/input-number"
import { DecimalInput } from "@/components/ui/input-numeric"
import InputText from "@/components/ui/input-text"
import { DifyOutlined } from "@lineiconshq/free-icons"
import { useRef, useState } from "react"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"

export default function Dev() {
  return (
    <>
      <KeyboardAwareScrollView
        bottomOffset={20}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingInline: 20, gap: 80 }}
      >
        <Section title='Buttons' variant='secondary' style={{ gap: 14 }}>
          <ButtonPrimary label='Primary' onPress={() => {}} />
          <ButtonSecondary label='Secondary' onPress={() => {}} />
          <ButtonDestructive label='Destructive' onPress={() => {}} />
          <ButtonIcon icon={DifyOutlined} onPress={() => {}} />
        </Section>

        <ClockSection />

        {/* <MultiColumnTimer /> */}
        <InputText />
        <ButtonPrimary label='Submit' onPress={() => {}} />
        <InputNumberSection />
        <InputDateTime />
        <InputDate />

        <InputText />
      </KeyboardAwareScrollView>
      {/* <KeyboardToolbar /> */}
    </>
  )
}

function ClockSection() {
  const clockRef = useRef<SecondOnlyClockRef>(null)

  return (
    <Section title='Clock' variant='secondary' style={{ gap: 14 }}>
      <SecondOnlyClock
        ref={clockRef}
        clockSize={300}
        initialRunningState={true}
      />

      <Div style={{ gap: 12 }}>
        <ButtonPrimary
          label='Start'
          onPress={() => clockRef.current?.start()}
        />
        <ButtonSecondary
          label='Stop'
          onPress={() => clockRef.current?.stop()}
        />
        <ButtonDestructive
          label='Reset'
          onPress={() => clockRef.current?.reset()}
        />
      </Div>
    </Section>
  )
}

function InputNumberSection() {
  const [num1, setNum1] = useState<number | null>(null)
  const [num2, setNum2] = useState<number | null>(null)
  const [num3, setNum3] = useState<number | null>(null)
  const [num4, setNum4] = useState<number | null>(null)

  const [amount, setAmount] = useState("")

  return (
    <>
      <DecimalInput
        value={amount}
        onChangeText={(text) => {
          setAmount(text)
          console.log("Transformed value:", text)
        }}
      />
      <InputNumber
        type='int'
        value={num1}
        placeholder='int input'
        onChangeValue={(num) => setNum1(num)}
      />
      <InputNumber
        type='uint'
        value={num2}
        placeholder='u int input'
        onChangeValue={(num) => setNum2(num)}
      />
      <InputNumber
        type='float'
        value={num3}
        placeholder='float input'
        onChangeValue={(num) => setNum3(num)}
      />
      <InputNumber
        type='ufloat'
        value={num4}
        placeholder='u float input'
        onChangeValue={(num) => setNum4(num)}
      />
    </>
  )
}
