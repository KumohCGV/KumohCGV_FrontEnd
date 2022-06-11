import React, { useState } from 'react';
import { Grid, Card, CardContent, Avatar, Button } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import UpdateComment from "components/MovieDetail/Comment/updateComment/updateComment"
import Api from 'API/Api';

const CommentCardContent = (props) => {
    const { id, memberName, content, rating, isMyComment, isLiked, likeCount, movieId } = props;

    const [bookmark, setBookmark] = useState(isLiked);
    const [bookCount, setBookCount] = useState(likeCount);

    // 댓글ID, 내ID, 영화ID 주고 좋아요 클릭 여부 변경
    const handleBookmark = async () => {
        console.log(bookmark);
        if (bookmark === false) {
            const response = async () => await Api.getCommentLike(movieId, id);
            const getdata = async () => {
                const data = await response();
                console.log(data);

            };
            getdata();
            setBookCount(bookCount+1);
        } else {
            const response = async () => await Api.getCommentLike(movieId, id);
            const getdata = async () => {
                const data = await response();
                console.log(data);
            };
            getdata();
            setBookCount(bookCount-1);
        }
        setBookmark(!bookmark);

    };

    const deleteComment = async () => {

        if (window.confirm("정말 삭제합니까?")) {
            let response = await Api.getDeleteComment(movieId, id); // API
            console.log(response);

            if (response.data.status) {
                alert("삭제되었습니다.");
                window.location.href = "/detail/"+movieId;
            } else {
                alert('삭제실패하였습니다.', response.data.status);
            }

        } else {
            alert("취소합니다.");
        }
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
                            <span style={{ fontSize: "75%", fontWeight: "bold" }}>{memberName}</span>
                        </div>
                        <div id={id + '-row-content'}>
                            <span style={{ fontSize: "70%" }}> {content}</span>
                        </div>
                        {/* <div id={id + '-row-date'}>
                            <span style={{ fontSize: "60%" }}> {date}</span>
                        </div> */}
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
                                <span style={{ fontSize: "70%" }}> {bookCount}</span>
                            </div>
                        </div>

                    <div>
                        {(isMyComment === true) ?
                            (
                                <div style={{ textAlign: "center", marginTop: "10px" }}>
                                    <Button variant="contained" color="white" size="small"
                                        sx={{ marginRight: "10px" }}
                                        onClick={deleteComment}>
                                        댓글 삭제
                                    </Button>
                                    <UpdateComment content={content} rating={rating} movieId={movieId} id={id} ></UpdateComment>
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