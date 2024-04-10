import type { Dispatch, SetStateAction } from "react"

const tipOptions = [
    {
      id: 'tip-10',
      value: .10,
      label: '10%'
    },
    {
      id: 'tip-20',
      value: .20,
      label: '20%'
    },
    {
      id: 'tip-50',
      value: .50,
      label: '50%'
    },
  ]

  type TipPercentajeFormProps = {
    setTip: Dispatch<SetStateAction<number>>
    tip: number
  }

const TipPercentajeForm = ({setTip, tip} : TipPercentajeFormProps) => {

  return (
    <div>
        <h3 className="font-black text-2xl">Propina</h3>

        <form>
            {tipOptions.map(tipOption => (
                <div 
                    key={tipOption.id}
                    className="flex gap-2"
                >
                    <label htmlFor={tipOption.id}>{tipOption.label}</label>
                    <input 
                        id={tipOption.id}
                        type="radio"
                        name="tip"
                        value={tipOption.value}
                        onChange={ e => setTip(+e.target.value)} // El + convierte el valor extraido a un dato de tipo number
                        checked={tipOption.value === tip}
                    />
                </div>
            ))}
        </form>
    </div>
  )
}

export default TipPercentajeForm