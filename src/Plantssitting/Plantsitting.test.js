import React from 'react';
import rendered from 'react-test-renderer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Plantsitting from './Plantsitting';

const plantSittingData = [

];

describe('Plantsitting', () => {
  it('Plantsitting exist', () => {
    const tree = rendered.create(
      <SafeAreaProvider>
        <Plantsitting plantSittingData={plantSittingData} />
      </SafeAreaProvider>
    );
    expect(tree.toJSON()).toBeTruthy();
  });
});