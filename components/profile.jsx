// components/profile.jsx
import PromptCard from "./promptcard"

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  // Ensure data is always an array
  const postsArray = Array.isArray(data) ? data : [];
  
  return (
    <section className="w-full">
      <h1>{name} Profile</h1>
      <p>{desc}</p>
      <div className="mt-10 prompt_layout">
        {postsArray.length > 0 ? (
          postsArray.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </section>
  )
}

export default Profile