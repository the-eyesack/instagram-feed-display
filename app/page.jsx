"use client"; // This is a client component 👈🏽
import { useState, useEffect } from "react";

export default function IGFeed() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    //https://developers.facebook.com/docs/instagram-basic-display-api/reference/media#fields <- Media Fields
    fetch(
      "https://graph.instagram.com/me/media?fields=timestamp,media_url,permalink,thumbnail_url&access_token= INSERT YOUR ACCESS TOKEN HERE "
    )
      .then((response) => {
        if (response.ok) {
          console.log("Success");
        } else {
          console.log("Error");
        }
        return response.json();
      })
        .then((data) => setPosts(data.data));
  }, []);

  function toDate(timestamp) {
    const date = new Date(timestamp);
    return date.toString().split(" ").splice(1, 3).join(" ");
  }

      return (
          <>
              <section
                  className={
                      "mx-auto mt-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-fit"
                  }
              >
                  {posts.map((post) => (
                      // eslint-disable-next-line react/jsx-key
                      <div
                          className={"p-2 flex justify-center flex-col w-72 mx-2 h-[21rem]"}
                      >
                          <a
                              href={post.permalink}
                              className={"flex justify-center w-fit mx-auto"}
                          >
                              <picture>
                                  <source srcSet={post.media_url} type="image/png"/>
                                  <source srcSet={post.thumbnail_url} type="image/png"/>

                                  <img
                                      src=""
                                      alt={"Image Missing :("}
                                      className={
                                          "max-w-sm w-72 w-full rounded-md border-[1px] drop-shadow-xl border-gray-300 transition ease-out hover:-translate-y-3 hover:scale-105"
                                      }
                                  />
                              </picture>
                          </a>
                          <p className={"text-sm text-gray-500 text-right inline"}>
                              {toDate(post.timestamp)}
                          </p>
                      </div>
                  ))}
              </section>
          </>
      );
}
