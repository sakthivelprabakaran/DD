import 'react-native';
import React from 'react';
import Card from '../src/components/Card';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Card>
      <Text>Test Content</Text>
    </Card>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
