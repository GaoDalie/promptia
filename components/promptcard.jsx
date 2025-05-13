'use client';

import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';

const ProfilePlaceholder = () => (
  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
    <span className="text-gray-500 text-xs">U</span>
  </div>
);

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  }

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-start gap-3 cursor-pointer'>
          {post.creator?.Image ? (
            <Image
              src={post.creator.Image}
              alt='user_image'
              width={40}
              height={40}
              className='rounded-full object-contain'
            />
          ) : (
            <ProfilePlaceholder />
          )}
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.creator?.username || 'Anonymous'}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator?.email || 'No email'}
            </p>
          </div>
        </div>
        <div className='copy-btn' onClick={handleCopy}>
          <Image
            src={copied === post.prompt
              ? '/assets/icons/tick.svg'
              : '/assets/icons/copy.svg'
            }
            alt="copy icon"
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
    </div>
  )
}

export default PromptCard;