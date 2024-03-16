export const rewardsCalculation = (staked: string, total: string) => {
    if (staked === "0.0" || total === "0.0") return "0";
    if (staked === "0" || total === "0") return "0";


    let _staked = parseFloat(staked);
    let _total = parseFloat(total);
    return _total - _staked;
}

export const accrualPercentage = (staked: string, total: string) => {
    if (staked === "0.0" || total === "0.0") return "0";
    if (staked === "0" || total === "0") return "0";


    let _staked = parseFloat(staked);
    let _total = parseFloat(total);

    return (((_total - _staked) / _staked) * 100).toFixed(2);
}