import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
            // main: '#F75690',
        },
        secondary: {
            main: '#BF2828',
        },
        white: {
            main: '#FFFFFF',
        },
    },
});

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

const MouseOver = (props) => {
    const thumbnail = props.thumbnail;
    const movieId = props.movieId;
    const [mouse, setMouse] = useState('leave');

    const handleMouseOver = () => {
        setMouse('over');
    };

    const handleMouseLeave = () => {
        setMouse('leave');
    };

    let navigate = useNavigate();
    const handleButton = () => {
        navigate('/ticket', { state: movieId });
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                {(mouse === "leave") ? (
                    <div style={{
                        width: '200px', height: "250px", display: "block", backgroundImage: `url(${thumbnail})`,
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
                                      ), url(${thumbnail})`,
                        backgroundSize: "cover"
                    }}
                        onMouseLeave={handleMouseLeave}>
                        <Link to={{
                            pathname: `/detail/${movieId}`,
                            state: movieId
                        }}
                            style={{ textDecoration: "none", color: "black" }}>
                            <Box sx={{ paddingTop: "100px" }}>
                                <BTN class="btn_detail" >상세보기</BTN>
                            </Box>

                        </Link>
                        <Box sx={{ paddingTop: "10px" }}>
                            <BTN 
                                class="btn_detail"                                 
                                onClick={handleButton}
                            >예매하기</BTN>
                        </Box>
                        
                    </div>
                )}
            </ThemeProvider >
        </>
    )
}

export default MouseOver