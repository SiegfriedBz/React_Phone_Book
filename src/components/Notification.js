import clsx from "clsx"

const Notification = ({flashMessage}) => {

    const { message, type } = flashMessage

    if(!message) return null

    const myBgColor = clsx({
        "#b4e66a": type === "notice", 
        "#f5b642": type === "alert",
    })

    return (
        <div style={{backgroundColor: `${myBgColor}`, marginTop: "1rem", padding: "0.5rem", borderRadius: "0.25rem", textAlign: "center"}}>
            {message}
        </div>
    )
}

export default Notification

