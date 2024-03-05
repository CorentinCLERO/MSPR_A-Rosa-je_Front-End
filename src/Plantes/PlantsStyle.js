import { StyleSheet } from 'react-native';
import { colors } from '../colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  title: {
    marginVertical: 20,
    fontSize: 26,
    fontWeight: 'bold',
  },
  card: {
    marginVertical: 20,
    marginHorizontal: 26,
  },
  lastCard: {
    marginBottom: 100,
  },
  cardLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 15,
    // Ombre pour iOS
    shadowColor: colors.success,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    // Ombre pour Android
    elevation: 15,
  },
  cardImage: {
    flex: 4,
    height: 150,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth:  1,
  },
  cardContent: {
    flex: 6,
    paddingLeft: 10,
    gap: 5,
  },
  cardtitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 18,
  },
  deleteButton: {
    width: '100%',
    alignItems: 'flex-end',
  },
  scrollIcon: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    backgroundColor: colors.primary,
    borderRadius: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.black,
  },
  addButton: {
    width: 80,
    position: 'absolute',
    bottom: 20,
    right: '50%',
    transform: [{ translateX: 20 }],
    borderWidth: 1,
    borderColor: colors.black,
  },
});