require("dotenv").config()

export const response = (msg, arr, state) => {
    fetch(`https://api.monkedev.com/fun/chat?msg=${msg}&key=${process.env.REACT_APP_API_KEY}`, {mode: 'cors'})
    .then((res) => res.json())
    .then((res) => {
        const updatedMsgArray =[...arr, {
            bot: true,
            msg: res.response,
            id: arr.length,
        }]
        console.log(res)
        state(updatedMsgArray)
    })
}