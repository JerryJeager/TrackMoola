export const getPercentage = (expense: number, budget: number) => {
    const total = expense + budget

    const percentage = (expense / total) * 100

    return Math.round(percentage)
}