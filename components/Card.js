import React from 'react';
import {View, StyleSheet} from 'react-native';

// props.style is second so that any styles passed in will override default card props
const Card = props => <View style={{...styles.card, ...props.style}}>{props.children}</View>

const styles = StyleSheet.create({
	card: {
		shadowColor: 'black',	//ios
		shadowOffset: {width: 0, height: 2},	//ios
		shadowOpacity: 0.26,	//ios
		shadowRadius: 6,			//ios
		elevation: 5,					//android
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 10
	}
});

export default Card;