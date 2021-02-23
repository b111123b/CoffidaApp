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
            editReview: false,
            location_id: ''
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

    setPageStateEdit = (review) => {
        this.setState({overall: String(review.overall_rating)});
        this.setState({price: String(review.price_rating)});
        this.setState({clean: String(review.clenliness_rating)});
        this.setState({quality: String(review.quality_rating)});
        this.setState({body: review.review_body});
    }

    checkBody () {
        let body = this.state.body;
        let profanity = ['tea','Tea','TEA','cake','CAKE','cakes','Pastry','pastry']
        let failed = false;
        profanity.forEach(word => {
            if (body.includes(word) === true){failed = true;}
        })
        return failed;
    }

    componentDidMount () {
        const route = this.props.route;
        this.setState({authToken: route.params.authToken});
        this.setState({editReview: route.params.editReview});
        this.setState({location_id: route.params.location_id});

        route.params.editReview ? this.setPageStateEdit(route.params.review) : null;
    }

    postReview = async() => {
        if (this.checkBody() === true){return(alert('body has profanity please remove'));}
        const route = this.props.route;
        let url = 'http://10.0.2.2:3333/api/1.0.0/location/'+route.params.location_id+'/review';
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

    updateReview = async() => {
        if (this.checkBody() === true){return(alert('body has profanity please remove'));}
        const route = this.props.route;
        let url = 'http://10.0.2.2:3333/api/1.0.0/location/'+route.params.location_id+'/review/'+route.params.review_id;
        try{
            await fetch(url, {
                method: 'PATCH',
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

    deleteReview = async() => {
        const route = this.props.route;
        let url = 'http://10.0.2.2:3333/api/1.0.0/location/'+route.params.location_id+'/review/'+route.params.review_id;
        try{
            await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': route.params.authToken
                }
            });
            this.props.navigation.goBack();
        } catch (error) {
            console.log("error: " + error);
            alert(error);
        }
    }

    render() {

        let postButton = <Button
            title="Post Review"
            onPress={this.postReview}
        />
        let editButton = <Button
            title="Edit Review"
            onPress={this.updateReview}
        />
        let deleteButton = <Button
            title="delete Review"
            onPress={this.deleteReview}
        />

        let editControls = <View>
            {editButton}
            {deleteButton}
        </View>
        
        return (
            <View style={styles.container}>
                <TextInput placeholder="Overall Rating" onChangeText={this.handleOverallChange} value={this.state.overall}/>
                <TextInput placeholder="Price Ratiing" onChangeText={this.handlePriceChange} value={this.state.price}/>
                <TextInput placeholder="Quality Rating" onChangeText={this.handleQualityChange} value={this.state.quality}/>
                <TextInput placeholder="Cleanliness Rating" onChangeText={this.handleCleanChange} value={this.state.clean}/>
                <TextInput
                    style={styles.body}
                    placeholder="Write comment here"
                    onChangeText={this.handleBodyChange}
                    value={this.state.body}
                    numberOfLines={5}
                />
                {this.state.editReview === true ? editControls : postButton}
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
