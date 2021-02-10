import React, { Component } from 'react'
import { 
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    Image,
    FlatList,
    TouchableOpacity,
    ScrollView,
    Button
} from 'react-native'

export default class ListItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            item: '',
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
            //this.setState({renderStuff: true});
            // console.log('responseData: '+ responseData.location_reviews[0].review_body);

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
        let reviews = item.location_reviews;

        //make onPress for reviews that lets you like them of edit them
        //also add like counter with heart icon or something
        const renderReview = ({item}) => (
            <TouchableOpacity
            style={styles.item}
            >
                <Text style={styles.title}>Overall Score: {item.overall_rating} </Text>
                <Text style={styles.subTitle}>Quality: {item.quality_rating} </Text>
                <Text style={styles.subTitle}>Price rating: {item.price_rating} </Text>
                <Text style={styles.subTitle}>Cleanliness Rating: {item.clenliness_rating} </Text>
                <Text style={styles.subTitle}>{item.review_body} </Text>
            </TouchableOpacity >
        )

        let reviewList = <FlatList
            data={reviews}
            renderItem={renderReview}
            keyExtractor={(item) => item.review_id.toString()}
        />

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
                <Button
                    title="leave review"
                    onPress={() => {this.props.navigation.navigate('Review');}}
                   //make this link to review page and have that post review
                />
                {reviewList}
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