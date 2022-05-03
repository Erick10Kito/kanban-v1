import React, { useState } from 'react'

export default function Modal() {
  const [modal, setModal] = useState(false)

  const toggleModal = () => {
    setModal(!modal)
  }

  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        + info
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Corinthians</h2>
            <p>
              Salve o Corinthians, O campeão dos campeões. Eternamente, Dentro
              dos nossos corações. Salve o Corinthians, De tradições e glórias
              mil. Tu és o orgulho, Dos esportistas do Brasil Teu passado é uma
              bandeira, Teu presente, uma lição. Figuras entre os primeiros Do
              nosso esporte bretão. Corinthians grande, Sempre altaneiro. És do
              Brasil, O clube mais brasileiro!
            </p>
            <button className="close-modal" onClick={toggleModal}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  )
}
