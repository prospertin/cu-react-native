import React from 'react';
import { Platform, Linking, Alert, StyleSheet, Text, TextInput, Button, View } from 'react-native';

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home'
  }

  constructor(props) {
    super(props);
    this.state = {
      redirectUrl: '',
      userId: '',
      companyId: '',
      documentId: '',
      searchId: '',
      operationType: "DOCUMENT_OPERATION",
      source: "mobile",
      operation: "open"
    }
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL);
    Linking.getInitialURL().then(url => {
      if (url !== null) {
        this.navigate(url); // Launch app with the deep link
      }
    })
  }

  componentWillUnnmount() {
    Linkink.addEventListnener('url', this.handleOpenURL);
  }

  handleOpenURL = (event) => {
    this.navigate(event.url);
  }

  navigate = (url) => {
    const { navigate } = this.props.navigation;
    navigate('CUHandler', { url })

  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.header}><Text style={{fontWeight: 'bold'}}>Enter Context Data</Text></View>
          <View style={styles.fieldContainer}>
            <View style={styles.fieldRow}>
              <Text style={styles.label}>Redirect URL: </Text>
              <TextInput
                  style={styles.field}
                  placeholder={'http://my_host'}
                  onChangeText={(text) => this.setState({redirectUrl: text})}
                  autoCapitalize={'none'} />
            </View>
            <View style={styles.fieldRow}>
              <Text style={styles.label}>User Id: </Text>
              <TextInput
                  style={styles.field}
                  onChangeText={(text) => this.setState({userId: text})}
                  autoCapitalize={'none'} />
            </View>
            <View style={styles.fieldRow}>
              <Text style={styles.label}>Company Id: </Text>
              <TextInput
                  style={styles.field}
                  onChangeText={(text) => this.setState({companyId: text})}
                  autoCapitalize={'none'} />
            </View>
            <View style={styles.fieldRow}>
              <Text style={styles.label}>Document Id: </Text>
              <TextInput
                  style={styles.field}
                  onChangeText={(text) => this.setState({documentId: text})}
                  autoCapitalize={'none'} />
            </View>
            <View style={styles.fieldRow}>
              <Text style={styles.label}>Search Id: </Text>
              <TextInput
                  style={styles.field}
                  onChangeText={(text) => this.setState({searchId: text})}
                  autoCapitalize={'none'} />
            </View>
            <View style={styles.fieldRow}>
              <Text style={styles.label}>Operation Type: </Text>
              <TextInput
                  style={styles.field} placeholder={'DOCUMENT_OPERATION'}
                  onChangeText={(text) => this.setState({operationType: text})}
                  autoCapitalize={'none'}
                  value={this.state.operationType} />
            </View>
            <View style={styles.fieldRow}><
                Text style={styles.label}>Source: </Text>
              <TextInput
                  style={styles.field} placeholder={'mobile'}
                  onChangeText={(text) => this.setState({source: text})}
                  autoCapitalize={'none'}
                  value={this.state.source} />
            </View>
            <View style={styles.fieldRow}>
              <Text style={styles.label}>Operation: </Text>
              <TextInput
                  style={styles.field} placeholder={'open'}
                  onChangeText={(text) => this.setState({operation: text})}
                  autoCapitalize={'none'}
                  value={this.state.operation} />
            </View>
            <View style={styles.button}><Button onPress={() => this.createContextualURL()}
                                                title="Create Contextual URL "
                                                accessibilityLabel="Create contextual URL"
                                                fontColor={'#fff'}
                                                color={'#540F54'} // Android background and iOS font
            /></View>
          </View>
        </View>
    );
  }

  createContextualURL() {
    fetch('https://v1.staging.contextual-url.meltwater.io/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: ''
      },
      body: JSON.stringify({
        redirectUrl: this.state.redirectUrl,
        context: {
          mobile: {
            userId: this.state.userId,
            companyId: this.state.companyId,
            documentId: this.state.documentId,
            searchId: this.state.searchId,
          },
          tracking: {
            operationType: this.state.operationType,
            source: this.state.source,
            operation: this.state.operation
          }
        }
      }),
    }).then((response) => {
      if (response.status == 200) {
        response.json().then((responseJson) => Alert.alert("Response:" + JSON.stringify(responseJson)))
        this.navigate(this.state.redirectUrl)
      } else {
        response.json().then((responseJson) => Alert.alert("Response Error:" + JSON.stringify(responseJson)));
        this.navigate(this.state.redirectUrl)
      }
    }).catch((error) => Alert.alert("Error:" + error));
   }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor : '#ccc',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomWidth: 10,
    borderColor: '#ccc'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  fieldContainer: {
    flex: 10,
    backgroundColor: '#fff'
  },
  fieldRow: {
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  label:  {
    flex: 2,
    width: 120,
    height: 50,
    lineHeight: 47,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    borderColor: '#fff',
    textAlign: 'right',
    borderRightWidth: 5
  },
  field:  {
    flex: 5,
    width: 200,
    height: 50,
    borderWidth: 1,
    paddingLeft: 5,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    justifyContent: 'flex-start'
  },
  button: {
     margin: 20, // Affect only the container View on the button
  }
});

export default Home
