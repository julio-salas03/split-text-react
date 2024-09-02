import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SplitText, SplitTextProps } from './../src/index';
const meta: Meta<typeof SplitText> = {
  component: SplitText,
};

export default meta;

type Story = StoryObj<typeof SplitText>;

const Component = ({ children, ...rest }: SplitTextProps) => {
  return (
    <div>
      <SplitText {...rest}>{children}</SplitText>
    </div>
  );
};

export const Primary: Story = {
  args: {
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac urna hendrerit, aliquet quam eget, faucibus lectus.',
  },
  render: props => <Component {...props} />,
};
