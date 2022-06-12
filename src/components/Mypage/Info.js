import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from "styled-components";
import Divider from '@mui/material/Divider';
import Api from 'API/Api';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Header from 'components/Layout/Header/header';
import { Container } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffca00',
        },
        secondary: {
            main: '#ffb000',
        },
    },
});

theme.typography.h1 = {
    fontSize: '17px',
    [theme.breakpoints.up('sm')]: {
        fontSize: '1.2rem',
    },
};


const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const Item = styled.li`
  padding: 12px 12px; /* 마우스 클릭영역 확보 */
  marginBottom: 30px;

  a {
    display: flex;
    position: relative;
    font-size: 22px;
    text-decoration: none;
    color: black;
  }
`;


const Info = () => {
    
    const [postBody, setPostBody] = useState([]);
    const [transaction, setTransaction] = useState([]);
    
    const response = async () => await Api.getInfo();
    const responseT = async () => await Api.getReservation();
    
    useEffect(() => {
        const getData = async () => {
            const resBody = await response();
            console.log(resBody);
            setPostBody(resBody.data.data);
        }
        getData();
    }, []);
    
    useEffect(() => {
      const getData = async () => {
        const resBody = await responseT();
        console.log(resBody.data.data.content);
        setTransaction(resBody.data.data.content);
      }
      getData();
    }, []);
    
    //고정 필드
    const FixedList = (props) => {
        return (
            <div className='label' style={{ display: 'flex', padding: '10px' }}>
                <div class='label1' style={{ float: 'left', width: '90%' }}>
                    <div id='row-title' style={{ fontWeight: 'bold' }}>
                        <span>{props.title}</span>
                    </div>
                    <div id='row-subtitle' style={{ fontSize: '18px', paddingTop: '10px' }}>
                        <span>{props.item} </span>
                        <span>{props.item2}</span>
                    </div>
                </div>
            </div>
        )
    }
    // 좌석 필드
    const SeatList = (props) => {
        let seatList = [];
        props.item.map(seat => {
            if(seat.row == 0) {
                let col = Number(seat.col) + 1;
                seatList.push(['A'+col]);
            }
            else if(seat.row == 1) {
                let col = Number(seat.col) + 1;
                seatList.push(['B'+col]);
            }
            else if(seat.row == 2) {
                let col = Number(seat.col) + 1;
                seatList.push(['C'+col]);
            }
            else if(seat.row == 3) {
                let col = Number(seat.col) + 1;
                seatList.push(['D'+col]);
            }
            else if(seat.row == 4) {
                let col = Number(seat.col) + 1;
                seatList.push(['E'+col]);
            }
        })
        return (
            <div className='label' style={{ display: 'flex', padding: '10px' }}>
                <div class='label1' style={{ float: 'left', width: '90%' }}>
                    <div id='row-title' style={{ fontWeight: 'bold' }}>
                        <span>관람 좌석</span>
                    </div>
                    <div id='row-subtitle' style={{ fontSize: '18px', paddingTop: '10px' }}>
                        {
                            seatList.map(seat=>(
                                <span>{seat} </span>
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md" >
                <Header/>
                <Typography variant='h1' sx={{
                    display: 'block',
                    height: '40px',
                    marginTop: '110px',
                }}>마이페이지
                </Typography>
                <FixedList item={postBody.loginId} title="아이디" /> {/* 아이디 필드 */}
                <Divider />
                <FixedList item={postBody.name} title="이름" /> {/* 이름 필드 */}
                <Divider />
                <FixedList item={postBody.gender} title="성별" /> {/* 성별 필드 */}
                <Divider />
                <FixedList item={postBody.age} title="나이" /> {/* 나이 필드 */}
                <Divider />
                <Container sx={{backgroundColor:'lightYellow', paddingBottom: 5}}>
                <Typography variant='h1' sx={{
                    display: 'block',
                    height: '40px',
                    marginTop: '40px',
                    padding: '20px 20px 0 20px',
                }}>- 예매 내역 -
                </Typography>
                <List>
                    {
                        transaction.map(row => (
                            <div style={{backgroundColor:'white', marginBottom: 15}}>
                                <Item key={row.id}>
                                <FixedList item={row.id} title="예매 번호" /> 
                                <Divider />
                                <FixedList item={row.screening.film.title} title="관람 영화" /> 
                                <Divider />
                                <FixedList item={row.screening.screeningDate} item2={row.screening.startTime.substr(0,5)} title="관람 일시" /> 
                                <Divider />
                                <FixedList item="구미CGV" item2={row.screening.theater.name} title="상영관" /> 
                                <Divider />
                                <FixedList item={row.seatCount} title="매수" /> 
                                <Divider />
                                <SeatList item={row.seatNumber}/>
                                <Divider />
                                <FixedList item={row.price} title="가격" /> 
                                </Item>
                                <Divider />
                            </div>
                        ))
                    }
                </List>
                </Container>
            </Container>
        </ThemeProvider>
    );
};

export default Info
