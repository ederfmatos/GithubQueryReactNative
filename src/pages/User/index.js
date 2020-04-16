import React, { useEffect, useState, useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import api from '../../services/api';

import {
  Container,
  Header,
  Name,
  Bio,
  Avatar,
  Repositories,
  Repository,
  Info,
  Url,
  Language,
  Title,
  Description,
} from './styles';

function User({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [repositories, setRepositories] = useState([]);
  const user = useMemo(() => navigation.getParam('user'), []);

  useEffect(() => {
    async function loadRepositories() {
      setLoading(true);
      const response = await api.get(`/users/${user.login}/repos`);
      setRepositories(response.data);
      setLoading(false);
    }

    loadRepositories();
  }, []);

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name || user.login}</Name>
        <Bio>{user.bio}</Bio>
      </Header>

      {loading ? (
        <ActivityIndicator color="#7159c1" />
      ) : (
        <Repositories
          data={repositories}
          keyExtractor={repo => String(repo.id)}
          renderItem={({ item }) => (
            <Repository>
              <Info>
                <Title>{item.name}</Title>
                <Language>{item.language}</Language>
              </Info>

              {item.description && (
                <Description>{item.description}</Description>
              )}
              <Url>{item.url}</Url>
            </Repository>
          )}
        />
      )}
    </Container>
  );
}

User.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('user').name,
});

export default User;
