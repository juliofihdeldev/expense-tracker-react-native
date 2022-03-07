import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, TextInput, FlatList, Dimensions, Button, Alert } from 'react-native';
import { Text } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import format from 'date-fns/format';
import { Picker } from '@react-native-picker/picker';
import { db, auth } from '../firebase';
import firebase from 'firebase';

const AddScreen = ({ navigation }) => {
	let categoriesExpenses = [
		'Dinning',
		'Groceries',
		'Transportations',
		'Sanitations',
		'Auto Maintenance',
		'LifeStyle',
		'Fitness',
		'Medicale',
		'Housing',
		'Communications',
		'Help Friends',
		'Girls Friends',
	];

	let categoriesIncomes = [
		'Salary',
		'Gift',
		'Sells',
		'Other income',
	];

	let [
		categoryList,
		setCategoryList,
	] = React.useState(categoriesExpenses);
	const [
		submitLoading,
		setSubmitLoading,
	] = useState(false);
	useLayoutEffect(
		() => {
			navigation.setOptions({
				title : 'Add Expense',
			});
		},
		[
			navigation,
		],
	);
	const [
		input,
		setInput,
	] = useState('');
	const [
		amount,
		setAmount,
	] = useState('');
	const createExpense = () => {
		if (input && amount && selDate && selectedExpenseOrIncome && auth) {
			setSubmitLoading(true);
			db
				.collection('expense')
				.add({
					category  : selectedCategory,
					email     : auth.currentUser.email,
					text      : input,
					price     : amount,
					date      : selDate,
					type      : selectedExpenseOrIncome,
					timestamp : firebase.firestore.FieldValue.serverTimestamp(),
					userDate  : result,
				})
				.then(() => clearInputFields())
				.catch((error) => alert(error.message));
		}
		else {
			alert('All fields are mandatory');
			setSubmitLoading(false);
		}
	};

	const clearInputFields = () => {
		Alert.alert('Informations', 'Created Successfully');
		setInput('');
		setAmount('');
		setSelDate(new Date());
		setSelectedExpenseOrIncome('expense');
		setSelectedCategory('Food');

		navigation.navigate('Home');
		setSubmitLoading(false);
	};
	// Date Picker
	const [
		selDate,
		setSelDate,
	] = useState(new Date());
	const [
		show,
		setShow,
	] = useState(false);
	const [
		mode,
		setMode,
	] = useState('date');
	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(Platform.OS === 'ios');
		setSelDate(currentDate);
	};
	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	};
	const showDatepicker = () => {
		showMode('date');
	};
	const result = format(selDate, 'dd/MM/yyyy');

	// Select Dropdown
	const [
		selectedExpenseOrIncome,
		setSelectedExpenseOrIncome,
	] = useState('expense');
	const [
		selectedCategory,
		setSelectedCategory,
	] = useState('Food');

	return (
		<KeyboardAvoidingView style={styles.container}>
			<StatusBar style='dark' />
			<View style={styles.inputContainer}>
				<View
					style={{
						width          : Dimensions.get('window').width - 12,
						margin         : 1,
						justifyContent : 'flex-start',
						flexDirection  : 'row',
						alignItems     : 'center',
					}}>
					<View>
						<Text
							style={{
								fontSize   : 15,
								fontWeight : 'bold',
							}}>
							{' '}
						</Text>
					</View>
					<FlatList
						data={[
							'expense',
							'income',
						]}
						navigation={navigation}
						numColumns={3}
						contentContainerStyle={{
							flexDirection : 'column',
							width         : Dimensions.get('window').width - 12,
						}}
						keyExtractor={(item) => item}
						renderItem={({ item, index }) => (
							<Button
								color={

										item == selectedExpenseOrIncome ? 'brown' :
										'gray'
								}
								key={index}
								title={item.toUpperCase()}
								onPress={() => setSelectedExpenseOrIncome(item)}
							/>
						)}
					/>
				</View>
				<DateTimePicker
					testID='dateTimePicker'
					value={selDate}
					mode={mode}
					is24Hour={true}
					display='default'
					onChange={onChange}
				/>

				<TextInput
					style={styles.input}
					placeholder='Add a description'
					multiline={2}
					value={input}
					onChangeText={(text) => setInput(text)}
				/>
				<TextInput
					style={styles.input}
					keyboardType='number'
					returnKeyLabel='Done'
					placeholder='Add Amount'
					value={amount}
					onChangeText={(text) => setAmount(text)}
				/>
				{/* {show && ( */}

				<View
					style={{
						width          : Dimensions.get('window').width - 42,
						margin         : 1,
						justifyContent : 'flex-start',
						flexDirection  : 'row',
						alignItems     : 'center',
					}}>
					<FlatList
						data={

								selectedExpenseOrIncome == 'expense' ? categoriesExpenses :
								categoriesIncomes
						}
						navigation={navigation}
						numColumns={3}
						contentContainerStyle={{
							flexDirection : 'column',
							width         : Dimensions.get('window').width / 2,
						}}
						keyExtractor={(item) => item}
						renderItem={({ item, index }) => (
							<Button
								color={

										item == selectedCategory ? 'brown' :
										'gray'
								}
								key={index}
								title={item}
								onPress={() => setSelectedCategory(item)}
							/>
						)}
					/>
				</View>
				<View style={styles.button}>
					<Button title='Add' onPress={createExpense} color='#fff' loading={submitLoading} />
				</View>
			</View>
		</KeyboardAvoidingView>
	);
};

export default AddScreen;

const styles = StyleSheet.create({
	container      : {
		backgroundColor : '#FFFFFF',
		flex            : 1,
		alignItems      : 'center',
		// justifyContent  : 'center',
		padding         : 10,
	},
	inputContainer : {
		width   : 380,
		padding : 12,
	},
	input          : {
		height            : 50,
		borderColor       : 'gray',
		borderBottomWidth : 1,
		marginBottom      : 20,
	},
	button         : {
		width           : 100,
		height          : 40,
		marginTop       : 12,
		borderRadius    : 20,
		backgroundColor : 'green',
	},
});
