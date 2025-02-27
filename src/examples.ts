import { LifeEvent } from './interfaces'
import { appendEventToSquare } from "./functions"

const examples = {
  president: {
    'yes-yes': [
      { value: 1, desc: 'I will be president of the most powerful country in the world' },
      { value: -1, desc: 'I will have to work way harder than now ' },
      { value: -1, desc: 'I will have to work on things that are way harder than this' },
      { value: 1, desc: 'I will get to move around in "the Beast"' },
      { value: 1, desc: 'Marine One!!!' },
      { value: -1, desc: 'I will have to wear suites every day' },
      { value: -1, desc: 'I will have to think a lot before talking' },
    ],
    'no-yes': [
      { value: 1, desc: 'I will be able to travel and live where I want' },
      { value: 1, desc: 'I will continue doing what I love' },
      { value: 1, desc: 'I can sleep and wake up whenever I want' },
    ],
    'yes-no': [
      { value: 1, desc: "I won\'t have to pay rent" },
      { value: -1, desc: "I won\'t be able to write code any more" },
    ],
    'no-no': [
      { value: 1, desc: "I won't have to think about issues I don't care about" },
      { value: -1, desc: "I won't be able to see the oval office" },
    ],
  },
  sports: {
    'yes-yes': [
      { value: 1, desc: 'I will feel better' },
      { value: 1, desc: 'I will be healthier' },
      { value: 1, desc: 'I will probably look better' },
      { value: -1, desc: 'I will have to actually do it' },
    ],
    'no-yes': [
      { value: 1, desc: 'I will have more time to spend on other stuff' },
      { value: -1, desc: 'I will get less and less healthy with time' },
    ],
    'yes-no': [
      { value: -1, desc: "I won't be able to watch so many TV shows" },
      { value: 1, desc: "I won't get breathless every time I climb 2 stairs" },
    ],
    'no-no': [
      { value: 1, desc: "I won't accidentally hurt myself during workouts" },
      { value: -1, desc: "I won't get any stronger than I am now" },
    ],
  }
}

export const showExample = (button: HTMLButtonElement) => {
  document.querySelectorAll('.events')
    .forEach((wrapper: HTMLElement) => wrapper.innerText = '')

  const example = button.dataset.example

  Object.keys(examples[example]).forEach(key => {
    const square: HTMLElement = document.querySelector(`[data-square="${key}"]`)
    const events = examples[example][key]
    events.forEach((event: LifeEvent) => appendEventToSquare(event, square))
  })
}
