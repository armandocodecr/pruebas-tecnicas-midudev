import { test, describe } from 'vitest'
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { LikeComponent } from '../LikeComponent';
import '@testing-library/jest-dom'
 
describe('Test to LikeComponent', () => {
    afterEach(cleanup)
    test('should render LikeComponent', () => {
        let isLiked = false
        const onChangeLiked = () =>  isLiked = !isLiked
        render(<LikeComponent isChecked onClickFunction={onChangeLiked} />)
        const inputSearchElement = screen.getByTestId('like-checkbox');
        expect(inputSearchElement).toBeInTheDocument();
    })

    test('should change the state of the input when executing onChange', () => {

        let isLiked = false
        const onChangeLiked = () =>  isLiked = !isLiked
        const { getByTestId  } = render(<LikeComponent isChecked={isLiked} onClickFunction={onChangeLiked} />)
        const inputSearchElement = getByTestId('like-checkbox') as HTMLInputElement;
        fireEvent.change(inputSearchElement, { target: { checked: true } }) 
        fireEvent.change(inputSearchElement, onChangeLiked()) 

        expect(isLiked).toBe(true)
        expect(inputSearchElement.checked).toBe(true)

    })
    
})