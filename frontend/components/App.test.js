import React from "react"
import { render, screen, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import AppFunctional from "./AppFunctional"

describe('AppFunctional Component', () => {
  test('renders steps, and coordinates', () => {
    render(<AppFunctional />)
    const coordinatesHeading = screen.getByRole('heading', { name: /coordinates \(2, 2\)/i })
    expect(coordinatesHeading).toBeInTheDocument()
    const movesText = screen.getByRole('heading', { name: /you moved 0 times/i })
    expect(movesText).toBeInTheDocument()
    const characterB = screen.getByText('B')
    expect(characterB).toBeInTheDocument()
    const leftButton = screen.getByRole('button', { name: /left/i })
    expect(leftButton).toBeInTheDocument()
    const upButton = screen.getByRole('button', { name: /up/i })
    expect(upButton).toBeInTheDocument()
    const rightButton = screen.getByRole('button', { name: /right/i })
    expect(rightButton).toBeInTheDocument()
    const downButton = screen.getByRole('button', { name: /down/i })
    expect(downButton).toBeInTheDocument()
    const resetButton = screen.getByRole('button', { name: /reset/i })
    expect(resetButton).toBeInTheDocument()
  })
  test('input value changes when typing', () => {
    render(<AppFunctional />)
    const input = screen.getByPlaceholderText(/type email/i)
    fireEvent.change(input, { target: { value: 'test@example.com' } })
    expect(input.value).toBe('test@example.com')
  })
  test('submit button works correctly', async () => {
    render(<AppFunctional />);
    const input = screen.getByPlaceholderText(/type email/i)
    fireEvent.change(input, { target: { value: 'test@example.com' } })
    const submitButton = screen.getByRole('button', { name: /submit/i })
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Success!' }),
      })
    )
    await act(async () => {
      fireEvent.click(submitButton)
    })
    const successMessage = screen.getByText(/success/i)
    expect(successMessage).toBeInTheDocument()
  })
  test('displays error message on failed submit', async () => {
    render(<AppFunctional />)
    const input = screen.getByPlaceholderText(/type email/i)
    fireEvent.change(input, { target: { value: 'test@example.com' } })
    const submitButton = screen.getByRole('button', { name: /submit/i })  
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Error occurred' }),
      })
    )
    await act(async () => {
      fireEvent.click(submitButton)
    })
    const errorMessage = await screen.findByText(/error occurred/i)
    expect(errorMessage).toBeInTheDocument()
  })
  test('sanity', () => {
    expect(true).toBe(true)
  })
})

