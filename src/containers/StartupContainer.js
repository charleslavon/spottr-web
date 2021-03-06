/* eslint-disable react/no-set-state */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/startupActions';
import Startup from '../components/Startup';
//import FacebookLogin from 'react-fb-auth';
import * as api from '../actions/spottrapi';

class StartupContainer extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            fbAuthToken: null
        };

        this.handleFacebookResponse = this.handleFacebookResponse.bind(this);
    }

    componentDidMount() {
        /* is invoked immediately after a component is mounted.
         Initialization that requires DOM nodes should go here.
         If you need to load data from a remote endpoint, this is a good place
         to instantiate the network request. Setting state in this method will
         trigger a re-rendering.
         */

    }

    /* eslint-disable no-console */
    handleFacebookResponse(response) {
        // Send the token to the server and link the account
        console.log(response);

        if (response.accessToken) {
            let shortName = response.name.substring(0, response.name.indexOf(' ')).trim();

            this.setState({
                fbAuthToken: response.accessToken
            });

            api.saveAthlete(shortName, response.email)
                .then(response => {

                    this.props.actions.addNewAthlete({email: response.email, name: response.name, id: response.id});
                    this.context.router.push('wods');
                })
                .catch(error => {
                    console.log(error);
                    throw(error);
                });
        }

    }

    render() {
        return (
            <Startup
                clickGo={() => {
                    this.context.router.push("wods");
                    this.props.authenticate(); //this is a stub method for now
                }}
            >
                {/*
                 <FacebookLogin
                 appId="610077532508385"
                 component={({onClick}) => {
                 return <button onClick={onClick}>Facebook Login</button>;
                 }}
                 fields="name,email,picture"
                 callback={this.handleFacebookResponse}
                 />

                 */}
            </Startup>
        );
    }
}


const mapStateToProps = state => ({
    athletes: state.athletes //this is jsut a stub for now.
});

const mapDispatchToProps = dispatch => ({
    authenticate() {
        console.log('dispatching authenticate');
        dispatch(actions.authenticate());
    }
});

StartupContainer.contextTypes = {
    router: PropTypes.object.isRequired
};

StartupContainer.propTypes = {
    actions: PropTypes.object,
    authenticate: PropTypes.func,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StartupContainer);
