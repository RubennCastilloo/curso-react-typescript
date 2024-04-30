import { useState, ChangeEvent, useMemo, FormEvent } from "react"
import { useBudget } from "../hooks/useBudget"

const BudgetForm = () => {

    const [ budget, setBudget ] = useState(0)
    const { dispatch } = useBudget()

    const handleChange = (e :ChangeEvent<HTMLInputElement>) => {
        const budgetValue = !isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : 0
        setBudget(budgetValue)
    }

    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0
    } ,[budget])

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({type: 'add-budget', payload: {budget}})
    }


    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">
                    Definir presupuesto
                </label>
                <input 
                    id="budgetId"
                    type="number"
                    className="w-full bg-white border border-gray-200 p-2"
                    placeholder="Define tu presupuesto"
                    name="budget"
                    value={budget}
                    onChange={handleChange}
                />
            </div>
            <input
                type="submit"
                value="Definir Presupuesto"
                className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer p-2 text-white font-black uppercase rounded disabled:opacity-40"
                disabled={isValid}
            />
        </form>
    )
}

export default BudgetForm