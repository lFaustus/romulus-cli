// @flow
import React from 'react';
import { Text } from 'react-native';
<% if (router === 'react-native-router-flux@3.41.0') { -%>
import { Actions } from 'react-native-router-flux';
<% } -%>
import Layout from '<%= name %>/App/Components/Layout';
import Button from '<%= name %>/App/Components/Button';

<% if (router === 'react-native-router-flux@3.41.0') { -%>
function Main(): React$Element<any> {
  return (
    <Layout.Center>
      <Text>Main</Text>
      <Button onPress={Actions.styleguide}>View Styleguide</Button>
    </Layout.Center>
  );
}
<% } else { -%>
function Main({ navigation }): React$Element<any> {
  return (
    <Layout.Center>
      <Text>Main</Text>
      <Button onPress={() => navigation.navigate("Styleguide")}>
        View Styleguide
      </Button>
    </Layout.Center>
  );
}
<% } -%>

export default Main;
