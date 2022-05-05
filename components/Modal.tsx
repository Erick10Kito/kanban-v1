import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { IBoardItem } from '../pages'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}
export interface IOnlyData {
  data: IBoardItem
}

export default function TransitionsModal({ data }: IOnlyData) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button onClick={handleOpen}>+ Info</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <button className="close-modal" onClick={handleClose}>
              X
            </button>
            <ul>
              <h2 className="TitleModalInfo">{data.title}</h2>
              {data.infos?.map((info, key) => {
                return (
                  <li key={key}>
                    <Typography
                      id="transition-modal-description"
                      sx={{ mt: 2 }}
                    >
                      Capital Social: {info.capitalSocial}
                      <br />
                      Telefone: {info.telefone}
                      <br />
                      Email: {info.email}
                      <br />
                      Endereço: {info.endereço}
                    </Typography>
                  </li>
                )
              })}
            </ul>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
