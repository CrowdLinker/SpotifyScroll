import React from 'react';
import {View, Animated, SafeAreaView, TouchableOpacity} from 'react-native';

function PlaylistProfile() {
  // this will track the scroll value of the Animated.ScrollView
  // use a ref so it doesn't get reset on rerenders
  const scrollY = React.useRef(new Animated.Value(0));

  const clampHeroSection = scrollY.current;

  // standard boilerplate for listening to scroll events
  // useNativeDriver means the scroll value will be updated on the native thread (more efficient)
  // this limits what you can do with the Animated.Value - style properties are restricted to transform and opacity
  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY.current}}}],
    {useNativeDriver: true},
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header />

      <Animated.ScrollView onScroll={handleScroll} style={{flex: 1}}>
        <SearchPlaylists />

        <TranslationContainer translateY={clampHeroSection}>
          <PlaylistHero>
            <View style={{height: 180, width: 180, backgroundColor: 'gray'}} />
          </PlaylistHero>
        </TranslationContainer>

        <PlaylistItems>
          <ShufflePlayButton />
        </PlaylistItems>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

// a wrapper component for translating position with animated values
// doesn't do much, but it cleans up the markup a little bit
function TranslationContainer({children, translateY}: any) {
  return (
    <Animated.View style={{transform: [{translateY}]}}>
      {children}
    </Animated.View>
  );
}

// the following components are meant to be containers for content
// ordinarily, the height of a view will be determined by its content (it's intrinsic height)
// we're using preset heights here to get the approximate layout first

// any calculations involving the intrinsic height of a view (in later steps) will be calculated using the onLayout prop -- if this sounds confusing, it will be explained in a later step - dont worry about it for now

const HEADER_HEIGHT = 40;

function Header({children}: any) {
  return (
    <View style={{height: HEADER_HEIGHT, backgroundColor: 'aquamarine'}}>
      {children}
    </View>
  );
}

const SEARCH_PLAYLISTS_HEIGHT = 50;

function SearchPlaylists({children}: any) {
  return (
    <View style={{height: SEARCH_PLAYLISTS_HEIGHT, backgroundColor: 'coral'}}>
      {children}
    </View>
  );
}

const PLAYLIST_HERO_HEIGHT = 300;

function PlaylistHero({children}: any) {
  return (
    <View
      style={{
        padding: 10,
        height: PLAYLIST_HERO_HEIGHT,
        alignItems: 'center',
      }}>
      {children}
    </View>
  );
}

function PlaylistItems({children}: any) {
  return (
    <View style={{height: 1200, backgroundColor: 'rebeccapurple'}}>
      {children}
    </View>
  );
}

const SHUFFLE_PLAY_BUTTON_HEIGHT = 60;
// offset is used to move the button slightly outside its container view
// this gives it the effect of sitting halfway between the hero section and the playlist items section
const SHUFFLE_PLAY_BUTTON_OFFSET = SHUFFLE_PLAY_BUTTON_HEIGHT / 2;

function ShufflePlayButton({children}: any) {
  return (
    <TouchableOpacity
      style={{
        transform: [
          {
            // shifts the button up halway
            translateY: -SHUFFLE_PLAY_BUTTON_OFFSET,
          },
        ],
        alignSelf: 'center',
        height: SHUFFLE_PLAY_BUTTON_HEIGHT,
        width: 220,
        borderRadius: 30,
        backgroundColor: 'springgreen',
      }}>
      {children}
    </TouchableOpacity>
  );
}

function App() {
  return <PlaylistProfile />;
}

export default App;
