import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { currentUser, userToken } from "../utilities/userAuth";
const S3URL = "https://weekphorwithsam.s3.ca-central-1.amazonaws.com/";

export default function Main() {
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkUser() {
      const user = currentUser();
      setUser(user);
    }
    checkUser();

    getImages();
  }, []);

  async function getImages() {
    const token = await userToken();
    const response = await axios.get(
      "https://xj3pvuzl66.execute-api.ca-central-1.amazonaws.com/dev/images",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(response);
    const images = response.data;

    setImages(images);
  }

  const submit = async (event) => {
    event.preventDefault();
    //get signed url from lambda
    const token = await userToken();
    const urlResult = await axios.get(
      "https://xj3pvuzl66.execute-api.ca-central-1.amazonaws.com/dev/signedurl",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const url = urlResult.data.url;

    //use that url to make a put request to s3
    await axios.put(url, file, { headers: { "Content-Type": file.type } });
    const imageUrl = url.split("?")[0];
    const imageName = imageUrl.replace(S3URL, "");
    //store information to the database
    //make post request to lambda to save the image name, description and user id
    await axios.post(
      "https://xj3pvuzl66.execute-api.ca-central-1.amazonaws.com/dev/images",
      {
        imageName,
        description,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    // get the image url and add it to the images array

    setImages([...images, { image_name: imageName, description }]);
  };

  const deleteImage = async (imageUrl) => {
    const token = await userToken();
    const deleteUrl = `https://xj3pvuzl66.execute-api.ca-central-1.amazonaws.com/dev/images/${imageUrl}`;

    const result = await axios.delete(deleteUrl, {
      headers: {
        authorization: token,
      },
    });
    setTimeout(() => {
      getImages();
    }, 2000);
  };

  return (
    <div className="main">
      {user == null ? (
        <h2>Please register or login to access images</h2>
      ) : (
        <div>
          <form onSubmit={submit}>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              accept="image/*"
            ></input>
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            <button type="submit">Submit</button>
          </form>
          {images.length > 0 ? (
            <>
              {images.map((image) => (
                <div className="image" key={image.image_name}>
                  <img
                    key={image.image_name}
                    src={S3URL + image.image_name}
                  ></img>
                  <div className="description">
                    <h3>{image.description}</h3>
                    <button onClick={() => deleteImage(image.image_name)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <h3>No images found</h3>
          )}
        </div>
      )}
    </div>
  );
}
