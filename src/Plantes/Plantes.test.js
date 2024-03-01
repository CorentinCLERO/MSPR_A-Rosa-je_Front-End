import React from 'react';
import Plantes from './Plantes';
import { render } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const mockPlantList = [
  {
    id: 1,
    name: 'Cactus',
    variety: 'Saguaro',
    movable: true,
    url: 'https://example.com/cactus.jpg'
  },
  {
    id: 2,
    name: 'Rose',
    variety: 'Rose rouge',
    movable: false,
    url: 'https://example.com/rose.jpg'
  }
];

describe('Plantes', () => {
  it('Plantes exist', () => {
    const tree = render(
      <SafeAreaProvider>
        <Plantes plantList={mockPlantList} />
      </SafeAreaProvider>
    );
    expect(tree.toJSON()).toBeTruthy();
  });

  it('should display "Vos plantes :"', () => {
    const { findByText } = render(
      <SafeAreaProvider>
        <Plantes plantList={mockPlantList} />
      </SafeAreaProvider>
    );
    expect(findByText('Vos plantes :')).toBeTruthy();
  });

  it('displays the plant cards correctly', () => {
    const { findByText } = render(
      <SafeAreaProvider>
        <Plantes plantList={mockPlantList} deletePlant={() => { }} />
      </SafeAreaProvider>
    );
    const plantName = findByText(mockPlantList[0].variety);
    expect(plantName).toBeTruthy();
  });
});