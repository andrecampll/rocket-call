import { styled, Heading, Text } from '@rocket-ui/react'

export const Wrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$20',
  maxWidth: 'calc(100vw - (100vw - 1160px) / 2)',
  marginLeft: 'auto',
  height: '100vh',
})

export const Hero = styled('div', {
  maxWidth: '480px',
  padding: '0 $10',

  [`${Heading}`]: {
    '@media(max-width: 600px)': {
      fontSize: '$6xl',
    },
  },

  [`${Text}`]: {
    marginTop: '$2',
    color: '$gray200',
  },
})

export const Preview = styled('div', {
  paddingRight: '$8',
  overflow: 'hidden',

  '@media(max-width: 600px)': {
    display: 'none',
  },
})
