// @ts-expect-error -- test-only package is not installed in this repository
import { act, beforeEach, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect } from 'vitest';

beforeEach(() => {
  render(<button>Save</button>);
});

void async function example() {
  const view = render(<button>Save</button>);

  await fireEvent.click(view.getByText(/save/g));
  await screen.getByText('Save');

  waitFor(() => {
    expect(screen.getByText('Save')).toBeTruthy();
    expect(screen.queryByText('Done')).toBeNull();
    fireEvent.click(screen.getByText('Save'));
  });

  act(() => {
  });

  waitFor(() => expect(view.container.firstChild).toMatchSnapshot());

  screen.getByText('Save').closest('button');
};
