import { Input, Label, TextArea } from '.';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

describe('Form primitives', () => {
  it('associates labels with their fields and forwards native attributes', () => {
    render(
      <>
        <Label htmlFor='name'>Name</Label>
        <Input id='name' name='name' placeholder='Jane' className='custom' />
        <Label htmlFor='message'>Message</Label>
        <TextArea id='message' name='message' rows={4} />
      </>
    );

    const input = screen.getByLabelText('Name');
    expect(input).toHaveAttribute('placeholder', 'Jane');
    expect(input).toHaveClass('custom');
    expect(screen.getByLabelText('Message')).toHaveAttribute('rows', '4');
  });

  it('marks required labels with a decorative asterisk only', () => {
    render(
      <Label htmlFor='email' required>
        Email
      </Label>
    );

    const asterisk = screen.getByText('*');
    expect(asterisk).toHaveAttribute('aria-hidden', 'true');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <form>
        <Label htmlFor='email' required>
          Email
        </Label>
        <Input id='email' type='email' required />
        <Label htmlFor='body'>Body</Label>
        <TextArea id='body' />
      </form>
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
