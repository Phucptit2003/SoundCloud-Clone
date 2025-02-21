import React, { useState } from "react";
import { postSong } from "../../store/songs";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./UploadForm.css";

export default function UploadForm() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [albumName, setAlbumName] = useState("");
  const [albumCover, setAlbumCover] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const songs = useSelector((state) => state.songsRed.songs);
  
      // 2️⃣ Gửi yêu cầu thêm bài hát vào danh sách của người dùng
      const sessionUser = useSelector((state) => state.session.user);
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (!audioFile) {
          alert("Vui lòng chọn file âm thanh!");
          return;
        }
      
        const song = {
          title,
          artist,
          genre,
          albumName,
          albumCover,
          audioFile,
        };
      
        try {
          // 1️⃣ Gửi yêu cầu tạo bài hát mới
          const responseSong = await dispatch(postSong(song));
          console.log("✅ Kết quả trả về từ postSong:", JSON.stringify(responseSong, null, 2));
      
          // 2️⃣ Trích xuất newSong từ responseSong
          const newSong = responseSong.newSong;
      
          // Kiểm tra nếu không có newSong hoặc id của bài hát
          if (!newSong || !newSong.id) {
            alert("Lỗi khi tạo bài hát!");
            return;
          }
      
          // 3️⃣ Gửi yêu cầu thêm bài hát vào danh sách của người dùng
          const response = await fetch("http://localhost:5433/api/mysong", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: sessionUser.id,
              songId: newSong.id, // Sử dụng id từ newSong
            }),
          });
      
          const data = await response.json();
      
          // Xử lý kết quả trả về từ API mysong
          if (data.error) {
            alert(`❌ Lỗi: ${data.error}`);
          } else {
            alert("✅ Bài hát đã được thêm vào danh sách của bạn!");
            history.push("/dashboard");
          }
        } catch (error) {
          console.error("Lỗi khi upload bài hát:", error);
          alert("❌ Đã xảy ra lỗi khi thêm bài hát!");
        }
      };
      

  return (
    <div className="upload__form__c">
      <div className="up__f__c">
        <form onSubmit={handleSubmit}>
          <div id="upload__title">Upload</div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="upload__inputs"
            required
          />
          <input
            type="text"
            placeholder="Artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="upload__inputs"
            required
          />
          <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="upload__inputs"
            required
          />
          <input
            type="text"
            placeholder="Album Name"
            value={albumName}
            onChange={(e) => setAlbumName(e.target.value)}
            className="upload__inputs"
            required
          />
          <input
            type="text"
            placeholder="Album Cover Image URL"
            value={albumCover}
            onChange={(e) => setAlbumCover(e.target.value)}
            className="upload__inputs"
            required
          />
          <label>Audio File</label>
          <input
            type="file"
            placeholder="Audio/MP3"
            onChange={(e) => setAudioFile(e.target.files[0])}
            className="upload__inputs"
            id="audio__input"
            required
          />
          <button className="uploadBtn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
