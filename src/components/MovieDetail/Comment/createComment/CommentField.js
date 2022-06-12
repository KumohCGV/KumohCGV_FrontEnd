import * as React from 'react';
import { useState } from 'react';
import styled from "styled-components";
import { TextField, Container, Box, Chip, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel   } from '@mui/material'
import Api from 'API/Api';

const StyledH4 = styled.h4``;

const StyledDiv = styled.div`
   overflow:auto;
   @media only screen and (min-width: 400px) {
        width: 400px;
    }
`;

const StyledContainer = styled.div`
   overflow:auto
   padding: 20px 5px 0px 0px;
   @media only screen and (min-width: 400px) {
        width: 180px;
    }
`;

const CommentField = (props) => {
    const movieId = props.movieId;
    const setOpen = props.setOpen;

    const [star, setStar] = useState(0); // star
    const [content, setContent] = useState(''); // content

    // rating, content
    const commentData = {
        rating: star,
        content: content,
    }

    const CreateComment = async () => {

        let response = await Api.getCreateComment(movieId, commentData); // API
        console.log(response);

        if (response.data.status) {
            alert('댓글 작성 완료되었습니다.', response.data.status);
            setOpen(false);
            window.location.href = "/detail/" + movieId;
        } else {
            alert('댓글 작성 실패하였습니다.', response.data.status);
        }
    }

    const handleChange = (event) => {
        setStar(event.target.value);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{
                marginTop: 2,
                marginRight: 2,
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <StyledH4>평점 (0~5점)</StyledH4>
                <FormControl>
                    <RadioGroup
                        row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={star}
                        onChange={handleChange}
                    >
                        <FormControlLabel value={0} control={<Radio />} label="0" />
                        <FormControlLabel value={1} control={<Radio />} label="1" />
                        <FormControlLabel value={2} control={<Radio />} label="2" />
                        <FormControlLabel value={3} control={<Radio />} label="3" />
                        <FormControlLabel value={4} control={<Radio />} label="4" />
                        <FormControlLabel value={5} control={<Radio />} label="5" />
                    </RadioGroup>
                </FormControl>

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
                        rows={5}
                        onChange={(event) => setContent(event.target.value)}
                    />
                </StyledDiv>

                <StyledContainer style={{ marginTop: "15px" }}>
                    <Chip label="작성완료!" color="success" variant="outlined"
                        onClick={CreateComment}>
                    </Chip >
                </StyledContainer>
            </Box>
        </Container>
    )
}

export default CommentField