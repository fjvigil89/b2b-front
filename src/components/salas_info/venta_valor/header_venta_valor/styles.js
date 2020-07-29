import { Dimensions, StyleSheet } from 'react-native';
import Colors from '@assets/native-base-theme/variables//commonColor';

const { width } = Dimensions.get('window');
const deviceFullWidth = Dimensions.get('window').width;
const deviceWidth = deviceFullWidth - 30;
export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: width,
    marginTop: 15,
    alignItems: 'center',
    flex: 4,
    height: '55%',
    backgroundColor: '#FFF',
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    width: width,
  },
  headerTitle: {
    flex: 2,
    width: deviceWidth,
    marginTop: 20,
    paddingRight: 90,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'stretch',
  },
  headerTextTitle: {
    fontSize: 20,
    fontFamily: 'Questrial',
    fontWeight: 'bold',
    marginBottom: 5,
    alignItems: 'flex-start',
  },
  headerTextSubTitle: {
    fontSize: 12,
    fontFamily: 'Questrial',
  },
  tableHeader: {
    flex: 1,
    maxHeight: 30,
    flexDirection: 'row',
    // marginTop: 10,
    backgroundColor: Colors.brandPrimary,
  },
  tableHeaderTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableTitleText: {
    fontSize: 16,
    fontFamily: 'Bree',
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 0,
  },
});
