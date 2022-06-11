import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from "styled-components";
import Divider from '@mui/material/Divider';
import Api from 'API/Api';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Header from 'components/Layout/Header/header';

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
    fontSize: '20px',
    [theme.breakpoints.up('sm')]: {
        fontSize: '1.5rem',
    },
};

const StyledBox = styled.div`
    height: 100%;
    padding: 0px 0px;
`;

const List = styled.ul`
  list-style: none;
  margin: auto;
  padding: 0;
`;

const Item = styled.li`
  padding: 12px 12px; /* 마우스 클릭영역 확보 */

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
    /*
    useEffect(() => {
      const getData = async () => {
        const resBody = await responseT();
        console.log(resBody.data.data.content);
        setTransaction(resBody.data.data.content);
      }
      getData();
    }, []);
    */

    const FixedList = (props) => {
        return (
            <div className='label' style={{ display: 'flex', padding: '10px' }}>
                <div class='label1' style={{ float: 'left', width: '90%' }}>
                    <div id='row-title' style={{ fontWeight: 'bold' }}>
                        <span>{props.title}</span>
                    </div>
                    <div id='row-subtitle' style={{ fontSize: '18px', paddingTop: '10px' }}>
                        <span>{props.item}</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <StyledBox>
                <Header/>
                <Typography variant='h1' sx={{
                    display: 'block',
                    height: '40px',
                    marginTop: '100px',
                    marginBottom: '40px',
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
                <Typography variant='h1' sx={{
                    display: 'block',
                    height: '40px',
                    marginTop: '30px',
                    marginBottom: '30px',
                }}>예매 내역
                </Typography>
                <Divider />
                <List>
                    {
                        transaction.map(row => (
                            <>
                                <Item key={row.id}>
                                    <div
                                        style={{
                                            display: 'block',
                                            width: '80%',
                                            height: '100%'
                                        }}
                                    >
                                        <div id={row.id + '-row-title'}>
                                            <span>{row.board.title}</span>
                                        </div>
                                        <div id={row.id + '-row-user'}>
                                            <span style={{ fontSize: 16 }}>{row.price}</span>
                                        </div>
                                        <div id={row.id + '-row-period'}>
                                            <span style={{ fontSize: 16 }}>{row.screening.startTime}~{row.screening.endTime}</span>
                                        </div>
                                    </div>
                                </Item>
                                <Divider />
                            </>
                        ))
                    }
                </List>
            </StyledBox>
        </ThemeProvider>
    );
};

export default Info