import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity 
} from 'react-native';

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: []
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
            <TouchableOpacity style={styles.item}>
                <Text style={styles.title}>{item.location_name}</Text>
                <Text style={styles.subTitle}>Locations: {item.location_town}</Text>
                <Text style={styles.subTitle}>Rating: {item.avg_overall_rating}</Text>
                <Text style={styles.subTitle}>Price: {item.avg_price_rating}</Text>
            </TouchableOpacity >
        )
        
        return (
            <SafeAreaView style={styles.container}>
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
        // color: 'white'
    },
    container: {
        backgroundColor: '#d9cfc1',
    }
  });
  