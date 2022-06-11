import * as React from 'react';
import { useState } from 'react';
import styled from "styled-components";
import { TextField, Container, Box, Chip } from '@mui/material'
import Api from 'API/Api';

const StyledH4 = styled.h4``;

const StyledDiv = styled.div`
   overflow:auto;
   @media only screen and (min-width: 400px) {
        width: 400px;
    }
`;

const StyledContainer = styled.div`
   overflow:auto;
   padding: 20px 5px 0px 0px;
   @media only screen and (min-width: 400px) {
        width: 180px;
    }
`;

const CommentField = (props) => {
    const base_content = props.content;
    const base_star = props.rating;
    const setOpen = props.setOpen;
    const movieId = props.movieId;
    const id = props.id;

    const [content, setContent] = useState(base_content); // content
    const [star, setStar] = useState(base_star); // star

    // movidId, userId, star, content
    const commentData = {
        rating: star,
        content: content,
    }

    const UpdateComment = async () => {

        let response = await Api.getUpdateComment(movieId, id, commentData); // API
        console.log(response);

        if (response.data.status) {
            alert('댓글 작성 완료되었습니다.', response.data.status);
            setOpen(false);
            window.location.href = "/detail/"+movieId;
        } else {
            alert('댓글 작성 실패하였습니다.', response.data.status);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{
                marginTop: 2,
                marginRight: 2,
                flexDirection: 'column',
                alignItems: 'center',
            }}>

                <StyledH4>평점(0~5)</StyledH4>
                <StyledDiv>
                    <TextField
                        fullWidth
                        hiddenLabel
                        id="filled-hidden-label-small"
                        variant="filled"
                        size="small"
                        placeholder="ex) 5"
                        value={star}
                        onChange={(event) => setStar(event.target.value)}
                    />
                </StyledDiv>
                <StyledH4>내용</StyledH4>
                <StyledDiv>
                    <TextField
                        fullWidth
                        hiddenLabel
                        id="filled-hidden-label-small"
                        variant="filled"
                        size="small"
                        placeholder="내용"
                        multiline
                        rows={3}
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                    />
                </StyledDiv>

                <StyledContainer>
                    <Chip label="작성완료!" color="success" variant="outlined"
                        onClick={UpdateComment}>
                    </Chip >
                </StyledContainer>
            </Box>
        </Container>
    )
}

export default CommentField