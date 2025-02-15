import { FormStepProps } from 'pages/proposals/propose';
import React from 'react';
import inputExists from 'utils/isValidInput';
import ControlledTextInput from './ControlledTextInput';
import { DisplayImage } from './DisplayFiles';
import IpfsUpload from './IpfsUpload';
import ActionButtons from './IpfsUploadActionButtons';

const ProfileImage: React.FC<FormStepProps> = ({
  form,
  navigation,
  visible,
}) => {
  const [formData, setFormData] = form;

  function updateProfileImage(profileImage: string): void {
    setFormData({
      ...formData,
      files: {
        ...formData.files,
        profileImage: {
          image: profileImage,
          description: formData?.files?.profileImage?.description,
        },
      },
    });
  }

  function updateProfilImageDescription(description: string): void {
    setFormData({
      ...formData,
      files: {
        ...formData.files,
        profileImage: {
          image: formData?.files?.profileImage?.image,
          description: description,
        },
      },
    });
  }

  function clearLocalState(): void {
    setFormData({
      ...formData,
      files: {
        ...formData.files,
        profileImage: {
          image: '',
          description: formData?.files?.profileImage?.description,
        },
      },
    });
  }

  return (
    visible && (
      <>
        <IpfsUpload
          stepName={`${navigation.currentStep} - UPLOAD PROFILE IMAGE`}
          localState={formData?.files?.profileImage?.image}
          setLocalState={updateProfileImage}
          fileDescription={'a Profile Image'}
          fileInstructions={
            'Image should be square (ideally 150px x 150px) and less than 5mb'
          }
          fileType={'image/*'}
          numMaxFiles={1}
          maxFileSizeMB={5}
        />
        <DisplayImage localState={formData?.files?.profileImage?.image} />
        <div className="mx-auto mt-8 w-80">
          <p>Image Description</p>
          <ControlledTextInput
            inputValue={formData?.files?.profileImage?.description}
            id="profilImageDescription"
            placeholder="Image Description"
            errorMessage="Image Description cannot be blank."
            updateInput={updateProfilImageDescription}
            isValid={inputExists}
          />
        </div>
        {formData?.files?.profileImage?.image !== '' &&
          formData?.files?.profileImage?.description !== '' && (
            <ActionButtons
              clearLocalState={clearLocalState}
              navigation={navigation}
            />
          )}
      </>
    )
  );
};
export default ProfileImage;
