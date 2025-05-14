// components/Profile.jsx
import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete, isLoading }) => {
  const postsArray = Array.isArray(data) ? data : [];
  
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      {isLoading ? (
        <div className="mt-10 flex-center">
          <p>Loading posts...</p>
        </div>
      ) : (
        <div className="mt-10 prompt_layout">
          {postsArray.length > 0 ? (
            postsArray.map((post) => (
              <PromptCard
                key={post._id}
                post={post}
                handleEdit={handleEdit && (() => handleEdit(post))}
                handleDelete={handleDelete && (() => handleDelete(post))}
              />
            ))
          ) : (
            <p>No prompts available yet</p>
          )}
        </div>
      )}
    </section>
  );
};

export default Profile;