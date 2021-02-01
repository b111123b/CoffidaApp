import React, {Component} from 'react';
import {
  View,
  TextInput,
  Button
} from 'react-native';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            buttonStyle: "#0000ff",
            // activePage: this.props.activePage,
            // user: this.props.user,
            // changePage: this.props.changePage
        }
    }
    
    handleEmailChange = (email) => {
        this.setState({email: email})
        
    }

    handlePasswordChange = (password) => {
        this.setState({password: password})
    }

    handleLoginButtonClick = () => {
        // probably send off post request
        let colour = this.state.buttonStyle == "#ffc0cb" ? "#0000ff" : "#ffc0cb";
        this.setState({buttonStyle: colour})
        // if(this.state.email === this.state.user.email && this.state.password === this.state.user.password){
        //     this.state.changeLoginPage();
        // }
        // console.log("page: "+this.state.activePage)
    }

    render(){

        const navigation = this.props.navigation;
        return (
            <View>
                <TextInput placeholder="Enter your email" onChangeText={this.handleEmailChange} value={this.state.email} />
                <TextInput placeholder="Enter your password" onChangeText={this.handlePasswordChange} value={this.state.password} />
                <Button
                    title="login Button"
                    color={this.state.buttonStyle}
                    onPress={this.handleLoginButtonClick}
                
                />
                <Button
                    title="navigation"
                    onPress={() => navigation.navigate('Navigation')}
                />

                
            </View>

        );
    }
}

export default Login;
