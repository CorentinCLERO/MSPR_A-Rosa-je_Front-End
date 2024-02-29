import React from 'react';
import Plantes from './Plantes';
import { render } from '@testing-library/react-native';

describe('Plantes', () => {
  it('Plantes exist', () => {
    const tree = render(<Plantes />);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('should display "Vos plantes :"', () => {
    const { getByText } = render(<Plantes />);
    expect(getByText('Vos plantes :')).toBeTruthy();
  });
});