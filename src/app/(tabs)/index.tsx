import { Image } from 'expo-image';

import ParallaxScrollView from '@/components/elements/common/parallax-scroll-view';
import { Message } from '@/components/ui/message';

export default function HomeScreen() {


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}

        />
      }>
      <Message type="subtitle">Step 1: Try it</Message>

    </ParallaxScrollView>
  );
}


