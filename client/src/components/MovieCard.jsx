import React from 'react';
import { Card ,Tag, Typography} from 'antd';
const { Meta } = Card;
const { Text } = Typography;
const MovieCard = (props) => {
    const { title,rating,genre,language,posterPath, onClick}= props;
  
  return (
  <Card
    hoverable
    style={{ width: 240 }}
    cover={
      <img
        draggable={false}
        alt="cover"
        src={posterPath}
      />
    }
    onClick={onClick}
  >
    <Meta title={title}/>
    <div>
        <Text>{rating}</Text>
    </div>
    <Tag color="blue">{genre}</Tag>
    <Tag>{language}</Tag>
  </Card>
);
}
export default MovieCard;