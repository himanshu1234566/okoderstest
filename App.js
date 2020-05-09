import React from "react";
import {
StyleSheet,
View,
ActivityIndicator,
FlatList,
Text,
TouchableOpacity,Image
} from "react-native";
export default class App extends React.Component {
static navigationOptions = ({ navigation }) => {
return {
  title: "",
  headerStyle: {backgroundColor: "#fff"},
  headerTitleStyle: {textAlign: "center",flex: 1}
 };
};
constructor(props) {
 super(props);
 this.state = {
   loading: true,
   dataSource:[]
  };
}
componentDidMount(){
fetch("https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0 ")
.then(response => response.json())
.then((responseJson)=> {
  this.setState({
   loading: false,
   dataSource: responseJson.hits
  })
})
.catch(error=>console.log(error)) 
}
FlatListItemSeparator = () => {
return (
  <View style={{
     height: .5,
     width:"100%",
     backgroundColor:"rgba(0,0,0,0.5)",
}}
/>
);
}
renderItem=(data)=>
<TouchableOpacity style={styles.list}>
<Text >{data.title}</Text>
</TouchableOpacity>
render(){
 if(this.state.loading){
  return( 
    <View style={styles.loader}> 
      <ActivityIndicator size="large" color="#0c9"/>
    </View>
)}
return(
 <View style={styles.container}>
 <FlatList
       
       data={ this.state.dataSource }
       
       ItemSeparatorComponent = {this.FlatListItemSeparator}

       renderItem={({item}) => 
       
           <View style={{flex:1, flexDirection: 'row'}}>
   
  
             <Text> {item.created_at}</Text>
                 <Text> {item.author}</Text>
                
                 <Text> {item.title}</Text>
                 
           
            

           </View>
       
         }

       keyExtractor={(item, index) => index.toString()}
       
       />

</View>
)}
}
const styles = StyleSheet.create({
 
  MainContainer :{
   
      justifyContent: 'center',
      flex:1,
      margin: 5,
      marginTop: (Platform.OS === 'ios') ? 20 : 0,
   
  },
   
  imageView: {
  
      width: '50%',
      height: 100 ,
      margin: 7,
      borderRadius : 7
   
  },
   
  textView: {
  
      width:'50%', 
      textAlignVertical:'center',
      padding:10,
      color: '#000'
   
  }
   
  });