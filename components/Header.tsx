import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const options = ["Pomodoro", "Short Break", "Long Break"];

export default function Header({ currentTime, setCurrentTime, setTime}) {

  function handlePress(index: number){
    const newTime  = index === 0 ? 25 : index === 1 ? 5 : 15;
    setCurrentTime(index);
    setTime(newTime * 60);
  }

  return (
    <View style={{ flexDirection: 'row', paddingBottom: 15, justifyContent: 'center', alignItems: 'center', gap: 15 }}>
      {options.map((option, index) => {
        return (
          <TouchableOpacity 
            key={index}
            onPress={() => handlePress(index)}
            style={[
              styles.itemStyle,
              { borderColor: currentTime === index ? 'white' : 'transparent' }
            ]} 
          >
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: currentTime === index ? 'white' : 'black' }}>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  itemStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 5,
    borderColor: 'white',
  },
});
