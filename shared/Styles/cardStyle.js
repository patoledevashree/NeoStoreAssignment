import {StyleSheet} from 'react-native';

export const cardStyles = StyleSheet.create({
  cardWrapper: {
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    marginTop: 6,
    height: 150,
    marginBottom: 20,
    flexDirection: 'row',
    shadowColor: '#777',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 5,
  },
  cardImgWrapper: {
    flex: 1.3,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 1.5,
    padding: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 1,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  cardDetail: {
    fontSize: 18,
    color: '#444',
    paddingTop: 5,
  },
});
