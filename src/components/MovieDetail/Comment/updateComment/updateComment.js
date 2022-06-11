import React from 'react';
import { Button, Box, Modal } from '@mui/material';
import CommentField from "components/MovieDetail/Comment/updateComment/CommentField"

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

const UpdateComment = (props) => {
   const { content, rating, movieId, id } = props;
 
    // 모달 관련 변수, 함수 정의
    const [open, setOpen] = React.useState(false);
    async function handleOpen() {
       setOpen(true);
    }
    const handleClose = () => setOpen(false);

    return (
        <>
           <Button variant="contained" color="secondary" size="small"
               onClick={(event) => handleOpen(event.target.id)}>
               댓글 수정
            </Button>

           <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
           >
              <Box sx={style}>
                 <CommentField content={content} rating={rating} setOpen={setOpen} movieId={movieId} id={id}></CommentField>
              </Box>
           </Modal>
     </>
    )
}

export default UpdateComment