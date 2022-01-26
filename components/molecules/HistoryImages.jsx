import HistoryDropzone from "../atoms/Dropzone";
import { Button, Flex, HStack, Image, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import axios from "axios";

const HistoryImages = ({ patient }) => {
  const [ newImage, setNewImage ] = useState("");
  const [ file, setFile ] = useState({});

  const uploadNewImage = (img) => {
    console.log('Accepted image', img);
    const url =  URL.createObjectURL(img[0]);
    setNewImage(url);
    setFile(img[0]);
  };

  const handleSubmit = async (e, file) => {
    e.preventDefault();
    const form = e.currentTarget;
    const form_data = new FormData(form);

    form_data.append('image', file);

    // TODO: Esta ruta de api todavia no existe. Crearla para subir el archivo
    const upload_img_req = await (await axios.post('/api/uploadHistoryImage', form_data)).data;
  };

  return (
    <HStack spacing={5} width={"100%"} align={"center"} background={"gray.100"} py={"2em"} pl={"1em"} overflowX={"scroll"}>
      <HistoryDropzone uploadNewImage={uploadNewImage}/>
      {
        newImage.startsWith("blob:") && (
          <form onSubmit={e => handleSubmit(e, file)}>
            <VStack spacing={2} width={"100%"} background={"gray.300"} py={"1em"} px={"0.5em"} borderRadius={"0.3em"} height={"100%"}>
              <Image src={newImage} alt="Error" maxW={250}/>
              <Input type={"number"} value={patient.id} name="patient_id" style={{ display: 'none' }} readOnly/>
              <Input placeholder={"Nombre"} type={"text"} width={"80%"} background={"white"} name="image_name" required/>
              <Button colorScheme={"blue"} leftIcon={<AiOutlineUpload/>} type={"submit"}>Subir</Button>
            </VStack>
          </form>
        )
      }
    </HStack>
  );
};

export default HistoryImages;