import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SCREEN_WIDTH, task, RootStackParamList } from "../../constants";
import Plus from "../../assets/icons/plus.svg";
import Clock from "../../assets/icons/clock.svg";
import Right from "../../assets/icons/right.svg";
import Loader from "../../assets/icons/loader.svg";
import { connect } from "react-redux";
import { StackNavigationProp } from "@react-navigation/stack";
import Animated from "react-native-reanimated";
import { spring } from "react-native-redash";

interface Category {
  tasks: task[];
  categoryName: string;
  categoryColor: string;
  categoryDesc: string;
  id: string;
}

interface Props {
  tasks: Array<task>;
  category: Category[];
  navigation: StackNavigationProp<RootStackParamList>;
  done: Array<task>;
}

const mapStateToProps = (state: {
  tasks: { tasks: Array<task> };
  category: { category: Array<Category> };
  done: { done: Array<task> };
}) => ({
  tasks: state.tasks.tasks,
  category: state.category.category,
  done: state.done.done,
});

const Feed: React.FunctionComponent<Props> = ({
  category,
  navigation,
  tasks,
  done,
}) => {
  const config = { mass: 1, damping: 70, stiffness: 300 };

  return (
    <View style={{ height: 260, width: SCREEN_WIDTH }}>
      <View style={{ ...styles.feedHeadingContainer }}>
        <Text style={{ ...styles.feedText }}>My tasks</Text>
        <View style={{ ...styles.feedEvents }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CreateTask");
            }}
            style={{ flex: 1, alignItems: "flex-end" }}
          >
            <Plus color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <Animated.View
        style={{
          ...styles.feedsContainer,
          left: 150,
          transform: [{ translateX: spring({ from: 0, to: -150, config }) }],
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("FeedScreen", {
              screen: "Task",
            });
          }}
          style={{ flexDirection: "row" }}
        >
          <View style={{ ...styles.feedIcon }}>
            <Clock color="white" />
          </View>
          <View style={{ ...styles.feedDetails }}>
            <Text style={{ ...styles.feedText, fontSize: 16 }}>Task</Text>
            <Text style={{ ...styles.feedDesc }}>{tasks.length} tasks now</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={{
          ...styles.feedsContainer,
          transform: [{ translateX: spring({ from: 0, to: -250, config }) }],
          left: 250,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("FeedScreen", {
              screen: "Group",
            });
          }}
          style={{ flexDirection: "row" }}
        >
          <View style={{ ...styles.feedIcon, backgroundColor: "#F9BE7C" }}>
            <Loader color="white" />
          </View>
          <View style={{ ...styles.feedDetails }}>
            <Text style={{ ...styles.feedText, fontSize: 16 }}>Group</Text>
            <Text style={{ ...styles.feedDesc }}>
              {category.length} tasks now
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={{
          ...styles.feedsContainer,
          transform: [{ translateX: spring({ from: 0, to: -350, config }) }],
          left: 350,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("FeedScreen", {
              screen: "Done",
            });
          }}
          style={{ flexDirection: "row" }}
        >
          <View style={{ ...styles.feedIcon, backgroundColor: "#6488E4" }}>
            <Right color="white" />
          </View>
          <View style={{ ...styles.feedDetails }}>
            <Text style={{ ...styles.feedText, fontSize: 16 }}>Done</Text>
            <Text style={{ ...styles.feedDesc }}>{done.length} completed</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default connect(mapStateToProps)(Feed);

const styles = StyleSheet.create({
  feedHeadingContainer: {
    height: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  feedText: {
    color: "#ffffff",
    fontFamily: "semiBold",
    fontSize: 18,
  },
  feedEvents: {
    height: 32,
    width: 76,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 20,
  },
  feedsContainer: {
    height: 56,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  feedIcon: {
    height: 44,
    width: 44,
    backgroundColor: "#E46472",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  feedDetails: {
    height: 44,
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 1,
    marginLeft: 12,
  },
  feedDesc: {
    fontFamily: "regular",
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.75)",
  },
});
