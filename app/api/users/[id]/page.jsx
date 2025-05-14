// app/profile/[id]/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Profile from '@components/Profile';

const UserProfile = () => {
  const params = useParams();
  const userId = params.id;
  
  const [userPosts, setUserPosts] = useState([]);
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      try {
        // Fetch the user's posts
        const response = await fetch(`/api/users/${userId}/posts`);
        const data = await response.json();
        
        if (Array.isArray(data) && data.length > 0) {
          setUserPosts(data);
          // Get the username from the first post's creator
          setUserName(data[0].creator.username || 'User');
        } else {
          setUserPosts([]);
          
          // If no posts, try to fetch the user info separately
          try {
            const userResponse = await fetch(`/api/users/${userId}`);
            const userData = await userResponse.json();
            setUserName(userData.username || 'User');
          } catch (error) {
            console.error("Failed to fetch user data:", error);
            setUserName('User');
          }
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setUserPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) fetchUserProfile();
  }, [userId]);

  return (
    <Profile
      name={`${userName}'s`}
      desc={`Welcome to ${userName}'s profile page. Explore ${userName}'s exceptional prompts and be inspired by their ideas.`}
      data={userPosts}
      isLoading={isLoading}
    />
  );
};

export default UserProfile;