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
            authToken: '',
            likedReviews: []
        }
    }

    getItemData = async () =>{
        const route = this.props.route;
        let url = 'http://10.0.2.2:3333/api/1.0.0/location/'+route.params.itemId;
        this.setState({authToken: route.params.authToken})
        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            let responseData = await response.json();
            this.setState({item: responseData});
            this.setState({likedReviews: route.params.likedReviews});

        } catch (error) {
            console.log("error: " + error);
            alert(error);
        }
    }

    postReviewLike = async(id) => {
        const route = this.props.route;
        let url = 'http://10.0.2.2:3333/api/1.0.0/location/'+route.params.itemId+'/review/'+id+'/like'
        try{
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': route.params.authToken
                }
            });
            let liked = this.state.likedReviews;
            liked.push(id);
            this.setState({likedReviews: liked})
        } catch (error) {
            console.log("error: " + error);
            alert(error);
        }
    }

    deleteReviewLike = async(id) => {
        const route = this.props.route;
        let url = 'http://10.0.2.2:3333/api/1.0.0/location/'+route.params.itemId+'/review/'+id+'/like'
        try{
            await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': route.params.authToken
                }
            });
            let liked = this.state.likedReviews;
            let index = liked.indexOf(id);
            liked.splice(index,1);
            this.setState({likedReviews: liked});
        } catch (error) {
            console.log("error: " + error);
            alert(error);
        }
    }

    componentDidMount () {
        this.getItemData();

        this._unsubscribe = this.props.navigation.addListener('focus', async () => {
            await this.getItemData();
        });   
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    render() {
        let item = this.state.item;
        let reviews = item.location_reviews;

        let heartIcon = <Image
            style={styles.icon}
            source={require('../heart_icon.png')}
        />

        const renderReview = ({item}) => (
            <TouchableOpacity
                style={styles.item}
                onPress={
                    this.state.likedReviews.includes(item.review_id) 
                    ? () => this.deleteReviewLike(item.review_id)
                    : () => this.postReviewLike(item.review_id)
                }
            >
                <Text style={styles.title}>Overall Score: {item.overall_rating} </Text>
                <Text style={styles.subTitle}>Quality: {item.quality_rating} </Text>
                <Text style={styles.subTitle}>Price rating: {item.price_rating} </Text>
                <Text style={styles.subTitle}>Cleanliness Rating: {item.clenliness_rating} </Text>
                <Text style={styles.subTitle}>{item.review_body} </Text>
                {this.state.likedReviews.includes(item.review_id) ? heartIcon: null}
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
                <Text style={styles.subTitle}>Location: {item.location_town}</Text>
                <Text style={styles.subTitle}>Rating: {item.avg_overall_rating}</Text>
                <Text style={styles.subTitle}>Price: {item.avg_price_rating}</Text>
                <Text style={styles.subTitle}>quality: {item.avg_quality_rating}</Text>
                <Text style={styles.subTitle}>cleanliness: {item.avg_clenliness_rating}</Text>
                <Button
                    title="leave review"
                    onPress={() => {this.props.navigation.navigate('Review', {
                            authToken: this.state.authToken,
                            location_id: item.location_id
                        });}}
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
        marginRight: 'auto',
        height: 100,
        width: 120
    },
    icon: {
        resizeMode: 'contain',
        height: 50,
        width: 50,
        alignSelf: 'flex-end'
    }
});