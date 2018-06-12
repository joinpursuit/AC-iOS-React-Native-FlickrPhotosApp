import React from 'react';
import { StyleSheet, 
         Text, 
         FlatList,
         TextInput, 
         TouchableHighlight,
         Image,  
         View } from 'react-native';

// import a custom component 
import PhotoCard from './components/PhotoCard'

// import custom function
import { searchPhotos } from './helpers/FlickrAPI'

export default class App extends React.Component {
  constructor() {
    super() 
    this.state = {
      photos: [], 
      text: '',
    }
  }

  componentWillMount() { // similar to viewDidLoad() in iOS 
    super.componentWillMount
    this.search('')
  }

  search = (keyword) => {
    searchPhotos(keyword)
    .then(results => {
      console.log('there are ' + results.length + ' photos') 
      // updates the photos state
      this.setState({
        photos: results
       })
    })
  }

  searchButtonPressed = () => {
    this.search(this.state.text)
    this.refs.listRef.scrollToOffset({x:0, y:0, animated:true})
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='enter your search'
          clearButtonMode='while-editing'
          textAlign={'center'}
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={(text) => this.setState({
                                    text: text
                                  })}
        />
        <FlatList
          data={this.state.photos}
          renderItem={({item}) => <PhotoCard
                                    imageURL={item.url_m}
                                    title={item.title}
                                    description={item.description._content}
                                  />}
          keyExtractor={item => item.id}
          ref={'listRef'}
        />
        <TouchableHighlight
          style={styles.button}
          underlayColor='white'
          onPress={() => this.searchButtonPressed()}
        >
          <View>
            <Text style={styles.buttonText}>Search</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  item: {
    fontSize: 25, 
    padding: 10, 
  }, 
  input: {
    backgroundColor: 'white',
    height: 64, 
    fontSize: 20, 
  }, 
  button: {
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: 'orange', 
    height: 47, 
  }, 
  buttonText: {
    color: 'white', 
    fontSize: 25, 
    fontWeight: '900', 
  }
});
