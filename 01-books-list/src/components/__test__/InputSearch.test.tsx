import { test, describe } from 'vitest'
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { InputSearch } from '../';
import '@testing-library/jest-dom'
 
describe('Test to InputSearch component', () => {
    afterEach(cleanup)
    test('should render', () => {
        render(<InputSearch />)
        const inputSearchElement = screen.getByTestId('inputSearch');
        expect(inputSearchElement).toBeInTheDocument();
    })

    test('should change the state of the input when executing onChange', () => {

        const { getByTestId  } = render(<InputSearch />)
        const inputSearchElement = getByTestId('inputSearch') as HTMLInputElement;
        fireEvent.change(inputSearchElement, { target: { value: 'nuevo valor' } }) 

        expect(inputSearchElement.value).toBe('nuevo valor')

    })
})