import React, { useState, useCallback, useEffect } from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  ProfileButton,
  Name,
  Bio,
  ProfileButtonText,
} from './styles';

export default function Main() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadUsers() {
      const storageUsers = await AsyncStorage.getItem('users');

      if (!storageUsers) return;

      setUsers(JSON.parse(storageUsers));
    }

    loadUsers();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleSubmit = useCallback(() => {
    if (!newUser) return;

    if (users.find(user => user.login === newUser)) {
      alert('Usuário já adicionado');
      setNewUser('');
      return;
    }

    async function loadUser() {
      setLoading(true);

      try {
        const response = await api.get(`/users/${newUser.trim()}`);

        const user = {
          id: response.data.id,
          name: response.data.name,
          login: response.data.login,
          bio: response.data.bio,
          avatar: response.data.avatar_url,
        };

        setUsers([...users, user]);
        setNewUser('');
        Keyboard.dismiss();
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [newUser]);

  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Adicionar usuário"
          value={newUser}
          onChangeText={text => setNewUser(text)}
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
        />

        <SubmitButton onPress={handleSubmit} loading={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Icon name="add" size={20} color="#FFF" />
          )}
        </SubmitButton>
      </Form>

      <List
        data={users}
        keyExtractor={user => String(user.id)}
        renderItem={({ item }) => (
          <User>
            <Avatar source={{ uri: item.avatar }} />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>

            <ProfileButton onPress={() => {}}>
              <ProfileButtonText>Ver perfil</ProfileButtonText>
            </ProfileButton>
          </User>
        )}
      />
    </Container>
  );
}

Main.navigationOptions = {
  title: 'Usuários',
};
