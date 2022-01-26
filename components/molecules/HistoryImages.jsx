import HistoryDropzone from "../atoms/Dropzone";
import { Button, Flex, Image, Input, VStack, useToast, Text, Wrap, WrapItem, Modal,ModalOverlay ,ModalContent ,ModalHeader ,ModalFooter ,ModalBody ,ModalCloseButton, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import axios from "axios";
import { useEffect } from "react";

const HistoryImages = ({ patient }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [ newImage, setNewImage ] = useState("");
  const [ file, setFile ] = useState({});
  const [ insertId, setInsertId ] = useState(0);
  const [ image_history, setImageHistory ] = useState([{}]);

  const [ modalData, setModalData ] = useState({ path: "", name: "" });

  useEffect(async () => {
    const get_image_history_req = await (await axios.post('/api/getImageHistory', { patient_id: patient.id })).data;
    setImageHistory(get_image_history_req);
  }, [insertId, patient]);

  const uploadNewImage = (img) => {
    console.log('Accepted image', img);
    const url =  URL.createObjectURL(img[0]);
    setNewImage(url);
    setFile(img[0]);
  };

  const rejectNewFile = (file) => {
    toast({
      title: "Error al subir la imagen!",
      description: file[0].errors[0].message,
      duration: 4500,
      status: "error",
      isClosable: true
    });
  };

  const openModal = (path, name) => {
    setModalData({ path: path, name: name });
    onOpen();
  };

  const handleSubmit = async (e, file) => {
    e.preventDefault();
    const form = e.currentTarget;
    const form_data = new FormData(form);

    form_data.append('image', file);

    const upload_img_req = await (await axios.post('/api/uploadHistoryImage', form_data)).data;

    if(upload_img_req.success) {
      setInsertId(upload_img_req.insert_id);
      toast({
        title: "Imagen agregada exitosamente!",
        description: upload_img_req.message,
        duration: 4500,
        status: "success",
        isClosable: true
      });
      setNewImage("");
    } else {
      toast({
        title: "Error al agregar la imagen",
        description: upload_img_req.message,
        duration: 4500,
        status: "error",
        isClosable: true
      });
    }
  };

  return (
    <Flex direction={"column"} justify={"flex-start"} align={"center"}>
      <Text fontSize={"xl"} fontWeight={"bold"}>IMAGENES - {patient.names} {patient.last_names}</Text>
      <Wrap spacing={5} maxWidth={"100%"} align={"center"} background={"gray.100"} py={"2em"} pl={"1em"} style={{ transition: "all 0.5 ease-in-out" }}>
        <WrapItem>
          <HistoryDropzone uploadNewImage={uploadNewImage} rejectNewFile={rejectNewFile}/>
        </WrapItem>
        {
          newImage.startsWith("blob:") && (
            <WrapItem>
              <form onSubmit={e => handleSubmit(e, file)}>
                <VStack spacing={2} width={"100%"} background={"gray.300"} py={"1em"} px={"0.5em"} borderRadius={"0.3em"} height={"100%"}>
                  <Image src={newImage} alt="Error" maxW={250}/>
                  <Input type={"number"} value={patient.id} name="patient_id" style={{ display: 'none' }} readOnly/>
                  <Input placeholder={"Nombre"} type={"text"} width={"80%"} background={"white"} name="image_name" required/>
                  <Button colorScheme={"blue"} leftIcon={<AiOutlineUpload/>} type={"submit"}>Subir</Button>
                </VStack>
              </form>
            </WrapItem>
          )
        }
        {
          image_history.map((image, idx) => {
            return (
              <WrapItem>
                <Flex direction={"column"} justify={"center"} align={"center"} px={"0.5em"} height={"100%"} key={idx}>
                  <Image src={image.path} alt="Error" maxW={250} maxH={250} onClick={() => openModal(image.path, image.name)}/>
                  <Text fontSize={"lg"} fontWeight={"bold"} mt={"1em"}>{image.name}</Text>
                </Flex>
              </WrapItem>
            )
          })
        }
      </Wrap>

      <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalData.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction={"column"} height={"100%"} width={"100%"} justify={"center"} align={"center"}>
              <Image src={modalData.path} alt="Error" minH={"60vh"}/>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default HistoryImages;