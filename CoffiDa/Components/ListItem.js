import React, { Component } from 'react'
import { 
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    Image,
    FlatList,
    TouchableOpacity,
    ScrollView
} from 'react-native'

export default class ListItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            item: [],
            renderStuff: false
        }
    }

    getItemData = async () =>{
        const route = this.props.route;
        let url = 'http://10.0.2.2:3333/api/1.0.0/location/'+route.params.item.location_id;
        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            let responseData = await response.json();
            this.setState({item: responseData});
            this.setState({renderStuff: true});
            console.log('responseData: '+ responseData.location_reviews[0].review_body);

        } catch (error) {
            console.log("error: " + error);
            alert(error);
        }
    }

    componentDidMount () {
        this.getItemData();
    }

    testFunction () {
        console.log('test'+this.state.item.location_reviews[0].review_body)
    }

    render() {
        let item = this.state.item;
        let location_reviews = item.location_reviews;
        // this.state.renderStuff ?  : null;

        const renderReview = ({review}) => (
            <TouchableOpacity style={styles.item}>
                <Text style={styles.subTitle}>review_body: {review.review_body}</Text>
                <Text style={styles.subTitle}>price_rating: {review.price_rating}</Text>
            </TouchableOpacity >
        )

        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}> {item.location_name} </Text>
                <Image
                    style={styles.image}
                    source={require('../image_placeholder.png')}
                />
                <Text style={styles.subTitle}>Locations: {item.location_town}</Text>
                <Text style={styles.subTitle}>Rating: {item.avg_overall_rating}</Text>
                <Text style={styles.subTitle}>Price: {item.avg_price_rating}</Text>
                <Text style={styles.subTitle}>quality: {item.avg_quality_rating}</Text>
                <Text style={styles.subTitle}>cleanliness: {item.avg_clenliness_rating}</Text>
                <ScrollView style={styles.item}>
                    <Text>
                        {this.state.renderStuff ? location_reviews : null}
                    </Text>
                </ScrollView>
                {/* <FlatList
                    data={location_reviews}
                    renderItem={renderReview}
                    keyExtractor={(review) => review.review_id.toString()}
                /> */}
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      backgroundColor: '#80a1c1',
    },
    title: {
      fontSize: 32,
      color: '#a85219'
    },
    subTitle: {
        fontSize: 18,
    },
    container: {
        backgroundColor: '#d9cfc1',
        flex: 1
    },
    image: {
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
});