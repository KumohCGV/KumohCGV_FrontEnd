import React from 'react';
import { Button, Box, Modal } from '@mui/material';

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

const ImplDiscount = (props) => {
    const screenId = props.screenId;
      console.log(screenId)
    // 모달 관련 변수, 함수 정의
    const select = props.select;
    const setSelect = props.setSelect;

    const [open, setOpen] = React.useState(false);
    async function handleOpen() {
      setSelect(true);
    }
    const handleClose = () => setSelect(false);

    return (
        <>
           <Modal
              open={select}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
           >
              <Box sx={style}>
                 알로하오에
                 {/* <CommentField movieId={movieId} setOpen={setOpen}></CommentField> */}
              </Box>
           </Modal>
     </>
    )
}

export default ImplDiscount