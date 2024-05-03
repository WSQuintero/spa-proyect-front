export type GeneralTableTypeComponent = {
  data: TableData[]
  setOpenUpdateModal: (openUpdateModal: boolean) => void
  setInitialState: (openInitialState: TableData) => void
  setOpenAlert: (openAlert: boolean) => void
  openAlert: boolean
  complete: (initialState: TableData) => void
  toDelete: (initialState: TableData | undefined) => void
}
