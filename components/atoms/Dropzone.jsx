import { Group, useMantineTheme } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { AiOutlineFileImage, AiOutlineUpload, AiOutlineClose } from 'react-icons/ai';

function ImageUploadIcon({ status, ...props }) {
  if (status.accepted) {
    return <AiOutlineUpload {...props} />;
  }

  if (status.rejected) {
    return <AiOutlineClose {...props} />;
  }

  return <AiOutlineFileImage {...props} />;
}

function getIconColor(status, theme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][6]
    : status.rejected
    ? theme.colors.red[6]
    : theme.colorScheme === 'dark'
    ? theme.colors.dark[0]
    : theme.black;
}

const HistoryDropzone = ({ uploadNewImage }) => {
  const theme = useMantineTheme();

  return (
    <Dropzone 
      onDrop={(files) => uploadNewImage(files)}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      children
      // loading
    >
      {(status) => (
        <Group position="center" spacing="xl" style={{ pointerEvents: 'none', height: 220, width: 220 }}>
          <ImageUploadIcon
            status={status}
            style={{ width: 80, height: 80, color: getIconColor(status, theme) }}
          />
        </Group>
      )}
    </Dropzone>
  );
}

export default HistoryDropzone;