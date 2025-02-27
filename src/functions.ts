import { LifeEvent } from './interfaces'

const COLORS = {
  positive: ['bg-green-50', 'text-green-900'],
  negative: ['bg-red-50', 'text-red-900'],
}

export const addEvent = (addEventButton: HTMLButtonElement) => {
  const wrapper = addEventButton.parentElement

  const valueInput: HTMLInputElement = wrapper.querySelector('.value')
  valueInput.classList.remove('border', 'border-red-500')
  const value = parseInt(valueInput.value || '')

  const descInput: HTMLInputElement = wrapper.querySelector('.desc')
  descInput.classList.remove('border', 'border-red-500')
  const desc = descInput.value || ''

  if (!value) {
    valueInput.classList.add('border', 'border-red-500')
    return
  }
  if (!desc) {
    descInput.classList.add('border', 'border-red-500')
    return
  }

  appendEventToSquare({
    desc: desc,
    value: value
  }, addEventButton.closest('.square'))

  valueInput.value = '1'
  descInput.value = ''
}

export const appendEventToSquare = (event: LifeEvent, square: HTMLElement) => {
  const wrapper = document.createElement('div')
  wrapper.classList.add('event', 'flex', 'items-center', 'mb-2')

  const value = document.createElement('input')
  value.classList.add('value', 'w-12', 'text-center', 'text-slate-900', 'bg-blue-200')
  value.value = event.value.toString()
  wrapper.appendChild(value)

  const desc = document.createElement('input')
  desc.value = event.desc
  const colors = event.value > 0 ? COLORS.positive : COLORS.negative
  desc.classList.add('desc', 'h-7', 'w-[calc(100%-76px)]', 'pl-2', ...colors)
  wrapper.appendChild(desc)

  const button = document.createElement('button')
  button.innerHTML = '&times;'
  button.classList.add('remove-event', 'h-7', 'flex', 'items-center', 'px-2', 'border-none', 'bg-blue-200', 'text-amber-800')
  wrapper.appendChild(button)

  square.querySelector('.events').appendChild(wrapper)
}

const getTotals = () => {
  let count = 0
  let total = 0

  document.querySelectorAll('[data-square]').forEach(square => {
    const events = square.querySelectorAll('.event')

    if (events.length) {
      events.forEach(event => {
        const input: HTMLInputElement = event.querySelector('.value')
        const value = parseInt(input.value || '0')
        if (!isNaN(value)) {
          count++

          const square: HTMLElement = event.closest('[data-square]')
          total += square.dataset.square.startsWith('yes') ? value : -value
        }
      })
    }
  })

  return { count, total }
}

export const setScore = () => {
  const { count, total } = getTotals()

  const valueElement: HTMLElement = document.querySelector('[data-score] .value')
  const descElement: HTMLElement = document.querySelector('[data-score] .desc')
  const scoreElement: HTMLElement = document.querySelector('[data-score] .score')
  scoreElement.classList.remove(...COLORS.positive, ...COLORS.negative)

  if (count) {
    descElement.innerText = total === 0 ? 'Add at least one more event to calculate the score' : 'YOUR SCORE: '
    valueElement.innerText = total.toString() || ''

    let scoreDescription = ''
    if (total > 0) scoreDescription = '👍 You should do it.'
    if (total < 0) scoreDescription = '👎 You should not do it.'
    const colors = total > 0 ? COLORS.positive : (total < 0 ? COLORS.negative : '')
    scoreElement.classList.add(...colors)
    scoreElement.innerText = scoreDescription
  } else {
    descElement.innerText = 'Add events to calculate the score'
    valueElement.innerText = ''
    scoreElement.innerText = ''
  }
}
