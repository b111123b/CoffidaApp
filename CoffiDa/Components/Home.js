import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Button
} from 'react-native';

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            authToken: '',
            id: ''
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

    componentDidMount () {
        this.getData();
    }

    render() {

        const renderItem = ({item}) => (
            <TouchableOpacity 
                style={styles.item}
                onPress={() => {
                    this.props.navigation.navigate('Item',
                        { item: item },
                        { authToken: this.state.authToken }
                    );
                }}
                >
                <Text style={styles.title}>{item.location_name}</Text>
                <Text style={styles.subTitle}>Locations: {item.location_town}</Text>
                <Text style={styles.subTitle}>Rating: {item.avg_overall_rating}</Text>
                <Text style={styles.subTitle}>Price: {item.avg_price_rating}</Text>
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
      }
});
  