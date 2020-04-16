import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import api from '../../services/api';

// import { Container } from './styles';

function User({ navigation }) {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      const user = navigation.getParam('user');

      const response = await api.get(`/users/${user.login}/repos`);

      setRepositories(response.data);
    }

    loadRepositories();
  });

  return (
    <View>
      {repositories.map(item => (
        <Text key={item.id}>{item.name}</Text>
      ))}
    </View>
  );
}

User.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('user').name,
});

export default User;
