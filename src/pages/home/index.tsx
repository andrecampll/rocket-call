import { Heading, Text } from '@rocket-ui/react'
import Image from 'next/image'

import previewImage from '../../assets/app-preview.png'

import * as S from './styles'

export default function Home() {
  return (
    <S.Wrapper>
      <S.Hero>
        <Heading as="h1" size="4xl">
          Uncomplicated scheduling
        </Heading>
        <Text size="xl">
          Connect your calendar and let people book appointments in your free
          time.
        </Text>
      </S.Hero>

      <S.Preview>
        <Image
          src={previewImage}
          alt="Calendar symbolizing application in operation"
          height={400}
          quality={100}
          priority
        />
      </S.Preview>
    </S.Wrapper>
  )
}
