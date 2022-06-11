import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, Avatar, Button } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import UpdateComment from "components/MovieDetail/Comment/updateComment/updateComment"

const CommentCardContent = (props) => {

    const { id, userId, nickname, date, content, star, thumbCount, isthumb } = props;
    const myId = 2;

    const [bookmark, setBookmark] = useState(isthumb);

    // 댓글ID, 내ID, 영화ID 주고 좋아요 클릭 여부 변경
    const handleBookmark = async () => {
        console.log(bookmark);
        if (bookmark === false) {
            // const response = async () => await Api.getBoardLike(board_id);
            // const getdata = async () => {
            //     const data = await response();
            //     console.log(data);

            // };
            // getdata();
        } else {
            //   const response = async () => await Api.getBoardUnlike(board_id);
            //     const getdata = async () => {
            //         const data = await response();
            //         console.log(data);
            //     };
            //     getdata();
        }
        setBookmark(!bookmark);

    };

    const deleteComment = async () => {

        if (window.confirm("정말 삭제합니까?")) {
            alert("삭제되었습니다.");
        } else {
            alert("취소합니다.");
        }

        // let response = await Api.postTradeSuccess(commentData, movieId); // API
        // console.log(response);

        // if (response.data.status) {
        //     alert('댓글 작성 완료되었습니다.', response.data.status);
        //     setOpen(false);
        //     window.location.href = "/detail/"+movieId;
        // } else {
        //     alert('댓글 작성 실패하였습니다.', response.data.status);
        // }
    }

    return (
        <Grid key={id} item lg={6} md={6} sm={6} xs={6}>
            <Card >
                <CardContent
                    sx={{
                        fontSize: "22px",

                    }}>
                    <div id={id + '-row-image'}
                        style={{
                            float: 'left',
                            width: '30%',
                            height: '100%',

                        }}>
                        <Avatar sx={{ width: 80, height: 80 }}></Avatar>

                    </div>
                    <div
                        style={{
                            display: 'block',
                            width: '80%',
                            height: '100%'
                        }}>
                        <div id={id + '-row-nickname'}>
                            <span style={{ fontSize: "75%", fontWeight: "bold" }}>{nickname}</span>
                        </div>
                        <div id={id + '-row-content'}>
                            <span style={{ fontSize: "70%" }}> {content}</span>
                        </div>
                        <div id={id + '-row-date'}>
                            <span style={{ fontSize: "60%" }}> {date}</span>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                            <div>
                                {bookmark ? (
                                    <ThumbUpAltIcon
                                        sx={{
                                            marginRight: 1,
                                            color: 'red',
                                            fontSize: 25,
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => handleBookmark()}
                                    />
                                ) : (
                                    <ThumbUpOffAltIcon
                                        sx={{
                                            marginRight: 1,
                                            color: 'red',
                                            fontSize: 25,
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => handleBookmark()}
                                    />
                                )}
                            </div>
                            <div id={id + '-row-thumbCount'}>
                                <span style={{ fontSize: "70%" }}> {thumbCount}</span>
                            </div>
                        </div>

                    <div>
                        {(myId === userId) ?
                            (
                                <div style={{ textAlign: "center", marginTop: "10px" }}>
                                    <Button variant="contained" color="white" size="small"
                                        sx={{ marginRight: "10px" }}
                                        onClick={deleteComment}>
                                        댓글 삭제
                                    </Button>
                                    <UpdateComment content={content} star={star} ></UpdateComment>
                                </div>
                            ) : (
                                <div style={{ marginBottom: "43px" }}>
                                </div>
                            )
                        }
                    </div>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default CommentCardContent