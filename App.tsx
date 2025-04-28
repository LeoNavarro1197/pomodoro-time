import { useEffect, useState } from 'react';
import './global.css';
import { View, Text, SafeAreaView, StyleSheet, Platform, StatusBar, TouchableOpacity } from 'react-native';
import Header from './components/Header';
import Timer from './components/Timer';
import { Audio } from "expo-av"

// Colores más vibrantes para cada modo
const colors = ["#FF9F43", "#48DBFB", "#A29BFE"];

export default function App() {
const [isWorking, setIsWorking] = useState(false);
const [time, setTime] = useState(25 * 60);
const [currentTime, setCurrentTime] = useState<number>(0);
const [isActive, setIsActive] = useState(false);

useEffect(() => {
  let interval = null;

  if(isActive){
    interval = setInterval(() => {
      setTime(time -1)
    }, 1000)
  }else{
    clearInterval(interval);
  }

  if(time === 0){
    setIsActive(false)
    setIsWorking((prev) => !prev)
    setTime(isWorking ? 300 : 1500)
  }

  return () => clearInterval(interval);
}, [isActive, time])

function ButtonIsActive(){
  if(isActive === true){
    setIsActive(false)
  }else{
    setIsActive(true)
  }
  PlaySound();
}

async function PlaySound(){
  const { sound } = await Audio.Sound.createAsync(
    require("./assets/sounds/click.mp3")
  )
  await sound.playAsync();
}

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors[currentTime]}]}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Pomodoro Timer</Text>
        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />
        <Timer 
          time={time} 
        />
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isActive === true ? "#FF6B6B" : "#2E3A59" }
          ]}
          activeOpacity={0.8}
          onPress={ButtonIsActive}>
          <Text
            style={styles.buttonText}>
            {isActive ? "DETENER" : "INICIAR"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 20,
    color: '#2E3A59',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  button: {
    width: '80%',
    padding: 15,
    borderRadius: 25,
    marginTop: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "white",
    letterSpacing: 1,
  }
});
