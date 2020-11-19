import React from 'react';
import {Text, View, StyleSheet, Button, Image} from 'react-native';

import DefaultStyles from "../constants/default-styles";
import MainButton from "../components/MainButton";

const GameOverScreen = props => {
	return (
		<View style={styles.screen}>
			<Text style={DefaultStyles.titleText}>The Game is over!</Text>
			<View style={styles.imageContainer}>
				<Image
					source={require("../assets/img/success.png")}
					//source={{uri: "https://abrahamswallet.com/wp-content/uploads/2017/12/samuel-ferrara-117219-1180x770.jpg"}}
					style={styles.image}
					resizeMode="cover"/>
			</View>
			<View style={styles.resultContainer}>
				<Text style={{...DefaultStyles.bodyText, ...styles.resultText}}>
					Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds
					to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>
				</Text>
			</View>
			<MainButton onPress={props.onRestart}>NEW GAME</MainButton>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	image: {
		width: "100%",
		height: "100%"
	},
	imageContainer: {
		width: 300,
		height: 300,
		borderRadius: 150,
		borderWidth: 3,
		borderColor: 'black',
		overflow: 'hidden',
		marginVertical: 30
	},
	highlight: {
		color: "red"
	},
	resultContainer: {
		margin: 60,
		marginVertical: 15
	},
	resultText: {
		textAlign: "center",
		fontSize: 20
	}
});

export default GameOverScreen; 