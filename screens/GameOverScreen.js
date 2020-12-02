import React from 'react';
import {
	Text,
	View,
	StyleSheet,
	Button,
	Image,
	Dimensions,
	ScrollView
} from 'react-native';

import DefaultStyles from "../constants/default-styles";
import MainButton from "../components/MainButton";

const GameOverScreen = props => {
	return (
		<ScrollView>
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
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 20
	},
	image: {
		width: "100%",
		height: "100%"
	},
	imageContainer: {
		width: Dimensions.get('window').width * 0.7,
		height: Dimensions.get('window').width * 0.7,
		borderRadius: Dimensions.get('window').width * 0.7 / 2,
		borderWidth: 3,
		borderColor: 'black',
		overflow: 'hidden',
		marginVertical: Dimensions.get('window').height / 30
	},
	highlight: {
		color: "red"
	},
	resultContainer: {
		margin: 60,
		marginVertical: Dimensions.get('window').height / 60
	},
	resultText: {
		textAlign: "center",
		fontSize: Dimensions.get('window').height < 400 ? 16 : 20
	}
});

export default GameOverScreen; 