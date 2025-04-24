import { useEffect, useState } from 'react';
import './global.css';
import { View, Text, SafeAreaView, StyleSheet, Platform, StatusBar, TouchableOpacity } from 'react-native';
import Header from './components/Header';
import Timer from './components/Timer';
import { Audio } from "expo-av"

const colors = [ "#F7DC6F", "#AED6F1", "#D7BDD2" ];

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
      <View style={{flex: 1, paddingHorizontal: 15, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
        <Text style={styles.text}>Pomodoro</Text>
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
            { backgroundColor: isActive === true ? "#F05754" : "#333333" }
          ]}
          onPress={ButtonIsActive}>
          <Text
            style={{fontSize: 15, fontWeight: 'bold', color: "white"}}>
            {isActive ? "STOP" : "START"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 10,
  },
  button: {
    backgroundColor: "#333333",
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center"
  }
});
