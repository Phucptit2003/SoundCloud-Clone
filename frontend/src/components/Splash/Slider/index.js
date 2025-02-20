import React, { useState, useRef, useEffect } from "react";
import "./Slider.css";
import { SliderData } from "./SliderData";
import { useSelector, useDispatch } from "react-redux";
import { openLogin, closeLogin } from "../../../store/modal";
import Modal from "react-modal";
import LoginForm from "../../LoginFormModal/LoginForm";

export default function Slider() {
  const image1 = useRef();
  const image2 = useRef();
  const slidebtn1 = useRef();
  const slidebtn2 = useRef();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.modal.loginShow);
  const closeModal = () => dispatch(closeLogin());
  const [slider, setSlider] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      image1.current.classList.add("slide-add");
      image2.current.classList.add("slide-add");

      setTimeout(() => {
        image1.current.classList.remove("slide-add");
        image2.current.classList.remove("slide-add");
        const sliderCopy = slider.slice();
        const slideImg = sliderCopy.shift();
        sliderCopy.push(slideImg);
        setSlider(sliderCopy);
      }, 600);
    }, 4000);

    return () => clearInterval(timer);
  }, [slider]);

  const slideChange = () => {
    image1.current.classList.add("slide-add");
    image2.current.classList.add("slide-add");

    setTimeout(() => {
      image1.current.classList.remove("slide-add");
      image2.current.classList.remove("slide-add");
      const sliderCopy = slider.slice();
      const slideImg = sliderCopy.shift();
      sliderCopy.push(slideImg);
      setSlider(sliderCopy);
    }, 600);
  };

  useEffect(() => {
    const imgs = [
      <span key={0} ref={image1}>
        <img className="slider-img" src={SliderData[0].image} alt="studio" />
        <span>
          <span id="slider1title">Experience Music Your Way</span>
          <p id="slider1text">
            Discover millions of high-quality songs, ad-free, anytime, anywhere.
          </p>
          <span id="slider1btns">
            <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer" id="slider1btn1">
              View Project
            </a>
            <>
              <button id="slider1btn2" onClick={() => dispatch(openLogin())}>
                Try It Now
              </button>
              <Modal
                isOpen={loginState}
                closeTimeoutMS={500}
                onRequestClose={closeModal}
                overlayClassName="OuterModal"
                className="InnerModal"
              >
                <LoginForm />
              </Modal>
            </>
          </span>
        </span>
      </span>,
      <span ref={image2} key={1}>
        <img className="slider-img" src={SliderData[1].image} alt="studio" />
        <span className="slider2container">
          <span id="slider1title">Premium Sound, Right at Your Fingertips</span>
          <p id="slider1text">
            Enjoy your personal music collection, create your own playlists, and share with friends effortlessly.
          </p>
          <span id="slider1btns">
            <a id="slider2btn2" onClick={() => dispatch(openLogin())}>
              Get Started Today
            </a>
          </span>
        </span>
      </span>,
    ];
    setSlider(imgs);
  }, []);

  return (
    <div className="splash-slider-container">
      <div className="slide">{slider}</div>
      <button ref={slidebtn1} className="slidbtns" onClick={slideChange}></button>
      <button ref={slidebtn2} className="slidbtns" onClick={slideChange}></button>
    </div>
  );
}
