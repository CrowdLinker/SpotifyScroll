import React from 'react';
import {
  View,
  Animated,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Switch,
  Button,
  TextInput,
  StyleSheet,
} from 'react-native';

function PlaylistProfile() {
  // this will track the scroll value of the Animated.ScrollView
  // use a ref so it doesn't get reset on rerenders
  const scrollY = React.useRef(new Animated.Value(0));

  const clampHeroSection = Animated.add(
    // we want to make the hero section maintain its position on scroll
    // we can do this by setting its translateY value to whatever the scroll value is
    scrollY.current,
    // shift it up by subtracting points until we've scrolled beyond the search section, and clamp it after that
    scrollY.current.interpolate({
      inputRange: [0, SEARCH_PLAYLISTS_HEIGHT],
      outputRange: [0, -SEARCH_PLAYLISTS_HEIGHT],
      // we also want it to shift down when the user pulls down, so we clamp the above range with 'extrapolateRight'
      // using just 'extrapolate' would clamp the scroll value in both directions
      extrapolateRight: 'clamp',
    }),
  );

  const PLAYLIST_ITEMS_OFFSET = PLAYLIST_HERO_HEIGHT + SEARCH_PLAYLISTS_HEIGHT;

  const clampShuffleButton = Animated.add(
    // make the button maintain its position during scroll - i.e the center of the window
    scrollY.current,
    // if we havent scrolled past the hero section, have the shuffle button move up with the scrollview
    scrollY.current.interpolate({
      inputRange: [0, PLAYLIST_ITEMS_OFFSET - SHUFFLE_PLAY_BUTTON_OFFSET],
      outputRange: [0, -PLAYLIST_ITEMS_OFFSET + SHUFFLE_PLAY_BUTTON_OFFSET],
      // after reaching the ~300 points translation, maintain the position at the top
      extrapolateRight: 'clamp',
    }),
  );

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

      <Animated.ScrollView
        contentOffset={{y: SEARCH_PLAYLISTS_HEIGHT}}
        onScroll={handleScroll}
        style={{flex: 1}}>
        <SearchPlaylists />

        <TranslationContainer translateY={clampHeroSection}>
          <PlaylistHero>
            <View style={{height: 180, width: 180, backgroundColor: 'gray'}} />
          </PlaylistHero>
        </TranslationContainer>

        <PlaylistItems>
          <TranslationContainer translateY={clampShuffleButton}>
            <ShufflePlayButton />
          </TranslationContainer>
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

const HEADER_HEIGHT = 60;

function Header({children}: any) {
  return (
    <View>
      <View
        style={{
          height: HEADER_HEIGHT,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingHorizontal: 10,
        }}>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <Button title="Back" onPress={console.log} />
        </View>

        <View style={{flex: 3}}>{children}</View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Button title="..." onPress={console.log} />
        </View>
      </View>
    </View>
  );
}

const SEARCH_PLAYLISTS_HEIGHT = 50;

function SearchPlaylists({children}: any) {
  return (
    <View
      style={{
        height: SEARCH_PLAYLISTS_HEIGHT,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        <TextInput
          style={{
            flex: 1,
            borderRadius: 4,
            paddingVertical: 15,
            fontSize: 16,
            fontWeight: '600',
            marginRight: 20,
          }}
          placeholder="Find in playlist"
        />
        <TouchableOpacity
          style={{
            borderRadius: 4,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            paddingHorizontal: 10,
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              lineHeight: 32,
              fontWeight: '600',
            }}>
            Filters
          </Text>
        </TouchableOpacity>
      </View>
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
    <View
      style={{
        backgroundColor: 'white',
      }}>
      <View style={{zIndex: 2}}>{children}</View>
      <View
        style={{
          padding: 20,
          zIndex: 1,
          marginTop: -SHUFFLE_PLAY_BUTTON_OFFSET,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Download</Text>
          <Switch />
        </View>
        {playlistItems.map(item => (
          <PlaylistRow key={`${item.id}`} playlistItem={item} />
        ))}
        {playlistItems.map(item => (
          <PlaylistRow key={`${item.id}`} playlistItem={item} />
        ))}
        {playlistItems.map(item => (
          <PlaylistRow key={`${item.id}`} playlistItem={item} />
        ))}
        {playlistItems.map(item => (
          <PlaylistRow key={`${item.id}`} playlistItem={item} />
        ))}
        {playlistItems.map(item => (
          <PlaylistRow key={`${item.id}`} playlistItem={item} />
        ))}
        {playlistItems.map(item => (
          <PlaylistRow key={`${item.id}`} playlistItem={item} />
        ))}
      </View>
    </View>
  );
}

const SHUFFLE_PLAY_BUTTON_HEIGHT = 60;
// offset is used to move the button slightly outside its container view
// this gives it the effect of sitting halfway between the hero section and the playlist items section
const SHUFFLE_PLAY_BUTTON_OFFSET = SHUFFLE_PLAY_BUTTON_HEIGHT / 2;

function ShufflePlayButton({children}: any) {
  return (
    <View
      style={{
        transform: [
          {
            // shifts the button up halway
            translateY: -SHUFFLE_PLAY_BUTTON_OFFSET,
          },
        ],
      }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          backgroundColor: 'white',
        }}
      />

      <TouchableOpacity
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          height: SHUFFLE_PLAY_BUTTON_HEIGHT,
          width: 220,
          borderRadius: 30,
          backgroundColor: '#1DB954',
        }}>
        <Text
          style={{
            textAlign: 'center',
            textTransform: 'uppercase',
            color: 'white',
            fontWeight: '700',
            fontSize: 18,
            letterSpacing: 1.25,
          }}>
          Shuffle Play
        </Text>
      </TouchableOpacity>
      {children}
    </View>
  );
}

function App() {
  return <PlaylistProfile />;
}

export default App;

function PlaylistRow({playlistItem}: {playlistItem: IPlaylistItem}) {
  return (
    <View style={{marginBottom: 20}}>
      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
        {playlistItem.song}
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontWeight: '500', color: 'rgba(0,0,0,0.6)'}}>
          {playlistItem.artist}
        </Text>
        <View
          style={{
            width: 4,
            height: 4,
            backgroundColor: 'rgba(0,0,0,0.6)',
            borderRadius: 2,
            marginHorizontal: 4,
          }}
        />
        <Text style={{fontWeight: '500', color: 'rgba(0,0,0,0.6)'}}>
          {playlistItem.album}
        </Text>
      </View>
    </View>
  );
}

const playlistItems: IPlaylistItem[] = [
  {
    id: 0,
    song: `Scott Street`,
    artist: `Phoebe Bridgers`,
    album: `Stranger in the Alps`,
  },
  {
    id: 1,
    song: `Don't Miss It`,
    artist: `James Blake`,
    album: `Assume Form`,
  },
  {
    id: 2,
    song: `Unbearably White`,
    artist: `Vampire Weekend`,
    album: `Father of the Bride`,
  },
  {
    id: 3,
    song: `If You Need To, Keep Time On Me`,
    artist: `Fleet Foxes`,
    album: `Crack-Up`,
  },
  {
    id: 4,
    song: `Small Worlds`,
    artist: `Rayland Baxter`,
    album: `Good Mmornin`,
  },
  {
    id: 5,
    song: `Re: Stacks`,
    artist: `Bon Iver`,
    album: `For Emma, Forever Ago`,
  },
  {
    id: 6,
    song: `Souther Nights`,
    artist: `Whitney`,
    album: `Light Upon the Lake: Demo Recordings`,
  },
];
