import { useState } from "react"

export default function QuestionsComponent() {
  const [numberOfTimes, changeNumberOfTimes] = useState(0)

  // events handlers go here...

  function handleClick() {
    changeNumberOfTimes( numberOfTimes + 1 )
  }

  return (
    <div>
      <p onClick={handleClick}>
        You have clicked me {numberOfTimes}
      </p>
    </div>
  )
}
