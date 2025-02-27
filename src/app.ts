import { showExample } from "./examples"
import { addEvent, setScore } from "./functions"

(() => {
  document.querySelectorAll('.square footer button')
    .forEach((addEventButton: HTMLButtonElement) => {
      addEventButton.addEventListener('click', () => {
        addEvent(addEventButton)
        setScore()
      })
    })

  document.querySelectorAll('[data-example]')
    .forEach((exampleButton: HTMLButtonElement) => {
      exampleButton.addEventListener('click', () => {
        showExample(exampleButton)
        setScore()
        document.getElementById('square').scrollIntoView({ behavior: 'smooth' })
      })
    })

  document.addEventListener('click', (e: MouseEvent) => {
    const eventTarget = e.target as HTMLElement
    if (eventTarget.classList.contains('remove-event')) {
      eventTarget.parentElement.parentElement.removeChild(eventTarget.parentElement)
      setScore()
    }
  })

  document.addEventListener('change', (e: MouseEvent) => {
    const eventTarget = e.target as HTMLElement
    if (eventTarget.classList.contains('value') && eventTarget.closest('.event')) {
      setScore()
    }
  })
})()
