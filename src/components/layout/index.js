import { Head, Input, MessageShape2, MessageTime3, ProFilePicture } from "../live"

export const LayoutComponent = ({ children, handleToggle, title }) => {

  return (
    <div>
      <Head onHandleToggle={handleToggle} title={title} />
      <Input />
      <ProFilePicture />

      {children}
    </div>
  )  

}
