import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Button,
  Image
} from 'react-native';

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            authToken: '',
            id: '',
            user: [],
            favourites: []
        }
    }

    getData = async () =>{
        const route = this.props.route;
        try {
            let response = await fetch('http://10.0.2.2:3333/api/1.0.0/find', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': route.params.authToken
                }
            });

            let responseData = await response.json();
            this.setState({items: responseData});
            this.setState({authToken: route.params.authToken});
            this.setState({id: route.params.id});

        } catch (error) {
            console.log("error: " + error);
            alert(error);
        }
    }

    getUserData = async() => {
        const route = this.props.route;
        let url = 'http://10.0.2.2:3333/api/1.0.0/user/'+route.params.id;
        try{
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': route.params.authToken
                }
            });
            let responseData = await response.json();
            let user = responseData;
            this.setState({user: user})
        } catch (error) {
            console.log("error: " + error);
            alert(error);
        }
    }

    postFavourite = async(id) => {
        const route = this.props.route;
        let url = 'http://10.0.2.2:3333/api/1.0.0/location/'+id+'/favourite';
        try{
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': route.params.authToken
                }
            });
            this.componentDidMount();
        } catch (error) {
            console.log("error: " + error);
            alert(error);
        }
    }

    deleteFavourite = async(id) => {
        const route = this.props.route;
        let url = 'http://10.0.2.2:3333/api/1.0.0/location/'+id+'/favourite';
        try{
            await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': route.params.authToken
                }
            });
            this.componentDidMount();
        } catch (error) {
            console.log("error: " + error);
            alert(error);
        }
    }

    componentDidMount = async() => {
        await this.getData();
        await this.getUserData();
        await this.getFavorites();
        await this.getLikedReviews();

        this._unsubscribe = this.props.navigation.addListener('focus', async () => {
            await this.getData();
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    getFavorites() {
        let locations = this.state.user.favourite_locations;
        let favourites = [];
        locations.forEach(location => {
            favourites.push(location.location_id);
        })
        this.setState({favourites: favourites});
    }

    getLikedReviews() {
        let reviews = this.state.user.liked_reviews;
        let likedReviews = [];
        reviews.forEach(review => {
            likedReviews.push(review.review.review_id);
        })
        this.setState({likedReviews: likedReviews});
    }

    render() {

        let favouriteIcon = <Image
            style={styles.image}
            source={require('../coffee_icon.png')}
        />

        const renderItem = ({item}) => (
            
            <TouchableOpacity 
                style={styles.item}
                onPress={() => this.props.navigation.navigate('Item',{ 
                        itemId: item.location_id,
                        authToken: this.state.authToken,
                        favourites: this.state.favourites,
                        likedReviews: this.state.likedReviews
                    })
                }
                onLongPress={
                    this.state.favourites.includes(item.location_id) 
                    ? () => this.deleteFavourite(item.location_id)
                    : () => this.postFavourite(item.location_id)
                }
            >
                <Text style={styles.title}>{item.location_name}</Text>
                <Text style={styles.subTitle}>Locations: {item.location_town}</Text>
                <Text style={styles.subTitle}>Rating: {item.avg_overall_rating}</Text>
                <Text style={styles.subTitle}>Price: {item.avg_price_rating}</Text>
                {this.state.favourites.includes(item.location_id) ? favouriteIcon: null}
            </TouchableOpacity >
        )
        
        return (
            <SafeAreaView style={styles.container}>
                <Button style={styles.bottomButton}
                    title="User Page"
                    onPress={() => this.props.navigation.navigate('User',{ 
                        id: this.state.id,
                        authToken: this.state.authToken }
                    )}
                />
                <FlatList
                    data={this.state.items}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.location_id.toString()}
                />
            </SafeAreaView>
        );
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
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    },
    image: {
        resizeMode: 'contain',
        height: 50,
        width: 50,
        alignSelf: 'flex-end'
    }
});
  