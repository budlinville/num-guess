import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';	// EvilIcons, MaterialIcons, etc.

import NumberContainer from "../components/NumberContainer"
import Card from "../components/Card";
import DefaultStyles from '../constants/default-styles';
import MainButton from "../components/MainButton";

const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min); 	// round up to nearest integer
	max = Math.floor(max); 	// round down to nearest integer
	const rndNum = Math.floor(Math.random() * (max - min)) + min;
	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	}
	return rndNum;
};

const renderListItem = (listLength, itemData) => (
	<View style={styles.listItem}>
		<Text style={DefaultStyles.bodyText}>#{listLength - itemData.index}</Text>
		<Text style={DefaultStyles.bodyText}>{itemData.item}</Text>
	</View>
);

const GameScreen = props => {
	const { userChoice, onGameOver } = props;

	const initialGuess = generateRandomBetween(1, 100, userChoice);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
	// Reference variables such as these hold values that persist through re-renders
	// This is different than state because changing these values does not trigger re-renders
	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	// will run after every render cycle
	// will re-run every time one of the variables passed in array changes
	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(pastGuesses.length);
		}
	}, [currentGuess, userChoice, onGameOver]);

	const nextGuessHandler = direction => {
		if (direction === "lower" && currentGuess < userChoice
			|| direction === "greater" && currentGuess > userChoice) {
			Alert.alert("No Cheating!", "You piece of shit", [
				{text: "Sorry!", style: "cancel"}
			]);
			return;
		}
		if (direction === 'lower') {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess + 1;
		}
		const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
		setCurrentGuess(nextNumber);
		setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);
	};

	return (
		<View style={styles.screen}>
			<Text style={DefaultStyles.titleText}>Opponent's Guess</Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<MainButton onPress={() => nextGuessHandler("lower")}>
					<Ionicons name="md-remove" size={24} color="white"/>
				</MainButton>
				<MainButton onPress={() => nextGuessHandler("greater")}>
					<Ionicons name="md-add" size={24} color="white"/>
				</MainButton>
			</Card>
			<View style={styles.listContainer}>
				{/*<ScrollView contentContainerStyle={styles.list}>
					{pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
				</ScrollView>*/}
				<FlatList
					keyExtractor={item => item}
					data={pastGuesses}
					renderItem={itemData => renderListItem(pastGuesses.length, itemData)}
					contentContainerStyle={styles.list}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center'
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 20,
		width: 400,
		maxWidth: "90%"
	},
	listContainer: {
		flex: 1,
		width: "60%"
	},
	list: {
		flexGrow: 1,
		justifyContent: 'flex-end'
	},
	listItem: {
		borderColor: "#ccc",
		borderWidth: 1,
		padding: 15,
		marginVertical: 10,
		backgroundColor: "white",
		flexDirection: "row",
		justifyContent: 'space-between',
		width: "100%"
	}
});

export default GameScreen;

