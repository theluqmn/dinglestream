function GetTime() {
    const date = new Date()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    let milliseconds = date.getMilliseconds().toString().padStart(3, '0').slice(0, 2)
    let time = `${hours}:${minutes}:${seconds}.${milliseconds}`

    return time
}

export function LogInfo(message) {
    console.log(`[${GetTime()}][INFO] ${message}`)
}