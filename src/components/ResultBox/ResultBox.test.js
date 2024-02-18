import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ResultBox from './ResultBox';

const testCases = [
  { amount: '100', from: 'PLN', to: 'USD' },
  { amount: '20', from: 'USD', to: 'PLN' },
  { amount: '200', from: 'PLN', to: 'USD' },
  { amount: '345', from: 'USD', to: 'PLN' },
];

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from='PLN' to='USD' amount={1} />);
  });
  for (const testObj of testCases) {
    it('should display correct message from PLN to USD', () => {
      render(<ResultBox from='PLN' to='USD' amount={100} />);

      const dataBox = screen.getByTestId('box-select');

      expect(dataBox).toHaveTextContent('PLN 100.00 = $28.57');
      cleanup();
    });

    it('should display correct message from USD to PLN', () => {
      render(<ResultBox from='USD' to='PLN' amount={100} />);

      const dataBox = screen.getByTestId('box-select');

      expect(dataBox).toHaveTextContent('$100.00 = PLN 350.00');
      cleanup();
    });

    it('should return same value if from === to', () => {
      render(<ResultBox from='USD' to='USD' amount={100} />);

      const dataBox = screen.getByTestId('box-select');

      expect(dataBox).toHaveTextContent('$100.00 = $100.00');
      cleanup();
    });
  }

  it('display error when amount is below 0', () => {
    render(<ResultBox from='USD' to='PLN' amount={-100} />);

    const dataBox = screen.getByTestId('box-select');

    expect(dataBox).toHaveTextContent('Wrong value...');
  });
});