export const getGreeting  = () => {
    let currentTime = new Date()
    if(currentTime.getHours() >= 0 && currentTime.getHours() < 12)
        return 'Good Morning,'
    else if(currentTime.getHours() >= 12 && currentTime.getHours() < 18)
        return 'Good Afternoon,'
    else
        return 'Good Evening,'
}