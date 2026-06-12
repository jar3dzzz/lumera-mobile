import React, { useState } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ActivityIndicator,
    Alert,
    ImageBackground,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../../views/AuthView/LoginView.styles';
export default function RegisterFormComponent({ onSubmit, onToggleForm, navigation }) {


    return (
        <ImageBackground
            source={require('../../../../assets/backgrounds/login-background.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
        </ImageBackground>
    );
}
