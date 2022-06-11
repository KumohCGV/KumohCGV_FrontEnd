import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { base_url } from 'API/Url';
import Api from 'API/Api';

const Container = styled.div`
    position: relative;
    width: calc(210px * 5);

    height: auto;
    overflow: hidden;
`;

const SliderContainer = styled.div`
    width: 200px;
    height: 420px;
    display: flex;
`;

const ButtonPrev = styled.button`
    all: unset;
    border: 1px solid #ff0000;
    padding: 0.5em 2em;
    color: #ff0000;
    border-radius: 10px;
    float: left;

    &:hover {
        transition: all 0.3s ease-in-out;
        background-color: #ff0000;
        color: #fff;
    }
`;

const ButtonNext = styled.button`
    all: unset;
    border: 1px solid #ff0000;
    padding: 0.5em 2em;
    color: #ff0000;
    border-radius: 10px;
    float: right;

    &:hover {
        transition: all 0.3s ease-in-out;
        background-color: #ff0000;
        color: #fff;
    }
`;

// hover 이벤트 하려고 하는데 적용이 안됌 ㅜㅜㅜ
const BTN = styled.button`
    //  display: none;
     background-color: #ff0000;
     color: white;
     border-color: white;

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
    const getBody = props.getBody;
    const setGetBody = props.setGetBody;
    const isLast = props.isLast;
    const setIsLast = props.setIsLast;

    const paging_size = 5;
    const [pageNum, setPageNum] = useState(0);

    const handleNext = async () => {
        if (isLast === false) {
            setPageNum(pageNum + 1);
            const resSlider = async () => await Api.getNowMovie(pageNum+1, paging_size);
            const resBody = await resSlider();
            setGetBody(resBody.data.data.content);
            setIsLast(resBody.data.data.last);
            console.log(resBody);
        }
    };

    const handlePrev = async () => {
        if ((pageNum > 0)) {
            const resSlider = async () => await Api.getNowMovie(pageNum-1, paging_size);
            setPageNum(pageNum - 1);
            const resBody = await resSlider();
            setGetBody(resBody.data.data.content);
            setIsLast(resBody.data.data.last);
        }
    };

    const handleMouseOver = () => {
        console.log("mouse over");
    };

    // useEffect(() => {
    //     const slideRef = document.getElementById("slider");
    //     if (slideRef) {
    //         slideRef.style.transition = 'all 0.5s ease-in-out';
    //         slideRef.style.transform = `translateX(-${currentSlide}00%)`;
    //     }

    // }, [currentSlide]);
    return (
        <>
            <Container>
                <SliderContainer id="slider" style={{ textAlign: "center" }} >
                    {getBody.map((img, id) =>
                        <Box sx={{ display: "block", border: "2px solid #ff0000;", borderRadius: "10px" }}>
                            <Link to={{
                                pathname: `/detail/${img.id}`,
                                state: { index: img.id }
                            }} style={{ textDecoration: "none", color: "black" }}>
                                <IMG class="imgdiv" src={img.thumbnail} key={id}
                                    style={{ width: '200px', height: "250px", display: "block" }}
                                    alt={img.title}
                                />
                            </Link>
                            <h4 class="title" style={{ display: "block", minHeight: "40px" }}>{img.title}</h4>
                            <h6 style={{ display: "block" }}>예매율 {(img.ticketRate*100)}% | 평점 {img.rating}</h6>
                            <Link to={{
                                pathname: `/detail/${img.id}`,
                                state: { index: img.id }
                            }}
                                style={{ textDecoration: "none", color: "black" }}>
                                <BTN class="btn_detail">상세보기</BTN>
                            </Link>
                            <Link to={{
                                pathname: `/detail/${img.id}`,
                                state: { index: img.id }
                            }}
                                style={{ textDecoration: "none", color: "black" }}>
                                <BTN class="btn_detail">예매하기</BTN>
                            </Link>
                        </Box>
                    )}
                </SliderContainer>

            </Container>
            <div style={{ marginTop: 10 }}>
                <ButtonPrev onClick={handlePrev}>◀</ButtonPrev>
                <ButtonNext onClick={handleNext}>▶</ButtonNext>
            </div>
        </>
    );
}

export default Slider;