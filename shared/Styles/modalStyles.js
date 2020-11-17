import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
  modalStyle: {
    backgroundColor: 'white',
    marginHorizontal: 50,
    marginVertical: 150,
    borderRadius: 20,
  },
  icon: {
    position: 'relative',
    left: 60,
    paddingLeft: 30,
    paddingTop: 20,
  },
  header: {
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderBottomColor: '#777',
    position: 'relative',
    shadowColor: '#777',
    elevation: 1,
    flexDirection: 'row',
    backgroundColor: '#2874F0',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  button: {
    borderRadius: 2,
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
});
