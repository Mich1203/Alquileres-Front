import React, { FC, useEffect } from "react";
import { useFilePicker } from "use-file-picker";
import { Button, Grid, Image } from "@nextui-org/react";

type TProps = {
  onSelectFiles(files: File[]): void;
};

const FilePicker: FC<TProps> = ({ onSelectFiles }) => {
  const [openFileSelector, { filesContent, loading, errors, plainFiles }] =
    useFilePicker({
      readAs: "DataURL",
      accept: "image/*",
      multiple: true,
      limitFilesConfig: { max: 10 },
      // minFileSize: 0.1, // in megabytes
      maxFileSize: 50,
    });

  useEffect(() => {
    onSelectFiles(plainFiles);
  }, [onSelectFiles, plainFiles]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errors.length) {
    return <div>Error...</div>;
  }

  return (
    <div className="flex justify-center items-center flex-col border-solid p-5">
      <Button className="w-1/4" onClick={() => openFileSelector()}>
        Select files{" "}
      </Button>
      <br />
      <Grid.Container gap={1} justify="center">
        {filesContent.map((file) => (
          <Grid key={file.lastModified}>
            <Image
              src={file.content}
              objectFit="fill"
              alt={file.name}
              width={300}
              height={200}
            />
          </Grid>
        ))}
      </Grid.Container>
    </div>
  );
};

export default FilePicker;
