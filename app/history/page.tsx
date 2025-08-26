'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase'
import { useRouter } from 'next/navigation'

interface Post {
  id: string
  content: string
  imageUrl: string | null
  style: string
  createdAt: string
}

export default function History() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push('/')
        return
      }
      setUser(data.user)

      try {
        const response = await fetch(`/api/posts?userId=${data.user.id}`)
        if (response.ok) {
          const data = await response.json()
          setPosts(data.posts)
        } else {
          console.error('Failed to fetch posts')
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    checkUser()
  }, [router])

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Historique de vos posts</h1>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Historique de vos posts</h1>
      
      {posts.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-600">Vous n'avez pas encore généré de posts.</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
          >
            Générer un nouveau post
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                  {post.style.charAt(0).toUpperCase() + post.style.slice(1)}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="whitespace-pre-wrap">
                {post.content}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
