import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { Link } from "react-router-dom";
function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full h-screen">
              <div className=" flex space-between h-full w-full">
                <div className=" w-1/2">
                  <div>
                    <div className="mt-32 hover:text-gray-100 transition delay-50 ease-in-out ...">
                      <h1 className="text-start text-6xl mb-16 font-semibold ">
                        Mega-Blog
                      </h1>
                      <p className="text-start mb-4 text-xl">
                        Unlock a world of insights, ideas, and inspiration—all
                        in one place.
                      </p>
                      <p className="text-start mb-8 text-xl">
                        Dive into expert opinions, trending topics, and stories
                        that matter.
                      </p>
                      <Link
                        to="/login"
                        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 flex mt-5 w-28"
                      >
                        Get Start
                      </Link>
                    </div>
                  </div>
                </div>
                <div className=" w-1/2 flex justify-center mt-8">
                  <img
                    src="https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=600"
                    className="h-5/6 w-5/6 border border-solid border-1 border-gray-600  rounded-lg shadow-lg "
                    alt="image scenery"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
