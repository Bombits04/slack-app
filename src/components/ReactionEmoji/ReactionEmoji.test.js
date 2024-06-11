import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ReactionEmoji from './ReactionEmoji';

describe('ReactionEmoji component', () => {
  test('renders with emojis', () => {
    const mockOnReact = jest.fn();
    const { getByText } = render(<ReactionEmoji onReact={mockOnReact} />);
    
    expect(getByText('😂')).toBeInTheDocument();
    expect(getByText('❤️')).toBeInTheDocument();
    expect(getByText('👍')).toBeInTheDocument();
  });

  test('calls onReact when emoji is clicked', () => {
    const mockOnReact = jest.fn();
    const { getByText } = render(<ReactionEmoji onReact={mockOnReact} />);
    
    fireEvent.click(getByText('😂'));

    expect(mockOnReact).toHaveBeenCalledWith('😂');
  });
});
