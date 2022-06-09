import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { base_url } from 'API/Url';

const Container = styled.div`
    position: relative;
    width: calc(224px * 5);
    height: auto;
    overflow: hidden;
`;

const SliderContainer = styled.div`
    width: 220px;
    height: 350px;
    display: flex;
`;

const ButtonPrev = styled.button`
    all: unset;
    border: 1px solid #F75690;
    padding: 0.5em 2em;
    color: #F75690;
    border-radius: 10px;
    float: left;

    &:hover {
        transition: all 0.3s ease-in-out;
        background-color: #F75690;
        color: #fff;
    }
`;

const ButtonNext = styled.button`
    all: unset;
    border: 1px solid #F75690;
    padding: 0.5em 2em;
    color: #F75690;
    border-radius: 10px;
    float: right;

    &:hover {
        transition: all 0.3s ease-in-out;
        background-color: #F75690;
        color: #fff;
    }
`;

const BTN = styled.button`
     display: none;
     background-color: pink;

    .title:hover + .btn_detail {
        display: block;
        color: red;
    }
`;

const IMG = styled.img`
    &:hover + .btn_detail {
        display: block;
        color: red;
    }
`;

function Slider(props) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const files = props.arr;
    const paging_size = 5;
    const TOTAL_SLIDES = (files.length) / paging_size;


    const handleNext = () => {
        if (currentSlide >= TOTAL_SLIDES) {
            setCurrentSlide(0);
        } else {
            setCurrentSlide(currentSlide + paging_size);
        }
    };

    const handlePrev = () => {
        if (currentSlide === 0) {
            setCurrentSlide(TOTAL_SLIDES);
        } else {
            setCurrentSlide(currentSlide - paging_size);
        }
    };

    const handleMouseOver = () => {
        console.log("mouse over");
    };

    useEffect(() => {
        const slideRef = document.getElementById("slider");
        if (slideRef) {
            slideRef.style.transition = 'all 0.5s ease-in-out';
            slideRef.style.transform = `translateX(-${currentSlide}00%)`;
        }

    }, [currentSlide]);
    return (
        <>
            <Container>
                {(!(files.length === 0)) ? (
                    <div style={{ textAlign: "center" }}>
                        <SliderContainer id="slider" >
                            {files.map((img, id) =>
                                <Box sx={{ display: "block", border: "2px solid #F75690;", borderRadius: "10px" }}>
                                    <Link to={{
                                        pathname: `/detail/${id}`,
                                        state: { index: id }
                                    }} style={{ textDecoration: "none", color: "black" }}>
                                        <IMG class="imgdiv" src={base_url + img.image} key={id}
                                            style={{ width: '220px', height: "250px", display: "block" }}
                                            alt={img.title}
                                        />
                                    </Link>
                                    <h4 class="title" style={{ display: "block" }}>{img.title}</h4>
                                    <h6 style={{ display: "block" }}>예매율 {img.rate}</h6>
                                    <Link to={{
                                        pathname: `/detail/${id}`,
                                        state: { index: id }
                                    }}
                                        style={{ textDecoration: "none", color: "black" }}>
                                        <BTN class="btn_detail">상세보기</BTN>
                                    </Link>
                                    <Link to={{
                                        pathname: `/detail/${id}`,
                                        state: { index: id }
                                    }}
                                        style={{ textDecoration: "none", color: "black" }}>
                                        <BTN class="btn_detail">예매하기</BTN>
                                    </Link>
                                </Box>
                            )}
                        </SliderContainer>
                    </div>
                ) : (
                    <div>이미지 없음</div>
                )}

            </Container>
            <div style={{ marginTop: 10 }}>
                <ButtonPrev onClick={handlePrev}>◀</ButtonPrev>
                <ButtonNext onClick={handleNext}>▶</ButtonNext>
            </div>
        </>
    );
}

export default Slider;