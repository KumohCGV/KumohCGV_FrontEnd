import React, { useState } from 'react';
import { ListItemButton, ListItemText, Box, Modal, FormControl, RadioGroup, FormControlLabel, Radio, TextField, Button } from '@mui/material';
import Api from 'API/Api';

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

   const [id, setId] = useState(0);
   //할인정책 라디오버튼
   const [type, setType] = useState('NONE');
   const handleType = (event, value) => {
      setType(event.target.value);
   }
   //할인 금액
   const [price, setPrice] = useState(0);
   const handlePrice = (event, id) => {
      setPrice(event.target.value);
      setId(id);
   }
   const data = {
      discountType: type,
      discountValue: price,
      screeningId: id
   }
   //조건 검색 버튼 클릭 이벤트
   const handleButton = async () => {
      let resBody = await Api.postDiscount(data);
   };

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
                     <h4>{t.film.title} </h4>
                     <div className="info-hall">
                        | <span>{t.theater.name}</span> | <span>{t.theater.floorCount}층</span> | <span>{t.restSeatCount}석/{t.theater.totalSeat}석</span>
                     </div>
                  </ListItemButton>
                  <Modal
                     open={open}
                     onClose={handleClose}
                     aria-labelledby="modal-modal-title"
                     aria-describedby="modal-modal-description"
                  >
                     <Box sx={style} >
                     <h4>할인 종류</h4>
                     <FormControl sx={{ marginLeft: 1, marginBottom: 1 }}>
                        <RadioGroup
                           row
                           aria-labelledby="demo-radio-buttons-group-label"
                           defaultValue="all"
                           name="radio-buttons-group"
                        >
                           <FormControlLabel value="NONE" control={<Radio />} label="없음" onClick={handleType} />
                           <FormControlLabel value="RATE" control={<Radio />} label="정률할인" onClick={handleType} />
                           <FormControlLabel value="AMOUNT" control={<Radio />} label="정액할인" onClick={handleType} />
                        </RadioGroup>
                     </FormControl>
                     <h4>할인 금액</h4>
                     <Box sx={{ marginLeft: 2, marginBottom: 1, width: 260 }}>
                     <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="id"
                        label="Id"
                        name="id"
                        autoComplete="id"
                        autoFocus
                        // defaultValue={postBody.loginId}
                        onChange={(event)=>handlePrice(event, t.id)}
                     />
                     </Box>
                     <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2, mb: 1 }}
                        onClick={handleButton}
                     >
                        검색
                     </Button>
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