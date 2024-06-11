import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddChannelModal from './AddChannelModal';

describe('AddChannelModal', () => {
  const props = {
    user: { id: 1, uid: 'user1' },
    userList: [
      { id: 1, uid: 'user1' },
      { id: 2, uid: 'user2' },
      { id: 3, uid: 'user3' },
    ],
    setAddNewChannelFlag: jest.fn(),
  };

  it('opens modal when "Create Channel" icon is clicked', async () => {
    render(<AddChannelModal {...props} />);
    
    await waitFor(() => {
      expect(screen.getByTestId('channel-icon')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('channel-icon'));

    expect(screen.getByText('Create New Channel')).toBeInTheDocument();
  });
});
