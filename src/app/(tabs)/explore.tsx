import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { ExternalLink } from '@/components/elements/common/external-link';
import ParallaxScrollView from '@/components/elements/common/parallax-scroll-view';
import { Collapsible } from '@/components/ui/collapsible';
import { Div } from '@/components/ui/div';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Message } from '@/components/ui/message';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <Div style={styles.titleContainer}>
        <Message
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Explore
        </Message>
      </Div>
      <Message>This app includes example code to help you get started.</Message>
      <Collapsible title="File-based routing">
        <Message>
          This app has two screens:{' '}
          <Message type="defaultSemiBold">app/(tabs)/index.tsx</Message> and{' '}
          <Message type="defaultSemiBold">app/(tabs)/explore.tsx</Message>
        </Message>
        <Message>
          The layout file in <Message type="defaultSemiBold">app/(tabs)/_layout.tsx</Message>{' '}
          sets up the tab navigator.
        </Message>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <Message type="link">Learn more</Message>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <Message>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <Message type="defaultSemiBold">w</Message> in the terminal running this project.
        </Message>
      </Collapsible>
      <Collapsible title="Images">
        <Message>
          For static images, you can use the <Message type="defaultSemiBold">@2x</Message> and{' '}
          <Message type="defaultSemiBold">@3x</Message> suffixes to provide files for
          different screen densities
        </Message>
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={{ width: 100, height: 100, alignSelf: 'center' }}
        />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <Message type="link">Learn more</Message>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <Message>
          This template has light and dark mode support. The{' '}
          <Message type="defaultSemiBold">useColorScheme()</Message> hook lets you inspect
          what the user&apos;s current color scheme is, and so you can adjust UI colors accordingly.
        </Message>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <Message type="link">Learn more</Message>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <Message>
          This template includes an example of an animated component. The{' '}
          <Message type="defaultSemiBold">components/HelloWave.tsx</Message> component uses
          the powerful{' '}
          <Message type="defaultSemiBold" style={{ fontFamily: Fonts.mono }}>
            react-native-reanimated
          </Message>{' '}
          library to create a waving hand animation.
        </Message>
        {Platform.select({
          ios: (
            <Message>
              The <Message type="defaultSemiBold">components/ParallaxScrollView.tsx</Message>{' '}
              component provides a parallax effect for the header image.
            </Message>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
