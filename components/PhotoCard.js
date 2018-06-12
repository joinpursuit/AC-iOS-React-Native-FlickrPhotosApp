import React, { Component } from 'react'
import { Image, 
         View, 
         Text,
         StyleSheet, 
         TouchableHighlight } from 'react-native'

export default class PhotoCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageURL: '',
      title: '', 
      description: '', 
    }
  }
  render() {
    return(
      <TouchableHighlight>
        <View>
          <Image
            style={styles.image}
            source={{uri:this.props.imageURL}}
          />
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.description}>{this.props.description}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    height: 400, 
    width: '100%'
  }, 
  title: {
    fontSize: 25, 
    fontWeight: '900', // 100 - 900
    color: 'white'
  }, 
  description: {
    fontSize: 25, 
    color: 'orange', 
    fontWeight: '600'
  }
})