import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SplitText, SplitTextProps } from './../src/index';
import { Resizable } from 'react-resizable/';
import 'react-resizable/css/styles.css';

const meta: Meta<typeof SplitText> = {
  component: SplitText,
};

export default meta;

type Story = StoryObj<typeof SplitText>;

const Component = ({ children, ...rest }: SplitTextProps) => {
  const [size, setSize] = React.useState({ width: 300, height: 400 });
  return (
    <>
      <Resizable
        height={size.height}
        width={size.width}
        onResize={(_, { size }) => setSize(size)}
      >
        <div
          className="box"
          style={{
            width: size.width + 'px',
            height: size.height + 'px',
            border: 'solid red 4px',
            padding: '10px',
          }}
        >
          <SplitText {...rest}>{children}</SplitText>
        </div>
      </Resizable>
    </>
  );
};

export const Primary: Story = {
  args: {
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac urna hendrerit, aliquet quam eget, faucibus lectus.',
    WordWrapper: ({ children }) => <span className="word">{children}</span>,
  },
  render: props => <Component {...props} />,
};
