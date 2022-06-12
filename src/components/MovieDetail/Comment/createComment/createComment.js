import React, { useState } from 'react';
import { Button, Box, Modal } from '@mui/material';
import CommentField from "components/MovieDetail/Comment/createComment/CommentField"

const style = {
    overflowY: 'scroll',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
 };

const CreateComment = (props) => {
    const movieId = props.movieId;
 
    // 모달 관련 변수, 함수 정의
    const [open, setOpen] = useState(false);
    async function handleOpen() {
       setOpen(true);
    }
    const handleClose = () => setOpen(false);

    return (
        <>
           <Button id={movieId} color="success" variant="outlined" size="small"  
               onClick={(event) => handleOpen(event.target.id)}
               sx={{ float: "right" }}>
               댓글 작성
            </Button>

           <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
           >
              <Box sx={style}>
                 <CommentField movieId={movieId} setOpen={setOpen}></CommentField>
              </Box>
           </Modal>
     </>
    )
}

export default CreateComment