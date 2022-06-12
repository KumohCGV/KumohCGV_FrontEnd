import React, { useState } from 'react';
import { ListItemButton, ListItemText, Box, Modal } from '@mui/material';

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
   const t = props.postBody;
   const selectedScreen = props.selectedScreen;
   const setSelectedScreen = props.setSelectedScreen;

   // 모달 관련 변수, 함수 정의
   const [open, setOpen] = useState(false);

   async function handleOpen(index) {
      setSelectedScreen(index);
      console.log(index);
      setOpen(true);
   }
   const handleClose = () => setOpen(false);

   return (
      <>
         {(
            !(t.restSeatCount === 0) ?
               <>
                  <ListItemButton
                     selected={(selectedScreen === t.id)}
                     onClick={(event) => handleOpen(t.id)}
                  >
                     <ListItemText primary={t.startTime.substr(0, 5)} />
                     <div className="info-hall">
                        <span>{t.theater.name}</span> | <span>{t.theater.floorCount}층</span> | <span>{t.restSeatCount}석/{t.theater.totalSeat}석</span>
                     </div>
                  </ListItemButton>
                  <Modal
                     open={open}
                     onClose={handleClose}
                     aria-labelledby="modal-modal-title"
                     aria-describedby="modal-modal-description"
                  >
                     <Box sx={style}>
                        알로하오에 {t.id}
                        {/* <CommentField movieId={movieId} setOpen={setOpen}></CommentField> */}
                     </Box>
                  </Modal>
               </>
               :
               <ListItemButton
                  selected={selectedScreen === t.id}
                  disabled='true'
                  onClick={(event) => handleOpen(event, t.id)}
               >
                  <ListItemText primary={t.startTime.substr(0, 5)} />
                  <ListItemText primary="마감" />
                  <div className="info-hall">
                     <span>{t.theater.name}</span> | <span>{t.theater.floorCount}층</span> | <span>{t.restSeatCount}석/{t.theater.totalSeat}석</span>
                  </div>
               </ListItemButton>
         )}

      </>
   )
}

export default ImplDiscount