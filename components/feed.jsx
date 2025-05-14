'use client';

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  const postsArray = Array.isArray(data) ? data : [];
  
  return (
    <div className="mt-16 prompt_layout">
      {postsArray.length > 0 ? (
        postsArray.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))
      ) : (
        <p>No prompts found.</p>
      )}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    const searchQuery = e.target.value;
    setSearchText(searchQuery);
    
    // Debounce search for better performance
    setSearchTimeout(
      setTimeout(() => {
        filterPosts(searchQuery);
      }, 300)
    );
  };
  
  // Function to filter posts based on search query
  const filterPosts = (searchQuery) => {
    const query = searchQuery.toLowerCase().trim();
    
    if (!query) {
      // If search is empty, show all posts
      setFilteredPosts(posts);
      return;
    }
    
    // Filter posts by prompt content, tag, or username
    const filtered = posts.filter(
      (post) => 
        post.prompt.toLowerCase().includes(query) ||
        post.tag.toLowerCase().includes(query) ||
        post.creator.username.toLowerCase().includes(query)
    );
    
    setFilteredPosts(filtered);
  };
  
  // Enhanced tag click function to better highlight the search
  const handleTagClick = (tagName) => {
    // Remove the # symbol if it exists
    const tag = tagName.startsWith('#') ? tagName.substring(1) : tagName;
    
    // Set the search text with the tag
    setSearchText(tag);
    
    // Filter the posts immediately
    filterPosts(tag);
    
    // Visual feedback - focus on search input
    document.querySelector('.search_input').focus();
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/prompt');
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setPosts(data);
          setFilteredPosts(data); // Initially show all posts
        } else {
          console.error("API did not return an array:", data);
          setPosts([]);
          setFilteredPosts([]);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setPosts([]);
        setFilteredPosts([]);
      }
    };
    
    fetchPosts();
  }, []);
  
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for a tag, username, or prompt content"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={filteredPosts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;