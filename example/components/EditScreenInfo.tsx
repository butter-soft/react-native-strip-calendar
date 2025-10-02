import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export const EditScreenInfo = ({ path }: { path: string }) => {
  const title = 'Open up the code for this screen:';
  const description =
    'Change any of the text, save the file, and your app will automatically update.';

  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text style={styles.getStartedText}>{title}</Text>
        <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
          <Text style={styles.text}>{path}</Text>
        </View>
        <Text style={styles.getStartedText}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  text: {
    color: theme.colors.typography,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
    color: theme.colors.typography,
  },
  helpContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 15,
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
}));
