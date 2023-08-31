import { test, describe, vi, expect } from 'vitest'
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { LikeComponent } from '../LikeComponent';
import '@testing-library/jest-dom'
 
describe('Test to LikeComponent', () => {
    afterEach(cleanup)
    test('should render LikeComponent', () => {
        const onClickMock = vi.fn()
        render(<LikeComponent isChecked onClickFunction={onClickMock} />)
        const inputSearchElement = screen.getByTestId('like-checkbox');
        expect(inputSearchElement).toBeInTheDocument();
    })

    test('should change the state of the input when executing onChange', () => {
        const onClickMock =  vi.fn()
        const { getByTestId  } = render(<LikeComponent isChecked onClickFunction={onClickMock} />)
        const inputSearchElement = getByTestId('like-checkbox') as HTMLInputElement;

        fireEvent.click(inputSearchElement)
        expect(onClickMock).toHaveBeenCalledTimes(1)
        fireEvent.click(inputSearchElement)
        expect(onClickMock).toHaveBeenCalledTimes(2)

        fireEvent.change(inputSearchElement, { target: { checked: true } }) 
        expect(inputSearchElement.checked).toBe(true)
        fireEvent.change(inputSearchElement, { target: { checked: false } }) 
        expect(inputSearchElement.checked).toBe(false)
    })
    
})