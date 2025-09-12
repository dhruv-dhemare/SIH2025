import React from 'react';
import PostCard from '../components/PostCard.jsx';
import '../App.css';

const posts = [
  {
    id: 1,
    userName: 'Jane Doe',
    userRole: 'Frontend Developer • 3h ago',
    avatar: 'https://i.pravatar.cc/40?img=1',
    content: 'Excited to share my new project on CSS animations! Check it out and let me know what you think.',
    image: 'https://tse4.mm.bing.net/th/id/OIP.x0EvzB8FPfsYABXZBOesNAHaE7?pid=Api&P=0&h=180'
  },
  {
    id: 2,
    userName: 'John Smith',
    userRole: 'UI/UX Designer • 1d ago',
    avatar: 'https://i.pravatar.cc/40?img=2',
    content: 'A deep dive into the psychology of color in user interface design. Read more on my blog!',
    image: 'https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max'
  },
  {
    id: 3,
    userName: 'Samantha Lee',
    userRole: 'Data Scientist • 5h ago',
    avatar: 'https://i.pravatar.cc/40?img=3',
    content: 'Exploring the new features of Python\'s pandas library. Data cleaning just got a lot easier!',
    image: 'https://tse2.mm.bing.net/th/id/OIP.AzEgci9oxeTXlcgU5ia3DAHaE7?pid=Api&P=0&h=180'
  },
  {
    id: 4,
    userName: 'Michael Chen',
    userRole: 'Cloud Engineer • 2d ago',
    avatar: 'https://i.pravatar.cc/40?img=4',
    content: 'My thoughts on serverless architecture and its impact on cost efficiency for startups.',
    image: 'https://www.collegenp.com/uploads/2023/01/Group-Study.jpg'
  }
];

function Home() {
  return (
    <div className="home-content">
      <div className="posts-container">
        {posts.map(post => (
          <PostCard
            key={post.id}
            userName={post.userName}
            userRole={post.userRole}
            avatar={post.avatar}
            content={post.content}
            image={post.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;