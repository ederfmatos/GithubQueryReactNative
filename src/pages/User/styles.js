import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
`;

export const Header = styled.View`
  align-items: center;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #eee;
`;

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background: #eee;
`;

export const Name = styled.Text`
  font-size: 20px;
  color: #333;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
`;

export const Bio = styled.Text`
  font-size: 14px;
  line-height: 18px;
  color: #999;
  margin-top: 5px;
  text-align: center;
`;

export const Repositories = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const Repository = styled.View`
  background: #f5f5f5;
  border-radius: 4px;
  padding: 10px 15px;
  margin-bottom: 20px;

  align-items: center;
`;

export const Info = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const Title = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #333;
`;

export const Description = styled.Text`
  font-size: 12px;
  color: #666;
  margin-top: 8px;
  width: 100%;
`;

export const Url = styled.Text`
  color: #666;
  font-size: 10px;
  margin-top: 8px;
  width: 100%;
`;

export const Language = styled.Text`
  font-size: 13px;
  color: #666;
`;
