
import React,{Component} from 'react'
import {View, ScrollView, Image, StyleSheet,Dimensions} from 'react-native'


const { width } = Dimensions.get('window');
const height = width * 0.6

class Carousel extends Component {
    render() {
      const { images } = this.props;
      if (images && images.length) {
        return (
          <View
            style={styles.scrollContainer}
          >
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={true}
            >
              {images.map(image => (
                <Image style={styles.image} source={image.source} />
              ))}
            </ScrollView>
          </View>
        );
      }
      console.log('Please provide images');
      return null;    
    }
  }

  export default Carousel

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 0,
    },
    scrollContainer: {
      height,
    },
    image: {
      width,
      height,
      borderRadius:0
    },
  });
  