import React, { useState } from "react";
import styled from 'styled-components';
import { Box } from '@mui/material';
import Api from 'API/Api';
import MouseOver from "./MouseOver";

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

    return (
        <>
            <Container>
                <SliderContainer id="slider" style={{ textAlign: "center" }} >
                    {getBody.map((img, id) =>
                        <Box sx={{ display: "block", border: "2px solid #BF2828;", borderRadius: "10px" }}>

                            <MouseOver thumbnail={img.thumbnail} movieId={img.id}></MouseOver>
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