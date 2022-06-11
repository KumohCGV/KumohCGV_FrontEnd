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
    height: 380px;
    display: flex;
`;

const ButtonPrev = styled.button`
    all: unset;
    border: 1px solid #BF2828;
    padding: 0.5em 2em;
    color: #BF2828;
    border-radius: 10px;
    float: left;

    &:hover {
        transition: all 0.3s ease-in-out;
        background-color: #BF2828;
        color: #fff;
    }
`;

const ButtonNext = styled.button`
    all: unset;
    border: 1px solid #BF2828;
    padding: 0.5em 2em;
    color: #BF2828;
    border-radius: 10px;
    float: right;

    &:hover {
        transition: all 0.3s ease-in-out;
        background-color: #BF2828;
        color: #fff;
    }
`;

// hover 이벤트 하려고 하는데 적용이 안됌 ㅜㅜㅜ
const BTN = styled.button`
    //  display: none;
     background-color: #BF2828;
     color: white;
     border: 1px solid white;
     border-color: white;
     border-radius: 3px;

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

    const [mouse, setMouse] = useState('leave');

    const handleNext = async () => {
        if (isLast === false) {
            setPageNum(pageNum + 1);
            const resSlider = async () => await Api.getNowMovie(pageNum + 1, paging_size, "ticketRate,des");
            const resBody = await resSlider();
            setGetBody(resBody.data.data.content);
            setIsLast(resBody.data.data.last);
            console.log(resBody);
        }
    };

    const handlePrev = async () => {
        if ((pageNum > 0)) {
            const resSlider = async () => await Api.getNowMovie(pageNum - 1, paging_size,);
            setPageNum(pageNum - 1);
            const resBody = await resSlider();
            setGetBody(resBody.data.data.content);
            setIsLast(resBody.data.data.last);
        }
    };

    const handleMouseOver = () => {
        setMouse('over');
    };

    const handleMouseLeave = () => {
        setMouse('leave');
    };

    return (
        <>
            <Container>
                <SliderContainer id="slider" style={{ textAlign: "center" }} >
                    {getBody.map((img, id) =>
                        <Box sx={{ display: "block", border: "2px solid #BF2828;", borderRadius: "10px" }}>

                            {(mouse == "leave") ? (
                                <div style={{
                                    width: '200px', height: "250px", display: "block", backgroundImage: `url(${img.thumbnail})`,
                                    backgroundSize: "cover"
                                }}
                                onMouseOver={handleMouseOver}
                                onMouseLeave={handleMouseLeave}
                                >
                                    {/* <IMG class="imgdiv" src={"https://img.cgv.co.kr/Movie/Thumbnail/Poster/000085/85689/85689_320.jpg"} key={id}
                                        style={{ width: '200px', height: "250px", display: "block" }}
                                        alt={img.title}
                                        onMouseOver={handleMouseOver}
                                        onMouseLeave={handleMouseLeave}
                                    /> */}
                                </div>


                            ) : (

                                <div style={{
                                    width: '200px', height: "250px", display: "block", backgroundImage: `linear-gradient(
                                        rgba(0, 0, 0, 0.4),
                                        rgba(0, 0, 0, 0.4)
                                      ), url(${img.thumbnail})`,
                                    backgroundSize: "cover"
                                }}
                                    onMouseLeave={handleMouseLeave}>
                                    <Link to={{
                                        pathname: `/detail/${img.id}`,
                                        state: { index: img.id }
                                    }}
                                        style={{ textDecoration: "none", color: "black" }}>
                                        <Box sx={{ paddingTop: "100px" }}>
                                            <BTN class="btn_detail" >상세보기</BTN>
                                        </Box>

                                    </Link>
                                    <Link to={{
                                        pathname: `/detail/${img.id}`,
                                        state: { index: img.id }
                                    }}
                                        style={{ textDecoration: "none", color: "black" }}>
                                        <Box sx={{ paddingTop: "10px" }}>
                                            <BTN class="btn_detail">예매하기</BTN>
                                        </Box>
                                    </Link>
                                </div>
                            )}
                            <h4 class="title" style={{ display: "block", minHeight: "40px" }}>{img.title}</h4>
                            <h6 style={{ display: "block" }}>예매율 {(img.ticketRate * 100)}% | 평점 {img.rating}</h6>
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