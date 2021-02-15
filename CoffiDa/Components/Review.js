import React, { Component } from 'react'
import { 
    View,
    StyleSheet,
    Button
} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

export default class Review extends Component {

    constructor(props) {
        super(props);

        this.state = {
            authToken: '',
            overall: '',
            price: '',
            clean: '',
            quality: '',
            body: '',
        }
    }

    handleOverallChange = (overall) => {
        this.setState({overall: overall});
    }

    handlePriceChange = (price) => {
        this.setState({price: price});
    }

    handleQualityChange = (quality) => {
        this.setState({quality: quality});
    }

    handleCleanChange = (clean) => {
        this.setState({clean: clean});
    }

    handleBodyChange = (body) => {  
        this.setState({ body: body });  
    }

    componentDidMount () {
        const route = this.props.route;
        this.setState({authToken: route.params.authToken});
    }

    postReview = async() => {
        const route = this.props.route;
        console.log(route.params.authToken)
        let url = 'http://10.0.2.2:3333/api/1.0.0/location/'+route.params.location_id+'/review';
        console.log('url: '+url);
        try{
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': route.params.authToken
                },
                body: JSON.stringify({
                    overall_rating: Number(this.state.overall),
                    price_rating: Number(this.state.price),
                    quality_rating: Number(this.state.quality),
                    clenliness_rating: Number(this.state.clean),
                    review_body: this.state.body
                })
            });
            this.props.navigation.goBack();
        } catch (error) {
            console.log("error: " + error);
            alert(error);
        }
    }

    render() {
        return (
            <View>
                <TextInput placeholder="Overall Rating" onChangeText={this.handleOverallChange} value={this.state.overall}/>
                <TextInput placeholder="Price Ratiing" onChangeText={this.handlePriceChange} value={this.state.price}/>
                <TextInput placeholder="Quality Rating" onChangeText={this.handleQualityChange} value={this.state.quality}/>
                <TextInput placeholder="Cleanliness Rating" onChangeText={this.handleCleanChange} value={this.state.clean}/>
                <TextInput
                    placeholder="Write comment here"
                    onChangeText={this.handleBodyChange}
                    value={this.state.body}
                    numberOfLines={4}
                />
                <Button
                    title="Post Review"
                    onPress={this.postReview}
                />
            </View> 
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
