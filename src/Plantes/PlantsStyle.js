import { StyleSheet } from "react-native";
import { colors } from "../colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  title: {
    marginVertical: 20,
    fontSize: 26,
    fontWeight: "bold",
  },
  lastCard: {
    marginBottom: 100,
  },
  cardtitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  content: {
    fontSize: 18,
  },
  deleteButton: {
    width: "100%",
    alignItems: "flex-end",
  },
  scrollIcon: {
    position: "absolute",
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
    position: "absolute",
    bottom: 20,
    right: "50%",
    transform: [{ translateX: 20 }],
    borderWidth: 1,
    borderColor: colors.black,
  },
  cardContent: {
    gap: 5
  }
});