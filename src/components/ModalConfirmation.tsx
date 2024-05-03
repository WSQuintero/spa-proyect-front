import GeneralButton from "./GeneralButton"

function ModalConfirmation({
  confirm,
  reject
}: {
  confirm: () => void
  reject: () => void
}) {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div id="crud-modal" className=" w-full max-w-md rounded-lg shadow p-5">
        <div className="relative p-4 w-full max-w-md max-h-full">
          <article className="relative bg-white rounded-lg shadow dark:bg-gray-700 overflow-auto max-h-[30vh] p-5">
            <h3 className="text-center font-bold">Confirmación</h3>
            <p className="text-center ">
              ¿Está seguro de realizar esta acción?
            </p>
            <div className="flex gap-4 w-full justify-center mt-5">
              <GeneralButton
                className="bg-black text-white rounded-md p-2 hover:bg-opacity-70 hover:scale-105 transition-transform"
                onClick={() => reject()}>
                Cancelar
              </GeneralButton>
              <GeneralButton
                className="bg-black text-white rounded-md p-2 hover:bg-opacity-70 hover:scale-105 transition-transform"
                onClick={() => confirm()}>
                confirmar
              </GeneralButton>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}

export default ModalConfirmation
